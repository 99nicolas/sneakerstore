import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Card, ListGroup } from 'react-bootstrap';
import { formatPrice } from '../utils/formatPrice';

// Componente de detalles del producto
// Muestra toda la información detallada de un producto específico
function ProductDetail({ onAddToCart, onBack, sneakers = [], stock = {} }) {
  // Hooks: siempre al tope, en el mismo orden
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const [selectedSize, setSelectedSize] = useState('');

  // Busca el producto en la lista de sneakers (viene del backend)
  const baseProduct = sneakers.find(s => Number(s.id) === productId);

  // Si no lo encuentra, mostramos mensaje
  if (!baseProduct) {
    return (
        <Container>
          <div className="text-center py-5">
            <h3>Producto no encontrado</h3>
            <Button variant="primary" onClick={onBack}>Volver a la tienda</Button>
          </div>
        </Container>
    );
  }

  // Normalizamos los campos para evitar errores si faltan propiedades
  const product = {
    id: baseProduct.id,
    modelo: baseProduct.modelo || '',
    marca: baseProduct.marca || '',
    precio: baseProduct.precio ?? 0,
    stock: stock[baseProduct.id] !== undefined ? stock[baseProduct.id] : (baseProduct.stock ?? 0),
    image: baseProduct.image || baseProduct.imagen || '', // acepta 'image' o 'imagen'
    description: baseProduct.descripcion || baseProduct.color || '',
    // Preferimos un array de tallas; si solo hay 'talla' numérica lo convertimos
    sizes: Array.isArray(baseProduct.size) ? baseProduct.size
        : Array.isArray(baseProduct.tallas) ? baseProduct.tallas
            : (baseProduct.talla != null ? [baseProduct.talla] : []),
  };

  // Función para agregar el producto al carrito
  const handleAddToCart = () => {
    if (selectedSize) {
      // Solo agrega si se seleccionó una talla
      onAddToCart({
        id: product.id,
        name: product.modelo,
        brand: product.marca,
        price: product.precio,
        stock: product.stock,
        image: product.image,
        description: product.description,
        selectedSize
      });
    } else {
      alert('Por favor selecciona una talla');
    }
  };

  return (
      <Container>
        {/* Botón para volver a la tienda */}
        <Button variant="outline-secondary" onClick={onBack} className="mb-4">
          ← Volver a la tienda
        </Button>

        <Row>
          {/* Columna izquierda: imagen del producto */}
          <Col md={6} className="mb-4">
            {product.image ? (
                <img
                    src={product.image}
                    alt={product.modelo}
                    className="img-fluid rounded shadow"
                    style={{ width: '100%', height: 'auto' }}
                />
            ) : (
                <div className="bg-light rounded shadow d-flex align-items-center justify-content-center" style={{height: 300}}>
                  <span className="text-muted">Sin imagen</span>
                </div>
            )}
          </Col>

          {/* Columna derecha: información del producto */}
          <Col md={6}>
            {/* Badges de marca y disponibilidad */}
            <div className="mb-2">
              <Badge bg="secondary" className="me-2">{product.marca}</Badge>
              {product.stock > 0 ? (
                  <Badge bg="success">En Stock</Badge>
              ) : (
                  <Badge bg="danger">Sin Stock</Badge>
              )}
            </div>

            {/* Nombre del producto */}
            <h1 className="mb-3">{product.modelo}</h1>

            {/* Precio */}
            <h2 className="text-primary mb-4">{formatPrice(product.precio)}</h2>

            {/* Tarjeta de descripción */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Descripción</Card.Title>
                <Card.Text>{product.description || 'Sin descripción'}</Card.Text>
              </Card.Body>
            </Card>

            {/* Tarjeta de detalles */}
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Detalles del Producto</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Marca:</strong> {product.marca || 'N/A'}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Disponibilidad:</strong> {product.stock} unidades
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Tallas disponibles:</strong> {product.sizes.length > 0 ? product.sizes.join(', ') : 'Sin tallas registradas'}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>

            {/* Selector de tallas */}
            <div className="mb-4">
              <h5 className="mb-3">Selecciona tu talla:</h5>
              <div className="d-flex flex-wrap gap-2">
                {product.sizes.length === 0 ? (
                    <div className="text-muted">No hay tallas disponibles</div>
                ) : (
                    product.sizes.map((size) => (
                        <Button
                            key={size}
                            variant={selectedSize === String(size) ? 'primary' : 'outline-primary'}
                            onClick={() => setSelectedSize(String(size))}
                            style={{ minWidth: '60px' }}
                        >
                          {size}
                        </Button>
                    ))
                )}
              </div>
            </div>

            {/* Botón para agregar al carrito */}
            <div className="d-grid gap-2">
              <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || product.sizes.length === 0}
              >
                {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
              </Button>
            </div>

            {/* Información de envío */}
            <Card className="mt-4 bg-light">
              <Card.Body>
                <h6>🚚 Envío Gratis</h6>
                <p className="mb-0 small text-muted">En compras superiores a $100</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default ProductDetail;