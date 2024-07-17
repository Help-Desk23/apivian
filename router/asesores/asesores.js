const express = require('express');
const { getAsesores, addAsesores, updateAsesores } = require('../../controllers/asesores/asesores');


const ruta = express.Router();

// RUTA GET

ruta.get("/asesores", getAsesores);

// RUTA POST

ruta.post("/asesores", addAsesores);

// RUTA PUT

ruta.put("/asesores/:id", updateAsesores);


module.exports = {
    ruta
}