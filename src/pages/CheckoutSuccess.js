import React from 'react';
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';

function CheckoutSuccess({ orderData, onNavigate }) {
  if (!orderData) {
    return (
      <Container>
        <Alert variant="warning" className="text-center">
          <h4>No hay información de pedido</h4>
          <Button variant="primary" onClick={() => onNavigate('home')}>
            Volver al inicio
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow">
            <Card.Body className="p-5">
              <div className="mb-4">
                <div 
                  style={{ 
                    fontSize: '80px', 
                    color: '#28a745',
                    marginBottom: '20px'
                  }}
                >
                  ✓
                </div>
                <h2 className="text-success mb-3">¡Compra Exitosa!</h2>
                <p className="text-muted mb-4">
                  Tu pedido ha sido procesado correctamente
                </p>
              </div>

              <Card className="mb-4 bg-light">
                <Card.Body>
                  <Row className="mb-2">
                    <Col xs={6} className="text-start">
                      <strong>Número de Orden:</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      #{orderData.orderId}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={6} className="text-start">
                      <strong>Fecha:</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      {orderData.date}
                    </Col>
                  </Row>
                  <Row className="mb-2">
                    <Col xs={6} className="text-start">
                      <strong>Total:</strong>
                    </Col>
                    <Col xs={6} className="text-end">
                      <strong>${orderData.total.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              <Alert variant="info" className="text-start">
                <strong>Información de Envío:</strong>
                <p className="mb-1 mt-2">
                  {orderData.firstName} {orderData.lastName}
                </p>
                <p className="mb-1">{orderData.address}</p>
                <p className="mb-0">
                  {orderData.city}, {orderData.state} {orderData.zipCode}
                </p>
              </Alert>

              <p className="text-muted mb-4">
                Recibirás un correo de confirmación en <strong>{orderData.email}</strong> con los detalles de tu pedido y el seguimiento de envío.
              </p>

              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => onNavigate('home')}
                >
                  Continuar Comprando
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={() => window.print()}
                >
                  Imprimir Recibo
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutSuccess;
