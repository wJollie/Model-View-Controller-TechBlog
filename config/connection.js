const Sequelize = require("sequelize");
require("dotenv").config();
const databaseUrl = process.env.CLEARDB_DATABASE_URL;

let sequelize;

const Sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
