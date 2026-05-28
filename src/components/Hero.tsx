import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { HeroContent } from '../types';

interface HeroProps {
  hero: HeroContent;
}

export default function Hero({ hero }: HeroProps) {
  // Parallax translation coords based on cursor coordinates
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate delta from viewport middle
      const deltaX = (e.clientX - window.innerWidth / 2) * 0.015;
      const deltaY = (e.clientY - window.innerHeight / 2) * 0.015;
      setCoords({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      className="relative min-h-[95vh] flex items-center pt-28 pb-16 overflow-hidden bg-white select-none"
    >
      {/* Decorative Grid Lines (Nodding to Swiss architectural draft pages) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E5E5_1px,transparent_1px),linear-gradient(to_bottom,#E5E5E5_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-[0.25] pointer-events-none" />

      {/* Grid container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 w-full z-10 grid grid-cols-12 gap-8 relative">
        
        {/* Caption Column */}
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center text-left relative z-10">
          
          {/* Tagline */}
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[11px] sm:text-[12px] font-bold text-[#FF5C00] tracking-[0.25em] mb-6 block"
          >
            {hero.tagline}
          </motion.span>

          {/* Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black text-[#121212] tracking-tighter leading-[1.05] mb-12 max-w-4xl font-sans"
            dangerouslySetInnerHTML={{ __html: hero.titleHtml }}
          />

          {/* Core Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-8"
          >
            <a 
              href="#services"
              className="bg-[#121212] text-white hover:bg-[#FF5C00] text-xs font-bold uppercase tracking-widest px-10 py-5 rounded-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95 text-center w-full sm:w-auto"
            >
              {hero.primaryCtaText}
            </a>

            <a 
              href="#about"
              className="group flex items-center justify-center gap-2 text-[#121212] hover:text-[#0057FF] text-xs font-extrabold uppercase tracking-widest py-3 transition-colors duration-300 w-full sm:w-auto"
            >
              <span>{hero.secondaryCtaText}</span>
              <ArrowRight className="w-4 h-4 text-[#FF5C00] transition-transform duration-300 group-hover:translate-x-1.5" />
            </a>
          </motion.div>
        </div>

      </div>

      {/* 3D Glass Sculpture Placeholder - Clean Absolute Offset Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        style={{
          transform: `translate(${coords.x}px, ${coords.y}px)`,
        }}
        className="absolute bottom-0 right-0 w-[80%] sm:w-[60%] md:w-[50%] h-[75%] md:h-[85%] z-0 opacity-80 md:opacity-95 pointer-events-none transition-transform duration-300 ease-out flex items-end justify-end"
      >
        
      </motion.div>
    </section>
  );
}
