import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import recipeReducer from "./recipeSlice";
import reviewReducer from "./reviewSlice";
import favoriteReducer from "./favoritesSlice";
import collectionReducer from "./collectionsSlice";
import socialReducer from "./socialSlice";
import adminReducer from "./adminSlice";
import adminAuthReducer from "./adminAuthSlice";




const store = configureStore({
  reducer: {
    auth: authReducer,
    recipes:recipeReducer,
    reviews:reviewReducer,
    favorites:favoriteReducer,
    collections:collectionReducer,
    social:socialReducer,
    admin: adminReducer,
    adminAuth: adminAuthReducer, 


  },
  
});

export default store;
