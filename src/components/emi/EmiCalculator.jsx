import React from 'react';
import { clsx } from 'clsx';
import { formatCurrency, calculateEMI } from '../../utils/emi';
import { Calculator } from 'lucide-react';

export default function EmiCalculator({ price, selectedTenure, setSelectedTenure }) {
  const tenures = [3, 6, 9, 12, 18, 24];
  const monthlyEmi = calculateEMI(price, selectedTenure);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 mb-8 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
          <Calculator size={18} className="text-1fi-blue" />
          EMI Options
        </h3>
        <span className="text-[10px] sm:text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full font-bold border border-green-100 uppercase tracking-wide">
          0% Interest
        </span>
      </div>
      
      <p className="text-xs text-gray-500 mb-5">Select your preferred EMI tenure below. (Prototype calculation)</p>
      
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 mb-6">
        {tenures.map(months => (
          <button
            key={months}
            onClick={() => setSelectedTenure(months)}
            className={clsx(
              'py-2.5 px-1 rounded-xl border text-sm font-bold transition-all',
              selectedTenure === months
                ? 'border-1fi-blue bg-blue-50/50 text-1fi-blue ring-1 ring-1fi-blue shadow-sm'
                : 'border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50'
            )}
          >
            {months}m
          </button>
        ))}
      </div>
      
      <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-5 grid grid-cols-2 gap-y-5 gap-x-4">
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">Monthly EMI</p>
          <p className="text-xl sm:text-2xl font-bold text-1fi-blue">{formatCurrency(monthlyEmi)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">Total Payable</p>
          <p className="text-lg sm:text-xl font-bold text-gray-900">{formatCurrency(price)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">Interest</p>
          <p className="text-sm font-semibold text-gray-900">{formatCurrency(0)}</p>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 mb-1">Processing Fee</p>
          <p className="text-sm font-semibold text-gray-900">{formatCurrency(0)}</p>
        </div>
      </div>
    </div>
  );
}
