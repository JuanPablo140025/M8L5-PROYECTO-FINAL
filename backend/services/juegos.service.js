const pool = require('../db');

async function obtenerJuegosPorUsuario(userId) {
  const res = await pool.query(
    'SELECT id, titulo, plataforma, estado, horas_jugadas, rating, creado_en FROM juegos WHERE user_id = $1 ORDER BY creado_en DESC',
    [userId]
  );
  return res.rows;
}

async function crearJuego(userId, datos) {
  const { titulo, plataforma, estado, horas_jugadas, rating } = datos;
  const res = await pool.query(
    'INSERT INTO juegos (user_id, titulo, plataforma, estado, horas_jugadas, rating) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [userId, titulo, plataforma, estado || 'Pendiente', horas_jugadas || 0, rating || 5]
  );
  return res.rows[0];
}

async function actualizarJuego(juegoId, userId, datos) {
  const { titulo, plataforma, estado, horas_jugadas, rating } = datos;
  const res = await pool.query(
    `UPDATE juegos 
     SET titulo = $1, plataforma = $2, estado = $3, horas_jugadas = $4, rating = $5
     WHERE id = $6 AND user_id = $7 RETURNING *`,
    [titulo, plataforma, estado, horas_jugadas, rating, juegoId, userId]
  );

  if (res.rows.length === 0) {
    const err = new Error("Juego no encontrado o sin permisos");
    err.status = 404;
    throw err;
  }
  return res.rows[0];
}

async function eliminarJuego(juegoId, userId) {
  const res = await pool.query(
    'DELETE FROM juegos WHERE id = $1 AND user_id = $2 RETURNING id',
    [juegoId, userId]
  );

  if (res.rows.length === 0) {
    const err = new Error("Juego no encontrado o sin permisos");
    err.status = 404;
    throw err;
  }
  return true;
}

module.exports = { obtenerJuegosPorUsuario, crearJuego, actualizarJuego, eliminarJuego };