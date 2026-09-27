-- Eliminación limpia sin errores de dependencias
DROP TABLE IF EXISTS juegos CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- 1. Tabla de Usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol VARCHAR(20) DEFAULT 'user' CHECK (rol IN ('user', 'admin')),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabla Principal (Juegos)
CREATE TABLE juegos (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    titulo VARCHAR(120) NOT NULL,
    plataforma VARCHAR(50) NOT NULL,
    estado VARCHAR(30) DEFAULT 'Pendiente' CHECK (estado IN ('Pendiente', 'Jugando', 'Completado', 'Abandonado')),
    horas_jugadas INT DEFAULT 0 CHECK (horas_jugadas >= 0),
    rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos iniciales de prueba (Contraseña: AdminPass123!)
INSERT INTO usuarios (nombre, email, password_hash, rol) VALUES
('Admin Gamer', 'admin@retroquest.com', '$2a$10$wT0C2O/qM3vOynA7/E54s.cZbJytJ8tT.k/zR/X25m91iF0O53S2G', 'admin'),
('Gamer Normal', 'jugador@retroquest.com', '$2a$10$wT0C2O/qM3vOynA7/E54s.cZbJytJ8tT.k/zR/X25m91iF0O53S2G', 'user');

INSERT INTO juegos (user_id, titulo, plataforma, estado, horas_jugadas, rating) VALUES
(2, 'Super Mario World', 'SNES', 'Completado', 15, 5),
(2, 'Castlevania: Symphony of the Night', 'PS1', 'Jugando', 8, 5);