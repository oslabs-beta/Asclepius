import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  //intial states should be what?
  initialState: {
    page: "map",
    kubectl: true,
    showPrompt: false,
    cloudInfo: false,
    localInfo: false,
    aksForm: false,
    aksResult: null,
    aksCLI: false,
    awsForm: false,
  },

  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    kubectlSet: (state) => {
      const newState = { ...state };
      newState.kubectl = !newState.kubectl;

      return newState;
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
      console.log(action.payload);
      state.aksResult = action.payload;
    },
    aksCLIInfo: (state) => {
      if (state.aksCLI === true) {
        state.aksCLI = false;
      } else state.aksCLI = true;
    },
    aws: (state) => {
      if (state.awsForm === true) {
        state.awsForm = false;
      } else state.awsForm = true;
    },
  },
});

export const {
  setPage,
  kubectlSet,
  showPrompt,
  cloudInfo,
  localInfo,
  aksForm,
  aksInput,
  aksCLIInfo,
  aws,
} = userSlice.actions;

export default userSlice.reducer;
