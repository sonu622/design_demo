"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const C = { mint: "#EFFFFB", green: "#50D890", blue: "#4F98CA", dark: "#272727",
  greenDark: "#3CC478", mintDim: "#D6F8F0" };

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-10 px-6 overflow-hidden"
      style={{ background: C.dark, borderTop: `2px solid ${C.green}30` }}>

      {/* Decorative glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[300px] rounded-full top-[-10%] left-[-5%] opacity-[0.07]"
          style={{ background: `radial-gradient(circle, ${C.green}, transparent)`, filter: "blur(70px)" }} />
        <div className="absolute w-[400px] h-[300px] rounded-full bottom-0 right-[-5%] opacity-[0.07]"
          style={{ background: `radial-gradient(circle, ${C.blue}, transparent)`, filter: "blur(60px)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center p-2 rotate-2 group-hover:rotate-0 transition-transform"
                style={{ background: `linear-gradient(135deg, ${C.green}, ${C.blue})` }}>
                <Image src="/logo.png" alt="Logo" width={28} height={28} className="object-contain" />
              </div>
              <span className="text-xl font-black uppercase tracking-tighter"
                style={{ color: C.mint }}>
                CAREER<span style={{ color: C.green }}>EDGE</span>
              </span>
            </Link>
            <p className="text-sm font-medium max-w-sm mb-8 leading-relaxed"
              style={{ color: `${C.mint}60` }}>
              The only assessment you need to transition from where you are to where you belong.
            </p>
            <div className="flex gap-3">
              {["F", "T", "L", "I"].map((social, i) => (
                <div key={i}
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-black text-[10px] cursor-pointer transition-all hover:scale-110"
                  style={{ background: `${C.mint}08`, border: `1px solid ${C.mint}15`,
                    color: `${C.mint}70` }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = C.green;
                    (e.currentTarget as HTMLElement).style.color = C.dark; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = `${C.mint}08`;
                    (e.currentTarget as HTMLElement).style.color = `${C.mint}70`; }}>
                  {social}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <div className="p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden"
              style={{ background: `rgba(80,216,144,0.08)`, border: `1px solid ${C.green}30`,
                boxShadow: `0 4px 24px ${C.green}10` }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2"
                style={{ background: C.green }} />
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight" style={{ color: C.mint }}>
                Evolving Success
              </h3>
              <p className="text-xs font-medium mb-8 tracking-widest leading-loose max-w-sm"
                style={{ color: `${C.mint}60` }}>
                Get monthly insights from career architects straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="email" placeholder="YOUR@EMAIL.COM"
                  className="flex-1 rounded-xl px-5 py-4 text-[10px] font-bold uppercase tracking-widest outline-none transition-colors"
                  style={{ background: `${C.mint}08`, border: `1px solid ${C.green}30`,
                    color: C.mint }}
                />
                <button className="btn-primary whitespace-nowrap text-[9px]">Subscribe</button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6"
          style={{ borderTop: `1px solid ${C.mint}10` }}>
          <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-center md:text-left"
            style={{ color: `${C.mint}30` }}>
            © 2026 CAREER EDGE | BUILT FOR THE NEXT GENERATION PROFESSIONAL
          </p>
          <div className="flex gap-8">
            {["Terms", "Privacy", "Security"].map((link) => (
              <Link key={link} href="#"
                className="text-[9px] font-bold uppercase tracking-[0.2em] transition-colors"
                style={{ color: `${C.mint}30` }}
                onMouseEnter={e => (e.currentTarget.style.color = C.green)}
                onMouseLeave={e => (e.currentTarget.style.color = `${C.mint}30`)}>
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
