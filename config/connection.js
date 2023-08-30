const Sequelize = require("sequelize");
require("dotenv").config();
const databaseUrl = process.env.DB_URL;
const url = require("url");
const parsedUrl = url.parse(databaseUrl);
const dbName = parsedUrl.pathname.replace(/^\//, ""); // Extract the database name from the path
const dbHost = parsedUrl.hostname;

let sequelize;

sequelize = new Sequelize(dbName, process.env.DB_USER, process.env.DB_PW, {
  host: dbHost,
  dialect: "mysql",
  port: 3306,
});

module.exports = sequelize;
