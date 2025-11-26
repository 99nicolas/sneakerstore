import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { formatPrice } from '../utils/formatPrice';
import SizeSelectionModal from './SizeSelectionModal';

// Componente para mostrar tarjeta de zapatilla
function SneakerCard({ sneaker, onAddToCart, onViewDetails }) {
  const [showSizeModal, setShowSizeModal] = useState(false);

  const handleAddToCartClick = () => {
    setShowSizeModal(true);
  };

  const handleConfirmSize = (sneaker, size) => {
    onAddToCart({ ...sneaker, selectedSize: size });
  };

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Img 
          variant="top" 
          src={sneaker.image} 
          alt={sneaker.name}
          style={{ height: '200px', objectFit: 'contain', cursor: 'pointer' }}
          onClick={() => onViewDetails && onViewDetails(sneaker.id)}
        />
        <Card.Body className="d-flex flex-column">
          <div className="mb-2">
            <small className="text-muted">{sneaker.brand}</small>
          </div>
          <Card.Title 
            style={{ cursor: 'pointer' }}
            onClick={() => onViewDetails && onViewDetails(sneaker.id)}
          >
            {sneaker.name}
          </Card.Title>
          <Card.Text className="flex-grow-1">
            {sneaker.description}
          </Card.Text>
          <div className="mt-auto">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h4 className="mb-0 text-primary">{formatPrice(sneaker.price)}</h4>
              <small className="text-muted">Stock: {sneaker.stock}</small>
            </div>
            <div className="d-grid gap-2">
              <Button 
                variant="outline-primary" 
                size="sm"
                onClick={() => onViewDetails && onViewDetails(sneaker.id)}
              >
                Ver Detalles
              </Button>
              <Button 
                variant="primary" 
                onClick={handleAddToCartClick}
                disabled={sneaker.stock === 0}
              >
                {sneaker.stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
      
      <SizeSelectionModal
        show={showSizeModal}
        onHide={() => setShowSizeModal(false)}
        sneaker={sneaker}
        onConfirm={handleConfirmSize}
      />
    </>
  );
}

export default SneakerCard;
