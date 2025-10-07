import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes, deleteRecipe, updateRecipe } from "../../Store/recipeActions";
import toast from "react-hot-toast";

const MyRecipes = () => {
  const dispatch = useDispatch();
  const { recipes, isLoading } = useSelector((state) => state.recipes);
  const { authUser } = useSelector((state) => state.auth);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    servings: "",
    cooking_time: "",
    difficulty: "",
    dietary: "",
    image: null,
  });

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const myRecipes = recipes.filter((r) => r.user_id === authUser?.id);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      dispatch(deleteRecipe(id));
    }
  };

  const handleEditClick = (recipe) => {
    setEditingRecipe(recipe.id);
    setFormData({
      title: recipe.title,
      description: recipe.description,
      ingredients: recipe.ingredients.join(", "),
      instructions: recipe.instructions,
      servings: recipe.servings,
      cooking_time: recipe.cooking_time,
      difficulty: recipe.difficulty,
      dietary: recipe.dietary.join(", "),
      image: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "ingredients" || key === "dietary") {
        data.append(key, formData[key].split(",").map((v) => v.trim()));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await dispatch(updateRecipe(editingRecipe, data));
      toast.success("Recipe updated!");
      setEditingRecipe(null);
    } catch (err) {
      toast.error("Update failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-semibold mb-6 text-[#1E4B6D]">My Recipes</h2>

      {isLoading ? (
        <p>Loading your recipes...</p>
      ) : myRecipes.length === 0 ? (
        <p>No recipes uploaded yet.</p>
      ) : (
        myRecipes.map((recipe) => (
          <div
            key={recipe.id}
            className="border rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden"
          >
            <img
              src={recipe.image_url || "/recipe.png"}
              alt={recipe.title}
              className="w-full md:w-48 h-48 object-cover"
            />
            <div className="p-4 flex-1">
              {editingRecipe === recipe.id ? (
                <form onSubmit={handleUpdate} className="space-y-2">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full border p-2 rounded"
                    required
                  />
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="ingredients"
                    value={formData.ingredients}
                    onChange={handleChange}
                    placeholder="Ingredients (comma separated)"
                    className="w-full border p-2 rounded"
                    required
                  />
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleChange}
                    placeholder="Instructions"
                    className="w-full border p-2 rounded"
                    required
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="servings"
                      value={formData.servings}
                      onChange={handleChange}
                      placeholder="Servings"
                      className="w-full border p-2 rounded"
                      required
                    />
                    <input
                      type="number"
                      name="cooking_time"
                      value={formData.cooking_time}
                      onChange={handleChange}
                      placeholder="Cooking Time"
                      className="w-full border p-2 rounded"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    placeholder="Difficulty"
                    className="w-full border p-2 rounded"
                    required
                  />
                  <input
                    type="text"
                    name="dietary"
                    value={formData.dietary}
                    onChange={handleChange}
                    placeholder="Dietary (comma separated)"
                    className="w-full border p-2 rounded"
                  />
                  <input type="file" name="image" onChange={handleChange} />
                  <div className="flex justify-between mt-2">
                    <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded">
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingRecipe(null)}
                      className="px-3 py-1 bg-gray-300 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="font-semibold text-lg text-gray-800">{recipe.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{recipe.description}</p>
                  <p className="text-sm text-gray-500">Ingredients: {recipe.ingredients.join(", ")}</p>
                  <p className="text-sm text-gray-500">Instructions: {recipe.instructions.slice(0, 100)}...</p>
                  <p className="text-sm text-gray-500">
                    Cooking Time: {recipe.cooking_time} mins | Servings: {recipe.servings}
                  </p>
                  <p className="text-sm text-gray-500">Difficulty: {recipe.difficulty}</p>
                  <p className="text-sm text-gray-500">Dietary: {recipe.dietary.join(", ") || "None"}</p>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => handleEditClick(recipe)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recipe.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyRecipes;
