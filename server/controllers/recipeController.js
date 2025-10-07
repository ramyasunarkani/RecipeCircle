const { Recipe,User, Activity } = require('../models');
const uploadImageToS3 = require('../utils/uploadToS3');

const createRecipe = async (req, res) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      cooking_time,
      servings,
      difficulty,
      dietary
    } = req.body;

    const parsedIngredients = typeof ingredients === 'string' ? JSON.parse(ingredients) : ingredients;
    const parsedDietary = typeof dietary === 'string' ? JSON.parse(dietary) : dietary;

    const recipeData = {
      title,
      description,
      ingredients: parsedIngredients,
      instructions,
      cooking_time,
      servings,
      difficulty: difficulty.toLowerCase(),
      dietary: parsedDietary?.map(d => d.toLowerCase()),
      user_id: req.user.id
    };

    if (req.file) {
      const imageUrl = await uploadImageToS3(
        req.file.buffer,
        `recipe-${req.user.id}-${Date.now()}.jpg`,
        req.file.mimetype
      );
      recipeData.image_url = imageUrl;
    }

    const newRecipe = await Recipe.create(recipeData);

    await Activity.create({
      user_id: req.user.id,
      type: "CREATE_RECIPE",
      payload: { recipeId: newRecipe.id, title: newRecipe.title },
      recipe_id: newRecipe.id
    });

    res.status(201).json(newRecipe);

  } catch (error) {
    console.error("Create recipe error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });
    if (recipe.user_id !== req.user.id) return res.status(403).json({ message: "Not allowed" });

    const fields = ['title', 'description', 'ingredients', 'instructions', 'cooking_time', 'servings', 'difficulty', 'dietary'];

    fields.forEach(f => {
      if (req.body[f]) {
        if (f === 'ingredients' || f === 'dietary') {
          try {
           
            recipe[f] = JSON.parse(req.body[f]);
          } catch {
            recipe[f] = req.body[f].split(',').map(i => i.trim());
          }
        } else {
          recipe[f] = req.body[f];
        }
      }
    });

    if (req.file) {
      const imageUrl = await uploadImageToS3(
        req.file.buffer,
        `recipe-${req.user.id}-${Date.now()}.jpg`,
        req.file.mimetype
      );
      recipe.image_url = imageUrl;
    }

    await recipe.save();
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteRecipe = async (req,res)=>{
  try{
    const recipe = await Recipe.findByPk(req.params.id);
    if(!recipe) return res.status(404).json({ message:"Recipe not found" });
    if(recipe.user_id !== req.user.id) return res.status(403).json({ message:"Not allowed" });
    await recipe.destroy();
    res.status(200).json({ message:"Recipe deleted" });
  } catch(error){ console.error(error); res.status(500).json({ message:"Internal Server Error" }); }
};

const getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: "author", 
          attributes: ["id", "name", "email", "avatar_url"], 
        },
      ],
    });

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getAllRecipes = async (req,res)=>{
  try{
    const recipes = await Recipe.findAll({ order:[['createdAt','DESC']] });
    res.status(200).json(recipes);
  } catch(error){ console.error(error); res.status(500).json({ message:"Internal Server Error" }); }
};

module.exports = { createRecipe, updateRecipe, deleteRecipe, getRecipe, getAllRecipes };
