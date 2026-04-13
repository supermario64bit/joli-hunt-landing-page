import React, { useState, useEffect } from 'react';
import DashboardMockup from './DashboardMockup';
import Mascot from './Mascot';

const Hero = () => {
  const [counts, setCounts] = useState({ active: 0, applied: 0, scheduled: 0, offers: 0 });

  useEffect(() => {
    // Start counting after a short delay
    const startTimer = setTimeout(() => {
      const targets = { active: 42, applied: 28, scheduled: 8, offers: 3 };
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        
        setCounts({
          active: Math.floor(targets.active * progress),
          applied: Math.floor(targets.applied * progress),
          scheduled: Math.floor(targets.scheduled * progress),
          offers: Math.floor(targets.offers * progress)
        });

        if (currentStep >= steps) {
          setCounts(targets);
          clearInterval(timer);
        }
      }, interval);

      return () => clearInterval(timer);
    }, 500);

    return () => clearTimeout(startTimer);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="pt-20 pb-12 bg-[#FAFAF8] relative overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-30 animate-pulse">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Floating mascot - positioned lower, hidden on mobile to prevent overlap */}
      <div className="hidden md:block absolute top-20 right-5 lg:top-24 lg:right-10 w-32 h-44 lg:w-40 lg:h-56 z-20 opacity-95 animate-float">
        <Mascot animate={true} size="xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] leading-tight mb-4">
              Your Job Search.
              <br />
              <span className="text-[#D4A017]">Finally Organised.</span>
            </h1>
            <p className="text-base md:text-lg text-[#6B6B6B] mb-6 max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-200 leading-relaxed">
              Stop managing applications in messy spreadsheets. JoliHunt tracks every application, interview, and offer — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-300">
              <button className="bg-[#D4A017] text-white px-7 py-3 rounded-lg font-semibold text-base hover:bg-[#B8860B] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1">
                Start Tracking - It's Free
              </button>
            </div>
          </div>

          {/* Right: Dashboard Mockup with animated stats */}
          <div className="relative animate-fade-in-up delay-400">
            <div className="transform lg:scale-105 hover:scale-110 transition-transform duration-500">
              <div className="bg-white rounded-xl shadow-2xl p-5 border border-gray-200">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center p-3 bg-[#FAFAF8] rounded-lg transform hover:scale-105 transition-transform">
                    <div className="text-3xl font-black mb-1 text-[#D4A017] animate-scale-in tabular-nums">
                      {counts.active}
                    </div>
                    <div className="text-xs font-semibold text-[#6B6B6B]">Total Active</div>
                  </div>
                  <div className="text-center p-3 bg-[#FAFAF8] rounded-lg transform hover:scale-105 transition-transform delay-100">
                    <div className="text-3xl font-black mb-1 text-[#6B6B6B] animate-scale-in delay-100 tabular-nums">
                      {counts.applied}
                    </div>
                    <div className="text-xs font-semibold text-[#6B6B6B]">Applied</div>
                  </div>
                  <div className="text-center p-3 bg-[#FAFAF8] rounded-lg transform hover:scale-105 transition-transform delay-200">
                    <div className="text-3xl font-black mb-1 text-[#10B981] animate-scale-in delay-200 tabular-nums">
                      {counts.scheduled}
                    </div>
                    <div className="text-xs font-semibold text-[#6B6B6B]">Scheduled</div>
                  </div>
                  <div className="text-center p-3 bg-[#FAFAF8] rounded-lg transform hover:scale-105 transition-transform delay-300">
                    <div className="text-3xl font-black mb-1 text-[#D4A017] animate-scale-in delay-300 tabular-nums">
                      {counts.offers}
                    </div>
                    <div className="text-xs font-semibold text-[#6B6B6B]">Offers</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements with animation */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4A017] opacity-20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#D4A017] opacity-10 rounded-full blur-3xl animate-pulse delay-500" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
