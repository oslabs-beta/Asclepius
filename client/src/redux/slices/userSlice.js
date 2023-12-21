import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  //intial states should be what?
  initialState: {
    kubectl: false,
    showPrompt: false,
    cloudInfo: false,
    localInfo: false,
    aksForm: false,
    aksInfo: {
      clusterName: "",
      resourceGroup: "",
    },
  },

  reducers: {
    kubectlSet: (state) => {
      if (!state.kubectl) {
        state.kubectl = true;
      } else {
        state.kubectl = false;
      }
      return state;
    },
    showPrompt: (state) => {
      if (state.showPrompt === true) {
        state.showPrompt = false;
      } else state.showPrompt = true;
    },
    cloudInfo: (state) => {
      if (state.cloudInfo === true) {
        state.cloudInfo = false;
      } else state.cloudInfo = true;
    },
    localInfo: (state) => {
      if (state.localInfo === true) {
        state.localInfo = false;
      } else state.localInfo = true;
    },
    aksForm: (state) => {
      if (state.aksForm === true) {
        state.aksForm = false;
      } else state.aksForm = true;
    },
    aksInput: (state, action) => {
      state.aksInfo.clusterName = action.payload.clusterName;
      state.aksInfo.resourceGroup = action.payload.resourceGroup;
      console.log("set aks info");
    },
  },
});

export const {
  kubectlSet,
  showPrompt,
  cloudInfo,
  localInfo,
  aksForm,
  aksInput,
} = userSlice.actions;

export default userSlice.reducer;
