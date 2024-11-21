const producto = require("./producto.entity.js");
const venta = require("./venta.entity.js");

function Relacionar(){
    venta.hasMany(producto);
    producto.belongsTo(venta);
}

module.exports = Relacionar;