import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer({ onNavigate }) {
  const handleNavigation = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-dark text-light mt-5 py-4">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>👟 Sneaker Store</h5>
            <p className="text-muted">
              Tu tienda de confianza para las mejores zapatillas deportivas y casuales.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <button 
                  className="btn btn-link text-muted text-decoration-none p-0"
                  onClick={(e) => handleNavigation(e, 'home')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  className="btn btn-link text-muted text-decoration-none p-0"
                  onClick={(e) => handleNavigation(e, 'blog')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  className="btn btn-link text-muted text-decoration-none p-0"
                  onClick={(e) => handleNavigation(e, 'about')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button 
                  className="btn btn-link text-muted text-decoration-none p-0"
                  onClick={(e) => e.preventDefault()}
                  style={{ border: 'none', background: 'none' }}
                >
                  Contacto
                </button>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contacto</h5>
            <ul className="list-unstyled text-muted">
              <li>📧 info@sneakerstore.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Sneaker Street, Ciudad</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <Row>
          <Col className="text-center text-muted">
            <p className="mb-0">&copy; {new Date().getFullYear()} Sneaker Store. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
