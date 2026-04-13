import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

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

  // Auto-scroll effect - SLOWER
  useEffect(() => {
    if (!scrollContainerRef.current || isPaused) return;

    const scrollInterval = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const scrollAmount = 0.5; // Slower smooth scroll
        
        container.scrollLeft += scrollAmount;
        
        // Reset to start when reaching end
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      }
    }, 30);

    return () => clearInterval(scrollInterval);
  }, [isPaused]);

  return (
    <section id="testimonials" ref={sectionRef} className="py-12 bg-[#FAFAF8] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #D4A017 25%, transparent 25%, transparent 75%, #D4A017 75%, #D4A017),
                           linear-gradient(45deg, #D4A017 25%, transparent 25%, transparent 75%, #D4A017 75%, #D4A017)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1C1C] mb-3 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            Real <span className="text-[#D4A017]">Stories</span>
          </h2>
          <p className={`text-base text-[#6B6B6B] max-w-2xl mx-auto leading-relaxed ${
            isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
          }`}>
            See how job seekers like you are landing their dream roles with JoliHunt
          </p>
        </div>

        {/* Auto-scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Duplicate testimonials for infinite scroll effect */}
          {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => {
            return (
              <div
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 lg:w-96 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative cursor-pointer"
              >
                {/* Quote Mark Accent */}
                <div className="absolute top-6 right-6 text-7xl text-[#D4A017] opacity-10 font-serif leading-none">
                  "
                </div>

                {/* Quote */}
                <p className="text-[#1C1C1C] leading-relaxed text-lg mb-6 relative z-10 italic">
                  "{testimonial.quote}"
                </p>

                {/* Avatar & Info */}
                <div className="flex items-center border-t border-gray-100 pt-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg mr-4 transform transition-transform duration-300 flex-shrink-0"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-black text-[#1C1C1C] text-lg">{testimonial.name}</div>
                    <div className="text-sm text-[#6B6B6B] font-semibold">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* See All Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-white border-2 border-[#D4A017] text-[#D4A017] px-8 py-4 rounded-full font-black text-lg hover:bg-[#D4A017] hover:text-white transition-all duration-300 flex items-center gap-3 group shadow-lg hover:shadow-2xl transform hover:-translate-y-1">
            See All Testimonials
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
