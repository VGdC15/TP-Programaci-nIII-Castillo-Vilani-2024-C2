const express = require("express");
const path = require('path');
const router = express.Router();
const VentaSequelize = require("../entity/venta.entity.js");
const ProductoSequelize = require("../entity/producto.entity.js");
const Venta = require("../model/venta.js");

//ventas
router.get("/consulta",async(req,res)=>{
    const ventasConProductos = await VentaSequelize.findAll({
        include: ProductoSequelize
    });
    const ventasJSON = ventasConProductos.map(venta => {
        const jsonVenta = venta.toJSON();
        return {
            ...jsonVenta
        }
    });
    res.send(ventasJSON);
})

router.post("/insertar",async(req,res)=>{
    const {nombreComprador,listaProductos} = req.body;
    await Venta.InsertarVenta(nombreComprador, listaProductos);
    res.send("Insertada");
});


module.exports = router;