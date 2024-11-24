const ProductoSequelize = require("../../entity/producto.entity");

class Producto{
    static async Crear(producto){
        try{
          const nuevoProducto = await ProductoSequelize.create({
            marca:producto.marca,
            modelo:producto.modelo,
            imagen:producto.imagen,
            precio:producto.precio,
            tipo:producto.tipo,
            estado:producto.estadoa,
            descripcion:producto.descripcion
          })
          return nuevoProducto;
        }catch(error){
            console.error("Error al insertar el producto", error);
        }
    }
    
    
    
    static async AgregarProductosVenta(listaIdsProductos){
        console.log(listaIdsProductos);
        const productosDB = [];
        for(const id of listaIdsProductos){
            console.log(id);
            try{
                const productoDB = await ProductoSequelize.findByPk(id);
                console.log(productoDB);
                productosDB.push(productoDB);
            }catch{
                
            }
        }
        return productosDB;
    }

    
    // static async CrearVariosProductos(listaProductos){
    //     const productosDB = [];
    //     for(const producto of listaProductos){
    //         try{
    //             const productoDB = await this.Crear(producto);
    //             productosDB.push(productoDB);
    //         }catch{
                
    //         }
    //     }
    //     return productosDB;
    // }
}

module.exports = Producto;