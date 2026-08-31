import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import StatsAndBadges from '@/components/landing/StatsAndBadges';
import ServicesGrid from '@/components/landing/ServicesGrid';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import ReviewsSection from '@/components/landing/ReviewsSection';
import AustinServiceArea from '@/components/landing/AustinServiceArea';
import FaqSection from '@/components/landing/FaqSection';
import Footer from '@/components/landing/Footer';
import StickyMobileBar from '@/components/landing/StickyMobileBar';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#080d19] text-slate-100 selection:bg-[#5DCCD3] selection:text-slate-950">
      {/* Navigation Header */}
      <Header />

      {/* 3D Particle Hero & Fast Quote Form */}
      <Hero />

      {/* Social Proof & Trust Badges */}
      <StatsAndBadges />

      {/* 6 Certified Core Services Grid */}
      <ServicesGrid />

      {/* Zero-Mess Guarantee & Contractor Comparison */}
      <WhyChooseUs />

      {/* 4.6★ Google Reviews Engine */}
      <ReviewsSection />

      {/* Austin Service Area & Neighborhood Hubs */}
      <AustinServiceArea />

      {/* FAQ Accordion */}
      <FaqSection />

      {/* Full Footer */}
      <Footer />

      {/* Sticky Mobile Action Bar */}
      <StickyMobileBar />
    </main>
  );
}
