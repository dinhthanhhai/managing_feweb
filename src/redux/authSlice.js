import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    currentUser: null,
    isLoading: false,
    error: false,
  },
  logout: {
    isLoading: false,
    error: false,
  },
  register: {
    test: "test",
  },
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.login.isLoading = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isLoading = false;
      state.login.error = true;
    },
    updateAccessToken: (state, action) => {
      state.login.currentUser.access_token = action.payload;
    },
    logoutStart: (state) => {
      state.logout.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.logout.isLoading = false;
      state.login.currentUser = null;
      state.logout.error = false;
    },
    logoutFailed: (state) => {
      state.logout.isLoading = false;
      state.logout.error = true;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  updateAccessToken,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;
export default authSlice.reducer;
