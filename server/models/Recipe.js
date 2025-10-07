const { DataTypes } = require('sequelize');
const db = require('../utils/db-connection');

const Recipe = db.define('Recipe', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING(200), allowNull: false },
  description: { type: DataTypes.TEXT },
  ingredients: { type: DataTypes.JSONB, allowNull: false }, 
  instructions: { type: DataTypes.TEXT, allowNull: false },
  cooking_time: { type: DataTypes.INTEGER },
  servings: { type: DataTypes.INTEGER },
  difficulty: { type: DataTypes.ENUM('easy','medium','hard'), defaultValue: 'medium' },
  dietary: { type: DataTypes.ARRAY(DataTypes.ENUM('vegetarian','vegan','gluten_free','dairy_free','keto','paleo')) }, // array of labels
  image_url: { type: DataTypes.TEXT },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'recipes', timestamps: true
});

module.exports = Recipe;
