const {db} = require('../../config/db');

// Controlador GET para obtener todas la categorias

const getAdmin = (req, res) => {
    const query = "SELECT * FROM useradmin";

    db.query( query, (error, result) => {
        if(error){
            console.error("Error en la consulta", error);
            res.status(500).json({ error: "Error en la consulta usuario administrador", message: error.message});
        } else{
            if(result.length === 0) {
                res.status(400).json({ error: "No se encontro ningún usuario administrador"});
            } else {
                res.status(200).json(result);
            }
        }
    })
}

module.exports = {
    getAdmin
}