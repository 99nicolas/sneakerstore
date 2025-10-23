import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CheckoutSuccess from './pages/CheckoutSuccess';
import CheckoutFailure from './pages/CheckoutFailure';
import Admin from './pages/Admin';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Blog from './pages/Blog';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import sneakersData from './data/sneakers';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [orderData, setOrderData] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleAddToCart = (sneaker) => {
    const existingItem = cart.find(item => item.id === sneaker.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === sneaker.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...sneaker, quantity: 1 }]);
    }
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === id 
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleViewDetails = (productId) => {
    setSelectedProductId(productId);
    setCurrentPage('productDetail');
  };

  const handleBackFromDetail = () => {
    setSelectedProductId(null);
    setCurrentPage('home');
  };

  const handleNavigate = (page) => {
    // Protect admin page
    if (page === 'admin' && (!user || user.type !== 'admin')) {
      setCurrentPage('adminLogin');
      return;
    }
    setCurrentPage(page);
  };

  const handleCheckoutComplete = (status, data) => {
    if (status === 'success') {
      setOrderData(data);
      setCart([]); // Clear cart on successful purchase
      setCurrentPage('checkoutSuccess');
    } else {
      setCheckoutError(data);
      setCurrentPage('checkoutFailure');
    }
  };

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
          />
        )}
        {currentPage === 'productDetail' && (
          <ProductDetail 
            productId={selectedProductId}
            onAddToCart={handleAddToCart}
            onBack={handleBackFromDetail}
            sneakers={sneakersData}
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
        {currentPage === 'adminLogin' && (
          <AdminLogin onLogin={handleLogin} onNavigate={setCurrentPage} />
        )}
        {currentPage === 'admin' && user && user.type === 'admin' && <Admin />}
      </div>
      
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

