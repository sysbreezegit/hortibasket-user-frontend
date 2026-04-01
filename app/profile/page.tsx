"use client";

import React from "react";
import MaxWidthWrapper from "@/components/common/layout/MaxWidthWrapper";
import Link from "next/link";
import { User, MapPin, Search } from "lucide-react";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white pb-20 pt-10 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto bg-white border-2 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[80vh]">
        
        {/* HEADER */}
        <header className="flex items-center justify-between border-b-2 border-black h-16 px-6 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-black text-white">
          <Link href="/shop" className="cursor-pointer hover:underline flex items-center gap-2">
             ← Directory
          </Link>
          <span className="flex items-center gap-2"><User size={14} /> Personal Protocol</span>
          <Link href="/login" className="cursor-pointer hover:underline">Log Out</Link>
        </header>

        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* SIDEBAR */}
          <div className="w-full lg:w-64 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[#F5F5F0] flex flex-col">
            <div className="p-8 flex flex-col gap-6 font-bold text-xs uppercase tracking-widest">
              <h3 className="text-[10px] text-gray-500 mb-2 border-b-2 border-black pb-2 inline-block">Subsystems</h3>
              <a href="javascript:void(0)" className="border-l-4 border-black pl-3 text-black">Identity Data</a>
              <Link href="/orders" className="text-gray-500 hover:text-black transition-colors pl-3 border-l-4 border-transparent">Manifests</Link>
              <a href="javascript:void(0)" className="text-gray-500 hover:text-black transition-colors pl-3 border-l-4 border-transparent">Wishlist</a>
              <a href="javascript:void(0)" className="text-gray-500 hover:text-black transition-colors pl-3 border-l-4 border-transparent">Logout Protocol</a>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 p-8 md:p-14 flex flex-col bg-white">
            
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10">
              Identity<br/>Records.
            </h1>

            <div className="border-2 border-black flex flex-col sm:flex-row group bg-[#F5F5F0] mb-8">
               <div className="w-full sm:w-32 aspect-square bg-gray-200 border-b-2 sm:border-b-0 sm:border-r-2 border-black flex items-center justify-center">
                 <User size={48} className="text-black" />
               </div>
               <div className="p-6 flex flex-col justify-center gap-2">
                 <span className="font-bold text-xs uppercase tracking-widest text-gray-500">Personnel</span>
                 <h2 className="text-3xl font-black uppercase tracking-tighter">Mark E. User</h2>
                 <p className="font-bold text-sm text-black uppercase tracking-widest">contact@hortibasket.com</p>
               </div>
            </div>

            {/* ADDRESSES */}
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-black inline-block pb-1">Saved Logistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-2 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                 <div className="flex justify-between items-start border-b-2 border-black pb-4">
                    <span className="font-bold text-xs uppercase tracking-widest bg-black text-white px-2 py-1">Primary Node</span>
                    <button className="text-[10px] font-bold uppercase tracking-widest hover:underline">Edit</button>
                 </div>
                 <div className="flex flex-col gap-1 font-bold text-sm uppercase tracking-widest leading-relaxed">
                   <span>Mark E. User</span>
                   <span>123 Botanical Grid</span>
                   <span>Seattle, WA 98101</span>
                   <span>+1 555-0192</span>
                 </div>
              </div>

              <div className="border-2 border-black border-dashed p-6 bg-[#F5F5F0] flex flex-col items-center justify-center gap-4 hover:bg-white hover:border-solid transition-all cursor-pointer">
                 <MapPin size={32} />
                 <span className="font-bold text-xs uppercase tracking-widest">Register New Address</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
