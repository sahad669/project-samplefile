import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";



// Fetch all departments
export const fetchDepartments = createAsyncThunk("departments/fetchAll", async () => {
  try {
    const authData = JSON.parse(localStorage.getItem("user"));
    const token = authData?.token;
    if (!token) {
      throw new Error("No token found, please login again");
    }

    const response = await axios.get("http://localhost:4000/api/department/getall", {
      headers: { Authorization: `Bearer ${token}` }
    });

    // Only throw and show error toast for real API errors, not for empty lists
    if (response.data.error && response.data.error !== "No Department Found") {
      toast.error(response.data.error);
      throw new Error(response.data.error);
    }

    // If empty/error just return empty array, no toast
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});



// Add department with token in Authorization header
export const addDepartment = createAsyncThunk("departments/add", async (departmentData) => {
  try {
    // Retrieve the entire auth payload object from localStorage as stored by login
    const authData = JSON.parse(localStorage.getItem("user"));
    const token = authData?.token; // Assuming token is part of authData

    if (!token) {
      throw new Error("No token found, please login again");
    }

    const response = await axios.post("http://localhost:4000/api/department/add", departmentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    toast.success(response.data.message);
    return response.data.newDepartment;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});


// Delete department
export const deleteDepartment = createAsyncThunk("departments/delete", async (id) => {
  try {
    const authData = JSON.parse(localStorage.getItem("user"));
    const token = authData?.token;
    if (!token) {
      throw new Error("No token found, please login again");
    }

    const response = await axios.delete(`http://localhost:4000/api/department/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error);
    }

    toast.success(response.data.message);
    return id;
  } catch (error) {
    toast.error(error.message);
    throw error;
  }
});



// Slice
const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // Fetch departments
      .addCase(fetchDepartments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add department
      .addCase(addDepartment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments.push(action.payload);
      })
      .addCase(addDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete department
      .addCase(deleteDepartment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.filter(dep => dep._id !== action.payload);
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default departmentSlice.reducer;
