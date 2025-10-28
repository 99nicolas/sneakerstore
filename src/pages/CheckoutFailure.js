import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Row, Col } from 'react-bootstrap';

// Componente que se muestra cuando el pago falla
// Muestra el error y opciones para reintentar o volver
function CheckoutFailure({ errorData, onRetry }) {
  // Hook para navegar a otras páginas
  const navigate = useNavigate();
  
  // Obtiene el motivo del error o usa un mensaje por defecto
  const reason = errorData?.reason || 'Hubo un problema al procesar tu pago';

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="text-center shadow">
            <Card.Body className="p-5">
              {/* Icono de error */}
              <div className="mb-4">
                <div 
                  style={{ 
                    fontSize: '80px', 
                    color: '#dc3545',
                    marginBottom: '20px'
                  }}
                >
                  ✕
                </div>
                <h2 className="text-danger mb-3">Pago Rechazado</h2>
                <p className="text-muted mb-4">
                  No se pudo completar tu compra
                </p>
              </div>

              {/* Mensaje de error */}
              <Alert variant="danger" className="text-start">
                <strong>Motivo:</strong>
                <p className="mb-0 mt-2">{reason}</p>
              </Alert>

              {/* Sugerencias para el usuario */}
              <Card className="mb-4 bg-light">
                <Card.Body className="text-start">
                  <h5 className="mb-3">¿Qué puedes hacer?</h5>
                  <ul className="mb-0">
                    <li className="mb-2">Verifica que los datos de tu tarjeta sean correctos</li>
                    <li className="mb-2">Asegúrate de tener fondos suficientes</li>
                    <li className="mb-2">Contacta a tu banco si el problema persiste</li>
                    <li className="mb-0">Intenta con otro método de pago</li>
                  </ul>
                </Card.Body>
              </Card>

              {/* Botones de acción */}
              <div className="d-grid gap-2">
                <Button 
                  variant="danger" 
                  size="lg"
                  onClick={onRetry}
                >
                  Intentar Nuevamente
                </Button>
                <Button 
                  variant="outline-secondary"
                  onClick={() => navigate('/cart')}
                >
                  Volver al Carrito
                </Button>
                <Button 
                  variant="outline-primary"
                  onClick={() => navigate('/')}
                >
                  Continuar Comprando
                </Button>
              </div>

              {/* Información de soporte */}
              <div className="mt-4 text-muted">
                <small>
                  ¿Necesitas ayuda? Contacta con nuestro soporte: 
                  <br />
                  <strong>soporte@sneakerstore.com</strong> | Tel: 1-800-SNEAKER
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutFailure;
