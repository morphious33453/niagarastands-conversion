import React from 'react'
import ReactDOM from 'react-dom/client'
import ConversionMachine from './ConversionMachine.tsx'
import './index.css'

// SEO and Meta Tags for Page 1 Google Ranking
document.title = "Premium Vinyl Decals - Order Now | Niagara Stands Out";
document.querySelector('meta[name="description"]')?.setAttribute('content', 
  'Premium vinyl decals with 5+ year guarantee. Same day shipping. Order now with instant checkout. Texas, California, custom designs available.');

// Add structured data for Google
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Niagara Stands Out",
  "description": "Premium vinyl decals and custom graphics",
  "url": window.location.origin,
  "telephone": "(289) 228-7021",
  "priceRange": "$29-$89",
  "paymentAccepted": ["Visa", "Mastercard", "PayPal", "Apple Pay"],
  "currenciesAccepted": "USD",
  "address": {
    "@type": "PostalAddress",
    "addressRegion": "Ontario",
    "addressCountry": "CA"
  }
};

const script = document.createElement('script');
script.type = 'application/ld+json';
script.textContent = JSON.stringify(structuredData);
document.head.appendChild(script);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConversionMachine />
  </React.StrictMode>,
)
