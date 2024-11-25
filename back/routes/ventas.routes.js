const express = require("express");
const path = require('path');
const router = express.Router();
const VentaSequelize = require("../entity/venta.entity.js");
const ProductoSequelize = require("../entity/producto.entity.js");
const Venta = require("../model/venta.js");

//ventas
router.post("/consulta",async(req,res)=>{
    const ventasConProductos = await VentaSequelize.findAll({
        include: ProductoSequelize
    });
    res.send(ventasConProductos);
})

router.post("/insertar",async(req,res)=>{
    await Venta.InsertarVenta(req.body.infoVenta, req.body.listaProductos);
    res.send("Insertada");
});

//Mover esta funcion! \(º_º)/
// async function InsertarVenta(infoVenta,listaProductos){
//     const venta = VentaSequelize.build({
//         nombreComprador: infoVenta.nombreComprador,
//         total: 0, 
//     });
//     await venta.save();
//     for(const producto of listaProductos){
//         const productoDB = await ProductoSequelize.findByPk(producto.id);
//         await venta.addProducto(productoDB,{through:{cantidad:producto.cantidad}});
//     }
//     await venta.save();
// }



module.exports = router;