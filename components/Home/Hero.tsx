"use client";

import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const HERO_SLIDES = [
  {
    id: 1,
    title: "Beautiful Plants for Every Corner",
    subtitle: "Discover a wide range of exotic and indoor plants that bring life to your home.",
    buttonText: "Shop Plants",
    tag: "Featured Collection",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1320&h=585&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Quality Seeds for Your Garden",
    subtitle: "Start your gardening journey with our premium organic seeds.",
    buttonText: "Explore Seeds",
    tag: "Featured Collection",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1320&h=585&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Essential Tools for Success",
    subtitle: "Professional gardening tools to make your hobby easier and more enjoyable.",
    buttonText: "Browse Tools",
    tag: "Featured Collection",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1320&h=585&auto=format&fit=crop"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-white pt-4 pb-12 overflow-hidden">
      <MaxWidthWrapper className="max-w-[1440px] px-4 md:px-8 lg:px-12">
        <div className="relative border border-gray-200 bg-[#faf9f6] flex flex-col md:flex-row min-h-[500px] md:h-[650px] overflow-hidden group">
          
          {/* Content Area */}
          <div className="relative z-20 w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-20 bg-[#faf9f6]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                <div className="inline-block bg-white border border-gray-200 text-[#89C839] px-4 py-1.5 font-black text-[10px] uppercase tracking-[0.25em] mb-4 sm:mb-6 md:mb-8 w-fit shadow-sm">
                  {HERO_SLIDES[currentSlide].tag}
                </div>
                
                <h1 className={`${playfair.className} text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-black text-[#1a3320] leading-[1.1] mb-4 sm:mb-6 tracking-tight italic`}>
                  {HERO_SLIDES[currentSlide].title}
                </h1>
                
                <p className="text-base sm:text-lg md:text-lg text-gray-600 font-medium max-w-sm leading-relaxed mb-8 md:mb-10">
                  {HERO_SLIDES[currentSlide].subtitle}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-24 md:mb-0">
                  <button className="group relative bg-[#1a3320] text-white px-8 md:px-10 py-3.5 md:py-4 font-black text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:bg-white hover:text-[#1a3320] border border-[#1a3320] shadow-sm">
                    <span className="relative z-10 flex items-center gap-2">
                      {HERO_SLIDES[currentSlide].buttonText}
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Guaranteed Readability Navigation (Placed on off-white background) */}
            <div className="absolute bottom-6 md:bottom-12 left-0 right-0 px-8 md:px-16 lg:px-20 z-30 flex items-center justify-between pointer-events-none">
              
              {/* Fractional Pagination & Ghost Arrows Group (Inside content area) */}
              <div className="flex items-center gap-6 md:gap-10 pointer-events-auto select-none bg-inherit ml-auto md:ml-0 translate-y-2 md:translate-y-0">
                <div className="flex items-center gap-4 md:gap-8 group/nav">
                  <button 
                    onClick={prevSlide}
                    className="text-[#1a3320] hover:text-[#89C839] transition-all transform hover:-translate-x-1 duration-300"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={24} strokeWidth={1.5} />
                  </button>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-xl md:text-2xl font-black text-[#1a3320] tracking-tighter">
                      0{currentSlide + 1}
                    </span>
                    <div className="w-4 md:w-8 h-[1px] bg-gray-300 transform rotate-[-45deg] opacity-50" />
                    <span className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 md:mt-3">
                      0{HERO_SLIDES.length}
                    </span>
                  </div>

                  <button 
                    onClick={nextSlide}
                    className="text-[#1a3320] hover:text-[#89C839] transition-all transform hover:translate-x-1 duration-300"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={24} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Area */}
          <div className="relative w-full md:w-1/2 h-[350px] md:h-full overflow-hidden bg-gray-100 border-l border-gray-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img
                  src={HERO_SLIDES[currentSlide].image}
                  alt={HERO_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover grayscale-[0.05] group-hover:grayscale-0 transition-all duration-1000"
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Visual Decoration Overlay */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-[#faf9f6]/20" />
            <div className="absolute top-12 right-12 z-10 w-32 h-32 border border-white/40 backdrop-blur-[2px] hidden lg:block" />
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
