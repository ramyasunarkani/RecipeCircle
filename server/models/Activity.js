const { DataTypes } = require("sequelize");
const sequelize = require("../utils/db-connection");

const Activity = sequelize.define("Activity", {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  payload: {
    type: DataTypes.JSON,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  recipe_id: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
});

module.exports = Activity;
