const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    port: process.env.MYSQL_PORT,
    dialectOptions: {
      useUTC: false,
    },
    timezone: "America/Argentina/Buenos_Aires",
  }
);

module.exports = sequelize;