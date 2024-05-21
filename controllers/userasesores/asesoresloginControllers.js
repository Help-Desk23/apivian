const { db } = require("../../config/db");

const inicio = (req, res) => {
    const { users, password } = req.body;
    
    db.query('SELECT * FROM userasesores WHERE users = ? AND password = ?', [users, password], (error, result) => {
        if (error) {
            console.error('Error en la base de datos:', error);
            return res.status(500).json({ error: 'Error en la base de datos. Consulta los registros para obtener más detalles.' });
        }
        if (result.length === 0){
            console.warn('Credencial incorrecta para el usuario:', users);
            return res.status(401).header('WWW-Authenticate', 'Challenge details').json({ error: 'Credencial incorrecta' });
        }
        const user = result[0];
        
        console.log('Autenticación exitosa para el usuario:', user.users);

        res.status(200).json({ message: 'Autenticación exitosa'});
    });
};

module.exports = { inicio };
