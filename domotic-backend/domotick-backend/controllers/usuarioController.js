// controllers/usuarioController.js
const db = require('../db');

exports.getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM usuario');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsuarioById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM usuario WHERE user_id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUsuario = async (req, res) => {
  const { nombre, apellido, email, contraseña_hash, telefono, rol } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO usuario (nombre, apellido, email, contraseña_hash, telefono, rol) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, apellido, email, contraseña_hash, telefono, rol]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, rol } = req.body;
  try {
    await db.query(
      'UPDATE usuario SET nombre = ?, apellido = ?, email = ?, telefono = ?, rol = ? WHERE user_id = ?',
      [nombre, apellido, email, telefono, rol, id]
    );
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM usuario WHERE user_id = ?', [id]);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
