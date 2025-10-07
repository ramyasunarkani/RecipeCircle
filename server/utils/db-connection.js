const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
    dialectOptions: process.env.DB_SSL === "true" ? { ssl: { rejectUnauthorized: false } } : {}
  }
);

module.exports = sequelize;
