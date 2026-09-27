const pool = require('../db');

async function obtenerEstadisticas(req, res) {
  try {
    const totalUsuarios = await pool.query('SELECT COUNT(*) FROM usuarios');
    const totalJuegos = await pool.query('SELECT COUNT(*) FROM juegos');
    
    res.status(200).json({
      mensaje: "Acceso autorizado de Administrador",
      estadisticas: {
        total_usuarios: parseInt(totalUsuarios.rows[0].count),
        total_juegos_registrados: parseInt(totalJuegos.rows[0].count)
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Error al consultar estadísticas" });
  }
}

module.exports = { obtenerEstadisticas };