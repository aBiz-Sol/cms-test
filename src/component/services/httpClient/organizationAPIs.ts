import { BACKEND_SERVICES } from "../../../utils/env";
import { HttpClient } from "./httpClient";

class OrganizationAPIs extends HttpClient {
  private static _classInstance?: OrganizationAPIs;

  public constructor(base: string) {
    super(base);
  }
  public static getInstance(base: any) {
    if (!this._classInstance) {
      this._classInstance = new OrganizationAPIs(base);
    }
    return this._classInstance;
  }

  public post = async (url: string, data: any = {}, headers: any = {}) => {
    try {
      const response = await this.instance.post(url, data, {
        headers,
      });
      return response;
    } catch (error: any) {
      throw {
        message: error.messages
          ? error.messages
          : error.response?.data
          ? error.response.data?.message
          : error.message,
        code: error.code ? error.code : 400,
      };
    }
  };

  public get = async (url: string, data: any = {}, headers: any = {}) => {
    try {
      return await this.instance.get(url, {
        params: data,
        headers,
      });
    } catch (error: any) {
      throw {
        message: error.messages
          ? error.messages
          : error.response?.data
          ? error.response.data?.message
          : error.message,
        code: error.code ? error.code : 400,
      };
    }
  };

  public put = async (url: string, data: any = {}, headers: any = {}) => {
    try {
      return await this.instance.put(url, data, {
        headers,
      });
    } catch (error: any) {
      throw {
        message: error.messages
          ? error.messages
          : error.response?.data
          ? error.response.data?.message
          : error.message,
        code: error.code ? error.code : 400,
      };
    }
  };
}

const organizationAPIs = OrganizationAPIs.getInstance(
  BACKEND_SERVICES.organizationService
);

export { organizationAPIs as OrganizationAPIs };

