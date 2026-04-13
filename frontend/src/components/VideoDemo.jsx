import React, { useState } from 'react';
import { Play, Users } from 'lucide-react';

const VideoDemo = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-12 bg-[#FAFAF8] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4A017 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Trust Badge */}
        <div className="flex justify-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-[#D4A017] bg-opacity-10 px-6 py-3 rounded-full">
            <Users className="w-5 h-5 text-[#D4A017]" />
            <span className="font-bold text-[#D4A017]">Join 1,000+ job seekers organizing their search</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-12 animate-fade-in-up delay-100">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1C1C1C] mb-4">
            See JoliHunt in <span className="text-[#D4A017]">Action</span>
          </h2>
          <p className="text-lg md:text-xl text-[#6B6B6B] max-w-2xl mx-auto">
            Watch how easy it is to track your applications, schedule interviews, and land offers.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative animate-fade-in-up delay-200">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video">
            {!isPlaying ? (
              // Thumbnail with Play Button
              <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] flex items-center justify-center group cursor-pointer"
                onClick={() => setIsPlaying(true)}
              >
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAyMCAwIEwgMCAwIDAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')] opacity-40"></div>
                
                {/* Play Button */}
                <div className="relative z-10 w-24 h-24 bg-[#D4A017] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                  <Play className="w-10 h-10 text-white ml-1" fill="white" />
                </div>

                {/* Pulsing Rings */}
                <div className="absolute w-24 h-24 bg-[#D4A017] rounded-full animate-ping opacity-20"></div>
                <div className="absolute w-32 h-32 bg-[#D4A017] rounded-full animate-pulse opacity-10"></div>

                {/* Duration Badge */}
                <div className="absolute bottom-6 right-6 bg-black/80 px-4 py-2 rounded-lg backdrop-blur-sm">
                  <span className="text-white font-semibold text-sm">2:30</span>
                </div>
              </div>
            ) : (
              // YouTube Embed
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/uwAnvbtIjrg?autoplay=1"
                title="JoliHunt Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#D4A017] opacity-10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4A017] opacity-10 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoDemo;
