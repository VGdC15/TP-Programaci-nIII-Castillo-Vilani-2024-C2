const router = require("./producto.routes");
const Venta = require("../model/venta.js");
const mw = require("../middlewares/ventas.mw.js");

//Menu agregar producto
router.post("/finalizar-compra",
    mw.validarListaIds,
    mw.validarNombreComprador,
    async (req, res) => {
        try{
            const {nombreComprador,productos} = req.body
            const idVenta = await Venta.InsertarVenta(nombreComprador,productos);
            res.status(201).json({ idVenta: idVenta });
        }catch{
            res.status(500).send("Algo fallo al concretar la venta");
        } 
});

router.post("/mostrar-ticket",mw.validarId,async(req,res)=>{
    const {idVenta} = req.body;
    const infoVenta = await Venta.ConsultarVenta(idVenta);
    res.render("ticket",
        {datos:[
            {
                nombre:infoVenta.dataValues.nombreComprador,
                fecha: infoVenta.dataValues.createdAt,
                numeroTicket: infoVenta.dataValues.idVenta,
                total:infoVenta.dataValues.total
            },
            {productos: infoVenta.Productos}
            ]
        });
});


module.exports = router;
