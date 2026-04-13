import React, { useEffect, useRef, useState } from 'react';
import { Zap } from 'lucide-react';
import DashboardMockup from './DashboardMockup';
import { features } from '../data/mockData';

const Features = () => {
  const [visibleFeatures, setVisibleFeatures] = useState([]);
  const featureRefs = useRef([]);

  useEffect(() => {
    const observers = featureRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleFeatures(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.3 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section id="features" className="py-16 lg:py-24 bg-gradient-to-b from-[#FAFAF8] to-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 animate-pulse" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, #D4A017 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, #D4A017 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Heading with underline decoration */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-3">
            <Zap className="w-6 h-6 text-[#D4A017] animate-pulse" />
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1C1C] animate-fade-in-up">
              Everything your job search needs
            </h2>
            <Zap className="w-6 h-6 text-[#D4A017] animate-pulse" />
          </div>
          {/* Decorative underline */}
          <div className="flex justify-center gap-2 items-center">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-[#D4A017] rounded-full"></div>
            <div className="h-1 w-24 bg-[#D4A017] rounded-full"></div>
            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-[#D4A017] rounded-full"></div>
          </div>
        </div>

        <div className="space-y-16">
          {features.map((feature, index) => {
            const isLeft = feature.position === 'left';
            const isVisible = visibleFeatures.includes(index);
            
            return (
              <div
                key={feature.id}
                ref={el => featureRefs.current[index] = el}
                className={`grid lg:grid-cols-2 gap-6 lg:gap-10 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content with gradient background */}
                <div className={`${isLeft ? 'lg:order-1' : 'lg:order-2'} ${!isLeft ? 'lg:pl-6' : 'lg:pr-6'} ${
                  isVisible ? (isLeft ? 'animate-slide-in-left' : 'animate-slide-in-right') : 'opacity-0'
                } relative`}>
                  {/* Gradient bg card */}
                  <div className="bg-gradient-to-br from-white to-[#FAFAF8] p-6 rounded-2xl border-2 border-[#D4A017]/10 hover:border-[#D4A017]/30 transition-all duration-300 hover:shadow-xl">
                    <div className="inline-block bg-[#D4A017] text-white px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      Feature {index + 1}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-[#1C1C1C] mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-base text-[#6B6B6B] leading-relaxed">
                      {feature.description}
                    </p>
                    {/* Decorative dots */}
                    <div className="mt-6 flex gap-2">
                      <div className="w-2 h-2 bg-[#D4A017] rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-[#D4A017] rounded-full animate-pulse delay-100"></div>
                      <div className="w-2 h-2 bg-[#D4A017] rounded-full animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>

                {/* Mockup with enhanced hover */}
                <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'} transform hover:scale-105 transition-all duration-500 ${
                  isVisible ? (isLeft ? 'animate-slide-in-right' : 'animate-slide-in-left') : 'opacity-0'
                } relative group`}>
                  <DashboardMockup type={feature.mockupType} />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-[#D4A017] opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
