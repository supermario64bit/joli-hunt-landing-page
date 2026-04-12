import React from 'react';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { footerLinks } from '../data/mockData';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer id="contact" className="bg-[#1A1A1A] text-white py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Column */}
          <div>
            <div className="text-2xl font-bold text-[#D4A017] mb-4">JOLIHUNT</div>
            <p className="text-gray-400 mb-4 italic">Career Curation</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Organize your job search with clarity and confidence. Track applications, interviews, and offers all in one place.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-gray-400 hover:text-[#D4A017] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4A017] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4A017] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4A017] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Github size={20} />
              </a>
              <a
                href="mailto:hello@jolihunt.com"
                className="w-10 h-10 bg-white/10 hover:bg-[#D4A017] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                <Mail size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              hello@jolihunt.com
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} JoliHunt. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-gray-400 hover:text-[#D4A017] transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-gray-400 hover:text-[#D4A017] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
