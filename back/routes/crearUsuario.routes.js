const express = require("express");
const router = express.Router();
const UsuarioSequelize = require("../entity/usuario.entity.js"); 
const { registro } = require("../encriptar/contrasenias.js");
const { login } = require("../encriptar/contrasenias.js");
const mw = require("../middlewares/usuario.mw.js");


router.post("/crearUsuario",mw.validarContraseña,mw.validarEmail, async (req, res) => {
    const { email, password } = req.body;

    try {
        // Genera iv y contraseña encriptada
        const { iv, encriptado } = registro(password);

        // Guarda al usuario en la base de datos
        const nuevoUsuario = await UsuarioSequelize.create({
            email,
            iv: iv.toString("hex"), 
            passwordEncriptada: encriptado,
        });

        res.status(201).send({ mensaje: "Usuario creado con éxito" });
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(500).send("Error al registrar el usuario.");
    }
});


// Ruta para ingresar usuarios
router.post("/login",mw.validarContraseña, mw.validarEmail, async (req, res) => {
    const { email, password } = req.body;
    try {
        const usuario = await UsuarioSequelize.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }
        const { iv, passwordEncriptada } = usuario;

        const validar = login(password, iv, passwordEncriptada);

        if(!validar){
            return res.status(401).json({ success: false, message: "Contraseña incorrecta." });
        }

        res.status(200).json({ success: true, message: "Usuario logueado exitosamente!" });
    } catch (error) {
        console.error("Error al loguear el usuario:", error);
        res.status(500).json({ success: false, message: "Error al loguear el usuario" });
    }
});


module.exports = router;