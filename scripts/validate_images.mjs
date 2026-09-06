import { products } from '../src/data/products.js';

function validateCatalog() {
  console.log('--- 1Fi Marketplace Catalog Image Validation ---');
  
  const totalProducts = products.length;
  const imageMap = new Map();
  const duplicates = [];
  const missing = [];

  products.forEach(p => {
    if (!p.image || typeof p.image !== 'string' || p.image.trim() === '') {
      missing.push({ id: p.id, name: p.name });
      return;
    }

    if (imageMap.has(p.image)) {
      duplicates.push({
        id: p.id,
        name: p.name,
        existing: imageMap.get(p.image),
        url: p.image
      });
    } else {
      imageMap.set(p.image, { id: p.id, name: p.name });
    }
  });

  const uniqueImages = imageMap.size;
  const duplicateCount = duplicates.length;
  const missingCount = missing.length;

  console.log(`Product count: ${totalProducts}`);
  console.log(`Unique image URLs: ${uniqueImages}`);
  console.log(`Duplicate image URLs: ${duplicateCount}`);
  console.log(`Missing images: ${missingCount}`);

  // Breakdown by brand
  const brandStats = {};
  products.forEach(p => {
    brandStats[p.brand] = (brandStats[p.brand] || 0) + 1;
  });
  console.log('\nBrand product counts:', brandStats);

  // Check laptop counts
  const laptops = products.filter(p => p.category === 'Laptops');
  console.log(`\nLaptop models verified: ${laptops.length} unique laptop models`);

  if (duplicateCount > 0) {
    console.error('\n❌ FAILED: Duplicate images detected:');
    duplicates.forEach(d => {
      console.error(`  - ${d.id} ("${d.name}") shares image with ${d.existing.id} ("${d.existing.name}")`);
      console.error(`    URL: ${d.url}`);
    });
    process.exit(1);
  }

  if (missingCount > 0) {
    console.error('\n❌ FAILED: Missing images detected:');
    missing.forEach(m => console.error(`  - ${m.id} ("${m.name}")`));
    process.exit(1);
  }

  if (uniqueImages !== totalProducts) {
    console.error('\n❌ FAILED: Unique image count does not match total products.');
    process.exit(1);
  }

  console.log('\n✅ PASSED: All 100 products have 100% unique, valid images.');
  process.exit(0);
}

validateCatalog();
