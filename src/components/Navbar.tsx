"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const C = { mint: "#FFFDF5", green: "#50D890", blue: "#4F98CA", dark: "#272727" };

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 py-6 px-6 md:px-12"
      style={{
        background: isScrolled ? "rgba(255,253,245,0.95)" : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.05)" : "none",
      }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center justify-center p-2 pt-1 pb-1">
            <Image src="/logo.png" alt="Logo" width={240} height={80} className="h-12 md:h-16 w-auto object-contain" />
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {[
            { label: "Services",     href: "/#services" },
            { label: "How It Works", href: "/#how-it-works" },
            { label: "For Talents",  href: "/#talents" },
            { label: "For Clients",  href: "/#clients" },
          ].map((link) => (
            <Link key={link.label} href={link.href}
              className="text-sm font-medium transition-colors text-dark/70 hover:text-dark">
              {link.label}
            </Link>
          ))}
          <Link href="/contact" className="btn-primary ml-4">Contact Us</Link>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full px-6 py-8 shadow-xl bg-[#FFFDF5] border-t border-dark/5">
            <div className="flex flex-col gap-6">
              {[
                { label: "Services",     href: "/#services" },
                { label: "How It Works", href: "/#how-it-works" },
                { label: "For Talents",  href: "/#talents" },
                { label: "For Clients",  href: "/#clients" },
              ].map((item) => (
                <Link key={item.label} href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-bold text-dark">
                  {item.label}
                </Link>
              ))}
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="btn-primary w-full justify-center">
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}