import {
  setRecipes,
  setCurrentRecipe,
  addRecipe,
  updateRecipeInList,
  removeRecipe,
  setIsLoading,
} from "./recipeSlice";
import { axiosInstance } from "./api";
import toast from "react-hot-toast";

export const fetchRecipes = () => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axiosInstance.get("/recipes/all");
    dispatch(setRecipes(res.data));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch recipes");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const fetchRecipeById = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axiosInstance.get(`/recipes/${id}`);
    dispatch(setCurrentRecipe(res.data));
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to fetch recipe");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const createRecipe = (data) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axiosInstance.post("/recipes/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(addRecipe(res.data));
    toast.success("Recipe created successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to create recipe");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const updateRecipe = (id, data) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    const res = await axiosInstance.put(`/recipes/edit/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(updateRecipeInList(res.data));
    toast.success("Recipe updated successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update recipe");
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const deleteRecipe = (id) => async (dispatch) => {
  dispatch(setIsLoading(true));
  try {
    await axiosInstance.delete(`/recipes/delete/${id}`);
    dispatch(removeRecipe(id));
    toast.success("Recipe deleted successfully!");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete recipe");
  } finally {
    dispatch(setIsLoading(false));
  }
};
