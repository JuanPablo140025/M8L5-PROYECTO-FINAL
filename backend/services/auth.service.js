const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registrarUsuario(nombre, email, password) {
  const emailLimpio = email.trim().toLowerCase();
  const nombreLimpio = nombre.trim();

  const checkUser = await pool.query('SELECT id FROM usuarios WHERE email = $1', [emailLimpio]);
  if (checkUser.rows.length > 0) {
    const err = new Error("El correo ya está registrado");
    err.status = 400;
    throw err;
  }

  const hash = await bcrypt.hash(password, 10);
  const result = await pool.query(
    'INSERT INTO usuarios (nombre, email, password_hash) VALUES ($1, $2, $3) RETURNING id, nombre, email, rol',
    [nombreLimpio, emailLimpio, hash]
  );

  return result.rows[0];
}

async function loginUsuario(email, password) {
  const emailLimpio = email.trim().toLowerCase();
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [emailLimpio]);

  if (result.rows.length === 0) {
    const err = new Error("Credenciales inválidas");
    err.status = 401;
    throw err;
  }

  const usuario = result.rows[0];
  const coincide = await bcrypt.compare(password, usuario.password_hash);
  if (!coincide) {
    const err = new Error("Credenciales inválidas");
    err.status = 401;
    throw err;
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, rol: usuario.rol },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return {
    token,
    usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
  };
}

module.exports = { registrarUsuario, loginUsuario };