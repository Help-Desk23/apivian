const express = require("express");
const { getAsesores, addAsesores } = require("../controllers/userasesores/userControllers");
const { inicio } = require("../controllers/userasesores/asesoresloginControllers");

const routerA = express.Router();

// Ruta GET asesores

routerA.get("/asesores", getAsesores);

// Ruta POST asesores

routerA.post("/asesores", addAsesores);

// Ruta Login Asesores

routerA.post("/inicio", inicio);

// Export Router

module.exports = routerA;