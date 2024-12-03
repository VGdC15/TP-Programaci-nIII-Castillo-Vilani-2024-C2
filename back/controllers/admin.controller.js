const ProductoSequelize = require("../entity/producto.entity.js");


async function CambiarEstado(estado,id){
    const nuevoEstado = estado === 0 ? 1 : 0;
    try{
      const [filasActualizadas] = await ProductoSequelize.update(
        { estado: nuevoEstado },
        { where: { idProductos: id } }
      );
    
      return filasActualizadas > 0;
    }catch{
      return false;
    }
  }
  
  
  async function CrearProducto(producto) {
    try {
      const nuevoProducto = await ProductoSequelize.create({
        marca: producto.marca,
        modelo: producto.modelo,
        precio: producto.precio,
        imagen: producto.imagen,
        tipo: producto.tipo,
        descripcion: producto.descripcion
      });
      console.log('Producto creado:', nuevoProducto.toJSON());
      return true;
    } catch (error) {
      return false;
    }
  }
  
  
  async function ActualizarDatosProducto(id,productoActualizado) {
    try{
      const resultado = await ProductoSequelize.update({ 
        marca: productoActualizado.marca, 
        modelo: productoActualizado.modelo, 
        precio: productoActualizado.precio, 
        tipo: productoActualizado.tipo, 
        descripcion: productoActualizado.descripcion
      }, { where: { idProductos:id },});
      if (resultado[0] === 0) {
        throw new Error("Producto no encontrado");
      }
    } catch (error) {
      throw new Error(error.message || "Error al actualizar el producto");
    }
  }


module.exports.CambiarEstado = CambiarEstado;
module.exports.CrearProducto = CrearProducto;
module.exports.ActualizarDatosProducto = ActualizarDatosProducto;