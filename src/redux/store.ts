import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { compose } from "redux";

import globalSlice from "./slices/globalSlice";
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// Combine reducers
const rootReducer = combineReducers({
  globalSlice,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

