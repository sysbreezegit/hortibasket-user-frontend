"use client";

import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";
import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const GALLERY_IMAGES = [
    {
        src: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=800&h=1000&auto=format&fit=crop",
        width: 800,
        height: 1000,
        alt: "Snake Plant Zeylanica",
        title: "Sansevieria",
        category: "Architectural"
    },
    {
        src: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800&h=1200&auto=format&fit=crop",
        width: 800,
        height: 1200,
        alt: "Monstera Deliciosa",
        title: "Monstera Albo",
        category: "Rare Specimen"
    },
    {
        src: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=800&h=1000&auto=format&fit=crop",
        width: 800,
        height: 1000,
        alt: "Aloe Vera Hybrid",
        title: "Aloe Hybrid",
        category: "Desert"
    },
    {
        src: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?q=80&w=800&h=1200&auto=format&fit=crop",
        width: 800,
        height: 1200,
        alt: "Tropical Collection",
        title: "Tropical Canopy",
        category: "Lush"
    },
    {
        src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&h=800&auto=format&fit=crop",
        width: 800,
        height: 800,
        alt: "Featured Collection",
        title: "The Green Hub",
        category: "Featured"
    },
    {
        src: "https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=800&h=1000&auto=format&fit=crop",
        width: 800,
        height: 1000,
        alt: "Anthurium",
        title: "Anthurium Clarinervium",
        category: "Collector"
    }
];

const photoVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
        },
    }),
};

const PhotoGallery = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="py-24 lg:py-32 bg-[#F5F5F0] overflow-hidden">
            <MaxWidthWrapper className="max-w-[1600px] w-full px-4 md:px-8">
                
                {/* HEADER SECTION */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 lg:mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-px bg-[#1a3320]"></span>
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#1a3320]">Curated Collection</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-[#1a3320] tracking-tighter leading-[0.9] uppercase">
                            Visual<br/>Archive
                        </h2>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="max-w-sm"
                    >
                        <p className="text-sm md:text-base font-medium text-gray-600 leading-relaxed border-l-2 border-[#89C839] pl-6">
                            A curated visual index of our most extraordinary botanical specimens, emphasizing structural beauty and high-end cultivation.
                        </p>
                    </motion.div>
                </div>

                {/* GALLERY GRID */}
                <div className="min-h-[600px]">
                    {mounted ? (
                        <MasonryPhotoAlbum
                            photos={GALLERY_IMAGES}
                            columns={(containerWidth) => {
                                if (containerWidth < 640) return 1;
                                if (containerWidth < 1024) return 2;
                                return 3;
                            }}
                            spacing={24}
                            render={{
                                image: (props, { photo, index }) => {
                                    const customPhoto = photo as any;
                                    return (
                                        <motion.div
                                            initial="hidden"
                                            whileInView="visible"
                                            viewport={{ once: true, amount: 0.1 }}
                                            custom={index}
                                            variants={photoVariants}
                                            className="group relative overflow-hidden bg-gray-200 cursor-pointer"
                                            style={{ willChange: "transform, opacity" }}
                                        >
                                            <div className="absolute inset-0 bg-[#1a3320]/20 z-10 group-hover:bg-transparent transition-colors duration-700" />
                                            
                                            <img
                                                {...props}
                                                className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                                style={{ ...props.style, display: 'block' }}
                                            />
                                            
                                            {/* Hover Overlay */}
                                            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 bg-gradient-to-t from-[#1a3320]/90 via-[#1a3320]/20 to-transparent opacity-0 translate-y-8 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-bold text-[#89C839] tracking-widest uppercase mb-2">
                                                            {customPhoto.category || 'Specimen'}
                                                        </span>
                                                        <span className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter">
                                                            {customPhoto.title || customPhoto.alt}
                                                        </span>
                                                    </div>
                                                    <div className="w-12 h-12 bg-white flex items-center justify-center text-[#1a3320] group-hover:rotate-45 transition-transform duration-500">
                                                        <ArrowUpRight strokeWidth={2.5} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                },
                            }}
                        />
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-full aspect-[3/4] bg-gray-200 animate-pulse" />
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="mt-16 flex justify-center">
                    <button className="border-2 border-[#1a3320] text-[#1a3320] font-bold uppercase tracking-widest text-xs px-10 py-5 hover:bg-[#1a3320] hover:text-white transition-colors duration-300">
                        View Full Archive
                    </button>
                </div>

            </MaxWidthWrapper>
        </section>
    );
};

export default PhotoGallery;
