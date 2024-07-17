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

// Controlador POST para agregar asesores

const addAsesores = (req, res) => {
    const { nombre, usuario, contraseña } = req.body;
    const query = "INSERT INTO asesores (nombre, usuario, contraseña) VALUE (?, ?, ?)";
    const values = [ nombre, usuario, contraseña];

    db.query(query, values, (error, result) => {
        if(error){
            console.error("Error al ingresar un asesor", error);
            res.status(500).json({error: "Error en el metodo POST"});
        } else{
            res.status(201).json({ message: "Asesor ingresado correctamente"});
        }
    });
}

// Controlador UPDATE para actualizar asesores

const updateAsesores = (req, res) => {
    const { id } = req.params;
    const { nombre, usuario, contraseña } = req.body;
    const query = "UPDATE asesores SET nombre= ?, usuario= ?, contraseña= ? WHERE id_asesores";
    const values = [ nombre, usuario, contraseña, id];

    db.query(query, values, (error, result) => {
        if(error){
            console.error("Error al actualizar asesor", error);
            res.status(500).json({ error: "Error en el metodo PUT"});
        } else{
            res.status(201).json({message: "Asesor actualizado correctamente"});
        }
    });

}

module.exports = {
    getAsesores,
    addAsesores,
    updateAsesores
}