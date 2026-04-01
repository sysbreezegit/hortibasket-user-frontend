"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const CART_ITEMS = [
  { _id: "p1", productName: "Monstera Variegata", sellingPrice: 4500, qty: 1, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=400&auto=format&fit=crop" },
  { _id: "s1", productName: "Pink Princess", sellingPrice: 3200, qty: 2, image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=400&auto=format&fit=crop" },
];

export default function CartPage() {
  const [items, setItems] = useState(CART_ITEMS);

  const formatPrice = (price: number): string => `₹${price.toLocaleString('en-IN')}`;

  const subtotal = items.reduce((acc, item) => acc + item.sellingPrice * item.qty, 0);

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white pb-20 pt-10 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-[1400px] bg-white border-2 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[85vh]">
        
        {/* HEADER */}
        <header className="flex items-center justify-between border-b-2 border-black h-16 px-6 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-black text-white">
          <Link href="/shop" className="cursor-pointer hover:underline flex items-center gap-2">
            <ArrowLeft size={14} /> Continue Sourcing
          </Link>
          <span className="hidden md:block">Logistics Requisition</span>
          <span className="flex items-center">{items.length} Items Indexed</span>
        </header>

        <div className="flex flex-col xl:flex-row flex-1">
          
          {/* LEFT: ITEMS */}
          <div className="w-full xl:w-[65%] flex flex-col border-b-2 xl:border-b-0 xl:border-r-2 border-black">
            
            <div className="p-8 md:p-14 border-b-2 border-black">
               <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                 Current<br/>Manifest.
               </h1>
            </div>

            <div className="flex flex-col">
              {items.map((item, idx) => (
                <div key={item._id} className="border-b-2 border-black flex flex-col sm:flex-row group bg-white hover:bg-[#F5F5F0] transition-colors last:border-b-0">
                   
                   <div className="w-full sm:w-48 aspect-square bg-gray-100 border-b-2 sm:border-b-0 sm:border-r-2 border-black relative">
                     <img src={item.image} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-90" />
                   </div>

                   <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-bold text-[10px] uppercase tracking-widest text-gray-500">ID: {item._id}</span>
                          <h3 className="font-black text-2xl uppercase tracking-tighter leading-tight">{item.productName}</h3>
                        </div>
                        <span className="bg-black text-white px-3 py-1 font-bold text-sm">{formatPrice(item.sellingPrice)}</span>
                      </div>

                      <div className="flex items-center justify-between mt-auto">
                        
                        <div className="flex h-12 w-32 border-2 border-black bg-white">
                          <button className="w-10 flex items-center justify-center border-r-2 border-black hover:bg-black hover:text-white transition-colors" onClick={() => {
                             setItems(current => current.map(i => i._id === item._id ? {...i, qty: Math.max(1, i.qty - 1)} : i))
                          }}><Minus size={14} strokeWidth={3} /></button>
                          <span className="flex-1 flex items-center justify-center font-bold text-sm outline-none">{item.qty}</span>
                          <button className="w-10 flex items-center justify-center border-l-2 border-black hover:bg-black hover:text-white transition-colors" onClick={() => {
                             setItems(current => current.map(i => i._id === item._id ? {...i, qty: i.qty + 1} : i))
                          }}><Plus size={14} strokeWidth={3} /></button>
                        </div>

                        <button onClick={() => setItems(current => current.filter(i => i._id !== item._id))} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 flex items-center gap-2 transition-colors">
                          <Trash2 size={16} /> Extricate
                        </button>
                      </div>
                   </div>

                </div>
              ))}
              
              {items.length === 0 && (
                <div className="p-14 text-center flex flex-col items-center justify-center min-h-[40vh] bg-[#F5F5F0]">
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Manifest is empty</span>
                  <Link href="/shop" className="bg-black text-white px-8 py-4 font-bold text-xs uppercase tracking-widest hover:translate-x-1 transition-transform border-2 border-black">Initialize Sourcing</Link>
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: SUMMARY */}
          <div className="w-full xl:w-[35%] flex flex-col bg-[#F5F5F0]">
             <div className="p-8 md:p-14 flex flex-col gap-8 h-full">
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 border-b-2 border-black pb-2 inline-block self-start">Financial Summary</h3>
               
               <div className="flex flex-col gap-6 flex-1">
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                   <span>Gross Value</span>
                   <span className="text-black">{formatPrice(subtotal)}</span>
                 </div>
                 <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                   <span>Shipping Estimate</span>
                   <span className="text-black">Calculated at Checkout</span>
                 </div>
                 
                 <div className="my-2 border-b-2 border-dashed border-gray-400 w-full" />
                 
                 <div className="flex justify-between items-end">
                   <span className="text-sm font-bold uppercase tracking-widest">Net Value</span>
                   <span className="text-4xl font-black uppercase tracking-tighter">{formatPrice(subtotal)}</span>
                 </div>
               </div>

               <div className="mt-12">
                 <Link href="/checkout" className="w-full flex items-center justify-between h-16 bg-black text-white px-8 font-black uppercase tracking-widest hover:bg-white hover:text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all group">
                   Initialize Checkout <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                 </Link>
               </div>
             </div>
          </div>

        </div>
      </div>
    </main>
  );
}
