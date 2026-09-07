# Buscador-de-usuarios-de-GitHub

El usuario escribe un nombre de usuario de GitHub, y al hacer clic se debe mostrar su información (nombre, avatar, repos).

## Funcionamiento

- Se escribe un nombre de usuario en el campo de texto y se pulsa **Buscar**.
- La aplicación consulta la API de GitHub (`https://api.github.com/users/{usuario}`) dentro de un bloque `try`.
- Si la búsqueda es exitosa, se muestra el **nombre**, el **avatar** y la cantidad de **repositorios** del usuario.
- El bloque `catch` valida el contenido del campo (por ejemplo, si lleva un `@` adicional o espacios) y muestra un mensaje de error en pantalla en lugar de romper la aplicación.
- Si el usuario no existe o falla la conexión, también se muestra un mensaje de error claro.

## Archivos

- `index.html`: estructura de la página (input, botón y zonas de resultado/error).
- `style.css`: estilos.
- `script.js`: lógica con `fetch` y `try/catch`.