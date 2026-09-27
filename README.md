# 🎓 Proyecto Final — La Plataforma

**Graduación de la Fase Backend · Individual · Entrega: sábado 3 de octubre**

Hasta ahora siempre te dimos el repo, la estructura y los TODOs.
Este proyecto lo armas tú desde una carpeta vacía: base de datos, API, frontend y deploy.

**El tema es libre.** Lo que no es libre son los requisitos técnicos de abajo.

**El tiempo es tuyo.** Tienes hasta el sábado 3 de octubre y cómo lo repartes lo decides tú.
Adminístralo bien y no te confíes: el deploy y la seguridad siempre toman más de lo que parece.

---

## 🎯 Qué tienes que entregar

Una aplicación web funcionando en internet, donde una persona pueda **crear su cuenta,
entrar y administrar sus propios datos**. Tres piezas desplegadas:

| Pieza | Plataforma |
|---|---|
| Base de datos | Supabase |
| Backend (API) | Render |
| Frontend | Vercel |

---

## 💡 Elegir el tema

La regla: que alguien de verdad pueda usarla. No una demo de botones sueltos, sino algo
que resuelva un problema pequeño y concreto.

La prueba para saber si tu idea sirve: completa esta frase en una línea.

> *"Esta app le sirve a **[quién]** para **[qué]**, que hoy hace **[cómo lo hace sin la app]**."*

Ejemplos:

- *"Le sirve a un jugador para llevar qué juegos tiene pendientes, que hoy lleva en una nota del celular."*
- *"Le sirve a alguien que entrena para registrar sus rutinas, que hoy lleva en una libreta."*
- *"Le sirve a un estudiante para organizar sus entregas por materia, que hoy tiene en la cabeza."*

Otras ideas: watchlist de anime o series, registro de gastos personales, agenda de mascotas
y vacunas, lista de plantas y riego, colección de cartas con wishlist, control de partidas
de un equipo de esports, inventario de un negocio pequeño, recetario personal.

**Lo que NO cuenta como app funcional:**

- Un CRUD de "productos" genérico sin contexto ni usuario claro
- Una copia del Gremio de Cazadores con los nombres cambiados
- Algo tan grande que quede a medias (un chat en tiempo real, una red social completa,
  un marketplace con pagos)

---

## 📋 Requisitos técnicos

### Base de datos (Supabase)

- [ ] Mínimo **2 tablas**: una de usuarios y una de tu entidad principal
- [ ] La entidad principal tiene una columna `user_id` que apunta a la tabla de usuarios
- [ ] Un archivo `schema.sql` en el repo con el `CREATE TABLE` de todo y algunos datos de prueba

### Backend (Node + Express)

- [ ] Arquitectura separada: `routes/`, `controllers/`, `services/`, `middlewares/`
- [ ] **Registro** con la contraseña hasheada con bcrypt
- [ ] **Login** que devuelve un JWT con expiración
- [ ] **Middleware de auth** que protege las rutas privadas
- [ ] **CRUD completo** de tu entidad: crear, listar, actualizar y eliminar
- [ ] Cada usuario ve y modifica **solo sus propios datos**
- [ ] **Una ruta con rol**: algo que solo pueda hacer un `admin` y un usuario normal no
- [ ] Códigos de estado correctos: `200`, `201`, `400`, `401`, `403`, `404`, `500`

### Seguridad

- [ ] Todas las consultas SQL con placeholders (`$1`, `$2`), ninguna concatenada
- [ ] Validación de todo lo que llega por `req.body` y `req.params` antes de usarlo
- [ ] `.env` en el `.gitignore` y un `.env.example` en el repo
- [ ] Ningún secreto, clave ni contraseña escrito dentro del código
- [ ] CORS con lista de orígenes permitidos, no `*`
- [ ] Rate limiting en las rutas de auth (`express-rate-limit`)
- [ ] Headers de seguridad (`helmet`)
- [ ] Ninguna respuesta de la API devuelve contraseñas ni hashes

### Frontend (HTML + CSS + JS)

Sin frameworks. Bootstrap permitido si quieres.

- [ ] Pantallas de registro y login
- [ ] El token se guarda y se manda en cada petición protegida
- [ ] Listar, crear, editar y eliminar desde la interfaz
- [ ] Botón de cerrar sesión
- [ ] Manejo del 401: si la sesión venció, vuelve al login
- [ ] Los **cuatro estados** visibles: cargando, vacío, error y éxito
- [ ] Los datos que escribe el usuario se pintan con `textContent`, no con `innerHTML`

### Entrega

- [ ] Las tres URLs vivas y funcionando
- [ ] Repo público en GitHub
- [ ] `README.md` (ver abajo)
- [ ] `requests.http` con el flujo completo y **3 casos que deben fallar**:
      un ataque de inyección, una petición sin token y un input inválido

---

## 📝 Qué va en tu README

Este archivo es lo primero que ve alguien que llega a tu repo. En una entrevista, es
lo que te van a abrir.

```markdown
# Nombre de la app

Una línea: a quién le sirve y para qué.

## Demo
- App: https://...vercel.app
- API: https://...onrender.com
- Cuenta de prueba: correo / contraseña

## Capturas
(1 o 2 imágenes de la app funcionando)

## Stack
Node, Express, Supabase, JWT, bcrypt...

## Endpoints
| Método | Ruta | Protegida | Qué hace |
|---|---|---|---|
| POST | /auth/registro | No | Crea una cuenta |
| ...

## Cómo correrlo en local
1. git clone ...
2. npm install
3. cp .env.example .env y rellenar
4. npm run dev

## Seguridad aplicada
Lista corta de lo que hiciste y por qué.
```

---

## 🏆 Cómo se evalúa (100 puntos)

| Criterio | Qué miro | Pts |
|---|---|---|
| **Autenticación** | Registro con bcrypt, login con JWT que expira, middleware que protege, una ruta con rol | 20 |
| **Seguridad** | Consultas parametrizadas, validación de inputs, `.env` fuera del repo, CORS cerrado, rate limiting, helmet, sin datos sensibles en las respuestas | 20 |
| **Arquitectura** | Carpetas separadas de verdad, nombres consistentes, un controller no hace consultas SQL, sin código repetido | 15 |
| **Base de datos** | Dos tablas relacionadas, `user_id` funcionando, cada usuario aislado del otro | 15 |
| **Frontend** | Consume la API, maneja el token, los cuatro estados, `textContent` para datos del usuario | 15 |
| **Entrega** | Tres URLs vivas, README completo, `.env.example`, `requests.http` con los 3 casos de falla | 15 |

**Extras (+10 máximo, no reemplazan lo anterior)**

- +5 — La app resuelve una necesidad real y bien definida, no un CRUD genérico
- +3 — Paginación, búsqueda o filtros en el listado
- +2 — Diseño cuidado

**Descuentos**

- −20 — Un secreto real subido al repo (clave de Supabase, `JWT_SECRET`, `.env` commiteado).
  Si pasa, hay que rotarlo en Supabase y volver a entregar.
- −10 — Alguna de las tres URLs no responde el día de la entrega
- −10 — Un usuario puede ver o modificar datos de otro

---

## 🎤 La presentación (5 minutos)

1. **La frase.** A quién le sirve y para qué (30 s)
2. **La app en vivo.** Registrarte, entrar, crear algo, borrarlo (2 min)
3. **Una cosa del código** que te parezca bien resuelta (1 min)
4. **Una cosa que te costó** y cómo la sacaste (1 min)
5. **Preguntas** (30 s)

Sin diapositivas. La app y el código.

---

## 🧠 Consejos

- **Empieza pequeño y funcionando.** Una entidad con cuatro campos, terminada y desplegada,
  vale más que tres tablas a medias. Siempre puedes agregar después.
- **Backend primero.** Pruébalo con REST Client antes de tocar el frontend. Si arrancas por
  la interfaz, terminas con algo bonito conectado a nada.
- **Despliega pronto**, aunque solo tengas el `/salud`. Los problemas de deploy no son
  difíciles, son lentos, y descubrirlos la noche antes de la entrega cuesta el proyecto.
- **Copia tu propia estructura.** El repo del Gremio de Cazadores ya tiene la arquitectura
  que se pide. Úsalo de plantilla y cámbiale la entidad.
- **Commits seguido.** Uno por cosa que funcione, no uno gigante al final.
- **Pruébalo con dos cuentas.** Es la única forma de saber si el aislamiento por usuario
  funciona de verdad.
