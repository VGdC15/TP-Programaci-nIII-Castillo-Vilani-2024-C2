const express = require("express");
require("dotenv").config(); // Cargar variables de entorno al inicio
const app = express();
const path = require("path");

//Configuro ejs para html
app.set('view engine', 'ejs');

//Configurar los archivos estaticos
app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));

//-------------------------------------------------------
// Deshabilitar cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});
//-------------------------------------------------------

// Importante para variables de entorno
//require("dotenv").config();
process.loadEnvFile();

// Importante para tomar datos del body!
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// Conexión DB
const sequelize = require("./db/sequelize.js");
const relacionar = require("./entity/relaciones.js");


// Inicio rutas
const productoRoutes = require("./routes/producto.routes.js");
const adminRoutes = require("./routes/admin.routes.js");
const ventasRoutes = require("./routes/ventas.routes.js");
const ticketRoutes = require("./routes/ticket.routes.js");
const crearRoutes = require("./routes/crearUsuario.routes.js");
const loginRoutes = require("./routes/crearUsuario.routes.js");

app.use("/productos", productoRoutes);
app.use("/admin", adminRoutes);
app.use("/ventas", ventasRoutes);
app.use("/ticket", ticketRoutes);
app.use("/usuario", crearRoutes);
app.use("/login", loginRoutes);

// Fin rutas
conexion();

app.get("/", async (req, res) => {
  res.send("listo");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App started");
});

async function conexion(){
  try{
    await sequelize.authenticate();
    await relacionar();
    await sequelize.sync({ alter: true });
  }catch(err){
    console.error("Error al conectar",err);
  }
}