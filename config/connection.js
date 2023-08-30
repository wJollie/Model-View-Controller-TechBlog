const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(process.env.CLEARDB_DATABASE_URL, {
  dialect: "mysql",
});

module.exports = sequelize;
