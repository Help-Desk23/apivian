const express = require('express');
const { getAsesores, addAsesores, updateAsesores, deleteAsesor } = require('../../controllers/asesores/asesores');


const ruta = express.Router();

// RUTA GET

ruta.get("/asesores", getAsesores);

// RUTA POST

ruta.post("/asesores", addAsesores);

// RUTA PUT

ruta.put("/asesores/:id", updateAsesores);

// RUTA DELETE

ruta.delete("/asesores/:id", deleteAsesor);


module.exports = {
    ruta
}