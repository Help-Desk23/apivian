const { db } = require('../../config/db');

// Controlador GET para obtener todos los asesores

const getAsesores = (req, res) => {
    const query = "SELECT * FROM asesores";

    db.query( query, (error, result) => {
        if(error){
            console.error("Error en la consulta", error);
            res.status(500).json({ error: "Error en la consulta asesores"});
        } else{
            if(result.length === 0){
                res.status(400).json({ error: "No se encontro ningún asesor"})
            } else {
                res.status(200).json(result);
            }
        }
    });
}


module.exports = {
    getAsesores
}