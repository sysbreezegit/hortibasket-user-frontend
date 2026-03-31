"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Home/Hero";
import Categories from "@/components/Home/Categories";
import FeaturedPlants from "@/components/Home/FeaturedPlants";
import IndoorPlants from "@/components/Home/IndoorPlants";
import OutdoorPlants from "@/components/Home/OutdoorPlants";

// Using dynamic imports for components that cause hydration issues due to window/layout calculations
const Highlights = dynamic(() => import("@/components/Home/Highlights"), { ssr: false });
const PhotoGallery = dynamic(() => import("@/components/Home/PhotoGallery"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <div className="flex flex-col w-full bg-white scroll-smooth">
      {/* 1. HERO */}
      <Hero />


      {/* 3. CATEGORIES */}
      <Categories />

      {/* 4. HIGHLIGHTS */}
      <Highlights />

      {/* 5. OFFER CARDS */}
      {/* <OfferCards /> */}

      {/* 6. FEATURED PRODUCTS (MOST WANTED) */}
      <FeaturedPlants />

      {/* 11. PHOTO GALLERY */}
      <PhotoGallery />

      {/* 12. INDOOR PLANTS */}
      <IndoorPlants />

      {/* 13. OUTDOOR PLANTS */}
      <OutdoorPlants />
    </div>
  );
}
