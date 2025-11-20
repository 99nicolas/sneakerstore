import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Tabs, Tab, Spinner } from 'react-bootstrap';
import { formatPrice } from '../utils/formatPrice';
import * as localStorageUtils from '../utils/localStorage';
import { obtenerZapatillas, crearZapatilla, actualizarZapatilla } from '../api/products';

// Componente del panel de administración
function Admin() {
  const [zapatillas, setZapatillas] = useState([]);
  const [cargandoZapatillas, setCargandoZapatillas] = useState(true);
  const [errorZapatillas, setErrorZapatillas] = useState(null);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [zapatillaEditando, setZapatillaEditando] = useState(null); // null = creando nueva
  const [formulario, setFormulario] = useState({
    modelo: '',
    marca: '',
    precio: '',
    stock: '',
    talla: '',
    color: '',
  });

  const [usuarios, setUsuarios] = useState([]);

  // Cargar usuarios (siguen viniendo de localStorage como antes)
  useEffect(() => {
    const usuariosRegistrados = localStorageUtils.getUsers();
    setUsuarios(usuariosRegistrados);
  }, []);

  // Cargar zapatillas desde el backend al montar el componente
  useEffect(() => {
    const cargarZapatillas = async () => {
      try {
        const data = await obtenerZapatillas();
        setZapatillas(data);
      } catch (error) {
        console.error(error);
        setErrorZapatillas('No se pudieron cargar las zapatillas desde el servidor');
      } finally {
        setCargandoZapatillas(false);
      }
    };

    cargarZapatillas();
  }, []);

  // Preparar formulario para crear nueva zapatilla
  const manejarNuevaZapatilla = () => {
    setZapatillaEditando(null); // indica modo "crear"
    setFormulario({
      modelo: '',
      marca: '',
      precio: '',
      stock: '',
      talla: '',
      color: '',
    });
    setMostrarModal(true);
  };

  // Manejar edición de zapatilla existente
  const manejarEditar = (zapatilla) => {
    setZapatillaEditando(zapatilla);
    setFormulario({
      modelo: zapatilla.modelo || '',
      marca: zapatilla.marca || '',
      precio: zapatilla.precio != null ? zapatilla.precio : '',
      stock: zapatilla.stock != null ? zapatilla.stock : '',
      talla: zapatilla.talla != null ? zapatilla.talla : '',
      color: zapatilla.color || '',
    });
    setMostrarModal(true);
  };

  // Guardar (crear o actualizar) zapatilla en el backend
  const manejarGuardar = async () => {
    try {
      let zapatillaGuardada;

      if (zapatillaEditando) {
        // Modo edición
        zapatillaGuardada = await actualizarZapatilla(zapatillaEditando, formulario);
        setZapatillas((prev) =>
            prev.map((z) => (z.id === zapatillaGuardada.id ? zapatillaGuardada : z))
        );
      } else {
        // Modo creación
        zapatillaGuardada = await crearZapatilla(formulario);
        setZapatillas((prev) => [...prev, zapatillaGuardada]);
      }

      // Evento por si otros componentes necesitan saber que cambió el stock
      window.dispatchEvent(
          new CustomEvent('stockUpdated', {
            detail: { productId: zapatillaGuardada.id, newStock: zapatillaGuardada.stock },
          })
      );
    } catch (error) {
      console.error('Error al guardar la zapatilla en el backend', error);
      alert('Ocurrió un error al guardar la zapatilla. Inténtalo nuevamente.');
    }

    setMostrarModal(false);
    setZapatillaEditando(null);
  };

  // Cerrar modal sin guardar
  const manejarCerrar = () => {
    setMostrarModal(false);
    setZapatillaEditando(null);
  };

  return (
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Panel de Administración</h2>
          <Button variant="success" onClick={manejarNuevaZapatilla}>
            + Agregar Zapatilla
          </Button>
        </div>

        <Alert variant="info">
          Gestiona el inventario, precios de las zapatillas y usuarios registrados
        </Alert>

        <Tabs defaultActiveKey="productos" className="mb-3">
          <Tab eventKey="productos" title="Productos">
            {cargandoZapatillas ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status" className="me-2" />
                  <span>Cargando zapatillas...</span>
                </div>
            ) : errorZapatillas ? (
                <Alert variant="danger">{errorZapatillas}</Alert>
            ) : (
                <Table responsive striped bordered hover>
                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Modelo</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Talla</th>
                    <th>Color</th>
                    <th>Acciones</th>
                  </tr>
                  </thead>
                  <tbody>
                  {zapatillas.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center text-muted">
                          No hay zapatillas cargadas aún. Usa el botón "Agregar Zapatilla".
                        </td>
                      </tr>
                  ) : (
                      zapatillas.map((z) => (
                          <tr key={z.id}>
                            <td>{z.id}</td>
                            <td>{z.modelo}</td>
                            <td>{z.marca}</td>
                            <td>{formatPrice(z.precio || 0)}</td>
                            <td>{z.stock}</td>
                            <td>{z.talla}</td>
                            <td>{z.color}</td>
                            <td>
                              <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() => manejarEditar(z)}
                              >
                                Editar
                              </Button>
                            </td>
                          </tr>
                      ))
                  )}
                  </tbody>
                </Table>
            )}
          </Tab>

          <Tab eventKey="usuarios" title="Usuarios Registrados">
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
              {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center text-muted">
                      No hay usuarios registrados
                    </td>
                  </tr>
              ) : (
                  usuarios.map((usuario) => (
                      <tr key={usuario.id}>
                        <td>{usuario.id}</td>
                        <td>{usuario.name}</td>
                        <td>{usuario.email}</td>
                        <td>
                      <span
                          className={`badge bg-${
                              usuario.type === 'admin' ? 'danger' : 'primary'
                          }`}
                      >
                        {usuario.type}
                      </span>
                        </td>
                        <td>
                          {usuario.registeredAt
                              ? new Date(usuario.registeredAt).toLocaleDateString(
                                  'es-CL',
                                  {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  }
                              )
                              : 'N/A'}
                        </td>
                      </tr>
                  ))
              )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

        <Modal show={mostrarModal} onHide={manejarCerrar}>
          <Modal.Header closeButton>
            <Modal.Title>
              {zapatillaEditando ? 'Editar Zapatilla' : 'Nueva Zapatilla'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Modelo</Form.Label>
                <Form.Control
                    type="text"
                    value={formulario.modelo}
                    onChange={(e) =>
                        setFormulario({ ...formulario, modelo: e.target.value })
                    }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control
                    type="text"
                    value={formulario.marca}
                    onChange={(e) =>
                        setFormulario({ ...formulario, marca: e.target.value })
                    }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio (CLP)</Form.Label>
                <Form.Control
                    type="number"
                    step="1"
                    value={formulario.precio}
                    onChange={(e) =>
                        setFormulario({ ...formulario, precio: e.target.value })
                    }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                    type="number"
                    value={formulario.stock}
                    onChange={(e) =>
                        setFormulario({ ...formulario, stock: e.target.value })
                    }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Talla</Form.Label>
                <Form.Control
                    type="number"
                    step="0.5"
                    value={formulario.talla}
                    onChange={(e) =>
                        setFormulario({ ...formulario, talla: e.target.value })
                    }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control
                    type="text"
                    value={formulario.color}
                    onChange={(e) =>
                        setFormulario({ ...formulario, color: e.target.value })
                    }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={manejarCerrar}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={manejarGuardar}>
              {zapatillaEditando ? 'Guardar Cambios' : 'Crear Zapatilla'}
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
}

export default Admin;