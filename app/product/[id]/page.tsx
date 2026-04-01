"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { ArrowRight, Plus, Minus, Heart, Star, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

// MOCK DATA
const MOCK_PRODUCT = {
  _id: "p1",
  productName: "Monstera Variegata",
  latinName: "Monstera deliciosa 'Albo Borsigiana'",
  sellingPrice: 4500,
  mrpPrice: 6000,
  averageRating: 4.8,
  reviewsCount: 124,
  collection: "The Rare Archive",
  images: [
    "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1614594805320-e69df8b1f8fd?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=1200&auto=format&fit=crop"
  ],
  description: "An extraordinary specimen from our rare archives. The 'Albo Borsigiana' features striking, high-contrast white variegation against deep emerald fenestrations. Each leaf forms a completely unique marble pattern, making this living sculpture an absolute centerpiece for any curated botanical collection.",
  specs: {
    "Height": "45–60 cm",
    "Vessel": "20cm Teracotta",
    "Toxicity": "Irritant to pets",
    "Light": "Bright indirect",
    "Water": "Allow 50% dry",
    "Humidity": "60%–80%"
  },
};

const SIMILAR_PRODUCTS = [
  { _id: "s1", productName: "Pink Princess", sellingPrice: 3200, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=800&auto=format&fit=crop" },
  { _id: "s2", productName: "Dragon Scale", sellingPrice: 1500, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop" },
  { _id: "s3", productName: "Anthurium", sellingPrice: 2800, image: "https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=800&auto=format&fit=crop" },
  { _id: "s4", productName: "Ficus Audrey", sellingPrice: 1800, image: "https://images.unsplash.com/photo-1614594805320-e69df8b1f8fd?q=80&w=800&auto=format&fit=crop" },
];

export default function ProductDetailPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Favorites state specifically for Similar Products
  const [similarFavorites, setSimilarFavorites] = useState<string[]>([]);

  const formatPrice = (price: number): string => `₹${price.toLocaleString('en-IN')}`;

  const toggleSimilarFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSimilarFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-[#F5F5F0] pb-20 pt-10 px-4 md:px-8">

      {/* 
        ========================================================
        BOXY ARCHITECTURE: Max width container with hard borders
        ======================================================== 
      */}
      <div className="max-w-[1400px] mx-auto bg-white border-2 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">

        {/* HEADER BAR */}
        <header className="flex items-center justify-between border-b-2 border-black h-14 px-6 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-[#F5F5F0]">
          <div className="flex items-center gap-4">
            <span className="cursor-pointer hover:underline">← Catalog</span>
            <span className="hidden md:block w-px h-4 bg-black" />
            <span className="hidden md:block">Boutique Botanical</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="cursor-pointer hover:underline">Search</span>
            <span className="cursor-pointer hover:underline">Cart [0]</span>
          </div>
        </header>

        {/* MAIN SPLIT */}
        <div className="flex flex-col lg:flex-row w-full">

          {/* ======================= LEFT: GALLERY ======================= */}
          <div className="w-full lg:w-1/2 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-black relative">

            {/* Tag Overlay */}
            <div className="absolute top-6 left-6 z-10 bg-white border-2 border-black px-3 py-1 text-xs font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              {MOCK_PRODUCT.collection}
            </div>

            {/* Main Image */}
            <div className="w-full aspect-[4/5] md:aspect-square bg-gray-100 overflow-hidden relative">
              <img
                src={MOCK_PRODUCT.images[activeImageIndex]}
                alt={MOCK_PRODUCT.productName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 border-t-2 border-black h-24 sm:h-32 bg-[#F5F5F0]">
              {MOCK_PRODUCT.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={cn(
                    "w-full h-full border-r-2 border-black last:border-r-0 relative group overflow-hidden focus:outline-none",
                    activeImageIndex === i ? "bg-black" : "hover:bg-gray-200 transition-colors"
                  )}
                >
                  <img
                    src={img}
                    alt={`Thumb ${i}`}
                    className={cn(
                      "absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500",
                      activeImageIndex === i ? "opacity-100 scale-105" : ""
                    )}
                  />
                  {activeImageIndex === i && (
                    <div className="absolute inset-0 border-4 border-black z-10 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ======================= RIGHT: INFO ======================= */}
          <div className="w-full lg:w-1/2 flex flex-col bg-white">

            {/* TITLE & PRICE BLOCK */}
            <div className="p-8 md:p-12 border-b-2 border-black flex flex-col justify-center min-h-[40vh]">
              <div className="flex items-center gap-2 mb-6 text-xs font-bold uppercase tracking-widest">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(MOCK_PRODUCT.averageRating) ? "fill-black" : "fill-transparent stroke-gray-300"} />
                  ))}
                </div>
                <span>({MOCK_PRODUCT.reviewsCount} REVIEWS)</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-bold uppercase leading-[0.85] tracking-tighter mb-4 text-black">
                {MOCK_PRODUCT.productName}
              </h1>

              <p className="text-xl font-medium italic text-gray-500 mb-10">
                {MOCK_PRODUCT.latinName}
              </p>

              <div className="flex items-end gap-4 mt-auto">
                <span className="text-4xl font-bold tracking-tighter">{formatPrice(MOCK_PRODUCT.sellingPrice)}</span>
                <span className="text-xl text-gray-400 line-through font-medium mb-1">{formatPrice(MOCK_PRODUCT.mrpPrice)}</span>
                <span className="ml-auto bg-[#E5F5E0] border-2 border-black px-3 py-1 font-bold text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  In Stock
                </span>
              </div>
            </div>

            {/* SYNOPSIS BLOCK */}
            <div className="p-8 md:p-12 border-b-2 border-black bg-[#Fcfcfc]">
              <h3 className="text-xs font-bold tracking-widest uppercase mb-4 border-b-2 border-black inline-block pb-1">Specimen Details</h3>
              <p className="text-sm md:text-base font-medium leading-[1.8] text-gray-800">
                {MOCK_PRODUCT.description}
              </p>
            </div>

            {/* CTA BLOCK */}
            <div className="p-8 md:p-12 border-b-2 border-black bg-[#F5F5F0] flex flex-col gap-6">

              <div className="flex flex-col sm:flex-row gap-4 h-auto sm:h-16">

                {/* Quantity Box */}
                <div className="flex w-full sm:w-40 border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-16 sm:h-full">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex-1 flex items-center justify-center border-r-2 border-black hover:bg-black hover:text-white transition-colors active:bg-gray-800"><Minus size={18} strokeWidth={3} /></button>
                  <input type="text" value={quantity} readOnly className="w-16 text-center font-bold text-lg bg-transparent border-none outline-none focus:ring-0 px-0" />
                  <button onClick={() => setQuantity(quantity + 1)} className="flex-1 flex items-center justify-center border-l-2 border-black hover:bg-black hover:text-white transition-colors active:bg-gray-800"><Plus size={18} strokeWidth={3} /></button>
                </div>

                {/* Add to Cart Button Box */}
                <button className="flex-1 bg-black text-white font-bold text-sm tracking-widest uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center justify-center gap-3 h-16 sm:h-full group">
                  Add to Cart <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

              </div>

              {/* TOGGLABLE WISHLIST BUTTON */}
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "w-full flex items-center justify-center gap-2 h-14 border-2 border-black font-bold text-xs tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
                  isFavorite ? "bg-[#89C839] text-black" : "bg-white text-black hover:bg-[#F5F5F0]"
                )}
              >
                <Heart size={16} strokeWidth={2.5} className={cn(isFavorite && "fill-black")} />
                {isFavorite ? "Saved to Targets" : "Save to Targets"}
              </button>

            </div>

            {/* SPECS GRID BLOCK */}
            <div className="flex flex-col flex-1">
              <div className="grid grid-cols-2 lg:grid-cols-3 flex-1 h-full min-h-[160px]">
                {Object.entries(MOCK_PRODUCT.specs).map(([k, v], i) => (
                  <div key={k} className="p-4 md:p-6 border-b-2 border-r-2 border-black flex flex-col justify-center last:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 [&:nth-child(even)]:border-r-0 lg:[&:nth-child(even)]:border-r-2 lg:[&:nth-child(3n)]:border-r-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">{k}</span>
                    <span className="text-sm font-bold text-black">{v}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 
        ========================================================
        SIMILAR SPECIMENS - BOXY CAROUSEL
        ======================================================== 
      */}
      <div className="max-w-[1400px] mx-auto mt-16 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end px-2 gap-4">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tighter text-black">
          Curated For You
        </h2>
        <a href="/shop" className="font-bold uppercase tracking-widest text-xs border-b-2 border-black pb-1 hover:bg-black hover:text-white transition-colors">
          View Collection Complete
        </a>
      </div>

      <div className="max-w-[1400px] mx-auto border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row">
        {SIMILAR_PRODUCTS.map((prod, i) => {
          const isSimilarFav = similarFavorites.includes(prod._id);
          return (
            <a key={prod._id} href={`/product/${prod._id}`} className={cn(
              "w-full sm:w-1/4 flex flex-col border-b-2 sm:border-b-0 sm:border-r-2 border-black group last:border-0 hover:bg-[#F5F5F0] transition-colors cursor-pointer"
            )}>
              <div className="w-full aspect-[4/5] bg-gray-100 border-b-2 border-black overflow-hidden relative">
                <img src={prod.image} alt={prod.productName} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500 ease-out" />

                {/* Embedded Heart Button inside Similar Products */}
                <button
                  onClick={(e) => toggleSimilarFavorite(e, prod._id)}
                  className={cn(
                    "absolute top-4 right-4 bg-white border-2 border-black text-black w-10 h-10 flex items-center justify-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all z-10",
                    isSimilarFav ? "bg-[#89C839]" : "bg-white"
                  )}
                  title={isSimilarFav ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart size={16} strokeWidth={2.5} className={cn(isSimilarFav && "fill-black")} />
                </button>
              </div>
              <div className="p-4 md:p-6 flex flex-col h-full justify-between">
                <h3 className="font-bold text-sm md:text-base uppercase tracking-tight text-black mb-2 leading-tight">
                  {prod.productName}
                </h3>
                <span className="font-bold text-sm text-gray-500">
                  {formatPrice(prod.sellingPrice)}
                </span>
              </div>
            </a>
          );
        })}
      </div>

    </main>
  );
}
