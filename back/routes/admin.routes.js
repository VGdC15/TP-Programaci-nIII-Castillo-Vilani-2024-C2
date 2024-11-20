const express = require("express");
const path = require('path');
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");

const multer = require("multer");
const { error } = require("console");
const storage = multer.diskStorage({
  filename: (req,file,callback)=>{
    const mimetype = file.mimetype;
    const [tipo,extension] = mimetype.split("/");
    if(tipo!=="image"){
      callback(new Error("No es una imagen"));
    }else{
      const nombre = file.originalname + "-" + Date.now() + "." + extension; 
      req.savedFileName = nombre;
      callback(null,nombre);
    }
  },
  destination:(req,file,callback)=>{
    callback(null,"public/images/productos/");
  }
});
const upload = multer({storage:storage});

// localhost:3000/admin/
router.get("/nuevo-producto", async (req, res) => {
  res.render("form-producto",{producto: {}});
});


router.post("/modificar-producto", async (req, res) => {
  console.log(req.body.id);
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'Id incorrecto' });
    }

    const producto = await ProductoSequelize.findByPk(id);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.render("form-producto",{producto:producto});
});

router.get("/productos/todos", async (req, res) => {
    const resultado = await ProductoSequelize.findAll({
    raw: true
    });
    res.render("productos-listados-admin",{productos:resultado});
});


router.post("/nuevo-producto",async (req,res)=>{
  const producto = req.body;
  CrearProducto(producto);
});


router.post("/carga",upload.single("imagen"),(req,res)=>{
  res.send({ruta:req.savedFileName});
});

//Esta funcion no va aca me parece 
async function CrearProducto(producto) {
  try {
    const nuevoProducto = await ProductoSequelize.create({
      marca: producto.marca,
      modelo: producto.modelo,
      precio: producto.precio,
      imagen: producto.imagen, // Hay que guardar la imagen primero y despues pasar la ruta
      tipo: producto.tipo,
      descripcion: producto.descripcion
    });
    console.log('Producto creado:', nuevoProducto.toJSON());
  } catch (error) {
    console.error('Error al crear producto:', error);
  }
}
module.exports = router;