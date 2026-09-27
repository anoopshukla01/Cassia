import React, { useRef, useState, useEffect } from 'react';
import { useCursor } from '../../context/CursorContext';
import { Sparkles, DoorOpen } from 'lucide-react';

export const EntranceSequence = () => {
  const containerRef = useRef(null);
  const [doorOpenRatio, setDoorOpenRatio] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Calculate how far the entrance has entered/scrolled through view
      const totalDist = rect.height;
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / (totalDist * 0.7)));
      setDoorOpenRatio(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="entrance"
      ref={containerRef}
      className="relative w-full h-[180vh] bg-[#060504] text-[#F8F5EE]"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        {/* Exterior Facade at Twilight Dusk */}
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transform: `scale(${1 + doorOpenRatio * 0.25})`,
            filter: `brightness(${0.4 + doorOpenRatio * 0.7})`
          }}
        >
          <img
            src="/assets/hero/entrance_doors.jpg"
            alt="Entrance to Cassia Gorakhpur"
            className="w-full h-full object-cover object-center"
          />
          {/* Volumetric warm amber light spill mask that expands as doors open */}
          <div 
            className="absolute inset-0 bg-radial-gradient pointer-events-none transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, rgba(212, 175, 55, ${0.15 + doorOpenRatio * 0.35}) 0%, rgba(6, 5, 4, ${0.85 - doorOpenRatio * 0.5}) 70%)`
            }}
          />
        </div>

        {/* 3D Double Bronze & Ribbed Glass Doors Simulation */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          {/* Left Door */}
          <div
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#060504]/50 to-[#080605]/80 border-r border-[#D4AF37]/30 transition-transform duration-700 ease-out origin-left flex items-center justify-end pr-6"
            style={{
              transform: `perspective(1000px) rotateY(${-doorOpenRatio * 75}deg)`
            }}
          >
            <div className="h-48 w-1 bg-[#D4AF37]/60 rounded-full shadow-[0_0_15px_#D4AF37]" />
          </div>

          {/* Right Door */}
          <div
            className="w-1/2 h-full bg-gradient-to-l from-transparent via-[#060504]/50 to-[#080605]/80 border-l border-[#D4AF37]/30 transition-transform duration-700 ease-out origin-right flex items-center justify-start pl-6"
            style={{
              transform: `perspective(1000px) rotateY(${doorOpenRatio * 75}deg)`
            }}
          >
            <div className="h-48 w-1 bg-[#D4AF37]/60 rounded-full shadow-[0_0_15px_#D4AF37]" />
          </div>
        </div>

        {/* Interior Reveal Layer (Interior Salon & Marble Bar) */}
        <div
          className="absolute inset-0 z-15 transition-opacity duration-700 pointer-events-none"
          style={{
            opacity: Math.max(0, (doorOpenRatio - 0.35) * 1.5),
            transform: `scale(${1.1 - doorOpenRatio * 0.1})`
          }}
        >
          <img
            src="/assets/experience/interior_ambience.jpg"
            alt="Cassia Grand Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060504] via-transparent to-[#060504]/70" />
        </div>

        {/* Cinematic Welcome Editorial Overlay */}
        <div 
          className="relative z-20 text-center px-6 max-w-4xl transition-all duration-700"
          style={{
            opacity: doorOpenRatio > 0.4 ? 1 : 0.2,
            transform: `translateY(${30 - doorOpenRatio * 30}px)`
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0d0a08]/80 border border-[#D4AF37]/30 mb-6 backdrop-blur-md">
            <Sparkles size={12} className="text-[#D4AF37]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.35em] uppercase text-[#F8F5EE]">
              The Threshold
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-7xl font-semibold tracking-[0.2em] text-[#F8F5EE] leading-tight drop-shadow-xl">
            WELCOME TO <span className="text-gold-gradient">CASSIA</span>
          </h2>

          <p className="mt-6 font-editorial text-xl sm:text-2xl md:text-3xl italic text-[#E5DFD3]/90 max-w-2xl mx-auto leading-relaxed">
            "Step into an atmosphere designed to quiet the city and awaken the palate."
          </p>

          <p className="mt-4 text-xs md:text-sm text-[#A3998D] tracking-[0.25em] uppercase font-sans-ui">
            Nero Marquina Marble · Handcrafted Brass · Warm Timber
          </p>
        </div>

        {/* Subtle bottom gradient to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#060504] to-transparent z-25 pointer-events-none" />
      </div>
    </section>
  );
};
