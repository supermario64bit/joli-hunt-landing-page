import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VideoDemo from '../components/VideoDemo';
import Problem from '../components/Problem';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import HowItWorks from '../components/HowItWorks';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';
import FloatingCTA from '../components/FloatingCTA';
import SEO from '../components/SEO';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <SEO />
      <Navbar />
      <Hero />
      <VideoDemo />
      <Problem />
      <Features />
      <Testimonials />
      <HowItWorks />
      <CTABanner />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default LandingPage;
