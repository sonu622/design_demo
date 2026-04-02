"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronRight, RefreshCcw, Trophy, X, Share2, Download, ExternalLink, Minus, Plus, Rocket, Brain } from "lucide-react";
import Image from "next/image";
import html2canvas from "html2canvas";

/* ─── Nexthire Theme ────────────────────────────────────────── */
const C = {
  mint:      "#fffffeff", // Creamy White
  green:     "#50D890",
  blue:      "#4F98CA",
  dark:      "#272727",
  greenDark: "#3CC478",
  mintDim:   "#F7FBF9",
};

/* ─── Assessment Data ────────────────────────────────────────── */
const DIMENSIONS = [
  { id: "clarity", name: "Clarity", color: "#4F98CA", desc: "How clear they are on direction and goals (career concern, planning)." },
  { id: "ownership", name: "Ownership", color: "#50D890", desc: "How much they take control and follow through (career control)." },
  { id: "curiosity", name: "Curiosity", color: "#F7B84B", desc: "How actively they explore options and learn (career curiosity, self‑development)." },
  { id: "confidence", name: "Confidence", color: "#9D7BFA", desc: "How confident and resilient they feel in pursuing opportunities." },
  { id: "network", name: "Network & Visibility", color: "#FF708D", desc: "How well they build relationships and showcase themselves (networking, communication)." },
];

const questions = [
  // CLARITY
  { dim: "clarity", q: "I can describe the kind of work I want to be doing in the next 3 years in one clear sentence." },
  { dim: "clarity", q: "I know which skills I must build in the next 12 months to reach my next role." },
  { dim: "clarity", q: "I regularly review my career direction instead of just 'seeing what happens'." },
  { dim: "clarity", q: "In the past 30 days, I have spent at least 2 hours refining my career roadmap." }, // Behavioral receipt

  // OWNERSHIP
  { dim: "ownership", q: "In the last 90 days, I’ve taken a specific action (course, project, application) to move my career forward." },
  { dim: "ownership", q: "If I feel stuck at work, I create options instead of waiting for my manager or company to fix it." },
  { dim: "ownership", q: "I track my achievements so I can clearly show my impact." },
  { dim: "ownership", q: "In the last 6 months, I have initiated a conversation about my growth with a mentor/leader." }, // Behavioral receipt

  // CURIOSITY
  { dim: "curiosity", q: "I consistently seek out new information about my industry or roles I’m interested in." },
  { dim: "curiosity", q: "I talk to people in roles I aspire to, even if it feels uncomfortable at first." },
  { dim: "curiosity", q: "I treat my career like an experiment and regularly try small tests (side projects, stretch tasks, etc.)." },
  { dim: "curiosity", q: "In the past 30 days, I have reached out to someone new in my field to learn from them." }, // Behavioral receipt

  // CONFIDENCE
  { dim: "confidence", q: "I believe my skills will stay valuable even if my current role disappeared tomorrow." },
  { dim: "confidence", q: "Rejection (e.g., from an application or promotion) motivates me to adjust and try again." },
  { dim: "confidence", q: "I feel comfortable asking for promotions, raises, or new opportunities when I’m ready." },
  { dim: "confidence", q: "I have applied for a 'stretch' role in the last 12 months that I felt 70% qualified for." }, // Behavioral receipt

  // NETWORK & VISIBILITY
  { dim: "network", q: "I have at least 3–5 people I could message today for advice or referrals related to my next move." },
  { dim: "network", q: "My online presence (e.g., LinkedIn, portfolio, social) clearly reflects the kind of roles I want." },
  { dim: "network", q: "I intentionally add value to my network (sharing insights, connections, support), not just ask for help." },
  { dim: "network", q: "In the past 30 days, I have actively engaged with at least 3 professionals outside my company." }, // Behavioral receipt
];

const LIKERT = [
  { label: "Strongly Disagree", val: 1 },
  { label: "Disagree", val: 2 },
  { label: "Neutral", val: 3 },
  { label: "Agree", val: 4 },
  { label: "Strongly Agree", val: 5 },
];

/* ─── Profile Labels ────────────────────────────────────────── */
const getProfileLabel = (score: number, topDimId: string) => {
  const archetypes: Record<string, string> = {
    clarity: "Visionary Planner",
    ownership: "Strategic Driver",
    curiosity: "Curious Explorer",
    confidence: "Resilient Leap-Taker",
    network: "Connector"
  };
  
  const baseLabel = archetypes[topDimId] || "Hidden Star";
  
  if (score >= 75) return `High Performance ${baseLabel}`;
  if (score >= 50) return `Steady ${baseLabel}`;
  return `Emerging ${baseLabel}`;
};

const getDimensionCategory = (score: number) => {
  if (score >= 75) return "Strong";
  if (score >= 50) return "Solid";
  return "Low";
};

export default function Quiz() {
  const [phase, setPhase]             = useState<"onboarding" | "questions" | "results">("onboarding");
  const [onboarding, setOnboarding]   = useState({ role: "", goal: "" });
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [answers, setAnswers]         = useState<number[]>(new Array(questions.length).fill(0));
  const [challengeData, setChallengeData] = useState<{ score: number, profile: string } | null>(null);
  const [timestamp, setTimestamp]     = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const challenge = params.get("challenge");
      const profile = params.get("profile");
      if (challenge && profile) {
        setChallengeData({ score: parseInt(challenge), profile: profile });
      }
      
      if (phase === 'results') {
        const now = new Date();
        setTimestamp(now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) + ' • ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
      }
    }
  }, [phase]);
  
  const handleOnboarding = (key: string, val: string) => setOnboarding(p => ({ ...p, [key]: val }));
  
  const handleAnswer = (val: number) => {
    const next = [...answers];
    next[currentIdx] = val;
    setAnswers(next);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setPhase('results');
    }
  };

  const getResultsData = () => {
    const dimScores: Record<string, number> = {};
    DIMENSIONS.forEach(d => {
      const dimQs = questions.filter(q => q.dim === d.id);
      const total = dimQs.reduce((acc, q) => {
        const qIdx = questions.indexOf(q);
        return acc + (answers[qIdx] || 0);
      }, 0);
      dimScores[d.id] = (total / (dimQs.length * 5)) * 100;
    });
    
    // Weighted Average: Ownership & Clarity 1.2x
    const weights: Record<string, number> = {
      clarity: 1.2,
      ownership: 1.2,
      curiosity: 1.0,
      confidence: 1.0,
      network: 1.0
    };

    let totalWeightedScore = 0;
    let totalWeight = 0;

    DIMENSIONS.forEach(d => {
      const w = weights[d.id] || 1.0;
      totalWeightedScore += dimScores[d.id] * w;
      totalWeight += w;
    });

    const overall = totalWeightedScore / totalWeight;
    const sortedDims = [...DIMENSIONS].sort((a,b) => dimScores[b.id] - dimScores[a.id]);
    const topDim = sortedDims[0];
    const lowestDim = sortedDims[sortedDims.length - 1];
    
    // Dimension Categories for the "Career Profile" string
    const topDimCat = getDimensionCategory(dimScores[topDim.id]);
    const lowDimCat = getDimensionCategory(dimScores[lowestDim.id]);
    
    const profileLabel = getProfileLabel(overall, topDim.id);
    const shortSummary = `${topDimCat} ${topDim.name}, ${lowDimCat} ${lowestDim.name}`;

    return { 
      overall, 
      dimScores, 
      topDim, 
      lowestDim,
      profile: { label: profileLabel, summary: shortSummary },
      band: overall >= 75 ? "High" : overall >= 50 ? "Medium" : "Low"
    };
  };

  /* ─── RENDERING ───────────────────────────────────────────── */

  if (phase === "onboarding") return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8">
      {challengeData && (
        <div className="mb-8 p-6 rounded-3xl bg-blue/5 border border-blue/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue flex items-center justify-center text-white font-black italic shadow-lg">!</div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue mb-1">Challenge Accepted</p>
            <p className="text-sm font-bold text-dark/70 italic">A <span className="text-blue">{challengeData.profile}</span> (Score: {challengeData.score}) has challenged you! Can you beat them?</p>
          </div>
        </div>
      )}
      <h2 className="text-4xl font-bold text-dark mb-4 tracking-tighter">Personalize Your Path</h2>
      <p className="text-dark/40 mb-10 font-medium tracking-tight">Answer a few details so we can tailor your results.</p>
      
      <div className="space-y-8">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-dark/30 block mb-4">Current Role Level</label>
          <div className="flex flex-wrap gap-3">
            {["Student", "Early Career", "Mid Level", "Senior"].map(l => (
              <button key={l} onClick={() => handleOnboarding("role", l)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${onboarding.role === l ? "bg-blue text-white border-blue shadow-lg" : "bg-white text-dark/60 border-dark/5 hover:border-dark/10"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase tracking-widest text-dark/30 block mb-4">Main Career Goal</label>
          <div className="flex flex-wrap gap-3">
            {["Grow in Role", "Career Pivot", "Leadership", "Starting Up"].map(g => (
              <button key={g} onClick={() => handleOnboarding("goal", g)}
                className={`px-6 py-3 rounded-2xl text-sm font-bold border-2 transition-all ${onboarding.goal === g ? "bg-blue text-white border-blue shadow-lg" : "bg-white text-dark/60 border-dark/5 hover:border-dark/10"}`}>
                {g}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button onClick={() => onboarding.role && onboarding.goal && setPhase("questions")}
            disabled={!onboarding.role || !onboarding.goal}
            className="btn-primary px-10 py-5 rounded-full disabled:opacity-30 disabled:cursor-not-allowed group">
            Start Assessment <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (phase === "questions") {
    const q = questions[currentIdx];
    const progress = ((currentIdx + 1) / questions.length) * 100;
    const currentDimName = DIMENSIONS.find(d => d.id === q.dim)?.name;

    return (
      <div className="p-8 md:p-12 min-h-[500px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-12">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue/10 flex items-center justify-center text-blue font-bold">
                  {currentIdx + 1}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-dark/30">{currentDimName}</p>
                  <p className="text-xs font-bold text-blue tracking-tighter">Dimension Focus</p>
                </div>
             </div>
             <div className="w-48">
                <div className="h-1.5 w-full bg-dark/5 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className="h-full bg-blue" />
                </div>
                <p className="text-[9px] font-bold text-dark/20 mt-1 text-right italic">{Math.round(progress)}% Complete</p>
             </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={currentIdx} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <h3 className="text-2xl md:text-3xl font-bold text-dark mb-12 leading-tight tracking-tighter">
                &ldquo;{q.q}&rdquo;
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {LIKERT.map(l => {
                  const isSelected = answers[currentIdx] === l.val;
                  const activeColor = 
                    l.val === 1 ? "#FF5F5F" : // Strongly Disagree
                    l.val === 2 ? "#FFBD69" : // Disagree
                    l.val === 3 ? "#4F98CA" : // Neutral
                    l.val === 4 ? "#8DDA97" : // Agree
                    "#50D890";                // Strongly Agree

                  return (
                    <button key={l.val} onClick={() => handleAnswer(l.val)}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all hover:scale-[1.03] bg-white group ${isSelected ? "" : "border-dark/5"}`}
                      style={{ 
                        borderColor: isSelected ? activeColor : undefined, 
                        boxShadow: isSelected ? `0 10px 25px -5px ${activeColor}40` : undefined,
                        '--hover-border': activeColor,
                        '--hover-bg': `${activeColor}10`,
                        '--hover-icon': activeColor
                      } as any}>
                      
                      <style jsx>{`
                        button:hover { 
                          border-color: var(--hover-border) !important;
                          background-color: var(--hover-bg) !important;
                        }
                        button:hover .icon-dot {
                          border-color: var(--hover-icon) !important;
                          background-color: var(--hover-icon) !important;
                          opacity: 0.3;
                        }
                      `}</style>

                      <div className={`icon-dot w-4 h-4 rounded-full border-2 mb-3 transition-colors ${isSelected ? "" : "border-dark/10"}`} 
                           style={{ borderColor: isSelected ? activeColor : undefined, background: isSelected ? activeColor : undefined }} />
                      <span className={`text-[10px] font-bold text-center uppercase tracking-tighter leading-tight transition-colors ${isSelected ? "text-dark" : "text-dark/40 group-hover:text-dark"}`}
                            style={{ color: isSelected ? activeColor : undefined }}>
                        {l.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between items-center pt-10 border-t border-dark/5">
           <button onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
             className="text-xs font-bold text-dark/30 hover:text-dark flex items-center gap-2 transition-colors">
             <ArrowLeft size={16} /> Previous Question
           </button>
           <p className="text-[10px] font-bold text-dark/20 uppercase tracking-widest italic">Be honest with yourself.</p>
        </div>
      </div>
    );
  }

  if (phase === "results") {
    const data = getResultsData();

    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 md:p-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Result Card (Social-Media Friendly) */}
            <div className="w-full lg:w-1/2">
              <div id="result-card" className="bg-white p-10 rounded-[3.5rem] border relative overflow-hidden group aspect-[1080/1600] flex flex-col justify-between" 
                   style={{ 
                     borderColor: 'rgba(39, 39, 39, 0.05)',
                     boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                   }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 blur-[80px]" style={{ background: 'rgba(79, 152, 202, 0.05)' }} />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/2 blur-[80px]" style={{ background: 'rgba(80, 216, 144, 0.05)' }} />
                
                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-widest mb-8 flex items-center gap-2" style={{ color: 'rgba(39, 39, 39, 0.3)' }}>
                    <Rocket size={12} style={{ color: '#4F98CA' }} /> Career Readiness Protocol
                  </p>
                  
                  <div className="mb-10">
                    <div className="flex items-end gap-2 mb-2">
                       <h2 className="text-8xl font-black tracking-tighter leading-none italic" style={{ color: '#272727' }}>{Math.round(data.overall)}</h2>
                       <span className="text-2xl font-bold mb-2" style={{ color: 'rgba(39, 39, 39, 0.2)' }}>/ 100</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 pt-2 rounded-full text-[16px] font-bold tracking-tighter uppercase" 
                         style={{ 
                           backgroundColor: data.band === "High" ? 'rgba(202, 216, 80, 0.2)' : data.band === "Medium" ? 'rgba(79, 152, 202, 0.2)' : 'rgba(39, 39, 39, 0.05)',
                           color: data.band === "High" ? '#3CC478' : data.band === "Medium" ? '#4F98CA' : 'rgba(39, 39, 39, 0.4)'
                         }}>
                      <Trophy size={14} /> {data.band} Readiness
                    </div>
                  </div>

                  <div className="pt-8 mb-10" style={{ borderTop: '1px solid rgba(39, 39, 39, 0.05)' }}>
                    <h4 className="text-3xl font-bold mb-2 tracking-tighter" style={{ color: '#272727' }}>{data.profile.label}</h4>
                    <p className="text-sm font-bold uppercase tracking-tight" style={{ color: 'rgba(39, 39, 39, 0.4)' }}>{data.profile.summary}</p>
                  </div>

                  <div className="space-y-4 mb-10">
                    {DIMENSIONS.map(d => (
                      <div key={d.id} className="space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-tighter">
                          <span style={{ color: 'rgba(39, 39, 39, 0.3)' }}>{d.name}</span>
                          <span style={{ color: '#272727' }}>{Math.round(data.dimScores[d.id])}%</span>
                        </div>
                        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(39, 39, 39, 0.05)' }}>
                           <motion.div initial={{ width: 0 }} animate={{ width: `${data.dimScores[d.id]}%` }} className="h-full rounded-full" style={{ background: d.color }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-8" style={{ borderTop: '1px solid rgba(39, 39, 39, 0.05)' }}>
                    <div className="flex flex-col items-start gap-1">
                      <p className="text-[10px] font-bold uppercase tracking-widest italic" style={{ color: 'rgba(39, 39, 39, 0.2)' }}>nxt-hr.io/readiness</p>
                      <p className="text-xs font-bold uppercase tracking-tight" style={{ color: '#272727' }}>{timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-8">
                 <button onClick={async () => {
                   const shareData = {
                     title: 'My Career Readiness Score',
                     text: `My Career Readiness Score is ${Math.round(data.overall)}/100 – apparently I’m a ${data.profile.label}. What's yours?`,
                     url: window.location.origin
                   };
                   
                   if (navigator.share && navigator.canShare(shareData)) {
                     try {
                       await navigator.share(shareData);
                     } catch (err) {
                       console.log("Share failed:", err);
                     }
                   } else {
                     const text = `${shareData.text} Check yours at: ${shareData.url}`;
                     navigator.clipboard.writeText(text);
                     alert("Results and link copied to clipboard! Ready to share on your story.");
                   }
                 }} className="btn-primary py-5 rounded-2xl flex items-center justify-center gap-3 w-full text-lg">
                   <Share2 size={20} /> Share My Story
                 </button>
                 <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={async () => {
                        const element = document.getElementById('result-card');
                        if (!element) return;
                        const canvas = await html2canvas(element, { 
                          backgroundColor: '#ffffffff', 
                          scale: 3,
                          useCORS: true,
                          allowTaint: true,
                          scrollY: 0,
                          scrollX: 0,
                          windowWidth: element.scrollWidth,
                          windowHeight: element.scrollHeight
                        });
                        const link = document.createElement('a');
                        link.download = `career-readiness-${Math.round(data.overall)}.png`;
                        link.href = canvas.toDataURL('image/png');
                        link.click();
                      }}
                      className="bg-blue text-white py-4 rounded-2xl flex items-center justify-center gap-3 text-sm font-black shadow-lg hover:bg-blue/90 transition-all border-none">
                      <Download size={18} /> Save Career Report
                    </button>
                    <button 
                      onClick={async () => {
                        
                        const challengeUrl = `${window.location.origin}?challenge=${Math.round(data.overall)}&profile=${encodeURIComponent(data.profile.label)}`;
                        const shareData = {
                          title: 'Beat My Career Readiness Score!',
                          text: `I scored ${Math.round(data.overall)}% on the Career Readiness Assessment. Can you beat me?`,
                          url: challengeUrl
                        };
                        
                        if (navigator.share && navigator.canShare(shareData)) {
                          try {
                            await navigator.share(shareData);
                          } catch (err) {
                            console.log("Challenge share failed:", err);
                          }
                        } else {
                          navigator.clipboard.writeText(challengeUrl);
                          alert("Challenge link copied! Send it to a friend to see if they can beat your score.");
                        }
                      }}
                      className="bg-white border-2 border-dark/5 py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-dark/60 hover:border-blue/20 transition-all">
                      <ExternalLink size={16} /> Challenge a Friend
                    </button>
                 </div>
              </div>
            </div>

            {/* Right: Insight & Action */}
            <div className="w-full lg:w-1/2 space-y-12">
               <div>
                 <h4 className="text-xs font-bold uppercase tracking-widest text-dark/20 mb-6">Strategic Insight</h4>
                 <div className="bg-dark text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-4 opacity-10">
                     <Brain size={48} />
                   </div>
                   <p className="text-lg font-bold mb-4 tracking-tight">Your {data.lowestDim.name} is a key growth lever.</p>
                   <p className="text-sm opacity-60 leading-relaxed font-medium">
                     Your score suggests that while you have strengths, focusing on {data.lowestDim.name.toLowerCase()} will unlock the most significant career acceleration. 
                     People with this profile often feel a "ceiling" that can be broken by {data.lowestDim.id === 'network' ? 'expanding high-value connections' : 'sharpening their specific career goals'}.
                   </p>
                 </div>
               </div>

               <div>
                 <h4 className="text-xs font-bold uppercase tracking-widest text-dark/20 mb-6">Personalized Action Plan</h4>
                 <ul className="space-y-6">
                    {(data.lowestDim.id === 'clarity' ? [
                      "Draft your '3-Year North Star' in a single, punchy sentence.",
                      "List 5 specific technical skills you need to reach the next salary band.",
                      "Schedule a 'Vision Audit' with a mentor to test your goal realism."
                    ] : data.lowestDim.id === 'ownership' ? [
                      "Start an 'Impact Log' to track one quantified win every single Friday.",
                      "Identify a project at work you can take full end-to-end lead on.",
                      "Set a recurring calendar invite for 'CEO-of-Me' career strategy time."
                    ] : data.lowestDim.id === 'curiosity' ? [
                      "Set up 2 Google Alerts for your target industry's emerging trends.",
                      "Cold-message one professional in a 'dream role' for a 15-min chat.",
                      "Treat your next month as an experiment: try one new tool or workflow."
                    ] : data.lowestDim.id === 'confidence' ? [
                      "Practice your 'Value Proposition' pitch in front of a mirror (60s).",
                      "Apply for one 'stretch role' even if you feel underqualified.",
                      "Ask for feedback on your greatest strength from 3 trusted peers."
                    ] : [
                      "Message 3 old colleagues just to offer value or a quick catch-up.",
                      "Optimize your LinkedIn headline for your *next* role, not your current one.",
                      "Join one high-signal professional community orSlack group this week."
                    ]).map((step, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <div className="w-8 h-8 rounded-xl bg-blue/10 text-blue flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-blue group-hover:text-white transition-colors">{i+1}</div>
                        <p className="text-sm font-bold text-dark tracking-tight leading-snug pt-1.5">{step}</p>
                      </li>
                    ))}
                 </ul>
               </div>

               <div className="flex items-center justify-between pt-8 border-t border-dark/5">
                 <button onClick={() => setPhase("onboarding")} className="text-xs font-bold text-dark/30 hover:text-dark flex items-center gap-2">
                   <RefreshCcw size={14} /> Retake Assessment
                 </button>
                 <p className="text-[10px] font-bold text-dark/20 uppercase tracking-widest">Share to challenge others</p>
               </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
