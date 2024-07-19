const { error } = require('console');
const { db } = require('../../config/db');
const multer = require('multer');
const path = require('path');


// Configuracion de multer para almacenamiento de imagenes

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


// Controlador GET para obtener clientes

const getClientes = (req, res) => {
    const query = "SELECT * FROM infoclient";

    db.query( query, (error, result) => {
        if(error){
            console.error("Error en la consulta", error);
            res.status(500).json({ error: "Error en la consulta clientes"});
        } else{
            if(result.length === 0){
                res.status(400).json({ error: "No se encontro clientes"})
            } else {
                res.status(200).json(result);
            }
        }
    });
}

// Controlador POST para agregar clientes

const addClientes = (req, res) => {

    upload.single('img_motos')(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error al subir la imagen');
        }

        const { nombre, sucursal, moto, plazo, telefono, preciosus, inicialbs, asesor } = req.body;
        const fecha = new Date(); 
        const img_motos = req.file ? req.file.path : null;

        const query = "INSERT INTO infoclient (nombre, fecha, sucursal, moto, plazo, telefono, preciosus, inicialbs, asesor, img_motos) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        const values = [nombre, fecha, sucursal, moto, plazo, telefono, preciosus, inicialbs, asesor, img_motos];

        db.query(query, values, (error, results) => {
            if (error) {
                return res.status(500).send('Error al insertar los datos en la base de datos');
            }
            res.status(200).send('Cliente agregado exitosamente');
        });
    });
};

// Controlador PUT para editar datos del cliente

const updateCliente = (req, res) => {
    const {id} = req.params;
    upload.single('img_motos')(req, res, (err) => {
        if (err) {
            return res.status(500).send('Error al subir la imagen');
        }

        const { nombre, sucursal, moto, plazo, telefono, preciosus, inicialbs, asesor } = req.body;
        const fecha = new Date(); 
        const img_motos = req.file ? req.file.path : null;

        const query = 'UPDATE infoclient SET nombre = ?, fecha = ?, sucursal = ?, moto = ?, plazo = ?, telefono = ?, preciosus = ?, inicialbs = ?, asesor = ?, img_motos = ? WHERE id_cliente = ?';
        const values = [nombre, fecha, sucursal, moto, plazo, telefono, preciosus, inicialbs, asesor, img_motos, id];

        db.query(query, values, (error, results) => {
            if (error) {
                return res.status(500).send('Error al actualizar los datos en la base de datos');
            }
            res.status(200).send('Cliente actualizado exitosamente');
        });
    });
};


// Controlador DELETE para eliminar clientes

const deleteCliente = (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM infoclient WHERE id_cliente= ?";
    const values = [ id ];

    db.query( query, values, (error, result) => {
        if(error){
            if(error){
                console.error(" Error al eliminar cliente", error);
                res.status(500).json({ error: "Error en el metodo DELETE"});
            }else{
                res.status(201).json({ message: "Cliente eliminado correctamente"});
            }
        }
    });
}

module.exports = {
    getClientes,
    addClientes,
    updateCliente,
    deleteCliente
}