import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '../data/mockData';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScroll = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 lg:py-24 bg-[#FAFAF8] relative overflow-hidden">
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
        <div className="text-center mb-12 lg:mb-16">
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            Real <span className="text-[#D4A017]">Stories</span>
          </h2>
          <p className={`text-lg text-[#6B6B6B] max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
          }`}>
            See how job seekers like you are landing their dream roles with JoliHunt
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-[#D4A017] hover:text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center hover:bg-[#D4A017] hover:text-white transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, index) => {
              const delay = `delay-${(index + 2) * 100}`;
              return (
                <div
                  key={testimonial.id}
                  className={`flex-shrink-0 w-80 lg:w-96 bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 relative ${
                    isVisible ? `animate-fade-in-up ${delay}` : 'opacity-0'
                  }`}
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

          {/* Scroll Indicator Dots */}
          <div className="flex justify-center gap-2 mt-8 lg:hidden">
            {testimonials.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-[#D4A017] w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
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
