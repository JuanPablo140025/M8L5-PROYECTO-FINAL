# 🎮 RetroQuest - Bit-Based Backlog & Collection Tracker

Plataforma web para llevar el registro de videojuegos pendientes y completados con interfaz estilo retro.

## 🚀 Demo
- **App (Frontend):** https://m8-l5-proyecto-final.vercel.app
- **API (Backend):** https://m8l5-proyecto-final.onrender.com
- **Cuenta de prueba:** `juan.test@example.com` / `Password123!`

## 🛠️ Stack Tecnológico
- **Backend:** Node.js, Express, pnpm
- **Base de Datos:** PostgreSQL en Supabase
- **Seguridad:** JWT, bcrypt, Helmet, Express-Rate-Limit, CORS
- **Frontend:** HTML5, CSS3 (Pixel Art CSS), JavaScript Vánila

## 📌 Endpoints de la API
- `POST /api/auth/registro` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/juegos` - Listar juegos del usuario autenticado
- `POST /api/juegos` - Crear juego
- `PUT /api/juegos/:id` - Actualizar juego
- `DELETE /api/juegos/:id` - Eliminar juego
- `GET /api/admin/estadisticas` - Métricas del sistema (Requiere rol Admin)

## 💻 Instrucciones para ejecución local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/JuanPablo140025/M8L5-PROYECTO-FINAL.git](https://github.com/JuanPablo140025/M8L5-PROYECTO-FINAL.git)
   cd M8L5-PROYECTO-FINAL