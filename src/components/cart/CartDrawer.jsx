import React, { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCurrency, calculateEMI } from '../../utils/emi';
import ProductImage from '../product/ProductImage';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  const total = getCartTotal();

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-50 transition-opacity backdrop-blur-sm"
        onClick={() => setIsCartOpen(false)}
      />
      <div className="fixed inset-y-0 right-0 w-full md:w-[420px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out translate-x-0">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag size={20} className="text-1fi-blue" />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4 bg-gray-50/50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-gray-400" />
              </div>
              <p className="font-medium text-gray-900 mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-500 text-center px-8">Looks like you haven't added anything to your cart yet.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="mt-6 btn-primary px-8"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.product.id}-${item.variant.id}`} className="flex gap-4 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100 p-2 flex items-center justify-center">
                  <ProductImage 
                    src={item.product.image} 
                    alt={item.product.name} 
                    brand={item.product.brand}
                    category={item.product.category}
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">{item.product.name}</h3>
                      <button 
                        onClick={() => removeFromCart(item.product.id, item.variant.id)}
                        className="text-gray-400 hover:text-red-500 p-1 -mr-1 -mt-1 rounded-full hover:bg-red-50 transition-colors shrink-0"
                        title="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{item.variant.name}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span className="font-bold text-gray-900">{formatCurrency(item.variant.price)}</span>
                      <span className="text-[10px] text-1fi-blue bg-blue-50 border border-blue-100 px-1.5 py-0.5 rounded font-semibold">
                        EMI: {formatCurrency(calculateEMI(item.variant.price, item.tenure))}/mo
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-3">
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50/50">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.variant.id, -1)}
                        disabled={item.quantity <= 1}
                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-l-lg transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm font-semibold w-10 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.variant.id, 1)}
                        className="p-1.5 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-r-lg transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Subtotal ({cart.length} items)</span>
              <span className="font-medium text-gray-900">{formatCurrency(total)}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100">
              <span>Total Payable</span>
              <span className="text-1fi-blue">{formatCurrency(total)}</span>
            </div>
            <button className="btn-primary w-full py-4 text-base font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
