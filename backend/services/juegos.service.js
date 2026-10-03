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
    [
      userId, 
      titulo, 
      plataforma, 
      estado || 'Pendiente', 
      horas_jugadas !== undefined ? horas_jugadas : 0, 
      rating !== undefined ? rating : 5
    ]
  );
  return res.rows[0];
}

async function actualizarJuego(juegoId, userId, datos) {
  const { titulo, plataforma, estado, horas_jugadas, rating } = datos;
  
  // COALESCE mantiene el valor actual de la columna si el parámetro entrante es NULL
  const res = await pool.query(
    `UPDATE juegos 
     SET titulo = COALESCE($1, titulo),
         plataforma = COALESCE($2, plataforma),
         estado = COALESCE($3, estado),
         horas_jugadas = COALESCE($4, horas_jugadas),
         rating = COALESCE($5, rating)
     WHERE id = $6 AND user_id = $7 
     RETURNING *`,
    [
      titulo !== undefined ? titulo : null,
      plataforma !== undefined ? plataforma : null,
      estado !== undefined ? estado : null,
      horas_jugadas !== undefined ? horas_jugadas : null,
      rating !== undefined ? rating : null,
      juegoId,
      userId
    ]
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