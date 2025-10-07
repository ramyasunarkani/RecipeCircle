const { DataTypes } = require('sequelize');
const db = require('../utils/db-connection');

const Favorite = db.define('Favorite', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  recipe_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'favorites', timestamps: true, indexes: [{ fields: ['user_id','recipe_id'], unique: true }]
});

module.exports = Favorite;
