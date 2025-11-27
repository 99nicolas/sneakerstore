import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Table, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { formatPrice } from '../utils/formatPrice';

// Componente del carrito de compras
// Muestra los productos agregados y permite modificar cantidades
function Cart({ cart, onUpdateQuantity, onRemoveItem }) {
    // Hook para navegar a otras páginas
    const navigate = useNavigate();

    // Calcula el total sumando precio x cantidad de cada producto
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Si el carrito está vacío, muestra un mensaje
    if (cart.length === 0) {
        return (
            <Container>
                <Alert variant="info" className="text-center">
                    <h4>Tu carrito está vacío</h4>
                    <p>Agrega algunos productos para comenzar tu compra</p>
                </Alert>
            </Container>
        );
    }

    return (
        <Container>
            <h2 className="mb-4">Carrito de Compras</h2>

            {/* Vista para pantallas grandes - Tabla */}
            <div className="d-none d-lg-block">
                <Table responsive striped bordered hover>
                    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Talla</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item) => (
                        <tr key={`${item.id}-${item.selectedSize || ''}`}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        style={{ width: '80px', height: '60px', objectFit: 'contain', marginRight: '15px' }}
                                    />
                                    <div>
                                        <strong>{item.name}</strong>
                                        <br />
                                        <small className="text-muted">{item.brand}</small>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {item.selectedSize ? (
                                    <strong>{String(item.selectedSize)}</strong>
                                ) : (
                                    <small className="text-muted">Sin talla</small>
                                )}
                            </td>
                            <td>{formatPrice(item.price)}</td>
                            <td>
                                {/* Botones para aumentar/disminuir cantidad */}
                                <div className="d-flex align-items-center">
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </Button>
                                    <span className="mx-3">{item.quantity}</span>
                                    <Button
                                        size="sm"
                                        variant="outline-secondary"
                                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                    >
                                        +
                                    </Button>
                                </div>
                            </td>
                            <td>{formatPrice(item.price * item.quantity)}</td>
                            <td>
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => onRemoveItem(item.id)}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            {/* Vista para móviles - Tarjetas */}
            <div className="d-lg-none">
                {cart.map((item) => (
                    <Card key={`${item.id}-${item.selectedSize || ''}`} className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col xs={4}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="img-fluid rounded"
                                    />
                                </Col>
                                <Col xs={8}>
                                    <h6 className="mb-1">{item.name}</h6>
                                    <small className="text-muted d-block mb-2">{item.brand}</small>

                                    <p className="mb-1">
                                        <strong className="text-primary">{formatPrice(item.price)}</strong>
                                    </p>

                                    <p className="mb-2">
                                        <small className="text-muted">Talla: </small>
                                        {item.selectedSize ? <strong>{String(item.selectedSize)}</strong> : <small className="text-muted">Sin talla</small>}
                                    </p>

                                    <div className="d-flex align-items-center mb-2">
                                        <Button
                                            size="sm"
                                            variant="outline-secondary"
                                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            size="sm"
                                            variant="outline-secondary"
                                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            +
                                        </Button>
                                        <span className="ms-3">
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </span>
                                    </div>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => onRemoveItem(item.id)}
                                    >
                                        Eliminar
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            {/* Total y botón para proceder al pago */}
            <div className="text-end">
                <h3>Total: {formatPrice(total)}</h3>
                <Button
                    variant="success"
                    size="lg"
                    className="mt-3"
                    onClick={() => navigate('/checkout')}
                >
                    Proceder al Pago
                </Button>
            </div>
        </Container>
    );
}

export default Cart;