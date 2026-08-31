'use client';

import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'glyph-only' | 'nav' | 'footer';
  showText?: boolean;
}

export function HouseGlyph({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mr. Perfect Home Services Glyph"
    >
      <defs>
        {/* Left Peak Gradient: Mint Green to Cyan */}
        <linearGradient id="mrGreenCyan" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3DCB7D" />
          <stop offset="100%" stopColor="#5DCCD3" />
        </linearGradient>

        {/* Right Peak Gradient: Cyan to Vivid Blue */}
        <linearGradient id="mrCyanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5DCCD3" />
          <stop offset="100%" stopColor="#0376F4" />
        </linearGradient>
      </defs>

      {/* Left Gabled House / 'M' left half */}
      <path
        d="M 12 110 L 50 14 L 88 110 L 70 110 L 50 56 L 30 110 Z"
        fill="url(#mrGreenCyan)"
      />

      {/* 4-Pane Window Left */}
      <rect x="38" y="78" width="8" height="8" fill="#3DCB7D" rx="1" />
      <rect x="50" y="78" width="8" height="8" fill="#5DCCD3" rx="1" />
      <rect x="38" y="90" width="8" height="8" fill="#3DCB7D" rx="1" />
      <rect x="50" y="90" width="8" height="8" fill="#5DCCD3" rx="1" />

      {/* Right Gabled House / 'M' right half */}
      <path
        d="M 72 110 L 110 14 L 148 110 L 130 110 L 110 56 L 90 110 Z"
        fill="url(#mrCyanBlue)"
      />

      {/* 4-Pane Window Right */}
      <rect x="98" y="78" width="8" height="8" fill="#0376F4" rx="1" />
      <rect x="110" y="78" width="8" height="8" fill="#0376F4" rx="1" />
      <rect x="98" y="90" width="8" height="8" fill="#0376F4" rx="1" />
      <rect x="110" y="90" width="8" height="8" fill="#0376F4" rx="1" />
    </svg>
  );
}

export default function Logo({ className = '', variant = 'nav', showText = true }: LogoProps) {
  if (variant === 'nav') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {/* Crisp vector twin-gabled glyph */}
        <div className="relative p-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 shadow-md shadow-cyan-500/10 flex items-center justify-center">
          <HouseGlyph className="w-9 h-8 sm:w-10 sm:h-9 drop-shadow" />
        </div>

        {showText && (
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-serif">
                Mr. Perfect
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-[1px] w-3 bg-cyan-400/80" />
              <span className="text-[10px] tracking-[0.2em] font-bold text-cyan-300 uppercase">
                HOME SERVICES
              </span>
              <span className="h-[1px] w-3 bg-cyan-400/80" />
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <div className="p-2 rounded-2xl bg-slate-900 border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
          <HouseGlyph className="w-11 h-10" />
        </div>
        <div>
          <div className="font-extrabold text-2xl tracking-tight text-white font-serif">
            Mr. Perfect
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-[1.5px] w-4 bg-cyan-400" />
            <span className="text-[11px] tracking-[0.25em] font-bold text-cyan-400 uppercase">
              HOME SERVICES
            </span>
            <span className="h-[1.5px] w-4 bg-cyan-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <HouseGlyph className="w-12 h-10" />
    </div>
  );
}
