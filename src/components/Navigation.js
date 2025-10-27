import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

// Componente de navegación principal
function Navigation({ cartCount, onNavigate, currentPage, user, onLogout }) {
  return (
    <Navbar bg="white" variant="light" expand="lg" className="mb-4 navbar-custom shadow-sm" fixed="top">
      <Container>
        <Navbar.Brand 
          href="#" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          style={{ cursor: 'pointer' }}
          className="brand-custom"
        >
          <span className="brand-icon">👟</span>
          <span className="brand-text">Sneaker Store</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
              active={currentPage === 'home'}
              className="nav-link-custom"
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Inicio</span>
            </Nav.Link>
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}
              active={currentPage === 'blog'}
              className="nav-link-custom"
            >
              <span className="nav-icon">📝</span>
              <span className="nav-text">Blog</span>
            </Nav.Link>
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              active={currentPage === 'about'}
              className="nav-link-custom"
            >
              <span className="nav-icon">ℹ️</span>
              <span className="nav-text">Sobre Nosotros</span>
            </Nav.Link>
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}
              active={currentPage === 'cart'}
              className="nav-link-custom position-relative"
            >
              <span className="nav-icon">🛒</span>
              <span className="nav-text">Carrito</span>
              {cartCount > 0 && (
                <Badge bg="danger" className="cart-badge position-absolute">{cartCount}</Badge>
              )}
            </Nav.Link>
            
            {/* Mostrar opciones según si el usuario está logueado */}
            {user ? (
              <>
                <Nav.Link className="nav-link-custom user-info">
                  <span className="nav-icon">{user.type === 'admin' ? '🔐' : '👤'}</span>
                  <span className="nav-text">{user.email || user.username}</span>
                </Nav.Link>
                {user.type === 'admin' && (
                  <Nav.Link 
                    onClick={(e) => { e.preventDefault(); onNavigate('admin'); }}
                    active={currentPage === 'admin'}
                    className="nav-link-custom"
                  >
                    <span className="nav-icon">⚙️</span>
                    <span className="nav-text">Admin</span>
                  </Nav.Link>
                )}
                <Nav.Link 
                  onClick={(e) => { e.preventDefault(); onLogout(); }}
                  className="nav-link-custom"
                >
                  <span className="nav-icon">🚪</span>
                  <span className="nav-text">Cerrar Sesión</span>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link 
                  onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
                  active={currentPage === 'login'}
                  className="nav-link-custom"
                >
                  <span className="nav-icon">🔑</span>
                  <span className="nav-text">Login</span>
                </Nav.Link>
                <Nav.Link 
                  onClick={(e) => { e.preventDefault(); onNavigate('adminLogin'); }}
                  active={currentPage === 'adminLogin'}
                  className="nav-link-custom"
                >
                  <span className="nav-icon">🔐</span>
                  <span className="nav-text">Admin Login</span>
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
