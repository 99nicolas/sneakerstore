import React, { useState, useMemo } from 'react';
import { Modal, Button, ListGroup } from 'react-bootstrap';

function SizeSelectionModal({ show, onHide, sneaker, onConfirm }) {
  const [selectedSize, setSelectedSize] = useState('');

  // Normalizar y ordenar tallas en orden numérico ascendente.
  // Este hook NO está condicionado por ningún return, siempre se ejecuta.
  const availableSizes = useMemo(() => {
    if (!sneaker) return [];
    const raw = sneaker.size || sneaker.tallas || [];
    return raw
        .map(s => Number(String(s).replace(',', '.')))
        .filter(n => !isNaN(n))
        .sort((a, b) => a - b)
        .map(n => String(n));
  }, [sneaker]);

  const handleConfirm = () => {
    if (selectedSize) {
      onConfirm(sneaker, selectedSize);
      setSelectedSize('');
      onHide();
    }
  };

  const handleClose = () => {
    setSelectedSize('');
    onHide();
  };

  // Si no hay sneaker, devolvemos null (pero los hooks ya fueron llamados arriba)
  if (!sneaker) {
    return null;
  }

  return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Selecciona tu talla</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <h6>{sneaker.name}</h6>
            <p className="text-muted small">{sneaker.brand}</p>
          </div>
          <p className="mb-3">Por favor, selecciona la talla de tu zapatilla:</p>
          <ListGroup>
            {availableSizes.map(size => (
                <ListGroup.Item
                    key={size}
                    action
                    active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                    style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <span>Talla {size}</span>
                    {selectedSize === size && <span>✓</span>}
                  </div>
                </ListGroup.Item>
            ))}
          </ListGroup>
          {!selectedSize && (
              <small className="text-danger d-block mt-2">
                * Debes seleccionar una talla
              </small>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
              variant="primary"
              onClick={handleConfirm}
              disabled={!selectedSize}
          >
            Agregar al Carrito
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default SizeSelectionModal;