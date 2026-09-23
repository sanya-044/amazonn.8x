"use client";
import { useParams, useRouter } from "next/navigation";
import { PRODUCTS } from "@/app/data/product";
import { useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params.id);
  const product = PRODUCTS.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-2">Product not found</h1>
        <button onClick={() => router.push("/")} className="text-[#007185] hover:underline">
          &larr; Back to Amazon Home
        </button>
      </div>
    );
  }

  const inrPrice = Math.round(product.price * 83);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-[#131921] text-white px-4 py-2.5 flex items-center justify-between">
        <span className="text-2xl font-bold cursor-pointer" onClick={() => router.push("/")}>
          amazon<span className="text-[#febd69]">.in</span>
        </span>
        <button onClick={() => router.push("/")} className="text-sm font-bold hover:underline">
          Back to Results
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Image Preview */}
        <div className="bg-gray-50 border rounded-lg p-6 flex items-center justify-center h-[450px]">
          <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">{product.title}</h1>
          <div className="flex items-center space-x-2 mb-4 border-b pb-2">
            <span className="text-amber-500 text-sm">★★★★☆</span>
            <span className="text-[#007185] text-sm hover:underline cursor-pointer">{product.reviewsCount.toLocaleString()} ratings</span>
          </div>

          <div className="mb-4">
            <span className="text-xs text-red-700 bg-red-100 px-1.5 py-0.5 rounded font-bold">-26%</span>
            <div className="flex items-baseline space-x-1 mt-1">
              <span className="text-sm text-gray-900">₹</span>
              <span className="text-3xl font-extrabold">{inrPrice.toLocaleString('en-IN')}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Inclusive of all taxes</p>
          </div>

          <div className="border-t border-b py-4 my-4 space-y-2 text-sm">
            <p className="font-bold">About this item</p>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
        </div>

        {/* Buy Box Sidebar */}
        <div className="border border-gray-300 rounded-lg p-5 h-fit shadow-sm space-y-4">
          <div className="text-xl font-bold">₹{inrPrice.toLocaleString('en-IN')}</div>
          <p className="text-xs text-green-700 font-bold">In stock</p>
          
          <div className="flex items-center space-x-2">
            <label className="text-xs font-bold">Quantity:</label>
            <select 
              value={quantity} 
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm bg-gray-50"
            >
              {[1, 2, 3, 4, 5].map((num) => <option key={num} value={num}>{num}</option>)}
            </select>
          </div>

          <button 
            onClick={() => {
              setAdded(true);
              setTimeout(() => setAdded(false), 2000);
            }}
            className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black font-medium py-2 rounded-full shadow-sm text-sm cursor-pointer transition-colors"
          >
            {added ? "Added to Cart! ✓" : "Add to Cart"}
          </button>

          <button 
            onClick={() => alert("Proceeding to secure checkout!")}
            className="w-full bg-[#ffa41c] hover:bg-[#fa8900] text-black font-medium py-2 rounded-full shadow-sm text-sm cursor-pointer transition-colors"
          >
            Buy Now
          </button>
        </div>
      </main>
    </div>
  );
}