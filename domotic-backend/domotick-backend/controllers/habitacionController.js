const db = require('../db');

exports.getHabitaciones = (req, res) => {
  db.query('SELECT * FROM habitacion', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createHabitacion = (req, res) => {
  const { nombre, piso, area, descripcion } = req.body;
  db.query(
    'INSERT INTO habitacion (nombre, piso, area, descripcion) VALUES (?, ?, ?, ?)',
    [nombre, piso, area, descripcion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.updateHabitacion = (req, res) => {
  const { id } = req.params;
  const { nombre, piso, area, descripcion } = req.body;
  db.query(
    'UPDATE habitacion SET nombre = ?, piso = ?, area = ?, descripcion = ? WHERE room_id = ?',
    [nombre, piso, area, descripcion, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Habitación actualizada' });
    }
  );
};

exports.deleteHabitacion = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM habitacion WHERE room_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Habitación eliminada' });
  });
};
