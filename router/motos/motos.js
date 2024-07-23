const express = require('express');
const { getMotos, addMotos, updateMotos } = require('../../controllers/motos/motos');

const moto = express.Router();


// RUTA GET

moto.get("/motos", getMotos);

// RUTA POST

moto.post("/motos", addMotos);



module.exports = {
    moto
}