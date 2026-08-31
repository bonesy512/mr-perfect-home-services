'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Sparkles, ShieldCheck, Flame, Wind, MoveHorizontal, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ComparisonCase {
  id: string;
  title: string;
  category: string;
  icon: React.ReactNode;
  beforeLabel: string;
  beforeSub: string;
  afterLabel: string;
  afterSub: string;
  summary: string;
}

const COMPARISON_CASES: ComparisonCase[] = [
  {
    id: 'chimney',
    title: 'Chimney Flue Creosote & Soot Restoration',
    category: 'Chimney Sweep & Inspection',
    icon: <Flame className="w-4 h-4 text-amber-400" />,
    beforeLabel: 'BEFORE: Dangerous Stage-3 Glazed Creosote',
    beforeSub: 'Severe fire hazard • Blocked flue draft • Smoke odor in living room',
    afterLabel: 'AFTER: NFPA 211 Certified Clean Finish',
    afterSub: '100% Zero-Mess HEPA capture • Restored draft • Clean refractory flue',
    summary: 'Captured with 360° HD robotic camera scan. Our rotary whips eliminated 100% of combustible creosote deposits while magnetic HEPA containment kept living room air pristine.',
  },
  {
    id: 'airduct',
    title: 'HVAC Trunk & Supply Duct Sanitization',
    category: 'Air Duct & IAQ Sanitization',
    icon: <Wind className="w-4 h-4 text-[#5DCCD3]" />,
    beforeLabel: 'BEFORE: 5+ Years Allergen & Dust Congestion',
    beforeSub: 'Pet dander matting • Mold spore accumulation • Restricted airflow',
    afterLabel: 'AFTER: Hospital-Grade Botanical Sanitized',
    afterSub: 'Medical negative air extraction • Plant-based disinfection • Clean airflow',
    summary: 'High-CFM negative air vacuum extracted deep trunk line debris, followed by EPA-registered botanical fogging to eliminate airborne bacteria and musty odor.',
  },
];

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>('chimney');
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = COMPARISON_CASES.find((c) => c.id === activeTab) || COMPARISON_CASES[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handlePointerUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handlePointerUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handlePointerUp]);

  return (
    <section id="proof-results" className="relative py-20 bg-[#070b16] border-t border-slate-800/80 scroll-mt-20">
      {/* Glow Ambient background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#5DCCD3] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Visual Proof of Our Zero-Mess Guarantee</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Interactive Before & After Results
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Drag the slider to see how Mr. Perfect restores dangerous chimney flues and congested HVAC airways back to pristine factory standards.
          </p>

          {/* Mode Selector Tabs */}
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-1.5 mt-2">
            {COMPARISON_CASES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveTab(item.id);
                  setSliderPosition(50);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-[#3DCB7D] via-[#5DCCD3] to-[#0376F4] text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.icon}
                <span>{item.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Card Container */}
        <div className="rounded-3xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-2xl p-4 sm:p-6 lg:p-8 shadow-2xl shadow-black/80 space-y-6">
          {/* Main Visual Comparison Frame */}
          <div
            ref={containerRef}
            onMouseDown={(e) => {
              setIsDragging(true);
              handleMove(e.clientX);
            }}
            onTouchStart={(e) => {
              setIsDragging(true);
              handleMove(e.touches[0].clientX);
            }}
            className="relative w-full h-[360px] sm:h-[460px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-800 bg-slate-950"
          >
            {/* RIGHT SIDE: AFTER IMAGE (Background) */}
            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-950 via-[#071926] to-[#04101d]">
              {/* After SVG Graphic */}
              {activeTab === 'chimney' ? (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                  {/* Clean brick flue pattern */}
                  <svg className="w-full h-full opacity-90" viewBox="0 0 600 400" fill="none">
                    <rect width="600" height="400" fill="#0c1626" />
                    {/* Clean terracotta/mortar grid */}
                    <path d="M50 50 H550 V350 H50 Z" stroke="#38bdf8" strokeWidth="4" strokeDasharray="8 8" opacity="0.4" />
                    {/* Flue chamber */}
                    <circle cx="300" cy="200" r="140" fill="#08101a" stroke="#5DCCD3" strokeWidth="6" />
                    <circle cx="300" cy="200" r="100" fill="#0a1524" stroke="#3DCB7D" strokeWidth="4" />
                    <circle cx="300" cy="200" r="60" fill="#0c1a2e" stroke="#5DCCD3" strokeWidth="2" />
                    <circle cx="300" cy="200" r="20" fill="#142c4c" />
                    {/* Inspection laser grid */}
                    <line x1="160" y1="200" x2="440" y2="200" stroke="#3DCB7D" strokeWidth="1.5" strokeDasharray="4 4" />
                    <line x1="300" y1="60" x2="300" y2="340" stroke="#3DCB7D" strokeWidth="1.5" strokeDasharray="4 4" />
                  </svg>

                  <div className="absolute right-6 top-6 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    <CheckCircle2 className="w-4 h-4 text-[#3DCB7D]" />
                    <span>RESTORED & NFPA 211 CERTIFIED</span>
                  </div>

                  <div className="absolute right-6 bottom-6 max-w-xs text-right hidden sm:block">
                    <div className="text-white font-black text-sm">{currentCase.afterLabel}</div>
                    <div className="text-emerald-400 text-xs mt-0.5">{currentCase.afterSub}</div>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                  {/* Clean HVAC Air Duct Graphic */}
                  <svg className="w-full h-full opacity-90" viewBox="0 0 600 400" fill="none">
                    <rect width="600" height="400" fill="#081422" />
                    {/* Gleaming duct metallic ribs */}
                    <path d="M 40 80 Q 300 40 560 80 L 560 320 Q 300 360 40 320 Z" fill="#0c2035" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="120" y1="80" x2="120" y2="320" stroke="#5DCCD3" strokeWidth="2" strokeDasharray="6 6" />
                    <line x1="240" y1="65" x2="240" y2="335" stroke="#5DCCD3" strokeWidth="2" strokeDasharray="6 6" />
                    <line x1="360" y1="65" x2="360" y2="335" stroke="#5DCCD3" strokeWidth="2" strokeDasharray="6 6" />
                    <line x1="480" y1="80" x2="480" y2="320" stroke="#5DCCD3" strokeWidth="2" strokeDasharray="6 6" />
                    {/* Airflow waves */}
                    <path d="M 60 200 C 180 160, 320 240, 540 200" stroke="#3DCB7D" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
                    <path d="M 60 160 C 180 120, 320 200, 540 160" stroke="#5DCCD3" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                    <path d="M 60 240 C 180 200, 320 280, 540 240" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
                  </svg>

                  <div className="absolute right-6 top-6 bg-cyan-950/90 border border-cyan-500/50 text-cyan-300 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                    <Sparkles className="w-4 h-4 text-[#5DCCD3]" />
                    <span>BOTANICAL SANITIZED AIRWAY</span>
                  </div>

                  <div className="absolute right-6 bottom-6 max-w-xs text-right hidden sm:block">
                    <div className="text-white font-black text-sm">{currentCase.afterLabel}</div>
                    <div className="text-[#5DCCD3] text-xs mt-0.5">{currentCase.afterSub}</div>
                  </div>
                </div>
              )}
            </div>

            {/* LEFT SIDE: BEFORE IMAGE (Clipped via sliderPosition %) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1a0808] via-[#240c0c] to-[#120404]"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
              >
                {activeTab === 'chimney' ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                    {/* Soot & Creosote encrusted SVG */}
                    <svg className="w-full h-full opacity-95" viewBox="0 0 600 400" fill="none">
                      <rect width="600" height="400" fill="#180707" />
                      {/* Heavy crust & deposits */}
                      <circle cx="300" cy="200" r="140" fill="#080202" stroke="#451a1a" strokeWidth="12" />
                      <circle cx="300" cy="200" r="110" fill="#120404" stroke="#e11d48" strokeWidth="8" strokeDasharray="12 4" />
                      {/* Chunky creosote shapes */}
                      <path d="M 220 120 Q 250 160 210 200 Q 180 240 230 270 Q 280 290 320 260 Q 380 240 370 190 Q 360 140 310 130 Z" fill="#000000" stroke="#f97316" strokeWidth="3" />
                      <path d="M 280 180 Q 310 190 300 220 Q 270 230 280 180 Z" fill="#1f0909" stroke="#ef4444" strokeWidth="2" />
                      <path d="M 170 150 L 200 180 L 180 220 Z" fill="#050101" />
                      <path d="M 390 150 L 420 210 L 380 230 Z" fill="#050101" />
                    </svg>

                    <div className="absolute left-6 top-6 bg-red-950/90 border border-red-500/50 text-red-300 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span>CRITICAL CREOSOTE FIRE HAZARD</span>
                    </div>

                    <div className="absolute left-6 bottom-6 max-w-xs text-left hidden sm:block">
                      <div className="text-white font-black text-sm">{currentCase.beforeLabel}</div>
                      <div className="text-red-400 text-xs mt-0.5">{currentCase.beforeSub}</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
                    {/* Dirty dust clogged duct SVG */}
                    <svg className="w-full h-full opacity-95" viewBox="0 0 600 400" fill="none">
                      <rect width="600" height="400" fill="#1c120c" />
                      <path d="M 40 80 Q 300 40 560 80 L 560 320 Q 300 360 40 320 Z" fill="#2b1a10" stroke="#78350f" strokeWidth="4" />
                      {/* Lint clumps & allergen webs */}
                      <ellipse cx="200" cy="180" rx="90" ry="45" fill="#140a05" stroke="#9a3412" strokeWidth="3" />
                      <ellipse cx="360" cy="220" rx="110" ry="50" fill="#0f0703" stroke="#c2410c" strokeWidth="3" />
                      <circle cx="160" cy="240" r="35" fill="#080301" />
                      <circle cx="430" cy="160" r="40" fill="#080301" />
                    </svg>

                    <div className="absolute left-6 top-6 bg-amber-950/90 border border-amber-500/50 text-amber-300 text-xs font-black px-3.5 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>DUST, LINT & ALLERGEN CLOG</span>
                    </div>

                    <div className="absolute left-6 bottom-6 max-w-xs text-left hidden sm:block">
                      <div className="text-white font-black text-sm">{currentCase.beforeLabel}</div>
                      <div className="text-amber-400 text-xs mt-0.5">{currentCase.beforeSub}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* DRAGGABLE DIVIDER HANDLE */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-[#3DCB7D] via-[#5DCCD3] to-[#0376F4] shadow-[0_0_15px_rgba(93,204,211,0.8)] pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-[#5DCCD3] flex items-center justify-center text-white shadow-xl pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
                <MoveHorizontal className="w-5 h-5 text-[#5DCCD3]" />
              </div>
            </div>
          </div>

          {/* Bottom Descriptive Capsule */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-[#3DCB7D] shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <p className="leading-relaxed">
                <strong className="text-white">The Mr. Perfect Standard:</strong> {currentCase.summary}
              </p>
            </div>

            <a
              href="#quote-form"
              className="shrink-0 inline-flex items-center gap-2 brand-gradient-btn hover:opacity-95 text-slate-950 font-black px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-105"
            >
              <span>Get Your Flue Scanned</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
