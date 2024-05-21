const express = require("express");
const { getAdmin, addAdmin, updateAdmin, deleteAdmin } = require("../controllers/admin/adminControllers");
const { login } = require("../controllers/admin/loginControllers");
const fileUploadModule = require("../controllers/admin/adminControllers");

const router = express.Router();

// Ruta GET admin

router.get("/admin", getAdmin);

// Ruta POST

router.post("/admin", fileUploadModule.upload.single('img_users'), fileUploadModule.addAdmin);

// Ruta PUT

router.put("/admin/:id", fileUploadModule.updateUpload.single('img_users'), fileUploadModule.updateAdmin);

// Ruta Delete

router.delete("/admin/:id", deleteAdmin);

// Ruta Login

router.post("/login", login);

//Export Router

module.exports = router;