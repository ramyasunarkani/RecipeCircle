const { DataTypes } = require('sequelize');
const db = require('../utils/db-connection');

const Follow = db.define('Follow', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  follower_id: { type: DataTypes.INTEGER, allowNull: false },
  following_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'follows', timestamps: true, indexes: [{ fields: ['follower_id','following_id'], unique: true }] });

module.exports = Follow;
