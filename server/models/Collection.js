const { DataTypes } = require('sequelize');
const db = require('../utils/db-connection');

const Collection = db.define('Collection', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  name: { type: DataTypes.STRING(100), allowNull: false }
}, { tableName: 'collections', timestamps: true });

module.exports = Collection;
