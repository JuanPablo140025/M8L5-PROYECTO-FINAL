const jwt = require('jsonwebtoken');

function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      message: "Acceso denegado. Token no provisto.",
      error: "Acceso denegado. Token no provisto." 
    });
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decodificado;
    next();
  } catch (error) {
    return res.status(401).json({ 
      message: "Token inválido o expirado.",
      error: "Token inválido o expirado." 
    });
  }
}

function esAdmin(req, res, next) {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    return res.status(403).json({ 
      message: "Acceso prohibido: Requiere rol de Administrador.",
      error: "Acceso prohibido: Requiere rol de Administrador." 
    });
  }
}

module.exports = { autenticarToken, esAdmin };