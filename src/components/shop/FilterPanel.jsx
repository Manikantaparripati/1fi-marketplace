import React from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export default function FilterPanel({ 
  filters, 
  setFilters, 
  categories = [], 
  brands = [], 
  categoryCounts = {}, 
  brandCounts = {}, 
  isOpen, 
  onClose 
}) {
  const handleCategoryChange = (category) => {
    setFilters(prev => ({ ...prev, category }));
  };

  const handleBrandChange = (brand) => {
    setFilters(prev => ({ ...prev, brand }));
  };

  const clearFilters = () => {
    setFilters(prev => ({ ...prev, category: '', brand: '' }));
  };

  const totalProducts = Object.values(categoryCounts).reduce((a, b) => a + b, 0);

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
        "fixed inset-y-0 right-0 w-[300px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:relative md:w-full md:transform-none md:shadow-none md:z-0 md:bg-transparent h-full flex flex-col md:block",
        isOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 md:hidden">
          <h2 className="text-lg font-bold text-gray-900">Filters</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 md:p-0 space-y-6">
          <div className="flex justify-between items-center hidden md:flex mb-2">
            <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            {(filters.category || filters.brand) && (
              <button onClick={clearFilters} className="text-xs text-1fi-blue font-semibold hover:underline">
                Clear All
              </button>
            )}
          </div>

          {(filters.category || filters.brand) && (
            <div className="md:hidden flex justify-end">
              <button onClick={clearFilters} className="text-xs text-1fi-blue font-semibold hover:underline">
                Clear All
              </button>
            </div>
          )}

          {/* Categories Section */}
          <div className="bg-white md:p-4 md:rounded-2xl md:border md:border-gray-200/80 md:shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider text-gray-400">Categories</h3>
            <div className="space-y-1">
              <button 
                onClick={() => handleCategoryChange('')}
                className={clsx(
                  "flex items-center justify-between w-full text-sm py-1.5 px-2 rounded-lg transition-colors text-left",
                  filters.category === '' ? "bg-blue-50 text-1fi-blue font-bold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span>All Categories</span>
                <span className="text-xs text-gray-400 font-normal">({totalProducts})</span>
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={clsx(
                    "flex items-center justify-between w-full text-sm py-1.5 px-2 rounded-lg transition-colors text-left",
                    filters.category === cat ? "bg-blue-50 text-1fi-blue font-bold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span>{cat}</span>
                  {categoryCounts[cat] !== undefined && (
                    <span className={clsx("text-xs", filters.category === cat ? "text-1fi-blue font-semibold" : "text-gray-400")}>
                      ({categoryCounts[cat]})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Brands Section */}
          <div className="bg-white md:p-4 md:rounded-2xl md:border md:border-gray-200/80 md:shadow-sm">
            <h3 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider text-gray-400">Brands</h3>
            <div className="space-y-1">
              <button 
                onClick={() => handleBrandChange('')}
                className={clsx(
                  "flex items-center justify-between w-full text-sm py-1.5 px-2 rounded-lg transition-colors text-left",
                  filters.brand === '' ? "bg-blue-50 text-1fi-blue font-bold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                <span>All Brands</span>
                <span className="text-xs text-gray-400 font-normal">({totalProducts})</span>
              </button>
              {brands.map(brand => (
                <button
                  key={brand}
                  onClick={() => handleBrandChange(brand)}
                  className={clsx(
                    "flex items-center justify-between w-full text-sm py-1.5 px-2 rounded-lg transition-colors text-left",
                    filters.brand === brand ? "bg-blue-50 text-1fi-blue font-bold" : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  )}
                >
                  <span>{brand}</span>
                  {brandCounts[brand] !== undefined && (
                    <span className={clsx("text-xs", filters.brand === brand ? "text-1fi-blue font-semibold" : "text-gray-400")}>
                      ({brandCounts[brand]})
                    </span>
                  )}
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
