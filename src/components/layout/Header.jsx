import React from 'react';
import { ShoppingBag, Menu, Search, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

export default function Header() {
  const { cartCount, setIsCartOpen } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 text-gray-500 hover:text-gray-700">
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-1fi-blue rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">1Fi Shop</span>
            </Link>
          </div>

          <div className="flex-1 max-w-lg mx-8 hidden md:block">
            {/* Search will be handled in the main view for better mobile UX as per assignment, but this is a global search placeholder */}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="p-2 text-gray-500 hover:text-1fi-blue transition-colors">
              <User size={24} />
            </button>
            <button 
              className="p-2 text-gray-500 hover:text-1fi-blue transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
