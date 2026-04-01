"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white pb-20 pt-10 px-4 md:px-8 flex justify-center">
      <div className="w-full max-w-[1400px] bg-white border-2 border-black flex flex-col shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[85vh]">

        {/* HEADER */}
        <header className="flex items-center justify-between border-b-2 border-black h-16 px-6 uppercase text-[10px] md:text-xs font-bold tracking-widest bg-black text-white">
          <Link href="/shop" className="cursor-pointer hover:underline flex items-center gap-2">
            <ArrowLeft size={14} /> Back to Shop
          </Link>
          <span className="flex items-center gap-2"><ShieldCheck size={14} /> Secure Checkout</span>
          <span className="hidden md:block">Boutique Botanical</span>
        </header>

        <div className="flex flex-col lg:flex-row flex-1">

          {/* LEFT: FORM */}
          <div className="w-full lg:w-3/5 flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-black">

            {/* PROGRESS BAR */}
            <div className="flex border-b-2 border-black bg-[#F5F5F0]">
              <div className={cn("flex-1 p-4 font-bold text-[10px] uppercase tracking-widest border-r-2 border-black flex flex-col justify-center text-center transition-colors", step >= 1 ? "bg-black text-white" : "")}>
                1. Identification
              </div>
              <div className={cn("flex-1 p-4 font-bold text-[10px] uppercase tracking-widest border-r-2 border-black flex flex-col justify-center text-center transition-colors", step >= 2 ? "bg-black text-white" : "")}>
                2. Logistics
              </div>
              <div className={cn("flex-1 p-4 font-bold text-[10px] uppercase tracking-widest flex flex-col justify-center text-center transition-colors", step >= 3 ? "bg-black text-white" : "")}>
                3. Payment
              </div>
            </div>

            <div className="p-8 md:p-14 flex flex-col gap-8 flex-1">
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-none mb-4">
                Shipping Logistics
              </h2>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-[10px] uppercase tracking-widest">Email Address</label>
                  <input type="email" placeholder="example@domain.com" className="h-14 border-2 border-black bg-white px-4 font-bold outline-none focus:bg-[#F5F5F0] transition-colors" defaultValue="test@user.com" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-[10px] uppercase tracking-widest">First Name</label>
                    <input type="text" placeholder="John" className="h-14 border-2 border-black bg-white px-4 font-bold outline-none focus:bg-[#F5F5F0] transition-colors" defaultValue="John" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-[10px] uppercase tracking-widest">Last Name</label>
                    <input type="text" placeholder="Doe" className="h-14 border-2 border-black bg-white px-4 font-bold outline-none focus:bg-[#F5F5F0] transition-colors" defaultValue="Doe" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-bold text-[10px] uppercase tracking-widest">Shipping Address</label>
                  <input type="text" placeholder="123 Avenue" className="h-14 border-2 border-black bg-white px-4 font-bold outline-none focus:bg-[#F5F5F0] transition-colors" defaultValue="456 Botanical Way" />
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="flex flex-col gap-2 col-span-2">
                    <label className="font-bold text-[10px] uppercase tracking-widest">City</label>
                    <input type="text" placeholder="New York" className="h-14 border-2 border-black bg-white px-4 font-bold outline-none focus:bg-[#F5F5F0] transition-colors" defaultValue="Seattle" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-[10px] uppercase tracking-widest">Zip Code</label>
                    <input type="text" placeholder="10001" className="h-14 border-2 border-black bg-white px-4 font-bold outline-none focus:bg-[#F5F5F0] transition-colors" defaultValue="98101" />
                  </div>
                </div>
              </div>

              <div className="mt-auto pt-8">
                <Link href="/orders" className="w-full flex items-center justify-between h-16 bg-black text-white px-8 font-black uppercase tracking-widest hover:bg-[#F5F5F0] hover:text-black border-2 border-transparent hover:border-black transition-colors group">
                  Proceed To Payment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </div>

          {/* RIGHT: SUMMARY */}
          <div className="w-full lg:w-2/5 flex flex-col bg-[#F5F5F0]">
            <div className="p-8 md:p-14 border-b-2 border-black">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 border-b-2 border-black inline-block pb-1">Order Summary</h3>

              <div className="flex flex-col gap-6">
                {/* Item */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-24 border-2 border-black relative bg-gray-100 overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=400&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">1</div>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm uppercase tracking-tight">Monstera Variegata</span>
                    <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">The Rare Archive</span>
                    <span className="font-bold mt-2">₹4,500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-14 flex flex-col gap-4">
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Subtotal</span>
                <span>₹4,500</span>
              </div>
              <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                <span>Shipping</span>
                <span>Calculated at next step</span>
              </div>
              <div className="w-full h-px bg-black my-2" />
              <div className="flex justify-between text-2xl font-black uppercase tracking-tighter">
                <span>Total</span>
                <span>₹4,500</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
