import React, { useEffect, useRef, useState } from 'react';
import { FileSpreadsheet, CalendarX, HelpCircle } from 'lucide-react';
import { problemCards } from '../data/mockData';

const iconMap = {
  FileSpreadsheet: FileSpreadsheet,
  CalendarX: CalendarX,
  HelpCircle: HelpCircle
};

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

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] text-center mb-12 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          Sound familiar?
        </h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {problemCards.map((card, index) => {
            const IconComponent = iconMap[card.icon];
            const delay = `delay-${(index + 1) * 100}`;
            return (
              <div
                key={card.id}
                className={`bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-[#D4A017] transition-all duration-300 transform hover:-translate-y-2 ${
                  isVisible ? `animate-fade-in-up ${delay}` : 'opacity-0'
                }`}
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#D4A017] bg-opacity-10 rounded-full flex items-center justify-center transform transition-transform duration-300 hover:scale-110 hover:rotate-12">
                    <IconComponent className="w-8 h-8 text-[#D4A017]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#1C1C1C] mb-4 text-center">
                  {card.title}
                </h3>
                <p className="text-[#6B6B6B] text-center leading-relaxed">
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
