const { DataTypes } = require('sequelize');
const db = require('../utils/db-connection');

const Review = db.define('Review', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  comment: { type: DataTypes.TEXT },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  recipe_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'reviews', timestamps: true, indexes: [{ fields: ['recipe_id'] }] });

module.exports = Review;
