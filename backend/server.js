const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/auth.routes');
const juegosRoutes = require('./routes/juegos.routes');
const adminRoutes = require('./routes/admin.routes');

const app = express();

// Confianza en el proxy inverso de Render (Necesario para que express-rate-limit lea las IPs reales)
app.set('trust proxy', 1);

app.use(helmet());

// Configuración de CORS usando la variable de entorno FRONTEND_URL o el dominio desplegado en Vercel
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://m8-l5-proyecto-final.vercel.app',
  'http://localhost:5500',
  'http://127.0.0.1:5500'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Permitir peticiones sin origin (como llamadas servidor a servidor, Postman o requests.http)
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Acceso no permitido por CORS'));
  },
  credentials: true
}));

app.use(express.json());

app.get('/salud', (req, res) => {
  res.status(200).json({ estado: "OK", timestamp: new Date() });
});

// Prefijo /api para todas las rutas
app.use('/api/auth', authRoutes);
app.use('/api/juegos', juegosRoutes);
app.use('/api/admin', adminRoutes);

// Manejo de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada", error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🕹️ Servidor RetroQuest corriendo en el puerto ${PORT}`);
});