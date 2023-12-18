import { configureStore } from '@reduxjs/toolkit';
import nodeSlice from './slices/nodeSlice.js';


export const store = configureStore({
  reducer: {
    node: nodeSlice,
  },
});
