const express = require("express");
const { getAdmin, addAdmin } = require("../../controllers/administrador/admin");


const router = express.Router();

// RUTA GET

router.get("/admin", getAdmin);

// RUTA POST

router.post("/admin", addAdmin);



module.exports = {
    router
}