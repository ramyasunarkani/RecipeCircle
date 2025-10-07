const { Collection, Recipe, CollectionItem } = require('../models');

const createCollection = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Collection name is required" });

    const collection = await Collection.create({ name, user_id: req.user.id });
    res.status(201).json(collection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" });
  }
};

const getCollections = async (req, res) => {
  try {
    const collections = await Collection.findAll({
      where: { user_id: req.user.id },
      include: [
        { model: Recipe, as: "recipes" } 
      ]
    });
    res.status(200).json(collections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" });
  }
};

const addRecipeToCollection = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.params;

    const collection = await Collection.findOne({
      where: { id: collectionId, user_id: req.user.id }
    });
    if (!collection) return res.status(404).json({ message: "Collection not found" });

   
    const exists = await CollectionItem.findOne({ where: { collection_id: collectionId, recipe_id: recipeId } });
    if (exists) return res.status(400).json({ message: "Recipe already in collection" });

    await CollectionItem.create({ collection_id: collectionId, recipe_id: recipeId });
    res.status(201).json({ message: "Recipe added to collection" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" });
  }
};

const removeRecipeFromCollection = async (req, res) => {
  try {
    const { collectionId, recipeId } = req.params;

    const collection = await Collection.findOne({
      where: { id: collectionId, user_id: req.user.id }
    });
    if (!collection) return res.status(404).json({ message: "Collection not found" });

    await CollectionItem.destroy({ where: { collection_id: collectionId, recipe_id: recipeId } });
    res.status(200).json({ message:"Recipe removed from collection" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message:"Internal Server Error" });
  }
};

module.exports = { createCollection, getCollections, addRecipeToCollection, removeRecipeFromCollection };
