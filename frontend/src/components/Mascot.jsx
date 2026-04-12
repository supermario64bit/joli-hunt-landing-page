import React from 'react';

const Mascot = ({ className = "", animate = true, variant = "default", size = "md" }) => {
  const sizeClasses = {
    sm: "w-16 h-24",
    md: "w-24 h-32",
    lg: "w-32 h-44",
    xl: "w-48 h-64"
  };

  // Yellow color from logo
  const primaryColor = "#D4A017";
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 200 280"
        className={`w-full h-full ${animate ? 'animate-float' : ''}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Head */}
        <circle cx="100" cy="40" r="28" fill={primaryColor} className="drop-shadow-lg" />
        
        {/* Body - J shape */}
        <path
          d="M 85 70 Q 85 65 90 65 L 110 65 Q 115 65 115 70 L 115 160 Q 115 180 95 180 Q 75 180 75 160 L 75 140 Q 75 135 80 135 L 90 135 Q 95 135 95 140 L 95 155 Q 95 165 100 165 Q 105 165 105 155 L 105 70 Z"
          fill={primaryColor}
          className="drop-shadow-lg"
        />
        
        {/* Briefcase - conditionally render based on variant */}
        {variant !== "reading" && variant !== "presenting" && (
          <g className={animate ? 'animate-swing' : ''} style={{ transformOrigin: '65px 120px' }}>
            {/* Briefcase body */}
            <rect x="40" y="115" width="50" height="35" rx="3" fill="#1A1A1A" className="drop-shadow-md" />
            
            {/* Briefcase handle */}
            <path
              d="M 55 115 Q 55 105 65 105 Q 75 105 75 115"
              stroke="#1A1A1A"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Briefcase lock */}
            <rect x="62" y="125" width="6" height="8" rx="1" fill={primaryColor} opacity="0.8" />
            
            {/* Briefcase details */}
            <line x1="65" y1="115" x2="65" y2="150" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" />
          </g>
        )}
        
        {/* Document/Book for reading variant */}
        {variant === "reading" && (
          <g transform="translate(50, 100)">
            <rect x="0" y="0" width="60" height="45" rx="2" fill="white" stroke="#1A1A1A" strokeWidth="2" />
            <line x1="10" y1="12" x2="50" y2="12" stroke="#6B6B6B" strokeWidth="2" />
            <line x1="10" y1="20" x2="50" y2="20" stroke="#6B6B6B" strokeWidth="2" />
            <line x1="10" y1="28" x2="40" y2="28" stroke="#6B6B6B" strokeWidth="2" />
          </g>
        )}
        
        {/* Megaphone for presenting variant */}
        {variant === "presenting" && (
          <g transform="translate(45, 110)">
            <path d="M 0 10 L 30 0 L 30 20 L 0 10 Z" fill={primaryColor} />
            <circle cx="35" cy="10" r="8" fill={primaryColor} opacity="0.3" className="animate-pulse" />
            <circle cx="42" cy="10" r="12" fill={primaryColor} opacity="0.2" className="animate-pulse" />
          </g>
        )}
        
        {/* Arms */}
        <g>
          {/* Left arm */}
          <path
            d="M 85 85 Q 70 90 65 100 L 50 110"
            stroke={primaryColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-md"
          />
          
          {/* Right arm holding briefcase or item */}
          <path
            d="M 115 85 Q 110 95 100 105"
            stroke={primaryColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-md"
          />
        </g>
        
        {/* Legs */}
        <g>
          {/* Left leg */}
          <path
            d="M 90 180 L 85 220 Q 85 225 80 225 L 75 225"
            stroke={primaryColor}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-md"
          />
          
          {/* Right leg */}
          <path
            d="M 100 180 L 105 220 Q 105 225 110 225 L 115 225"
            stroke={primaryColor}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-md"
          />
        </g>
        
        {/* Face details */}
        <g>
          {/* Eyes */}
          <circle cx="92" cy="38" r="3" fill="white" />
          <circle cx="108" cy="38" r="3" fill="white" />
          
          {/* Smile */}
          <path
            d="M 90 48 Q 100 52 110 48"
            stroke="white"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </g>
        
        {/* Sparkles around mascot */}
        {animate && (
          <g className="animate-pulse">
            <circle cx="30" cy="60" r="3" fill={primaryColor} opacity="0.6" />
            <circle cx="170" cy="80" r="3" fill={primaryColor} opacity="0.6" />
            <circle cx="50" cy="160" r="2" fill={primaryColor} opacity="0.6" />
            <circle cx="150" cy="140" r="2" fill={primaryColor} opacity="0.6" />
          </g>
        )}
      </svg>
    </div>
  );
};

export default Mascot;
