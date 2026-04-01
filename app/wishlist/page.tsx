"use client";

import React, { useState } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Heart, HeartOff } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/ui/ProductCard";

const WISHLIST_ITEMS = [
  { _id: "p1", productName: "Monstera Variegata", sellingPrice: 4500, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&auto=format&fit=crop" },
  { _id: "s3", productName: "Anthurium Clarinervium", sellingPrice: 2800, image: "https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=800&auto=format&fit=crop" },
  { _id: "s4", productName: "Ficus Audrey", sellingPrice: 1800, image: "https://images.unsplash.com/photo-1614594805320-e69df8b1f8fd?q=80&w=800&auto=format&fit=crop" },
];

export default function WishlistPage() {
  const [items, setItems] = useState(WISHLIST_ITEMS);
  const formatPrice = (price: number): string => `₹${price.toLocaleString('en-IN')}`;

  const removeFromWishlist = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setItems((current) => current.filter((item) => item._id !== id));
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white pb-20 pt-10 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto bg-white border-2 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[80vh]">
        
        {/* HEADER */}
        <header className="flex items-center justify-between border-b-2 border-black h-16 px-6 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-black text-white">
          <Link href="/shop" className="cursor-pointer hover:underline flex items-center gap-2">
             <ArrowLeft size={14} /> Back to Catalog
          </Link>
          <span className="hidden md:flex items-center gap-2"><Heart size={14} className="fill-white" /> Priority Targets</span>
          <span className="cursor-pointer hover:underline">{items.length} Tracked</span>
        </header>

        {/* TITLE BLOCK */}
        <div className="p-8 md:p-12 border-b-2 border-black bg-white flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#89C839] border-b-2 border-black pb-1 mb-2 self-start">Personal Index</span>
            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black uppercase tracking-tighter leading-[0.85] text-black">
              Wishlist.
            </h1>
          </div>
          <p className="font-bold text-xs uppercase tracking-widest text-gray-500 max-w-sm">
            Specimens prioritized for future acquisition.
          </p>
        </div>

        {/* GRID */}
        {items.length > 0 ? (
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 bg-[#F5F5F0]">
            {items.map((prod, i) => (
              <div 
                key={prod._id} 
                onClick={() => window.location.href = `/product/${prod._id}`}
                className={cn(
                  "group flex flex-col border-b-2 sm:border-b-0 border-black bg-white hover:bg-[#F5F5F0] transition-colors cursor-pointer relative",
                  i !== items.length - 1 && "sm:border-r-2 lg:border-r-2",
                  (i === 1 && items.length > 2) && "sm:border-r-0 lg:border-r-2" 
                )}
              >
                <div className="w-full aspect-[4/5] overflow-hidden relative border-b-2 border-black bg-gray-100">
                  <img src={prod.image} alt={prod.productName} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90 group-hover:scale-105 transition-transform duration-500 ease-out" />
                  
                  {/* Remove Button */}
                  <button 
                    onClick={(e) => removeFromWishlist(e, prod._id)}
                    className="absolute top-4 right-4 bg-white border-2 border-black text-black w-10 h-10 flex items-center justify-center hover:bg-red-500 hover:text-white hover:-translate-y-1 hover:shadow-[4px_4px_0_0_black] transition-all z-20"
                    title="Remove from favorites"
                  >
                    <HeartOff size={16} strokeWidth={2.5} />
                  </button>

                  <div className="absolute bottom-4 right-4 bg-[#89C839] border-2 border-black px-2 py-1 text-[10px] font-bold uppercase tracking-widest translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all text-black">
                    In Stock
                  </div>
                </div>
                
                <div className="p-6 flex flex-col h-full justify-between gap-4">
                  <h3 className="font-bold text-sm md:text-base uppercase tracking-tight leading-tight">
                    {prod.productName}
                  </h3>
                  <div className="flex items-center justify-between border-t-2 border-gray-200 pt-4">
                    <span className="font-black text-lg text-black">{formatPrice(prod.sellingPrice)}</span>
                    <div className="text-black group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={20} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
           <div className="flex-1 flex flex-col items-center justify-center bg-[#F5F5F0] p-12 text-center min-h-[40vh]">
             <span className="w-16 h-16 bg-white border-2 border-black flex items-center justify-center mb-6">
                <HeartOff size={24} className="text-gray-400" />
             </span>
             <h3 className="font-black text-2xl uppercase tracking-tighter mb-2">TARGETS EMPTY</h3>
             <p className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-8 max-w-sm">
                No specimens have been prioritized. Return to the directory to populate your index.
             </p>
             <Link href="/shop" className="bg-black text-white border-2 border-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors shadow-[4px_4px_0_0_black] hover:shadow-[2px_2px_0_0_black] hover:translate-x-[2px] hover:translate-y-[2px]">
                Browse Catalog
             </Link>
           </div>
        )}

        {/* EXHIBITION ADDITIONS (FEATURED PRODUCTS) */}
        <div className="mt-20 border-t-2 border-black pt-16 mb-20 px-8 md:px-12">
          <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="flex flex-col">
               <div className="bg-[#89C839] border-2 border-black px-3 py-1 font-black text-[10px] uppercase tracking-[0.25em] inline-block self-start shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black mb-3">
                 Index Expansion
               </div>
               <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                 Curated<br />Pairings.
               </h2>
            </div>
            <Link href="/shop" className="bg-white border-2 border-black px-6 py-3 font-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Browse Expanded Catalog
            </Link>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {RECOMMENDED_PLANTS.map((plant) => (
              <ProductCard key={plant._id} product={plant} />
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

const RECOMMENDED_PLANTS = [
  { 
    _id: "r1", 
    productName: "Thai Constellation", 
    sellingPrice: 8500, 
    mrpPrice: 12000, 
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600&auto=format&fit=crop",
    averageRating: 4.9,
    urlSlug: "thai-constellation",
    inventory: { inStock: true, totalAvailableQuantity: 5 }
  },
  { 
    _id: "r2", 
    productName: "Golden Pothos", 
    sellingPrice: 450, 
    mrpPrice: 600, 
    image: "https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=600&auto=format&fit=crop",
    averageRating: 4.5,
    urlSlug: "golden-pothos",
    inventory: { inStock: true, totalAvailableQuantity: 50 }
  },
  { 
    _id: "r3", 
    productName: "Black Gold Snake", 
    sellingPrice: 1200, 
    mrpPrice: 1800, 
    image: "https://images.unsplash.com/photo-1614594805320-e69df8b1f8fd?q=80&w=600&auto=format&fit=crop",
    averageRating: 4.8,
    urlSlug: "snake-plant",
    inventory: { inStock: true, totalAvailableQuantity: 12 }
  },
  { 
    _id: "r4", 
    productName: "Birkin Philodendron", 
    sellingPrice: 950, 
    mrpPrice: 1400, 
    image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=600&auto=format&fit=crop",
    averageRating: 4.6,
    urlSlug: "philodendron-birkin",
    inventory: { inStock: true, totalAvailableQuantity: 8 }
  },
];
