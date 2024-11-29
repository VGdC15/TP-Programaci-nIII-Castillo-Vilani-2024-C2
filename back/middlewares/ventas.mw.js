const validarNombreComprador = (req,res,next)=>{
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/;
    const {nombreComprador} = req.body;
    if (nombreComprador === undefined || nombreComprador === null || nombreComprador === "") {
        return res.status(400).json({ error: "Nombre no ingresado" });
    }
    if(typeof nombreComprador !== "string"){
        return res.status(400).json({error:"El nombre debe ser una palabra"});
    }
    if(!regex.test(nombreComprador)){
        return res.status(400).json({error:"El nombre debe ser una palabra"});
    }

    next();
};


const validarListaIds = (req,res,next)=>{
    const { listaProductos } = req.body;
    for(producto of listaProductos){
        if (producto.id === undefined || producto.id === null || producto.id === "") {
            return res.status(400).json({ error: "Id no ingresado" });
        }
        if (isNaN(producto.id)) {
            return res.status(400).json({ error: "El id debe ser un número" });
        }
        if (Number(producto.id) < 0) {
            return res.status(400).json({ error: "El id no puede ser negativo" });
        }
    }

    next();
};


const validarId = (req, res, next) => {
    const { idVenta } = req.body;
    if (idVenta === undefined || idVenta === null || idVenta === "") {
        return res.status(400).json({ error: "Id no ingresado" });
    }
    if (isNaN(idVenta)) {
        return res.status(400).json({ error: "El id debe ser un número" });
    }
    if (Number(idVenta) < 0) {
        return res.status(400).json({ error: "El id no puede ser negativo" });
    }
    
    next();
};

module.exports.validarNombreComprador = validarNombreComprador;
module.exports.validarListaIds = validarListaIds;
module.exports.validarId = validarId;