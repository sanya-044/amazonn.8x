 "use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro (128 GB) - Natural Titanium",
    price: 127999,
    rating: 4.8,
    reviews: 2450,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=600&q=80",
    category: "Mobiles",
    badge: "Best Seller"
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: 29990,
    rating: 4.7,
    reviews: 1820,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    category: "Electronics",
    badge: "Amazon's Choice"
  },
  {
    id: 3,
    title: "MacBook Air Laptop with M2 chip: 13.6-inch Liquid Retina Display",
    price: 99900,
    rating: 4.9,
    reviews: 3100,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=600&q=80",
    category: "Computers",
    badge: "Top Deal"
  },
  {
    id: 4,
    title: "Nike Air Max Solo Men's Running Shoes",
    price: 7495,
    rating: 4.5,
    reviews: 940,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    category: "Fashion"
  },
  {
    id: 5,
    title: "Samsung 34\" ViewFinity Ultra WQHD Curved Monitor",
    price: 45999,
    rating: 4.6,
    reviews: 430,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80",
    category: "Electronics"
  },
  {
    id: 6,
    title: "Instant Pot Duo 7-in-1 Electric Pressure Cooker, 6L",
    price: 6499,
    rating: 4.8,
    reviews: 5200,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    category: "Home & Kitchen",
    badge: "Best Seller"
  },
  {
    id: 7,
    title: "Kindle Paperwhite (16 GB) – 6.8\" display",
    price: 14999,
    rating: 4.9,
    reviews: 7800,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
    category: "Books"
  },
  {
    id: 8,
    title: "PlayStation 5 Console (Slim)",
    price: 54990,
    rating: 4.9,
    reviews: 4120,
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=600&q=80",
    category: "Gaming",
    badge: "Trending"
  }
];

export default function Home() {
  const router = useRouter();
  
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeView, setActiveView] = useState<"shop" | "cart" | "checkout" | "orders" | "wishlist">("shop");
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("amazon_user");
    if (savedUser) setUser(JSON.parse(savedUser));

    const savedCart = localStorage.getItem("amazon_cart");
    const savedWishlist = localStorage.getItem("amazon_wishlist");
    const savedOrders = localStorage.getItem("amazon_orders");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
  }, []);

  useEffect(() => {
    localStorage.setItem("amazon_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("amazon_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("amazon_orders", JSON.stringify(orders));
  }, [orders]);

  const handleLogout = () => {
    localStorage.removeItem("amazon_user");
    setUser(null);
  };

  const categories = ["All", "Mobiles", "Electronics", "Computers", "Fashion", "Home & Kitchen", "Books", "Gaming"];

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const totalCartAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;
    const newOrder: Order = {
      id: "OD" + Math.floor(100000000 + Math.random() * 900000000),
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      items: [...cart],
      total: totalCartAmount,
      status: "Order Placed Successfully"
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setActiveView("orders");
  };

  const handleFooterLink = (title: string, body: string) => {
    setModalContent({ title, body });
  };

  return (
    <div className="min-h-screen bg-[#eaeded] font-sans text-[#0f1111] select-none flex flex-col justify-between">
      <div>
        {/* Navigation Bar */}
        <header className="bg-[#131921] text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="cursor-pointer flex items-center px-2 py-1 hover:border border-white/20 rounded" onClick={() => setActiveView("shop")}>
              <span className="text-2xl font-bold tracking-tight">
                amazon<span className="text-[#febd69]">.in</span>
              </span>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl flex items-center">
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-[#f3f3f3] text-[#111] text-xs px-2 py-2.5 rounded-l-md border-r border-gray-300 outline-none cursor-pointer"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <input
                type="text"
                placeholder="Search Amazon.in"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== "shop") setActiveView("shop");
                }}
                className="w-full px-4 py-2 bg-white text-[#111] text-sm outline-none"
              />
              <button className="bg-[#febd69] hover:bg-[#f3a847] px-4 py-2 rounded-r-md text-[#111] transition-colors cursor-pointer flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-6 text-sm">
              {user ? (
                <div className="flex flex-col cursor-pointer" onClick={handleLogout}>
                  <span className="text-[10px] text-gray-300">Hello, {user.name}</span>
                  <span className="font-bold text-xs hover:text-[#febd69]">Sign Out</span>
                </div>
              ) : (
                <div className="flex flex-col cursor-pointer" onClick={() => router.push("/auth")}>
                  <span className="text-[10px] text-gray-300">Hello, sign in</span>
                  <span className="font-bold text-xs hover:text-[#febd69]">Account & Lists</span>
                </div>
              )}

              <div className="flex flex-col cursor-pointer" onClick={() => setActiveView("orders")}>
                <span className="text-[10px] text-gray-300">Returns</span>
                <span className="font-bold text-xs">& Orders</span>
              </div>

              {/* Wishlist Link */}
              <div className="flex flex-col cursor-pointer hover:text-[#febd69]" onClick={() => setActiveView("wishlist")}>
                <span className="text-[10px] text-gray-300">Your</span>
                <span className="font-bold text-xs">Wishlist ({wishlist.length})</span>
              </div>

              {/* Cart */}
              <div className="flex items-center cursor-pointer relative hover:text-[#febd69]" onClick={() => setActiveView("cart")}>
                <div className="relative flex items-center">
                  <span className="absolute -top-2 left-3 bg-[#f08804] text-[#111] font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {totalCartCount}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="font-bold text-xs mt-3 ml-1">Cart</span>
              </div>
            </div>
          </div>

          {/* Sub-navbar */}
          <div className="bg-[#232f3e] px-4 py-1.5 flex items-center space-x-6 text-xs overflow-x-auto">
            <button onClick={() => { setActiveView("shop"); setSelectedCategory("All"); }} className="flex items-center font-bold space-x-1 cursor-pointer hover:border border-white p-1 rounded">
              <span>☰ All Products</span>
            </button>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("shop"); setSelectedCategory("Mobiles"); }} className="hover:border border-white p-1 rounded">Mobiles</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("shop"); setSelectedCategory("Electronics"); }} className="hover:border border-white p-1 rounded">Electronics</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("shop"); setSelectedCategory("Computers"); }} className="hover:border border-white p-1 rounded">Computers</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("shop"); setSelectedCategory("Fashion"); }} className="hover:border border-white p-1 rounded">Fashion</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("shop"); setSelectedCategory("Home & Kitchen"); }} className="hover:border border-white p-1 rounded">Home & Kitchen</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("wishlist"); }} className="hover:border border-white p-1 rounded">Wishlist ({wishlist.length})</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveView("orders"); }} className="hover:border border-white p-1 rounded text-[#febd69] font-bold">My Orders ({orders.length})</a>
          </div>
        </header>

        {/* DYNAMIC VIEWS */}
        {activeView === "shop" && (
          <div className="pb-16">
            {/* Hero Interactive Banner */}
            <div className="max-w-7xl mx-auto px-4 pt-6">
              <div className="relative rounded-xl overflow-hidden shadow-2xl h-[320px] bg-cover bg-center flex items-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1600&q=80')` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex flex-col justify-center px-10">
                  <span className="bg-[#ff9900] text-[#111] font-extrabold text-xs px-2.5 py-1 rounded w-max mb-3 uppercase tracking-wider">Great Indian Festival</span>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">Shop Top Tech & Essentials</h1>
                  <p className="text-gray-200 text-sm md:text-base max-w-lg mb-6">Explore unbeatable deals, wishlist items, instant checkout, and live order tracking.</p>
                  <button onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })} className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] font-bold px-6 py-2.5 rounded-md w-max shadow-lg transition-transform active:scale-95 cursor-pointer">
                    Explore Deals &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="max-w-7xl mx-auto px-4 mt-6 flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold shadow-sm transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-[#131921] text-white scale-105"
                      : "bg-white text-[#0f1111] hover:bg-gray-100 border border-gray-300"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <main className="max-w-7xl mx-auto px-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlist.some((item) => item.id === product.id);
                  return (
                    <div
                      key={product.id}
                      className="bg-white rounded-lg p-5 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                    >
                      {/* Wishlist Heart Button */}
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow transition-transform active:scale-95 cursor-pointer"
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-5 w-5 ${isWishlisted ? "text-red-600 fill-red-600" : "text-gray-400 hover:text-red-500"}`}
                          fill={isWishlisted ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>

                      <div>
                        {product.badge && (
                          <span className="bg-[#cc0c39] text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">
                            {product.badge}
                          </span>
                        )}
                        <div className="h-48 w-full overflow-hidden rounded-md mb-4 flex items-center justify-center bg-gray-50">
                          <img src={product.image} alt={product.title} className="h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <h3 className="text-sm font-medium text-[#0f1111] line-clamp-2 mb-2 group-hover:text-[#0066c0] transition-colors">
                          {product.title}
                        </h3>
                        <div className="flex items-center space-x-1 mb-2">
                          <div className="text-[#ffa41c] text-xs">★★★★☆</div>
                          <span className="text-xs text-[#0066c0]">({product.reviews.toLocaleString()})</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline space-x-1 mb-4">
                          <span className="text-xs font-semibold">₹</span>
                          <span className="text-2xl font-bold text-[#0f1111]">{product.price.toLocaleString("en-IN")}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#deb887] active:scale-95 text-[#0f1111] font-medium py-2 rounded-md border border-[#a88734] text-xs shadow-sm transition-all cursor-pointer"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>
        )}

        {/* WISHLIST VIEW */}
        {activeView === "wishlist" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-normal mb-6">Your Saved Wishlist ({wishlist.length})</h1>
            {wishlist.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-lg text-gray-600 mb-4">Your wishlist is empty. Click the heart icon on any product to save items here!</p>
                <button onClick={() => setActiveView("shop")} className="bg-[#ffd814] px-6 py-2 rounded font-medium text-sm shadow cursor-pointer">
                  Explore Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {wishlist.map((product) => (
                  <div key={product.id} className="bg-white rounded-lg p-5 border shadow flex flex-col justify-between relative">
                    <button
                      onClick={() => toggleWishlist(product)}
                      className="absolute top-4 right-4 text-red-600 text-xs font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                    <div>
                      <div className="h-48 w-full flex items-center justify-center bg-gray-50 mb-4 rounded">
                        <img src={product.image} alt={product.title} className="h-full object-contain" />
                      </div>
                      <h3 className="text-sm font-medium line-clamp-2 mb-2">{product.title}</h3>
                      <p className="text-lg font-bold">₹{product.price.toLocaleString("en-IN")}</p>
                    </div>
                    <button
                      onClick={() => {
                        addToCart(product);
                        toggleWishlist(product);
                      }}
                      className="mt-4 bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] font-medium py-2 rounded text-xs shadow cursor-pointer"
                    >
                      Move to Cart
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CART VIEW */}
        {activeView === "cart" && (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-normal mb-6">Shopping Cart</h1>
            {cart.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-lg text-gray-600 mb-4">Your Amazon Cart is empty.</p>
                <button onClick={() => setActiveView("shop")} className="bg-[#ffd814] px-6 py-2 rounded font-medium text-sm shadow cursor-pointer">
                  Shop Today&apos;s Deals
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-6">
                      <div className="flex items-center space-x-4">
                        <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
                        <div>
                          <h3 className="font-medium text-sm text-[#0f1111] max-w-md">{item.title}</h3>
                          <p className="text-green-700 text-xs font-semibold mt-1">In stock</p>
                          <div className="flex items-center space-x-3 mt-3">
                            <button onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-gray-200 rounded text-sm font-bold">-</button>
                            <span className="text-sm font-bold">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-gray-200 rounded text-sm font-bold">+</button>
                            <button onClick={() => updateQuantity(item.id, -item.quantity)} className="text-xs text-[#0066c0] hover:underline ml-4">Delete</button>
                          </div>
                        </div>
                      </div>
                      <div className="text-right font-bold text-lg">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal & Checkout Box */}
                <div className="bg-white p-6 rounded-lg shadow h-fit">
                  <p className="text-lg mb-4">Subtotal ({totalCartCount} items): <span className="font-bold">₹{totalCartAmount.toLocaleString("en-IN")}</span></p>
                  <button
                    onClick={() => setActiveView("checkout")}
                    className="w-full bg-gradient-to-b from-[#f7dfa5] to-[#f0c14b] hover:from-[#f5d78e] hover:to-[#deb887] text-[#0f1111] font-medium py-2.5 rounded-md border border-[#a88734] text-sm shadow cursor-pointer"
                  >
                    Proceed to Buy
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CHECKOUT VIEW */}
        {activeView === "checkout" && (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-normal mb-6">Select a payment method & Checkout</h1>
            <div className="bg-white p-6 rounded-lg shadow space-y-6">
              <div className="border-b pb-4">
                <h2 className="font-bold text-lg mb-2">1. Shipping Address</h2>
                <p className="text-sm text-gray-700">{user ? user.name : "Guest User"}</p>
                <p className="text-sm text-gray-600">ITER SOA University Campus, Bhubaneswar, Odisha - 751030</p>
              </div>

              <div className="border-b pb-4">
                <h2 className="font-bold text-lg mb-2">2. Payment Method</h2>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="payment" defaultChecked />
                    <span>Cash on Delivery / Pay on Delivery</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="payment" />
                    <span>Credit / Debit / ATM Card (Simulated)</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input type="radio" name="payment" />
                    <span>UPI / Net Banking</span>
                  </label>
                </div>
              </div>

              <div>
                <h2 className="font-bold text-lg mb-2">3. Order Summary</h2>
                <p className="text-sm mb-4">Total Items: {totalCartCount} | <strong>Total Amount: ₹{totalCartAmount.toLocaleString("en-IN")}</strong></p>
                <button
                  onClick={handlePlaceOrder}
                  className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] font-bold px-8 py-3 rounded-md shadow-md cursor-pointer transition-transform active:scale-95"
                >
                  Place Your Order and Pay
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ORDERS & RETURNS VIEW */}
        {activeView === "orders" && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-normal mb-6">Your Orders & Returns</h1>
            {orders.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <p className="text-gray-600 mb-4">You have not placed any orders yet.</p>
                <button onClick={() => setActiveView("shop")} className="bg-[#ffd814] px-6 py-2 rounded font-medium text-sm shadow cursor-pointer">
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border rounded-lg shadow-sm overflow-hidden">
                    <div className="bg-gray-100 px-6 py-4 flex flex-wrap justify-between text-xs text-gray-700 border-b">
                      <div>
                        <p>ORDER PLACED</p>
                        <p className="font-bold">{order.date}</p>
                      </div>
                      <div>
                        <p>TOTAL</p>
                        <p className="font-bold">₹{order.total.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p>ORDER # {order.id}</p>
                        <p className="text-[#0066c0] font-semibold">{order.status}</p>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-none last:pb-0">
                          <div className="flex items-center space-x-4">
                            <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
                            <div>
                              <h4 className="font-medium text-sm">{item.title}</h4>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <button onClick={() => alert("Return request initiated successfully for order " + order.id)} className="bg-gray-100 hover:bg-gray-200 border px-3 py-1.5 rounded text-xs font-semibold cursor-pointer">
                            Return or replace items
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* FULL AUTHENTIC AMAZON FOOTER */}
      <footer className="bg-[#232f3e] text-white text-xs mt-16">
        <div 
          className="bg-[#37475a] text-center py-3 text-sm font-medium cursor-pointer hover:bg-[#485769] transition-colors" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Back to top
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#3a4553]">
          <div>
            <h4 className="font-bold text-sm mb-3">Get to Know Us</h4>
            <ul className="space-y-2.5 text-gray-300">
              <li><button onClick={() => handleFooterLink("About Amazon", "Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.")} className="hover:underline text-left cursor-pointer">About Amazon</button></li>
              <li><button onClick={() => handleFooterLink("Careers", "Check out our latest software development, AI, and operations openings worldwide.")} className="hover:underline text-left cursor-pointer">Careers</button></li>
              <li><button onClick={() => handleFooterLink("Press Releases", "Read the latest news and media kits from Amazon corporate communications.")} className="hover:underline text-left cursor-pointer">Press Releases</button></li>
              <li><button onClick={() => handleFooterLink("Amazon Science", "Explore how our researchers are advancing machine learning and cloud computing.")} className="hover:underline text-left cursor-pointer">Amazon Science</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Make Money with Us</h4>
            <ul className="space-y-2.5 text-gray-300">
              <li><button onClick={() => handleFooterLink("Sell on Amazon", "Build your digital storefront and reach millions of active shoppers with Amazon Seller Central.")} className="hover:underline text-left cursor-pointer">Sell on Amazon</button></li>
              <li><button onClick={() => handleFooterLink("Protect and Build Your Brand", "Safeguard your intellectual property using Brand Registry tools.")} className="hover:underline text-left cursor-pointer">Protect and Build Your Brand</button></li>
              <li><button onClick={() => handleFooterLink("Amazon Global Selling", "Export your products globally to international customers.")} className="hover:underline text-left cursor-pointer">Amazon Global Selling</button></li>
              <li><button onClick={() => handleFooterLink("Advertise Your Products", "Boost your product visibility with sponsored ads and customized brand storefronts.")} className="hover:underline text-left cursor-pointer">Advertise Your Products</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Let Us Help You</h4>
            <ul className="space-y-2.5 text-gray-300">
              <li><button onClick={() => setActiveView("orders")} className="hover:underline text-left cursor-pointer text-[#febd69] font-medium">Your Account & Orders</button></li>
              <li><button onClick={() => handleFooterLink("Shipping Rates & Policies", "Enjoy free standard delivery on eligible orders above ₹499.")} className="hover:underline text-left cursor-pointer">Shipping Rates & Policies</button></li>
              <li><button onClick={() => handleFooterLink("Returns & Replacements", "Easily manage or track item returns and instant refunds directly from your dashboard.")} className="hover:underline text-left cursor-pointer">Returns & Replacements</button></li>
              <li><button onClick={() => handleFooterLink("Help Center", "Need instant assistance? Our 24/7 support team is ready to help.")} className="hover:underline text-left cursor-pointer">Help Center</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm mb-3">Connect with Us</h4>
            <ul className="space-y-2.5 text-gray-300">
              <li><button onClick={() => handleFooterLink("Facebook", "Join the official Amazon community page.")} className="hover:underline text-left cursor-pointer">Facebook</button></li>
              <li><button onClick={() => handleFooterLink("Twitter / X", "Follow @AmazonIN for real-time sale updates and lightning deals.")} className="hover:underline text-left cursor-pointer">Twitter</button></li>
              <li><button onClick={() => handleFooterLink("Instagram", "Check out lifestyle inspiration and unboxings on Instagram.")} className="hover:underline text-left cursor-pointer">Instagram</button></li>
            </ul>
          </div>
        </div>

        <div className="py-6 text-center text-gray-400 text-[11px] bg-[#131921]">
          © 1996-2026, Amazon.com, Inc. or its affiliates. Full-Stack Next.js Amazon Clone by Sanya Chauhan.
        </div>
      </footer>

      {/* POPUP MODAL */}
      {modalContent && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-[#0f1111] rounded-lg max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold mb-3 text-[#131921] border-b pb-2">{modalContent.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed mb-6">{modalContent.body}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setModalContent(null)}
                className="bg-[#ffd814] hover:bg-[#f7ca00] text-[#111] font-bold px-5 py-2 rounded-md shadow text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}