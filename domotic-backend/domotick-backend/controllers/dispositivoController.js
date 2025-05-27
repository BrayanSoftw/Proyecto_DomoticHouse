// controllers/dispositivoController.js
const db = require('../db');

exports.getDispositivos = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM dispositivo');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDispositivo = async (req, res) => {
  const { nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO dispositivo (nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDispositivo = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id } = req.body;
  try {
    await db.query(
      'UPDATE dispositivo SET nombre = ?, tipo = ?, ubicacion = ?, estado_actual = ?, fecha_instalacion = ?, ultimo_mantenimiento = ?, room_id = ? WHERE device_id = ?',
      [nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id, id]
    );
    res.json({ mensaje: 'Dispositivo actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDispositivo = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM dispositivo WHERE device_id = ?', [id]);
    res.json({ mensaje: 'Dispositivo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
