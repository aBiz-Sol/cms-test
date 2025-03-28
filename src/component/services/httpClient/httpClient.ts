import axios, {
  AxiosInstance,
  AxiosResponse as IAxiosResponse,
  AxiosError,
} from "axios";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";
import { v4 } from "uuid";

declare module "axios" {
  type IAxiosResponse<T = any> = Promise<T>;
}

interface ErrorResponse {
  status: number | undefined;
  title: string | undefined;
}

interface ErrorData {
  status: number | undefined;
  message: string;
}

export abstract class HttpClient {
  private _isOpen = false; // current circuit breaker status
  private _cbTimeout = 3000; // circuit breaker timeout in milliseconds
  protected readonly instance: AxiosInstance;
  private externalId?: string;
  private orgId?: string;
  private authorization?: string;

  public constructor(
    baseURL: string,
    withCredentials = false,
    externalId?: string,
    orgId?: string,
    authorization?: string
  ) {
    this.externalId = externalId;
    this.orgId = orgId;
    this.authorization = authorization;
    this.instance = axios.create({
      withCredentials,
      timeout: 300000,
      baseURL,
    });
    this._initializeResponseInterceptor();
    this._initializeRequestInterceptor();
    this._initializeRequestIdInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._interceptSuccessResponse.bind(this),
      this._interceptErrorResponse.bind(this)
    );
  };

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._interceptRequest.bind(this));
  };
  // if user is logged in then we must have to pass additional header in each request like authorization, org id user id etc but in case of logged out session then we dont need to add these heaeders in each request
  private _initializeRequestIdInterceptor = () => {
    this.instance.interceptors.request.use((config) => {
      if (
        config.headers &&
        !config.headers["req-id"] &&
        !config.headers["org-id"]
      ) {
        config.headers["request-id"] = v4();
        config.headers["User-External-Id"] = this.externalId;
        config.headers["Org-Id"] = this.orgId;
        config.headers["Authorization"] = this.authorization;
      }
      return config;
    });
  };

  private _interceptRequest(config: any) {
    console.log(
      "info",
      `Calling API - Context: httpClient._interceptRequest - METHOD: ${
        config?.method
      } - BASE URL: ${config?.baseURL} - URL: ${
        config?.url
      } - PARAMS: ${JSON.stringify(config?.params)}`
    );
    const cancelToken = new axios.CancelToken((cancel) =>
      cancel("Circuit breaker is open")
    );
    return {
      ...config,
      ...(this._isOpen ? { cancelToken } : {}),
    };
  }

  private _interceptSuccessResponse = ({ data }: IAxiosResponse) => {
    return data;
  };

  private _interceptErrorResponse(error: AxiosError) {
    const errorCode = error?.code || error?.response?.status || "";
    const shouldCircuitBreakerBeOpen = [
      "ECONNREFUSED",
      StatusCodes.TOO_MANY_REQUESTS,
      StatusCodes.REQUEST_TIMEOUT,
      StatusCodes.GATEWAY_TIMEOUT,
    ].includes(errorCode);

    if (shouldCircuitBreakerBeOpen && !this._isOpen) {
      this._openCircuitBreaker();
    }

    const errorResponse: ErrorResponse = {
      status: error?.response?.status,
      title: (error?.response?.data as ErrorData)?.message,
    };
    if (
      errorResponse.status === 401 &&
      errorResponse.title === "Unauthorized"
    ) {
      localStorage.clear();
      const message = `${errorResponse.status} / ${errorResponse.title}`;
      toast.error(message);
    } else if (
      error?.code === "ERR_NETWORK" &&
      error?.message === "Network Error"
    ) {
      console.log("Network Error:", { error });
    } else if (errorResponse.status === 403) {
      console.log("403 Forbidden => Access Denied: ", { error });
    } else {
      // const message = `${errorResponse.status} / ${errorResponse.title}`;
      const message = `${errorResponse.title}`;
      toast.error(message);
    }

    return Promise.reject(error);
  }

  private _openCircuitBreaker() {
    this._isOpen = true;

    setTimeout(() => {
      this._isOpen = false;
    }, this._cbTimeout);
  }
}

