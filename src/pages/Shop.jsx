import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Store, BadgePercent } from 'lucide-react';
import { products } from '../data/products';
import Header from '../components/layout/Header';
import CategoryTabs from '../components/shop/CategoryTabs';
import ProductCard from '../components/product/ProductCard';
import FilterPanel from '../components/shop/FilterPanel';

export default function Shop() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    search: '',
    sort: 'popular'
  });

  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        if (filters.category && p.category !== filters.category) return false;
        if (filters.brand && p.brand !== filters.brand) return false;
        if (filters.search) {
          const query = filters.search.toLowerCase();
          return p.name.toLowerCase().includes(query) || 
                 p.brand.toLowerCase().includes(query) || 
                 p.category.toLowerCase().includes(query);
        }
        return true;
      })
      .sort((a, b) => {
        const getPrice = (p) => Math.min(...p.variants.map(v => v.price));
        if (filters.sort === 'price-low') return getPrice(a) - getPrice(b);
        if (filters.sort === 'price-high') return getPrice(b) - getPrice(a);
        return b.rating - a.rating; // Default popular
      });
  }, [filters]);

  const renderEmptyState = () => {
    const isBrands = activeTab === 'top-brands';
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-gray-100 shadow-sm mt-6 min-h-[400px]">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          {isBrands ? <BadgePercent className="w-10 h-10 text-1fi-blue" /> : <Store className="w-10 h-10 text-1fi-blue" />}
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {isBrands ? "Top Brands Coming Soon" : "Nearby Stores Coming Soon"}
        </h2>
        <p className="text-gray-500 max-w-md mx-auto mb-8 leading-relaxed">
          We are partnering with the {isBrands ? "biggest brands" : "best local retailers"} to bring you an exclusive shopping experience. Stay tuned!
        </p>
        <button 
          onClick={() => setActiveTab('1fi-marketplace')}
          className="btn-primary px-8 shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 transition-all"
        >
          Explore 1Fi Marketplace
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <div className="sticky top-16 z-30 shadow-sm">
        <CategoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8">
        {activeTab !== '1fi-marketplace' ? (
          renderEmptyState()
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden md:block w-64 shrink-0 sticky top-[140px]">
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                categories={categories} 
                brands={brands}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1 w-full min-w-0">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">1Fi Marketplace</h1>
                <p className="text-sm sm:text-base text-gray-500">Discover premium tech products with flexible 0% EMI options.</p>
              </div>

              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search products, brands, categories..."
                    className="input-field pl-10 py-2.5 text-sm w-full bg-white shadow-sm border-gray-200"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                </div>
                <div className="flex gap-3">
                  <button 
                    className="md:hidden flex-1 flex items-center justify-center gap-2 btn-secondary py-2.5 shadow-sm bg-white"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <SlidersHorizontal size={16} />
                    <span className="text-sm font-semibold">Filters</span>
                  </button>
                  <div className="relative flex-1 sm:flex-none">
                    <select
                      className="appearance-none btn-secondary pr-10 pl-4 py-2.5 bg-white shadow-sm w-full text-sm font-medium cursor-pointer"
                      value={filters.sort}
                      onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                    >
                      <option value="popular">Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
                  <button 
                    onClick={() => setFilters({ category: '', brand: '', search: '', sort: 'popular' })}
                    className="btn-secondary"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
