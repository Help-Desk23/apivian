const express = require('express');
const { getSucursales, addSucursales } = require('../../controllers/sucursales/sucursales');


const sucursal = express.Router();

// RUTA GET

sucursal.get("/sucursales", getSucursales);

// RUTA POST

sucursal.post("/sucursales", addSucursales);


module.exports = {
    sucursal
}