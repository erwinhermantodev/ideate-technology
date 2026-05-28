import React from 'react';

interface CompanyLogoProps {
  className?: string;
  size?: number | string;
  mode?: 'icon' | 'emblem';
  showText?: boolean;
  textClass?: string;
}

export default function CompanyLogo({
  className = '',
  size = 40,
  mode = 'icon',
  showText = false,
  textClass = 'font-black tracking-tight text-[#121212]'
}: CompanyLogoProps) {
  
  // 10 teeth for the gear
  const teethElements = [];
  for (let i = 0; i < 10; i++) {
    const angle = i * 36;
    teethElements.push(
      <rect
        key={i}
        x="45"
        y="16"
        width="10"
        height="12"
        rx="2"
        transform={`rotate(${angle} 50 44)`}
      />
    );
  }

  // Beautiful render of the SVG
  const logoSvg = (
    <svg
      width={mode === 'emblem' ? '100%' : size}
      height={mode === 'emblem' ? '100%' : size}
      viewBox="0 0 100 100"
      className="overflow-visible select-none"
      referrerPolicy="no-referrer"
    >
      <defs>
        {/* Shading Gradients matching the user's high tech aesthetic */}
        <linearGradient id="logoOrangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA035" />
          <stop offset="60%" stopColor="#FF5C00" />
          <stop offset="100%" stopColor="#D84300" />
        </linearGradient>

        <linearGradient id="logoBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00B2FF" />
          <stop offset="50%" stopColor="#0057FF" />
          <stop offset="100%" stopColor="#002DBF" />
        </linearGradient>

        {/* Diagonal Masks to split top-left from bottom-right cleanly */}
        <clipPath id="clipTopLeft">
          <polygon points="-20,120 -20,-20 120,-20" />
        </clipPath>
        
        <clipPath id="clipBottomRight">
          <polygon points="120,-20 120,120 -20,120" />
        </clipPath>

        {/* Real transparent slice mask that cuts a clean diagonal line */}
        <mask id="logoCenterGap">
          <rect x="-20" y="-20" width="140" height="140" fill="white" />
          <line 
            x1="18" 
            y1="76" 
            x2="82" 
            y2="12" 
            stroke="black" 
            strokeWidth="4" 
            strokeLinecap="round" 
          />
        </mask>

        {/* Paths for text curvature (ONLY used in emblem mode) */}
        {/* Path for upper text wrapping clockwise, fitting R=42 centered at 50,44 */}
        <path 
          id="textArcTop" 
          d="M 12 44 A 38 38 0 0 1 88 44" 
          fill="none" 
        />
        {/* Path for lower text wrapping counter-clockwise (right-to-left) to keep letters upright */}
        <path 
          id="textArcBottom" 
          d="M 85 45 A 37 37 0 0 1 15 45" 
          fill="none" 
        />
      </defs>

      {/* Main Core Gear bulb group (with gap mask applied) */}
      <g mask="url(#logoCenterGap)">
        {/* TOP-LEFT SHIELD (Orange gradient) */}
        <g clipPath="url(#clipTopLeft)" fill="url(#logoOrangeGrad)">
          {/* Central backing node */}
          <circle cx="50" cy="44" r="23" />
          {/* Teeth */}
          {teethElements}
        </g>

        {/* BOTTOM-RIGHT SHIELD (Blue gradient) */}
        <g clipPath="url(#clipBottomRight)" fill="url(#logoBlueGrad)">
          {/* Central backing node */}
          <circle cx="50" cy="44" r="23" />
          {/* Teeth */}
          {teethElements}
        </g>
      </g>

      {/* Lightbulb Thread Base (Central gray contact capsules at bottom) */}
      <g fill="#4A4A4A">
        <rect x="36" y="74" width="28" height="4.5" rx="2.2" />
        <rect x="42" y="81" width="16" height="4.5" rx="2.2" />
      </g>

      {/* Schematic Network Node traces */}
      {/* Upper Right Trace (Connected to Blue network) */}
      <path 
        d="M 68 36 L 82 22 M 82 22 L 90 22 M 82 22 L 82 14" 
        stroke="#0057FF" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      <circle cx="90" cy="22" r="3" fill="#0057FF" />
      <circle cx="82" cy="14" r="3" fill="#0057FF" />

      {/* Lower Left Trace (Connected to Orange Network) */}
      <path 
        d="M 32 52 L 20 64" 
        stroke="#FF5C00" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      <circle cx="20" cy="64" r="3" fill="#FF5C00" />

      {/* CURVED EMBLEM TEXT (Only rendered when mode is 'emblem') */}
      {mode === 'emblem' && (
        <>
          {/* Upper Text */}
          <text 
            className="font-sans font-black tracking-[0.16em]" 
            fontSize="7" 
            fill="#121212"
          >
            <textPath href="#textArcTop" startOffset="50%" textAnchor="middle">
              IDEATE TECHNOLOGY
            </textPath>
          </text>

          {/* Lower Text */}
          <text 
            className="font-sans font-extrabold tracking-[0.06em]" 
            fontSize="4.8" 
            fill="#555555"
          >
            <textPath href="#textArcBottom" startOffset="50%" textAnchor="middle">
              For The Best Solution
            </textPath>
          </text>
        </>
      )}
    </svg>
  );

  if (mode === 'emblem') {
    return (
      <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
        <div className="w-64 h-64 relative flex items-center justify-center bg-neutral-100/50 rounded-full border border-neutral-250/20 shadow-xs">
          {logoSvg}
        </div>
      </div>
    );
  }

  // Standard icon horizontal logo
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {logoSvg}
      {showText && (
        <span className={`text-lg sm:text-xl md:text-2xl font-black ${textClass}`}>
          IDEATE TECHNOLOGY
        </span>
      )}
    </div>
  );
}
