const db = require('../db');

exports.getDispositivos = (req, res) => {
  db.query('SELECT * FROM dispositivo', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createDispositivo = (req, res) => {
  const { nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id } = req.body;
  db.query(
    'INSERT INTO dispositivo (nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.updateDispositivo = (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id } = req.body;
  db.query(
    'UPDATE dispositivo SET nombre = ?, tipo = ?, ubicacion = ?, estado_actual = ?, fecha_instalacion = ?, ultimo_mantenimiento = ?, room_id = ? WHERE device_id = ?',
    [nombre, tipo, ubicacion, estado_actual, fecha_instalacion, ultimo_mantenimiento, room_id, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Dispositivo actualizado' });
    }
  );
};

exports.deleteDispositivo = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM dispositivo WHERE device_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Dispositivo eliminado' });
  });
};
