import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
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
import AdminLogin from './pages/AdminLogin';
import Blog from './pages/Blog';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import sneakersData from './data/sneakers';
import * as localStorageUtils from './utils/localStorage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [stock, setStock] = useState({});
  // Estado para el toast de notificación
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Inicializar datos del local storage al montar el componente
  useEffect(() => {
    // Inicializar stock si no existe
    localStorageUtils.initializeStock(sneakersData);
    
    // Cargar stock actual
    const currentStock = localStorageUtils.getStock();
    setStock(currentStock);
    
    // Cargar carrito guardado
    const savedCart = localStorageUtils.getCart();
    setCart(savedCart);
    
    // Cargar usuario actual si existe
    const currentUser = localStorageUtils.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Guardar carrito en local storage cada vez que cambie
  useEffect(() => {
    localStorageUtils.saveCart(cart);
  }, [cart]);

  // Función para manejar agregar productos al carrito
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
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Función para eliminar producto del carrito
  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Calcular cantidad total de items en el carrito
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Función para manejar el login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorageUtils.setCurrentUser(userData);
  };

  // Función para manejar el logout
  const handleLogout = () => {
    setUser(null);
    localStorageUtils.clearCurrentUser();
    setCurrentPage('home');
  };

  // Función para ver detalles de un producto
  const handleViewDetails = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('productDetail');
  };

  // Función para volver desde la página de detalles
  const handleBackFromDetail = () => {
    setSelectedProductId(null);
    setCurrentPage('home');
  };

  // Función para manejar la navegación
  const handleNavigate = (page) => {
    // Proteger la página de admin
    if (page === 'admin' && (!user || user.type !== 'admin')) {
      setCurrentPage('adminLogin');
      return;
    }
    setCurrentPage(page);
  };

  // Función para manejar la finalización del checkout
  const handleCheckoutComplete = (status, data) => {
    if (status === 'success') {
      // Guardar compra en local storage
      localStorageUtils.savePurchase({
        ...data,
        cart: cart,
        userId: user?.email || data.email
      });
      
      // Reducir stock de productos comprados
      const stockResult = localStorageUtils.reduceStockFromCart(cart);
      if (stockResult.success) {
        // Actualizar estado del stock
        setStock(localStorageUtils.getStock());
      }
      
      setOrderData(data);
      setCart([]); // Limpiar carrito después de una compra exitosa
      localStorageUtils.clearCart();
      setCurrentPage('checkoutSuccess');
    } else {
      setCheckoutError(data);
      setCurrentPage('checkoutFailure');
    }
  };

  // Función para reintentar checkout
  const handleRetryCheckout = () => {
    setCheckoutError(null);
    setCurrentPage('checkout');
  };

  return (
    <div className="App d-flex flex-column min-vh-100">
      <Navigation 
        cartCount={cartCount}
        onNavigate={handleNavigate}
        currentPage={currentPage}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="py-4 flex-grow-1">
        {currentPage === 'home' && (
          <Home 
            onAddToCart={handleAddToCart} 
            onViewDetails={handleViewDetails}
            stock={stock}
          />
        )}
        {currentPage === 'productDetail' && (
          <ProductDetail 
            productId={selectedProductId}
            onAddToCart={handleAddToCart}
            onBack={handleBackFromDetail}
            sneakers={sneakersData}
            stock={stock}
          />
        )}
        {currentPage === 'cart' && (
          <Cart 
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'checkout' && (
          <Checkout 
            cart={cart}
            onCheckoutComplete={handleCheckoutComplete}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'checkoutSuccess' && (
          <CheckoutSuccess 
            orderData={orderData}
            onNavigate={handleNavigate}
          />
        )}
        {currentPage === 'checkoutFailure' && (
          <CheckoutFailure 
            errorData={checkoutError}
            onNavigate={handleNavigate}
            onRetry={handleRetryCheckout}
          />
        )}
        {currentPage === 'blog' && <Blog />}
        {currentPage === 'about' && <About />}
        {currentPage === 'login' && (
          <Login onLogin={handleLogin} onNavigate={setCurrentPage} />
        )}
        {currentPage === 'register' && (
          <Register onRegister={handleLogin} onNavigate={setCurrentPage} />
        )}
        {currentPage === 'adminLogin' && (
          <AdminLogin onLogin={handleLogin} onNavigate={setCurrentPage} />
        )}
        {currentPage === 'admin' && user && user.type === 'admin' && <Admin />}
      </div>
      
      {/* Toast de notificación para agregar al carrito */}
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
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

