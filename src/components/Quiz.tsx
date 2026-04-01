"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, ChevronRight, RefreshCcw, Trophy } from "lucide-react";

/* ─── Theme ─────────────────────────────────────────────
   #EFFFFB  Mint    — backgrounds
   #50D890  Green   — CTAs, selected, progress
   #4F98CA  Blue    — secondary accents
   #272727  Dark    — text
────────────────────────────────────────────────────────── */
const C = {
  mint:      "#EFFFFB",
  green:     "#50D890",
  blue:      "#4F98CA",
  dark:      "#272727",
  greenDark: "#3CC478",
  mintDim:   "#D6F8F0",
};

const questions = [
  {
    id: 1,
    question: "How would you rate the current state of your resume / CV?",
    options: [
      { text: "ATS-optimised, quantified results, updated this month", score: 4 },
      { text: "Solid draft — needs a few tweaks", score: 3 },
      { text: "Outdated or missing key achievements", score: 2 },
      { text: "No resume ready at all", score: 1 },
    ],
  },
  {
    id: 2,
    question: "How strong is your professional network in your target field?",
    options: [
      { text: "Robust — I get referrals and warm introductions regularly", score: 4 },
      { text: "Growing — I attend events and connect on LinkedIn actively", score: 3 },
      { text: "Thin — mostly former classmates or colleagues", score: 2 },
      { text: "Non-existent — I have not invested in networking", score: 1 },
    ],
  },
  {
    id: 3,
    question: "How prepared are you for a technical or behavioural interview tomorrow?",
    options: [
      { text: "Fully prepared — practised STAR answers, mock interviews done", score: 4 },
      { text: "Mostly ready — know the concepts, need more rehearsal", score: 3 },
      { text: "Partially ready — I would wing the behavioural sections", score: 2 },
      { text: "Not ready — interviews make me anxious and I avoid them", score: 1 },
    ],
  },
  {
    id: 4,
    question: "Which best describes your current skill-development habit?",
    options: [
      { text: "10+ hours/week — actively pursuing certifications and projects", score: 4 },
      { text: "5–10 hours/week — steady learning through courses or side work", score: 3 },
      { text: "1–5 hours/week — occasional videos or articles", score: 2 },
      { text: "Zero — I rely only on experience gained at work", score: 1 },
    ],
  },
  {
    id: 5,
    question: "How clear is your job-search strategy right now?",
    options: [
      { text: "Crystal clear — target companies listed, outreach scheduled", score: 4 },
      { text: "Pretty clear — I know the roles I want but no structured plan", score: 3 },
      { text: "Vague — I mostly scroll job boards and apply randomly", score: 2 },
      { text: "None — I am not actively searching or planning", score: 1 },
    ],
  },
  {
    id: 6,
    question: "How confident are you negotiating salary and benefits?",
    options: [
      { text: "Very confident — I research market rates and always negotiate", score: 4 },
      { text: "Somewhat confident — I negotiate but feel nervous", score: 3 },
      { text: "Rarely negotiate — I usually accept the first offer", score: 2 },
      { text: "Never negotiate — I fear losing the offer", score: 1 },
    ],
  },
  {
    id: 7,
    question: "How visible is your personal brand online (LinkedIn, portfolio, GitHub, etc.)?",
    options: [
      { text: "Strong — I publish content and recruiters reach out to me", score: 4 },
      { text: "Active — profile is complete and I engage regularly", score: 3 },
      { text: "Minimal — profile exists but rarely updated", score: 2 },
      { text: "Invisible — I have no meaningful online presence", score: 1 },
    ],
  },
  {
    id: 8,
    question: "Do you have a written 5-year career plan with milestones?",
    options: [
      { text: "Yes — detailed plan with quarterly checkpoints", score: 4 },
      { text: "Partially — a rough vision but no formal milestones", score: 3 },
      { text: "In my head only — nothing written down", score: 2 },
      { text: "No — I take it one day at a time", score: 1 },
    ],
  },
];

const getResult = (answers: number[]) => {
  const total = answers.reduce((a, b) => a + (b || 0), 0);
  // 8 questions × max 4 pts = 32 pts total
  if (total >= 26) return {
    title: "Career Architect",
    description: "You are operating at an elite level. Your resume, network, interview skills, and long-term vision are all sharp. Keep compounding your edge and target the next level role.",
    accent: C.green,
    cta: "Scale Your Impact →",
  };
  if (total >= 18) return {
    title: "Career Ready",
    description: "You have strong foundations but a few gaps holding you back — likely around salary negotiation, online visibility, or structured job-search strategy. Close those gaps now.",
    accent: C.blue,
    cta: "Refine Your Plan →",
  };
  if (total >= 10) return {
    title: "Building Momentum",
    description: "You have potential but your career toolkit needs significant attention. Prioritise your resume, LinkedIn profile, and building a targeted company list before your next move.",
    accent: C.blue,
    cta: "Build Your Roadmap →",
  };
  return {
    title: "Starting Line",
    description: "Your career readiness needs foundational work. Start with the basics: an updated resume, a complete LinkedIn profile, and a clear idea of the role you want next.",
    accent: C.green,
    cta: "Get the Starter Guide →",
  };
};

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers]         = useState<number[]>([]);
  const [isFinished, setIsFinished]   = useState(false);
  const [isLoaded, setIsLoaded]       = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("career-quiz-state");
    if (saved) {
      try {
        const { step, answers, finished } = JSON.parse(saved);
        setCurrentStep(step ?? 0);
        setAnswers(answers ?? []);
        setIsFinished(finished ?? false);
      } catch (e) { console.error("Failed to load quiz state", e); }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("career-quiz-state", JSON.stringify({
        step: currentStep, answers, finished: isFinished,
      }));
    }
  }, [currentStep, answers, isFinished, isLoaded]);

  const handleAnswerSelection = (score: number) => {
    const next = [...answers];
    next[currentStep] = score;
    setAnswers(next);
  };

  const handleNext = () => {
    if (answers[currentStep] !== undefined) {
      if (currentStep < questions.length - 1) setCurrentStep(currentStep + 1);
      else setIsFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0); setAnswers([]); setIsFinished(false);
    localStorage.removeItem("career-quiz-state");
  };

  if (!isLoaded) return null;

  /* ─── Results Screen ─────────────────────────────────── */
  if (isFinished) {
    const result = getResult(answers);
    return (
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        style={{ background: C.mint, border: `1.5px solid ${C.green}40`,
          boxShadow: `0 20px 60px ${C.green}20` }}>

        {/* Top accent bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 rounded-t-3xl"
          style={{ background: `linear-gradient(90deg, ${C.green}, ${C.blue})` }} />

        {/* Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-64 h-64 rounded-full opacity-20 pointer-events-none"
          style={{ background: `radial-gradient(circle, ${result.accent}, transparent)`, filter: "blur(50px)" }} />

        {/* Trophy icon */}
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg relative z-10"
          style={{ background: `linear-gradient(135deg, ${C.green}30, ${C.blue}25)`,
            border: `1.5px solid ${result.accent}50` }}>
          <Trophy size={34} style={{ color: result.accent }} />
        </div>

        <p className="text-[9px] font-black tracking-[0.4em] uppercase mb-2 relative z-10"
          style={{ color: C.greenDark }}>Assessment Complete</p>

        <h3 className="text-3xl md:text-5xl font-black mb-4 uppercase tracking-tighter relative z-10"
          style={{ color: C.dark }}>{result.title}</h3>

        <p className="text-sm mb-10 max-w-xl mx-auto leading-relaxed font-semibold uppercase tracking-tight relative z-10"
          style={{ color: `${C.dark}70` }}>
          {result.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative z-10">
          <button className="flex items-center justify-center gap-2 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl px-8 py-4 transition-all hover:scale-105 active:scale-95 shadow-lg group"
            style={{ background: C.green, color: C.dark, boxShadow: `0 6px 24px ${C.green}50` }}>
            {result.cta}
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button onClick={resetQuiz}
            className="flex items-center justify-center gap-2 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl px-8 py-4 transition-all hover:scale-105"
            style={{ background: `${C.blue}15`, color: C.dark, border: `1px solid ${C.blue}40` }}>
            <RefreshCcw size={14} /> Retake
          </button>
        </div>
      </motion.div>
    );
  }

  /* ─── Question Screen ────────────────────────────────── */
  const currentQuestion = questions[currentStep];
  const progress        = ((currentStep + 1) / questions.length) * 100;
  const isAnswered      = answers[currentStep] !== undefined;

  return (
    <div className="rounded-3xl p-6 md:p-10 relative overflow-hidden"
      style={{ background: C.mint, border: `1.5px solid ${C.green}30`,
        boxShadow: `0 16px 50px ${C.green}18` }}>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl"
        style={{ background: `linear-gradient(90deg, ${C.green}, ${C.blue})` }} />

      {/* Background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-15 pointer-events-none -translate-y-1/2 translate-x-1/2"
        style={{ background: `radial-gradient(circle, ${C.blue}, transparent)`, filter: "blur(60px)" }} />

      {/* Header: step counter + progress */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 relative z-10 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black shadow-md text-base"
            style={{ background: `linear-gradient(135deg, ${C.green}, ${C.greenDark})`, color: C.dark }}>
            0{currentStep + 1}
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] mb-0.5"
              style={{ color: `${C.dark}40` }}>Step {currentStep + 1} of {questions.length}</p>
            <p className="text-[10px] font-black uppercase tracking-[0.2em]"
              style={{ color: C.blue }}>Precision Assessment</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full md:w-48">
          <div className="h-2 rounded-full overflow-hidden" style={{ background: `${C.green}20` }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }}
              className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg, ${C.green}, ${C.blue})`,
                boxShadow: `0 0 10px ${C.green}60` }} />
          </div>
          <p className="text-[8px] font-bold mt-1 text-right" style={{ color: `${C.dark}40` }}>
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>

      {/* Question + Options */}
      <AnimatePresence mode="wait">
        <motion.div key={currentStep}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative z-10">

          <h2 className="text-xl md:text-2xl font-black mb-6 leading-tight tracking-tighter uppercase"
            style={{ color: C.dark }}>
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 gap-3 mb-8">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentStep] === option.score;
              return (
                <motion.button key={idx} whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelection(option.score)}
                  className="w-full text-left p-4 rounded-2xl flex items-center justify-between gap-4 transition-all group"
                  style={{
                    background: isSelected ? `${C.green}20` : `rgba(255,255,255,0.6)`,
                    border: `1.5px solid ${isSelected ? C.green : `rgba(80,216,144,0.2)`}`,
                    boxShadow: isSelected ? `0 4px 16px ${C.green}25` : "none",
                  }}>
                  <span className="text-sm font-bold uppercase tracking-tight transition-colors"
                    style={{ color: isSelected ? C.dark : `${C.dark}70` }}>
                    {option.text}
                  </span>
                  <div className="flex items-center gap-2 shrink-0">
                    {isSelected && <CheckCircle2 size={16} style={{ color: C.green }} />}
                    <div className="w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all"
                      style={{ borderColor: isSelected ? C.green : `${C.dark}20`,
                        background: isSelected ? `${C.green}15` : "transparent" }}>
                      {isSelected && <div className="w-2 h-2 rounded-full" style={{ background: C.green }} />}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Footer nav */}
          <div className="flex flex-row gap-4 items-center justify-between pt-4"
            style={{ borderTop: `1px solid ${C.green}20` }}>
            <button onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="flex items-center gap-2 font-black uppercase tracking-[0.3em] text-[10px] transition-all disabled:opacity-0"
              style={{ color: `${C.dark}50` }}
              onMouseEnter={e => (e.currentTarget.style.color = C.blue)}
              onMouseLeave={e => (e.currentTarget.style.color = `${C.dark}50`)}>
              <ArrowLeft size={14} /> Back
            </button>

            <button onClick={handleNext} disabled={!isAnswered}
              className="flex items-center gap-2 font-black uppercase tracking-[0.2em] text-[10px] rounded-xl px-8 py-3 transition-all group"
              style={{
                background: isAnswered ? C.green : `${C.green}30`,
                color: isAnswered ? C.dark : `${C.dark}50`,
                boxShadow: isAnswered ? `0 6px 20px ${C.green}45` : "none",
                cursor: isAnswered ? "pointer" : "not-allowed",
                transform: "none",
              }}
              onMouseEnter={e => { if (isAnswered) (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}>
              {currentStep === questions.length - 1 ? "Calculate Results" : "Next Question"}
              <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
