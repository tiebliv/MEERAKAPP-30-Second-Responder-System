/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  Clock, 
  MessageSquare, 
  Star, 
  Calendar,
  ArrowRight,
  ShieldCheck,
  Thermometer
} from 'lucide-react';

// --- Types ---
interface PageProps {
  onNext?: () => void;
  onPrev?: () => void;
}

// --- Components ---

const PageWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: -20, x: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className={`w-full max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col min-h-[800px] border border-stone-200 ${className}`}
  >
    {children}
  </motion.div>
);

const ForwardPull = ({ text, onClick }: { text: string, onClick?: () => void }) => (
  <div className="mt-auto pt-8 pb-6 border-t border-stone-100 px-12 flex justify-end items-center group cursor-pointer" onClick={onClick}>
    <span className="text-stone-400 text-sm font-medium italic mr-2 group-hover:text-stone-600 transition-colors">{text}</span>
    <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-stone-500 transition-transform group-hover:translate-x-1" />
  </div>
);

// --- Pages ---

const Page1Cover = ({ onNext }: PageProps) => (
  <PageWrapper className="bg-black text-white relative">
    <div className="absolute inset-0">
      <img 
        src="/hvac_cover_bg.png" 
        alt="HVAC Technician at Night" 
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-black/70"></div>
    </div>
    
    <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
      <div className="mb-12">
        <h2 className="text-sm font-black tracking-[0.3em] text-white uppercase mb-1">MEERAKAPP™</h2>
        <p className="text-white/70 text-[10px] tracking-[0.2em] uppercase font-bold">Automation Systems for HVAC Companies</p>
      </div>
      
      <div className="mb-8">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.9] flex flex-col">
          <span className="text-white">AI-POWERED</span>
          <span className="text-[#22C55E]">HVAC</span>
        </h1>
      </div>
      
      <p className="text-sm md:text-base text-white/90 max-w-xl font-bold leading-relaxed tracking-tight uppercase mb-12">
        How to Respond Faster, Close More Jobs, and Deliver 5-Star Service
      </p>

      <button 
        onClick={onNext}
        className="bg-[#22C55E] hover:bg-[#1eb054] text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest transition-all transform hover:scale-105 flex items-center space-x-2 shadow-2xl shadow-[#22C55E]/40"
      >
        <span>OPEN THE 30-SECOND GUIDE</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  </PageWrapper>
);

const Page2RevenueLeak = ({ onNext }: PageProps) => (
  <PageWrapper className="p-12 text-stone-800">
    <div className="max-w-2xl mx-auto flex-1 flex flex-col">
      <h2 className="text-xs font-bold tracking-widest text-[#22C55E] uppercase mb-4">Page 02 — The Hidden Leak</h2>
      <h1 className="text-4xl font-bold tracking-tight mb-8">The First One Who Responds Usually Wins</h1>
      
      <div className="space-y-6 text-lg leading-relaxed text-stone-600">
        <p>
          When a homeowner’s AC dies in July, they rarely contact just one company.¹
        </p>
        <p>
          They are in a state of high-friction urgency. They submit multiple inquiries. They text. They fill out forms. They are frustrated, sweating, and ready to book whoever responds first.
        </p>
        
        <div className="my-10 p-8 bg-stone-50 border-l-4 border-[#22C55E] rounded-r-xl italic">
          <p className="text-stone-800 mb-4">
            "A joint MIT and InsideSales.com study, published in Harvard Business Review, found that companies responding to leads within 5 minutes are 21 times more likely to qualify that lead than those responding after 30 minutes."
          </p>
          <cite className="text-sm font-bold text-stone-500 not-italic">— Oldroyd, McElheran & Elkington, HBR, March 2011</cite>
        </div>

        <p>
          While this study was conducted across B2B industries, the behavior it describes—multiple inquiries sent simultaneously during urgent situations—is arguably even more pronounced in HVAC emergencies.
        </p>

        <p className="text-xl font-bold text-stone-900">
          It’s not a workmanship problem. <br />
          It’s a response problem.
        </p>
      </div>

      <div className="mt-auto">
        <p className="text-[10px] text-stone-400 leading-tight border-t border-stone-100 pt-4">
          ¹ Home services industry sales training and contractor marketing reports consistently show homeowners contact multiple providers during urgent repair situations. Exact averages vary by market and season.
        </p>
      </div>
    </div>
    <ForwardPull text="The Professionalism Formula" onClick={onNext} />
  </PageWrapper>
);

const Page3Formula = ({ onNext }: PageProps) => (
  <PageWrapper className="p-12 text-stone-800">
    <div className="max-w-2xl mx-auto flex-1 flex flex-col">
      <h2 className="text-xs font-bold tracking-widest text-[#22C55E] uppercase mb-4">Page 03 — The Formula</h2>
      <h1 className="text-4xl font-bold tracking-tight mb-8">Professionalism Is Not a Personality Trait. It Is a Formula.</h1>
      
      <p className="text-lg text-stone-600 mb-8">
        We often think of professionalism as "being a nice person." In business, homeowners define it differently. They define it by the system you use to interact with them.
      </p>

      <div className="bg-stone-900 text-white p-6 rounded-xl text-center mb-10">
        <span className="text-xl font-mono tracking-tight">
          Professionalism = <span className="text-[#22C55E]">Speed</span> + <span className="text-[#22C55E]">Clarity</span> + <span className="text-[#22C55E]">Care</span> + <span className="text-[#22C55E]">Consistency</span>
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-stone-200 mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-stone-50 border-bottom border-stone-200">
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-stone-500">Element</th>
              <th className="p-4 text-xs font-bold uppercase tracking-wider text-stone-500">What It Means in HVAC</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-200">
            <tr>
              <td className="p-4 font-bold text-stone-900">Speed</td>
              <td className="p-4 text-stone-600">Respond within 2 minutes of a new inquiry</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-stone-900">Clarity</td>
              <td className="p-4 text-stone-600">Clearly explain next step: inspection, quote, timeline</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-stone-900">Care</td>
              <td className="p-4 text-stone-600">Use their name. Reference their specific issue</td>
            </tr>
            <tr>
              <td className="p-4 font-bold text-stone-900">Consistency</td>
              <td className="p-4 text-stone-600">Every lead, every time—even during peak season</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="p-8 bg-emerald-50 rounded-xl border border-emerald-100">
        <h3 className="font-bold text-emerald-900 mb-4 flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2" />
          Self-Score Audit
        </h3>
        <p className="text-sm text-emerald-800 mb-4">Score your last 10 new leads. For each element, rate how many of the 10 received that standard. Add total score. Divide by 40. Multiply by 100.</p>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-stone-400 uppercase font-bold">90%+</div>
            <div className="text-emerald-600 font-bold">Advantage</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-stone-400 uppercase font-bold">70-90%</div>
            <div className="text-stone-600 font-bold">Solid</div>
          </div>
          <div className="p-3 bg-white rounded-lg shadow-sm">
            <div className="text-xs text-stone-400 uppercase font-bold">&lt;70%</div>
            <div className="text-red-500 font-bold">Leak</div>
          </div>
        </div>
      </div>
    </div>
    <ForwardPull text="Where AI Enforces the Formula" onClick={onNext} />
  </PageWrapper>
);

const Page4Enforcement = ({ onNext }: PageProps) => (
  <PageWrapper className="p-12 text-stone-800">
    <div className="max-w-2xl mx-auto flex-1 flex flex-col">
      <h2 className="text-xs font-bold tracking-widest text-[#22C55E] uppercase mb-4">Page 04 — Enforcement</h2>
      <h1 className="text-4xl font-bold tracking-tight mb-6">AI Does Not Replace Your Technicians. It Enforces Your Standards.</h1>
      
      <p className="text-lg text-stone-600 mb-8">
        AI is not about replacing the human touch; it is about ensuring the human touch actually happens. It enforces execution, not skill.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="p-6 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center mb-3">
            <Zap className="w-5 h-5 text-[#22C55E] mr-2" />
            <h3 className="font-bold">Lead Responder</h3>
          </div>
          <p className="text-sm text-stone-500 mb-2 italic">Solves for Speed + Consistency</p>
          <p className="text-sm text-stone-700">First-contact time drops dramatically when response is automated.¹</p>
        </div>

        <div className="p-6 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center mb-3">
            <MessageSquare className="w-5 h-5 text-[#22C55E] mr-2" />
            <h3 className="font-bold">Follow-Up Automation</h3>
          </div>
          <p className="text-sm text-stone-500 mb-2 italic">Solves for Consistency + Care</p>
          <p className="text-sm text-stone-700">Fewer leads go cold due to forgotten follow-ups in the busy season.</p>
        </div>

        <div className="p-6 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center mb-3">
            <Star className="w-5 h-5 text-[#22C55E] mr-2" />
            <h3 className="font-bold">Review Request System</h3>
          </div>
          <p className="text-sm text-stone-500 mb-2 italic">Solves for Consistency + Reputation</p>
          <p className="text-sm text-stone-700">Reviews compound consistently without manual office effort.</p>
        </div>

        <div className="p-6 bg-stone-50 rounded-xl border border-stone-100">
          <div className="flex items-center mb-3">
            <Calendar className="w-5 h-5 text-[#22C55E] mr-2" />
            <h3 className="font-bold">Maintenance Reminder</h3>
          </div>
          <p className="text-sm text-stone-500 mb-2 italic">Solves for Care + Stability</p>
          <p className="text-sm text-stone-700">Past customers convert into recurring revenue automatically.</p>
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-[10px] text-stone-400 leading-tight border-t border-stone-100 pt-4">
          ¹ Illustrative composite example based on HVAC service companies implementing automated lead response systems. Actual results vary by market, pricing, and operational readiness.
        </p>
      </div>
    </div>
    <ForwardPull text="What AI Cannot Do" onClick={onNext} />
  </PageWrapper>
);

const Page5Limits = ({ onNext }: PageProps) => (
  <PageWrapper className="p-12 text-stone-800">
    <div className="max-w-2xl mx-auto flex-1 flex flex-col">
      <h2 className="text-xs font-bold tracking-widest text-[#22C55E] uppercase mb-4">Page 05 — The Limits</h2>
      <h1 className="text-4xl font-bold tracking-tight mb-8">Automation Scales What You Already Are.</h1>
      
      <div className="space-y-6 text-lg text-stone-600">
        <p className="font-bold text-stone-900">State clearly:</p>
        <ul className="space-y-3">
          <li className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-1 shrink-0" />
            <span>AI will not fix bad service.</span>
          </li>
          <li className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-1 shrink-0" />
            <span>It will not repair a compressor.</span>
          </li>
          <li className="flex items-start">
            <AlertCircle className="w-5 h-5 text-red-500 mr-3 mt-1 shrink-0" />
            <span>It will not replace good technicians.</span>
          </li>
        </ul>

        <div className="p-8 bg-stone-900 text-stone-300 rounded-xl my-8">
          <h3 className="text-white font-bold mb-4">A Cautionary Tale</h3>
          <p className="text-sm leading-relaxed italic">
            An HVAC company implemented an AI chatbot without customizing its messaging. The system sent generic responses that didn’t reference the homeowner’s issue. Leads stopped replying—not because demand was low, but because the communication felt careless.
          </p>
        </div>

        <div className="text-center py-8">
          <p className="text-2xl font-black tracking-tight text-stone-900">
            AI is a force multiplier.
          </p>
          <p className="text-stone-500 italic">
            Good standards become stronger. Poor standards become louder.
          </p>
        </div>
      </div>
    </div>
    <ForwardPull text="The First Step" onClick={onNext} />
  </PageWrapper>
);

const Page6Action = ({ onPrev }: PageProps) => {
  const [showDemo, setShowDemo] = useState(false);
  
  return (
    <PageWrapper className="p-12 text-stone-800">
      <div className="max-w-2xl mx-auto flex-1 flex flex-col">
        <h2 className="text-xs font-bold tracking-widest text-[#22C55E] uppercase mb-4">Page 06 — The First Step</h2>
        <h1 className="text-4xl font-bold tracking-tight mb-8">Start With One Variable: Speed.</h1>
        
        <div className="space-y-6 text-lg text-stone-600 mb-10">
          <p className="font-bold text-stone-900">If a lead came in right now, how long before they hear from you?</p>
          <p>Not your best day. Right now. During peak season chaos.</p>
          <p>That gap determines whether you win or lose the job before you ever speak to the homeowner.</p>
          
          <p className="text-stone-900">
            The <span className="font-bold text-[#22C55E]">Meerakapp™ 30-Second Responder System</span> was built for that gap.
          </p>
        </div>

        {!showDemo ? (
          <div className="flex flex-col items-center">
            <button 
              onClick={() => setShowDemo(true)}
              className="w-full bg-[#22C55E] hover:bg-[#1eb054] text-white py-6 rounded-xl font-black text-2xl tracking-tight transition-all shadow-xl shadow-[#22C55E]/20 flex items-center justify-center space-x-3 group"
            >
              <span>TRY IT NOW — IT TAKES 30 SECONDS ⚡</span>
              <Zap className="w-6 h-6 fill-current group-hover:scale-125 transition-transform" />
            </button>
            <p className="mt-6 text-stone-500 text-center italic">
              See what your first response could sound like before the customer calls the next company.
            </p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 bg-stone-50 rounded-2xl border-2 border-[#22C55E] border-dashed"
          >
            <h3 className="font-bold text-stone-900 mb-4">Simulated Lead Response:</h3>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-stone-200 mb-4">
              <p className="text-xs text-stone-400 mb-2">Inquiry: "My AC is blowing hot air, need help ASAP in Springfield."</p>
              <div className="p-3 bg-emerald-50 rounded text-stone-800 text-sm font-mono">
                "Hi Sarah! This is Mike from Meerakapp™ HVAC. I just saw your note about the AC blowing hot air in Springfield. We have a tech nearby this afternoon—would you like me to book a quick diagnostic for 2 PM?"
              </div>
            </div>
            <p className="text-xs text-stone-500 italic">This message was generated and sent in 14 seconds.</p>
            <button 
              onClick={() => setShowDemo(false)}
              className="mt-6 text-[#22C55E] font-bold text-sm hover:underline"
            >
              Reset Demo
            </button>
          </motion.div>
        )}

        <div className="mt-auto pt-12 text-center">
          <p className="text-sm text-stone-600 mb-12">
            This guide pairs with the <span className="font-bold">Meerakapp™ 30-Second Responder System</span>, which demonstrates how quickly a professional response can be generated when a call is missed.
          </p>
          <div className="border-t border-stone-100 pt-8">
            <p className="text-xs font-bold text-stone-400 uppercase tracking-widest">
              Meerakapp™ 30-Second Responder System
            </p>
            <p className="text-[10px] text-stone-300 uppercase tracking-tighter">
              by Meerakapp Solutions
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    <Page1Cover onNext={() => setCurrentPage(1)} />,
    <Page2RevenueLeak onNext={() => setCurrentPage(2)} onPrev={() => setCurrentPage(0)} />,
    <Page3Formula onNext={() => setCurrentPage(3)} onPrev={() => setCurrentPage(1)} />,
    <Page4Enforcement onNext={() => setCurrentPage(4)} onPrev={() => setCurrentPage(2)} />,
    <Page5Limits onNext={() => setCurrentPage(5)} onPrev={() => setCurrentPage(3)} />,
    <Page6Action onPrev={() => setCurrentPage(4)} />
  ];

  return (
    <div className="min-h-screen bg-stone-100 font-sans text-stone-900 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Navigation Controls */}
      {currentPage > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-4 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-stone-200">
          <button 
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-full hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex space-x-2">
            {pages.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full transition-all ${idx === currentPage ? 'bg-[#22C55E] w-6' : 'bg-stone-300'}`}
              />
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
            disabled={currentPage === pages.length - 1}
            className="p-2 rounded-full hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Page Content */}
      <div className="w-full relative">
        <AnimatePresence mode="wait">
          <div key={currentPage}>
            {pages[currentPage]}
          </div>
        </AnimatePresence>
      </div>

      {/* Progress Bar (Top) */}
      <div className="fixed top-0 left-0 w-full h-1 bg-stone-200 z-50">
        <motion.div 
          className="h-full bg-[#22C55E]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentPage + 1) / pages.length) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}
