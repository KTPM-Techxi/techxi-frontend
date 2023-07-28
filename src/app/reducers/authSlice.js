// src/reducers/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
const storedUser = JSON.parse(localStorage.getItem('user'));
const initialState = {
  isLoggedIn: !!storedUser,
  user: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailed: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    }
  }
});

export const { loginSuccess, logoutSuccess, loginFailed } = authSlice.actions;
export default authSlice.reducer;
