import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import CartDrawer from './components/cart/CartDrawer';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="font-sans text-gray-900 bg-1fi-gray-50 min-h-screen">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
