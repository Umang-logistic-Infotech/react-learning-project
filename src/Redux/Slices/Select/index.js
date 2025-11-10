import { createSlice } from "@reduxjs/toolkit";

const initialState = ""; 

export const selectFieldSlice = createSlice({
  name: "selectField",
  initialState,
  reducers: {
    userSelectValue: (state, action) => action.payload,
  },
});

export const { userSelectValue } = selectFieldSlice.actions;
export default selectFieldSlice.reducer;
