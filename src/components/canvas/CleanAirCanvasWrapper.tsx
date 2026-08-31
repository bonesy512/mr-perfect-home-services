'use client';

import React, { useState, useEffect } from 'react';
import CleanAirCanvas from './CleanAirCanvas';

export default function CleanAirCanvasWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {isMounted ? (
        <CleanAirCanvas />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-[#080d19] pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080d19] via-[#080d19]/50 to-transparent" />
        </div>
      )}
    </div>
  );
}
