"use client";

import React, { useRef } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import FeaturedProductCard from "@/components/ui/FeaturedProductCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    _id: "1",
    productName: "Snake Plant Zeylanica",
    sellingPrice: 499,
    mrpPrice: 650,
    averageRating: 4.8,
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&h=1000&auto=format&fit=crop",
    tag: "Best Seller",
    urlSlug: "snake-plant-zeylanica"
  },
  {
    _id: "2",
    productName: "Peace Lily",
    sellingPrice: 349,
    mrpPrice: 450,
    averageRating: 4.5,
    image: "https://m.media-amazon.com/images/I/61FcWFWaHEL._SX679_.jpg",
    tag: "Trending",
    urlSlug: "peace-lily"
  },
  {
    _id: "3",
    productName: "Monstera Deliciosa",
    sellingPrice: 899,
    mrpPrice: 1200,
    averageRating: 4.9,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&h=1000&auto=format&fit=crop",
    tag: "Hot",
    urlSlug: "monstera-deliciosa"
  },
  {
    _id: "4",
    productName: "Aloe Vera Hybrid",
    sellingPrice: 199,
    mrpPrice: 299,
    averageRating: 4.7,
    image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&h=1000&auto=format&fit=crop",
    tag: "New",
    urlSlug: "aloe-vera-hybrid"
  },
  {
    _id: "5",
    productName: "Areca Palm",
    sellingPrice: 599,
    mrpPrice: 799,
    averageRating: 4.6,
    image: "https://m.media-amazon.com/images/I/51ooCfmgCvL._SY300_SX300_QL70_FMwebp_.jpg",
    tag: "Popular",
    urlSlug: "areca-palm"
  },
  {
    _id: "6",
    productName: "Spider Plant",
    sellingPrice: 249,
    mrpPrice: 350,
    averageRating: 4.4,
    image: "https://m.media-amazon.com/images/I/41N9oD2-F8L._SY300_SX300_QL70_FMwebp_.jpg",
    tag: "Air Purifying",
    urlSlug: "spider-plant"
  }
];

interface FeaturedPlantsProps {
  title?: string;
  url?: string;
}

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const FeaturedPlants: React.FC<FeaturedPlantsProps> = ({
  title = "Most Wanted Plants",
  url = "products"
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      let cardsToShow = 2;
      if (window.innerWidth >= 1280) {
        cardsToShow = 5;
      } else if (window.innerWidth >= 1024) {
        cardsToShow = 4;
      } else if (window.innerWidth >= 768) {
        cardsToShow = 3;
      }
      const scrollAmount = scrollRef.current.offsetWidth / cardsToShow;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
      <section className="w-full mb-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 pb-4">
          <div>
            <div className="inline-block bg-[#faf9f6] text-[#89C839] px-3 py-1 font-black text-[10px] uppercase tracking-[0.2em] mb-4 border border-gray-200">
              Signature Selection
            </div>
            <h2 className="font-black text-4xl sm:text-6xl text-[#1a3320] uppercase tracking-tighter leading-none">
              {title}
            </h2>
          </div>
          <Link
            href={`/${url}`}
            className="md:hidden font-black text-xs uppercase tracking-widest text-[#1a3320] border border-gray-200 px-4 py-2 hover:border-[#1a3320] transition-colors"
          >
            View all
          </Link>
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 hover:border-[#1a3320] hover:bg-[#1a3320] transition-all group shadow-sm"
              aria-label="Scroll left"
            >
              <ArrowLeft size={20} className="text-[#1a3320] group-hover:text-white stroke-[2]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 hover:border-[#1a3320] hover:bg-[#1a3320] transition-all group shadow-sm"
              aria-label="Scroll right"
            >
              <ArrowRight size={20} className="text-[#1a3320] group-hover:text-white stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Desktop horizontal scroll layout */}
        <motion.div
          ref={scrollRef}
          className="hidden md:flex gap-[20px] overflow-x-scroll scroll-smooth snap-x snap-mandatory no-scrollbar pb-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PRODUCTS.map((product, i) => (
            <motion.div key={`${product._id}-${i}`} className="snap-start shrink-0" variants={itemVariants} style={{ willChange: "transform, opacity" }}>
              <FeaturedProductCard product={product} />
            </motion.div>
          ))}

          {/* View All Button at the end of carousel */}
          <motion.div variants={itemVariants} className="snap-start shrink-0" style={{ willChange: "transform, opacity" }}>
            <Link
               href={`/${url}`}
               className="min-w-[318px] h-[464px] flex flex-col items-center justify-center group p-4 bg-[#faf9f6]/80 backdrop-blur-sm border border-dashed border-gray-300 hover:border-[#1a3320] hover:bg-white hover:-translate-y-1 transition-all duration-300"
             >
               <div className="w-16 h-16 bg-white border border-gray-200 shadow-sm flex items-center justify-center group-hover:bg-[#1a3320] transition-colors mb-4">
                 <ArrowRight size={24} className="text-[#1a3320] group-hover:text-white stroke-[2]" />
               </div>
               <span className="font-bold text-sm uppercase tracking-[0.2em] text-gray-500 group-hover:text-[#1a3320]">
                 View All Items
               </span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Mobile grid layout */}
        <motion.div
          className="grid grid-cols-2 gap-2 md:hidden"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {PRODUCTS.slice(0, 4).map((product, i) => (
            <motion.div key={`${product._id}-${i}`} variants={itemVariants} style={{ willChange: "transform, opacity" }}>
              <FeaturedProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </MaxWidthWrapper>
  );
};

export default FeaturedPlants;
