import React, { useState, useEffect } from 'react';
import { Phone, Sparkles } from 'lucide-react';
import { navLinks } from '../data/mockData';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setIsMobileMenuOpen(false);
      }
    } else {
      navigate(href);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-xl border-b-2 border-[#D4A017]/20' : 'bg-white/98 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo with sparkle */}
          <div className="flex-shrink-0">
            <button onClick={handleLogoClick} className="flex items-center gap-2 group">
              <span className="text-2xl font-black text-[#D4A017] tracking-tight group-hover:scale-105 transition-transform">
                JOLIHUNT
              </span>
              <Sparkles className="w-4 h-4 text-[#D4A017] group-hover:rotate-12 transition-transform" />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8 bg-[#FAFAF8] px-6 py-2 rounded-full">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.href)}
                className="text-[#1C1C1C] hover:text-[#D4A017] font-bold text-sm transition-all duration-200 relative group px-3 py-1"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D4A017] group-hover:w-full transition-all duration-300 rounded-full"></span>
              </button>
            ))}
          </div>

          {/* Desktop Phone & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+917902498141" className="flex items-center gap-2 text-[#1C1C1C] hover:text-[#D4A017] transition-colors group px-4 py-2 bg-[#FAFAF8] rounded-full">
              <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="font-bold text-sm">+91 790 249 8141</span>
            </a>
            <button className="bg-[#D4A017] text-white px-6 py-2.5 rounded-full font-black text-sm hover:bg-[#B8860B] transition-all duration-200 hover:shadow-2xl transform hover:-translate-y-0.5 hover:scale-105">
              Get Started Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#1C1C1C] hover:text-[#D4A017] transition-colors"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Slide-in Menu */}
      <div className={`lg:hidden fixed inset-y-0 right-0 w-64 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-20 px-6">
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.href)}
                className="text-[#1C1C1C] hover:text-[#D4A017] font-semibold text-lg transition-colors duration-200 text-left"
              >
                {link.label}
              </button>
            ))}
            <a href="tel:+917902498141" className="flex items-center gap-2 text-[#1C1C1C] hover:text-[#D4A017] transition-colors pt-4 border-t border-gray-200">
              <Phone className="w-5 h-5" />
              <span className="font-semibold">+91 7902498141</span>
            </a>
          </div>
          <div className="mt-8">
            <button className="w-full bg-[#D4A017] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#B8860B] transition-all duration-200 shadow-lg">
              Get Started Free
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ zIndex: -1 }}
        />
      )}
    </nav>
  );
};

export default Navbar;
