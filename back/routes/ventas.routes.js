const express = require("express");
const path = require('path');
const router = express.Router();
const VentaSequelize = require("../entity/venta.entity.js");


router.post("/insertar",async(req,res)=>{
    const n = req.body;
    console.log(n);
    await VentaSequelize.create({
        nombreComprador:n.nombre
    })
    res.send("creado");
});

module.exports = router;