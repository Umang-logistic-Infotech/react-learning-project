import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: 0,  // Initial state is 0
    reducers: {
        increment: (state) => {
            return state + 1; 
        },
        decrement: (state) => {
            return state - 1;  
        },
        getCount: (state)=>{
            return state ;
        }
    },
});

export const { increment, decrement,getCount } = counterSlice.actions;
export default counterSlice.reducer;
