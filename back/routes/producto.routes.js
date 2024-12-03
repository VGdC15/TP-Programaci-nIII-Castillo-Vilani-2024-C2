const express = require("express");
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");
const PC = require("../controllers/producto.controller.js");

// localhost:3000/productos/
router.get("/todos",async (req,res)=>{
  try{
    const {indice,direccion} = req.query;
    const indiceNuevo = PC.CalcularIndice(indice,direccion);
    const resultado = await ProductoSequelize.findAll({
      where: { estado : true},
      raw: true,
      offset: indiceNuevo,
      limit: 4
    });
    if(resultado.lenght === 0){
      res.status(100);
    }else{
      res.status(201).render('productos-listados',{productos:resultado});
    }
  }catch{
    res.status(500).send({error:"Error al obtener los productos"}); 
  }
});


router.get("/cascos",async (req,res)=>{
  const {indice,direccion} = req.query;
  const resultado = await PC.TraerEspecifico("casco",indice,direccion);
  if(resultado.length === 0){
    res.status(100);
  }else{
    res.status(201).render('productos-listados',{productos:resultado});
  }
});

router.get("/camperas",async (req,res)=>{
  const {indice,direccion} = req.query;
  const resultado = await PC.TraerEspecifico("campera",indice,direccion);
  if(resultado.length === 0){
    res.status(100);
  }else{
    res.status(201).render('productos-listados',{productos:resultado});
  }
});


module.exports = router;