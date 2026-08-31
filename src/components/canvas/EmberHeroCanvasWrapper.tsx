'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamic import with SSR disabled to guarantee zero SSR hydration crashes
const EmberHeroCanvas = dynamic(
  () => import('./EmberHeroCanvas'),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 w-full h-full bg-stone-950 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />
      </div>
    ),
  }
);

export default function EmberHeroCanvasWrapper() {
  return <EmberHeroCanvas />;
}
