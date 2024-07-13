const express = require("express");
const { getAdmin } = require("../../controllers/administrador/admin");


const router = express.Router();

// RUTA GET

router.get("/admin", getAdmin);



module.exports = {
    router
}