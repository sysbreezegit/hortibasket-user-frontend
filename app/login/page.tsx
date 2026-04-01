"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <main className="min-h-screen bg-[#F5F5F0] text-black font-sans selection:bg-black selection:text-white flex items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white border-2 border-black flex flex-col lg:flex-row shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] min-h-[600px] overflow-hidden">
        
        {/* LEFT / TOP: FORM */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-black">
          
          <div className="flex items-center gap-2 mb-10 text-[10px] font-bold uppercase tracking-widest">
            <Lock size={14} className="fill-black" />
            <span>Secure Access</span>
          </div>

          <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">
            {isLogin ? "Initialize" : "Register"}
          </h1>
          <p className="font-bold text-xs uppercase tracking-widest text-gray-500 mb-10">
            {isLogin ? "Access your botanical records." : "Join the green guild network."}
          </p>

          <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); window.location.href = '/orders'; }}>
            {!isLogin && (
              <div className="flex flex-col gap-2">
                <label className="font-bold text-[10px] uppercase tracking-widest">Full Name</label>
                <input type="text" placeholder="John Doe" className="h-14 border-2 border-black bg-[#F5F5F0] px-4 font-bold outline-none focus:bg-white transition-colors" />
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[10px] uppercase tracking-widest">Email Address</label>
              <input type="email" placeholder="example@domain.com" defaultValue="test@user.com" className="h-14 border-2 border-black bg-[#F5F5F0] px-4 font-bold outline-none focus:bg-white transition-colors" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-[10px] uppercase tracking-widest">Password</label>
              <input type="password" placeholder="••••••••" defaultValue="password123" className="h-14 border-2 border-black bg-[#F5F5F0] px-4 font-bold outline-none focus:bg-white transition-colors" />
            </div>

            <button type="submit" className="w-full h-16 bg-black text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-colors group mt-4">
              {isLogin ? "Authenticate" : "Create Account"} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center text-xs font-bold uppercase tracking-widest flex justify-center gap-2">
            <span className="text-gray-500">{isLogin ? "New user?" : "Already registered?"}</span>
            <button onClick={() => setIsLogin(!isLogin)} className="border-b-2 border-black hover:bg-black hover:text-white transition-colors">
              {isLogin ? "Create one." : "Login here."}
            </button>
          </div>
        </div>

        {/* RIGHT / BOTTOM: ART */}
        <div className="w-full lg:w-1/2 relative bg-black hidden sm:flex flex-col justify-between p-12 text-white overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1598880940080-c8f9fa4693b4?q=80&w=1200&auto=format&fit=crop" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 scale-105" 
          />
          <div className="relative z-10 text-[10px] font-bold uppercase tracking-widest border-l-4 border-white pl-4 mb-4">
            Vol. MMXVI<br/>System Live
          </div>
          <div className="relative z-10 mt-auto border-t-2 border-white pt-8">
             <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9]">
               Preserve<br/>Nature's<br/>Architecture.
             </h2>
          </div>
        </div>

      </div>
    </main>
  );
}
