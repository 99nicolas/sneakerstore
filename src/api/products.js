const API_URL = process.env.REACT_APP_API_URL;

// Obtener todas las zapatillas desde el backend
export async function obtenerZapatillas() {
  const res = await fetch(`${API_URL}/api/sneakers`);
  if (!res.ok) {
    throw new Error('Error al obtener las zapatillas desde el backend');
  }
  return res.json();
}

// Crear una nueva zapatilla
export async function crearZapatilla(datosFormulario) {
  const cuerpo = {
    marca: datosFormulario.marca,
    modelo: datosFormulario.modelo,
    talla: datosFormulario.talla ? Number(datosFormulario.talla) : null,
    color: datosFormulario.color || null,
    precio: datosFormulario.precio ? Number(datosFormulario.precio) : null,
    stock: datosFormulario.stock ? Number(datosFormulario.stock) : 0,
    image: datosFormulario.image || null, // <-- URL de imagen
  };

  const res = await fetch(`${API_URL}/api/sneakers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });
  if (!res.ok) {
    throw new Error('Error al crear la zapatilla en el backend');
  }
  return res.json();
}

// Actualizar una zapatilla existente
export async function actualizarZapatilla(zapatilla, datosFormulario) {
  const cuerpo = {
    id: zapatilla.id,
    marca: datosFormulario.marca,
    modelo: datosFormulario.modelo,
    talla: datosFormulario.talla ? Number(datosFormulario.talla) : null,
    color: datosFormulario.color || null,
    precio: datosFormulario.precio ? Number(datosFormulario.precio) : null,
    stock: datosFormulario.stock ? Number(datosFormulario.stock) : 0,
    image: datosFormulario.image || null, // <-- URL de imagen
  };

  const res = await fetch(`${API_URL}/api/sneakers/${zapatilla.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cuerpo),
  });
  if (!res.ok) {
    throw new Error('Error al actualizar la zapatilla en el backend');
  }
  return res.json();
}

// Eliminar una zapatilla por id
export async function eliminarZapatilla(id) {
  const res = await fetch(`${API_URL}/api/sneakers/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error('Error al eliminar la zapatilla en el backend');
  }
}