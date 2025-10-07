const { User, Recipe } = require('../models');

const addFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findByPk(req.user.id);

    const favorites = await user.getFavorites({ where: { id: recipeId } });
    if (favorites.length > 0) {
      return res.status(400).json({ message: "Already favorited" });
    }

    await user.addFavorite(recipeId);
    res.status(201).json({ message: "Added to favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { recipeId } = req.params;
    const user = await User.findByPk(req.user.id);

    await user.removeFavorite(recipeId);
    res.status(200).json({ message: "Removed from favorites" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [
        {
          model: Recipe,
          as: "favorites",
        }
      ]
    });

    res.status(200).json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };
