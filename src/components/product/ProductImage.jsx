import React, { useState, useEffect } from 'react';

// Category-specific reliable CDN fallbacks
const CATEGORY_FALLBACKS = {
  Laptops: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
  Smartphones: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop',
  Headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
  Tablets: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
  Smartwatches: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop',
  TVs: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop',
  Appliances: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800&auto=format&fit=crop',
  Accessories: 'https://images.unsplash.com/photo-1527443195645-1133f7f28990?q=80&w=800&auto=format&fit=crop'
};

// Category-specific SVG vector icon paths
const getCategorySvgIcon = (category) => {
  switch (category) {
    case 'Laptops':
      return `
        <!-- Laptop Screen -->
        <rect x="110" y="110" width="180" height="120" rx="8" fill="#1E293B" stroke="#0052FF" stroke-width="3" />
        <rect x="120" y="120" width="160" height="100" rx="4" fill="#0052FF" fill-opacity="0.15" />
        <!-- Base / Keyboard -->
        <path d="M80 236 L320 236 L340 255 L60 255 Z" fill="#334155" stroke="#0052FF" stroke-width="3" stroke-linejoin="round" />
        <rect x="170" y="240" width="60" height="6" rx="3" fill="#64748B" />
      `;
    case 'Smartphones':
      return `
        <!-- Smartphone Body -->
        <rect x="140" y="90" width="120" height="220" rx="20" fill="#1E293B" stroke="#0052FF" stroke-width="4" />
        <rect x="150" y="106" width="100" height="188" rx="10" fill="#0052FF" fill-opacity="0.15" />
        <!-- Speaker / Camera Notch -->
        <circle cx="200" cy="100" r="4" fill="#64748B" />
        <rect x="185" y="284" width="30" height="4" rx="2" fill="#64748B" />
      `;
    case 'Headphones':
      return `
        <!-- Headband -->
        <path d="M120 210 C120 120, 280 120, 280 210" fill="none" stroke="#0052FF" stroke-width="8" stroke-linecap="round" />
        <!-- Left & Right Earcups -->
        <rect x="100" y="180" width="36" height="60" rx="18" fill="#1E293B" stroke="#0052FF" stroke-width="3" />
        <rect x="264" y="180" width="36" height="60" rx="18" fill="#1E293B" stroke="#0052FF" stroke-width="3" />
      `;
    case 'Smartwatches':
      return `
        <!-- Watch Straps -->
        <rect x="165" y="60" width="70" height="60" rx="8" fill="#334155" />
        <rect x="165" y="260" width="70" height="60" rx="8" fill="#334155" />
        <!-- Watch Case -->
        <rect x="140" y="110" width="120" height="150" rx="28" fill="#1E293B" stroke="#0052FF" stroke-width="4" />
        <circle cx="200" cy="185" r="45" fill="#0052FF" fill-opacity="0.15" stroke="#0052FF" stroke-width="2" />
      `;
    case 'TVs':
      return `
        <!-- TV Screen -->
        <rect x="80" y="100" width="240" height="150" rx="6" fill="#1E293B" stroke="#0052FF" stroke-width="4" />
        <rect x="90" y="110" width="220" height="130" fill="#0052FF" fill-opacity="0.15" />
        <!-- Stand -->
        <path d="M170 250 L160 275 L240 275 L230 250 Z" fill="#334155" stroke="#0052FF" stroke-width="2" />
      `;
    case 'Tablets':
      return `
        <!-- Tablet Frame -->
        <rect x="105" y="85" width="190" height="230" rx="14" fill="#1E293B" stroke="#0052FF" stroke-width="4" />
        <rect x="118" y="100" width="164" height="200" rx="6" fill="#0052FF" fill-opacity="0.15" />
        <circle cx="200" cy="92" r="3" fill="#64748B" />
      `;
    case 'Appliances':
      return `
        <!-- Appliance Silhouette -->
        <rect x="130" y="90" width="140" height="210" rx="12" fill="#1E293B" stroke="#0052FF" stroke-width="4" />
        <line x1="130" y1="180" x2="270" y2="180" stroke="#0052FF" stroke-width="2" />
        <rect x="145" y="120" width="10" height="35" rx="3" fill="#0052FF" />
        <rect x="145" y="210" width="10" height="35" rx="3" fill="#0052FF" />
      `;
    default:
      return `
        <circle cx="200" cy="180" r="55" fill="#0052FF" fill-opacity="0.15" stroke="#0052FF" stroke-width="3" />
        <path d="M175 180 L225 180 M200 155 L200 205" stroke="#0052FF" stroke-width="4" stroke-linecap="round" />
      `;
  }
};

// Generates sensible, category-specific vector SVG fallback placeholder
const createCategorySvgFallback = (category, brand, name) => {
  const brandLabel = brand || '1Fi';
  const nameLabel = (name || '').slice(0, 24);
  const iconGraphic = getCategorySvgIcon(category);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#F8FAFC" />
        <stop offset="100%" stop-color="#EFF6FF" />
      </linearGradient>
    </defs>
    <rect width="400" height="400" rx="16" fill="url(#bg)" />
    ${iconGraphic}
    <text x="200" y="325" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" fill="#0052FF">${brandLabel} • ${category || 'Tech'}</text>
    <text x="200" y="350" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="12" font-weight="500" fill="#64748B">${nameLabel}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function ProductImage({ src, alt, brand, category, className = '' }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [errorStage, setErrorStage] = useState(0);

  useEffect(() => {
    setImgSrc(src);
    setErrorStage(0);
  }, [src]);

  const handleError = () => {
    if (errorStage === 0) {
      // Level 1 fallback: Sensible category-matched CDN photography
      const categoryFallback = CATEGORY_FALLBACKS[category];
      if (categoryFallback && categoryFallback !== imgSrc) {
        setImgSrc(categoryFallback);
        setErrorStage(1);
      } else {
        // Level 2 fallback: Guaranteed self-contained sensible category SVG placeholder
        setImgSrc(createCategorySvgFallback(category, brand, alt));
        setErrorStage(2);
      }
    } else {
      // Level 2 fallback: Guaranteed self-contained sensible category SVG placeholder
      setImgSrc(createCategorySvgFallback(category, brand, alt));
      setErrorStage(2);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={className}
      loading="lazy"
    />
  );
}
