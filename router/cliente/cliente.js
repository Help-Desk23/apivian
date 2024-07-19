const express = require('express');
const { getClientes, addClientes, updateCliente, deleteCliente } = require('../../controllers/cliente/cliente');


const client = express.Router();

// RUTA GET

client.get("/clientes", getClientes);

// RUTA POST

client.post("/clientes", addClientes);

// RUTA PUT

client.put("/clientes/:id", updateCliente);


// RUTA DELETE

client.delete("/clientes/:id", deleteCliente);


module.exports = {
    client
}