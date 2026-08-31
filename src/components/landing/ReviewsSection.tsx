'use client';

import React from 'react';
import { Star, CheckCircle2, MapPin } from 'lucide-react';
import { BUSINESS_DATA, ReviewItem } from '@/data/businessData';

export default function ReviewsSection() {
  return (
    <section className="relative py-20 bg-[#080d19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#5DCCD3] text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-[#5DCCD3]" />
            <span>Local Google Verified Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Rated 4.6★ by Austin Homeowners
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Real feedback from your neighbors across Westlake, Round Rock, Lakeway, Central Austin, and beyond.
          </p>

          {/* Aggregate Rating Banner */}
          <div className="inline-flex items-center justify-center gap-4 p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
            <div className="text-3xl sm:text-4xl font-black text-white">{BUSINESS_DATA.rating}</div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Verified on Google • <span className="text-white font-bold">{BUSINESS_DATA.reviewsCount} customer reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {BUSINESS_DATA.reviews.map((rev: ReviewItem) => (
            <div
              key={rev.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:p-7 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-all shadow-lg"
            >
              <div className="space-y-3">
                {/* Rating stars & date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400">{rev.date}</span>
                </div>

                {/* Service Tag */}
                <div className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold bg-cyan-950/60 text-[#5DCCD3] border border-cyan-500/20">
                  {rev.service}
                </div>

                {/* Review body */}
                <p className="text-slate-200 text-sm leading-relaxed italic">
                  &ldquo;{rev.review}&rdquo;
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-sm">{rev.author}</div>
                  <div className="text-xs text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#5DCCD3]" /> {rev.location}
                  </div>
                </div>

                {rev.verified && (
                  <div className="flex items-center gap-1 text-xs text-[#3DCB7D] font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Customer</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
