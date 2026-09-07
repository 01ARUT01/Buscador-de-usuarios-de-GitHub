const formulario = document.getElementById("buscador");
const inputUsuario = document.getElementById("input-usuario");
const botonBuscar = document.getElementById("boton-buscar");
const mensajeError = document.getElementById("mensaje-error");
const resultado = document.getElementById("resultado");
const avatar = document.getElementById("avatar");
const nombre = document.getElementById("nombre");
const detalle = document.getElementById("detalle");
const repos = document.getElementById("repos");

function mostrarError(mensaje) {
  resultado.hidden = true;
  mensajeError.textContent = mensaje;
  mensajeError.hidden = false;
}

function mostrarResultado(usuario) {
  mensajeError.hidden = true;
  avatar.src = usuario.avatar_url;
  avatar.alt = `Avatar de ${usuario.login}`;
  nombre.textContent = usuario.name || usuario.login;
  detalle.textContent = `@${usuario.login}`;
  repos.innerHTML = `${usuario.public_repos} repositorios p&uacute;blicos &mdash; <a href="${usuario.html_url}" target="_blank" rel="noopener">ver perfil</a>`;
  resultado.hidden = false;
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const usuarioBuscado = inputUsuario.value.trim();
  resultado.hidden = true;
  mensajeError.hidden = true;

  botonBuscar.disabled = true;
  botonBuscar.textContent = "Buscando...";

  try {
    const respuesta = await fetch(`https://api.github.com/users/${usuarioBuscado}`);

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    mostrarResultado(datos);
  } catch (error) {
    const contieneArroba = inputUsuario.value.includes("@");
    const contieneEspacio = inputUsuario.value.includes(" ");

    if (usuarioBuscado === "") {
      mostrarError("Debes escribir un nombre de usuario.");
    } else if (contieneArroba) {
      mostrarError("El nombre de usuario no debe llevar @ (ejemplo: octocat).");
    } else if (contieneEspacio) {
      mostrarError("El nombre de usuario no debe contener espacios.");
    } else if (error.message === "Error 404") {
      mostrarError(`No se encontró el usuario "${usuarioBuscado}". Verifica que exista en GitHub.`);
    } else {
      mostrarError("Ha ocurrido un error de conexión. Intenta de nuevo más tarde.");
    }
  } finally {
    botonBuscar.disabled = false;
    botonBuscar.textContent = "Buscar";
  }
});