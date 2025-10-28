import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import * as localStorageUtils from '../utils/localStorage';

// Componente de Login unificado
// Permite que tanto usuarios normales como administradores inicien sesión desde el mismo formulario
function Login({ onLogin, onNavigate }) {
  // Estado para guardar los datos del formulario (email y contraseña)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // Estado para mostrar mensajes de error
  const [error, setError] = useState('');

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    setError(''); // Limpia cualquier error anterior
    
    // Verifica que los campos no estén vacíos
    if (!formData.email || !formData.password) {
      setError('Por favor completa todos los campos');
      return;
    }
    
    // Primero intenta validar el usuario registrado en localStorage
    const result = localStorageUtils.validateUser(formData.email, formData.password);
    
    if (result.success) {
      // Si el usuario existe en localStorage, inicia sesión como usuario normal
      onLogin({ email: result.user.email, name: result.user.name, type: 'user' });
      onNavigate('');
      return;
    }
    
    // Si no está registrado, verifica las credenciales de demo
    // Usuario normal demo
    if (formData.email === 'usuario@ejemplo.com' && formData.password === 'usuario123') {
      onLogin({ email: formData.email, type: 'user' });
      onNavigate('');
      return;
    }
    
    // Admin demo: permite que admin inicie sesión con usuario 'admin' como email
    if (formData.email === 'admin' && formData.password === 'admin123') {
      onLogin({ email: 'admin@sneakerstore.com', username: 'admin', type: 'admin' });
      onNavigate('admin');
      return;
    }
    
    // Si no coincide con ninguna credencial, muestra error
    setError('Credenciales inválidas. Prueba: usuario@ejemplo.com/usuario123 (usuario) o admin/admin123 (admin)');
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Card style={{ width: '100%', maxWidth: '450px' }} className="shadow">
        <Card.Body className="p-4">
          <div className="text-center mb-4">
            <h2 className="fw-bold">🔑 Iniciar Sesión</h2>
            <p className="text-muted">Ingresa tus credenciales para acceder</p>
          </div>
          
          {/* Muestra el mensaje de error si existe */}
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            {/* Campo para ingresar el email o usuario */}
            <Form.Group className="mb-3">
              <Form.Label>Email o Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="tu@email.com o admin"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Form.Group>
            
            {/* Campo para ingresar la contraseña */}
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </Form.Group>
            
            {/* Botón para enviar el formulario */}
            <Button variant="primary" type="submit" className="w-100 mb-3">
              Iniciar Sesión
            </Button>
          </Form>
          
          {/* Link para ir a la página de registro */}
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
          
          {/* Información sobre las credenciales demo */}
          <div className="text-center">
            <small className="text-muted">
              <strong>Credenciales Demo:</strong><br />
              Usuario: usuario@ejemplo.com / usuario123<br />
              Admin: admin / admin123
            </small>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Login;
