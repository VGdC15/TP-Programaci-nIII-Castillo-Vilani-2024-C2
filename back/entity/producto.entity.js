const sequelize = require("../db/sequelize");
const { DataTypes } = require("sequelize");

const AutoSequelize = sequelize.define(
  "Producto",
  {
    idproductos: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false, // NOT NULL
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false, // NOT NULL
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      defaultValue: true,
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = AutoSequelize;