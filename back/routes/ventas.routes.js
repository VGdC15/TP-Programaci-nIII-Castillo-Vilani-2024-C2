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
    console.log(ventasConProductos);
    res.send(ventasConProductos);
})

router.post("/insertar",async(req,res)=>{
    const {nombreComprador,listaProductos} = req.body;
    await Venta.InsertarVenta(nombreComprador, listaProductos);
    res.send("Insertada");
});


module.exports = router;