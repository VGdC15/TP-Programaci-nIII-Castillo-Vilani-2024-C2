const express = require("express");
const { request } = require("http");
const app = express();
const path = require("path");
const { prependListener } = require("process");
const router = require("./producto.routes");
const Venta = require("../model/venta.js");

//Menu agregar producto
router.post("/finalizar-compra", async (req, res) => {
    //Creo la venta    
    const idVenta = await Venta.InsertarVenta(req.body.nombreComprador,req.body.productos);
    res.status(201).json({ idVenta: idVenta });
});

router.post("/mostrar-ticket",async(req,res)=>{
    const infoVenta = await Venta.ConsultarVenta(req.body.idVenta);
    res.render("ticket",
        {datos:[
            {
                nombre:infoVenta.dataValues.nombreComprador,
                fecha: infoVenta.dataValues.createdAt,
                numeroTicket: infoVenta.dataValues.idVenta,
                total:infoVenta.dataValues.total
            },
            {productos: infoVenta.Productos}
            ]
        });
});


module.exports = router;
