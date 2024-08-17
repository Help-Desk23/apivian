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
    const { nombre, usuario, contraseña} = req.body;
    const query = "INSERT INTO useradmin (nombre, usuario, contraseña) VALUES (?, ?, ?)";
    const value = [nombre, usuario, contraseña];

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
    const{ nombre, usuario, contraseña} = req.body;
    const query = "UPDATE useradmin SET nombre= ?, usuario= ?, contraseña= ? WHERE id_admin= ?";
    const values = [ nombre, usuario, contraseña, id];

    db.query(query, values, (error, result) => {
        if(error){
            console.error("Error al actualizar usuario administrador", error);
            res.status(500).json({ error: "Error en el metodo PUT"});
        } else{
            res.status(201).json({ message: "Usuario administrador actualizado correctamente"})
        }
    });
}

// Controlador DELETE para eliminar usuarios administrador

const deleteAdmin = ( req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM useradmin WHERE id_admin= ?";
    const values = [ id ];

    db.query(query, values, (error, result) => {
        if(error){
            console.error("Erro al eliminar un usuario administrador", error);
            res.status(500).json({ error: "Error en el metodo DELETE"});
        } else{
            res.status(201).json({ message: "Usuario administrador eliminado correctamente"});
        }
    });

}


module.exports = {
    getAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin
}