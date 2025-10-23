import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';

function Checkout({ cart, onCheckoutComplete, onNavigate }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCVV: ''
  });

  const [validated, setValidated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Simulate random success/failure for demonstration
      const isSuccess = Math.random() > 0.2; // 80% success rate
      
      if (isSuccess) {
        onCheckoutComplete('success', {
          orderId: Math.floor(Math.random() * 1000000),
          total: total,
          date: new Date().toLocaleDateString(),
          ...formData
        });
      } else {
        onCheckoutComplete('failure', {
          reason: 'Pago rechazado. Por favor, verifica tu método de pago.'
        });
      }
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <Container>
        <Alert variant="warning" className="text-center">
          <h4>No hay productos en el carrito</h4>
          <p>Agrega productos antes de proceder al checkout</p>
          <Button variant="primary" onClick={() => onNavigate('home')}>
            Ir a la tienda
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Finalizar Compra</h2>
      
      <Row>
        <Col lg={8}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Información Personal</h4>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Nombre*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Ingresa tu nombre"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu nombre
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Apellido*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Ingresa tu apellido"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu apellido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Email*</Form.Label>
                      <Form.Control
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa un email válido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Teléfono*</Form.Label>
                      <Form.Control
                        required
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="123-456-7890"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu teléfono
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <h4 className="mb-3 mt-4">Dirección de Entrega</h4>
                
                <Form.Group className="mb-3">
                  <Form.Label>Dirección*</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Calle y número"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa tu dirección
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>Ciudad*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Ciudad"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu ciudad
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Provincia/Estado*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="Estado"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa tu estado
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Código Postal*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="12345"
                      />
                      <Form.Control.Feedback type="invalid">
                        Código postal requerido
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <h4 className="mb-3 mt-4">Información de Pago</h4>
                
                <Form.Group className="mb-3">
                  <Form.Label>Número de Tarjeta*</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa el número de tarjeta
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Nombre en la Tarjeta*</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    placeholder="Nombre como aparece en la tarjeta"
                  />
                  <Form.Control.Feedback type="invalid">
                    Por favor ingresa el nombre en la tarjeta
                  </Form.Control.Feedback>
                </Form.Group>

                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Fecha de Expiración*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleChange}
                        placeholder="MM/AA"
                        maxLength="5"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa la fecha de expiración
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>CVV*</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="cardCVV"
                        value={formData.cardCVV}
                        onChange={handleChange}
                        placeholder="123"
                        maxLength="4"
                      />
                      <Form.Control.Feedback type="invalid">
                        Por favor ingresa el CVV
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2 mt-4">
                  <Button 
                    variant="success" 
                    size="lg" 
                    type="submit"
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Procesando...' : `Pagar $${total.toFixed(2)}`}
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => onNavigate('cart')}
                    disabled={isProcessing}
                  >
                    Volver al Carrito
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card>
            <Card.Body>
              <h4 className="mb-3">Resumen del Pedido</h4>
              {cart.map((item) => (
                <div key={item.id} className="d-flex justify-content-between mb-2">
                  <div>
                    <small>{item.name}</small>
                    <br />
                    <small className="text-muted">Cantidad: {item.quantity}</small>
                  </div>
                  <div>
                    <small>${(item.price * item.quantity).toFixed(2)}</small>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total:</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
