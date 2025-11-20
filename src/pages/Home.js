import React, { useState } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import SneakerCard from '../components/SneakerCard';

// Componente de la página principal
// Ahora recibe 'zapatillas' desde App (vienen del backend)
function Home({ onAddToCart, onViewDetails, stock = {}, zapatillas = [] }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroMarca, setFiltroMarca] = useState('');

  // Obtener marcas únicas para el filtro
  const marcas = ['Todas', ...new Set(zapatillas.map(z => z.marca).filter(Boolean))];

  // Combinar datos de zapatillas con stock actual (si usas estado extra de stock)
  const zapatillasConStock = zapatillas.map(zapatilla => ({
    ...zapatilla,
    stock: stock[zapatilla.id] !== undefined ? stock[zapatilla.id] : zapatilla.stock
  }));

  // Filtrar zapatillas basado en búsqueda y marca
  const zapatillasFiltradas = zapatillasConStock.filter(zapatilla => {
    const texto = terminoBusqueda.toLowerCase();
    const coincideBusqueda =
        (zapatilla.modelo || '').toLowerCase().includes(texto) ||
        (zapatilla.marca || '').toLowerCase().includes(texto) ||
        (zapatilla.color || '').toLowerCase().includes(texto);

    const coincideMarca =
        !filtroMarca || filtroMarca === 'Todas' || zapatilla.marca === filtroMarca;

    return coincideBusqueda && coincideMarca;
  });

  return (
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold mb-3">Bienvenido a Sneaker Store</h1>
          <p className="lead text-muted">Encuentra las mejores zapatillas para tu estilo</p>
        </div>

        {/* Sección de búsqueda y filtro */}
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <InputGroup className="mb-3">
              <InputGroup.Text>🔍</InputGroup.Text>
              <Form.Control
                  type="text"
                  placeholder="Buscar zapatillas por modelo, marca o color..."
                  value={terminoBusqueda}
                  onChange={(e) => setTerminoBusqueda(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col md={4} className="mx-auto">
            <Form.Select
                value={filtroMarca}
                onChange={(e) => setFiltroMarca(e.target.value)}
                aria-label="Filtrar por marca"
            >
              {marcas.map(marca => (
                  <option key={marca} value={marca}>
                    {marca === 'Todas' ? 'Todas las marcas' : marca}
                  </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {zapatillasFiltradas.length === 0 ? (
            <div className="text-center py-5">
              <h4 className="text-muted">No se encontraron productos</h4>
              <p>Intenta con otros términos de búsqueda</p>
            </div>
        ) : (
            <Row xs={1} md={2} lg={3} className="g-4">
              {zapatillasFiltradas.map((z) => (
                  <Col key={z.id}>
                    <SneakerCard
                        sneaker={{
                          id: z.id,
                          name: z.modelo,     // SneakerCard espera name/brand/price
                          brand: z.marca,
                          price: z.precio,
                          stock: z.stock,
                          // si SneakerCard usa más props (imagen, descripción), se pueden mapear aquí
                        }}
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