const db = require('../db');

exports.getConfigs = (req, res) => {
  db.query('SELECT * FROM config_automatizacion', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createConfig = (req, res) => {
  const { nombre, condicion, accion, estado } = req.body;
  db.query(
    'INSERT INTO config_automatizacion (nombre, condicion, accion, estado) VALUES (?, ?, ?, ?)',
    [nombre, condicion, accion, estado],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.updateConfig = (req, res) => {
  const { id } = req.params;
  const { nombre, condicion, accion, estado } = req.body;
  db.query(
    'UPDATE config_automatizacion SET nombre = ?, condicion = ?, accion = ?, estado = ? WHERE config_id = ?',
    [nombre, condicion, accion, estado, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Configuración actualizada' });
    }
  );
};

exports.deleteConfig = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM config_automatizacion WHERE config_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Configuración eliminada' });
  });
};
