import React, { useEffect, useRef, useState } from 'react';
import { testimonials } from '../data/mockData';

const Testimonials = () => {
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
    <section id="testimonials" ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] text-center mb-12 lg:mb-16 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}>
          Job seekers love JoliHunt
        </h2>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => {
            const delay = `delay-${(index + 1) * 200}`;
            return (
              <div
                key={testimonial.id}
                className={`bg-[#FAFAF8] rounded-xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative ${
                  isVisible ? `animate-fade-in-up ${delay}` : 'opacity-0'
                }`}
              >
                {/* Quote Mark Accent */}
                <div className="absolute top-6 right-6 text-6xl text-[#D4A017] opacity-20 font-serif">
                  "
                </div>

                {/* Avatar */}
                <div className="flex items-center mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 transform transition-transform duration-300 hover:scale-110"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-[#1C1C1C]">{testimonial.name}</div>
                    <div className="text-sm text-[#6B6B6B]">{testimonial.role}</div>
                  </div>
                </div>

                {/* Quote */}
                <p className="text-[#1C1C1C] leading-relaxed relative z-10">
                  {testimonial.quote}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
