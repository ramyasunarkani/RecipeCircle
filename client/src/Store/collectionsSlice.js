import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections: (state, action) => {
      state.items = action.payload;
      state.error = null;
    },
    setCollectionsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCollectionsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCollections, setCollectionsLoading, setCollectionsError } = collectionsSlice.actions;
export default collectionsSlice.reducer;
