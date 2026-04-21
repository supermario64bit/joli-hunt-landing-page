import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <a
      href="https://app.jolihunt.com"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-[#D4A017] text-white px-6 py-4 rounded-full font-bold shadow-2xl hover:bg-[#B8860B] transition-all duration-300 hover:scale-110 flex items-center gap-2 group animate-bounce-slow inline-flex"
      style={{ animationDuration: '3s' }}
    >
      Start Tracking
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </a>
  );
};

export default FloatingCTA;
