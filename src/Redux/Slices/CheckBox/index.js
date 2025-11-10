import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const checkBoxSlice = createSlice({
  name: "checkBox",
  initialState,
  reducers: {
    toggleCheckBox: (state, action) => {
      const value = action.payload;
      if (state.includes(value)) {
        return state.filter((item) => item !== value);
      } else {
        return [...state, value];
      }
    },
  },
});

export const { toggleCheckBox } = checkBoxSlice.actions;
export default checkBoxSlice.reducer;
