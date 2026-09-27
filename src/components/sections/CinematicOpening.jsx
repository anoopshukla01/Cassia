import React, { useState, useEffect } from 'react';
import { HeroCassiaCanvas } from '../3D/HeroCassiaCanvas';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const CinematicOpening = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, scrollY / (vh * 1.2)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToEntrance = () => {
    const el = document.getElementById('entrance');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      className="relative w-full h-[140vh] bg-[#060504] overflow-hidden"
    >
      {/* Sticky 3D WebGL Architectural Sign & Camera Push */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center">
        <HeroCassiaCanvas scrollProgress={scrollProgress} />

        {/* Cinematic Title & Brand Aura */}
        <div 
          className="relative z-10 text-center px-4 pointer-events-none transition-opacity duration-700"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 1.8) }}
        >
          {/* Subtle Tagline */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
            <span className="text-[10px] md:text-xs tracking-[0.45em] text-[#D4AF37] uppercase font-sans-ui font-medium">
              Gorakhpur · Uttar Pradesh
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-semibold tracking-[0.3em] text-gold-shimmer drop-shadow-2xl">
            CASSIA
          </h1>

          <p className="mt-4 md:mt-6 font-editorial text-lg sm:text-xl md:text-2xl italic text-[#E5DFD3]/90 tracking-wide max-w-xl mx-auto">
            "A sanctuary of rare aromatics, specialty roasts & craft mixology."
          </p>

          <p className="mt-3 text-[10px] md:text-xs tracking-[0.35em] text-[#A3998D] uppercase font-sans-ui">
            Coffee · Progressive Cuisine · The Bar
          </p>
        </div>

        {/* Scroll Prompt at bottom */}
        <div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer transition-opacity duration-500"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 2.5) }}
          onClick={scrollToEntrance}
          onMouseEnter={() => setCursor('ENTER')}
          onMouseLeave={resetCursor}
        >
          <span className="text-[9px] tracking-[0.35em] uppercase text-[#A3998D] hover:text-[#D4AF37] transition-colors">
            Scroll To Enter
          </span>
          <ChevronDown size={14} className="text-[#D4AF37] animate-bounce" />
        </div>

        {/* Ambient bottom edge fog */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060504] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
