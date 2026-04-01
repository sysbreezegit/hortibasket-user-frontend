"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CATEGORIES = [
  {
    id: 1,
    name: "Indoor Plants",
    image: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=600&h=800&auto=format&fit=crop",
    count: "120+ Items",
    accent: "bg-emerald-500"
  },
  {
    id: 2,
    name: "Outdoor Plants",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&h=800&auto=format&fit=crop",
    count: "80+ Items",
    accent: "bg-green-600"
  },
  {
    id: 3,
    name: "Gardening Tools",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&h=800&auto=format&fit=crop",
    count: "50+ Items",
    accent: "bg-stone-600"
  },
  {
    id: 4,
    name: "Pots & Planters",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=600&h=800&auto=format&fit=crop",
    count: "200+ Items",
    accent: "bg-[#224229]"
  },
  {
    id: 5,
    name: "Fertilizers",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=600&h=800&auto=format&fit=crop",
    count: "40+ Items",
    accent: "bg-lime-600"
  },
  {
    id: 6,
    name: "Seeds",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=600&h=800&auto=format&fit=crop",
    count: "300+ Items",
    accent: "bg-yellow-600"
  }
];

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

const Categories = () => {
  return (
    <section className="py-20 bg-white border-b border-gray-200">
      <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 px-2 sm:px-0 gap-6">
          <div>
            <div className="w-16 h-1 bg-[#89C839] mb-4" />
            <h2 className="text-3xl sm:text-5xl font-black text-[#224229] tracking-tight uppercase">
              Shop Categories
            </h2>
          </div>
          <Link href="/categories" className="flex items-center gap-2 text-[#224229] bg-white border-2 border-[#224229] px-6 py-3 text-xs sm:text-sm font-black hover:bg-[#224229] hover:text-white transition-all uppercase tracking-widest">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={itemVariants} style={{ willChange: "transform, opacity" }}>
              <Link href={`/category/${category.id}`} className="group relative flex aspect-4/5 sm:aspect-3/4 bg-white border border-gray-200 hover:border-[#224229] transition-colors p-3 sm:p-4 flex-col justify-between">
                
                {/* Image Container representing a box */}
                <div className="w-full h-[65%] sm:h-[70%] bg-gray-100 relative overflow-hidden border border-gray-100">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out grayscale-20 group-hover:grayscale-0"
                  />
                  {/* Top Badge as a block */}
                  <div className="absolute top-0 left-0 bg-white border-b border-r border-gray-200 px-3 py-1.5 z-20">
                    <span className="text-[10px] font-bold text-[#224229] tracking-widest uppercase">
                      {category.count}
                    </span>
                  </div>
                </div>

                {/* Bottom Content block */}
                <div className="flex flex-col justify-end grow pt-4">
                  <div className={`w-8 h-1 ${category.accent} mb-3`} />
                  <h3 className="text-lg sm:text-xl font-black text-[#224229] tracking-tight uppercase leading-none mb-2">
                    {category.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#224229]/60 text-[10px] font-bold uppercase tracking-widest group-hover:text-[#89C839] transition-colors">
                    Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Categories;
