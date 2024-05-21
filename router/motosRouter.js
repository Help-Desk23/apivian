const express = require("express");
const { getMotos, getMotosId, addMotos } = require("../controllers/motos/motosControllers");

const routerM = express.Router();

// Ruta GET motos

routerM.get("/motos", getMotos);

//Ruta GET imagen de motos

routerM.get("/motos/:id", getMotosId);

//Ruta POST motos

routerM.post("/motos", addMotos);

// Exportamos Rutas

module.exports = routerM;