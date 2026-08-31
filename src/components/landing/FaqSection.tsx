'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Phone, MessageSquare } from 'lucide-react';
import { BUSINESS_DATA, FaqItem } from '@/data/businessData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-20 bg-[#080d19] scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#5DCCD3] text-xs font-bold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions Answered</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Chimney & Clean Air FAQs
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            Straightforward answers to the most common questions from Austin homeowners.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {BUSINESS_DATA.faqs.map((faq: FaqItem, idx: number) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/70 overflow-hidden transition-all duration-200 hover:border-slate-700 shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-white hover:text-[#5DCCD3] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-cyan-500/20 text-[#5DCCD3]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1 animate-in fade-in duration-200">
                    <p className="pt-4">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom question banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
          <p className="text-slate-300 text-sm">
            Have a custom chimney, firebox, or whole-home air duct question?
          </p>
          <div className="mt-3 flex items-center justify-center gap-4">
            <a
              href={`tel:${BUSINESS_DATA.phoneRaw}`}
              className="inline-flex items-center gap-2 text-[#5DCCD3] hover:text-[#38bdf8] font-bold text-sm hover:underline"
            >
              <Phone className="w-4 h-4" /> Call Direct: {BUSINESS_DATA.phone}
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="#quote-form"
              className="text-slate-300 hover:text-white font-semibold text-sm hover:underline"
            >
              Get Free Estimate →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
