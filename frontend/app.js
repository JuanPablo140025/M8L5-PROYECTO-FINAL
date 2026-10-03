const API_URL = 'https://m8l5-proyecto-final.onrender.com/api';
// Referencias a elementos del DOM
const btnTabLogin = document.getElementById('btn-tab-login');
const btnTabRegistro = document.getElementById('btn-tab-registro');
const formLogin = document.getElementById('form-login');
const formRegistro = document.getElementById('form-registro');

const secAuth = document.getElementById('sec-auth');
const secDashboard = document.getElementById('sec-dashboard');

const lblUsuarioNombre = document.getElementById('lbl-usuario-nombre');
const badgeAdmin = document.getElementById('badge-admin');
const btnAdminPanel = document.getElementById('btn-admin-panel');
const btnLogout = document.getElementById('btn-logout');

const formJuego = document.getElementById('form-juego');
const juegoId = document.getElementById('juego-id');
const juegoTitulo = document.getElementById('juego-titulo');
const juegoPlataforma = document.getElementById('juego-plataforma');
const juegoEstado = document.getElementById('juego-estado');
const juegoHoras = document.getElementById('juego-horas');
const juegoRating = document.getElementById('juego-rating');
const btnCancelarEdit = document.getElementById('btn-cancelar-edit');
const formJuegoTitulo = document.getElementById('form-juego-titulo');

const estadoCargando = document.getElementById('estado-cargando');
const estadoVacio = document.getElementById('estado-vacio');
const estadoExito = document.getElementById('estado-exito');
const tablaJuegosBody = document.getElementById('tabla-juegos-body');

const bannerError = document.getElementById('banner-error');
const bannerExito = document.getElementById('banner-exito');

// Función helper para notificaciones
function mostrarBanner(mensaje, esError = true) {
  const banner = esError ? bannerError : bannerExito;
  banner.textContent = mensaje;
  banner.classList.remove('hidden');
  setTimeout(() => banner.classList.add('hidden'), 5000);
}

// Control de Pestañas
if (btnTabLogin && btnTabRegistro) {
  btnTabLogin.addEventListener('click', () => {
    btnTabLogin.classList.add('active');
    btnTabRegistro.classList.remove('active');
    formLogin.classList.remove('hidden');
    formRegistro.classList.add('hidden');
  });

  btnTabRegistro.addEventListener('click', () => {
    btnTabRegistro.classList.add('active');
    btnTabLogin.classList.remove('active');
    formRegistro.classList.remove('hidden');
    formLogin.classList.add('hidden');
  });
}

// Iniciar Sesión
if (formLogin) {
  formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarBanner(data.message || data.error || 'Error al iniciar sesión', true);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('usuario', JSON.stringify(data.usuario || { nombre: email }));

      iniciarSesionUI(data.usuario || { nombre: email });
    } catch (err) {
      console.error(err);
      mostrarBanner('No se pudo conectar con el servidor backend', true);
    }
  });
}

// Registro
if (formRegistro) {
  formRegistro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nombre = document.getElementById('reg-nombre').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarBanner(data.message || data.error || 'Error al registrar usuario', true);
        return;
      }

      mostrarBanner('¡Cuenta creada! Ya puedes iniciar sesión', false);
      btnTabLogin.click();
    } catch (err) {
      console.error(err);
      mostrarBanner('No se pudo conectar con el servidor', true);
    }
  });
}

// Cerrar Sesión
if (btnLogout) {
  btnLogout.addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    secAuth.classList.remove('hidden');
    secDashboard.classList.add('hidden');
  });
}

// Cargar Juegos de la BD
async function cargarJuegos() {
  const token = localStorage.getItem('token');
  if (!token) return;

  estadoCargando.classList.remove('hidden');
  estadoVacio.classList.add('hidden');
  estadoExito.classList.add('hidden');

  try {
    const res = await fetch(`${API_URL}/juegos`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const juegos = await res.json();

    estadoCargando.classList.add('hidden');

    if (!res.ok) {
      mostrarBanner(juegos.message || juegos.error || 'Error al cargar colección', true);
      return;
    }

    if (!juegos || juegos.length === 0) {
      estadoVacio.classList.remove('hidden');
    } else {
      renderTablaJuegos(juegos);
      estadoExito.classList.remove('hidden');
    }
  } catch (err) {
    console.error(err);
    estadoCargando.classList.add('hidden');
    mostrarBanner('Error al obtener los datos de la colección', true);
  }
}

// Renderizar tabla
function renderTablaJuegos(juegos) {
  tablaJuegosBody.innerHTML = '';
  juegos.forEach(juego => {
    const tr = document.createElement('tr');
    const horas = juego.horas_jugadas ?? juego.horas ?? 0;
    const rating = juego.rating ?? 5;

    tr.innerHTML = `
      <td>${juego.titulo}</td>
      <td>${juego.plataforma}</td>
      <td>${juego.estado}</td>
      <td>${horas}h</td>
      <td>${'⭐'.repeat(rating)}</td>
      <td>
        <button class="pixel-btn btn-sm" onclick="prepararEdicion(${juego.id}, '${juego.titulo.replace(/'/g, "\\'")}', '${juego.plataforma.replace(/'/g, "\\'")}', '${juego.estado}', ${horas}, ${rating})">✏️</button>
        <button class="pixel-btn btn-sm btn-danger" onclick="eliminarJuego(${juego.id})">🗑️</button>
      </td>
    `;
    tablaJuegosBody.appendChild(tr);
  });
}

// Guardar o Actualizar Juego
if (formJuego) {
  formJuego.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const id = juegoId.value;

    const payload = {
      titulo: juegoTitulo.value,
      plataforma: juegoPlataforma.value,
      estado: juegoEstado.value,
      horas_jugadas: parseInt(juegoHoras.value, 10),
      rating: parseInt(juegoRating.value, 10)
    };

    const url = id ? `${API_URL}/juegos/${id}` : `${API_URL}/juegos`;
    const method = id ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarBanner(data.message || data.error || 'Error al guardar el juego', true);
        return;
      }

      mostrarBanner(id ? '¡Juego actualizado!' : '¡Juego guardado con éxito!', false);
      limpiarFormularioJuego();
      cargarJuegos();
    } catch (err) {
      console.error(err);
      mostrarBanner('Error de conexión al guardar', true);
    }
  });
}

window.prepararEdicion = function(id, titulo, plataforma, estado, horas, rating) {
  juegoId.value = id;
  juegoTitulo.value = titulo;
  juegoPlataforma.value = plataforma;
  juegoEstado.value = estado;
  juegoHoras.value = horas;
  juegoRating.value = rating;

  formJuegoTitulo.textContent = 'EDITAR JUEGO';
  btnCancelarEdit.classList.remove('hidden');
};

if (btnCancelarEdit) {
  btnCancelarEdit.addEventListener('click', limpiarFormularioJuego);
}

function limpiarFormularioJuego() {
  formJuego.reset();
  juegoId.value = '';
  formJuegoTitulo.textContent = 'AGREGAR JUEGO AL BACKLOG';
  btnCancelarEdit.classList.add('hidden');
}

window.eliminarJuego = async function(id) {
  if (!confirm('¿Deseas eliminar este juego de tu lista?')) return;
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${API_URL}/juegos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      const data = await res.json();
      mostrarBanner(data.message || data.error || 'Error al eliminar', true);
      return;
    }

    mostrarBanner('Juego eliminado', false);
    cargarJuegos();
  } catch (err) {
    console.error(err);
    mostrarBanner('Error al conectar con el servidor', true);
  }
};

function iniciarSesionUI(usuario) {
  secAuth.classList.add('hidden');
  secDashboard.classList.remove('hidden');
  lblUsuarioNombre.textContent = usuario?.nombre || usuario?.email || 'PLAYER 1';

  if (usuario?.rol === 'admin') {
    if (badgeAdmin) badgeAdmin.classList.remove('hidden');
    if (btnAdminPanel) btnAdminPanel.classList.remove('hidden');
  } else {
    if (badgeAdmin) badgeAdmin.classList.add('hidden');
    if (btnAdminPanel) btnAdminPanel.classList.add('hidden');
  }

  cargarJuegos();
}

// Mantener sesión al recargar página
window.addEventListener('DOMContentLoaded', () => {
  const token = localStorage.getItem('token');
  const usuarioRaw = localStorage.getItem('usuario');
  if (token) {
    const usuario = usuarioRaw ? JSON.parse(usuarioRaw) : null;
    iniciarSesionUI(usuario);
  }
});