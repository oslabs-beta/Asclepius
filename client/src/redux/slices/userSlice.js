import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    kubectl: true,
    dontShowPrompt: true,
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
      state.dontShowPrompt = false;
    },
  },
});

export const { kubectlSet, dontShowPrompt } = userSlice.actions;

export default userSlice.reducer;
