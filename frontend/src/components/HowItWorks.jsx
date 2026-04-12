import React from 'react';
import { steps } from '../data/mockData';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] text-center mb-12 lg:mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Connector Line (hidden on mobile, shown on desktop between steps) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-[#D4A017] opacity-30 transform translate-x-1/2" />
              )}

              <div className="relative z-10 text-center">
                {/* Number Circle */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-[#D4A017] text-white rounded-full mb-6 text-3xl font-bold shadow-lg">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-xl md:text-2xl font-bold text-[#1C1C1C] mb-4">
                  {step.title}
                </h3>
                <p className="text-[#6B6B6B] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
