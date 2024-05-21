const express = require('express');
const { getCliente, addCliente } = require("../controllers/cliente/clienteControllers");

const routerC = express.Router();

// Ruta GET clientes

routerC.get("/cliente", getCliente);


// Ruta POST cliente

routerC.post("/cliente", addCliente);



// Export Router

module.exports = routerC;