// controllers/usuarioController.js
const db = require('../db');

exports.getUsuarios = (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createUsuario = (req, res) => {
  const { nombre, apellido, email, contraseña_hash, telefono, rol } = req.body;
  db.query(
    'INSERT INTO usuario (nombre, apellido, email, contraseña_hash, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)',
    [nombre, apellido, email, contraseña_hash, telefono, rol],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, rol } = req.body;
  db.query(
    'UPDATE usuario SET nombre = ?, apellido = ?, email = ?, telefono = ?, rol = ? WHERE user_id = ?',
    [nombre, apellido, email, telefono, rol, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Usuario actualizado' });
    }
  );
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuario WHERE user_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Usuario eliminado' });
  });
};
