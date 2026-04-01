"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, ChevronRight, Play, Star, Users, Rocket, Briefcase, Brain, Globe } from "lucide-react";
import Quiz from "../components/Quiz";
import MotivationSection from "../components/MotivationSection";

/* ─── Theme ─────────────────────────────────────────────────────
   #EFFFFB  Mint White  — backgrounds
   #50D890  Green       — CTAs, highlights
   #4F98CA  Blue        — cards, secondary
   #272727  Charcoal    — text, dark sections
──────────────────────────────────────────────────────────────── */

const C = {
  mint:  "#EFFFFB",
  green: "#50D890",
  blue:  "#4F98CA",
  dark:  "#272727",
  greenDark: "#3CC478",
  blueDark:  "#3A7FAF",
  mintDim:   "#D6F8F0",
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
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-28 overflow-hidden"
        style={{ background: `linear-gradient(145deg, ${C.mint} 0%, #D8F8F0 45%, #D4EEFF 100%)` }}>

        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[700px] h-[700px] rounded-full top-[-15%] left-[-12%] opacity-40"
            style={{ background: `radial-gradient(circle, ${C.green}55, transparent 65%)`, filter: "blur(90px)", animation: "blob-pulse 16s ease-in-out infinite" }} />
          <div className="absolute w-[600px] h-[600px] rounded-full top-[10%] right-[-12%] opacity-35"
            style={{ background: `radial-gradient(circle, ${C.blue}55, transparent 65%)`, filter: "blur(80px)", animation: "blob-pulse 20s ease-in-out infinite 3s" }} />
          <div className="absolute w-[450px] h-[450px] rounded-full bottom-[-5%] left-[30%] opacity-30"
            style={{ background: `radial-gradient(circle, ${C.green}40, transparent 65%)`, filter: "blur(70px)", animation: "blob-pulse 13s ease-in-out infinite 6s" }} />
          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.035]"
            style={{ backgroundImage: `radial-gradient(circle, ${C.dark} 1px, transparent 1px)`, backgroundSize: "36px 36px" }} />
        </div>

        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 pt-10">

          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full mb-10 shadow-sm"
            style={{ background: "rgba(80,216,144,0.12)", border: `1.5px solid ${C.green}60` }}>
            <span className="w-2 h-2 rounded-full" style={{ background: C.green, boxShadow: `0 0 8px ${C.green}`, animation: "pulse 2s infinite" }} />
            <span className="text-[10px] font-bold tracking-[0.35em] uppercase" style={{ color: C.greenDark }}>
              Free 8-Question Career Readiness Assessment
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            className="text-7xl md:text-9xl lg:text-[9rem] font-black tracking-tighter mb-8 leading-[0.85] uppercase"
            style={{ color: C.dark }}>
            OWN YOUR <br />
            <span style={{ color: C.green, filter: `drop-shadow(0 0 28px ${C.green}60)` }}>CAREER PATH</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-14 max-w-3xl mx-auto leading-relaxed font-semibold uppercase tracking-tight"
            style={{ color: `${C.dark}80` }}>
            Discover exactly where your resume, network, interview skills, and career strategy stand — then fix the gaps fast.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            {!showQuiz ? (
              <>
                <button onClick={scrollToQuiz}
                  className="flex items-center gap-3 font-black text-sm uppercase tracking-[0.25em] transition-all hover:scale-[1.04] active:scale-[0.97] group"
                  style={{ background: C.green, color: C.dark, padding: "1.1rem 3rem", borderRadius: "9999px",
                    boxShadow: `0 8px 30px ${C.green}55` }}>
                  Initiate Assessment
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="flex items-center gap-3 font-bold text-sm uppercase tracking-[0.2em] transition-all hover:scale-[1.02]"
                  style={{ background: `${C.blue}18`, color: C.dark, padding: "1.1rem 3rem", borderRadius: "9999px",
                    border: `1.5px solid ${C.blue}55` }}>
                  <Play size={17} style={{ color: C.blue }} fill="currentColor" />
                  Methodology
                </button>
              </>
            ) : (
              <a href="#quiz-section" style={{ color: C.green }}
                className="flex items-center gap-3 font-black uppercase tracking-[0.4em] text-sm animate-bounce">
                PROCEED TO PROTOCOL <ArrowRight size={22} />
              </a>
            )}
          </motion.div>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-5">
            <div className="flex -space-x-2.5">
              {[`${C.green}99`, `${C.blue}99`, `${C.green}CC`, `${C.blue}CC`].map((c, i) => (
                <div key={i} className="w-9 h-9 rounded-full border-2 shadow-sm"
                  style={{ background: c, borderColor: C.mint, zIndex: 4 - i }} />
              ))}
            </div>
            <p className="text-sm" style={{ color: `${C.dark}70` }}>
              <span className="font-bold" style={{ color: C.dark }}>25,000+</span>{" professionals assessed \u00A0·\u00A0"}
              <span className="inline-flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={C.green} stroke="none" />)}
                <span className="font-bold ml-1" style={{ color: C.dark }}>4.9</span>
              </span>
            </p>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-7 h-12 rounded-full border-2 flex justify-center pt-2.5"
            style={{ borderColor: `${C.green}60` }}>
            <div className="w-1.5 h-2.5 rounded-full" style={{ background: C.green }} />
          </div>
        </motion.div>
      </section>

      {/* ─── TRUST BAR ─────────────────────────────────────────────── */}
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.green}50 30%, ${C.blue}50 70%, transparent)` }} />
      <div className="py-5 px-6" style={{ background: C.mintDim }}>
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-2">
          {["Resume & ATS Optimisation", "Interview Prep Frameworks", "Salary Negotiation Tactics", "LinkedIn & Personal Branding"].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <CheckCircle2 size={12} style={{ color: C.green }} />
              <span className="text-xs font-semibold tracking-wide" style={{ color: `${C.dark}80` }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.blue}40 30%, ${C.green}40 70%, transparent)` }} />

      {/* ─── QUIZ SECTION ──────────────────────────────────────────── */}
      <section id="quiz-section" className="py-32 px-6 relative overflow-hidden" style={{ background: C.mint }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full top-[-10%] right-[-8%] opacity-25"
            style={{ background: `radial-gradient(circle, ${C.blue}88, transparent 70%)`, filter: "blur(80px)" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-[-5%] left-[-5%] opacity-20"
            style={{ background: `radial-gradient(circle, ${C.green}88, transparent 70%)`, filter: "blur(70px)" }} />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {showQuiz ? (
              <motion.div key="quiz" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.6 }}>
                <Quiz />
              </motion.div>
            ) : (
              <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center p-16 rounded-[3rem] relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${C.blue}22 0%, ${C.blue}12 100%)`,
                  border: `1.5px solid ${C.blue}45`, boxShadow: `0 20px 60px ${C.blue}20` }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${C.green}, transparent)`, transform: "translate(30%,-30%)", filter: "blur(40px)" }} />

                <div className="w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl"
                  style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})` }}>
                  <CheckCircle2 size={44} color={C.dark} />
                </div>

                <h2 className="text-4xl md:text-7xl font-black mb-6 uppercase tracking-tighter"
                  style={{ color: C.dark }}>
                  Career <br />
                  <span style={{ color: C.blue }}>Assessment</span>
                </h2>
                <p className="text-lg mb-10 max-w-xl mx-auto font-semibold tracking-tight uppercase"
                  style={{ color: `${C.dark}70` }}>
                  8 targeted questions. 5 minutes. A clear picture of your resume, network, interview readiness, and career strategy.
                </p>
                <button onClick={() => setShowQuiz(true)} className="btn-primary">
                  Begin Assessment
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ─── MOTIVATION ────────────────────────────────────────────── */}
      <MotivationSection />

      {/* ─── BEYOND LIMITATION ─────────────────────────────────────── */}
      <section id="career-paths" className="py-32 px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(170deg, ${C.mintDim} 0%, ${C.mint} 100%)` }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[450px] h-[450px] rounded-full bottom-0 left-[-5%] opacity-25"
            style={{ background: `radial-gradient(circle, ${C.green}66, transparent)`, filter: "blur(70px)" }} />
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
              style={{ background: `${C.green}18`, border: `1px solid ${C.green}50`, color: C.greenDark }}>
              Beyond Limitation
            </span>
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[0.85] uppercase tracking-tighter"
              style={{ color: C.dark }}>
              YOUR CAREER <br />
              <span style={{ color: C.blue }}>TOOLKIT</span>
            </h2>
            <p className="text-xl mb-12 leading-relaxed font-semibold uppercase tracking-tight max-w-md"
              style={{ color: `${C.dark}60` }}>
              Most professionals guess their way through job searches. We give you a data-driven plan — from resume to offer letter.
            </p>
            <div className="grid grid-cols-1 gap-5">
              {[
                { title: "Resume & Interviews", desc: "ATS-optimised templates and STAR-method interview coaching.", icon: Briefcase },
                { title: "Job Search Strategy", desc: "Targeted company lists, cold outreach scripts, and recruiter tactics.", icon: Rocket },
              ].map((item, i) => (
                <motion.div key={i} whileHover={{ x: 6 }}
                  className="flex gap-6 p-7 rounded-2xl transition-all group"
                  style={{ background: "rgba(255,255,255,0.7)", border: `1px solid ${C.green}30`,
                    boxShadow: `0 4px 20px ${C.green}15` }}>
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform"
                    style={{ background: `linear-gradient(135deg, ${C.green}40, ${C.blue}40)` }}>
                    <item.icon size={26} style={{ color: C.dark }} />
                  </div>
                  <div>
                    <h4 className="font-black text-lg mb-1 uppercase tracking-tight" style={{ color: C.dark }}>{item.title}</h4>
                    <p className="text-sm font-semibold uppercase tracking-widest" style={{ color: `${C.dark}60` }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonial */}
          <motion.div initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="relative rounded-[3rem] overflow-hidden shadow-2xl p-[2px]"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.blue})` }}>
            <div className="rounded-[2.8rem] min-h-[480px] flex flex-col justify-between overflow-hidden relative p-10"
              style={{ background: `linear-gradient(160deg, ${C.mint} 0%, #E0F8F0 100%)` }}>
              <Image src="/hero-bg.png" alt="Background" fill className="object-cover opacity-[0.04] grayscale" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex gap-2 mb-6">
                  {[C.green, C.blue, `${C.green}80`].map((c, i) => (
                    <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <div className="flex-grow flex flex-col justify-center py-4">
                  <div className="text-7xl leading-none mb-3 select-none font-black" style={{ color: `${C.green}60` }}>&ldquo;</div>
                  <p className="text-xl leading-snug mb-8 font-semibold" style={{ color: C.dark }}>
                    The protocol revealed structural weaknesses in my career plan I hadn&apos;t considered.
                    Essential for any serious builder.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold"
                      style={{ background: `linear-gradient(135deg, ${C.green}, ${C.blue})`, color: C.dark }}>JD</div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: C.dark }}>John Doe</p>
                      <p className="text-xs mt-0.5" style={{ color: `${C.dark}60` }}>Lead Architect @ Meta</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {[...Array(5)].map((_, i) => <Star key={i} size={13} fill={C.green} stroke="none" />)}
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 grid grid-cols-3 gap-4"
                  style={{ borderTop: `1px solid ${C.green}30` }}>
                  {[{ val: "98%", label: "Success Rate" }, { val: "4.9★", label: "Rating" }, { val: "25k+", label: "Users" }].map((s, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-black" style={{ color: C.blue }}>{s.val}</div>
                      <div className="text-xs mt-0.5" style={{ color: `${C.dark}60` }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─────────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: C.dark }}>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-80 h-80 rounded-full top-[-10%] left-[10%] opacity-10"
            style={{ background: `radial-gradient(circle, ${C.green}, transparent)`, filter: "blur(60px)" }} />
          <div className="absolute w-64 h-64 rounded-full bottom-[-10%] right-[10%] opacity-10"
            style={{ background: `radial-gradient(circle, ${C.blue}, transparent)`, filter: "blur(50px)" }} />
        </div>
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center relative z-10">
          {[
            { label: "Professionals Assessed", value: "25k+", icon: Users,  color: C.green },
            { label: "Got Interviews ≤30 Days",  value: "78%",  icon: Rocket, color: C.blue },
            { label: "Avg. Salary Increase",     value: "$18k", icon: Brain,  color: C.green },
            { label: "Countries Served",         value: "42+",  icon: Globe,  color: C.blue },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }} className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform"
                style={{ background: `${stat.color}22`, border: `1px solid ${stat.color}44` }}>
                <stat.icon size={28} style={{ color: stat.color }} />
              </div>
              <div className="text-5xl font-black" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs font-semibold tracking-widest uppercase" style={{ color: `${C.mint}70` }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── CTA ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${C.blue}18 0%, ${C.green}12 100%)`, borderTop: `1px solid ${C.green}25` }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full top-[-10%] right-[-5%] opacity-20"
            style={{ background: `radial-gradient(circle, ${C.blue}, transparent 70%)`, filter: "blur(80px)" }} />
          <div className="absolute w-[400px] h-[400px] rounded-full bottom-[-5%] left-[5%] opacity-20"
            style={{ background: `radial-gradient(circle, ${C.green}, transparent 70%)`, filter: "blur(70px)" }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-8"
            style={{ background: `${C.green}18`, border: `1px solid ${C.green}40`, color: C.greenDark }}>
            Take Control
          </span>
          <motion.h2 initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black mb-6 leading-[0.85] uppercase tracking-tighter"
            style={{ color: C.dark }}>
            LAND YOUR <br />
            <span style={{ color: C.blue }}>DREAM ROLE</span>
          </motion.h2>
          <p className="text-lg mb-12 leading-relaxed font-semibold uppercase tracking-tight"
            style={{ color: `${C.dark}70` }}>
            Take the free 8-question assessment, get your career readiness score, and receive a personalised action plan in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={scrollToQuiz} className="btn-primary flex items-center justify-center gap-3">
              Start Protocol Now <ArrowRight size={18} />
            </button>
            <button className="btn-secondary">Learn More</button>
          </div>
          <p className="text-xs mt-8 flex items-center justify-center gap-2" style={{ color: `${C.dark}60` }}>
            <CheckCircle2 size={13} style={{ color: C.green }} />
            Free assessment · No credit card required · Results in 5 minutes
          </p>
        </div>
      </section>

    </div>
  );
}
