import {
  setAuthUser,
  setIsSigningUp,
  setIsLoggingIn,
  setIsUpdatingProfile,
} from "./authSlice";
import { axiosInstance } from "./api";
import toast from "react-hot-toast";

export const signup = (data) => async (dispatch) => {
  dispatch(setIsSigningUp(true));
  try {
    const res = await axiosInstance.post("/auth/signup", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("authUser", JSON.stringify(res.data.user));
    console.log(res.data)

    dispatch(setAuthUser(res.data.user));
    toast.success("Account created successfully");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Signup failed";
    toast.error(message);
    throw new Error(message);
  } finally {
    dispatch(setIsSigningUp(false));
  }
};

export const login = (data) => async (dispatch) => {
  dispatch(setIsLoggingIn(true));
  try {
    const res = await axiosInstance.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("authUser", JSON.stringify(res.data.user));

    dispatch(setAuthUser(res.data.user));
    toast.success("Logged in successfully");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Login failed";
    toast.error(message);
    throw new Error(message);
  } finally {
    dispatch(setIsLoggingIn(false));
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("authUser");
    dispatch(setAuthUser(null));
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Logout failed");
  }
};

export const updateProfile = (data) => async (dispatch) => {
  dispatch(setIsUpdatingProfile(true));
  try {
    const token = localStorage.getItem("token");

    const res = await axiosInstance.put("/auth/update-profile", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(setAuthUser(res.data.user));
    localStorage.setItem("authUser", JSON.stringify(res.data.user));

    toast.success("Profile updated successfully");
  } catch (error) {
    console.log("Error in update profile:", error);
    toast.error(error.response?.data?.message || "Update failed");
  } finally {
    dispatch(setIsUpdatingProfile(false));
  }
};
