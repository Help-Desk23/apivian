const { db } = require("../../config/db");


//Controlador GET para obtener la información de los usuario asesores

const getAsesores = (req, res) => {
    const query = "SELECT * FROM userasesores";

    db.query(query, (error, result) => {
        if(error){
            console.error("Error en la consulta:", error);
            res.status(500).json({ error: "Error en el metodo POST", message: error.message});
        }else{
            if( result.length === 0){
                res.status(404).json({ error: "Nose encontraron usuarios asesores"})
            }else{
                res.status(200).json(result);
            }
        }
    });
};

//Controlador POST para agregar usuarios asesores

const addAsesores = (req, res) => {
    const { name, users, sucursal, password } = req.body;

    const query = "INSERT INTO userasesores (name, users, sucursal, password) VALUES (?, ?, ?, ?)";
    const values = [name, users, sucursal, password];

    db.query(query, values, (error, result) => {
        if(error) {
            console.error("Error al ingresar un usuario", error);
            res.status(500).json({ error: "Error en el metodo POST" });
        } else {
            res.status(201).json({ message: "Usuario ingresado correctamente"});
        }
    });
};


//Exportamos todos los controladores

module.exports = {
    getAsesores,
    addAsesores,
}