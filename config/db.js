const express = require("express");
const mysql = require("mysql2");

require('dotenv').config();

//Creando la configuración con mi Base de Datos db_vian

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// Crea la conexión a la base de datos

db.connect((err) => {
    if(err){
        console.error("Error al conectar la base de datos", err);
    } else{
        console.log("Conexión a la base de datos exitosa")
    }
});

// Crea una aplicación Express

const app = express();

//Exporta la configuración de la base de datos

module.exports = {
    db
};