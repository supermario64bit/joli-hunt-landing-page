import React, { useEffect, useRef, useState } from 'react';
import { problemCards } from '../data/mockData';
import Mascot from './Mascot';

const Problem = () => {
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

  // Map problem types to mascot variants
  const mascotVariants = ["tired", "worried", "confused"];

  return (
    <section ref={sectionRef} className="py-12 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1C1C] text-center mb-3 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Sound familiar?
        </h2>
        <p className={`text-base text-[#6B6B6B] text-center mb-10 max-w-2xl mx-auto leading-relaxed ${isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          Job searching can be overwhelming. Here's what most people struggle with:
        </p>

        <div className="grid md:grid-cols-3 gap-5">
          {problemCards.map((card, index) => {
            const delay = `delay-${(index + 2) * 100}`;
            return (
              <div
                key={card.id}
                className={`bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:border-[#D4A017] transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? `animate-fade-in-up ${delay}` : 'opacity-0'
                }`}
              >
                {/* Mascot Illustration with hover animation */}
                <div className="flex justify-center mb-4 group">
                  <div className="transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Mascot variant={mascotVariants[index]} size="lg" animate={true} />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[#1C1C1C] mb-3 text-center">
                  {card.title}
                </h3>
                <p className="text-sm text-[#6B6B6B] text-center leading-relaxed">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Problem;
