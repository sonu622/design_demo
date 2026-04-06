"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Play, Star, Users, Rocket, Briefcase, Brain, Globe, X } from "lucide-react";
import Quiz from "../components/Quiz";
import MotivationSection from "../components/MotivationSection";

/* ─── Theme ─────────────────────────────────────────────────────
   #EFFFFB  Mint White  — backgrounds
   #50D890  Green       — CTAs, highlights
   #4F98CA  Blue        — cards, secondary
   #272727  Charcoal    — text, dark sections
──────────────────────────────────────────────────────────────── */

const C = {
  mint:  "#FFFDF5",
  green: "#50D890",
  blue:  "#4F98CA",
  dark:  "#272727",
  greenDark: "#3CC478",
  blueDark:  "#3A7FAF",
  mintDim:   "#EEF6FF",
};

export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  const scrollToQuiz = () => {
    setShowQuiz(true);
    setTimeout(() => document.getElementById("quiz-section")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  return (
    <div className="flex flex-col w-full overflow-hidden" style={{ background: C.mint }}>

      {/* ─── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden" style={{ background: C.mint }}>
        
        {/* Decorative elements behind hero */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[800px] h-[800px] rounded-full top-[-20%] right-[-10%] opacity-[0.03]"
            style={{ backgroundImage: `radial-gradient(circle, ${C.dark} 2px, transparent 2px)`, backgroundSize: "32px 32px" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full top-[10%] left-[20%] opacity-10"
            style={{ background: `radial-gradient(circle, ${C.blue}30, transparent 70%)`, filter: "blur(60px)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start pt-12 lg:pt-0">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="text-7xl md:text-8xl lg:text-[7.5rem] font-bold leading-[0.9] tracking-tighter text-dark mb-8">
              Unlock Your <br />
              <div className="flex items-center gap-4">
                <span className="text-dark/40 italic font-medium text-4xl lg:text-5xl ml-2">Career</span>
                <span className="relative">
                  Potential
                  <div className="absolute -top-6 -right-6 w-12 h-12 rounded-full bg-blue flex items-center justify-center rotate-12 shadow-lg">
                    <Rocket size={24} className="text-white" />
                  </div>
                </span>
              </div>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-lg text-dark/60 max-w-md mb-12 leading-relaxed">
              Are you secretly underplaying your career potential? Get your "Career Readiness Score" in 4 minutes and reveal if you're coasting or ready to leap.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
              className="flex items-center gap-4">
              <button onClick={scrollToQuiz} className="btn-primary py-5 px-10 text-lg rounded-full">
                Get Your Score <ArrowRight className="ml-2" />
              </button>
            </motion.div>
          </div>

          {/* Right: Person & Floating Cards */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
              className="relative w-full max-w-[480px]">
              {/* Image Container */}
              <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                <Image src="/professional-hero.png" alt="Candidate" fill className="object-cover" priority />
              </div>

              {/* Floating Card: Companies Joined */}
              <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-12 top-1/4 z-20 bg-blue p-5 rounded-3xl shadow-2xl text-white min-w-[140px]">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 mb-1">Companies Joined</p>
                <p className="text-3xl font-bold">500+</p>
              </motion.div>

              {/* Floating Card: Apply Easily */}
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 bottom-12 z-20 bg-white p-5 rounded-3xl shadow-xl border border-dark/5 min-w-[180px]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center">
                    <Rocket size={20} className="text-blue" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-dark">Apply Easily</p>
                    <p className="text-[9px] text-dark/50">Grow Your Career Daily</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── TRUST BAR (Simplified) ─────────────────────────────────── */}
      <div className="py-2 px-6 border-b border-dark/5" style={{ background: C.mint }}>
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-12 py-4">
          <span className="text-dark/20 font-black text-2xl tracking-widest uppercase">NextHire</span>
          <div className="h-4 w-px bg-dark/10" />
          <span className="text-dark/20 font-black text-2xl tracking-widest uppercase italic">TalentX</span>
          <div className="h-4 w-px bg-dark/10" />
          <span className="text-dark/20 font-black text-2xl tracking-widest uppercase">CareerEdge</span>
        </div>
      </div>

      {/* ─── EXPLORE OPPORTUNITIES ──────────────────────────────────── */}

      {/* ─── CONNECTING PEOPLE (TEAM VISUALS) ────────────────────────── */}
      <section className="py-32 px-6 border-t border-dark/5" style={{ background: C.mint }}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          
          {/* Left: Team Photo */}
          <div className="lg:col-span-6">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative aspect-[4/3] rounded-[4rem] overflow-hidden shadow-[0_32px_80px_rgba(39,39,39,0.1)]">
              <Image src="/team-collaboration.png" alt="Team Discussion" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 to-transparent" />
            </motion.div>
          </div>

          {/* Right: Content & Stats */}
          <div className="lg:col-span-6 flex flex-col gap-10">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-6xl font-bold text-dark mb-8 tracking-tighter leading-tight italic uppercase">
                Connecting People <br /> 
                <span className="text-blue">With Purpose</span>
              </h2>
              <p className="text-xl text-dark/60 leading-relaxed font-medium mb-8">
                We bridge the gap between world-class talent and industry-leading employers. 
                Our platform isn't just about jobs — it's about the right match, at the right time.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 gap-8">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className="bg-white p-10 rounded-[3rem] shadow-xl border border-dark/5 overflow-hidden group">
                <p className="text-6xl font-black mb-2 text-blue group-hover:scale-110 transition-transform origin-left">92%</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark/30">Success Rate</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                className="bg-dark text-white p-10 rounded-[3rem] shadow-2xl overflow-hidden group">
                <p className="text-6xl font-black mb-2 text-green group-hover:scale-110 transition-transform origin-left">50K</p>
                <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/30">Opportunities</p>
              </motion.div>
            </div>
            
            <button onClick={scrollToQuiz} className="btn-primary w-fit px-12 py-5 rounded-full text-lg shadow-2xl mt-4">
              Join The Network <ChevronRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>



      {/* ─── STEP-BY-STEP GUIDE ─────────────────────────────────────── */}
      <section id="how-it-works" className="py-32 px-6" style={{ background: C.mint }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center text-dark mb-24 tracking-tighter">
            A Step-By-Step Guide To How Our Job <br /> Platform Works For You
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Search Jobs", desc: "Browse thousands of roles and take the next step in your career.", icon: Globe },
              { title: "Apply Easily", desc: "Easily submit your applications and get closer to your dream job.", icon: Briefcase },
              { title: "Get Hired", desc: "Take the next step toward landing your dream career.", icon: Rocket },
            ].map((step, i) => (
              <div key={i} className="bg-white p-12 rounded-[3.5rem] shadow-lg border border-dark/5 text-center group hover:scale-[1.02] transition-all">
                <div className="w-20 h-20 rounded-[2.5rem] bg-mint flex items-center justify-center mx-auto mb-8 shadow-sm group-hover:scale-110 transition-transform">
                  <step.icon size={32} className="text-blue" />
                </div>
                <h4 className="text-2xl font-bold text-dark mb-4">{step.title}</h4>
                <p className="text-sm text-dark/40 leading-relaxed font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── READY TO TAKE THE NEXT STEP (VIDEO BACKGROUND) ───────────── */}
      <section className="relative py-40 px-6 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover z-0 grayscale-[0.2] brightness-50">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-business-man-walking-along-a-glass-wall-25807-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark/40 backdrop-blur-[1px] z-10" />
        
        <div className="relative z-20 max-w-5xl mx-auto text-center">
           <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
             <h2 className="text-7xl md:text-[9rem] font-black text-white mb-8 tracking-tighter leading-[0.8] italic uppercase drop-shadow-2xl">
               READY FOR <br />
               <span className="text-blue/80 shimmer">BEYOND?</span>
             </h2>
             <p className="text-xl text-white/60 mb-12 max-w-xl mx-auto font-bold uppercase tracking-tight">
               Your career isn't just a job. It's a series of strategic leaps. Take yours today.
             </p>
             <button onClick={scrollToQuiz} className="bg-white text-dark font-black px-12 py-6 rounded-full hover:scale-105 transition-transform text-xl shadow-[0_0_50px_rgba(255,255,255,0.2)]">
               GET YOUR SCORE NOW
             </button>
           </motion.div>
        </div>
      </section>

      {/* ─── ASSESSMENT (HIDDEN BY DEFAULT) ────────────────────────── */}
      <AnimatePresence>
        {showQuiz && (
          <section id="quiz-section" className="fixed inset-0 z-[100] bg-dark/40 backdrop-blur-xl overflow-y-auto pt-10 pb-20 px-6">
            <div className="max-w-5xl mx-auto relative z-10">
              <motion.div key="quiz" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }} className="bg-[#FFFDF5] rounded-[4rem] shadow-2xl border border-dark/10 overflow-hidden">
                <div className="flex justify-between items-center p-8 border-b border-dark/5 bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue flex items-center justify-center text-white">
                      <Rocket size={18} />
                    </div>
                    <h2 className="text-xl font-bold text-dark tracking-tighter">CAREER READINESS PROTOCOL <span className="text-blue/40 ml-2">v1.2</span></h2>
                  </div>
                  <button onClick={() => setShowQuiz(false)} className="bg-dark text-white p-3 rounded-full hover:scale-105 transition-transform">
                    <X size={20} />
                  </button>
                </div>
                <Quiz />
              </motion.div>
            </div>
          </section>
        )}
      </AnimatePresence>
    </div>
  );
}
