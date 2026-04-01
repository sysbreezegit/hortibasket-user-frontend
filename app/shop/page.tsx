"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import Link from "next/link";
import { ArrowRight, Filter, Search, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

const SHOP_PRODUCTS = [
  { _id: "p1", productName: "Monstera Variegata", sellingPrice: 4500, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop" },
  { _id: "p2", productName: "Pink Princess", sellingPrice: 3200, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=800&auto=format&fit=crop" },
  { _id: "p3", productName: "Dragon Scale", sellingPrice: 1500, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop" },
  { _id: "p4", productName: "Anthurium", sellingPrice: 2800, image: "https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=800&auto=format&fit=crop" },
  { _id: "p5", productName: "Ficus Audrey", sellingPrice: 1800, image: "https://images.unsplash.com/photo-1614594805320-e69df8b1f8fd?q=80&w=800&auto=format&fit=crop" },
  { _id: "p6", productName: "Bonsai Ficus", sellingPrice: 5000, image: "https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=800&auto=format&fit=crop" },
  { _id: "p7", productName: "Snake Plant", sellingPrice: 800, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=800&auto=format&fit=crop" },
  { _id: "p8", productName: "ZZ Plant", sellingPrice: 950, image: "https://images.unsplash.com/photo-1614594805320-e69df8b1f8fd?q=80&w=800&auto=format&fit=crop" },
];

const CATEGORIES = ["All", "Rare", "Low Light", "Pet Friendly", "Succulents"];

export default function ShopPage() {
  const [favorites, setFavorites] = useState<string[]>(["p1", "p4"]);

  const formatPrice = (price: number): string => `₹${price.toLocaleString('en-IN')}`;

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white pb-20 pt-10 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto bg-white border-2 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[80vh]">
        
        {/* HEADER */}
        <header className="flex items-center justify-between border-b-2 border-black h-16 px-6 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-[#F5F5F0]">
          <Link href="/" className="cursor-pointer hover:underline">← Home</Link>
          <span className="hidden md:block">The Nursery</span>
          <div className="flex items-center gap-6 border-l-2 border-black h-full pl-6">
            <span className="flex items-center gap-2 cursor-pointer hover:underline"><Search size={14} /> Search</span>
            <Link href="/checkout" className="cursor-pointer hover:underline">Cart [0]</Link>
          </div>
        </header>

        {/* HERO BANNER */}
        <div className="p-8 md:p-12 border-b-2 border-black bg-white flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] mb-4">
            Living Archive
          </h1>
          <p className="font-bold uppercase tracking-widest text-xs md:text-sm border-b-2 border-black pb-1">
            Explore 120+ Curated Botanical Specimens
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* SIDEBAR */}
          <div className="w-full lg:w-64 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[#F5F5F0] hidden lg:flex flex-col">
            <div className="p-6 border-b-2 border-black flex items-center justify-between font-bold uppercase tracking-widest text-xs">
              <span>Filters</span>
              <Filter size={14} />
            </div>
            <div className="p-6 flex flex-col gap-4">
              <h3 className="font-bold text-[10px] uppercase tracking-widest text-gray-500 mb-2">Categories</h3>
              {CATEGORIES.map((cat, i) => (
                <button key={i} className={cn(
                  "text-left font-bold uppercase text-xs hover:pl-2 transition-all",
                  i === 0 ? "text-black border-l-4 border-black pl-2" : "text-gray-500"
                )}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* GRID */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {SHOP_PRODUCTS.map((prod, i) => {
              const isFav = favorites.includes(prod._id);
              return (
                <a key={prod._id} href={`/product/${prod._id}`} className={cn(
                  "group flex flex-col border-b-2 border-black hover:bg-[#F5F5F0] transition-colors cursor-pointer",
                  (i + 1) % 3 !== 0 && "sm:border-r-2"
                )}>
                  <div className="w-full aspect-[4/5] overflow-hidden relative border-b-2 border-black bg-gray-100">
                    <img src={prod.image} alt={prod.productName} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500 ease-out" />
                    
                    {/* Add to Wishlist Toggle */}
                    <button 
                      onClick={(e) => toggleFavorite(e, prod._id)}
                      className={cn(
                        "absolute top-4 right-4 bg-white border-2 border-black text-black w-10 h-10 flex items-center justify-center hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all z-10",
                        isFav ? "bg-[#89C839]" : "bg-white"
                      )}
                      title={isFav ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart size={16} strokeWidth={2.5} className={cn(isFav && "fill-black")} />
                    </button>

                    <div className="absolute bottom-4 right-4 bg-white border-2 border-black px-2 py-1 text-[10px] font-bold uppercase tracking-widest translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      View Data
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full justify-between gap-4">
                    <h3 className="font-bold text-sm md:text-base uppercase tracking-tight leading-tight">
                      {prod.productName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-gray-500">{formatPrice(prod.sellingPrice)}</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

        </div>
      </div>
    </main>
  );
}
