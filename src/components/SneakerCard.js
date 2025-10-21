import React from 'react';
import { Card, Button } from 'react-bootstrap';

function SneakerCard({ sneaker, onAddToCart }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={sneaker.image} 
        alt={sneaker.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <div className="mb-2">
          <small className="text-muted">{sneaker.brand}</small>
        </div>
        <Card.Title>{sneaker.name}</Card.Title>
        <Card.Text className="flex-grow-1">
          {sneaker.description}
        </Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0 text-primary">${sneaker.price}</h4>
            <small className="text-muted">Stock: {sneaker.stock}</small>
          </div>
          <Button 
            variant="primary" 
            className="w-100"
            onClick={() => onAddToCart(sneaker)}
            disabled={sneaker.stock === 0}
          >
            {sneaker.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default SneakerCard;
