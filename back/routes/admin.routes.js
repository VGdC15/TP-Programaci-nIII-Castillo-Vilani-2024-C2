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


//Menu agregar producto
router.get("/form-producto", async (req, res) => {
  res.render("form-producto",{producto: {}});
});


//Menu modificar producto
router.post("/modificar-producto", async (req, res) => {
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


//Modificar un producto
router.post("/modificar",async (req,res)=>{
  const productoFront = req.body;
  console.log(productoFront);
  await ActualizarDatosProducto(productoFront.id,productoFront);
  res.send("Producto modificado");
});


//Activar / Desactivar
router.post("/cambiar-estado",async (req,res)=>{
  const body = req.body;
  if(body.estado == 0){
    await ProductoSequelize.update({ 
      estado: 1
    }, { where: { idProductos: body.id },});
  }else if(body.estado == 1){
    await ProductoSequelize.update({ 
      estado: 0
    }, { where: { idProductos: body.id },});
  }
  res.status(200).json({ mensaje: 'El estado del producto ha si modificado' });
})



//Listar todos los productos
router.get("/productos/todos", async (req, res) => {
    const resultado = await ProductoSequelize.findAll({
    raw: true
  });
    res.render("productos-listados-admin",{productos:resultado});
});


//Crear nuevo producto
router.post("/nuevo-producto",async (req,res)=>{
  const producto = req.body;
  CrearProducto(producto);
});

//Subir imagen de producto
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


async function ActualizarDatosProducto(id,productoActualizado) {
  await ProductoSequelize.update({ 
    marca: productoActualizado.marca, 
    modelo: productoActualizado.modelo, 
    precio: productoActualizado.precio, 
    tipo: productoActualizado.tipo, 
    descripcion: productoActualizado.descripcion
  }, { where: { idProductos:id },});
}



module.exports = router;