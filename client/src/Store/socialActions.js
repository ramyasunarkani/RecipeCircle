import { setFollowers, setFollowing, setFeed, setAuthors } from "./socialSlice";
import { axiosInstance } from "./api";

export const fetchAuthors = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/social/authors");
    dispatch(setAuthors(res.data));
  } catch (err) {
    console.error("Fetch authors failed:", err);
  }
};

export const followUser = (userId) => async (dispatch) => {
  try {
    await axiosInstance.post(`/social/users/${userId}/follow`);
    dispatch(fetchFollowing());
    return { success: true };
  } catch (err) {
    console.error("Follow failed:", err);
    throw err;
  }
};

export const unfollowUser = (userId) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/social/users/${userId}/unfollow`);
    dispatch(fetchFollowing());
    return { success: true };
  } catch (err) {
    console.error("Unfollow failed:", err);
    throw err;
  }
};

export const fetchFollowers = (userId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/social/users/${userId}/followers`);
    dispatch(setFollowers(res.data));
  } catch (err) {
    console.error("Fetch followers failed:", err);
  }
};

export const fetchFollowing = (userId) => async (dispatch) => {
  if (!userId) return;
  try {
    const res = await axiosInstance.get(`/social/users/${userId}/following`);
    dispatch(setFollowing(Array.isArray(res.data) ? res.data : []));
  } catch (err) {
    console.error("Fetch following failed:", err);
    dispatch(setFollowing([]));
  }
};

export const fetchFeed = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/social/feed`);
    dispatch(setFeed(res.data));
  } catch (err) {
    console.error("Fetch feed failed:", err);
  }
};
