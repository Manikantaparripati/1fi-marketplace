export const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'Smartphones',
    originalPrice: 134900,
    currentPrice: 127990,
    rating: 4.8,
    reviews: 1245,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '128GB', price: 127990 },
      { id: 'v2', name: '256GB', price: 137990 },
    ],
    colors: ['Natural Titanium', 'Blue Titanium', 'Black Titanium'],
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.',
    specs: ['A17 Pro chip', '6.1-inch Super Retina XDR display', '48MP Main camera', 'USB-C']
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Smartphones',
    originalPrice: 129999,
    currentPrice: 129999,
    rating: 4.9,
    reviews: 856,
    image: 'https://images.unsplash.com/photo-1707227156170-84dc248c82b9?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '256GB', price: 129999 },
      { id: 'v2', name: '512GB', price: 139999 },
    ],
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet'],
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.',
    specs: ['Snapdragon 8 Gen 3', '6.8-inch QHD+ display', '200MP Main camera', 'S-Pen included']
  },
  {
    id: '3',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    originalPrice: 114900,
    currentPrice: 104990,
    rating: 4.9,
    reviews: 2134,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '256GB SSD', price: 104990 },
      { id: 'v2', name: '512GB SSD', price: 124990 },
    ],
    colors: ['Midnight', 'Starlight', 'Space Gray', 'Silver'],
    description: 'M3 brings even more capabilities to the superportable 13-inch MacBook Air. With up to 18 hours of battery life.',
    specs: ['Apple M3 chip', '13.6-inch Liquid Retina display', '8GB Unified Memory', 'Up to 18 hrs battery']
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Accessories',
    originalPrice: 34990,
    currentPrice: 29990,
    rating: 4.7,
    reviews: 3421,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: 'Standard', price: 29990 }
    ],
    colors: ['Black', 'Silver', 'Midnight Blue'],
    description: 'The WH-1000XM5 headphones rewrite the rules for distraction-free listening. 2 processors control 8 microphones for unprecedented noise cancellation.',
    specs: ['Industry-leading ANC', '30 hours battery life', 'Multi-point connection', 'DSEE Extreme']
  },
  {
    id: '5',
    name: 'iPad Pro 11-inch (M4)',
    brand: 'Apple',
    category: 'Tablets',
    originalPrice: 99900,
    currentPrice: 94900,
    rating: 4.8,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '256GB', price: 94900 },
      { id: 'v2', name: '512GB', price: 114900 }
    ],
    colors: ['Silver', 'Space Black'],
    description: 'The ultimate iPad experience with the most advanced display, M4 performance, and superfast wireless connectivity.',
    specs: ['Apple M4 chip', '11-inch Ultra Retina XDR display', 'ProMotion technology', 'Face ID']
  },
  {
    id: '6',
    name: 'Dell XPS 14',
    brand: 'Dell',
    category: 'Laptops',
    originalPrice: 189990,
    currentPrice: 175990,
    rating: 4.6,
    reviews: 231,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '16GB/512GB', price: 175990 }
    ],
    colors: ['Platinum', 'Graphite'],
    description: 'Master every task with the new XPS 14, perfectly balancing power and mobility in a stunningly machined aluminum chassis.',
    specs: ['Intel Core Ultra 7', '14.5-inch OLED display', 'RTX 4050', 'Wi-Fi 7']
  },
  {
    id: '7',
    name: 'LG C3 55" OLED TV',
    brand: 'LG',
    category: 'TVs',
    originalPrice: 169990,
    currentPrice: 124990,
    rating: 4.9,
    reviews: 1102,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '55-inch', price: 124990 },
      { id: 'v2', name: '65-inch', price: 164990 }
    ],
    colors: ['Black'],
    description: 'The LG OLED evo C3 is powered by the a9 AI Processor Gen6—made exclusively for LG OLED—for beautiful picture and performance.',
    specs: ['OLED evo', '4K Resolution', '120Hz Refresh Rate', 'WebOS 23']
  },
  {
    id: '8',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    category: 'Smartphones',
    originalPrice: 106999,
    currentPrice: 98999,
    rating: 4.7,
    reviews: 645,
    image: 'https://images.unsplash.com/photo-1704294025076-79ba63db8e7f?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '128GB', price: 98999 },
      { id: 'v2', name: '256GB', price: 106999 }
    ],
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    description: 'The Pixel 8 Pro is the all-pro Google phone. It’s sleek, sophisticated, powerful, and secure, with Google AI for pro-level photos and videos.',
    specs: ['Google Tensor G3', '6.7-inch Super Actua display', '50MP main camera', '7 years OS updates']
  },
  {
    id: '9',
    name: 'Samsung Galaxy Tab S9',
    brand: 'Samsung',
    category: 'Tablets',
    originalPrice: 72999,
    currentPrice: 65999,
    rating: 4.7,
    reviews: 432,
    image: 'https://images.unsplash.com/photo-1544228821-678c48a735c0?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '128GB WiFi', price: 65999 }
    ],
    colors: ['Graphite', 'Beige'],
    description: 'Our most powerful tablet yet. The Galaxy Tab S9 features a stunning Dynamic AMOLED 2X display, IP68 water resistance, and the powerful Snapdragon 8 Gen 2.',
    specs: ['11-inch Dynamic AMOLED 2X', 'IP68 rating', 'S Pen included', '8000mAh battery']
  },
  {
    id: '10',
    name: 'Dyson V15 Detect',
    brand: 'Dyson',
    category: 'Appliances',
    originalPrice: 65900,
    currentPrice: 62900,
    rating: 4.8,
    reviews: 890,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: 'Standard', price: 62900 }
    ],
    colors: ['Yellow/Nickel'],
    description: 'The most powerful, intelligent cordless vacuum. A precisely-angled laser makes invisible dust visible on hard floors.',
    specs: ['240AW suction power', 'Up to 60 mins runtime', 'Piezo sensor', 'Laser dust detection']
  },
  {
    id: '11',
    name: 'Apple Watch Series 9',
    brand: 'Apple',
    category: 'Accessories',
    originalPrice: 41900,
    currentPrice: 39900,
    rating: 4.8,
    reviews: 1432,
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '41mm', price: 39900 },
      { id: 'v2', name: '45mm', price: 42900 }
    ],
    colors: ['Midnight', 'Starlight', 'Silver', 'Product Red'],
    description: 'The most powerful chip in Apple Watch ever. A magical new way to use your watch without touching the screen. A display that’s twice as bright.',
    specs: ['S9 SiP', 'Double tap gesture', 'Blood oxygen app', 'ECG app']
  },
  {
    id: '12',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    category: 'Smartphones',
    originalPrice: 69999,
    currentPrice: 64999,
    rating: 4.6,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=800&auto=format&fit=crop',
    variants: [
      { id: 'v1', name: '12GB/256GB', price: 64999 },
      { id: 'v2', name: '16GB/512GB', price: 69999 }
    ],
    colors: ['Flowy Emerald', 'Silky Black'],
    description: 'The OnePlus 12 brings together signature Hasselblad Camera for Mobile, the latest Snapdragon 8 Gen 3 Mobile Platform, and a stunning 2K 120Hz ProXDR display.',
    specs: ['Snapdragon 8 Gen 3', '5400mAh battery', '100W SUPERVOOC', '4th Gen Hasselblad Camera']
  }
];
