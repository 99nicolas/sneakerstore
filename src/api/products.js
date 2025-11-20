const API_URL = process.env.REACT_APP_API_URL;

// Obtener todos los productos (zapatillas) desde el backend
export async function getProducts() {
  const res = await fetch(`${API_URL}/api/sneakers`);
  if (!res.ok) {
    throw new Error('Error al obtener productos desde el backend');
  }
  return res.json();
}

// Actualizar un producto completo (incluye stock, precio, etc.)
export async function updateProduct(product) {
  // Asumo endpoint tipo PUT /api/sneakers/{id}
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

// (Opcional) solo actualizar stock si tienes endpoint separado
export async function updateProductStock(id, newStock) {
  // Asumo endpoint tipo PATCH /api/sneakers/{id}/stock?cantidad=NEW_STOCK
  const res = await fetch(`${API_URL}/api/sneakers/${id}/stock?cantidad=${newStock}`, {
    method: 'PATCH',
  });
  if (!res.ok) {
    throw new Error('Error al actualizar stock en el backend');
  }
  return res.json();
}
