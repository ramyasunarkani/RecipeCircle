import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recipes: [],
  currentRecipe: null,
  isLoading: false,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
    addRecipe: (state, action) => {
      state.recipes.unshift(action.payload);
    },
    updateRecipeInList: (state, action) => {
      state.recipes = state.recipes.map((r) =>
        r.id === action.payload.id ? action.payload : r
      );
      if (state.currentRecipe?.id === action.payload.id) {
        state.currentRecipe = action.payload;
      }
    },
    removeRecipe: (state, action) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearCurrentRecipe: (state) => {
      state.currentRecipe = null;
    },
  },
});

export const {
  setRecipes,
  setCurrentRecipe,
  addRecipe,
  updateRecipeInList,
  removeRecipe,
  setIsLoading,
  clearCurrentRecipe,
} = recipeSlice.actions;

export default recipeSlice.reducer;
