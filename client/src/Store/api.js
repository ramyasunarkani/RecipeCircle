
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Admin instance
export const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
adminAxios.interceptors.request.use((config) => {
  const adminUser = JSON.parse(localStorage.getItem("adminUser"));
  if (adminUser?.token) config.headers.Authorization = `Bearer ${adminUser.token}`;
  return config;
});
