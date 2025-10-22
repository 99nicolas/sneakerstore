import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

function AdminLogin({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.username || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    // Demo admin credentials
    if (formData.username === 'admin' && formData.password === 'admin123') {
      onLogin({ username: formData.username, type: 'admin' });
      onNavigate('admin');
    } else {
      setError('Credenciales de administrador inválidas. Intenta con admin / admin123');
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow border-danger">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold text-danger">🔐 Admin Login</h2>
            <p className="text-muted">Panel de Administración</p>
          </div>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Usuario Administrador</Form.Label>
              <Form.Control
                type="text"
                placeholder="admin"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Contraseña de administrador"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
            
            <Button variant="danger" type="submit" className="w-100 mb-3">
              Acceder al Panel
            </Button>
          </Form>
          
          <Alert variant="warning" className="mb-0">
            <small>
              ⚠️ Área restringida solo para administradores
            </small>
          </Alert>
          
          <hr />
          
          <div className="text-center">
            <small className="text-muted">
              Demo: admin / admin123
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AdminLogin;
