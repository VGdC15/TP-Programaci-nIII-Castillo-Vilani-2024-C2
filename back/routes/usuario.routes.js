const express = require("express");
const router = express.Router();
const UsuarioSequelize = require("../entity/usuario.entity.js"); 
  
// Ruta para registrar usuarios
router.post("/registro", async (req, res) => {
    const { email, password } = req.body;

    // Validación de datos
    if (!email || !password) {
        return res.status(400).send("Faltan datos obligatorios.");
    }

    try {
        // Guarda al usuario en la base de datos
        const nuevoUsuario = await UsuarioSequelize.create({ email, password });
        res.status(201).send(`Usuario ${nuevoUsuario.email} registrado con éxito.`);
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).send("Error al registrar el usuario.");
    }
});

module.exports = router;
  