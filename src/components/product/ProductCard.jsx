import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatCurrency, calculateEMI } from '../../utils/emi';
import ProductImage from './ProductImage';

export default function ProductCard({ product }) {
  const lowestPrice = product.price || (product.variants && product.variants.length > 0 ? Math.min(...product.variants.map(v => v.price)) : product.originalPrice);
  const discount = product.discount !== undefined ? product.discount : Math.round(((product.originalPrice - lowestPrice) / product.originalPrice) * 100);
  const emiAmount = calculateEMI(lowestPrice, 12); // Default 12 months

  return (
    <Link to={`/product/${product.id}`} className="card group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full bg-white relative">
      {discount > 0 && (
        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          {discount}% OFF
        </div>
      )}
      <div className="aspect-square w-full bg-gray-50 overflow-hidden relative p-6 flex items-center justify-center border-b border-gray-100">
        <ProductImage 
          src={product.image} 
          alt={product.name} 
          brand={product.brand}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">{product.brand}</span>
          <div className="flex items-center text-[10px] sm:text-xs font-semibold text-yellow-600 bg-yellow-50 px-1.5 py-0.5 rounded border border-yellow-100">
            <Star size={10} className="fill-current mr-0.5" />
            {product.rating}
          </div>
        </div>
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[40px] sm:min-h-[48px] group-hover:text-1fi-blue transition-colors leading-tight">
          {product.name}
        </h3>
        <div className="mt-auto">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base sm:text-lg font-bold text-gray-900">{formatCurrency(lowestPrice)}</span>
            {discount > 0 && (
              <span className="text-xs text-gray-400 line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
          <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-2 sm:p-2.5 mb-4">
            <p className="text-[10px] sm:text-xs text-1fi-blue flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="font-semibold text-sm">{formatCurrency(emiAmount)}/mo</span>
              <span className="text-blue-600/70 font-medium">12 mos • 0% EMI</span>
            </p>
          </div>
          <button className="w-full btn-secondary py-2 sm:py-2.5 text-xs sm:text-sm text-1fi-blue border-blue-200 hover:bg-blue-50 hover:border-1fi-blue transition-all font-semibold">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
}
