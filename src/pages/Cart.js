import React from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';

function Cart({ cart, onUpdateQuantity, onRemoveItem }) {
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
      
      <div className="text-end">
        <h3>Total: ${total.toFixed(2)}</h3>
        <Button variant="success" size="lg" className="mt-3">
          Proceder al Pago
        </Button>
      </div>
    </Container>
  );
}

export default Cart;
