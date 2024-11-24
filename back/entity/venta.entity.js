const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");

const VentaSequelize = sequelize.define(
  "Venta",
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
    total:{
      type: DataTypes.INTEGER,
      allowNull:false
    }
  },
  {
    timestamps: true,
  }
);

module.exports = VentaSequelize;