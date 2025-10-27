import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Tabs, Tab } from 'react-bootstrap';
import sneakersData from '../data/sneakers';
import { formatPrice } from '../utils/formatPrice';
import * as localStorageUtils from '../utils/localStorage';

// Componente del panel de administración
function Admin() {
  const [products, setProducts] = useState(sneakersData);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    stock: '',
    description: ''
  });
  const [users, setUsers] = useState([]);
  const [stock, setStock] = useState({});

  // Cargar usuarios y stock al montar el componente
  useEffect(() => {
    const registeredUsers = localStorageUtils.getUsers();
    setUsers(registeredUsers);
    
    const currentStock = localStorageUtils.getStock();
    setStock(currentStock);
  }, []);

  // Actualizar productos con el stock actual
  useEffect(() => {
    const productsWithStock = sneakersData.map(product => ({
      ...product,
      stock: stock[product.id] !== undefined ? stock[product.id] : product.stock
    }));
    setProducts(productsWithStock);
  }, [stock]);

  // Manejar edición de producto
  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price,
      stock: product.stock,
      description: product.description
    });
    setShowModal(true);
  };

  // Guardar cambios del producto
  const handleSave = () => {
    if (editingProduct) {
      const newStock = parseInt(formData.stock);
      
      // Actualizar productos en el estado local
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...formData, price: parseFloat(formData.price), stock: newStock }
          : p
      ));
      
      // Guardar el stock en localStorage
      const updatedStock = { ...stock, [editingProduct.id]: newStock };
      setStock(updatedStock);
      localStorage.setItem('sneakerstore_stock', JSON.stringify(updatedStock));
      
      // Disparar evento personalizado para notificar a otros componentes
      window.dispatchEvent(new CustomEvent('stockUpdated', { 
        detail: { productId: editingProduct.id, newStock: newStock }
      }));
    }
    setShowModal(false);
    setEditingProduct(null);
  };

  // Cerrar modal sin guardar
  const handleClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Panel de Administración</h2>
      </div>

      <Alert variant="info">
        Gestiona el inventario, precios de los productos y usuarios registrados
      </Alert>

      <Tabs defaultActiveKey="products" className="mb-3">
        <Tab eventKey="products" title="Productos">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{formatPrice(product.price)}</td>
                  <td>{product.stock}</td>
                  <td>
                    <Button 
                      size="sm" 
                      variant="primary"
                      onClick={() => handleEdit(product)}
                    >
                      Editar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab eventKey="users" title="Usuarios Registrados">
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Tipo</th>
                <th>Fecha de Registro</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    No hay usuarios registrados
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge bg-${user.type === 'admin' ? 'danger' : 'primary'}`}>
                        {user.type}
                      </span>
                    </td>
                    <td>
                      {user.registeredAt 
                        ? new Date(user.registeredAt).toLocaleDateString('es-CL', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                        : 'N/A'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({...formData, brand: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio (CLP)</Form.Label>
              <Form.Control
                type="number"
                step="1"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Admin;
