import { configureStore } from "@reduxjs/toolkit";
import nodeSlice from "./slices/nodeSlice.js";
import userSlice from "./slices/userSlice.js";

export const store = configureStore({
  reducer: {
    node: nodeSlice,
    user: userSlice,
  },
});
