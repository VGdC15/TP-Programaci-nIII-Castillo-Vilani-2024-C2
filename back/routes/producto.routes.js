const express = require("express");
const path = require('path');
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");
const Producto = require("../public/javascripts/producto.js");

// localhost:3000/productos/
router.get("/", async (req, res) => {
  const resultado = await ProductoSequelize.findAll({
    where: { estado : true},
  });
  res.send(resultado);
});


router.get("/todos",async (req,res,next)=>{
  const resultado = await ProductoSequelize.findAll({
    where: { estado : true},
    raw: true
  });
  res.render('productos-listados',{productos:resultado});
});


router.post("/insertar",(req,res)=>{
    const producto = {
      marca : req.body.marca,
      modelo : req.body.modelo,
      imagen : req.body.imagen,
      precio : req.body.precio,
      tipo : req.body.tipo,
      estado : req.body.estado,
      descripcion : req.body.descripcion
    };
    Producto.Crear(producto);
    res.send("Insertado");
});


module.exports = router;