const express = require("express");
const sql = require("mssql");

require('dotenv').config();

//Creando la configuración a la base de datos vian

const db = {
    server: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

sql.connect(db)
    .then(() => {
        console.log("Conexión a la base de datos exitosa");
    })
    .catch(err => {
        console.error("Error al conectar la base de datos", err);
    });


const app = express();

//Exporta la configuración de la base de datos

module.exports = {
    db
};