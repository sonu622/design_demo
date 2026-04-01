"use client";

import React from "react";
import { motion } from "framer-motion";
import { Rocket, Target, Zap } from "lucide-react";

const C = { mint: "#EFFFFB", green: "#50D890", blue: "#4F98CA", dark: "#272727",
  greenDark: "#3CC478", mintDim: "#D6F8F0" };

const cards = [
  {
    title: "Resume Mastery",
    description: "A great resume isn't written — it's engineered. Learn to quantify impact, beat ATS filters, and make recruiters call you first.",
    icon: Target,
    bg: `linear-gradient(135deg, ${C.green}25 0%, ${C.green}12 100%)`,
    iconGrad: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`,
    border: `${C.green}40`,
  },
  {
    title: "Network Power",
    description: "80% of jobs are never posted. Build a referral network that puts your name in the room before the role even opens.",
    icon: Zap,
    bg: `linear-gradient(135deg, ${C.blue}22 0%, ${C.blue}10 100%)`,
    iconGrad: `linear-gradient(135deg, ${C.blue}, #3A7FAF)`,
    border: `${C.blue}40`,
  },
  {
    title: "Career Strategy",
    description: "Stop reacting to job boards. Build a 90-day plan with target companies, outreach cadence, and salary benchmarks that drive results.",
    icon: Rocket,
    bg: `linear-gradient(135deg, ${C.green}18 0%, ${C.blue}14 100%)`,
    iconGrad: `linear-gradient(135deg, ${C.green}, ${C.blue})`,
    border: `${C.green}35`,
  },
];

export default function MotivationSection() {
  return (
    <section id="motivation" className="py-32 px-6 relative overflow-hidden" style={{ background: C.mintDim }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[500px] rounded-full top-[-5%] left-1/2 -translate-x-1/2 opacity-20"
          style={{ background: `radial-gradient(circle, ${C.green}88, transparent 65%)`, filter: "blur(80px)" }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase mb-6"
            style={{ background: `${C.green}18`, border: `1px solid ${C.green}45`, color: C.greenDark }}>
            Mindset & Method
          </span>

          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter leading-[0.85]"
            style={{ color: C.dark }}>
            WHAT GETS YOU <br />
            <span style={{ color: C.green }}>HIRED FASTER</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto font-semibold uppercase tracking-tighter"
            style={{ color: `${C.dark}70` }}>
            Success in today’s job market isn’t luck — it’s a system. Master your resume, network, and strategy to get recurring offers.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-300"
              style={{ background: card.bg, border: `1.5px solid ${card.border}`,
                boxShadow: `0 4px 28px ${C.green}15` }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-lg"
                style={{ background: card.iconGrad }}>
                <card.icon size={30} color={C.dark} />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase tracking-tight" style={{ color: C.dark }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed font-semibold uppercase tracking-tight"
                style={{ color: `${C.dark}65` }}>
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
