import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

// Componente de navegación principal
// Usa react-router-dom para la navegación entre páginas
function Navigation({ cartCount, user, onLogout }) {
  // Hook que nos dice en qué ruta estamos actualmente
  const location = useLocation();

  return (
    <Navbar bg="white" variant="light" expand="lg" className="mb-4 navbar-custom shadow-sm" fixed="top">
      <Container>
        {/* Logo y nombre de la tienda */}
        <Navbar.Brand as={Link} to="/" className="brand-custom" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src="/logosns.png" 
            alt="SNS Logo" 
            height="40"
            style={{ objectFit: 'contain' }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {/* Link a la página de inicio */}
            <Nav.Link 
              as={Link} 
              to="/"
              active={location.pathname === '/'}
              className="nav-link-custom"
            >
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Inicio</span>
            </Nav.Link>
            
            {/* Link al blog */}
            <Nav.Link 
              as={Link} 
              to="/blog"
              active={location.pathname === '/blog'}
              className="nav-link-custom"
            >
              <span className="nav-icon">📝</span>
              <span className="nav-text">Blog</span>
            </Nav.Link>
            
            {/* Link a Sobre Nosotros */}
            <Nav.Link 
              as={Link} 
              to="/about"
              active={location.pathname === '/about'}
              className="nav-link-custom"
            >
              <span className="nav-icon">ℹ️</span>
              <span className="nav-text">Sobre Nosotros</span>
            </Nav.Link>
            
            {/* Link al carrito con badge mostrando cantidad de items */}
            <Nav.Link 
              as={Link} 
              to="/cart"
              active={location.pathname === '/cart'}
              className="nav-link-custom position-relative"
            >
              <span className="nav-icon">🛒</span>
              <span className="nav-text">Carrito</span>
              {/* Solo muestra el badge si hay items en el carrito */}
              {cartCount > 0 && (
                <Badge bg="danger" className="cart-badge position-absolute">{cartCount}</Badge>
              )}
            </Nav.Link>
            
            {/* Muestra diferentes opciones según si el usuario está logueado o no */}
            {user ? (
              <>
                {/* Información del usuario logueado */}
                <Nav.Link className="nav-link-custom user-info">
                  <span className="nav-icon">{user.type === 'admin' ? '🔐' : '👤'}</span>
                  <span className="nav-text">{user.email || user.username}</span>
                </Nav.Link>
                
                {/* Si el usuario es admin, muestra el link al panel de administración */}
                {user.type === 'admin' && (
                  <Nav.Link 
                    as={Link} 
                    to="/admin"
                    active={location.pathname === '/admin'}
                    className="nav-link-custom"
                  >
                    <span className="nav-icon">⚙️</span>
                    <span className="nav-text">Admin</span>
                  </Nav.Link>
                )}
                
                {/* Botón para cerrar sesión */}
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
                {/* Si no está logueado, muestra el link de login */}
                <Nav.Link 
                  as={Link} 
                  to="/login"
                  active={location.pathname === '/login'}
                  className="nav-link-custom"
                >
                  <span className="nav-icon">🔑</span>
                  <span className="nav-text">Login</span>
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
