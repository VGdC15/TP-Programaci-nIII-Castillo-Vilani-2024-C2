const crypto = require("crypto");
require("dotenv").config();

const claveSecretaDelServer = process.env.CLAVE_SECRETA;
const algoritmo = "aes-256-cbc"; 

function encriptar(password) {
    const iv = crypto.randomBytes(16);  
    const encriptador = crypto.createCipheriv(
        algoritmo,
        claveSecretaDelServer,
        iv
    );

  let encriptado = encriptador.update(password, "utf8", "hex"); 
  encriptado += encriptador.final("hex");

  return { iv, encriptado };
}

function desencriptar(iv, passEncriptada) {
  const decifrador = crypto.createDecipheriv(
    algoritmo,
    claveSecretaDelServer,
    Buffer.from(claveSecretaDelServer),
    Buffer.from(iv, "hex")
  );

  let decifrado = decifrador.update(passEncriptada, "hex", "utf8");
  decifrado += decifrador.final("utf8");
  return decifrado;
}


function registro(pass) {
    return encriptar(pass);
}

function login(pass, iv, passEncriptada) {
  const encriptador = crypto.createCipheriv(
    algoritmo,
    claveSecretaDelServer,
    Buffer.from(iv, "hex")
  );

  let encriptado = encriptador.update(pass, "utf8", "hex");
  encriptado += encriptador.final("hex");
  console.log(encriptado);

  return encriptado === passEncriptada;
}

const { iv, encriptado } = registro("12345678");
console.log(encriptado);

const exito = login("12345678", iv, encriptado);

console.log(exito);

module.exports = { login, registro, desencriptar };