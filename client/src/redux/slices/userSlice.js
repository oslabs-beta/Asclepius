import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  //intial states should be what?
  initialState: {
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
    //dispatch(booleanSet(cloudInfo))
    booleanSet: (state, action) => {
      let bool = action.payload;
      state[bool] = !state[bool];
    },
    aksInput: (state, action) => {
      console.log(action.payload);
      state.aksResult = action.payload;
    },
  },
});

export const { aksInput, booleanSet } = userSlice.actions;

export default userSlice.reducer;
