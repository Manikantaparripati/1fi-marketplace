import fs from 'fs';
import { products, CATEGORIES, BRANDS } from '../src/data/products.js';

// Custom search queries tailored to each product for high relevance
const PRODUCT_QUERIES = {
  // Apple
  'apple-1': ['iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone titanium'],
  'apple-2': ['iPhone 15 Pro', 'iPhone 14 Pro space black', 'iPhone titanium'],
  'apple-3': ['iPhone 15', 'iPhone 14 blue', 'iPhone pastel colors'],
  'apple-4': ['MacBook Air M2', 'MacBook Air midnight', 'MacBook Air on desk'],
  'apple-5': ['MacBook Air 15', 'MacBook Air starlight', 'MacBook silver open'],
  'apple-6': ['MacBook Pro 14', 'MacBook Pro space black', 'MacBook Pro keyboard'],
  'apple-7': ['iPad Pro M4', 'iPad Pro with pencil', 'iPad Pro magic keyboard'],
  'apple-8': ['Apple Watch Ultra', 'Apple Watch Ultra titanium orange band'],
  'apple-9': ['AirPods Pro 2', 'AirPods Pro white case wireless'],
  'apple-10': ['Apple Watch Series 9', 'Apple Watch midnight sport band'],

  // Samsung
  'samsung-1': ['Samsung Galaxy S24 Ultra', 'Samsung Galaxy S23 Ultra', 'Samsung phone titanium'],
  'samsung-2': ['Samsung Galaxy S24', 'Samsung Galaxy S23 plus', 'Samsung Galaxy phone violet'],
  'samsung-3': ['Samsung Galaxy Z Fold', 'Samsung foldable smartphone', 'Galaxy Fold open'],
  'samsung-4': ['Samsung Galaxy Book laptop', 'thin silver 2-in-1 laptop', 'convertible laptop touchscreen'],
  'samsung-5': ['Samsung Galaxy Tab S9', 'Samsung Android tablet stylus', 'Galaxy Tab AMOLED'],
  'samsung-6': ['Samsung Neo QLED 8K TV', 'Samsung smart TV living room', '8K television minimalist'],
  'samsung-7': ['Samsung Galaxy Watch 6 Classic', 'Galaxy Watch rotating bezel', 'smartwatch leather band'],
  'samsung-8': ['Samsung Galaxy Buds2 Pro', 'purple wireless earbuds case', 'Samsung Galaxy buds graphite'],
  'samsung-9': ['Samsung Galaxy Z Flip', 'Samsung flip phone folded', 'Galaxy Z Flip mint'],
  'samsung-10': ['Samsung Family Hub refrigerator', 'smart refrigerator kitchen touchscreen', 'French door stainless fridge'],

  // Sony
  'sony-1': ['Sony WH-1000XM5 headphones', 'Sony black noise cancelling headphones', 'premium wireless headphones over ear'],
  'sony-2': ['Sony WF-1000XM5 earbuds', 'Sony black wireless earbuds case', 'high end in ear earphones'],
  'sony-3': ['Sony Bravia OLED TV', 'Sony 4K OLED television', 'modern OLED TV living room ambient'],
  'sony-4': ['Sony Xperia 1 flagship smartphone', 'Sony Xperia black phone', 'minimalist camera smartphone'],
  'sony-5': ['Sony LinkBuds S earbuds', 'compact earth blue wireless earbuds', 'white noise cancelling earbuds'],
  'sony-6': ['Sony Alpha 7 IV camera', 'Sony mirrorless full frame camera', 'Sony A7 camera with lens'],
  'sony-7': ['Sony WH-CH720N headphones', 'lightweight blue over ear headphones', 'white wireless over ear headphones'],
  'sony-8': ['Sony SRS-XB100 bluetooth speaker', 'portable waterproof wireless speaker strap', 'compact cylindrical speaker'],
  'sony-9': ['Sony Xperia 5 compact phone', 'modern slim android phone black', 'Sony Xperia green phone'],
  'sony-10': ['Sony Inzone H9 gaming headset', 'white gaming headphones with mic', 'Playstation wireless headset'],

  // Dell
  'dell-1': ['Dell XPS 15 laptop', 'Dell XPS laptop aluminum infinity edge', 'Dell laptop silver'],
  'dell-2': ['Dell XPS 13 Plus laptop', 'Dell XPS white ultrabook', 'minimalist ultrabook zero lattice'],
  'dell-3': ['Dell XPS 14 laptop 2024', 'Dell XPS sleek notebook', 'premium aluminum laptop on wood table'],
  'dell-4': ['Dell Inspiron 16 laptop', 'Dell dark metallic notebook', '16 inch productivity laptop'],
  'dell-5': ['Dell Inspiron 15 laptop', 'Dell budget everyday laptop', 'clean office student laptop'],
  'dell-6': ['Dell Latitude business laptop', 'Dell corporate enterprise laptop', 'rugged office laptop computer'],
  'dell-7': ['Alienware gaming laptop', 'Alienware m18 RGB backlit laptop', 'high performance gaming laptop heavy'],
  'dell-8': ['Dell Precision workstation laptop', 'ISV certified mobile workstation', 'pro designer CAD laptop'],
  'dell-9': ['Dell Vostro 15 business laptop', 'dark grey commercial laptop', 'small business laptop computer'],
  'dell-10': ['Dell UltraSharp 4K monitor', 'Dell IPS Black computer monitor', 'ergonomic desktop screen setup'],

  // LG
  'lg-1': ['LG Gram 14 white laptop', 'ultra lightweight white laptop', 'LG Gram ultra thin magnesium'],
  'lg-2': ['LG Gram 16 dark grey laptop', 'LG Gram lightweight 16 inch', 'ultra slim notebook computer'],
  'lg-3': ['LG Gram Pro OLED laptop', 'thin OLED display laptop', 'LG Gram laptop open on desk'],
  'lg-4': ['LG C3 OLED evo TV', 'LG OLED TV dark room gaming', 'thin bezel 4k OLED television'],
  'lg-5': ['LG G3 OLED Gallery TV', 'flush wall mount OLED TV', 'art gallery television on wall'],
  'lg-6': ['LG UltraGear gaming monitor', 'gaming monitor curved RGB red stand', 'high refresh rate esports display'],
  'lg-7': ['LG InstaView Door-in-Door refrigerator', 'black stainless steel refrigerator', 'double door modern kitchen fridge'],
  'lg-8': ['LG Tone Free wireless earbuds', 'white round case earbuds', 'UVnano sanitized earbuds'],
  'lg-9': ['LG WashTower stacked laundry', 'black washer dryer combination', 'modern laundry room front load washer'],
  'lg-10': ['LG PuriCare 360 air purifier', 'round cylindrical air purifier tower', 'modern home air cleaner filter'],

  // Google
  'google-1': ['Google Pixel 8 Pro', 'Pixel 8 Pro bay blue camera bar', 'Google Pixel phone obsidian'],
  'google-2': ['Google Pixel 8 hazel', 'Google Pixel 8 compact rose', 'Pixel phone on wooden table'],
  'google-3': ['Google Pixel 8a aloe green', 'Google Pixel 8a porcelain phone', 'Google Pixel 7a blue'],
  'google-4': ['Google Pixel Fold porcelain', 'Google foldable phone book open', 'Pixel fold inner display'],
  'google-5': ['Google Pixel Watch 2', 'Pixel Watch dome glass black', 'smartwatch curved circular display'],
  'google-6': ['Google Pixel Buds Pro coral', 'Google Pixel Buds wireless case', 'Pixel buds lemongrass in ear'],
  'google-7': ['Google Pixel Tablet with speaker dock', 'Google tablet hazel dock', 'smart display Android tablet'],
  'google-8': ['Google Nest Hub Max display', 'Google smart display chalk', 'smart home assistant screen kitchen'],
  'google-9': ['Google Nest WiFi Pro mesh router', 'glossy white modern mesh router', 'smart home wifi node rounded'],
  'google-10': ['Google Chromecast with Google TV', 'white streaming dongle with remote', 'Chromecast 4K TV remote'],

  // Dyson
  'dyson-1': ['Dyson V15 cordless vacuum laser', 'Dyson stick vacuum hardwood floor', 'cordless vacuum yellow pipe'],
  'dyson-2': ['Dyson V12 Detect Slim vacuum', 'compact stick vacuum cleaner yellow', 'Dyson vacuum cleaning rug'],
  'dyson-3': ['Dyson Airwrap multi styler copper', 'Dyson hair styling kit barrels', 'Dyson Airwrap blue copper case'],
  'dyson-4': ['Dyson Supersonic hair dryer fuchsia', 'Dyson hair dryer iron nickel', 'modern round ionic hair dryer'],
  'dyson-5': ['Dyson Hot Cool purifier tower HP09', 'Dyson heater purifier fan white', 'tower air purifier bladeless fan'],
  'dyson-6': ['Dyson Gen5detect cordless vacuum', 'high suction stick vacuum purple iron', 'Dyson cordless vacuum LCD screen'],
  'dyson-7': ['Dyson Outsize vacuum large bin', 'cordless vacuum cleaner standing on floor', 'modern cordless upright vacuum cleaner'],
  'dyson-8': ['Dyson V11 Torque Drive blue vacuum', 'Dyson stick vacuum blue wand', 'cordless vacuum empty dustbin'],
  'dyson-9': ['Dyson Purifier Cool TP09 tower', 'bladeless fan air purifier white silver', 'tall sleek air purifier fan'],
  'dyson-10': ['Dyson Micro lightweight vacuum gold', 'ultra light handheld vacuum cordless', 'mini cordless stick vacuum cleaner'],

  // OnePlus
  'oneplus-1': ['OnePlus 12 flowy emerald green', 'OnePlus 12 circular camera flagship', 'OnePlus green smartphone'],
  'oneplus-2': ['OnePlus 12R cool blue metallic', 'OnePlus 12R iron gray phone', 'OnePlus smartphone curved screen'],
  'oneplus-3': ['OnePlus Open foldable voyager black', 'OnePlus Open emerald dusk fold', 'thin foldable smartphone open'],
  'oneplus-4': ['OnePlus Nord CE 3 Lite pastel lime', 'bright green Android smartphone', 'OnePlus Nord phone yellow lime'],
  'oneplus-5': ['OnePlus Nord 3 misty green', 'OnePlus Nord smartphone flat edge', 'modern Android phone green glass back'],
  'oneplus-6': ['OnePlus 11 eternal green', 'OnePlus 11 titan black circular camera', 'OnePlus 10 pro black'],
  'oneplus-7': ['OnePlus Pad halo green tablet', 'green Android tablet 7:5 ratio', 'slim tablet metal unibody with stylus'],
  'oneplus-8': ['OnePlus Watch 2 radiant steel', 'stainless steel smartwatch dark green strap', 'round smartwatch dual crown'],
  'oneplus-9': ['OnePlus Buds 3 splendid blue', 'metallic blue stem earbuds case', 'wireless earbuds blue finish'],
  'oneplus-10': ['OnePlus 10 Pro emerald forest phone', 'OnePlus 10 Pro volcanic black', 'OnePlus flagship ceramic camera'],

  // HP
  'hp-1': ['HP Spectre x360 14 black gold laptop', 'HP Spectre gem cut convertible laptop', 'premium 2-in-1 touchscreen laptop'],
  'hp-2': ['HP Spectre x360 16 inch laptop', 'large 2-in-1 laptop tent mode', 'HP Spectre OLED laptop open'],
  'hp-3': ['HP Envy 16 aluminum creator laptop', 'HP Envy laptop silver workspace', 'content creation laptop wide screen'],
  'hp-4': ['HP Pavilion Plus 14 OLED laptop', 'HP Pavilion compact silver notebook', 'modern student laptop thin bezel'],
  'hp-5': ['HP Pavilion 15 silver laptop keyboard', 'HP laptop on wooden desk coffee', 'classic home student laptop silver'],
  'hp-6': ['HP EliteBook 840 business ultrabook', 'silver enterprise corporate laptop', 'HP business notebook conference table'],
  'hp-7': ['HP Omen 16 gaming laptop shadow black', 'Omen gaming laptop keyboard RGB', 'stealth black gaming laptop open'],
  'hp-8': ['HP Victus 15 gaming laptop blue', 'HP Victus laptop mica silver', 'budget gaming laptop blue finish'],
  'hp-9': ['HP ZBook Studio mobile workstation', 'high end graphics design workstation laptop', 'professional creative laptop workstation'],
  'hp-10': ['HP DeskJet all in one printer white', 'modern compact home inkjet printer', 'wireless document photo printer on desk'],

  // Lenovo
  'lenovo-1': ['Lenovo ThinkPad X1 Carbon carbon fiber', 'ThinkPad red trackpoint classic laptop', 'ThinkPad black business laptop open'],
  'lenovo-2': ['Lenovo ThinkPad E14 black laptop', 'ThinkPad commercial notebook matte black', 'durable office ThinkPad laptop'],
  'lenovo-3': ['Lenovo IdeaPad Slim 5i arctic grey', 'Lenovo IdeaPad thin silver laptop', 'minimalist everyday laptop grey'],
  'lenovo-4': ['Lenovo IdeaPad Gaming laptop black blue', 'entry level gaming laptop rear vents', 'gaming notebook on dark desk'],
  'lenovo-5': ['Lenovo Yoga 9i 2-in-1 oatmeal jewel edges', 'convertible laptop rotated tent mode stylus', 'premium 2-in-1 touchscreen notebook'],
  'lenovo-6': ['Lenovo Yoga Slim 7x Copilot PC blue', 'ultra thin blue AI laptop', 'Lenovo slim laptop next to coffee cup'],
  'lenovo-7': ['Lenovo Legion Pro 5i gaming laptop', 'Lenovo Legion RGB gaming rig', 'powerful gaming laptop blue backlit keys'],
  'lenovo-8': ['Lenovo Legion Go handheld console', 'Windows gaming handheld detachable controllers', 'portable handheld PC gaming device'],
  'lenovo-9': ['Lenovo Tab P12 Pro tablet stylus keyboard', 'metal Android tablet dual cameras stylus', '12 inch productivity tablet'],
  'lenovo-10': ['Lenovo Smart Clock bedside display fabric', 'compact smart alarm clock nightstand', 'smart speaker with clock screen']
};

// Search Unsplash for an array of terms, return first unique verified image
async function findUniqueImage(productId, queries, usedUrls) {
  for (const query of queries) {
    try {
      const endpoint = `https://unsplash.com/napi/search/photos?query=${encodeURIComponent(query)}&per_page=12`;
      const res = await fetch(endpoint, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) continue;

      const data = await res.json();
      if (!data.results || data.results.length === 0) continue;

      for (const result of data.results) {
        const rawUrl = result.urls?.raw;
        if (!rawUrl) continue;
        
        // Normalize Unsplash URL for performance and responsive sizing
        const cleanBase = rawUrl.split('?')[0];
        const formattedUrl = `${cleanBase}?q=80&w=800&auto=format&fit=crop`;

        if (usedUrls.has(formattedUrl)) continue;

        // Verify URL accessibility
        try {
          const check = await fetch(formattedUrl, { method: 'HEAD' });
          if (check.ok) {
            usedUrls.add(formattedUrl);
            return formattedUrl;
          }
        } catch (e) {
          // If HEAD fails, continue checking next
        }
      }
    } catch (err) {
      console.warn(`Query "${query}" failed:`, err.message);
    }
  }

  return null;
}

async function run() {
  console.log('Starting unique image assignment for 100 products...');
  const usedUrls = new Set();
  const updatedProducts = [];
  const missing = [];

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const queries = PRODUCT_QUERIES[p.id] || [`${p.brand} ${p.name}`, `${p.brand} ${p.category}`, p.category];
    
    console.log(`[${i + 1}/${products.length}] Fetching image for ${p.id} (${p.brand} - ${p.name})...`);
    const uniqueUrl = await findUniqueImage(p.id, queries, usedUrls);

    if (uniqueUrl) {
      p.image = uniqueUrl;
      p.images = [uniqueUrl];
      updatedProducts.push(p);
      console.log(`  ✓ Found unique image: ${uniqueUrl.slice(0, 70)}...`);
    } else {
      console.error(`  ✗ Failed to find unique image for ${p.id}`);
      missing.push(p.id);
      updatedProducts.push(p);
    }

    // Gentle delay to avoid rate-limiting
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n======================================');
  console.log(`Finished. Products: ${updatedProducts.length}`);
  console.log(`Unique URLs: ${usedUrls.size}`);
  console.log(`Missing/Failed: ${missing.length}`);
  console.log('======================================\n');

  if (usedUrls.size === products.length && missing.length === 0) {
    const code = `// =============================================================
// 1Fi Marketplace — Mock Product Catalog (100+ Unique Products)
// Verified: 100 Products, 100 Unique Images, 0 Duplicates, 0 Broken
// Brands: Apple, Samsung, Sony, Dell, LG, Google, Dyson, OnePlus, HP, Lenovo
// =============================================================

export const products = ${JSON.stringify(updatedProducts, null, 2)};

export const CATEGORIES = [...new Set(products.map(p => p.category))].sort();
export const BRANDS = [...new Set(products.map(p => p.brand))].sort();
`;
    fs.writeFileSync('./src/data/products.js', code, 'utf8');
    console.log('✅ Successfully wrote 100 products with 100 unique verified images to src/data/products.js!');
  } else {
    console.error('❌ Could not achieve 100% unique images. Will not overwrite until fixed.');
  }
}

run();
