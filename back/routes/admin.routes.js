const express = require("express");
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");
const AC = require("../controllers/admin.controller.js");
const PC = require("../controllers/producto.controller.js");
const mw = require("../middlewares/admin-mw.js");
const multer = require("multer");


//    \(º_º)/  MOVER  \(º_º)/
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
//    \(º_º)/  MOVER  \(º_º)/
//----------------------------------------------




//Menu agregar producto
router.get("/form-producto", async (req, res) => {
  try{
    res.render("form-producto",{producto: {}});
  }catch{
    res.status(500).send({error:"Error al cargar el formulario"});
  }
});


//Menu modificar producto
router.post("/modificar-producto", mw.validarId, async (req, res) => {
    const { id } = req.body;
    const producto = await ProductoSequelize.findByPk(id);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    try{
      res.render("form-producto",{producto:producto});
    }catch{
      res.status(500).send({error:"Error al cargar el formulario"});
    }
});


//Modificar un producto
router.post("/modificar",
  mw.validarId,
  mw.validarPrecio,
  mw.validarTipo,
  mw.validarInfoTexto,
  async (req,res)=>{
    const productoFront = req.body;
    try{
      await AC.ActualizarDatosProducto(productoFront.id,productoFront);
      res.status(200).send("Producto modificado");
    }catch(error){
      res.status(500).json({message:error.message});
    }
  });


//Activar / Desactivar
router.post("/cambiar-estado", mw.validarId,mw.validarEstado, async (req,res)=>{
  const {estado,id} = req.body;
  const resultado = await AC.CambiarEstado(estado,id);
  if(resultado){
    res.status(200).json({ mensaje: 'El estado del producto ha si modificado' });
  }else{
    res.status(500);
  }
})


//Listar todos los productos
router.get("/productos/todos", async (req, res) => {
  try{
      const resultado = await ProductoSequelize.findAll({
        raw: true
      });
      res.render("productos-listados-admin",{productos:resultado});
  }catch{
    res.status(500).send({error:"Error al traer los productos"});
  }
});

router.get("/productos",async (req,res)=>{
  try{
    const {indice,direccion} = req.query;
    const indiceNuevo = PC.CalcularIndice(indice,direccion);
    const resultado = await ProductoSequelize.findAll({
      raw: true,
      offset: indiceNuevo,
      limit: 4
    });
    if(resultado.lenght === 0){
      res.status(100);
    }else{
      res.status(201).render('productos-listados-admin',{productos:resultado});
    }
  }catch{
    res.status(500).send({error:"Error al obtener los productos"}); 
  }
})



//Crear nuevo producto
router.post("/nuevo-producto",mw.validarPrecio,mw.validarInfoTexto,async (req,res)=>{
  try{
    const producto = req.body;
    const resultado = await AC.CrearProducto(producto);
    if(resultado){
      res.status(200).send({mensaje:"Producto agregado"});
    }else{
      res.status(500).send({error:"Error al agregar el producto"});
    }
  }catch(err){
    console.log(err);
    res.status(500).send({error:"Error al agregar el producto"});
  }
});


//Subir imagen de producto
router.post("/carga",upload.single("imagen"),mw.validarImagen,(req,res)=>{
  try{
    res.send({ruta:req.savedFileName});
  }catch(err){
    console.log(err);
  }
});



// async function CambiarEstado(estado,id){
//   const nuevoEstado = estado === 0 ? 1 : 0;
//   try{
//     const [filasActualizadas] = await ProductoSequelize.update(
//       { estado: nuevoEstado },
//       { where: { idProductos: id } }
//     );
  
//     return filasActualizadas > 0;
//   }catch{
//     return false;
//   }
// }


// async function CrearProducto(producto) {
//   try {
//     const nuevoProducto = await ProductoSequelize.create({
//       marca: producto.marca,
//       modelo: producto.modelo,
//       precio: producto.precio,
//       imagen: producto.imagen,
//       tipo: producto.tipo,
//       descripcion: producto.descripcion
//     });
//     console.log('Producto creado:', nuevoProducto.toJSON());
//     return true;
//   } catch (error) {
//     return false;
//   }
// }


// async function ActualizarDatosProducto(id,productoActualizado) {
//   try{
//     const resultado = await ProductoSequelize.update({ 
//       marca: productoActualizado.marca, 
//       modelo: productoActualizado.modelo, 
//       precio: productoActualizado.precio, 
//       tipo: productoActualizado.tipo, 
//       descripcion: productoActualizado.descripcion
//     }, { where: { idProductos:id },});
//     if (resultado[0] === 0) {
//       throw new Error("Producto no encontrado");
//     }
//   } catch (error) {
//     throw new Error(error.message || "Error al actualizar el producto");
//   }
// }



module.exports = router;