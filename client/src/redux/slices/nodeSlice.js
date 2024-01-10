import { createSlice } from "@reduxjs/toolkit";

export const nodeSlice = createSlice({
  name: "nodeName",
  initialState: {
    clusterName: "",
    nodes: [],
    sidebarData: {}
  },
  reducers: {
    setData: (state, action) => {
      // state = action.payload;
      // return state;
      return {...state, clusterName:action.payload.clusterName, nodes: action.payload.nodes}
    },
    setSidebarData: (state, action) => {
      console.log("action payload", action.payload)
      state.sidebarData = action.payload;
      console.log("after dispatch sbData", state.sidebarData)
    },
  },
});

export const { setData, setSidebarData } = nodeSlice.actions;

export default nodeSlice.reducer;
