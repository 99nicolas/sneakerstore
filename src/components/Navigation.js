import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

function Navigation({ cartCount, onNavigate, currentPage }) {
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
              onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}
              active={currentPage === 'cart'}
            >
              Carrito {cartCount > 0 && <Badge bg="danger">{cartCount}</Badge>}
            </Nav.Link>
            <Nav.Link 
              onClick={(e) => { e.preventDefault(); onNavigate('admin'); }}
              active={currentPage === 'admin'}
            >
              Admin
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
