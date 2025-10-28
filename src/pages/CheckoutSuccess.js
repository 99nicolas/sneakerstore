import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';
import { formatPrice } from '../utils/formatPrice';

// Componente que se muestra cuando la compra es exitosa
// Muestra el resumen del pedido y la información de envío
function CheckoutSuccess({ orderData }) {
  // Hook para navegar a otras páginas
  const navigate = useNavigate();
  
  // Si no hay datos de la orden, muestra un mensaje de error
  if (!orderData) {
    return (
      <Container>
        <Alert variant="warning" className="text-center">
          <h4>No hay información de pedido</h4>
          <Button variant="primary" onClick={() => navigate('/')}>
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
              {/* Icono de éxito */}
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

              {/* Información del pedido */}
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
                      <strong>{formatPrice(orderData.total)}</strong>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Información de envío */}
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

              {/* Mensaje de confirmación por email */}
              <p className="text-muted mb-4">
                Recibirás un correo de confirmación en <strong>{orderData.email}</strong> con los detalles de tu pedido y el seguimiento de envío.
              </p>

              {/* Botones de acción */}
              <div className="d-grid gap-2">
                <Button 
                  variant="primary" 
                  size="lg"
                  onClick={() => navigate('/')}
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
