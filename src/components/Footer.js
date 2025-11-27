import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

// Componente de pie de página
// Muestra información de contacto y links rápidos usando react-router-dom
function Footer() {
  return (
    <footer className="bg-dark text-light mt-5 py-4" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <Container>
        <Row>
          {/* Sección de información de la tienda */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5>
              <img 
                src="/logosns.png" 
                alt="SNS Logo" 
                height="30"
                className="me-2"
                style={{ objectFit: 'contain' }}
              />
              Sneaker Store
            </h5>
            <p className="text-white-50">
              Tu tienda de confianza para las mejores zapatillas deportivas y casuales.
            </p>
          </Col>
          
          {/* Sección de enlaces rápidos */}
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-white-50 text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white-50 text-decoration-none">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white-50 text-decoration-none">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <span className="text-white-50">
                  Contacto
                </span>
              </li>
            </ul>
          </Col>
          
          {/* Sección de información de contacto */}
          <Col md={4}>
            <h5>Contacto</h5>
            <ul className="list-unstyled text-white-50">
              <li>📧 info@sneakerstore.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Sneaker Street, Ciudad</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <Row>
          {/* Copyright */}
          <Col className="text-center text-white-50">
            <p className="mb-0">&copy; {new Date().getFullYear()} Sneaker Store. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
