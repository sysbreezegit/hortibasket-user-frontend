"use client";

import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

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
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);

  const discountPercent = product.mrpPrice > 0
    ? Math.ceil(((product.mrpPrice - product.sellingPrice) / product.mrpPrice) * 100)
    : 0;

  const productImage = product.image || product.productImages?.[0] || "/placeholder.svg";
  const isOutOfStock = product.inventory?.inStock === false || (product.inventory?.totalAvailableQuantity ?? 1) <= 0;

  const toCapitalized = (str?: string) => {
    if (!str) return "";
    return str.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const formatPrice = (price: number): string => {
    return `<span class='ruppee-symbol'>₹</span> ${Math.trunc(price)}`;
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Navigate to product page if the click didn't come from a button
    if (!(e.target as HTMLElement).closest('button')) {
      router.push(`/product/${product?.urlSlug ?? ""}`);
    }
  };

  return (
    <div onClick={handleCardClick} className="contents cursor-pointer group">
        {/* MOBILE */}
      <div className="md:hidden relative bg-[#FDFBF7] border-2 border-[#1a3320] hover:-translate-y-1 hover:shadow-[4px_4px_0_#1a3320] w-full hover:z-30 transition-all overflow-hidden group/card flex flex-col h-full">
        {discountPercent > 0 && (
          <div className="absolute top-0 left-0 z-20">
            <div className="bg-[#1a3320] px-3 py-1.5 text-[10px] font-black text-[#89C839] border-b-2 border-r-2 border-[#1a3320] uppercase tracking-widest">
              {discountPercent}% OFF
            </div>
          </div>
        )}

        {/* HEART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={cn(
            "absolute top-2 right-2 z-20 border-2 border-[#1a3320] p-1.5 transition-colors",
            isFavorite ? "bg-[#89C839]" : "bg-[#FDFBF7] hover:bg-[#89C839]"
          )}
        >
          <Heart size={14} className={cn("text-[#1a3320] stroke-[2.5]", isFavorite && "fill-[#1a3320]")} />
        </button>

        {/* IMAGE */}
        <div className="relative min-w-[150px] overflow-hidden h-[195px] bg-[#EBF0E4] border-b-2 border-[#1a3320]">
          <img
            src={productImage}
            alt={product?.productName ?? "Product Image"}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 mix-blend-multiply opacity-90 group-hover/card:opacity-100 group-hover/card:mix-blend-normal"
          />

          <div className="absolute bottom-0 right-0 flex items-center gap-1.5 px-3 py-1 bg-[#1a3320] border-l-2 border-[#1a3320]">
            <Star size={10} className="text-[#89C839] fill-[#89C839]" />
            <span className="text-[10px] font-black tracking-widest text-[#89C839]">
              {product?.averageRating || "4.5"}
            </span>
          </div>
        </div>

        {/* TEXT */}
        <div className="p-3 flex flex-col flex-grow">
          <p className="text-xs font-black text-[#1a3320] uppercase tracking-wide line-clamp-2 leading-tight">
            {product?.productName || "Unnamed Product"}
          </p>

          <div className="mt-2 text-lg font-black text-[#1a3320] flex items-center gap-2">
            <p
              dangerouslySetInnerHTML={{
                __html: formatPrice(product.sellingPrice),
              }}
            />
          </div>

          <div className="mt-auto pt-3">
             <span className="inline-block bg-[#89C839]/20 text-[#1a3320] px-2 py-0.5 text-[9px] font-black uppercase tracking-widest mb-3 border border-[#89C839]/30">
              Free Delivery
            </span>
          </div>

        </div>
        {/* ADD TO CART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cn(
            "w-full border-t-2 border-[#1a3320] px-3 py-3 flex items-center justify-center font-black uppercase tracking-widest text-[10px] transition-colors",
            isOutOfStock 
              ? "bg-[#FDFBF7] text-[#1a3320]/40 cursor-not-allowed" 
              : "bg-[#89C839] text-[#1a3320] hover:bg-[#1a3320] hover:text-[#89C839]"
          )}
          disabled={isOutOfStock}
        >
          <ShoppingCart size={14} className="mr-2 stroke-[2.5]" />
          <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
        </button>
      </div>

      {/* DESKTOP */}
      <div className="hidden md:flex flex-col relative bg-[#FDFBF7] border-2 border-[#1a3320] hover:-translate-y-2 hover:shadow-[6px_6px_0_#1a3320] w-[318px] h-[464px] hover:z-30 transition-all overflow-hidden group/card">
        {discountPercent > 0 && (
          <div className="absolute top-0 left-0 z-10">
            <span className="inline-block px-4 py-2 text-[11px] font-black bg-[#1a3320] text-[#89C839] border-b-2 border-r-2 border-[#1a3320] uppercase tracking-widest">
              {discountPercent}% OFF
            </span>
          </div>
        )}

        {/* HEART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={cn(
            "absolute top-3 right-3 z-20 border-2 border-[#1a3320] p-2 transition-colors",
            isFavorite ? "bg-[#89C839]" : "bg-[#FDFBF7] hover:bg-[#89C839]"
          )}
        >
          <Heart size={16} className={cn("text-[#1a3320] stroke-[2.5]", isFavorite && "fill-[#1a3320]")} />
        </button>

        {/* IMAGE */}
        <div className="relative w-full h-[320px] overflow-hidden bg-[#EBF0E4] border-b-2 border-[#1a3320]">
          <img
            src={productImage}
            alt={product?.productName ?? "Product Image"}
            className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500 mix-blend-multiply opacity-95 group-hover/card:opacity-100 group-hover/card:mix-blend-normal"
          />

          <div className="absolute bottom-0 right-0 flex items-center gap-1.5 px-4 py-1.5 bg-[#1a3320] border-l-2 border-[#1a3320]">
            <Star size={14} className="text-[#89C839] fill-[#89C839]" />
            <span className="text-xs font-black tracking-widest text-[#89C839]">
              {product?.averageRating ? product?.averageRating : "4.5"}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 flex flex-col flex-grow">
          <p className="text-sm font-black text-[#1a3320] uppercase tracking-wider line-clamp-2 leading-tight">
            {product?.productName || "Unnamed Product"}
          </p>

          <div className="flex items-end gap-3 mt-3 mb-2">
            <p
              className="text-2xl font-black text-[#1a3320] leading-none"
              dangerouslySetInnerHTML={{
                __html: formatPrice(product.sellingPrice),
              }}
            />

            <p
              className="text-sm font-bold line-through text-[#1a3320]/40 leading-none mb-0.5"
              dangerouslySetInnerHTML={{
                __html: formatPrice(product.mrpPrice),
              }}
            />
          </div>

          <div className="mt-auto">
             <span className="inline-block bg-[#89C839]/20 text-[#1a3320] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest border border-[#89C839]/30">
              Free Delivery
             </span>
          </div>
        </div>

        {/* ADD TO CART (FULL WIDTH BLOCK) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={cn(
            "w-full border-t-2 border-[#1a3320] px-4 py-4 flex items-center justify-center font-black uppercase tracking-widest text-xs transition-colors",
            isOutOfStock 
              ? "bg-[#FDFBF7] text-[#1a3320]/40 cursor-not-allowed" 
              : "bg-[#89C839] text-[#1a3320] hover:bg-[#1a3320] hover:text-[#89C839]"
          )}
          disabled={isOutOfStock}
        >
          <ShoppingCart size={16} className="mr-2 stroke-[2.5]" />
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
