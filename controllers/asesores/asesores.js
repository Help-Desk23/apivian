const { db } = require('../../config/db');
const jwt = require('jsonwebtoken');

// Clave Secreta

const secretKey = process.env.TOKEN;

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

// Controlador LOGIN para autoenticación

const loginAsesores = (req, res) => {
    const { usuario, contraseña } = req.body;
    const query = "SELECT * FROM asesores WHERE usuario = ? AND contraseña = ?";
    const values = [usuario, contraseña];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error("Error al iniciar sesión", error);
            res.status(500).json({ error: "Error en el metodo POST" });
        } else if (results.length > 0) {
            res.status(200).json({ message: "Inicio de sesión exitoso"});
        } else {
            res.status(401).json({ error: "Usuario o contraseña incorrectos" });
        }
    });
};

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

// Controlador DELETE para eliminar asesor

const deleteAsesor = (req, res) => {
    const { id } = req.params
    const query = "DELETE FROM asesores WHERE id_asesores= ?";
    const values = [ id ];

    db.query(query, values, (error, result) => {
        if(error){
            if(error){
                console.error("Error al eliminar asesor", error);
                res.status(500).json({ error: "Error en el metodo DELETE"});
            } else{
                res.status(201).json({ message: "Asesor eliminado correctamente"});
            }
        }
    });
}

module.exports = {
    getAsesores,
    addAsesores,
    updateAsesores,
    deleteAsesor,
    loginAsesores
}