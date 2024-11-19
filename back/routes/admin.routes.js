const express = require("express");
const path = require('path');
const router = express.Router();
const ProductoSequelize = require("../entity/producto.entity.js");

// localhost:3000/admin/
router.get("/nuevo-producto", async (req, res) => {
  res.render("form-nuevo-producto");
});


router.post("/modificar-producto", async (req, res) => {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: 'Id incorrecto' });
    }

    const producto = await ProductoSequelize.findByPk(id);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.render("form-nuevo-producto",{producto:producto});
});

router.get("/productos/todos", async (req, res) => {
    const resultado = await ProductoSequelize.findAll({
    where: { estado : true},
    raw: true
    });
    res.render("productos-listados-admin",{productos:resultado});
});

module.exports = router;