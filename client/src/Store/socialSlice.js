import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  followers: [],
  following: [],
  feed: [],
  authors: [], 
  loading: false,
  error: null,
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    setFollowers: (state, action) => { state.followers = action.payload; },
    setFollowing: (state, action) => { state.following = action.payload; },
    setFeed: (state, action) => { state.feed = action.payload; },
    setAuthors: (state, action) => { state.authors = action.payload; }, 
    setLoading: (state, action) => { state.loading = action.payload; },
    setError: (state, action) => { state.error = action.payload; },
  },
});

export const {
  setFollowers,
  setFollowing,
  setFeed,
  setAuthors, 
  setLoading,
  setError,
} = socialSlice.actions;

export default socialSlice.reducer;
