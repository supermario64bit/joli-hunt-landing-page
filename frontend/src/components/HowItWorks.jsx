import React, { useEffect, useRef, useState } from 'react';
import { steps } from '../data/mockData';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-12 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1C1C] text-center mb-10 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
          {steps.map((step, index) => {
            const delay = `delay-${(index + 2) * 100}`;
            return (
              <div key={step.id} className="relative">
                {/* Connector Line (hidden on mobile, shown on desktop between steps) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-[#D4A017] opacity-30 transform translate-x-1/2" />
                )}

                <div className={`relative z-10 text-center ${
                  isVisible ? `animate-fade-in-up ${delay}` : 'opacity-0'
                }`}>
                  {/* Number Circle */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-[#D4A017] text-white rounded-full mb-5 text-2xl font-bold shadow-lg transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-[#1C1C1C] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6B6B6B] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
