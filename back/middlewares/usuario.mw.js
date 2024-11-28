const validarEmail = (req,res,next)=>{
    const regex = /^[\w\.-]+@[a-zA-Z\d-]+\.[a-zA-Z]{2,}$/; // Constitucion del email
    const {email} = req.body;
    if (email === undefined || email === null || email === "") {
        return res.status(400).json({ error: "Email no ingresado" });
    }
    if(typeof email !== "string"){
        return res.status(400).json({error:"El email debe ser texto"});
    }
    if(!regex.test(email)){
        return res.status(400).json({error:"El email ingresado no es valido"});
    }

    next();  
};

const validarContraseña = (req,res,next)=>{
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/;
    const {password} = req.body;
    if (password === undefined || password === null || password === "") {
        return res.status(400).json({ error: "Contraseña no ingresada" });
    }
    if(typeof password !== "string"){
        return res.status(400).json({error:"La contraseña debe ser texto"});
    }
    if(!regex.test(password)){
        return res.status(400).json({error:"La contraseña debe tener una longitud minima de 8, maxima de 16 e incluir minimo un numero, una mayuscula y una minuscula"});
    }

    next();  
}

module.exports.validarContraseña = validarContraseña;
module.exports.validarEmail = validarEmail;