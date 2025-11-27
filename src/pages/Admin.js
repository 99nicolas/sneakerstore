import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert, Tabs, Tab, Spinner, Badge } from 'react-bootstrap';
import { formatPrice } from '../utils/formatPrice';
import * as localStorageUtils from '../utils/localStorage';
import { obtenerZapatillas, crearZapatilla, actualizarZapatilla, eliminarZapatilla } from '../api/products';

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
    color: '',
    image: '',
    tallas: [],        // array de tallas (strings en UI)
    tallaNueva: '',    // input temporal para añadir tallas
  });

  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const usuariosRegistrados = localStorageUtils.getUsers();
    setUsuarios(usuariosRegistrados);
  }, []);

  // Cargar zapatillas desde el backend
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

  const manejarNuevaZapatilla = () => {
    setZapatillaEditando(null);
    setFormulario({
      modelo: '',
      marca: '',
      precio: '',
      stock: '',
      color: '',
      image: '',
      tallas: [],
      tallaNueva: '',
    });
    setMostrarModal(true);
  };

  const manejarModificar = (zapatilla) => {
    setZapatillaEditando(zapatilla);
    setFormulario({
      modelo: zapatilla.modelo || '',
      marca: zapatilla.marca || '',
      precio: zapatilla.precio != null ? zapatilla.precio : '',
      stock: zapatilla.stock != null ? zapatilla.stock : '',
      color: zapatilla.color || '',
      image: zapatilla.image || '',
      // guardamos tallas como strings para facilitar la UI
      tallas: zapatilla.tallas ? zapatilla.tallas.map(String) : (zapatilla.talla != null ? [String(zapatilla.talla)] : []),
      tallaNueva: '',
    });
    setMostrarModal(true);
  };

  // Añadir una talla desde el input temporal
  const agregarTalla = () => {
    const val = formulario.tallaNueva.toString().trim();
    if (!val) return;
    // permitir decimales con coma o punto
    const normalized = val.replace(',', '.');
    const num = Number(normalized);
    if (isNaN(num)) {
      alert('Ingresa un número válido para la talla');
      return;
    }
    if (formulario.tallas.includes(String(num))) {
      alert('Esa talla ya está agregada');
      return;
    }
    setFormulario((prev) => ({
      ...prev,
      tallas: [...prev.tallas, String(num)],
      tallaNueva: '',
    }));
  };

  const quitarTalla = (index) => {
    setFormulario((prev) => ({
      ...prev,
      tallas: prev.tallas.filter((_, i) => i !== index),
    }));
  };

  const manejarGuardar = async () => {
    try {
      // antes de enviar convertimos tallas a números
      const payload = {
        modelo: formulario.modelo,
        marca: formulario.marca,
        color: formulario.color,
        precio: formulario.precio ? Number(formulario.precio) : null,
        stock: formulario.stock ? Number(formulario.stock) : 0,
        image: formulario.image || null,
        tallas: formulario.tallas.map(s => Number(String(s).replace(',', '.'))).filter(v => !isNaN(v)),
      };

      let zapatillaGuardada;
      if (zapatillaEditando) {
        zapatillaGuardada = await actualizarZapatilla(zapatillaEditando, payload);
        setZapatillas((prev) =>
            prev.map((z) => (z.id === zapatillaGuardada.id ? zapatillaGuardada : z))
        );
      } else {
        zapatillaGuardada = await crearZapatilla(payload);
        setZapatillas((prev) => [...prev, zapatillaGuardada]);
      }

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

  const manejarEliminar = async (zapatilla) => {
    const confirmar = window.confirm(`¿Seguro que quieres eliminar "${zapatilla.modelo}"?`);
    if (!confirmar) return;

    try {
      await eliminarZapatilla(zapatilla.id);
      setZapatillas((prev) => prev.filter((z) => z.id !== zapatilla.id));
      window.dispatchEvent(new CustomEvent('stockUpdated', { detail: { productId: zapatilla.id, newStock: 0 } }));
    } catch (error) {
      console.error('Error al eliminar la zapatilla en el backend', error);
      alert('Ocurrió un error al eliminar la zapatilla. Inténtalo nuevamente.');
    }
  };

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

        <Alert variant="info">Gestiona el inventario, precios de las zapatillas y usuarios registrados</Alert>

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
                    <th>Tallas</th>
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
                            <td>{(z.tallas && z.tallas.join(', ')) || (z.talla != null ? z.talla : '')}</td>
                            <td>{z.color}</td>
                            <td>
                              <Button size="sm" variant="warning" className="me-2" onClick={() => manejarModificar(z)}>
                                Modificar
                              </Button>
                              <Button size="sm" variant="danger" onClick={() => manejarEliminar(z)}>
                                Eliminar
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
                <th>ID</th><th>Nombre</th><th>Email</th><th>Tipo</th><th>Fecha de Registro</th>
              </tr>
              </thead>
              <tbody>
              {usuarios.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted">No hay usuarios registrados</td></tr>
              ) : (
                  usuarios.map(u => (
                      <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td><Badge bg={u.type === 'admin' ? 'danger' : 'primary'}>{u.type}</Badge></td>
                        <td>{u.registeredAt ? new Date(u.registeredAt).toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'N/A'}</td>
                      </tr>
                  ))
              )}
              </tbody>
            </Table>
          </Tab>
        </Tabs>

        <Modal show={mostrarModal} onHide={manejarCerrar}>
          <Modal.Header closeButton>
            <Modal.Title>{zapatillaEditando ? 'Editar Zapatilla' : 'Nueva Zapatilla'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Modelo</Form.Label>
                <Form.Control type="text" value={formulario.modelo} onChange={(e) => setFormulario({ ...formulario, modelo: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Marca</Form.Label>
                <Form.Control type="text" value={formulario.marca} onChange={(e) => setFormulario({ ...formulario, marca: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Precio (CLP)</Form.Label>
                <Form.Control type="number" step="1" value={formulario.precio} onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" value={formulario.stock} onChange={(e) => setFormulario({ ...formulario, stock: e.target.value })} />
              </Form.Group>

              {/* Gestión dinámica de tallas */}
              <Form.Group className="mb-3">
                <Form.Label>Agregar tallas disponibles</Form.Label>
                <div className="d-flex gap-2 mb-2">
                  <Form.Control type="text" placeholder="Ej: 40, 41.5 o 42" value={formulario.tallaNueva} onChange={(e) => setFormulario({ ...formulario, tallaNueva: e.target.value })} />
                  <Button variant="secondary" onClick={agregarTalla}>Agregar talla</Button>
                </div>
                <div>
                  {formulario.tallas.length === 0 ? (
                      <small className="text-muted">No hay tallas agregadas</small>
                  ) : (
                      formulario.tallas.map((t, i) => (
                          <Badge key={i} bg="light" text="dark" className="me-2 mb-2" style={{ padding: '8px' }}>
                            {t} <Button size="sm" variant="link" onClick={() => quitarTalla(i)} style={{ padding: 0, marginLeft: 6 }}>x</Button>
                          </Badge>
                      ))
                  )}
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Color</Form.Label>
                <Form.Control type="text" value={formulario.color} onChange={(e) => setFormulario({ ...formulario, color: e.target.value })} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>URL de Imagen</Form.Label>
                <Form.Control type="text" placeholder="https://ejemplo.com/imagen.jpg" value={formulario.image} onChange={(e) => setFormulario({ ...formulario, image: e.target.value })} />
                <Form.Text className="text-muted">Ingresa la URL de la imagen (opcional).</Form.Text>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={manejarCerrar}>Cancelar</Button>
            <Button variant="primary" onClick={manejarGuardar}>{zapatillaEditando ? 'Guardar Cambios' : 'Crear Zapatilla'}</Button>
          </Modal.Footer>
        </Modal>
      </Container>
  );
}
//hola

export default Admin;