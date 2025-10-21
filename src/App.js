import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Admin from './pages/Admin';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);

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

  return (
    <div className="App">
      <Navigation 
        cartCount={cartCount}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />
      
      <div className="py-4">
        {currentPage === 'home' && <Home onAddToCart={handleAddToCart} />}
        {currentPage === 'cart' && (
          <Cart 
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        )}
        {currentPage === 'admin' && <Admin />}
      </div>
    </div>
  );
}

