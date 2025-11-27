import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup } from 'react-bootstrap';
import SneakerCard from '../components/SneakerCard';

// Componente de la página principal
// Ahora recibe 'zapatillas' desde App (vienen del backend)
function Home({ onAddToCart, onViewDetails, stock = {}, zapatillas = [] }) {
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroMarca, setFiltroMarca] = useState('');

  // Obtener marcas únicas para el filtro
  const marcas = ['Todas', ...new Set(zapatillas.map(z => z.marca).filter(Boolean))];

  // Mapear las zapatillas del backend al shape que usa SneakerCard
  const sneakersData = useMemo(() => zapatillas.map(z => {
    // obtener tallas y ordenarlas
    const rawSizes = Array.isArray(z.tallas) ? z.tallas
        : (Array.isArray(z.size) ? z.size : (z.talla != null ? [z.talla] : []));
    const sizes = rawSizes
        .map(s => Number(String(s).replace(',', '.')))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b)
        .map(n => String(n));

    return {
      id: z.id,
      name: z.modelo || '',
      brand: z.marca || '',
      price: z.precio ?? 0,
      stock: stock[z.id] !== undefined ? stock[z.id] : (z.stock ?? 0),
      image: z.image || '', // si no hay imagen, queda vacío (puedes poner placeholder)
      description: z.color || z.descripcion || '',
      // tamaños ya ordenados
      size: sizes,
    };
  }), [zapatillas, stock]);

  // Filtrar zapatillas basado en búsqueda y marca
  const zapatillasFiltradas = sneakersData.filter(sneaker => {
    const texto = terminoBusqueda.toLowerCase();
    const coincideBusqueda =
        (sneaker.name || '').toLowerCase().includes(texto) ||
        (sneaker.brand || '').toLowerCase().includes(texto) ||
        (sneaker.description || '').toLowerCase().includes(texto);

    const coincideMarca =
        !filtroMarca || filtroMarca === 'Todas' || sneaker.brand === filtroMarca;

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
              {zapatillasFiltradas.map((sneaker) => (
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