const express = require('express');
const { getAsesores, addAsesores, updateAsesores, deleteAsesor, loginAsesores } = require('../../controllers/asesores/asesores');


const ruta = express.Router();

// RUTA GET

ruta.get("/asesores", getAsesores);

// RUTA POST

ruta.post("/asesores", addAsesores);

// RUTA LOGIN

ruta.post("/loginasesores", loginAsesores);

// RUTA PUT

ruta.put("/asesores/:id", updateAsesores);

// RUTA DELETE

ruta.delete("/asesores/:id", deleteAsesor);


module.exports = {
    ruta
}