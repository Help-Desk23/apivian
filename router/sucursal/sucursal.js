const express = require('express');
const { getSucursales } = require('../../controllers/sucursales/sucursales');


const sucursal = express.Router();

// RUTA GET

sucursal.get("/sucursales", getSucursales);


module.exports = {
    sucursal
}