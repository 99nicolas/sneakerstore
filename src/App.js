import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Toast, ToastContainer } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailure from './pages/CheckoutFailure';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import Blog from './pages/Blog';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import sneakersData from './data/sneakers';
import * as localStorageUtils from './utils/localStorage';

// Componente principal de la aplicación
// Maneja el estado global del carrito, usuario, y productos
function AppContent() {
  // Estado del carrito de compras (lista de productos agregados)
  const [cart, setCart] = useState([]);
  // Estado del usuario actual (null si no está logueado)
  const [user, setUser] = useState(null);
  // Estado con información de la orden después del checkout
  const [orderData, setOrderData] = useState(null);
  // Estado para errores en el checkout
  const [checkoutError, setCheckoutError] = useState(null);
  // Estado del inventario/stock de productos
  const [stock, setStock] = useState({});
  // Estado para mostrar notificación tipo toast
  const [showToast, setShowToast] = useState(false);
  // Mensaje que se muestra en el toast
  const [toastMessage, setToastMessage] = useState('');
  // Hook de react-router para navegación programática
  const navigate = useNavigate();

  // Hook que se ejecuta una vez al cargar el componente
  // Inicializa datos desde localStorage
  useEffect(() => {
    // Inicializar stock si no existe en localStorage
    localStorageUtils.initializeStock(sneakersData);
    
    // Cargar stock actual desde localStorage
    const currentStock = localStorageUtils.getStock();
    setStock(currentStock);
    
    // Cargar carrito guardado en localStorage
    const savedCart = localStorageUtils.getCart();
    setCart(savedCart);
    
    // Cargar usuario actual si existe una sesión activa
    const currentUser = localStorageUtils.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }

    // Escuchar evento personalizado cuando se actualiza el stock desde el admin
    const handleStockUpdate = () => {
      const updatedStock = localStorageUtils.getStock();
      setStock(updatedStock);
    };

    window.addEventListener('stockUpdated', handleStockUpdate);

    // Limpieza: remover el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('stockUpdated', handleStockUpdate);
    };
  }, []);

  // Hook que guarda el carrito en localStorage cada vez que cambia
  useEffect(() => {
    localStorageUtils.saveCart(cart);
  }, [cart]);

  // Función para agregar productos al carrito
  const handleAddToCart = (sneaker) => {
    const existingItem = cart.find(item => item.id === sneaker.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === sneaker.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      const sizeText = sneaker.selectedSize ? ` (Talla ${sneaker.selectedSize})` : '';
      setToastMessage(`Se agregó otra unidad de "${sneaker.name}"${sizeText} al carrito`);
    } else {
      setCart([...cart, { ...sneaker, quantity: 1 }]);
      const sizeText = sneaker.selectedSize ? ` (Talla ${sneaker.selectedSize})` : '';
      setToastMessage(`"${sneaker.name}"${sizeText} fue agregado al carrito`);
    }
    
    // Mostrar notificación toast
    setShowToast(true);
  };

  // Función para actualizar la cantidad de un producto en el carrito
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // No permite cantidades menores a 1
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Función para eliminar un producto del carrito
  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calcula el número total de items en el carrito
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Función que se ejecuta cuando un usuario inicia sesión
  const handleLogin = (userData) => {
    setUser(userData);
    localStorageUtils.setCurrentUser(userData);
  };

  // Función que se ejecuta cuando un usuario cierra sesión
  const handleLogout = () => {
    setUser(null);
    localStorageUtils.clearCurrentUser();
    navigate('/'); // Redirige a la página de inicio
  };

  // Función para ver los detalles de un producto específico
  const handleViewDetails = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Función para volver desde la página de detalles de producto
  const handleBackFromDetail = () => {
    navigate('/');
  };

  // Función para manejar la finalización del proceso de checkout
  const handleCheckoutComplete = (status, data) => {
    if (status === 'success') {
      // Guarda la compra en localStorage
      localStorageUtils.savePurchase({
        ...data,
        cart: cart,
        userId: user?.email || data.email
      });
      
      // Reduce el stock de los productos comprados
      const stockResult = localStorageUtils.reduceStockFromCart(cart);
      if (stockResult.success) {
        // Actualiza el estado del stock
        setStock(localStorageUtils.getStock());
      }
      
      setOrderData(data);
      setCart([]); // Limpia el carrito
      localStorageUtils.clearCart();
      navigate('/checkout/success'); // Redirige a página de éxito
    } else {
      // Si hay error, guarda el error y redirige a página de error
      setCheckoutError(data);
      navigate('/checkout/failure');
    }
  };

  // Función para reintentar el checkout después de un error
  const handleRetryCheckout = () => {
    setCheckoutError(null);
    navigate('/checkout');
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      {/* Barra de navegación superior */}
      <Navigation 
        cartCount={cartCount}
        user={user}
        onLogout={handleLogout}
      />
      
      {/* Contenedor principal con todas las rutas de la aplicación */}
      <div className="py-4 flex-grow-1">
        <Routes>
          {/* Ruta principal: muestra el catálogo de productos */}
          <Route path="/" element={
            <Home 
              onAddToCart={handleAddToCart} 
              onViewDetails={handleViewDetails}
              stock={stock}
            />
          } />
          
          {/* Ruta para ver detalles de un producto específico */}
          <Route path="/product/:id" element={
            <ProductDetail 
              onAddToCart={handleAddToCart}
              onBack={handleBackFromDetail}
              sneakers={sneakersData}
              stock={stock}
            />
          } />
          
          {/* Ruta del carrito de compras */}
          <Route path="/cart" element={
            <Cart 
              cart={cart}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          } />
          
          {/* Ruta del checkout (finalizar compra) */}
          <Route path="/checkout" element={
            <Checkout 
              cart={cart}
              onCheckoutComplete={handleCheckoutComplete}
            />
          } />
          
          {/* Ruta de compra exitosa */}
          <Route path="/checkout/success" element={
            <CheckoutSuccess orderData={orderData} />
          } />
          
          {/* Ruta de error en la compra */}
          <Route path="/checkout/failure" element={
            <CheckoutFailure 
              errorData={checkoutError}
              onRetry={handleRetryCheckout}
            />
          } />
          
          {/* Ruta del blog */}
          <Route path="/blog" element={<Blog />} />
          
          {/* Ruta de "Sobre Nosotros" */}
          <Route path="/about" element={<About />} />
          
          {/* Ruta de login (unificado para usuarios y admins) */}
          <Route path="/login" element={
            <Login onLogin={handleLogin} onNavigate={(page) => navigate('/' + page)} />
          } />
          
          {/* Ruta de registro de nuevos usuarios */}
          <Route path="/register" element={
            <Register onRegister={handleLogin} onNavigate={(page) => navigate('/' + page)} />
          } />
          
          {/* Ruta del panel de administración (protegida) */}
          <Route path="/admin" element={
            // Si el usuario es admin, muestra el panel, si no, redirige al login
            user && user.type === 'admin' ? <Admin /> : <Navigate to="/login" replace />
          } />
        </Routes>
      </div>
      
      {/* Notificación toast para cuando se agrega un producto al carrito */}
      <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          bg="success"
        >
          <Toast.Header>
            <strong className="me-auto">✓ Producto Agregado</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
      
      {/* Pie de página */}
      <Footer />
    </div>
  );
}

// Componente wrapper que provee el Router
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

