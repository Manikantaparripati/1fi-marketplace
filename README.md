# 1Fi Marketplace

## Live Demo
[https://1fi-marketplace-hazel.vercel.app](https://1fi-marketplace-hazel.vercel.app)

## GitHub
[https://github.com/Manikantaparripati/1fi-marketplace](https://github.com/Manikantaparripati/1fi-marketplace)

## Overview

This is a frontend prototype of the **1Fi Marketplace** built as an SDE internship assignment. It simulates a premium fintech/e-commerce experience inside the 1Fi Shop ecosystem — allowing users to browse tech products, view detailed specs, configure storage/color variants, calculate EMI plans, and manage a shopping cart.

> **Note:** This is an independent prototype created for an internship assignment and is **not** the official 1Fi application. It uses mock product data and is designed for a real backend to be connected later.

---

## Features

- **1Fi Shop** with three tabs — Top Brands, Nearby Stores, and 1Fi Marketplace
- **Product Listing** — responsive 2/3/4 column grid with product cards
- **Live Search** — filter products by name, brand, or category in real-time
- **Category & Brand Filters** — sidebar on desktop, slide-over drawer on mobile
- **Sorting** — by Popularity, Price (Low to High), Price (High to Low)
- **Product Details Page** — full-page view with image, rating, reviews, specs
- **Product Variants** — interactive storage and color variant selection
- **EMI Calculator** — select 3/6/9/12/18/24 month tenures with live monthly EMI calculation (0% interest prototype)
- **Cart System** — slide-out cart drawer with quantity controls, item removal, and total price
- **Responsive Design** — mobile-first; works on mobile, tablet, and desktop
- **SPA Routing** — direct navigation to `/product/:id` returns 200 via Vercel rewrites

---

## Tech Stack

| Technology       | Purpose                                |
|-----------------|----------------------------------------|
| React 18        | Component-based UI framework           |
| Vite            | Build tool and dev server              |
| Tailwind CSS    | Utility-first responsive styling       |
| React Router v6 | Client-side routing                    |
| Lucide React    | Consistent icon system                 |
| Context API     | Global cart state management           |
| JavaScript (ES6+)| Application logic                     |

---

## Project Structure

```
1fi-marketplace/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── cart/
│   │   │   └── CartDrawer.jsx
│   │   ├── emi/
│   │   │   └── EmiCalculator.jsx
│   │   ├── layout/
│   │   │   └── Header.jsx
│   │   ├── product/
│   │   │   └── ProductCard.jsx
│   │   └── shop/
│   │       ├── CategoryTabs.jsx
│   │       └── FilterPanel.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── data/
│   │   └── products.js
│   ├── pages/
│   │   ├── Shop.jsx
│   │   └── ProductDetails.jsx
│   ├── utils/
│   │   └── emi.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── README.md
```

---

## Installation

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Production Build

```bash
npm run build
```

This generates the optimized `/dist` folder.

---

## Deployment

This project is deployed on **Vercel**.

The `vercel.json` file includes SPA rewrites so that direct navigation to routes like `/product/1` returns `index.html` instead of a 404:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**To deploy your own instance:**
1. Fork this repository on GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project → Import from GitHub.
3. Vercel auto-detects Vite. Click **Deploy**.

---

## Assignment Requirements

| Requirement                          | Status      |
|--------------------------------------|-------------|
| Shop page with 3 tabs                | ✅ Complete |
| Top Brands / Nearby Stores (blank)   | ✅ Complete |
| 1Fi Marketplace fully implemented    | ✅ Complete |
| Product listing with cards           | ✅ Complete |
| Product image, name, price, discount | ✅ Complete |
| EMI amount and duration on cards     | ✅ Complete |
| Product details page                 | ✅ Complete |
| Variant and color selection          | ✅ Complete |
| EMI calculator (3–24 months)         | ✅ Complete |
| Search (by name, brand, category)    | ✅ Complete |
| Category and brand filters           | ✅ Complete |
| Sort by price and popularity         | ✅ Complete |
| Cart with quantity controls          | ✅ Complete |
| Responsive (mobile/tablet/desktop)   | ✅ Complete |
| React + Vite + Tailwind + Router     | ✅ Complete |
| No backend required                  | ✅ Complete |
| Mock product data (12 products)      | ✅ Complete |

---

## Future Improvements

- **Backend API** — Replace mock JSON data with a real product API (REST/GraphQL)
- **Authentication** — User login/signup flow with JWT or OAuth
- **Real EMI Integration** — Connect to bank APIs for live interest rates and eligibility checks
- **Payments** — Integrate Razorpay/Stripe for actual checkout processing
- **Order Tracking** — Post-checkout order status and history
- **Wishlist** — Save products for later
- **Product Reviews** — User-submitted ratings and comments
- **Image Optimization** — CDN-based image delivery with lazy loading
- **Pagination/Infinite Scroll** — For large product catalogs
