const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");

const VentaSequelize = sequelize.define(
  "Ventas",
  {
    idVenta: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombreComprador: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
    },
  },
  {
    timestamps: true,
  }
);

module.exports = VentaSequelize;