import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, removeFavorite } from "../../Store/favoriteActions";

const Favorites = () => {
  const dispatch = useDispatch();
  const { items: favorites, loading } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);

  if (loading) return <p>Loading favorites...</p>;
  if (!favorites.length) return <p>No favorite recipes found.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-[#1E4B6D]">Favorites</h2>

      <div className="space-y-4">
        {favorites.map((recipe) => (
          <div
            key={recipe.id}
            className="flex justify-between items-center border p-4 rounded-md shadow-sm"
          >
            <div>
              <h3 className="font-semibold text-lg">{recipe.title}</h3>
              <p className="text-gray-600 text-sm">{recipe.description}</p>
            </div>
            <button
              onClick={() => dispatch(removeFavorite(recipe.id))}
              className="text-sm text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
