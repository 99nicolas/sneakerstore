const API_URL = process.env.REACT_APP_API_URL;

// Obtener todos los productos (zapatillas) desde el backend
export async function getProducts() {
  const res = await fetch(`${API_URL}/api/sneakers`);
  if (!res.ok) {
    throw new Error('Error al obtener productos desde el backend');
  }
  return res.json();
}

// Crear un nuevo producto
export async function createProduct(product) {
  const res = await fetch(`${API_URL}/api/sneakers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error('Error al crear producto en el backend');
  }
  return res.json();
}

// Actualizar un producto completo (incluye stock, precio, etc.)
export async function updateProduct(product) {
  const res = await fetch(`${API_URL}/api/sneakers/${product.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
  if (!res.ok) {
    throw new Error('Error al actualizar producto en el backend');
  }
  return res.json();
}