// archivo: crearUsuario.js
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');

async function crearUsuario() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'domotichouse'
  });

  const contraseña = '123456';
  const hash = await bcrypt.hash(contraseña, 10);

  await connection.execute(
    `INSERT INTO usuario (nombre, apellido, email, contraseña_hash, telefono, rol)
     VALUES (?, ?, ?, ?, ?, ?)`,
    ['Residente', 'Calle13', 'calle13@example.com', hash, '1234567890', 'admin']
  );

  console.log('Usuario creado con éxito');
  await connection.end();
}

crearUsuario();
