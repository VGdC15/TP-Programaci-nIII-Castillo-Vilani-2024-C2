const express = require("express");
const path = require('path');
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");

// localhost:3000/productos/
router.get("/todos",async (req,res,next)=>{
  try{
    const resultado = await ProductoSequelize.findAll({
      where: { estado : true},
      raw: true
    });
    res.render('productos-listados',{productos:resultado});
  }catch{
    res.status(500).send({error:"Error al obtener los productos"}); 
  }
});


module.exports = router;