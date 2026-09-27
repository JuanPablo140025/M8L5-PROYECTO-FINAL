# 🎮 RetroQuest - Bit-Based Backlog & Collection Tracker

Le sirve a un jugador para llevar un registro de los videojuegos que tiene pendientes o en colección, sustituyendo las notas sueltas del celular por una plataforma retro centralizada.

## 🚀 Demo
- **App (Frontend):** https://m8-l5-proyecto-final.vercel.app
- **API (Backend):** https://m8l5-proyecto-final.onrender.com
- **Cuenta de prueba:** `julianelprositoxd@gmail.com` / `234561` 

## 🛠️ Stack Tecnológico
- **Backend:** Node.js, Express, `pnpm`
- **Base de Datos:** PostgreSQL en Supabase
- **Seguridad & Autenticación:** JWT, bcrypt, Helmet, Express-Rate-Limit, CORS
- **Frontend:** HTML5, CSS3 (Pixel Art CSS), JavaScript vanila (`fetch` API, `textContent`)

## 📡 Endpoints de la API

| Método | Ruta | Protegida | Rol requerido | Descripción |
|---|---|---|---|---|
| `POST` | `/api/auth/registro` | No | N/A | Registra un nuevo usuario con hash de clave |
| `POST` | `/api/auth/login` | No | N/A | Autentica y devuelve el JWT con expiración |
| `GET` | `/api/juegos` | Sí | User | Obtiene solo los juegos del usuario autenticado |
| `POST` | `/api/juegos` | Sí | User | Agrega un nuevo juego a la colección |
| `PUT` | `/api/juegos/:id` | Sí | User | Actualiza estado, horas o rating de un juego |
| `DELETE` | `/api/juegos/:id` | Sí | User | Elimina un juego de la colección |
| `GET` | `/api/admin/metrics` | Sí | Admin | Ruta protegida solo accesible para rol `admin` |

## 💻 Cómo correrlo en local

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/TU_USUARIO/RetroQuest.git](https://github.com/TU_USUARIO/RetroQuest.git)
   cd RetroQuest/backend
