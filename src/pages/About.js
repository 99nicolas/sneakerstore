import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Sobre Nosotros</h1>
        <p className="lead text-muted">Conoce la historia de Sneaker Store</p>
      </div>
      
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm">
            <Card.Body className="p-4">
              <h3 className="mb-4">👟 Nuestra Historia</h3>
              <p>
                Sneaker Store nació en 2020 con una visión clara: convertirse en el destino 
                preferido para los amantes de las zapatillas en toda la región. Comenzamos 
                como una pequeña tienda física y, gracias al apoyo de nuestra comunidad, 
                hemos crecido hasta convertirnos en una de las tiendas online más confiables 
                del mercado.
              </p>
              <p>
                Nuestra pasión por las zapatillas va más allá de la simple venta. Creemos 
                que cada par cuenta una historia y representa un estilo de vida único. Por 
                eso, nos esforzamos por ofrecer no solo productos de la más alta calidad, 
                sino también un servicio excepcional y asesoramiento experto.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body className="p-4">
              <div className="display-4 mb-3">🎯</div>
              <h4>Nuestra Misión</h4>
              <p className="text-muted">
                Ofrecer las mejores zapatillas del mercado con un servicio al cliente 
                excepcional, asegurando que cada compra sea una experiencia memorable.
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body className="p-4">
              <div className="display-4 mb-3">👁️</div>
              <h4>Nuestra Visión</h4>
              <p className="text-muted">
                Ser la tienda de zapatillas líder en Latinoamérica, reconocida por 
                nuestra autenticidad, variedad y compromiso con nuestros clientes.
              </p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className="mb-4">
          <Card className="h-100 text-center shadow-sm">
            <Card.Body className="p-4">
              <div className="display-4 mb-3">💎</div>
              <h4>Nuestros Valores</h4>
              <p className="text-muted">
                Autenticidad, calidad, honestidad y pasión por las zapatillas. 
                Estos son los pilares que guían cada decisión que tomamos.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <Card className="shadow-sm bg-primary text-white">
            <Card.Body className="p-4">
              <h3 className="mb-4">🌟 ¿Por qué elegirnos?</h3>
              <Row>
                <Col md={6} className="mb-3">
                  <h5>✓ Productos Auténticos</h5>
                  <p className="mb-0">
                    100% originales. Trabajamos directamente con las marcas más reconocidas.
                  </p>
                </Col>
                <Col md={6} className="mb-3">
                  <h5>✓ Envío Gratis</h5>
                  <p className="mb-0">
                    En compras superiores a $100. Recibe tus zapatillas en la puerta de tu casa.
                  </p>
                </Col>
                <Col md={6} className="mb-3">
                  <h5>✓ Devoluciones Fáciles</h5>
                  <p className="mb-0">
                    30 días para devolver o cambiar tu compra sin complicaciones.
                  </p>
                </Col>
                <Col md={6} className="mb-3">
                  <h5>✓ Atención Personalizada</h5>
                  <p className="mb-0">
                    Nuestro equipo está siempre disponible para ayudarte.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
        <Col lg={8} className="mx-auto text-center">
          <h3 className="mb-4">📞 Contáctanos</h3>
          <p className="lead mb-4">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
          </p>
          <div className="d-flex justify-content-center gap-4 flex-wrap">
            <div>
              <strong>Email:</strong><br />
              info@sneakerstore.com
            </div>
            <div>
              <strong>Teléfono:</strong><br />
              +1 (555) 123-4567
            </div>
            <div>
              <strong>Dirección:</strong><br />
              123 Sneaker Street, Ciudad
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
