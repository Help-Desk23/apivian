const { db } = require("../../config/db");

const login = (req, res) => {
    const { users, password } = req.body;

    db.query('SELECT * FROM useradmin WHERE users = ? AND password = ?', [users, password], (error, result) => {
        if (error) {
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: 'Credencial incorrecta' });
        }

        const user = result[0];

        console.log('La contraseña en la base de datos es:', password)

        console.log('Autenticación exitosa para el usuario:', user.users);
        // Aquí podrías generar y enviar un token JWT si lo deseas

        res.status(200).json({ message: 'Autenticación exitosa' });
    });
};

module.exports = { login };