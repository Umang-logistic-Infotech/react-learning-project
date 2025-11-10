import { createSlice } from "@reduxjs/toolkit";

const initialState = ''; 

export const textFieldSlice = createSlice({
  name: "userInputValue",
  initialState,
  reducers: {
    userInputValue: (state, action) => action.payload, 
  },
});

export const { userInputValue } = textFieldSlice.actions;
export default textFieldSlice.reducer;
