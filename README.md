# 1Fi Marketplace

## Overview
This is a frontend prototype of the "1Fi Marketplace" built as an SDE internship assignment. It simulates a premium fintech/e-commerce experience within the 1Fi Shop ecosystem, allowing users to browse products, view details, and calculate EMI options. 

**Note:** This is an independent prototype created for an internship assignment and is not the official 1Fi application.

## Features
- **Responsive Design:** Mobile-first layout that scales perfectly across tablets and desktops.
- **Product Listing:** View products with key details including lowest EMI price.
- **Advanced Filtering & Sorting:** Filter by category, brand, search by text, and sort by price/popularity.
- **Product Details:** Rich product information, variants, color selection, and specifications.
- **EMI Calculator:** Interactive EMI tenure selection with real-time (prototype 0% interest) monthly breakdown.
- **Cart System:** Fully functional slide-out cart drawer to manage selected items and calculate totals.
- **Clean UI/UX:** Built with Tailwind CSS following modern, premium fintech design principles (rounded cards, soft shadows, clear visual hierarchy).

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Lucide React (Icons)
- Context API (State Management)

## Project Structure
```
src/
  components/
    cart/       # CartDrawer
    emi/        # EmiCalculator
    layout/     # Header
    product/    # ProductCard
    shop/       # CategoryTabs, FilterPanel
  context/      # CartContext
  data/         # Mock product data
  pages/        # Shop, ProductDetails
  utils/        # EMI calculations, Currency formatting
  App.jsx       # Root component and Routing
  main.jsx      # Entry point
```

## Installation
Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:
```bash
npm run dev
```

## Build
To create a production build:
```bash
npm run build
```

## Deployment
This project can be easily deployed to Vercel or Netlify.
1. Push the code to a GitHub repository.
2. Link the repository to your Vercel/Netlify dashboard.
3. The platform will automatically detect Vite and configure the build settings (Build command: `npm run build`, Output directory: `dist`).

## Assignment Requirements Met
- ✅ Created the "1Fi Marketplace" tab alongside "Top Brands" and "Nearby Stores".
- ✅ Built a clean, mobile-first, fintech/e-commerce UI using React and Tailwind.
- ✅ Implemented mock product data with variants.
- ✅ Added a functional EMI calculator showing monthly breakdowns.
- ✅ Implemented functional Search, Filtering, and Sorting.
- ✅ Created a functional Cart for the prototype.
- ✅ Structured the code cleanly into reusable components.

## Future Improvements
- **Backend Integration:** Connect to a real REST/GraphQL API for product data.
- **Real EMI APIs:** Integrate with bank APIs or payment gateways for live interest rates and processing fees.
- **Authentication:** Add login/signup flows for personalized cart and order tracking.
- **Payments Integration:** Add Stripe/Razorpay for actual checkout processing.
- **Performance:** Add image lazy loading and pagination for large product catalogs.
