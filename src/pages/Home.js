import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import SneakerCard from '../components/SneakerCard';
import sneakersData from '../data/sneakers';

function Home({ onAddToCart, onViewDetails }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  // Get unique brands for filter
  const brands = ['Todas', ...new Set(sneakersData.map(s => s.brand))];

  // Filter sneakers based on search and brand filter
  const filteredSneakers = sneakersData.filter(sneaker => {
    const matchesSearch = sneaker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sneaker.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          sneaker.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = !filterBrand || filterBrand === 'Todas' || sneaker.brand === filterBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Bienvenido a Sneaker Store</h1>
        <p className="lead text-muted">Encuentra las mejores zapatillas para tu estilo</p>
      </div>

      {/* Search and Filter Section */}
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <InputGroup className="mb-3">
            <InputGroup.Text>🔍</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Buscar zapatillas por nombre, marca o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4} className="mx-auto">
          <Form.Select 
            value={filterBrand} 
            onChange={(e) => setFilterBrand(e.target.value)}
            aria-label="Filtrar por marca"
          >
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'Todas' ? 'Todas las marcas' : brand}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {filteredSneakers.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">No se encontraron productos</h4>
          <p>Intenta con otros términos de búsqueda</p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredSneakers.map((sneaker) => (
            <Col key={sneaker.id}>
              <SneakerCard 
                sneaker={sneaker} 
                onAddToCart={onAddToCart}
                onViewDetails={onViewDetails}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Home;
