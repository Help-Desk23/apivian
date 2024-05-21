const { query } = require("express");
const { db } = require("../../config/db");
const multer = require("multer");
const path = require("path");
const { error } = require("console");

//Controlador GET para obtener todos los usuarios administradores

const getAdmin = (req, res) => {

    const query = "SELECT * FROM useradmin";

    db.query(query, (error, result) => {
        if(error){
            console.error("Error en la consulta:", error);
            res.status(500).json({ error: "Error en el metodo GET", message: error.message});
        }else{
            if( result.length === 0 ){
                res.status(404).json({ error: "Nose encontraron usuarios administradores"})
            }else{
                res.status(200).json(result);
            }
        }
    });
};

//Controlador POST para agregar usuarios administradores

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

const addAdmin = (req, res) => {
    const { name, users, password, roles } = req.body;
    const img_users = req.file ? req.file.filename : null;

    const query = "INSERT INTO useradmin (name, users, password, roles, img_users) VALUES (?, ?, ?, ?, ?)";
    const values = [name, users, password, roles, img_users];

    db.query(query, values, (error, result) => {
        if (error) {
            console.error("Error al ingresar un usuario", error);
            res.status(500).json({ error: "Error en el metodo POST" });
        } else {
            res.status(201).json({ message: "Usuario ingresado correctamente" });
        }
    });
};

//Controlador PUT para modificar usuarios administradores

const updateStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const updateUpload = multer ({ storage: updateStorage });

const updateAdmin = (req, res) => {
    const { id } = req.params;
    const { name, users, password, roles } = req.body;
    const img_users = req.file ? req.file.filename : null;
    const query = "UPDATE useradmin SET name= ?, users= ?, password= ?, roles= ?, img_users= ? WHERE id= ?";
    const values = [ name, users, password, roles, img_users, id ];


db.query(query, values, (error, result) => {
    if(error){
        console.error(" Error al actualizar un usuario ", error);
        res.status(500).json({ error: " Error en el metodo PUT "});
    } else {
        res.status(201).json({ message: " Usuario actualizado correctamente "})
    }
});
};

//Controlador DELETE para eliminar usuario

const deleteAdmin = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM useradmin WHERE id= ? ";
    const values = [ id ];

    db.query(query, values, (error, result) => {
        if(error){
        console.error("Error al eliminar un usuario", error);
        res.status(500).json({ error: "Error en el metodo DELETE "});
        }else{
            res.status(201).json({ message: " Usuario eliminado correctamente "});
        }
    });
};



//Exportamos getAdmin 

module.exports = {
    getAdmin,
    addAdmin,
    updateAdmin,
    deleteAdmin,
    upload,
    updateUpload
}