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
        
        {/* Variant-specific props */}
        {variant === "tired" && (
          <g>
            {/* Tired with papers/sheets */}
            <g transform="translate(40, 100)">
              {/* Stack of papers */}
              <rect x="0" y="5" width="50" height="40" rx="2" fill="white" stroke="#6B6B6B" strokeWidth="2" opacity="0.9" />
              <rect x="3" y="2" width="50" height="40" rx="2" fill="white" stroke="#6B6B6B" strokeWidth="2" opacity="0.8" />
              <rect x="6" y="-1" width="50" height="40" rx="2" fill="white" stroke="#6B6B6B" strokeWidth="2" />
              {/* Lines on paper */}
              <line x1="12" y1="8" x2="50" y2="8" stroke="#6B6B6B" strokeWidth="1.5" />
              <line x1="12" y1="15" x2="50" y2="15" stroke="#6B6B6B" strokeWidth="1.5" />
              <line x1="12" y1="22" x2="45" y2="22" stroke="#6B6B6B" strokeWidth="1.5" />
            </g>
            {/* Sweat drops */}
            <circle cx="85" cy="35" r="3" fill="#4FC3F7" opacity="0.7" />
            <circle cx="78" cy="42" r="2" fill="#4FC3F7" opacity="0.7" />
          </g>
        )}

        {variant === "worried" && (
          <g>
            {/* Calendar with X marks */}
            <g transform="translate(45, 105)">
              <rect x="0" y="0" width="55" height="50" rx="3" fill="white" stroke="#D32F2F" strokeWidth="3" />
              <rect x="0" y="0" width="55" height="12" rx="3" fill="#D32F2F" />
              {/* Calendar grid */}
              <line x1="10" y1="20" x2="45" y2="20" stroke="#6B6B6B" strokeWidth="1" />
              <line x1="10" y1="30" x2="45" y2="30" stroke="#6B6B6B" strokeWidth="1" />
              <line x1="10" y1="40" x2="45" y2="40" stroke="#6B6B6B" strokeWidth="1" />
              {/* X marks (missed dates) */}
              <line x1="15" y1="23" x2="22" y2="28" stroke="#D32F2F" strokeWidth="2" />
              <line x1="22" y1="23" x2="15" y2="28" stroke="#D32F2F" strokeWidth="2" />
              <line x1="32" y1="33" x2="39" y2="38" stroke="#D32F2F" strokeWidth="2" />
              <line x1="39" y1="33" x2="32" y2="38" stroke="#D32F2F" strokeWidth="2" />
            </g>
            {/* Worry lines */}
            <line x1="75" y1="45" x2="70" y2="50" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
            <line x1="125" y1="45" x2="130" y2="50" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          </g>
        )}

        {variant === "confused" && (
          <g>
            {/* Question marks floating around */}
            <text x="135" y="95" fontSize="24" fill="#6B6B6B" fontWeight="bold" opacity="0.6">?</text>
            <text x="155" y="115" fontSize="18" fill="#6B6B6B" fontWeight="bold" opacity="0.5">?</text>
            <text x="40" y="100" fontSize="20" fill="#6B6B6B" fontWeight="bold" opacity="0.6">?</text>
            <text x="25" y="125" fontSize="16" fill="#6B6B6B" fontWeight="bold" opacity="0.4">?</text>
            {/* Confused look - tilted head */}
            <line x1="92" y1="50" x2="88" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="108" y1="50" x2="112" y2="55" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </g>
        )}
        
        {/* Default briefcase for other variants */}
        {variant !== "reading" && variant !== "presenting" && variant !== "tired" && variant !== "worried" && variant !== "confused" && (
          <g className={animate ? 'animate-swing' : ''} style={{ transformOrigin: '65px 120px' }}>
            <rect x="40" y="115" width="50" height="35" rx="3" fill="#1A1A1A" className="drop-shadow-md" />
            <path d="M 55 115 Q 55 105 65 105 Q 75 105 75 115" stroke="#1A1A1A" strokeWidth="4" fill="none" strokeLinecap="round" />
            <rect x="62" y="125" width="6" height="8" rx="1" fill={primaryColor} opacity="0.8" />
            <line x1="65" y1="115" x2="65" y2="150" stroke={primaryColor} strokeWidth="1.5" opacity="0.5" />
          </g>
        )}
        
        {/* Document for reading variant */}
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
          <path
            d="M 85 85 Q 70 90 65 100 L 50 110"
            stroke={primaryColor}
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-md"
          />
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
          <path
            d="M 90 180 L 85 220 Q 85 225 80 225 L 75 225"
            stroke={primaryColor}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-md"
          />
          <path
            d="M 100 180 L 105 220 Q 105 225 110 225 L 115 225"
            stroke={primaryColor}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            className="drop-shadow-md"
          />
        </g>
        
        {/* Face details based on variant */}
        <g>
          {variant === "tired" ? (
            <>
              {/* Tired eyes */}
              <line x1="88" y1="38" x2="96" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <line x1="104" y1="38" x2="112" y2="38" stroke="white" strokeWidth="3" strokeLinecap="round" />
              {/* Tired mouth */}
              <path d="M 90 50 Q 100 47 110 50" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : variant === "worried" ? (
            <>
              {/* Worried eyes */}
              <circle cx="92" cy="38" r="3" fill="white" />
              <circle cx="108" cy="38" r="3" fill="white" />
              {/* Worried mouth */}
              <path d="M 90 52 Q 100 49 110 52" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          ) : variant === "confused" ? (
            <>
              {/* Confused eyes */}
              <circle cx="92" cy="40" r="2" fill="white" />
              <circle cx="108" cy="40" r="2" fill="white" />
              {/* Confused mouth */}
              <ellipse cx="100" cy="50" rx="8" ry="4" fill="white" />
            </>
          ) : (
            <>
              {/* Happy eyes */}
              <circle cx="92" cy="38" r="3" fill="white" />
              <circle cx="108" cy="38" r="3" fill="white" />
              {/* Smile */}
              <path d="M 90 48 Q 100 52 110 48" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
            </>
          )}
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
