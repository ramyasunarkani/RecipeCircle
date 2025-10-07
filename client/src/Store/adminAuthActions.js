import { axiosInstance } from "./api";
import { setLoading, setError, setAdminUser, logoutAdmin } from "./adminAuthSlice";

export const adminSignup = (formData) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await axiosInstance.post(`/admin/signup`, formData);
    dispatch(setAdminUser(res.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Admin signup failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const adminLogin = (credentials) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const res = await axiosInstance.post(`/admin/login`, credentials);

    if (res.data?.token) {
      localStorage.setItem("token", `Bearer ${res.data.token}`);
    }

    dispatch(setAdminUser(res.data));
  } catch (error) {
    dispatch(setError(error.response?.data?.message || "Admin login failed"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const adminLogout = () => (dispatch) => {
  localStorage.removeItem("token"); 
  dispatch(logoutAdmin());
};
