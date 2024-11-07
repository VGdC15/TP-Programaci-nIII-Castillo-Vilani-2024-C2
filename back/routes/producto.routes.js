const express = require("express");
const router = express.Router();
const Producto = require("../model/producto.js");
const ProductoSequelize = require("../entity/producto.entity.js");

// localhost:3000/producto/
router.get("/", async (req, res) => {
  const resultado = await ProductoSequelize.findAll({
    where: { estado : true},
  });
  res.send(resultado);
});


router.post("/insertar",(req,res)=>{
    const marca = req.body.marca;
    const modelo = req.body.modelo;
    const imagen = req.body.imagen;
    const precio = req.body.precio;
    const tipo = req.body.tipo;
    const estado = req.body.estado;
    const descripcion = req.body.descripcion;

    Crear(marca,modelo,imagen,precio,tipo,estado,descripcion);
    
    res.send("Insertado");
});

async function Crear(rMarca,rModelo,rImagen,rPrecio,rTipo,rEstado,rDescripcion){
  try{
    const nuevoProducto = await ProductoSequelize.create({
      marca:rMarca,
      modelo:rModelo,
      imagen:rImagen,
      precio:rPrecio,
      tipo:rTipo,
      estado:rEstado,
      descripcion:rDescripcion
    })
  }catch(error){
      console.error("Error al insertar el producto", error);
  }
}

// router.post("/", (req, res) => {
//   // Tomar los datos del body
//   const nombre = req.body.nombre;
//   const patente = req.body.patente;
//   const precio = req.body.precio;

//   // Crear un auto
//   const auto = new Auto();
//   auto.nombre = nombre;
//   auto.patente = patente;
//   auto.precio = precio;

//   if (precio <= 0) {
//     res.status(400).send({ error: true });
//   } else {
//     res.status(200);
//     res.send(auto.toJson());
//   }
// });

// router.put("/", (req, res) => {
//   res.status(501);
//   throw new Error("Not implented");
// });

module.exports = router;