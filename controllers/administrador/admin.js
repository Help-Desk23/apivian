const {db} = require('../../config/db');

// Controlador GET para obtener todas los usuario administrador

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

// Controlador POST para guardar todos los usuarios administrador

const addAdmin = (req, res) => {
    const { nombre, usuario, contraseña, roles} = req.body;
    const query = "INSERT INTO useradmin (nombre, usuario, contraseña, roles) VALUES (?, ?, ?, ?)";
    const value = [nombre, usuario, contraseña, roles];

    db.query(query, value, (error, result) => {
        if(error){
            console.error("Error al ingresar un usuario administrador", error);
            res.status(500).json({ error: "Error en el metodo POST"});
        } else {
            res.status(201).json({ message: "Usuario Administrador ingresado correctamente"});
        }
    });
}

// Controlador UPDATE para actualizar datos de los usuarios administrador

const updateAdmin = (req, res) => {
    const { id } = req.params;
    const{ nombre, usuario, contraseña, roles} = req.body;
    const query = "UPDATE useradmin SET nombre= ?, usuario= ?, contraseña= ?, roles= ? WHERE id_admin= ?";
    const value = [ nombre, usuario, contraseña, roles, id];

    db.query(query, value, (error, result) => {
        if(error){
            console.error("Error al actualizar usuario administrador", error);
            res.status(500).json({ error: "Error en el metodo PUT"});
        } else{
            res.status(201).json({ message: "Usuario administrador actualizado correctamente"})
        }
    });
}


module.exports = {
    getAdmin,
    addAdmin,
    updateAdmin
}