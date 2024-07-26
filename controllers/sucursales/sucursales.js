const { db } = require('../../config/db');

// Controlador GET para obtener todas las sucursales

const getSucursales = (req, res) => {
    const query = "SELECT * FROM sucursales";

    db.query( query, (error, result) => {
        if(error){
            console.error("Error en la consulta", error);
            res.status(500).json({ error: "Error en la consulta sucursales"});
        } else{
            if(result.length === 0){
                res.status(400).json({ error: "No se encontro ninguna sucursal"});
            } else{
                res.status(200).json(result);
            }
        }
    });
}


module.exports = {
    getSucursales
}