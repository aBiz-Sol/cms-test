import { createSlice } from "@reduxjs/toolkit"
import {
  readFromLocalStorage,
  writeToLocalStorage
} from "../localStorageReadWrite/readWrite"

interface globalSliceState {
  isRTL: boolean
  theme: string
  startLessonTime: any
}

const initialState: globalSliceState = {
  isRTL: readFromLocalStorage("dir") ?? false,
  theme: readFromLocalStorage("theme") ?? "light",
  startLessonTime: null
}

const globalSlice = createSlice({
  name: "globalSlice",
  initialState,
  reducers: {
    appDirection: (state, action) => {
      state.isRTL = action.payload
      writeToLocalStorage("dir", action.payload)
    },
    appTheme: (state, action) => {
      state.theme = action.payload
      writeToLocalStorage("theme", action.payload)
    },
    setStartTime: (state, action) => {
      state.startLessonTime = action.payload
    }
  }
})
export const { appDirection, appTheme, setStartTime } = globalSlice.actions
export default globalSlice.reducer
