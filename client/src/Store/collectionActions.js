import { 
  setCollections, 
  setCollectionsLoading 
} from "./collectionsSlice";
import { axiosInstance } from "./api";
import toast from "react-hot-toast";

export const fetchCollections = () => async (dispatch) => {
  dispatch(setCollectionsLoading(true));
  try {
    const res = await axiosInstance.get("/collections");
    dispatch(setCollections(res.data));
  } catch (error) {
    console.log("Error fetching collections:", error);
    toast.error(error.response?.data?.message || "Failed to fetch collections");
  } finally {
    dispatch(setCollectionsLoading(false));
  }
};

export const createCollection = (name) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/collections", { name });
    dispatch(fetchCollections()); 
    toast.success("Collection created successfully");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to create collection";
    toast.error(message);
    throw new Error(message);
  }
};

export const addRecipeToCollection = (collectionId, recipeId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`/collections/${collectionId}/add/${recipeId}`);
    dispatch(fetchCollections()); 
    toast.success("Recipe added to collection");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add recipe";
    toast.error(message);
    throw new Error(message);
  }
};

export const removeRecipeFromCollection = (collectionId, recipeId) => async (dispatch) => {
  try {
    const res = await axiosInstance.delete(`/collections/${collectionId}/remove/${recipeId}`);
    dispatch(fetchCollections()); 
    toast.success("Recipe removed from collection");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to remove recipe";
    toast.error(message);
    throw new Error(message);
  }
};
