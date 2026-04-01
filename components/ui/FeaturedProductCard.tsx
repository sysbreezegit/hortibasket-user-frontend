"use client";

import React, { useState } from "react";
import { Heart, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

// Exact same props as ProductCard for drop-in replacement
interface ProductCardProps {
  product: {
    _id?: string;
    productName: string;
    sellingPrice: number;
    mrpPrice: number;
    image?: string; // For static
    productImages?: string[]; // For dynamic compatibility
    averageRating?: number;
    urlSlug?: string;
    tag?: string;
    inventory?: {
      inStock: boolean;
      totalAvailableQuantity: number;
    }
  };
  url?: string; // Optional url prop passed down gracefully
}

const FeaturedProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercent = product.mrpPrice > 0
    ? Math.ceil(((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100)
    : 0;

  const productImage = product.image || product.productImages?.[0] || "/placeholder.svg";
  const isOutOfStock = product.inventory?.inStock === false || (product.inventory?.totalAvailableQuantity ?? 1) <= 0;

  const formatPrice = (price: number): string => {
    return `<span class='ruppee-symbol'>₹</span> ${Math.trunc(price)}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('button')) {
      router.push(`/product/${product?.urlSlug ?? ""}`);
    }
  };

  return (
    <div onClick={handleCardClick} className="contents cursor-pointer group">
      
      {/* MOBILE (Light 'Matte Frame' Boxy Design) */}
      <div className="md:hidden relative w-full h-full flex flex-col bg-white border border-gray-200 p-2.5 group-hover:shadow-[4px_4px_0_rgba(0,0,0,0.05)] transition-all">
        {/* IMAGE BLOCK */}
        <div className="relative w-full aspect-square overflow-hidden bg-gray-50 mb-3 border border-gray-100">
          <img
            src={productImage}
            alt={product.productName}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
          {discountPercent > 0 && (
            <div className="absolute top-0 right-0 bg-[#89C839] px-3 py-1 text-white font-black text-[10px] uppercase tracking-widest z-10 border-b border-l border-white">
              {discountPercent}% OFF
            </div>
          )}
          <button
            onClick={(e) => { 
                e.stopPropagation(); 
                setIsFavorite(!isFavorite); 
            }}
            className={cn(
                "absolute top-2 left-2 z-10 backdrop-blur-md border border-white p-1.5 transition-colors",
                isFavorite ? "bg-[#89C839] text-[#1a3320]" : "bg-white/60 hover:bg-white text-gray-800"
            )}
          >
            <Heart size={14} className={cn("stroke-[2.5]", isFavorite && "fill-[#1a3320]")} />
          </button>
        </div>

        {/* DETAILS BLOCK */}
        <div className="flex flex-col flex-grow text-[#1a3320]">
          <p className="text-sm font-bold uppercase tracking-widest line-clamp-2 leading-tight">
            {product.productName || "Product"}
          </p>

          <div className="mt-2 mb-3">
            <p
              className="text-xl font-black text-[#89C839]"
              dangerouslySetInnerHTML={{ __html: formatPrice(product.sellingPrice) }}
            />
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); }}
            className={cn(
              "mt-auto w-full flex items-center justify-center gap-2 border px-3 py-2 text-[10px] font-black tracking-widest uppercase transition-all",
              isOutOfStock 
                ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                : "border-[#1a3320] text-[#1a3320] hover:bg-[#1a3320] hover:text-white"
            )}
            disabled={isOutOfStock}
          >
            <span>{isOutOfStock ? "Sold Out" : "Cart"}</span>
            <ShoppingCart size={14} className="stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* DESKTOP (Light 'Matte Frame' Boxy Design) */}
      <div className="hidden md:flex flex-col relative w-[318px] h-[464px] bg-white border border-gray-200 p-4 hover:-translate-y-1 hover:shadow-[6px_6px_0_rgba(26,51,32,0.1)] transition-all duration-300 overflow-hidden group/card">
        
        {/* TOP IMAGE BLOCK Wrapper */}
        <div className="relative w-full h-[260px] overflow-hidden bg-[#faf9f6] border border-gray-100 mb-5">
          <img
             src={productImage}
             alt={product?.productName}
             className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-1000 ease-in-out"
          />
          {discountPercent > 0 && (
            <div className="absolute top-0 right-0 bg-white px-3 py-1.5 text-[#1a3320] font-black text-[11px] uppercase tracking-widest z-10 border-b border-l border-gray-200">
              {discountPercent}% OFF
            </div>
          )}
          <button
            onClick={(e) => { 
                e.stopPropagation();
                setIsFavorite(!isFavorite);
            }}
            className={cn(
                "absolute top-3 left-3 z-10 backdrop-blur border p-2 transition-all duration-300 shadow-sm",
                isFavorite ? "bg-[#89C839] border-[#1a3320] text-[#1a3320]" : "bg-white/80 border-white hover:bg-[#1a3320] hover:text-white text-gray-600"
            )}
          >
            <Heart size={16} className={cn(isFavorite && "fill-[#1a3320] text-[#1a3320]")} />
          </button>
          <div className="absolute bottom-0 right-0 border-t border-l border-gray-200 bg-white px-3 py-1 flex items-center gap-1.5 shadow-sm">
             <Star size={12} className="text-[#89C839] fill-[#89C839]" />
             <span className="text-[10px] font-black tracking-widest text-[#1a3320]">
               {product.averageRating ? product.averageRating : "4.5"}
             </span>
          </div>
        </div>

        {/* BOTTOM CONTENT BLOCK */}
        <div className="flex flex-col grow text-[#1a3320]">
          <div className="flex justify-between items-start gap-2 mb-2">
            <p className="text-sm font-black uppercase tracking-widest leading-tight line-clamp-2 text-[#222]">
              {product.productName || "Product"}
            </p>
          </div>
          
          <div className="flex items-end gap-3 mt-1">
             <p
               className="text-2xl font-black text-[#89C839] leading-none"
               dangerouslySetInnerHTML={{ __html: formatPrice(product.sellingPrice) }}
             />
             <p
               className="text-[11px] font-bold line-through text-gray-400 leading-none mb-1"
               dangerouslySetInnerHTML={{ __html: formatPrice(product.mrpPrice) }}
             />
          </div>

          <div className="mt-auto flex justify-between items-center z-10 relative border-t border-gray-200 pt-4">
             <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover/card:opacity-0 transition-opacity absolute">
               Detailed View <ArrowRight size={10} className="inline ml-1" />
             </span>
             <div className="opacity-0 group-hover/card:opacity-100 absolute w-full transition-all duration-300 translate-y-2 group-hover/card:translate-y-0 text-center">
               <button
                 onClick={(e) => {
                   e.stopPropagation();
                 }}
                 className={cn(
                   "w-full flex items-center justify-center gap-2 px-4 py-2 border font-black uppercase tracking-widest text-[10px] transition-colors",
                   isOutOfStock 
                     ? "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
                     : "border-[#1a3320] bg-white text-[#1a3320] hover:bg-[#1a3320] hover:text-white"
                 )}
                 disabled={isOutOfStock}
               >
                 <span>{isOutOfStock ? "Out of Stock" : "Quick Add to Cart"}</span>
               </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturedProductCard;
