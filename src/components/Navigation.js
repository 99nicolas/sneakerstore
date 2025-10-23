import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

// Componente de navegación principal
function Navigation({ cartCount, onNavigate, currentPage, user, onLogout }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          style={{ cursor: 'pointer' }}
        >
          👟 Sneaker Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              active={currentPage === 'home'}
            >
              Inicio
            </Nav.Link>
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
              active={currentPage === 'blog'}
            >
              Blog
            </Nav.Link>
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              active={currentPage === 'about'}
            >
              Sobre Nosotros
            </Nav.Link>
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}
              active={currentPage === 'cart'}
            >
              {/* Mostrar cantidad de items en el carrito con badge */}
              Carrito {cartCount > 0 && <Badge bg="danger">{cartCount}</Badge>}
            </Nav.Link>
            
            {/* Mostrar opciones según si el usuario está logueado */}
            {user ? (
              <>
                <Nav.Link className="text-info">
                  {user.type === 'admin' ? '🔐' : '👤'} {user.email || user.username}
                </Nav.Link>
                {user.type === 'admin' && (
                  <Nav.Link 
                    onClick={(e) => { e.preventDefault(); onNavigate('admin'); }}
                    active={currentPage === 'admin'}
                  >
                    Admin
                  </Nav.Link>
                )}
                <Nav.Link onClick={(e) => { e.preventDefault(); onLogout(); }}>
                  Cerrar Sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link 
                  onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
                  active={currentPage === 'login'}
                >
                  Login
                </Nav.Link>
                <Nav.Link 
                  onClick={(e) => { e.preventDefault(); onNavigate('adminLogin'); }}
                  active={currentPage === 'adminLogin'}
                >
                  Admin Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
