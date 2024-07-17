const express = require("express");
const { getAdmin, addAdmin, updateAdmin, deleteAdmin } = require("../../controllers/administrador/admin");


const router = express.Router();

// RUTA GET

router.get("/admin", getAdmin);

// RUTA POST

router.post("/admin", addAdmin);

// RUTA PUT

router.put("/admin/:id", updateAdmin);

// RUTA DELETE

router.delete("/admin/:id", deleteAdmin);



module.exports = {
    router
}