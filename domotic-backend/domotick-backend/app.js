import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
import habitacionRoutes from './routes/habitacionRoutes.js';
import dispositivoRoutes from './routes/dispositivoRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';
import configRoutes from './routes/configRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/habitaciones', habitacionRoutes);
app.use('/api/dispositivos', dispositivoRoutes);
app.use('/api/eventos', eventoRoutes);
app.use('/api/configs', configRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
