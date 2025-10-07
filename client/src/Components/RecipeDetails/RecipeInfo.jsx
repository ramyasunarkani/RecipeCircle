import React from "react";

const RecipeInfo = ({ recipe }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-[#1E4B6D] mb-4">{recipe.title}</h1>
      <img
        src={recipe.image_url || "/recipe.png"}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <p className="text-gray-700 mb-6">{recipe.description}</p>
      <p className="text-sm text-gray-500 mb-6">
        Difficulty:{" "}
        {recipe.difficulty.charAt(0).toUpperCase() + recipe.difficulty.slice(1)}
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Dietary:{" "}
        {recipe.dietary.map((d) => d.charAt(0).toUpperCase() + d.slice(1)).join(", ")}
      </p>
    </>
  );
};

export default RecipeInfo;
