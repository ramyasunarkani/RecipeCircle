import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("authUser");
const initialState = {
  authUser: savedUser ? JSON.parse(savedUser) : null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    },
    setIsLoggingIn: (state, action) => {
      state.isLoggingIn = action.payload;
    },
    setIsUpdatingProfile: (state, action) => {
      state.isUpdatingProfile = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setIsSigningUp,
  setIsLoggingIn,
  setIsUpdatingProfile,
} = authSlice.actions;

export default authSlice.reducer;
