import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "../localStorageReadWrite/readWrite";
import { ORG_ROUTES } from "../../constants/apiRoutes";
import { OrganizationAPIs } from "../../component/services/httpClient/organizationAPIs";

interface organizationSliceState {
  org: any;
  orgImage: string;
  loading: boolean;
  loadingReview: boolean;
  productReview: any;
}
const initialState: organizationSliceState = {
  org: {},
  orgImage: "",
  loading: false,
  loadingReview: false,
  productReview: {
    rating: 0,
    comments: "",
    externalId: "",
  },
};

export const fetchOrganizationById = createAsyncThunk(
  "fetchOrganizationById",
  async (organizationId: any, thunkApi) => {
    try {
      const response = await OrganizationAPIs.get(
        ORG_ROUTES.GET_ORGANIZATION_BY_ID(organizationId)
      );
      const orgId = response?.data?.externalId;
      writeToLocalStorage("OrgId", orgId);
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const fetchOrganizationByUrl = createAsyncThunk(
  "fetchOrganizationByUrl",
  async (orgUrl: any, thunkApi) => {
    try {
      const response: any = await OrganizationAPIs.get(
        ORG_ROUTES.GET_ORGANIZATION_BY_URL(orgUrl)
      );
      const orgId = response?.data?.[0]?.externalId;
      writeToLocalStorage("OrgId", orgId);
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

//Rate And Review
export const rateAndReviewProduct = createAsyncThunk(
  "rateAndReviewProduct",
  async (payload: any, thunkApi) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await OrganizationAPIs.post(
        ORG_ROUTES.CREATE_PRODUCT_REVIEW,
        payload,
        headers
      );
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const updateProductReview = createAsyncThunk(
  "updateProductReview",
  async (data: any, thunkApi) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await OrganizationAPIs.put(
        ORG_ROUTES.UPDATE_PRODUCT_REVIEW(data?.reviewId),
        data?.payload,
        headers
      );
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const getProductRateAndReview = createAsyncThunk(
  "getProductRateAndReview",
  async (sourceId: any, thunkApi) => {
    try {
      const userId = readFromLocalStorage("UserUUId");

      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": userId,
      };
      const response: any = await OrganizationAPIs.get(
        ORG_ROUTES.GET_PRODUCT_REIVIEW(sourceId, userId),
        {},
        headers
      );
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

const organizationSlice = createSlice({
  name: "organization",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizationById.fulfilled, (state, action: any) => {
        state.loading = false;
        state.org = action.payload;
        state.orgImage = action?.payload?.imageUrl;
      })

      .addCase(fetchOrganizationByUrl.fulfilled, (state, action: any) => {
        state.loading = false;
        state.org = action.payload?.[0];
        state.orgImage = action?.payload[0]?.imageUrl;
      })
      .addCase(fetchOrganizationByUrl.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(fetchOrganizationByUrl.rejected, (state) => {
        state.loading = false;
      })

      .addCase(rateAndReviewProduct.fulfilled, (state, action: any) => {
        state.loading = false;
      })
      .addCase(rateAndReviewProduct.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(rateAndReviewProduct.rejected, (state) => {
        state.loading = false;
      })

      .addCase(updateProductReview.fulfilled, (state, action: any) => {
        state.loading = false;
      })
      .addCase(updateProductReview.pending, (state, _action) => {
        state.loading = true;
      })
      .addCase(updateProductReview.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getProductRateAndReview.fulfilled, (state, action: any) => {
        state.loadingReview = false;
        state.productReview = action?.payload[0];
      })
      .addCase(getProductRateAndReview.pending, (state, _action) => {
        state.loadingReview = true;
      })
      .addCase(getProductRateAndReview.rejected, (state) => {
        state.loadingReview = false;
      });
  },
});
export default organizationSlice.reducer;

