import { createSlice } from "@reduxjs/toolkit";

export const nodeSlice = createSlice({
  name: "nodeName",
  initialState: {
    clusterName: "",
    nodes: [],
  },
  reducers: {
    setData: (state, action) => {
      console.log("we shouldn't be here");
      state = action.payload;
      return state;
    },
  },
});

export const { setData } = nodeSlice.actions;

export default nodeSlice.reducer;
