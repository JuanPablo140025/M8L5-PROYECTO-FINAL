const juegosService = require('../services/juegos.service');

async function listar(req, res) {
  try {
    const juegos = await juegosService.obtenerJuegosPorUsuario(req.usuario.id);
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
    const nuevoJuego = await juegosService.crearJuego(req.usuario.id, req.body);
    res.status(201).json(nuevoJuego);
  } catch (err) {
    res.status(500).json({ message: "Error al crear el juego", error: err.message });
  }
}

async function actualizar(req, res) {
  try {
    const { id } = req.params;
    const juegoActualizado = await juegosService.actualizarJuego(id, req.usuario.id, req.body);
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
    await juegosService.eliminarJuego(id, req.usuario.id);
    res.status(200).json({ message: "Juego eliminado", mensaje: "Juego eliminado" });
  } catch (err) {
    const statusCode = err.status || 500;
    const mensajeError = err.message || "Error al eliminar";
    res.status(statusCode).json({ message: mensajeError, error: mensajeError });
  }
}

module.exports = { listar, crear, actualizar, eliminar };