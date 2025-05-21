const db = require('../db');

exports.getEventos = (req, res) => {
  db.query('SELECT * FROM evento', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.createEvento = (req, res) => {
  const { tipo_evento, fecha_hora, valor_anterior, valor_nuevo, descripcion } = req.body;
  db.query(
    'INSERT INTO evento (tipo_evento, fecha_hora, valor_anterior, valor_nuevo, descripcion) VALUES (?, ?, ?, ?, ?)',
    [tipo_evento, fecha_hora, valor_anterior, valor_nuevo, descripcion],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ id: result.insertId });
    }
  );
};

exports.updateEvento = (req, res) => {
  const { id } = req.params;
  const { tipo_evento, fecha_hora, valor_anterior, valor_nuevo, descripcion } = req.body;
  db.query(
    'UPDATE evento SET tipo_evento = ?, fecha_hora = ?, valor_anterior = ?, valor_nuevo = ?, descripcion = ? WHERE event_id = ?',
    [tipo_evento, fecha_hora, valor_anterior, valor_nuevo, descripcion, id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ mensaje: 'Evento actualizado' });
    }
  );
};

exports.deleteEvento = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM evento WHERE event_id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: 'Evento eliminado' });
  });
};
