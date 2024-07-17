const express = require('express');
const { getAsesores } = require('../../controllers/asesores/asesores');


const ruta = express.Router();

// RUTA GET

ruta.get("/asesores", getAsesores);



module.exports = {
    ruta
}