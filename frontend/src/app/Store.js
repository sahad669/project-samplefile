import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
// import departmentReducer from "../features/departmentSlice"



export const Store = configureStore({
    reducer:{
        auth: authReducer,
        // department:departmentReducer
    }
})