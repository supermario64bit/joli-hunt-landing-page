import React from 'react';
import DashboardMockup from './DashboardMockup';

const Hero = () => {
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="hero" className="pt-24 lg:pt-32 pb-16 lg:pb-24 bg-[#FAFAF8] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1C] leading-tight mb-6">
              Your Job Search.
              <br />
              <span className="text-[#D4A017]">Finally Organised.</span>
            </h1>
            <p className="text-lg md:text-xl text-[#6B6B6B] mb-8 max-w-xl mx-auto lg:mx-0">
              Stop managing applications in messy spreadsheets. JoliHunt tracks every application, interview, and offer — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#D4A017] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#B8860B] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5">
                Start Tracking Free
              </button>
              <button
                onClick={() => scrollToSection('#how-it-works')}
                className="border-2 border-[#D4A017] text-[#D4A017] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#D4A017] hover:text-white transition-all duration-200 transform hover:-translate-y-0.5"
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Right: Dashboard Mockup */}
          <div className="relative">
            <div className="transform lg:scale-105 hover:scale-110 transition-transform duration-500">
              <DashboardMockup type="stats" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#D4A017] opacity-20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#D4A017] opacity-10 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
