const { DataTypes } = require('sequelize');
const db = require('../utils/db-connection');

const User = db.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true, validate: { isEmail: true } },
  password: { type: DataTypes.TEXT, allowNull: false }, 
  bio: { type: DataTypes.TEXT },
  avatar_url: { type: DataTypes.TEXT },
  role: { type: DataTypes.ENUM('user','admin'), defaultValue: 'user' },
  is_banned: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_approved: { type: DataTypes.BOOLEAN, defaultValue: false } 
}, {
  tableName: 'users', 
  timestamps: true
});

module.exports = User;
