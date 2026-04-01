"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Package, Box, ExternalLink } from "lucide-react";

const MOCK_ORDERS = [
  { _id: "ORD-94A2X", date: "Oct 12, 2026", total: 4500, status: "In Transit", items: 1, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=400&auto=format&fit=crop" },
  { _id: "ORD-33B1Y", date: "Sep 05, 2026", total: 12400, status: "Delivered", items: 3, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=400&auto=format&fit=crop" },
  { _id: "ORD-11C0Z", date: "Aug 22, 2026", total: 1800, status: "Delivered", items: 1, image: "https://images.unsplash.com/photo-1614594805320-e69df8b1f8fd?q=80&w=400&auto=format&fit=crop" },
];

export default function OrdersPage() {
  const formatPrice = (price: number): string => `₹${price.toLocaleString('en-IN')}`;

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white pb-20 pt-10 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto bg-white border-2 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[80vh]">
        
        {/* HEADER */}
        <header className="flex items-center justify-between border-b-2 border-black h-16 px-6 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-black text-white">
          <Link href="/shop" className="cursor-pointer hover:underline flex items-center gap-2">
             ← Return to base
          </Link>
          <span className="flex items-center gap-2"><Box size={14} /> Logistics Vault</span>
          <Link href="/login" className="cursor-pointer hover:underline">Log Out</Link>
        </header>

        <div className="flex flex-col lg:flex-row flex-1">
          
          {/* SIDEBAR */}
          <div className="w-full lg:w-64 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-[#F5F5F0] hidden lg:flex flex-col">
            <div className="p-8 flex flex-col gap-6 font-bold text-xs uppercase tracking-widest">
              <h3 className="text-[10px] text-gray-500 mb-2 border-b-2 border-black pb-2 inline-block">Account Subsystems</h3>
              <a href="#" className="border-l-4 border-black pl-3 text-black">Order History</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors pl-3">Saved Addresses</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors pl-3">Wishlist</a>
              <a href="#" className="text-gray-500 hover:text-black transition-colors pl-3">Preferences</a>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="flex-1 p-8 md:p-14 flex flex-col bg-white">
            
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-10">
              Acquisition<br/>Records.
            </h1>

            <div className="flex flex-col gap-8">
              {MOCK_ORDERS.map((order) => (
                <div key={order._id} className="border-2 border-black flex flex-col sm:flex-row group hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow bg-white">
                  
                  {/* Image Context */}
                  <div className="w-full sm:w-40 aspect-square bg-gray-100 border-b-2 sm:border-b-0 sm:border-r-2 border-black relative overflow-hidden">
                     <img src={order.image} alt="Specimen Context" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col p-6 sm:p-8">
                     <div className="flex justify-between items-start mb-6">
                       <div className="flex flex-col gap-1">
                         <span className="font-bold text-xs uppercase tracking-widest text-gray-500">Manifest ID</span>
                         <span className="font-black text-xl uppercase tracking-tighter">{order._id}</span>
                       </div>
                       <div className="bg-[#E5F5E0] border-2 border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest">
                         {order.status}
                       </div>
                     </div>
                     
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-auto border-t-2 border-black pt-6">
                       <div className="flex flex-col">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Date</span>
                         <span className="text-sm font-bold uppercase">{order.date}</span>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Items</span>
                         <span className="text-sm font-bold uppercase">{order.items} Specimen(s)</span>
                       </div>
                       <div className="flex flex-col">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Total Limit</span>
                         <span className="text-sm font-bold uppercase">{formatPrice(order.total)}</span>
                       </div>
                     </div>
                     
                  </div>

                  {/* Actions */}
                  <div className="w-full sm:w-24 border-t-2 sm:border-t-0 sm:border-l-2 border-black bg-[#F5F5F0] flex flex-row sm:flex-col">
                     <button className="flex-1 flex items-center justify-center p-4 hover:bg-black hover:text-white transition-colors border-r-2 sm:border-r-0 sm:border-b-2 border-black">
                       <ArrowRight size={20} />
                     </button>
                     <button className="flex-1 flex items-center justify-center p-4 hover:bg-black hover:text-white transition-colors">
                       <ExternalLink size={20} />
                     </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
