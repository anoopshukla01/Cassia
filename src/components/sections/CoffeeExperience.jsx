import React, { useState } from 'react';
import { CoffeeCup3D } from '../3D/CoffeeCup3D';
import { Sparkles, Flame, Droplets, ArrowDown } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { useCursor } from '../../context/CursorContext';

export const CoffeeExperience = () => {
  const [isPouring, setIsPouring] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  const triggerPour = () => {
    soundEngine.playCoffeeSteam();
    setIsPouring(true);
    setTimeout(() => setIsPouring(false), 2800);
  };

  const scrollToMenu = () => {
    const el = document.getElementById('coffee-menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="coffee" className="relative w-full min-h-screen bg-[#070504] py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden border-t border-[#D4AF37]/10">
      {/* Background Subtle Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(138,90,43,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Section Tag */}
      <div className="text-center z-10 mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140f0c] border border-[#D4AF37]/30 backdrop-blur-md mb-4">
          <Droplets size={12} className="text-[#D4AF37]" />
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
            Act I · The Morning Ritual
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-semibold tracking-[0.25em] text-[#F8F5EE]">
          COFFEE
        </h2>

        <p className="font-editorial text-xl sm:text-2xl md:text-3xl italic text-[#E5DFD3]/85 max-w-xl mx-auto mt-2">
          "Poured with intention. Roasted for depth."
        </p>
      </div>

      {/* Main 3D Coffee Presentation */}
      <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
        {/* Left Editorial Notes */}
        <div className="w-full lg:w-1/3 space-y-6 text-left order-2 lg:order-1">
          <div className="border-l-2 border-[#D4AF37]/40 pl-4 py-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A3998D] block">
              The Roast Profile
            </span>
            <h3 className="font-display text-lg text-[#F8F5EE] mt-1">
              Estate Grown Single-Origin
            </h3>
            <p className="text-xs text-[#A3998D] leading-relaxed mt-2 font-sans">
              Calibrated daily on our custom synesso espresso machine. Washed high-altitude micro-lots from Chikmagalur and Ethiopia, roasted locally in Gorakhpur to preserve delicate floral notes and rich dark cocoa undertones.
            </p>
          </div>

          <div className="border-l-2 border-[#D4AF37]/40 pl-4 py-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#A3998D] block">
              The Wild Cassia Infusion
            </span>
            <h3 className="font-display text-lg text-[#F8F5EE] mt-1">
              Spiced Sweetness Without Sugar
            </h3>
            <p className="text-xs text-[#A3998D] leading-relaxed mt-2 font-sans">
              Hand-broken quills of aged wild cassia bark steeping directly into the extraction chamber, imparting natural warm sweetness and an intoxicating woody aroma.
            </p>
          </div>

          <button
            onClick={triggerPour}
            onMouseEnter={() => setCursor('POUR')}
            onMouseLeave={resetCursor}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#181310] border border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060504] transition-all duration-300 text-xs font-display tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <Flame size={14} />
            <span>{isPouring ? 'Extracting Espresso Crema...' : 'Simulate Extraction'}</span>
          </button>
        </div>

        {/* Center: 3D Ceramic Cup & Steam on Nero Marquina */}
        <div className="w-full lg:w-2/3 order-1 lg:order-2 flex flex-col items-center">
          <CoffeeCup3D />
          <p className="text-[9px] tracking-[0.25em] text-[#A3998D]/70 uppercase -mt-4">
            Interactive 3D Espresso · Drag to Inspect Angle
          </p>
        </div>
      </div>

      {/* Scroll to Coffee Menu */}
      <button
        onClick={scrollToMenu}
        onMouseEnter={() => setCursor('MENU')}
        onMouseLeave={resetCursor}
        className="mt-12 flex flex-col items-center gap-2 text-[#A3998D] hover:text-[#D4AF37] transition-colors z-10"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">View Coffee Selections</span>
        <ArrowDown size={14} className="animate-bounce text-[#D4AF37]" />
      </button>
    </section>
  );
};
