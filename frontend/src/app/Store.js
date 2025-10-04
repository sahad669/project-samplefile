import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import departmentReducer from "../features/departmentSlice"
import employeeReducer from "../features/employeeSlice"




export const Store = configureStore({
    reducer:{
        auth: authReducer,
        department:departmentReducer,
        employee:employeeReducer,
       
    }
})