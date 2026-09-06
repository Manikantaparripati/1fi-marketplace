import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShieldCheck, Truck, Shield } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Header from '../components/layout/Header';
import EmiCalculator from '../components/emi/EmiCalculator';
import { formatCurrency } from '../utils/emi';
import { clsx } from 'clsx';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === id);
  
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedTenure, setSelectedTenure] = useState(12);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-6">
            <span className="text-3xl text-gray-400 font-bold">?</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you are looking for doesn't exist or has been removed.</p>
          <Link to="/" className="btn-primary px-8">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, selectedVariant, selectedTenure);
  };

  const handleApplyEmi = () => {
    alert(`Prototype Action: Initiating 1Fi EMI application for ${product.name} at ${formatCurrency(selectedVariant.price)} over ${selectedTenure} months.`);
  };

  const discount = Math.round(((product.originalPrice - selectedVariant.price) / product.originalPrice) * 100);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-24 md:pb-10">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6 sm:py-8">
        <button 
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-1fi-blue mb-6 transition-colors bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm"
        >
          <ArrowLeft size={16} className="mr-1.5" /> Back to Marketplace
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Product Image Gallery */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-gray-50/50 flex items-center justify-center relative border-b lg:border-b-0 lg:border-r border-gray-100">
              {discount > 0 && (
                <div className="absolute top-6 left-6 bg-red-500 text-white font-bold px-3 py-1.5 rounded-lg z-10 text-sm shadow-sm">
                  {discount}% OFF
                </div>
              )}
              <div className="aspect-square w-full max-w-[500px] relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col">
              <div className="mb-6">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-bold text-1fi-blue tracking-widest uppercase bg-blue-50 px-2 py-1 rounded">{product.brand}</span>
                  <div className="flex items-center text-sm font-semibold text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                    <Star size={14} className="text-yellow-500 fill-current mr-1.5" />
                    {product.rating} <span className="text-gray-400 font-normal ml-1">({product.reviews})</span>
                  </div>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
                
                <div className="flex items-end gap-3 mb-6">
                  <span className="text-3xl font-bold text-gray-900">{formatCurrency(selectedVariant.price)}</span>
                  {discount > 0 && (
                    <span className="text-lg text-gray-400 line-through mb-1 font-medium">{formatCurrency(product.originalPrice)}</span>
                  )}
                </div>
              </div>

              {/* Variants */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">Storage Variant</h3>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={clsx(
                        'px-5 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                        selectedVariant.id === variant.id
                          ? 'border-1fi-blue bg-blue-50 text-1fi-blue ring-1 ring-1fi-blue shadow-sm'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                      )}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wider">
                    Color: <span className="text-gray-500 ml-1 normal-case">{selectedColor}</span>
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={clsx(
                          'w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center p-0.5',
                          selectedColor === color ? 'border-1fi-blue' : 'border-transparent hover:scale-110'
                        )}
                        title={color}
                      >
                        <span 
                          className="block w-full h-full rounded-full shadow-inner border border-black/5"
                          style={{
                            backgroundColor: color.toLowerCase().includes('black') || color.toLowerCase().includes('midnight') ? '#222' : 
                                            color.toLowerCase().includes('silver') || color.toLowerCase().includes('starlight') ? '#f0f0f0' :
                                            color.toLowerCase().includes('blue') ? '#2a4d69' :
                                            color.toLowerCase().includes('gray') || color.toLowerCase().includes('titanium') ? '#7a7a7a' : 
                                            color.toLowerCase().includes('red') ? '#d93025' : 
                                            color.toLowerCase().includes('green') || color.toLowerCase().includes('emerald') ? '#2e6b4e' : '#e5e5e5'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* EMI Calculator Component */}
              <EmiCalculator 
                price={selectedVariant.price} 
                selectedTenure={selectedTenure}
                setSelectedTenure={setSelectedTenure}
              />

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8 mt-auto fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:static md:p-0 md:border-0 md:bg-transparent z-40">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary py-4 text-base font-bold shadow-lg shadow-blue-500/20 hover:-translate-y-0.5 hover:shadow-blue-500/40 transition-all"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={handleApplyEmi}
                  className="flex-1 bg-gray-900 text-white rounded-lg font-bold hover:bg-gray-800 transition-all py-4 text-base hover:-translate-y-0.5 shadow-lg shadow-gray-900/20"
                >
                  Apply for EMI
                </button>
              </div>

              <div className="space-y-5 pt-8 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-50 rounded-lg shrink-0">
                    <ShieldCheck className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">1 Year Warranty</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Official brand warranty included</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg shrink-0">
                    <Truck className="text-1fi-blue" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Fast Delivery</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Free delivery within 2-4 business days</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg shrink-0">
                    <Shield className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">Secure 1Fi Checkout</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Your data is safe and encrypted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Specs section */}
          <div className="border-t border-gray-100 p-6 lg:p-10 bg-white">
            <div className="max-w-3xl">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Product Details</h2>
              <p className="text-gray-600 mb-10 leading-relaxed text-sm sm:text-base">{product.description}</p>
              
              <h3 className="text-lg font-bold text-gray-900 mb-5">Key Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {product.specs.map((spec, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-xl flex items-center border border-gray-100">
                    <div className="w-2 h-2 bg-1fi-blue rounded-full mr-3 shadow-sm"></div>
                    <span className="text-gray-700 font-medium text-sm">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
