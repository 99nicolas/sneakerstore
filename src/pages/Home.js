import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SneakerCard from '../components/SneakerCard';
import sneakersData from '../data/sneakers';

function Home({ onAddToCart }) {
  return (
    <Container>
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">Bienvenido a Sneaker Store</h1>
        <p className="lead text-muted">Encuentra las mejores zapatillas para tu estilo</p>
      </div>
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {sneakersData.map((sneaker) => (
          <Col key={sneaker.id}>
            <SneakerCard sneaker={sneaker} onAddToCart={onAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
