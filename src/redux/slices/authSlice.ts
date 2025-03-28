import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import {
  writeToLocalStorage,
  readFromLocalStorage,
} from "../localStorageReadWrite/readWrite";
import { IPS_ROUTES } from "../../constants/apiRoutes";
import { AuthApis } from "../../component/services/httpClient/authAPIs";

const AUTH_USER_MESSAGES = {
  successFul: "User signed in successfully",
  needsToResetPassword: "USER_NEEDS_TO_RESET_PASSWORD",
};

export const login = createAsyncThunk("login", async (payload: any) => {
  try {
    const headers = { "org-id": readFromLocalStorage("OrgId") };
    const response: any = await AuthApis.post(
      IPS_ROUTES.STUDENT_SIGN_IN,
      payload,
      headers
    );
    if (response.userMessage === AUTH_USER_MESSAGES.successFul) {
      writeToLocalStorage("user", response?.data?.user);
      writeToLocalStorage("token", response?.data?.token);
      writeToLocalStorage("userId", response?.data?.user?.id);
      writeToLocalStorage("UserUUId", response?.data?.user?.externalId);
      writeToLocalStorage("OrgId", response?.data?.user?.organizationId);
      return response?.data;
    } else if (
      response.userMessage === AUTH_USER_MESSAGES.needsToResetPassword
    ) {
      {
        return "RESET_PASSWORD";
      }
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (_, thunkApi) => {
    try {
      const token = readFromLocalStorage("token");
      const headers = { token: token };
      const response = await AuthApis.post(
        IPS_ROUTES.STUDENT_GET_USER_DETAILS,
        { portal: "STUDENT" },
        headers
      );
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk(
  "register",
  async (payload: any) => {
    const headers = { "org-id": readFromLocalStorage("OrgId") };
    try {
      const response = await AuthApis.post(
        IPS_ROUTES.STUDENT_SIGN_UP,
        payload,
        headers
      );
      return response?.data?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const OTP = createAsyncThunk("otp", async (payload: any) => {
  try {
    const headers = { "org-id": readFromLocalStorage("OrgId") };
    const response = await AuthApis.post(
      IPS_ROUTES.STUDENT_OTP,
      payload,
      headers
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
export const ResendOTP = createAsyncThunk("ResendOtp", async (payload: any) => {
  try {
    const headers = { "org-id": readFromLocalStorage("OrgId") };
    const response = await AuthApis.post(
      IPS_ROUTES.STUDENT_RESEND_OTP,
      payload,
      headers
    );
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
});
export const SetPassword = createAsyncThunk(
  "SetPassword",
  async (payload: any) => {
    try {
      const headers = { "org-id": readFromLocalStorage("OrgId") };
      const response = await AuthApis.put(
        IPS_ROUTES.STUDENT_RESET_PSWD,
        payload,
        headers
      );
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const updatePassword = createAsyncThunk(
  "UpdatePassword",
  async (payload: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-id": readFromLocalStorage("UserUUId"),
      };
      const response = await AuthApis.put(
        IPS_ROUTES.STUDENT_UPDATE_PSWD,
        payload,
        headers
      );
      return response?.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (payload: any) => {
    try {
      const headers = { "org-id": readFromLocalStorage("OrgId") };
      const response = await AuthApis.post(
        IPS_ROUTES.STUDENT_FORGET_PSWD,
        payload,
        headers
      );
      return response?.data[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);
export const getUser = createAsyncThunk("getUser", async (_, _thunkApi) => {
  //try {
  // const response = await axios.get(
  //   `${url}/ips/api/v1/user/${userId}`)
  // if (response.status === 200) {
  //   console.log('User Fetched successfully!')
  //   return response?.data?.data
  // } else {
  //   console.log('Network Error!')
  //   return
  // }
  // } catch (error: any) {
  //   return error.response
  // }
});
export const getStudent = createAsyncThunk(
  "getStudent",
  async (_, _thunkApi) => {
    try {
      const userId = readFromLocalStorage("UserUUId");
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response = await AuthApis.get(
        `${IPS_ROUTES.STUDENT_GET_USER}${userId}`,
        {},
        headers
      );

      if ((response as any)?.success === true) {
        writeToLocalStorage("user", response?.data);
        return response;
      } else {
        return;
      }
    } catch (error: any) {
      return error.response;
    }
  }
);

export const updateUser = createAsyncThunk(
  "update",
  async (payload: any, thunkApi) => {
    try {
      const newPayload = {
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        email: payload?.email,
        profilePictureURL: payload?.profilePictureURL
          ? payload?.profilePictureURL
          : null,
        phone: payload?.phone,
        dob: payload?.dob,
        city: payload?.city,
        state: payload?.state,
        country: payload?.country,
      };
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response = await AuthApis.put(
        `${IPS_ROUTES.STUDENT_UPDATE_PROFILE}`,
        newPayload,
        headers
      );
      return response;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);

interface UserState {
  loading: boolean;
  updatingUser: boolean;
  error: string | undefined;
  user: AxiosResponse<any, any> | null | string;
  token: string;
  resendOtploading: boolean;
}

const initialState: UserState = {
  loading: false,
  updatingUser: false,
  error: undefined,
  user: readFromLocalStorage("user") ?? null,
  token: "",
  resendOtploading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setEmail: (state: any, action) => {
      state.user = { ...state.user, email: action.payload };
    },
    logoutUser: (state) => {
      state.loading = false;
      state.error = undefined;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("UserUUId");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = undefined; // Reset error on pending
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.token = action.payload?.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload?.user;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state, _action: PayloadAction<any>) => {
        state.updatingUser = true;
      })
      .addCase(updateUser.fulfilled, (state, _action: PayloadAction<any>) => {
        state.updatingUser = false;
        // state.user = _action.payload?.data;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.updatingUser = false;
        state.error = action.payload;
      })

      .addCase(updatePassword.pending, (state, _action: PayloadAction<any>) => {
        state.updatingUser = true;
      })
      .addCase(
        updatePassword.fulfilled,
        (state, _action: PayloadAction<any>) => {
          state.updatingUser = false;
        }
      )
      .addCase(
        updatePassword.rejected,
        (state, _action: PayloadAction<any>) => {
          state.updatingUser = false;
        }
      )
      .addCase(getStudent.pending, (state, _action: PayloadAction<any>) => {
        state.loading = true;
      })
      .addCase(getStudent.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.user = action.payload?.data;
      })
      .addCase(getStudent.rejected, (state, _action: PayloadAction<any>) => {
        state.loading = false;
      })

      .addCase(OTP.pending, (state, _action: PayloadAction<any>) => {
        state.loading = true;
      })
      .addCase(OTP.fulfilled, (state, _action: PayloadAction<any>) => {
        state.loading = false;
      })
      .addCase(OTP.rejected, (state, _action: PayloadAction<any>) => {
        state.loading = false;
      })

      .addCase(SetPassword.pending, (state, _action: PayloadAction<any>) => {
        state.loading = true;
      })
      .addCase(SetPassword.fulfilled, (state, _action: PayloadAction<any>) => {
        state.loading = false;
      })
      .addCase(SetPassword.rejected, (state, _action: PayloadAction<any>) => {
        state.loading = false;
      })

      .addCase(ResendOTP.pending, (state, _action: PayloadAction<any>) => {
        state.resendOtploading = true;
      })
      .addCase(ResendOTP.fulfilled, (state, _action: PayloadAction<any>) => {
        state.resendOtploading = false;
      })
      .addCase(ResendOTP.rejected, (state, _action: PayloadAction<any>) => {
        state.resendOtploading = false;
      })
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          // state.userDetails = action.payload?.user;
          state.user = action.payload?.user;
          writeToLocalStorage("user", action.payload?.user);
          writeToLocalStorage("userId", action.payload?.user?.id);
          writeToLocalStorage("UserUUId", action.payload?.user?.externalId);
          writeToLocalStorage("action", action.payload?.action);
          writeToLocalStorage("email", action.payload?.user?.email);
          writeToLocalStorage("TabSettings", action.payload?.tabSettings);
          writeToLocalStorage("RoleId", action.payload?.userRoles[0]?.id);
          writeToLocalStorage(
            "AccessLevel",
            action.payload?.userRoles[0]?.accessLevel
          );
          writeToLocalStorage(
            "portalsData",
            action.payload?.portals ? action.payload?.portals : []
          );
        }
      )
      .addCase(getUserDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setEmail, logoutUser } = userSlice.actions;
export default userSlice.reducer;

