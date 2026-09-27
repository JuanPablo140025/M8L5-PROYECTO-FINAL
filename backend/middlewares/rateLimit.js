const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // Aumentado a 100 intentos para facilitar pruebas en desarrollo
  message: { 
    message: "Demasiados intentos. Intenta de nuevo en 15 minutos.",
    error: "Demasiados intentos. Intenta de nuevo en 15 minutos." 
  }
});

module.exports = authLimiter;