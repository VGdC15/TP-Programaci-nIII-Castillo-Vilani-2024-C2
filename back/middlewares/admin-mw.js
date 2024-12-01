const validarId = (req, res, next) => {
    const { id } = req.body;

    if (id === undefined || id === null || id === "") {
        return res.status(400).json({ error: "Id no ingresado" });
    }
    if (isNaN(id)) {
        return res.status(400).json({ error: "El id debe ser un número" });
    }
    if (Number(id) < 0) {
        return res.status(400).json({ error: "El id no puede ser negativo" });
    }
    
    next();
};

const validarInfoTexto = (req,res,next)=>{
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ0-9]+$/;
    const {marca,modelo,tipo} = req.body;
    const info = [marca,modelo,tipo];
    for(let campo of info){
        console.log(campo);
        if(campo === undefined || campo === null || campo === ""){
            console.log("vacio");
            return res.status(400).json({error: "Los campos no deben estar vacios"});
        }
        if(typeof campo !== "string"){
            console.log("no es string");
            return res.status(400).json({error:"El nombre debe ser una palabra"});
        }
        if(!regex.test(campo)){
            console.log("no es una palabra");
            return res.status(400).json({error:"El nombre debe ser una palabra"});
        }
    }
    next();
}

const validarPrecio = (req,res,next)=>{
    const {precio} = req.body;
    if (precio === undefined || precio === null || precio === "") {
        return res.status(400).json({ error: "Precio no ingresado" });
    }
    if (isNaN(precio)) {
        return res.status(400).json({ error: "El precio debe ser un número" });
    }
    if (Number(precio) < 0) {
        return res.status(400).json({ error: "El precio no puede ser negativo" });
    }
    
    next();
}

const validarEstado = (req,res,next)=>{
    const {estado} = req.body;
    if(estado != 0 && estado != 1){
        return res.status(400).json({error:"El estado debe ser 1 o 0"});
    }
     
    next()
}

const validarTipo = (req,res,next)=>{
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    const { tipo } = req.body;
    if (tipo === undefined || tipo === null || tipo === "") {
        return res.status(400).json({ error: "Tipo no ingresado" });
    }
    if(typeof tipo !== "string"){
        return res.status(400).json({error:"El tipo debe ser una palabra"});
    }
    if(!regex.test(tipo)){
        return res.status(400).json({error:"El tipo debe ser una palabra"});
    }
    if(tipo !== "casco" && tipo != "campera"){
        return res.status(400).json({error:"El tipo debe ser casco o campera"});
    }

    next();
}

const validarImagen = (req,res,next)=>{
    if (!req.file) {
        return res.status(400).send({ error: "No se ha subido ningún archivo." });
    }
    
    const mimePermitidos = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!mimePermitidos.includes(req.file.mimetype)) {
        return res.status(400).send({ error: "El archivo subido no es una imagen válida." });
    }
    
    next();
}

module.exports.validarId = validarId;
module.exports.validarInfoTexto = validarInfoTexto;
module.exports.validarPrecio = validarPrecio;
module.exports.validarEstado = validarEstado;
module.exports.validarTipo = validarTipo;
module.exports.validarImagen = validarImagen;