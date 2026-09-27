const authService = require('../services/auth.service');

async function registrar(req, res) {
  try {
    const { nombre, email, password } = req.body || {};
    if (!nombre || !email || !password || password.length < 6) {
      return res.status(400).json({ 
        message: "Datos incompletos o contraseña muy corta (mínimo 6 caracteres).",
        error: "Datos incompletos o contraseña muy corta (mínimo 6 caracteres)." 
      });
    }
    const usuario = await authService.registrarUsuario(nombre, email, password);
    res.status(201).json({ 
      message: "Usuario registrado con éxito", 
      mensaje: "Usuario registrado con éxito",
      usuario 
    });
  } catch (err) {
    const statusCode = err.status || 500;
    const mensajeError = err.message || "Error interno del servidor";
    res.status(statusCode).json({ message: mensajeError, error: mensajeError });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ 
        message: "Email y contraseña requeridos",
        error: "Email y contraseña requeridos" 
      });
    }
    const data = await authService.loginUsuario(email, password);
    res.status(200).json(data);
  } catch (err) {
    const statusCode = err.status || 500;
    const mensajeError = err.message || "Error interno del servidor";
    res.status(statusCode).json({ message: mensajeError, error: mensajeError });
  }
}

module.exports = { registrar, login };