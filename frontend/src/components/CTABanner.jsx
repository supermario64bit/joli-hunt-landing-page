import React, { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CTABanner = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Call backend API to save email
      await axios.post(`${BACKEND_URL}/api/newsletter/subscribe`, { email });
      toast.success('🎉 Welcome! Check your inbox for next steps.');
      setEmail('');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('This email is already subscribed!');
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-[#D4A017] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A),
                           linear-gradient(45deg, #1A1A1A 25%, transparent 25%, transparent 75%, #1A1A1A 75%, #1A1A1A)`,
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to take control of your job search?
        </h2>
        <p className="text-white/90 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of job seekers who are organizing their applications and landing offers faster.
        </p>

        <div className="flex justify-center animate-fade-in-up">
          <a
            href="https://app.jolihunt.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#D4A017] px-10 py-5 rounded-xl font-black text-xl hover:bg-[#FAFAF8] transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1.5 hover:scale-105 inline-block"
          >
            Get Started Free
          </a>
        </div>

        <p className="text-white/80 text-sm">
          No credit card required · Free forever plan available
        </p>
      </div>
    </section>
  );
};

export default CTABanner;
