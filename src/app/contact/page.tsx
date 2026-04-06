"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";

const C = {
  mint:  "#FFFDF5",
  green: "#50D890",
  blue:  "#4F98CA",
  dark:  "#272727",
  greenDark: "#3CC478",
  blueDark:  "#3A7FAF",
  mintDim:   "#EEF6FF",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-screen pt-32 pb-20 overflow-hidden" style={{ background: C.mint }}>
      
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="px-6 mb-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.8] italic uppercase text-dark mb-8"
          >
            Get In <br />
            <span className="text-blue">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-dark/60 max-w-2xl mx-auto font-bold uppercase tracking-tight"
          >
            Have questions about your Career Readiness Score or need assistance with your career strategy? Our team is here to help you leap forward.
          </motion.p>
        </div>
      </section>

      {/* ─── Main Content ────────────────────────────────────────── */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-dark/30 mb-8 flex items-center gap-3">
                <MessageSquare size={16} className="text-blue" /> Contact Information
              </h4>
              <div className="space-y-8">
                {[
                  { icon: Mail, label: "Email Us", val: "hello@nexthire.io", href: "mailto:hello@nexthire.io" },
                  { icon: Phone, label: "Call Us", val: "+1 (555) NEX-THIRE", href: "tel:+15556398447" },
                  { icon: MapPin, label: "Our Office", val: "77 Digital Plaza, San Francisco, CA", href: "#" },
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    href={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-6 group hover:translate-x-2 transition-transform"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-dark/5 flex items-center justify-center text-blue group-hover:bg-blue group-hover:text-white transition-all">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-dark/30">{item.label}</p>
                      <p className="text-xl font-bold text-dark tracking-tight">{item.val}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-12 border-t border-dark/5">
              <h4 className="text-xs font-bold uppercase tracking-widest text-dark/20 mb-6">Social Channels</h4>
              <div className="flex gap-6">
                {["Instagram", "Facebook", "LinkedIn", "Twitter"].map((s, i) => (
                  <a key={i} href="#" className="text-sm font-black text-dark/40 hover:text-blue transition-colors uppercase tracking-widest leading-none">
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-dark/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px] opacity-20" style={{ background: C.blue }} />
            
            <form className="relative z-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-4">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-mint/50 border-2 border-dark/5 rounded-[2rem] px-8 py-5 text-dark font-bold focus:border-blue outline-none transition-all" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-4">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-mint/50 border-2 border-dark/5 rounded-[2rem] px-8 py-5 text-dark font-bold focus:border-blue outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-4">Subject</label>
                <div className="relative">
                  <select className="w-full bg-mint/50 border-2 border-dark/5 rounded-[2rem] px-8 py-5 text-dark font-bold focus:border-blue outline-none transition-all appearance-none">
                    <option>Career Assessment Feedback</option>
                    <option>Partnership Inquiry</option>
                    <option>Technical Support</option>
                    <option>General Question</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-widest text-dark/40 ml-4">Your Message</label>
                <textarea rows={5} placeholder="How can we help you?" className="w-full bg-mint/50 border-2 border-dark/5 rounded-[2.5rem] px-8 py-6 text-dark font-bold focus:border-blue outline-none transition-all" />
              </div>

              <button type="submit" className="w-full bg-dark text-white font-black py-6 rounded-[2.5rem] flex items-center justify-center gap-4 hover:scale-[1.02] shadow-2xl transition-all group">
                SEND MESSAGE <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ────────────────────────────────────────── */}
      <section className="mt-32 px-6">
        <div className="max-w-7xl mx-auto bg-blue p-16 rounded-[4rem] text-center text-white relative overflow-hidden group">
          <div className="absolute inset-0 pointer-events-none opacity-20"
            style={{ backgroundImage: `radial-gradient(circle, white 2px, transparent 2px)`, backgroundSize: "40px 40px" }} />
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 transition-transform group-hover:scale-105">
            Not ready to <br /> talk yet?
          </h2>
          <p className="text-white/60 mb-12 font-bold uppercase tracking-widest">Start with our 4-minute assessment.</p>
          <button className="bg-white text-blue font-black px-12 py-6 rounded-full hover:shadow-2xl transition-all text-xl">
            GET YOUR SCORE
          </button>
        </div>
      </section>
    </div>
  );
}
