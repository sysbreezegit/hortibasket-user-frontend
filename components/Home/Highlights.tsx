"use client";

import { ArrowLeft, ArrowRight, ShoppingCart, X, Volume2, VolumeX, ArrowUpRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const HIGHLIGHTS_DATA = [
  {
    _id: "1",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/61f622c1-cad9-4bc2-ace3-03bc57900dd7.mp4",
    product: {
      _id: "p1",
      productName: "Premium Indoor Palm",
      sellingPrice: 1299,
      mrpPrice: 1800,
      urlSlug: "premium-indoor-palm",
      productImages: ["https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&h=1000&auto=format&fit=crop"]
    }
  },
  {
    _id: "2",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/a3bbfa32-06dc-41cc-acbd-fc69376cdba2.mp4",
    product: {
      _id: "p2",
      productName: "Exotic Orchid Collection",
      sellingPrice: 2499,
      mrpPrice: 3200,
      urlSlug: "exotic-orchid-collection",
      productImages: ["https://m.media-amazon.com/images/I/61FcWFWaHEL._SX679_.jpg"]
    }
  },
  {
    _id: "3",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/9fbc8704-6115-49e2-b149-46516cc450f9.mp4",
    product: {
      _id: "p3",
      productName: "Designer Ceramic Pot Set",
      sellingPrice: 899,
      mrpPrice: 1200,
      urlSlug: "designer-ceramic-pot-set",
      productImages: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=800&h=1000&auto=format&fit=crop"]
    }
  },
  {
    _id: "4",
    video: "https://caremall-web.s3.ap-south-1.amazonaws.com/videos/9bc2ccb0-9685-42cc-b8ff-1f0e6e9db673.quicktime",
    product: {
      _id: "p4",
      productName: "Hanging Garden Kit",
      sellingPrice: 599,
      mrpPrice: 850,
      urlSlug: "hanging-garden-kit",
      productImages: ["https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=800&h=1000&auto=format&fit=crop"]
    }
  }
];

const Highlights = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [selectedHighlight, setSelectedHighlight] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListMuted, setIsListMuted] = useState(true);
  const [isModalMuted, setIsModalMuted] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerView(1);
      else if (window.innerWidth < 768) setItemsPerView(2);
      else if (window.innerWidth < 1024) setItemsPerView(3);
      else setItemsPerView(4);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalSlides = Math.ceil(HIGHLIGHTS_DATA.length / itemsPerView);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleCardClick = (e: React.MouseEvent, highlight: any) => {
    e.preventDefault();
    setSelectedHighlight(highlight);
    setIsModalOpen(true);
    setIsModalMuted(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedHighlight(null);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  const getDiscountPct = (mrp?: number, sell?: number) => {
    if (!mrp || !sell || mrp <= 0 || sell >= mrp) return null;
    return Math.ceil(((mrp - sell) / mrp) * 100);
  };

  const isCarousel = HIGHLIGHTS_DATA.length > itemsPerView;

  return (
    <div className="bg-white text-black font-sans py-20 pb-32 border-b border-gray-200">
      <MaxWidthWrapper className="max-w-[1400px] w-full px-4 md:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#89C839] border-b-2 border-black pb-2 self-start">
              Motion Logistics
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-black uppercase tracking-tighter leading-[0.9] text-black">
              Specimen<br/>Shorts
            </h2>
          </div>

          {isCarousel && (
            <div className="hidden md:flex items-center gap-4">
              <button
                className="w-14 h-14 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <ArrowLeft strokeWidth={2.5} />
              </button>
              <button
                className="w-14 h-14 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <ArrowRight strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>

        {/* CAROUSEL TRACK */}
        <div className="relative overflow-hidden w-full">
          <motion.div
            className="flex gap-4 md:gap-6 lg:gap-8"
            animate={{ x: `calc(-${currentSlide * (100 / itemsPerView)}% - ${currentSlide > 0 ? (currentSlide * 1.5) : 0}rem)` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            style={{ willChange: "transform" }}
          >
            {HIGHLIGHTS_DATA.map((highlight, i) => (
              <div key={i} className="shrink-0 w-full sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.5rem)]">
                
                <div 
                  className="w-full aspect-[9/16] bg-black border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group cursor-pointer hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
                  onClick={(e) => handleCardClick(e, highlight)}
                >
                  <video
                    src={highlight.video}
                    className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 group-hover:opacity-100 transition-opacity"
                    autoPlay
                    loop
                    muted={isListMuted}
                    playsInline
                    preload="metadata"
                  />
                  
                  {/* Dynamic Play / Mute Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsListMuted((m) => !m);
                    }}
                    className="absolute top-4 right-4 z-20 w-10 h-10 border-2 border-white bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    {isListMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>

                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent z-10 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-[10px] font-bold text-[#89C839] tracking-widest uppercase mb-1 block">Live Feed</span>
                    <h3 className="text-white text-lg font-black uppercase tracking-tight mb-2 truncate">
                      {highlight.product.productName}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-bold tracking-widest">
                        ₹{highlight.product.sellingPrice}
                      </span>
                      <div className="w-8 h-8 bg-white text-black flex items-center justify-center">
                        <ArrowUpRight size={16} strokeWidth={3} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </motion.div>
        </div>

      </MaxWidthWrapper>

      {/* MODAL - BRUTALIST REWORK */}
      <AnimatePresence>
        {isModalOpen && (
          <div role="dialog" aria-modal="true" className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 bg-[#F5F5F0]/90 backdrop-blur-sm" 
              onClick={closeModal} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-white border-2 border-black flex flex-col md:flex-row shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]"
            >
              
              <button
                onClick={closeModal}
                className="absolute -top-4 -right-4 md:-top-6 md:-right-6 z-50 w-12 h-12 bg-[#89C839] border-2 border-black text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={3} />
              </button>

              {/* MEDIA LEFT */}
              <div className="relative w-full md:w-3/5 h-[40vh] md:h-full bg-black border-b-2 md:border-b-0 md:border-r-2 border-black overflow-hidden flex items-center justify-center">
                <video
                  src={selectedHighlight.video}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted={isModalMuted}
                  playsInline
                />
                <button
                  onClick={() => setIsModalMuted((m) => !m)}
                  className="absolute top-6 right-6 z-20 w-12 h-12 border-2 border-white bg-black/40 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  {isModalMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              {/* INFO RIGHT */}
              <div className="w-full md:w-2/5 h-full bg-[#fdfcfb] p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
                <div className="flex flex-col gap-8">
                  
                  {selectedHighlight.product.productImages?.[0] && (
                    <div className="w-full aspect-square bg-[#F5F5F0] border-2 border-black p-4">
                      <img
                        src={selectedHighlight.product.productImages[0]}
                        alt={selectedHighlight.product.productName}
                        className="w-full h-full object-cover mix-blend-multiply"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#89C839] border-b-2 border-black pb-1 self-start">
                      Current Selection
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-black uppercase tracking-tighter leading-[0.9] text-black pt-2">
                      {selectedHighlight.product.productName}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-end gap-3">
                      <span className="text-3xl font-black tracking-tighter">
                        ₹{selectedHighlight.product.sellingPrice}
                      </span>
                      {selectedHighlight.product.mrpPrice && (
                        <span className="text-lg text-gray-400 line-through font-bold mb-1">
                          ₹{selectedHighlight.product.mrpPrice}
                        </span>
                      )}
                    </div>
                    {getDiscountPct(selectedHighlight.product.mrpPrice, selectedHighlight.product.sellingPrice) !== null && (
                      <span className="text-xs font-bold uppercase tracking-widest text-black bg-[#89C839] px-2 py-1 self-start mt-2">
                        {getDiscountPct(selectedHighlight.product.mrpPrice, selectedHighlight.product.sellingPrice)}% Logic Discount
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-12 flex flex-col gap-4">
                  <Link
                    href={`/product/${selectedHighlight.product._id}`}
                    onClick={closeModal}
                    className="w-full h-16 bg-black text-white font-black uppercase tracking-widest flex items-center justify-center gap-3 border-2 border-black hover:bg-[#89C839] hover:text-black transition-colors"
                  >
                    Acquire Index <ArrowRight size={18} />
                  </Link>
                  <button onClick={closeModal} className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-black">
                    Return to Timeline
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Highlights;
