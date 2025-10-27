import React, { useState } from 'react';
import { Container, Row, Col, Button, Badge, Card, ListGroup } from 'react-bootstrap';
import { formatPrice } from '../utils/formatPrice';

// Componente de detalles del producto
function ProductDetail({ productId, onAddToCart, onBack, sneakers, stock = {} }) {
  const baseProduct = sneakers.find(s => s.id === productId);
  const [selectedSize, setSelectedSize] = useState('');

  // Combinar producto con stock actual
  const product = baseProduct ? {
    ...baseProduct,
    stock: stock[baseProduct.id] !== undefined ? stock[baseProduct.id] : baseProduct.stock
  } : null;

  if (!product) {
    return (
      <Container>
        <div className="text-center py-5">
          <h3>Producto no encontrado</h3>
          <Button variant="primary" onClick={onBack}>Volver a la tienda</Button>
        </div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    if (selectedSize) {
      onAddToCart(product);
    } else {
      alert('Por favor selecciona una talla');
    }
  };

  return (
    <Container>
      <Button variant="outline-secondary" onClick={onBack} className="mb-4">
        ← Volver a la tienda
      </Button>
      
      <Row>
        <Col md={6} className="mb-4">
          <img 
            src={product.image} 
            alt={product.name} 
            className="img-fluid rounded shadow"
            style={{ width: '100%', height: 'auto' }}
          />
        </Col>
        
        <Col md={6}>
          <div className="mb-2">
            <Badge bg="secondary" className="me-2">{product.brand}</Badge>
            {product.stock > 0 ? (
              <Badge bg="success">En Stock</Badge>
            ) : (
              <Badge bg="danger">Sin Stock</Badge>
            )}
          </div>
          
          <h1 className="mb-3">{product.name}</h1>
          
          <h2 className="text-primary mb-4">{formatPrice(product.price)}</h2>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Descripción</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
          </Card>
          
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Detalles del Producto</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Marca:</strong> {product.brand}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Disponibilidad:</strong> {product.stock} unidades
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Tallas disponibles:</strong> {product.size.join(', ')}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
          
          <div className="mb-4">
            <h5 className="mb-3">Selecciona tu talla:</h5>
            <div className="d-flex flex-wrap gap-2">
              {product.size.map(size => (
                <Button
                  key={size}
                  variant={selectedSize === size ? 'primary' : 'outline-primary'}
                  onClick={() => setSelectedSize(size)}
                  style={{ minWidth: '60px' }}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="d-grid gap-2">
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
            </Button>
          </div>
          
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
