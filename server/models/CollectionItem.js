const { DataTypes } = require('sequelize');
const db = require('../utils/db-connection');

const CollectionItem = db.define('CollectionItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  collection_id: { type: DataTypes.INTEGER, allowNull: false },
  recipe_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'collection_items', timestamps: true });

module.exports = CollectionItem;
