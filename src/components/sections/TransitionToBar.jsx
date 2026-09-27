import React, { useRef, useState, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { Moon, Sparkles } from 'lucide-react';

export const TransitionToBar = () => {
  const sectionRef = useRef(null);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowH - rect.top) / (rect.height + windowH * 0.4)));
      setTransitionProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[160vh] bg-[#050403] text-[#F8F5EE] overflow-hidden"
    >
      <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: Coffee Counter Scene (Fades out) */}
        <div 
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            opacity: Math.max(0, 1 - transitionProgress * 1.8),
            transform: `scale(${1 + transitionProgress * 0.15})`
          }}
        >
          <img
            src="/assets/coffee/coffee_pour_hero.jpg"
            alt="Daytime Coffee Station"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#0a0705]/60" />
        </div>

        {/* Dynamic Color Grade Shift: Daylight Coffee Warmth -> Deep Twilight Amber Speakeasy */}
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-700"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, rgba(196, 110, 24, ${transitionProgress * 0.45}) 0%, rgba(6, 4, 3, ${0.4 + transitionProgress * 0.4}) 80%)`,
            mixBlendMode: 'screen'
          }}
        />

        {/* Layer 2: Bartender's Workstation Scene (Fades in) */}
        <div 
          className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
          style={{
            opacity: Math.min(1, Math.max(0, (transitionProgress - 0.25) * 1.6)),
            transform: `scale(${1.1 - transitionProgress * 0.08})`
          }}
        >
          <img
            src="/assets/bar/cocktail_smoked_hero.jpg"
            alt="Cocktail Bar Workstation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050403] via-transparent to-[#050403]/80" />
        </div>

        {/* Narrative Floating Type Overlay */}
        <div className="relative z-20 text-center px-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120d09]/90 border border-[#D4AF37]/30 mb-6 backdrop-blur-md">
            <Moon size={12} className="text-[#D4AF37]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
              The Metamorphosis
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-wider text-[#F8F5EE] leading-tight">
            WHEN DAYLIGHT TURNS TO <span className="text-gold-gradient">AMBER</span>
          </h2>

          <p className="mt-6 font-editorial text-xl sm:text-2xl md:text-3xl italic text-[#E5DFD3]/90 leading-relaxed">
            "The morning hum of grinders yields to the crisp percussion of crystal and ice."
          </p>

          <p className="mt-4 text-xs md:text-sm text-[#A3998D] tracking-[0.3em] uppercase font-sans-ui">
            Botanicals · Small-Batch Spirits · Smoked Cassia
          </p>
        </div>

        {/* Soft edge fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060403] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
