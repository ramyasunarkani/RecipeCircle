import { axiosInstance } from "./api";
import {
  setReviews,
  addReview,
  updateReview,
  removeReview,
  setLoading,
} from "./reviewSlice";
import toast from "react-hot-toast";

export const fetchReviews = (recipeId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axiosInstance.get(`/review/recipes/${recipeId}/reviews`);
    dispatch(setReviews(res.data));
  } catch (error) {
    console.error("Error fetching reviews:", error);
    toast.error(error.response?.data?.message || "Failed to load reviews");
  } finally {
    dispatch(setLoading(false));
  }
};

export const addOrUpdateReview = (recipeId, data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(`/review/recipes/${recipeId}/reviews`, data);
    if (res.data.review?.id) {
      if (res.data.message.includes("updated")) {
        dispatch(updateReview(res.data.review));
        toast.success("Review updated!");
      } else {
        dispatch(addReview(res.data.review));
        toast.success("Review added!");
      }
    }
  } catch (error) {
    console.error("Error adding/updating review:", error);
    toast.error(error.response?.data?.message || "Failed to add review");
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/review/reviews/${reviewId}`);
    dispatch(removeReview(reviewId));
    toast.success("Review deleted!");
  } catch (error) {
    console.error("Error deleting review:", error);
    toast.error(error.response?.data?.message || "Failed to delete review");
  }
};
