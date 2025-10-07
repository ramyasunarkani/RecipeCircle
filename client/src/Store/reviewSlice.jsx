import { createSlice } from "@reduxjs/toolkit";

const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    items: [],
    isLoading: false,
  },
  reducers: {
    setReviews: (state, action) => {
      state.items = action.payload;
    },
    addReview: (state, action) => {
      state.items.push(action.payload);
    },
    updateReview: (state, action) => {
      const idx = state.items.findIndex(r => r.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    },
    removeReview: (state, action) => {
      state.items = state.items.filter(r => r.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setReviews,
  addReview,
  updateReview,
  removeReview,
  setLoading,
} = reviewSlice.actions;

export default reviewSlice.reducer;
