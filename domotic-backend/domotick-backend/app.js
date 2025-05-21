const express = require('express');
const app = express();

const usuarioRoutes = require('./routes/usuarioRoutes');
const habitacionRoutes = require('./routes/habitacionRoutes');
const dispositivoRoutes = require('./routes/dispositivoRoutes');
const eventoRoutes = require('./routes/eventoRoutes');
const configRoutes = require('./routes/configRoutes');

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);
app.use('/api/habitaciones', habitacionRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/configs', configRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
