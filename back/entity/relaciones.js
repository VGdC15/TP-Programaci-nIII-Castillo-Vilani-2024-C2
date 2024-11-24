const producto = require("./producto.entity.js");
const venta = require("./venta.entity.js");
const sequelize = require("../db/sequelize");
const { DataTypes, Sequelize, INTEGER } = require("sequelize");

async function Relacionar(){
    const ProductoVenta = sequelize.define(
        'ProductoVenta',{
            cantidad:{
                type:INTEGER,
                allowNull:false,
                defaultValue:1
            }
        },
        {
          selfGranted: DataTypes.BOOLEAN,
        },
        { timestamps: false },
      );
      producto.belongsToMany(venta, { through: ProductoVenta });
      venta.belongsToMany(producto, { through: ProductoVenta });
}
// async function Relacionar(){
//     venta.belongsToMany(producto,{ through:"VentaProducto" });
//     producto.belongsToMany(venta, { through: "VentaProducto" });
// }

module.exports = Relacionar;