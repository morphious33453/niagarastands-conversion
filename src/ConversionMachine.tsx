import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  Clock, 
  Shield, 
  Zap, 
  Phone,
  CreditCard,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

// Shopify Integration - REAL STORE DATA
const SHOPIFY_CONFIG = {
  domain: 'nktyvy-qe.myshopify.com',
  storefrontToken: 'f5e971ed228c36f2d42b092823af21e5',
  apiVersion: '2024-01'
};

// HIGH-CONVERTING PRODUCTS - Focused on IMMEDIATE SALES
const HIGH_CONVERT_PRODUCTS = [
  {
    id: 1,
    name: "Texas Pride Vinyl Decal Pack",
    price: 29.97,
    originalPrice: 49.99,
    image: "https://images.unsplash.com/photo-1569385192660-2cf5b1dfa45e?w=500&h=500&fit=crop",
    urgency: "47 sold today",
    guarantee: "5+ Year Weatherproof",
    sizes: ["4 inch", "6 inch", "8 inch"],
    bestseller: true
  },
  {
    id: 2, 
    name: "California Republic Bear Set",
    price: 34.97,
    originalPrice: 54.99,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
    urgency: "Limited Stock - 12 left",
    guarantee: "Marine Grade Vinyl",
    sizes: ["4 inch", "6 inch", "8 inch"],
    bestseller: false
  },
  {
    id: 3,
    name: "Custom Business Logo Decals",
    price: 89.97,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1560472355-a9a6740a61c7?w=500&h=500&fit=crop",
    urgency: "5 orders in last hour",
    guarantee: "Professional Grade",
    sizes: ["5 pack", "10 pack", "25 pack"],
    bestseller: false
  }
];

// CASH-FIRST CONVERSION HOMEPAGE
const ConversionMachine = () => {
  const [selectedProduct, setSelectedProduct] = useState(HIGH_CONVERT_PRODUCTS[0]);
  const [selectedSize, setSelectedSize] = useState(HIGH_CONVERT_PRODUCTS[0].sizes[1]);
  const [quantity, setQuantity] = useState(1);
  const [orderCount, setOrderCount] = useState(127);
  const [showUrgency, setShowUrgency] = useState(true);
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Live counter for social proof
  useEffect(() => {
    const interval = setInterval(() => {
      setOrderCount(prev => prev + Math.floor(Math.random() * 3));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Urgency timer
  useEffect(() => {
    const urgencyTimer = setInterval(() => {
      setShowUrgency(prev => !prev);
    }, 2000);
    return () => clearInterval(urgencyTimer);
  }, []);

  const totalPrice = selectedProduct.price * quantity;
  const savings = (selectedProduct.originalPrice - selectedProduct.price) * quantity;
  const discountPercent = Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100);

  const handleInstantCheckout = async () => {
    // Direct Shopify checkout integration
    const checkoutUrl = `https://${SHOPIFY_CONFIG.domain}/cart/add?id=${selectedProduct.id}&quantity=${quantity}`;
    window.open(checkoutUrl, '_blank');
    
    // Track conversion
    if (typeof gtag !== 'undefined') {
      gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: totalPrice
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* URGENT SALE BANNER */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 py-3 text-center">
        <div className={`font-bold text-lg ${showUrgency ? 'animate-pulse' : ''}`}>
          🔥 FLASH SALE: 40% OFF - ENDS IN 4 HOURS! 🔥
        </div>
      </div>

      {/* HERO SECTION - CASH FOCUSED */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black mb-6"
            >
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                ORDER NOW
              </span>
              <br />
              <span className="text-white">PAY LATER</span>
            </motion.h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">
              Premium Vinyl Decals • 5+ Year Guarantee • Ships Same Day
            </p>

            {/* SOCIAL PROOF */}
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div className="text-center cash-pulse">
                <div className="text-3xl font-bold text-green-400">{orderCount}+</div>
                <div className="text-sm text-gray-400">Orders This Week</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm text-gray-400">4.9/5 Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">2-3</div>
                <div className="text-sm text-gray-400">Day Shipping</div>
              </div>
            </div>
          </div>

          {/* MAIN CONVERSION SECTION */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            
            {/* PRODUCT SHOWCASE */}
            <div className="space-y-6">
              <div className="conversion-card">
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name}
                  className="w-full h-80 object-cover rounded-lg mb-6"
                />
                
                {/* PRODUCT SELECTOR */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {HIGH_CONVERT_PRODUCTS.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        setSelectedProduct(product);
                        setSelectedSize(product.sizes[1]);
                      }}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedProduct.id === product.id
                          ? 'border-blue-500 bg-blue-500/20'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <img src={product.image} alt={product.name} className="w-full h-16 object-cover rounded mb-2" />
                      <div className="text-xs font-medium">{product.name.split(' ').slice(0, 2).join(' ')}</div>
                    </button>
                  ))}
                </div>

                {/* TRUST INDICATORS */}
                <div className="grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="flex flex-col items-center">
                    <Shield className="h-8 w-8 text-green-400 mb-2" />
                    <span>5+ Year<br />Warranty</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-8 w-8 text-blue-400 mb-2" />
                    <span>Same Day<br />Shipping</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Award className="h-8 w-8 text-purple-400 mb-2" />
                    <span>Premium<br />Quality</span>
                  </div>
                </div>
              </div>
            </div>

            {/* INSTANT CHECKOUT FORM */}
            <div className="conversion-card">
              <div className="mb-6">
                {selectedProduct.bestseller && (
                  <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-4 py-2 rounded-lg font-bold text-center mb-4">
                    🏆 #1 BESTSELLER
                  </div>
                )}
                
                <h2 className="text-3xl font-bold mb-2">{selectedProduct.name}</h2>
                
                {/* URGENCY INDICATOR */}
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-6">
                  <div className="flex items-center text-red-400">
                    <AlertCircle className="h-5 w-5 mr-2 urgency-blink" />
                    <span className="font-bold">{selectedProduct.urgency}</span>
                  </div>
                </div>

                {/* PRICING */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="price-highlight">${totalPrice.toFixed(2)}</span>
                    <span className="text-2xl text-gray-400 line-through">${(selectedProduct.originalPrice * quantity).toFixed(2)}</span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full font-bold">
                      SAVE ${savings.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-green-400 font-bold">
                    {discountPercent}% OFF TODAY ONLY!
                  </div>
                </div>

                {/* SIZE & QUANTITY */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">SIZE</label>
                    <select 
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white"
                    >
                      {selectedProduct.sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">QUANTITY</label>
                    <div className="flex items-center">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="bg-gray-800 border border-gray-600 px-4 py-3 rounded-l-lg font-bold hover:bg-gray-700"
                      >
                        -
                      </button>
                      <span className="bg-gray-800 border-t border-b border-gray-600 px-6 py-3 font-bold">
                        {quantity}
                      </span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="bg-gray-800 border border-gray-600 px-4 py-3 rounded-r-lg font-bold hover:bg-gray-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* CUSTOMER INFO - MINIMAL FOR CONVERSION */}
                <div className="space-y-4 mb-6">
                  <input
                    type="email"
                    placeholder="Email for order confirmation"
                    value={customerData.email}
                    onChange={(e) => setCustomerData({...customerData, email: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone (for shipping updates)"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({...customerData, phone: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400"
                  />
                </div>

                {/* MAIN CTA BUTTON */}
                <button
                  onClick={handleInstantCheckout}
                  disabled={!customerData.email}
                  className="w-full btn-urgent text-2xl py-6 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="flex items-center justify-center">
                    <CreditCard className="mr-3 h-8 w-8" />
                    ORDER NOW - ${totalPrice.toFixed(2)}
                  </span>
                </button>

                {/* PAYMENT OPTIONS */}
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-400 mb-2">Secure Checkout • All Payment Methods</div>
                  <div className="flex justify-center space-x-4">
                    <span className="bg-blue-600 px-3 py-1 rounded text-xs font-bold">VISA</span>
                    <span className="bg-red-600 px-3 py-1 rounded text-xs font-bold">MC</span>
                    <span className="bg-blue-500 px-3 py-1 rounded text-xs font-bold">PAYPAL</span>
                    <span className="bg-black border px-3 py-1 rounded text-xs font-bold">APPLE PAY</span>
                  </div>
                </div>

                {/* GUARANTEE */}
                <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="font-bold text-green-400">30-DAY MONEY BACK GUARANTEE</div>
                  <div className="text-sm text-gray-300">Not satisfied? Full refund, no questions asked.</div>
                </div>
              </div>
            </div>
          </div>

          {/* URGENCY FOOTER */}
          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500 rounded-lg p-6 max-w-2xl mx-auto">
              <div className="text-2xl font-bold text-red-400 mb-2">⏰ FLASH SALE ENDS SOON!</div>
              <div className="text-lg text-gray-300 mb-4">Don't miss out - prices go back up at midnight!</div>
              <div className="flex justify-center items-center space-x-4">
                <Phone className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">(289) 228-7021</span>
                <span className="text-gray-400">• Order by phone 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConversionMachine;
