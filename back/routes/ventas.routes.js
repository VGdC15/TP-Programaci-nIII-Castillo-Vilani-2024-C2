const express = require("express");
const path = require('path');
const router = express.Router();
const VentaSequelize = require("../entity/venta.entity.js");
const ProductoSequelize = require("../entity/producto.entity.js");
const Producto = require("../public/javascripts/producto.js");

//ventas

router.post("/consulta",async(req,res)=>{
    const ventasConProductos = await VentaSequelize.findAll({
        include: ProductoSequelize
    });
    res.send(ventasConProductos);
})

router.post("/insertar",async(req,res)=>{
    // const venta = await VentaSequelize.create({
    //     nombreComprador:req.body.nombreComprador,
    //     total:req.body.total
    // })
    await InsertarVenta(req.body.infoVenta, req.body.listaProductos);
    res.send("Insertada");
});


async function InsertarVenta(infoVenta,listaId){
        const venta = await VentaSequelize.create({
            nombreComprador:infoVenta.nombreComprador,
            total:infoVenta.total
        })
        const p = await ProductoSequelize.findByPk(1);
        const pa = await ProductoSequelize.findByPk(2);
        console.log(p);
        const result = await venta.addProducto(p,{through:{cantidad:3}});
        await venta.addProducto(pa,{through:{cantidad:1}});
        console.log(result);
        // const productos = await Producto.AgregarProductosVenta(listaId);
        // for(const producto of productos){
        //     venta.addProductos(producto);
        // }
}

// router.post("/insertar",async(req,res)=>{
//     await InsertarVenta(req.body.infoVenta, req.body.listaProductos);
//     res.send("Insertada");
// });


// async function InsertarVenta(infoVenta,listaId){
//         const venta = await VentaSequelize.create({
//             nombreComprador:infoVenta.nombreComprador,
//             total:infoVenta.total
//         })
//         const productos = await Producto.AgregarProductosVenta(listaId);
//         for(const producto of productos){
//             venta.addProductos(producto);
//         }
// }


module.exports = router;