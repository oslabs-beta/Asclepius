import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    kubectl: true,
    dontShowPrompt: true,
    cloudInfo: false,
    localInfo: false,
    aksForm: false,
  },
  reducers: {
    kubectlSet: (state) => {
      if (!state.kubectl) {
        state.kubectl = true;
        console.log("this is current state:", state.kubectl);
      } else {
        console.log("current kubectl:", state.kubectl);
        state.kubectl = false;
      }
      return state;
    },
    dontShowPrompt: (state) => {
      if (state.dontShowPrompt === true) {
        state.dontShowPrompt = false;
      } else state.dontShowPrompt = true;
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
  },
});

export const { kubectlSet, dontShowPrompt, cloudInfo, localInfo, aksForm } =
  userSlice.actions;

export default userSlice.reducer;
