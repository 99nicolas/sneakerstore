import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import * as localStorageUtils from '../utils/localStorage';

function Register({ onRegister, onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    // Validations
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }
    
    // Guardar usuario en local storage
    const result = localStorageUtils.saveUser({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      type: 'user'
    });
    
    if (!result.success) {
      setError(result.message);
      return;
    }
    
    // Success - register user
    setSuccess(true);
    setTimeout(() => {
      onRegister({ email: formData.email, name: formData.name, type: 'user' });
      onNavigate('home');
    }, 1500);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold">📝 Crear Cuenta</h2>
            <p className="text-muted">Regístrate para comenzar a comprar</p>
          </div>
          
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">¡Cuenta creada exitosamente! Redirigiendo...</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Mínimo 6 caracteres"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
            
            <Form.Group className="mb-4">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              />
            </Form.Group>
            
            <Button variant="primary" type="submit" className="w-100 mb-3" disabled={success}>
              {success ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </Form>
          
          <div className="text-center">
            <small className="text-muted">
              ¿Ya tienes cuenta? <button 
                className="btn btn-link p-0 text-decoration-none" 
                onClick={(e) => { e.preventDefault(); onNavigate('login'); }}
                style={{ border: 'none', background: 'none', verticalAlign: 'baseline' }}
              >
                Inicia sesión aquí
              </button>
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Register;
