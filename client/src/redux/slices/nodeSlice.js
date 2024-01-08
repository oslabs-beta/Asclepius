import { createSlice } from "@reduxjs/toolkit";

export const nodeSlice = createSlice({
  name: "nodeName",
  initialState: {
    clusterName: "",
    nodes: [],
  },
  reducers: {
    setData: (state, action) => {
      // state = action.payload;
      // return state;
      return {...state, clusterName:action.payload.clusterName, nodes: action.payload.nodes}
    },
  },
});

export const { setData } = nodeSlice.actions;

export default nodeSlice.reducer;
