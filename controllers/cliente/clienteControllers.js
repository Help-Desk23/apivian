const { db } = require("../../config/db");

//Controlador GET para obtener la información del cliente

const getCliente = (req, res) => {
    const query = "SELECT * FROM infoclient";

    db.query(query, (error, result) => {
        if(error){
            console.error("Error en la consulta:", error);
            res.status(500).json({ error: "Error en el metodo POST", message: error.message});
        }else{
            if( result.length === 0){
                res.status(404).json({error: "Nose encontraron clientes registrados"})
            }else{
                res.status(200).json(result);
            }
        }
    })
}

// Controlador POST para ingresar clientes

const addCliente = (req, res) => {
    const { name, sucursal, moto, plazo, telefono, preciosus, inicialbs, img_moto, asesor} = req.body;
    const fecha = new Date().toISOString().slice(0, 10);
  
    const query = 'INSERT INTO infoclient (name, fecha, sucursal, moto, plazo, telefono, preciosus, inicialbs, img_moto, asesor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [name, fecha, sucursal, moto, plazo, telefono, preciosus, inicialbs, img_moto, asesor], (error, results) => {
      if (error) {
        console.error('Error al agregar el cliente:', error);
        res.status(500).json({ error: 'Error al agregar el cliente' });
        return;
      }
      res.status(201).json({ message: 'Cliente agregado exitosamente' });
    });
  };




//Exportamos todos los controladores

module.exports = {
    getCliente,
    addCliente
}