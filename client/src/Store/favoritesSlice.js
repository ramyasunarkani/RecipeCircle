import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action) => {
      state.items = action.payload;
      state.error = null;
    },
    setFavoritesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setFavoritesError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setFavorites, setFavoritesLoading, setFavoritesError } = favoritesSlice.actions;
export default favoritesSlice.reducer;
