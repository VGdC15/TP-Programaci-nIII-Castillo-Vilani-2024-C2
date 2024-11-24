const express = require("express");
const { request } = require("http");
const app = express();
const path = require("path");
const { prependListener } = require("process");
const router = require("./producto.routes");


//Menu agregar producto
router.post("/finalizar-compra", async (req, res) => {
    console.log(req.body.productos);
    res.render("ticket",
        {datos:[
            {
                nombre: "pepe",
                fecha: "14-4",
                numeroTicket: "0000",
            },
            {productos: req.body.productos}
            ]
        });
});

module.exports = router;
