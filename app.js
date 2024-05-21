const express = require("express");
const app = express();
const { db } = require("./config/db");
const { getAdmin, addAdmin, updateAdmin, deleteAdmin } = require("./controllers/admin/adminControllers");
const { getAsesores } = require("./controllers/userasesores/userControllers");
const { login } = require("./controllers/admin/loginControllers");
const { inicio } = require("./controllers/userasesores/asesoresloginControllers");
const router = require("./router/adminRouter");
const routerA = require("./router/asesorRouter");
const routerM = require("./router/motosRouter");
const routerC = require("./router/clientRouter");


app.use(express.json());

//configuración de variable de entorno

require('dotenv').config();

app.get("/", (req, res) => {
    res.end("PANEL DE CONTROL");
})

app.use("/", router);
app.use("/", routerA);
app.use("/", routerM);
app.use("/", routerC)


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
