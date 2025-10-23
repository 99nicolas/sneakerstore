import React from 'react';
import { Container, Table, Button, Alert, Card, Row, Col } from 'react-bootstrap';

function Cart({ cart, onUpdateQuantity, onRemoveItem, onNavigate }) {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <Container>
        <Alert variant="info" className="text-center">
          <h4>Tu carrito está vacío</h4>
          <p>Agrega algunos productos para comenzar tu compra</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="mb-4">Carrito de Compras</h2>
      
      {/* Desktop view - Table */}
      <div className="d-none d-lg-block">
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '80px', height: '60px', objectFit: 'cover', marginRight: '15px' }}
                    />
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small className="text-muted">{item.brand}</small>
                    </div>
                  </div>
                </td>
                <td>${item.price}</td>
                <td>
                  <div className="d-flex align-items-center">
                    <Button 
                      size="sm" 
                      variant="outline-secondary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-3">{item.quantity}</span>
                    <Button 
                      size="sm" 
                      variant="outline-secondary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </Button>
                  </div>
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Eliminar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Mobile view - Cards */}
      <div className="d-lg-none">
        {cart.map((item) => (
          <Card key={item.id} className="mb-3">
            <Card.Body>
              <Row>
                <Col xs={4}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="img-fluid rounded"
                  />
                </Col>
                <Col xs={8}>
                  <h6 className="mb-1">{item.name}</h6>
                  <small className="text-muted d-block mb-2">{item.brand}</small>
                  <p className="mb-2">
                    <strong className="text-primary">${item.price}</strong>
                  </p>
                  <div className="d-flex align-items-center mb-2">
                    <Button 
                      size="sm" 
                      variant="outline-secondary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button 
                      size="sm" 
                      variant="outline-secondary"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </Button>
                    <span className="ms-3">
                      <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>
      
      <div className="text-end">
        <h3>Total: ${total.toFixed(2)}</h3>
        <Button 
          variant="success" 
          size="lg" 
          className="mt-3"
          onClick={() => onNavigate('checkout')}
        >
          Proceder al Pago
        </Button>
      </div>
    </Container>
  );
}

export default Cart;
