import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

// Componente de pie de página
function Footer({ onNavigate }) {
  // Función para manejar la navegación entre páginas
  const handleNavigation = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    }
  };

  return (
    <footer className="bg-dark text-light mt-5 py-4" style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}>
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>👟 Sneaker Store</h5>
            <p className="text-white-50">
              Tu tienda de confianza para las mejores zapatillas deportivas y casuales.
            </p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <button 
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                  onClick={(e) => handleNavigation(e, 'home')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Inicio
                </button>
              </li>
              <li>
                <button 
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                  onClick={(e) => handleNavigation(e, 'blog')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Blog
                </button>
              </li>
              <li>
                <button 
                  className="btn btn-link text-white-50 text-decoration-none p-0"
                  onClick={(e) => handleNavigation(e, 'about')}
                  style={{ border: 'none', background: 'none' }}
                >
                  Sobre Nosotros
                </button>
              </li>
              <li>
                <button 
                  className="btn btn-link text-white-50 text-decoration-none p-0"
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
            <ul className="list-unstyled text-white-50">
              <li>📧 info@sneakerstore.com</li>
              <li>📞 +1 (555) 123-4567</li>
              <li>📍 123 Sneaker Street, Ciudad</li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <Row>
          <Col className="text-center text-white-50">
            <p className="mb-0">&copy; {new Date().getFullYear()} Sneaker Store. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
