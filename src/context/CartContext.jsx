import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('1fi_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('1fi_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, variant, tenure = 12) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.variant.id === variant.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.variant.id === variant.id
            ? { ...item, quantity: item.quantity + 1, tenure }
            : item
        );
      }
      return [...prev, { product, variant, quantity: 1, tenure }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId, variantId) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.variant.id === variantId)));
  };

  const updateQuantity = (productId, variantId, delta) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.variant.id === variantId) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.variant.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      getCartTotal,
      isCartOpen,
      setIsCartOpen,
      cartCount: cart.reduce((acc, item) => acc + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};
