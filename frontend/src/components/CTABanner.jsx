import React, { useState } from 'react';
import { toast } from 'sonner';

const CTABanner = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
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
    
    // Simulate newsletter signup (mock)
    setTimeout(() => {
      toast.success('🎉 Welcome! Check your inbox for next steps.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
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

        {/* Newsletter Signup Form */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-lg text-[#1C1C1C] placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-white"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-[#D4A017] px-8 py-4 rounded-lg font-bold hover:bg-[#FAFAF8] transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isSubmitting ? 'Signing up...' : 'Get Started Free'}
            </button>
          </div>
        </form>

        <p className="text-white/80 text-sm">
          No credit card required · Free forever plan available
        </p>
      </div>
    </section>
  );
};

export default CTABanner;
