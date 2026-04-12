import React from 'react';
import DashboardMockup from './DashboardMockup';
import { features } from '../data/mockData';

const Features = () => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1C1C1C] text-center mb-12 lg:mb-20">
          Everything your job search needs
        </h2>

        <div className="space-y-20 lg:space-y-32">
          {features.map((feature, index) => {
            const isLeft = feature.position === 'left';
            return (
              <div
                key={feature.id}
                className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Text Content */}
                <div className={`${isLeft ? 'lg:order-1' : 'lg:order-2'} ${!isLeft ? 'lg:pl-8' : 'lg:pr-8'}`}>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1C1C1C] mb-4 lg:mb-6">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-[#6B6B6B] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Mockup */}
                <div className={`${isLeft ? 'lg:order-2' : 'lg:order-1'} transform hover:scale-105 transition-transform duration-300`}>
                  <DashboardMockup type={feature.mockupType} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
