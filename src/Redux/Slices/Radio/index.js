import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

export const radioSlice = createSlice({
  name: "radio",
  initialState,
  reducers: {
    selectRadioOption: (state, action) => action.payload,
    clearRadioSelection: () => "", 
  },
});

export const { selectRadioOption, clearRadioSelection } = radioSlice.actions;
export default radioSlice.reducer;
