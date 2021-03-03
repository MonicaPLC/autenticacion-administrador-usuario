// servidor descargar express
const express = require("express");
const app = express();
const port = 8000;

//constante de sesion
const session = require("express-session");

//constante para usar mensaje flash
const flash = require("connect-flash");

//usar sesión
app.use(session({ secret: "mipropiaclave" }));

//mensaje flash
app.use(flash());

// carpeta estátca
app.use(express.static(__dirname + "/static"));

// vistas. Descargar ejs
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

///para hacer post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// para usar mis rutas
app.use(require("./routes/ruta"));
app.use(require("./routes/auth"));

//para escuchar colocar al último en el código
app.listen(port, () => console.log(`Listo el puerto: ${port}`));
