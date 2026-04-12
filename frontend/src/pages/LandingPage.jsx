import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Problem from '../components/Problem';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navbar />
      <Hero />
      <Problem />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default LandingPage;
