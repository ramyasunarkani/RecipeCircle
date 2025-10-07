import { 
  setFavorites, 
  setFavoritesLoading 
} from "./favoritesSlice";
import { axiosInstance } from "./api";
import toast from "react-hot-toast";

export const fetchFavorites = () => async (dispatch) => {
  dispatch(setFavoritesLoading(true));
  try {
    const res = await axiosInstance.get("/favorites");
    dispatch(setFavorites(res.data));
  } catch (error) {
    console.log("Error fetching favorites:", error);
    toast.error(error.response?.data?.message || "Failed to fetch favorites");
  } finally {
    dispatch(setFavoritesLoading(false));
  }
};

export const addFavorite = (recipeId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`/favorites/${recipeId}`);
    dispatch(fetchFavorites()); 
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to add favorite";
    toast.error(message);
    throw new Error(message);
  }
};

export const removeFavorite = (recipeId) => async (dispatch) => {
  try {
    const res = await axiosInstance.delete(`/favorites/${recipeId}`);
    dispatch(fetchFavorites()); 
    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to remove favorite";
    toast.error(message);
    throw new Error(message);
  }
};
