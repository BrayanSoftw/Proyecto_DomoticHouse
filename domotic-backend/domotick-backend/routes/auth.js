const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db'); // tu conexión a la base de datos

const SECRET_KEY = '12345'; // cámbiala por una más segura

router.post('/login', async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const [rows] = await db.query('SELECT * FROM usuario WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const usuario = rows[0];

    const esValida = await bcrypt.compare(contraseña, usuario.contraseña_hash);
    if (!esValida) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ user_id: usuario.user_id, rol: usuario.rol }, SECRET_KEY, { expiresIn: '2h' });

    res.json({ token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

module.exports = router;
