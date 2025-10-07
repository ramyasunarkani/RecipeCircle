import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
    recipes: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    setRecipes(state, action) {
      state.recipes = action.payload;
    },
    updateUser(state, action) {
      const updated = action.payload;
      state.users = state.users.map((u) =>
        u.id === updated.id ? updated : u
      );
    },
    removeRecipe(state, action) {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setError,
  setUsers,
  setRecipes,
  updateUser,
  removeRecipe,
} = adminSlice.actions;

export default adminSlice.reducer;
