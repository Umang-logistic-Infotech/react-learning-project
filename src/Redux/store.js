 import { configureStore } from "@reduxjs/toolkit";
 import counterSlice from  './Slices/Counter';
 import labsSlice from  './Slices/Labs';
 import textFieldSlice from  './Slices/TextField';
import selectFieldSlice from './Slices/Select';
import checkBoxSlice from './Slices/CheckBox';
import radioSlice from './Slices/Radio';

 export const store = configureStore({ 
    reducer:{
        counter: counterSlice,
        labs: labsSlice,
        textField: textFieldSlice,
        selectField: selectFieldSlice,
        checkBox: checkBoxSlice,
        radio: radioSlice,
    },
  });