import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { createRecipe } from "../Store/recipeActions";

const ShareRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authUser } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.recipes.isLoading);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    cooking_time: "",
    servings: "",
    difficulty: "Easy",
    dietary: [],
    image: null,
  });

  const dietaryOptions = ["Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"];

  useEffect(() => {
  if (!authUser) {
    toast.error("You must be logged in to share a recipe!", { duration: 1000 });
    navigate("/login", { replace: true }); 
    return;
  } else if (!authUser.is_approved) {
    toast.error("Your account is not approved yet. You cannot share recipes.", { duration: 1000 });
    navigate("/", { replace: true });
    return;
  } else if (authUser.is_banned) {
    toast.error("Your account is banned. You cannot share recipes.", { duration: 1000 });
    return; 
  }
}, [authUser, navigate]);

  const handleChange = (e) => {
    const { name, value, files, checked } = e.target;

    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else if (name === "dietary") {
      const newDietary = checked
        ? [...formData.dietary, value]
        : formData.dietary.filter((d) => d !== value);
      setFormData((prev) => ({ ...prev, dietary: newDietary }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in formData) {
      if (key === "ingredients") {
        data.append(
          key,
          JSON.stringify(formData.ingredients.split(",").map((i) => i.trim()))
        );
      } else if (key === "dietary") {
        data.append(key, JSON.stringify(formData.dietary));
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      await dispatch(createRecipe(data));
      toast.success("Recipe shared successfully!");
      setFormData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        cooking_time: "",
        servings: "",
        difficulty: "Easy",
        dietary: [],
        image: null,
      });
    } catch (error) {
      toast.error("Failed to share recipe. Please try again.");
      console.log("Error sharing recipe:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-xl shadow-lg border border-[#1E4B6D]">
      <Toaster position="top-right" reverseOrder={false} />
      <h2 className="text-2xl font-bold text-[#1E4B6D] mb-6 text-center">
        Share a Recipe
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <InputField
          label="Recipe Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Recipe Title"
        />
        <TextAreaField
          label="Short Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Short Description"
        />
        <InputField
          label="Ingredients (comma separated)"
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          placeholder="e.g. Tomato, Onion, Cheese"
        />
        <TextAreaField
          label="Instructions"
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          placeholder="Step by step instructions"
        />
        <div className="flex gap-4">
          <InputField
            label="Cooking Time (mins)"
            name="cooking_time"
            type="number"
            value={formData.cooking_time}
            onChange={handleChange}
          />
          <InputField
            label="Servings"
            name="servings"
            type="number"
            value={formData.servings}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-[#1E4B6D] mb-1">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1E4B6D]"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-[#1E4B6D] mb-1">Dietary Options</span>
          <div className="flex flex-wrap gap-3">
            {dietaryOptions.map((option) => (
              <label key={option} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  name="dietary"
                  value={option}
                  checked={formData.dietary.includes(option)}
                  onChange={handleChange}
                  className="accent-[#1E4B6D]"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="font-medium text-[#1E4B6D] mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1E4B6D]"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#1E4B6D] text-white py-2 rounded-md hover:bg-[#163a54] transition"
        >
          {isLoading ? "Sharing..." : "Share Recipe"}
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col">
    <label className="font-medium text-[#1E4B6D] mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1E4B6D]"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div className="flex flex-col">
    <label className="font-medium text-[#1E4B6D] mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#1E4B6D]"
    />
  </div>
);

export default ShareRecipe;
