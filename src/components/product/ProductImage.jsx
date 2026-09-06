import React, { useState, useEffect } from 'react';

// Brand-specific high-resolution product photography from Unsplash CDN
const BRAND_FALLBACKS = {
  Apple: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
  Samsung: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop',
  Sony: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop',
  Dell: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
  LG: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop',
  Google: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=800&auto=format&fit=crop',
  Dyson: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800&auto=format&fit=crop',
  OnePlus: 'https://images.unsplash.com/photo-1592899677977-9c10002761ba?q=80&w=800&auto=format&fit=crop',
  HP: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=800&auto=format&fit=crop',
  Lenovo: 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?q=80&w=800&auto=format&fit=crop',
};

// 100% offline self-contained SVG fallback to guarantee no broken icon can EVER appear
const createSvgFallback = (brand, name) => {
  const brandLabel = brand || '1Fi Product';
  const nameLabel = (name || '').slice(0, 24);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f0f7ff" />
        <stop offset="100%" stop-color="#e2edff" />
      </linearGradient>
    </defs>
    <rect width="400" height="400" rx="16" fill="url(#g)" />
    <circle cx="200" cy="170" r="64" fill="#0052FF" fill-opacity="0.08" />
    <path d="M160 195 L200 135 L240 195 Z" fill="none" stroke="#0052FF" stroke-width="4" stroke-linejoin="round" />
    <rect x="175" y="165" width="50" height="40" rx="6" fill="#0052FF" fill-opacity="0.2" stroke="#0052FF" stroke-width="3" />
    <text x="200" y="270" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="700" fill="#0052FF">${brandLabel}</text>
    <text x="200" y="295" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="500" fill="#64748B">${nameLabel}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export default function ProductImage({ src, alt, brand, className = '' }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [errorStage, setErrorStage] = useState(0);

  useEffect(() => {
    setImgSrc(src);
    setErrorStage(0);
  }, [src]);

  const handleError = () => {
    if (errorStage === 0) {
      // Step 1: Try brand-curated reliable image
      const brandFallback = BRAND_FALLBACKS[brand];
      if (brandFallback && brandFallback !== imgSrc) {
        setImgSrc(brandFallback);
        setErrorStage(1);
      } else {
        // Step 2: Instant guaranteed local vector SVG
        setImgSrc(createSvgFallback(brand, alt));
        setErrorStage(2);
      }
    } else if (errorStage === 1) {
      // Step 2: If network fallback also fails, use self-contained SVG
      setImgSrc(createSvgFallback(brand, alt));
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
