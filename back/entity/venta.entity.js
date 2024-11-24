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

VentaSequelize.beforeSave(async (venta) => {
  const productos = await venta.getProductos();

  const total = productos.reduce((sum, producto) => {
    const cantidad = producto.ProductoVenta.cantidad || 1; 
    return sum + producto.precio * cantidad;
  }, 0);

  venta.total = total;
});

module.exports = VentaSequelize;