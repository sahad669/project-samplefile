import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Register
export const register = createAsyncThunk('auth/register', async (userData) => {
  const response = await axios.post('http://localhost:4000/api/users/register', userData);
  return response.data;
});

// Login
export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post('http://localhost:4000/api/users/login', userData);
  return response.data
});

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("user");
      state.isLoggedIn = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false; // after register, user still needs login
      })
      .addCase(login.fulfilled, (state, action) => {
        // Save token and user info in localStorage under 'user' key
        localStorage.setItem(
          "user",
          JSON.stringify({
            token: action.payload.token,
            user: action.payload.user,
          })
        );

        state.isLoggedIn = true;
        state.user = action.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

