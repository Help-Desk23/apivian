const express = require("express");
const app = express();
const { router } = require("./router/administrador/admin");
const { ruta } = require("./router/asesores/asesores");
const { client } = require("./router/cliente/cliente");
const { moto } = require("./router/motos/motos");
const { sucursal } = require("./router/sucursal/sucursal");


app.use(express.json());

//configuración de variable de entorno

require('dotenv').config();

app.get("/", (req, res) => {
    res.end("HOLA MUNDO!");
})

// Administrador

app.use("/", router);

// Asesor

app.use("/", ruta);

// Clientes

app.use("/", client);

// Motos

app.use("/", moto);

// Sucursales

app.use("/", sucursal);


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
