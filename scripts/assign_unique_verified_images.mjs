import fs from 'fs';
import { execSync } from 'child_process';
import { products, CATEGORIES, BRANDS } from '../src/data/products.js';

// Specific query tags to harvest from Unsplash
const HARVEST_QUERIES = [
  'macbook',
  'laptop',
  'dell-laptop',
  'hp-laptop',
  'thinkpad',
  'gaming-laptop',
  'ultrabook',
  'iphone',
  'samsung-galaxy',
  'pixel-phone',
  'smartphone',
  'headphones',
  'wireless-earbuds',
  'sony-headphones',
  'apple-watch',
  'smartwatch',
  'smart-watch',
  'television',
  'oled-tv',
  'smart-tv',
  'ipad',
  'tablet',
  'vacuum-cleaner',
  'cordless-vacuum',
  'hair-dryer',
  'air-purifier',
  'refrigerator',
  'washing-machine',
  'computer-monitor',
  'dslr-camera',
  'printer',
  'smart-display'
];

function harvestPools() {
  console.log('Harvesting photo IDs from Unsplash search pages...');
  const pools = {};
  for (const q of HARVEST_QUERIES) {
    try {
      const cmd = `curl -s -L "https://unsplash.com/s/photos/${q}" | grep -oE "photo-[0-9a-zA-Z-]+" | sort -u`;
      const out = execSync(cmd).toString();
      const ids = out.split('\n').map(s => s.trim()).filter(s => s.startsWith('photo-') && s.length > 15);
      pools[q] = ids;
      console.log(`  - [${q}]: ${ids.length} photo IDs found`);
    } catch (e) {
      console.error(`  - Failed query ${q}:`, e.message);
      pools[q] = [];
    }
  }
  return pools;
}

// Map each product ID to a priority list of pools
function getPoolsForProduct(p) {
  const id = p.id;
  if (id.startsWith('apple-')) {
    if (id === 'apple-4' || id === 'apple-5') return ['macbook', 'laptop'];
    if (id === 'apple-6') return ['macbook', 'laptop'];
    if (id === 'apple-1' || id === 'apple-2' || id === 'apple-3') return ['iphone', 'smartphone'];
    if (id === 'apple-7') return ['ipad', 'tablet'];
    if (id === 'apple-8' || id === 'apple-10') return ['apple-watch', 'smartwatch'];
    if (id === 'apple-9') return ['wireless-earbuds', 'headphones'];
  }

  if (id.startsWith('samsung-')) {
    if (id === 'samsung-1' || id === 'samsung-2' || id === 'samsung-3' || id === 'samsung-9') return ['samsung-galaxy', 'smartphone'];
    if (id === 'samsung-4') return ['ultrabook', 'laptop'];
    if (id === 'samsung-5') return ['tablet', 'ipad'];
    if (id === 'samsung-6') return ['oled-tv', 'smart-tv', 'television'];
    if (id === 'samsung-7') return ['smartwatch', 'smart-watch'];
    if (id === 'samsung-8') return ['wireless-earbuds', 'headphones'];
    if (id === 'samsung-10') return ['refrigerator'];
  }

  if (id.startsWith('sony-')) {
    if (id === 'sony-1' || id === 'sony-7' || id === 'sony-10') return ['sony-headphones', 'headphones'];
    if (id === 'sony-2' || id === 'sony-5') return ['wireless-earbuds', 'headphones'];
    if (id === 'sony-3') return ['oled-tv', 'television', 'smart-tv'];
    if (id === 'sony-4' || id === 'sony-9') return ['smartphone'];
    if (id === 'sony-6') return ['dslr-camera'];
    if (id === 'sony-8') return ['wireless-earbuds', 'headphones'];
  }

  if (id.startsWith('dell-')) {
    if (id === 'dell-7') return ['gaming-laptop', 'laptop'];
    if (id === 'dell-10') return ['computer-monitor'];
    return ['dell-laptop', 'laptop', 'ultrabook'];
  }

  if (id.startsWith('lg-')) {
    if (id === 'lg-1' || id === 'lg-2' || id === 'lg-3') return ['ultrabook', 'laptop'];
    if (id === 'lg-4' || id === 'lg-5') return ['oled-tv', 'television'];
    if (id === 'lg-6') return ['computer-monitor'];
    if (id === 'lg-7') return ['refrigerator'];
    if (id === 'lg-8') return ['wireless-earbuds', 'headphones'];
    if (id === 'lg-9') return ['washing-machine'];
    if (id === 'lg-10') return ['air-purifier'];
  }

  if (id.startsWith('google-')) {
    if (id === 'google-1' || id === 'google-2' || id === 'google-3' || id === 'google-4') return ['pixel-phone', 'smartphone'];
    if (id === 'google-5') return ['smartwatch', 'smart-watch'];
    if (id === 'google-6') return ['wireless-earbuds', 'headphones'];
    if (id === 'google-7') return ['tablet', 'ipad'];
    if (id === 'google-8') return ['smart-display', 'tablet'];
    if (id === 'google-9' || id === 'google-10') return ['wireless-earbuds', 'smart-display'];
  }

  if (id.startsWith('dyson-')) {
    if (id === 'dyson-1' || id === 'dyson-2' || id === 'dyson-6' || id === 'dyson-7' || id === 'dyson-8' || id === 'dyson-10') return ['cordless-vacuum', 'vacuum-cleaner'];
    if (id === 'dyson-3' || id === 'dyson-4') return ['hair-dryer'];
    if (id === 'dyson-5' || id === 'dyson-9') return ['air-purifier'];
  }

  if (id.startsWith('oneplus-')) {
    if (id === 'oneplus-7') return ['tablet', 'ipad'];
    if (id === 'oneplus-8') return ['smartwatch', 'smart-watch'];
    if (id === 'oneplus-9') return ['wireless-earbuds', 'headphones'];
    return ['smartphone', 'samsung-galaxy'];
  }

  if (id.startsWith('hp-')) {
    if (id === 'hp-7' || id === 'hp-8') return ['gaming-laptop', 'laptop'];
    if (id === 'hp-10') return ['printer'];
    return ['hp-laptop', 'laptop', 'ultrabook'];
  }

  if (id.startsWith('lenovo-')) {
    if (id === 'lenovo-1' || id === 'lenovo-2') return ['thinkpad', 'laptop'];
    if (id === 'lenovo-4' || id === 'lenovo-7') return ['gaming-laptop', 'laptop'];
    if (id === 'lenovo-8') return ['gaming-laptop', 'smart-display'];
    if (id === 'lenovo-9') return ['tablet', 'ipad'];
    if (id === 'lenovo-10') return ['smart-display', 'smartwatch'];
    return ['thinkpad', 'laptop', 'ultrabook'];
  }

  return ['laptop', 'smartphone'];
}

async function verifyUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.ok;
  } catch (e) {
    return false;
  }
}

async function main() {
  const pools = harvestPools();
  const usedIds = new Set();
  const updatedProducts = [];

  console.log('\nAssigning unique, verified images to all 100 products...');

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const candidatePoolNames = getPoolsForProduct(p);
    
    let assignedUrl = null;

    for (const poolName of candidatePoolNames) {
      const candidates = pools[poolName] || [];
      for (const photoId of candidates) {
        if (usedIds.has(photoId)) continue;

        const candidateUrl = `https://images.unsplash.com/${photoId}?q=80&w=800&auto=format&fit=crop`;
        const isValid = await verifyUrl(candidateUrl);
        if (isValid) {
          usedIds.add(photoId);
          assignedUrl = candidateUrl;
          break;
        }
      }
      if (assignedUrl) break;
    }

    // If still null, try any unused verified ID from general category pool
    if (!assignedUrl) {
      for (const [poolName, candidates] of Object.entries(pools)) {
        for (const photoId of candidates) {
          if (usedIds.has(photoId)) continue;
          const candidateUrl = `https://images.unsplash.com/${photoId}?q=80&w=800&auto=format&fit=crop`;
          const isValid = await verifyUrl(candidateUrl);
          if (isValid) {
            usedIds.add(photoId);
            assignedUrl = candidateUrl;
            break;
          }
        }
        if (assignedUrl) break;
      }
    }

    if (!assignedUrl) {
      console.error(`FATAL: Could not find unique image for ${p.id} (${p.name})`);
    } else {
      p.image = assignedUrl;
      p.images = [assignedUrl];
      updatedProducts.push(p);
      console.log(`[${i + 1}/100] ${p.id} (${p.brand} - ${p.name}) => ${assignedUrl.slice(0, 60)}...`);
    }
  }

  console.log('\n=== AUDIT RESULTS ===');
  console.log('Total Products:', updatedProducts.length);
  console.log('Unique Image URLs:', new Set(updatedProducts.map(p => p.image)).size);
  console.log('Duplicates:', updatedProducts.length - new Set(updatedProducts.map(p => p.image)).size);

  if (updatedProducts.length === 100 && new Set(updatedProducts.map(p => p.image)).size === 100) {
    const fileContent = `// =============================================================
// 1Fi Marketplace — Mock Product Catalog (100+ Unique Products)
// Verified: 100 Products, 100 Unique Images, 0 Duplicates, 0 Broken
// Brands: Apple, Samsung, Sony, Dell, LG, Google, Dyson, OnePlus, HP, Lenovo
// =============================================================

export const products = ${JSON.stringify(updatedProducts, null, 2)};

export const CATEGORIES = [...new Set(products.map(p => p.category))].sort();
export const BRANDS = [...new Set(products.map(p => p.brand))].sort();
`;
    fs.writeFileSync('./src/data/products.js', fileContent, 'utf8');
    console.log('\n✅ Successfully saved 100 unique verified images to src/data/products.js');
  } else {
    console.error('\n❌ Validation failed. Check pool sizes.');
  }
}

main();
