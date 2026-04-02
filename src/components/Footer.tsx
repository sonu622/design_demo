"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";

export default function Footer() {
  return (
    <footer className="pt-20 pb-8 px-6 bg-[#272727] text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-8 group cursor-pointer">
              <div className="flex items-center justify-center py-1 h-10 w-auto">
              <Image src="/logo.png" alt="Logo" width={120} height={40} className="h-full w-auto invert brightness-200" />
            </div>
            </div>
            <p className="text-white/40 text-lg leading-relaxed max-w-sm mb-10">
              NextHire is your gateway to endless career opportunities. Discover tailored job matches, connect with top employers.
            </p>
            <button className="bg-white text-dark font-bold px-8 py-4 rounded-2xl flex items-center gap-3 hover:scale-105 transition-transform text-[#272727]">
              Post A Job <ArrowRight size={20} />
            </button>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8">Quick Links</h4>
              <ul className="flex flex-col gap-4">
                {["About Us", "Services", "How It Works", "For Talents", "For Clients"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-white/60 hover:text-white transition-colors font-medium">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-white/30 mb-8">For Companies</h4>
              <ul className="flex flex-col gap-4">
                {["Employers", "Post Job", "Pricing", "Blog"].map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-white/60 hover:text-white transition-colors font-medium">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
            {/* Call To Action in Footer */}
            <div className="flex flex-col items-start md:items-end">
              <button className="relative group text-left md:text-right">
                <div className="bg-white p-6 rounded-full shadow-2xl transition-all group-hover:scale-110 ml-auto mr-0">
                  <ArrowRight size={32} className="text-[#272727] -rotate-45 group-hover:rotate-0 transition-transform" />
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold">Call NextHire</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Socials & Rights */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-8">
            {["Instagram", "Facebook", "LinkedIn", "Twitter"].map((social) => (
              <Link key={social} href="#" className="text-sm font-bold text-white/40 hover:text-white transition-colors">
                {social}
              </Link>
            ))}
          </div>
          <p className="text-sm text-white/20 font-medium">© 2026 NextHire All Rights Reserved</p>
          <div className="flex items-center gap-2">
             <div className="flex -space-x-2">
                {[1,2,3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-[#272727] bg-white/10" />)}
             </div>
             <button className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                <Plus size={14} />
             </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
