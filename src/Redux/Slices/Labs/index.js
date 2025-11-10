import { createSlice } from "@reduxjs/toolkit";

const initialState = 1; 

export const labsSlice = createSlice({
  name: "labs",
  initialState,
  reducers: {
    selectLab: (state, action) => action.payload, 
  },
});

export const { selectLab } = labsSlice.actions;
export default labsSlice.reducer;
