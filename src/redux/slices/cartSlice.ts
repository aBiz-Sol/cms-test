import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  readFromLocalStorage,
  writeToLocalStorage,
} from "../localStorageReadWrite/readWrite";
import { CART_ROUTES } from "../../constants/apiRoutes";
import { toast } from "react-toastify";
import { OrganizationAPIs } from "../../component/services/httpClient/organizationAPIs";
import { CartAPIs } from "../../component/services/httpClient/cartAPIs";
interface CartState {
  cartItems: any[];
  loading: boolean;
  cartProduct: any;
  isCartProduct: boolean;
  isBuyProduct: boolean;
  cartItemsAtLocal: any[];
  cartDetailLoading: boolean;
  paymentHistory: any;
  isHistoryloading: boolean;
}
const initialState: CartState = {
  cartItems: [],
  loading: false,
  cartProduct: {},
  isCartProduct: false,
  isBuyProduct: false,
  cartItemsAtLocal: readFromLocalStorage("cartItems") || [],
  cartDetailLoading: false,
  paymentHistory: [],
  isHistoryloading: false,
};
export const getCartItemsCount = () => {
  const cartItemsAtLocal = readFromLocalStorage("cartItems");
  if (cartItemsAtLocal) {
    const allCartItems = cartItemsAtLocal;
    return allCartItems?.length;
  } else {
    return 0;
  }
};
export const getCartItems = () => {
  const cartItemsAtLocal = readFromLocalStorage("cartItems");
  if (cartItemsAtLocal) {
    const allCartItems = cartItemsAtLocal;
    return allCartItems;
  } else {
    return [];
  }
};
export const proceedToCheckOut = createAsyncThunk(
  "proceedToCheckOut",
  async (payload: any, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await OrganizationAPIs.post(
        CART_ROUTES.proceedToCheckOut,
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
export const addProductToCart = createAsyncThunk(
  "addProductToCart",
  async (payload: any, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await CartAPIs.post(
        CART_ROUTES.addProductToCart,
        payload,
        headers
      );
      // if (response?.success) toast.success("Item added to cart!")
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const addBulkProductToCart = createAsyncThunk(
  "addBulkProductToCart",
  async (payload: any, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await CartAPIs.post(
        CART_ROUTES.addBulkProductToCart,
        payload,
        headers
      );
      if (response?.data) {
        localStorage.removeItem("cartItems");
      }
      return response?.data;
    } catch (error: any) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
export const deleteProductFromCart = createAsyncThunk(
  "deleteProductFromCart",
  async (productId: any, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await CartAPIs.delete(
        CART_ROUTES.deleteCartProduct(productId),
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
export const getCartDetials = createAsyncThunk(
  "getCartDetials",
  async (_, thunkApi) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await CartAPIs.get(
        CART_ROUTES.getcartDetails,
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
export const updateCartItem = createAsyncThunk(
  "updateCartItem",
  async (productId: any, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await CartAPIs.post(
        CART_ROUTES.updateCartItem(productId),
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
export const emptyCartItems = createAsyncThunk(
  "emptyCartItems",
  async (cartData: any, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const cartId = cartData?.cartId;
      const externalIds = cartData?.externalIds;
      const response: any = await CartAPIs.delete(
        CART_ROUTES.emptyCart(`${cartId}?externalIds=${externalIds}`),
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

export const getPaymentHistory = createAsyncThunk(
  "getPaymentHistory",
  async (_, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response = await CartAPIs.get(
        `${CART_ROUTES.paymentHistory}`,
        {},
        headers
      );
      return response?.data;
    } catch (error) {
      // return thunkApi.rejectWithValue(error)
    }
  }
);

export const getPaymentReceipt = createAsyncThunk(
  "getPaymentReceipt",
  async (sessionId: string, thunkApi: any) => {
    try {
      const headers = {
        "org-id": readFromLocalStorage("OrgId"),
        "user-external-id": readFromLocalStorage("UserUUId"),
      };
      const response: any = await OrganizationAPIs.get(
        `${CART_ROUTES.paymentReceipt(sessionId)}`,
        {},
        headers
      );
      return response;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<any>) => {
      state.cartItemsAtLocal?.push(action.payload);
      writeToLocalStorage("cartItems", state.cartItemsAtLocal);
    },
    removeFromCart: (state, action) => {
      state.cartItemsAtLocal = state.cartItemsAtLocal?.filter(
        (item: any) => item.id !== action.payload.id
      );
      writeToLocalStorage("cartItems", state.cartItemsAtLocal);
    },
    deleteCartItem: (state, action) => {
      state.cartItemsAtLocal = state.cartItemsAtLocal.filter(
        (item: any) => item?.externalId !== action.payload.externalId
      );
      writeToLocalStorage("cartItems", state.cartItemsAtLocal);
    },
    clearCart: (state: any) => {
      state.cartItemsAtLocal = [];
      console.log("clear");
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers(builder: any) {
    builder
      .addCase(proceedToCheckOut.pending, (state: any, action: any) => {
        state.isBuyProduct = true;
      })
      .addCase(proceedToCheckOut.fulfilled, (state: any, action: any) => {
        state.isBuyProduct = false;
      })
      .addCase(proceedToCheckOut.rejected, (state: any) => {
        state.isBuyProduct = false;
      })
      .addCase(addProductToCart.pending, (state: any, action: any) => {
        state.isCartProduct = true;
      })
      .addCase(addProductToCart.fulfilled, (state: any, action: any) => {
        state.isCartProduct = false;
        state.cartProduct = action?.payload;
      })
      .addCase(addProductToCart.rejected, (state: any) => {
        state.isCartProduct = false;
      })
      .addCase(deleteProductFromCart.pending, (state: any, action: any) => {
        state.loading = true;
      })
      .addCase(deleteProductFromCart.fulfilled, (state: any, action: any) => {
        state.loading = false;
        // state.cartProduct = action?.payload
      })
      .addCase(deleteProductFromCart.rejected, (state: any) => {
        state.loading = false;
      })
      .addCase(getCartDetials.pending, (state: any, action: any) => {
        state.cartDetailLoading = true;
      })
      .addCase(getCartDetials.fulfilled, (state: any, action: any) => {
        state.cartDetailLoading = false;
        state.cartItems = action?.payload;
      })
      .addCase(getCartDetials.rejected, (state: any) => {
        state.cartDetailLoading = false;
      })
      .addCase(emptyCartItems.pending, (state: any, action: any) => {
        state.loading = true;
      })
      .addCase(emptyCartItems.fulfilled, (state: any, action: any) => {
        state.loading = false;
        state.cartItems = action?.payload;
      })
      .addCase(emptyCartItems.rejected, (state: any) => {
        state.loading = false;
      })
      .addCase(
        getPaymentHistory.pending,
        (state: any, action: PayloadAction<any>) => {
          state.isHistoryloading = true;
        }
      )
      .addCase(
        getPaymentHistory.fulfilled,
        (state: any, action: PayloadAction<any>) => {
          state.isHistoryloading = false;
          state.paymentHistory = action.payload;
        }
      )
      .addCase(
        getPaymentHistory.rejected,
        (state: any, action: PayloadAction<any>) => {
          state.isHistoryloading = false;
          state.paymentHistory = [];
        }
      );
  },
});

export const { addToCart, removeFromCart, deleteCartItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state: any) => state.cart.cartItemsAtLocal;

export default cartSlice.reducer;

