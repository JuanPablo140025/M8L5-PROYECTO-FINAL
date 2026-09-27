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

app.use(helmet());

// Permitir solicitudes CORS en desarrollo local
app.use(cors({
  origin: true, // Acepta peticiones del frontend local
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