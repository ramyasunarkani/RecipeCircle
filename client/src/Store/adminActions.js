import {
  setLoading,
  setError,
  setUsers,
  setRecipes,
  updateUser,
  removeRecipe,
} from "./adminSlice";
import { adminAxios } from "./api";
import toast from "react-hot-toast";

export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await adminAxios.get("/admin/users");
    dispatch(setUsers(res.data));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to fetch users";
    dispatch(setError(errMsg));
    toast.error(errMsg);
  } finally {
    dispatch(setLoading(false));
  }
};

export const approveUser = (id) => async (dispatch) => {
  try {
    const res = await adminAxios.patch(`/admin/users/${id}/approve`);
    if (res.data?.user) {
      dispatch(updateUser(res.data.user));
      toast.success("User approved successfully ✅");
    } else {
      toast.error("Invalid response from server");
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to approve user";
    dispatch(setError(errMsg));
    toast.error(errMsg);
  }
};

export const banUser = (id) => async (dispatch) => {
  try {
    const res = await adminAxios.patch(`/admin/users/${id}/ban`);
    if (res.data?.user) {
      dispatch(updateUser(res.data.user));
      toast.success("User banned successfully 🚫");
    } else {
      toast.error("Invalid response from server");
    }
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to ban user";
    dispatch(setError(errMsg));
    toast.error(errMsg);
  }
};

export const fetchAllRecipes = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const res = await adminAxios.get("/admin/recipes");
    dispatch(setRecipes(res.data));
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to fetch recipes";
    dispatch(setError(errMsg));
    toast.error(errMsg);
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  try {
    await adminAxios.delete(`/admin/recipes/${id}`);
    dispatch(removeRecipe(id));
    toast.success("Recipe deleted successfully 🗑️");
  } catch (error) {
    const errMsg = error.response?.data?.message || "Failed to delete recipe";
    dispatch(setError(errMsg));
    toast.error(errMsg);
  }
};
