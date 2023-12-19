import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    kubectl: true,
  },
  reducers: {
    kubectlSet: (state) => {
      if (!state.kubectl) {
        state.kubectl = true;
        console.log("this is current state:", state.kubectl);
      } else state.kubectl = false;
    },
  },
});

export const { kubectlSet } = userSlice.actions;

export default userSlice.reducer;
