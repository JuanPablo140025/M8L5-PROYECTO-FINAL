const juegosService = require('../services/juegos.service');

// Función maestra para evitar que el ID sea undefined y rompa la base de datos
const obtenerIdUsuario = (req) => {
  return req.usuario?.id || req.usuario?.usuario_id || req.usuario?.user_id || 1; 
};

async function listar(req, res) {
  try {
    const usuarioId = obtenerIdUsuario(req);
    const juegos = await juegosService.obtenerJuegosPorUsuario(usuarioId);
    res.status(200).json(juegos);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener la lista de juegos", error: err.message });
  }
}

async function crear(req, res) {
  try {
    const { titulo, plataforma } = req.body || {};
    if (!titulo || !plataforma) {
      return res.status(400).json({ message: "Título y Plataforma son obligatorios", error: "Título y Plataforma son obligatorios" });
    }
    const usuarioId = obtenerIdUsuario(req);
    const nuevoJuego = await juegosService.crearJuego(usuarioId, req.body);
    res.status(201).json(nuevoJuego);
  } catch (err) {
    res.status(500).json({ message: "Error al crear el juego", error: err.message });
  }
}

async function actualizar(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = obtenerIdUsuario(req);
    const juegoActualizado = await juegosService.actualizarJuego(id, usuarioId, req.body);
    res.status(200).json(juegoActualizado);
  } catch (err) {
    const statusCode = err.status || 500;
    const mensajeError = err.message || "Error al actualizar";
    res.status(statusCode).json({ message: mensajeError, error: mensajeError });
  }
}

async function eliminar(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = obtenerIdUsuario(req);
    await juegosService.eliminarJuego(id, usuarioId);
    res.status(200).json({ message: "Juego eliminado", mensaje: "Juego eliminado" });
  } catch (err) {
    const statusCode = err.status || 500;
    const mensajeError = err.message || "Error al eliminar";
    res.status(statusCode).json({ message: mensajeError, error: mensajeError });
  }
}

module.exports = { listar, crear, actualizar, eliminar };