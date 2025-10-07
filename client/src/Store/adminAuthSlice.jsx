import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminUser: JSON.parse(localStorage.getItem("adminUser")) || null,
  loading: false,
  error: null,
};

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setAdminUser: (state, action) => {
      state.adminUser = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem("adminUser", JSON.stringify(action.payload));
    },
    logoutAdmin: (state) => {
      state.adminUser = null;
      localStorage.removeItem("adminUser");
    },
  },
});

export const { setLoading, setError, setAdminUser, logoutAdmin } =
  adminAuthSlice.actions;

export default adminAuthSlice.reducer;
