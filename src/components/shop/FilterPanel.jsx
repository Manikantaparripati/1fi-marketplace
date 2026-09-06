import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export default function FilterPanel({ filters, setFilters, categories, brands, isOpen, onClose }) {
  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({ ...prev, brand }));
  };

  const clearFilters = () => {
    setFilters({ category: '', brand: '', search: filters.search, sort: filters.sort });
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
      
      <div className={clsx(
        "fixed inset-y-0 right-0 w-[280px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:relative md:w-full md:transform-none md:shadow-none md:z-0 md:bg-transparent h-full flex flex-col md:block",
        isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-0 space-y-8">
          <div className="flex justify-between items-center hidden md:flex mb-4">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            {(filters.category || filters.brand) && (
              <button onClick={clearFilters} className="text-sm text-1fi-blue font-medium hover:underline">
                Clear All
              </button>
            )}
          </div>

          {(filters.category || filters.brand) && (
            <div className="md:hidden flex justify-end">
              <button onClick={clearFilters} className="text-sm text-1fi-blue font-medium hover:underline">
                Clear All
              </button>
            </div>
          )}

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Categories</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleCategoryChange('')}
                className={clsx(
                  "block text-left w-full text-sm py-1 transition-colors",
                  filters.category === '' ? "text-1fi-blue font-semibold" : "text-gray-600 hover:text-gray-900"
                )}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={clsx(
                    "block text-left w-full text-sm py-1 transition-colors",
                    filters.category === cat ? "text-1fi-blue font-semibold" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-3 text-sm uppercase tracking-wider">Brands</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handleBrandChange('')}
                className={clsx(
                  "block text-left w-full text-sm py-1 transition-colors",
                  filters.brand === '' ? "text-1fi-blue font-semibold" : "text-gray-600 hover:text-gray-900"
                )}
              >
                All Brands
              </button>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={clsx(
                    "block text-left w-full text-sm py-1 transition-colors",
                    filters.brand === brand ? "text-1fi-blue font-semibold" : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 md:hidden bg-gray-50">
           <button onClick={onClose} className="btn-primary w-full py-3">View Results</button>
        </div>
      </div>
    </>
  );
}
