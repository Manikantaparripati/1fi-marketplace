import React, { useState, useMemo, useEffect } from 'react';
import { Search, SlidersHorizontal, ChevronDown, Store, BadgePercent, X } from 'lucide-react';
import { products, CATEGORIES, BRANDS } from '../data/products';
import Header from '../components/layout/Header';
import CategoryTabs from '../components/shop/CategoryTabs';
import ProductCard from '../components/product/ProductCard';
import FilterPanel from '../components/shop/FilterPanel';

export default function Shop() {
  const [activeTab, setActiveTab] = useState('1fi-marketplace');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    search: '',
    sort: 'popular'
  });

  // Simulate network loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [filters, activeTab]);

  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const brandCounts = useMemo(() => {
    const counts = {};
    products.forEach(p => {
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        if (filters.category && p.category !== filters.category) return false;

        // Brand filter
        if (filters.brand && p.brand !== filters.brand) return false;

        // Search filter (Product name, Brand, Category, Specs)
        if (filters.search) {
          const query = filters.search.toLowerCase().trim();
          const words = query.split(/\s+/).filter(Boolean);
          
          const searchable = `${p.name} ${p.brand} ${p.category} ${p.description || ''} ${(p.specs || []).join(' ')}`.toLowerCase();
          
          const matches = words.every(word => {
            if (searchable.includes(word)) return true;
            // Handle singular / plural forms (e.g. laptop / laptops, phone / phones)
            if (word.endsWith('s') && searchable.includes(word.slice(0, -1))) return true;
            if (!word.endsWith('s') && searchable.includes(word + 's')) return true;
            return false;
          });

          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const getPrice = (p) => p.price || (p.variants && p.variants.length > 0 ? Math.min(...p.variants.map(v => v.price)) : p.originalPrice);
        
        switch (filters.sort) {
          case 'price-low':
            return getPrice(a) - getPrice(b);
          case 'price-high':
            return getPrice(b) - getPrice(a);
          case 'rating':
            return (b.rating || 0) - (a.rating || 0);
          case 'newest':
            return (b.reviews || 0) - (a.reviews || 0);
          case 'popular':
          default:
            return ((b.reviews || 0) * (b.rating || 0)) - ((a.reviews || 0) * (a.rating || 0));
        }
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

  const hasActiveFilters = filters.category || filters.brand || filters.search;

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
                categories={CATEGORIES} 
                brands={BRANDS}
                categoryCounts={categoryCounts}
                brandCounts={brandCounts}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </aside>

            {/* Mobile Filter Drawer */}
            <div className="md:hidden">
              <FilterPanel 
                filters={filters} 
                setFilters={setFilters} 
                categories={CATEGORIES} 
                brands={BRANDS}
                categoryCounts={categoryCounts}
                brandCounts={brandCounts}
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full min-w-0">
              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">1Fi Marketplace</h1>
                  <p className="text-sm sm:text-base text-gray-500">Discover premium tech products with flexible 0% EMI options.</p>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-gray-500">
                  Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> of {products.length} products
                </div>
              </div>

              {/* Search and Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search products, brands, categories (e.g. Dell, MacBook, Laptops)..."
                    className="input-field pl-10 pr-9 py-2.5 text-sm w-full bg-white shadow-sm border-gray-200"
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  />
                  {filters.search && (
                    <button
                      onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  <button 
                    className="md:hidden flex-1 flex items-center justify-center gap-2 btn-secondary py-2.5 shadow-sm bg-white"
                    onClick={() => setIsFilterOpen(true)}
                  >
                    <SlidersHorizontal size={16} />
                    <span className="text-sm font-semibold">Filters</span>
                    {hasActiveFilters && (
                      <span className="w-2 h-2 rounded-full bg-1fi-blue"></span>
                    )}
                  </button>
                  <div className="relative flex-1 sm:flex-none sm:min-w-[190px]">
                    <select
                      className="appearance-none btn-secondary pr-10 pl-4 py-2.5 bg-white shadow-sm w-full text-sm font-medium cursor-pointer"
                      value={filters.sort}
                      onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                    >
                      <option value="popular">Popularity</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Rating: High to Low</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Active Filter Chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  <span className="text-xs text-gray-400 font-medium">Active filters:</span>
                  {filters.category && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-1fi-blue font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                      {filters.category}
                      <button onClick={() => setFilters(prev => ({ ...prev, category: '' }))} className="hover:text-blue-800">
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.brand && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-1fi-blue font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                      Brand: {filters.brand}
                      <button onClick={() => setFilters(prev => ({ ...prev, brand: '' }))} className="hover:text-blue-800">
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  {filters.search && (
                    <span className="inline-flex items-center gap-1 text-xs bg-blue-50 text-1fi-blue font-semibold px-2.5 py-1 rounded-full border border-blue-100">
                      "{filters.search}"
                      <button onClick={() => setFilters(prev => ({ ...prev, search: '' }))} className="hover:text-blue-800">
                        <X size={12} />
                      </button>
                    </span>
                  )}
                  <button 
                    onClick={() => setFilters({ category: '', brand: '', search: '', sort: filters.sort })}
                    className="text-xs text-red-600 font-semibold hover:underline ml-2"
                  >
                    Reset all
                  </button>
                </div>
              )}

              {/* Product Grid: 4 Desktop, 3 Tablet, 2 Mobile */}
              {isLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="card bg-white h-full animate-pulse flex flex-col">
                      <div className="aspect-square w-full bg-gray-200" />
                      <div className="p-4 sm:p-5 flex flex-col flex-1">
                        <div className="h-3 bg-gray-200 rounded w-1/3 mb-4" />
                        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                        <div className="mt-auto">
                          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                          <div className="h-10 bg-gray-200 rounded w-full" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-24 text-center bg-white rounded-2xl border border-gray-100 shadow-sm">
                  <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-bold text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto text-sm">We couldn't find any products matching your current filters. Try changing or clearing them.</p>
                  <button 
                    onClick={() => setFilters({ category: '', brand: '', search: '', sort: 'popular' })}
                    className="btn-secondary"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
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
