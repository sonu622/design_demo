"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const C = { mint: "#EFFFFB", green: "#50D890", blue: "#4F98CA", dark: "#272727" };

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-10"
      style={{
        background: isScrolled ? "rgba(239,255,251,0.92)" : "rgba(239,255,251,0.5)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: isScrolled ? `1px solid rgba(80,216,144,0.25)` : "none",
        boxShadow: isScrolled ? `0 4px 20px rgba(80,216,144,0.12)` : "none",
      }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative flex items-center gap-3 group">
          <div className="w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
            <Image src="/logo.png" alt="Logo" width={64} height={64} className="" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Assessment",     href: "#quiz-section" },
            { label: "Motivation",     href: "#motivation" },
            { label: "Career Paths",   href: "#career-paths" },
            // { label: "Resources",      href: "#quiz-section" },
          ].map((link) => (
            <Link key={link.label} href={link.href}
              className="text-[10px] font-bold uppercase tracking-[0.3em] transition-colors"
              style={{ color: `${C.dark}70` }}
              onMouseEnter={e => (e.currentTarget.style.color = C.green)}
              onMouseLeave={e => (e.currentTarget.style.color = `${C.dark}70`)}>
              {link.label}
            </Link>
          ))}
          <button className="btn-primary">Join Program</button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" style={{ color: C.dark }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute top-full left-0 w-full px-8 py-12 shadow-xl"
            style={{ background: "rgba(239,255,251,0.97)", backdropFilter: "blur(20px)",
              borderTop: `1px solid ${C.green}30` }}>
            <div className="flex flex-col gap-8 text-center">
              {[
                { label: "Assessment",   href: "#quiz-section" },
                { label: "Motivation",   href: "#motivation" },
                { label: "Career Paths", href: "#career-paths" },
                // { label: "Resources",    href: "#quiz-section" },
              ].map((item) => (
                <Link key={item.label} href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black uppercase tracking-tighter transition-colors"
                  style={{ color: C.dark }}
                  onMouseEnter={e => (e.currentTarget.style.color = C.green)}
                  onMouseLeave={e => (e.currentTarget.style.color = C.dark)}>
                  {item.label}
                </Link>
              ))}
              <button onClick={() => setMobileMenuOpen(false)} className="btn-primary">
                Start Assessment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}