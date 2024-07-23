const { db } = require('../../config/db');
const multer = require('multer');
const path = require('path');

// Configuracion de multer para almacenamiento de imagenes

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb( null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage});

// Controlador GET para obtener motos

const getMotos = (req, res) => {
    const query = "SELECT * FROM motos";
    
    db.query(query, (error, result) => {
        if(error){
            console.error("Error en la consulta", error);
            res.status(500).json({ error: "Error en la consulta motos"});
        }else{
            if(result.length === 0){
                res.status(400).json({ error: "No se encontro registro de motos"});
            }else{
                res.status(200).json(result);
            }
        }
    });
}

// Controlador POST para agregar motos

const addMotos = (req, res) => {
    upload.single('img_motos')(req, res, (err) => {
        if(err){
            return res.status(500).send('Error al subir la imagen');
        }

        const {modelo, preciosus, inicialbs} = req.body
        const img_motos = req.file ? req.file.path : null;

        const query = "INSERT INTO motos (modelo, preciosus, inicialbs, img_motos) VALUES (?, ?, ?, ?)";
        const values = [modelo, preciosus, inicialbs, img_motos];

        db.query(query, values, (error, result) => {
            if(error){
                return res.status(500).send("Error al insertar motos");
            }
            res.status(200).send("Moto agregada exitosamente")
        });
    });
}


module.exports = {
    getMotos,
    addMotos,
}