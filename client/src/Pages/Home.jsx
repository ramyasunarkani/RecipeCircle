import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchRecipes } from "../Store/recipeActions";
import { fetchFavorites } from "../Store/favoriteActions"; 
import Feed from "../Components/Feed";
import { fetchFeed } from "../Store/socialActions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { recipes, isLoading } = useSelector((state) => state.recipes);
  const { authUser } = useSelector((state) => state.auth);

  const { items: favorites = [] } = useSelector((state) => state.favorites || { items: [] });

  const [filters, setFilters] = useState({
    difficulty: "All",
    dietary: "All",
    search: "",
  });

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (authUser) {
      dispatch(fetchFavorites(authUser.id));
      dispatch(fetchFeed(authUser.id)); 
    }
  }, [authUser, dispatch]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredRecipes = recipes.filter((recipe) => {
    const difficultyMatch =
      filters.difficulty === "All" || recipe.difficulty === filters.difficulty.toLowerCase();

    const dietaryMatch =
      filters.dietary === "All" || recipe.dietary.includes(filters.dietary.toLowerCase());

    const searchMatch =
      filters.search === "" ||
      recipe.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      recipe.ingredients.some((i) =>
        i.toLowerCase().includes(filters.search.toLowerCase())
      );

    return difficultyMatch && dietaryMatch && searchMatch;
  });

  const isFavorite = (recipeId) => {
    return favorites.some((f) => f.id === recipeId);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#1E4B6D]">All Recipes</h1>

      <div className="flex gap-4 mb-6 justify-center flex-wrap">
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleFilterChange}
          placeholder="Search by title, ingredients or description"
          className="px-3 py-2 border rounded-md flex-1 min-w-[200px]"
        />
        <select
          name="difficulty"
          value={filters.difficulty}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-md"
        >
          <option>All</option>
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
        <select
          name="dietary"
          value={filters.dietary}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded-md"
        >
          <option>All</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Gluten-Free</option>
          <option>Dairy-Free</option>
        </select>
      </div>

      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : filteredRecipes.length === 0 ? (
        <p className="text-center">No recipes found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="border rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <img
                src={recipe.image_url || "/recipe.png"}
                alt={recipe.title}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-[#1E4B6D]">{recipe.title}</h2>
              <p className="text-gray-700 mb-2">{recipe.description}</p>
              <p className="text-sm text-gray-500 mb-2">
                Difficulty: {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                Dietary: {recipe.dietary.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")}
              </p>

              {authUser && isFavorite(recipe.id) && (
                <p className="text-sm text-red-500 mb-1">❤️ Favorite</p>
              )}

              <p className="mt-2 text-[#1E4B6D] hover:underline text-sm">View More</p>
            </div>
          ))}
        </div>
      )}

      {authUser && (
        <div className="mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-[#1E4B6D]">Recent Activity</h2>
          <Feed userId={authUser.id} /> 
        </div>
      )}
    </div>
  );
};

export default Home;
