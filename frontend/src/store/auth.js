import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthChecked: false, // Để biết đã kiểm tra cookie chưa
  isLoggedIn: false,
  role: null,
  user: null,
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.role = action.payload?.role || null;
      state.user = action.payload?.user || null;
      state.isAuthChecked = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.role = null;
      state.user = null;
      state.isAuthChecked = true;
    },
    setAuthChecked: (state) => {
      state.isAuthChecked = true;
    },
  },
});

export const { login, logout, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;
