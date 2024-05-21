const { db } = require("../../config/db");
const fs = require('fs');

//Controlador GET para obtener toda las motos

const getMotos = (req, res) => {
    const query = "SELECT * FROM motos";
    db.query(query, (error, result) => {
        if(error){
            console.error("Error en la consulta:", error);
            res.status(500).json({ error: "Error en el metodo GET", message: error.message});
        } else{
            if( result.length === 0 ){
                res.status(404).json({ error: "Nose encontro ninguna moto"})
            }else{
                res.status(200).json(result);
            }
        }
    });
};

//Controlador GET para obtener la moto mediante ID

const getMotosId = (req, res) => {
    const motoId = req.params.id;
    if (isNaN(motoId)) {
        return res.status(400).json({ error: "El ID de la moto proporcionado no es válido" });
    }
    const query = "SELECT img_motos FROM motos WHERE id = ?";
    db.query(query, [motoId], (error, result) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: "Error en la consulta a la base de datos", message: error.message });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: "No se encontró ninguna imagen de moto con el ID proporcionado" });
        }
        const imagePath = result[0].img_motos;
        fs.readFile(imagePath, (err, data) => {
            if (err) {
                console.error("Error al leer la imagen:", err);
                return res.status(500).json({ error: "Error al leer la imagen", message: err.message });
            }
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data);
        });
    });
};

//Controlador POST para ingresar motos

const addMotos = (req, res) => {
    const { modelo, preciosus, inicialbs, img_motos } = req.body;
    
    const query = "INSERT INTO motos (modelo, preciosus, inicialbs, img_motos) VALUES (?, ?, ?, ?)";
    db.query(query, [modelo, preciosus, inicialbs, img_motos], (error, result) => {
        if (error) {
            console.error("Error al insertar datos de la moto:", error);
            res.status(500).json({ error: "Error en el método POST", message: error.message });
            return;
        }
        console.log("Datos de la moto insertados correctamente:", result);
        res.status(201).json({ message: "Datos de la moto insertados correctamente" });
    });
};



module.exports = {
    getMotos,
    getMotosId,
    addMotos
}