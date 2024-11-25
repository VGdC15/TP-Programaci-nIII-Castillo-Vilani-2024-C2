const VentaSequelize = require("../entity/venta.entity");
const ProductoSequelize = require("../entity/producto.entity");

class Venta{
    static async InsertarVenta(nombreComprador,listaProductos){
        const venta = VentaSequelize.build({
            nombreComprador: nombreComprador,
            total: 0, 
        });
        await venta.save();
        for(const producto of listaProductos){
            const productoDB = await ProductoSequelize.findByPk(producto.id);
            await venta.addProducto(productoDB,{through:{cantidad:producto.cantidad}});
        }
        await venta.save();
        console.log(venta.idVenta);
        return venta.idVenta;
    }

    static async ConsultarVenta(idVenta){
        const venta = await VentaSequelize.findByPk(idVenta,{
            include: {
                model: ProductoSequelize,
                through: {attributes:["cantidad"]}
            }
        });
        return venta;
    }
}

module.exports = Venta;