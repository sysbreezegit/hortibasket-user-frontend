"use client";

import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const HERO_SLIDES = [
  {
    id: 1,
    title: "Beautiful Plants for Every Corner",
    subtitle: "Discover a wide range of exotic and indoor plants that bring life to your home.",
    buttonText: "Shop Plants",
    color: "bg-[#224229]",
    image: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=1320&h=585&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Quality Seeds for Your Garden",
    subtitle: "Start your gardening journey with our premium organic seeds.",
    buttonText: "Explore Seeds",
    color: "bg-[#1a3320]",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1320&h=585&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Essential Tools for Success",
    subtitle: "Professional gardening tools to make your hobby easier and more enjoyable.",
    buttonText: "Browse Tools",
    color: "bg-[#89C839]",
    image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=1320&h=585&auto=format&fit=crop"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden mt-6">
      <MaxWidthWrapper className="max-w-none w-full px-2 md:px-8 lg:px-12 xl:px-16">
        <div className="relative h-[450px] sm:h-[400px] md:h-[550px] lg:h-[650px] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl group">
          {HERO_SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1a3320]/90 via-[#1a3320]/40 to-transparent flex items-center px-8 md:px-24">
                <div className="max-w-2xl text-white space-y-6 md:space-y-8 mt-12 md:mt-0 pb-12 sm:pb-0">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-[#89C839] font-bold uppercase tracking-[0.25em] text-[10px] sm:text-xs block mb-3 sm:mb-4">
                      Featured Collection
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight drop-shadow-lg">
                      {slide.title}
                    </h1>
                  </motion.div>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-base md:text-xl text-gray-200 font-medium max-w-lg leading-relaxed drop-shadow-md"
                  >
                    {slide.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button className="bg-[#89C839] hover:bg-white text-[#1a3320] font-black py-4 px-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 tracking-wider text-sm">
                      {slide.buttonText}
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-[#89C839] text-white hover:text-[#1a3320] backdrop-blur-md border border-white/20 hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 hidden sm:block"
          >
            <ChevronLeft size={24} className="stroke-[2.5]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-[#89C839] text-white hover:text-[#1a3320] backdrop-blur-md border border-white/20 hover:border-transparent transition-all duration-300 opacity-0 group-hover:opacity-100 hidden sm:block"
          >
            <ChevronRight size={24} className="stroke-[2.5]" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-8 md:left-24 lg:left-24 z-20 flex gap-3">
            {HERO_SLIDES.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-500 overflow-hidden ${index === currentSlide ? "bg-[#89C839] w-12" : "bg-white/30 hover:bg-white/50 w-6"
                  }`}
              />
            ))}
          </div>
        </div>
      </MaxWidthWrapper>
    </section>
  );
};

export default Hero;
