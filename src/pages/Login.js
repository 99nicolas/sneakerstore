import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import * as localStorageUtils from '../utils/localStorage';

function Login({ onLogin, onNavigate }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    // Verificar credenciales contra local storage
    const result = localStorageUtils.validateUser(formData.email, formData.password);
    
    if (result.success) {
      onLogin({ email: result.user.email, name: result.user.name, type: 'user' });
      onNavigate('home');
    } else {
      // Fallback a credenciales demo
      if (formData.email === 'usuario@ejemplo.com' && formData.password === 'usuario123') {
        onLogin({ email: formData.email, type: 'user' });
        onNavigate('home');
      } else {
        setError('Credenciales inválidas. Intenta con usuario@ejemplo.com / usuario123 o regístrate');
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold">👤 Iniciar Sesión</h2>
            <p className="text-muted">Accede a tu cuenta de usuario</p>
          </div>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Iniciar Sesión
            </Button>
          </Form>
          
          <div className="text-center">
            <small className="text-muted">
              ¿No tienes cuenta? <button 
                className="btn btn-link p-0 text-decoration-none" 
                onClick={(e) => { e.preventDefault(); onNavigate('register'); }}
                style={{ border: 'none', background: 'none', verticalAlign: 'baseline' }}
              >
                Regístrate aquí
              </button>
            </small>
          </div>
          
          <hr />
          
          <div className="text-center">
            <small className="text-muted">
              Demo: usuario@ejemplo.com / usuario123
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
