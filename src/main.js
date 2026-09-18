// Obtener referencias a los elementos del DOM
const boton = document.getElementById('btnCargar');
const boton1 = document.getElementById('btnCambiar');
const boton2 = document.getElementById('btnCrear');
const contenedorResultado = document.getElementById('resultado');

// Función que realiza la llamada GET al endpoint
async function obtenerDatos() {
  try {
    contenedorResultado.textContent = 'Cargando...';

    // Petición relativa que redirige el proxy de vercel.json
    const response = await fetch('/api/users');

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const datos = await response.json();

    // Renderizar los datos recibidos
    contenedorResultado.innerHTML = `<pre>${JSON.stringify(datos, null, 2)}</pre>`;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    contenedorResultado.textContent = 'Ocurrió un error al cargar los datos.';
  }
}

// Función para actualizar el usuario vía PUT
async function actualizarUsuario() {
  const contenedor = document.getElementById('resultado');

  // Capturamos el ID de la URL y los dos parámetros del body
  const id = document.getElementById('userId').value.trim();
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();

  // Validaciones básicas del frontend
  if (!id) {
    if (contenedor) contenedor.textContent = 'Por favor, ingresa el ID del usuario.';
    return;
  }

  if (!name || !email) {
    if (contenedor) contenedor.textContent = 'Los campos Name y Email son requeridos.';
    return;
  }

  try {
    if (contenedor) contenedor.textContent = 'Actualizando usuario...';

    // Se envía el ID en la URL -> /api/usuarios/:id
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      // Se envían los dos parámetros en el body que recibe req.body
      body: JSON.stringify({ name, email })
    });

    const datos = await response.json();

    if (!response.ok) {
      // Maneja respuestas de error (400, 404, 500) enviadas por el controlador
      throw new Error(datos.message || `Error HTTP: ${response.status}`);
    }

    if (contenedor) {
      contenedor.textContent = `¡Usuario actualizado con éxito!\n\n${JSON.stringify(datos, null, 2)}`;
    }
  } catch (error) {
    console.error('Error al actualizar:', error);
    if (contenedor) {
      contenedor.textContent = `Error: ${error.message}`;
    }
  }
}

// Función para crear un nuevo usuario vía POST
async function crearUsuario() {
  const contenedor = document.getElementById('resultado');

  // Capturamos únicamente los dos campos requeridos por el controller
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();

  // Validación básica del lado del cliente
  if (!name || !email) {
    if (contenedor) contenedor.textContent = 'Los campos Name y Email son obligatorios.';
    return;
  }

  try {
    if (contenedor) contenedor.textContent = 'Creando usuario...';

    // Petición POST al endpoint /api/usuarios
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // Enviamos el objeto con los dos campos en el body
      body: JSON.stringify({ name, email })
    });

    const datos = await response.json();

    if (!response.ok) {
      // Maneja errores 400 o 500 retornados por el controlador
      throw new Error(datos.message || `Error HTTP: ${response.status}`);
    }

    if (contenedor) {
      contenedor.textContent = `¡Usuario creado con éxito! (Código ${response.status})\n\n${JSON.stringify(datos, null, 2)}`;
    }

    // Limpia los inputs tras la creación exitosa
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';

  } catch (error) {
    console.error('Error al crear:', error);
    if (contenedor) {
      contenedor.textContent = `Error: ${error.message}`;
    }
  }
}

// Asignar el evento click al botón
boton2.addEventListener('click', crearUsuario);
// Asignar el evento click al botón
boton1.addEventListener('click', actualizarUsuario);
// Asignar el evento click al botón
boton.addEventListener('click', obtenerDatos);