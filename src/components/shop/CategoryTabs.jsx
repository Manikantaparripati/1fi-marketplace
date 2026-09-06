import React from 'react';
import { clsx } from 'clsx';

export default function CategoryTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'top-brands', label: 'Top Brands' },
    { id: 'nearby-stores', label: 'Nearby Stores' },
    { id: '1fi-marketplace', label: '1Fi Marketplace' }
  ];

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-4 sm:space-x-8 overflow-x-auto no-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === tab.id
                  ? 'border-1fi-blue text-1fi-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
