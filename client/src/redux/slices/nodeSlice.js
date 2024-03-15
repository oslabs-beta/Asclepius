import { createSlice } from "@reduxjs/toolkit";

export const nodeSlice = createSlice({
  name: "nodeName",
  initialState: {
    clusterName: "",
    nodes: [],
    // clusterName: "demoAKS",
    // nodes: [{
    //   name: 'Node 1',
    //   cpuCores: '305m',
    //   memBytes: '3885Mi',
    //   cpuPercentage: '16%',
    //   memPercentage: '85%',
    //   color: 'red',
    //   pods: ['pod_1','pod_2','pod_3',]
    //   }],
    // nodes: [],
    sidebarData: {},
  },

  reducers: {
    setData: (state, action) => {
      return {
        ...state,
        clusterName: action.payload.clusterName,
        nodes: action.payload.nodes,
      };
    },
    setSidebarData: (state, action) => {
      state.sidebarData = action.payload;
    },
  },
});

export const { setData, setSidebarData, setChart } = nodeSlice.actions;

export default nodeSlice.reducer;
