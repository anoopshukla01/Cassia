import React, { useState } from 'react';
import { CocktailGlass3D } from '../3D/CocktailGlass3D';
import { Wine, Sparkles, Check, ArrowRight } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { useCursor } from '../../context/CursorContext';

export const CocktailSequence = ({ onExploreBarMenu }) => {
  const [activeStep, setActiveStep] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  const steps = [
    { title: 'The Crystal Coupe', desc: 'Heavy diamond cut crystal pre-chilled to -4°C.' },
    { title: 'The Carved Ice Sphere', desc: 'Hand-carved directional-frozen crystal clear ice.' },
    { title: 'Bourbon & House Bitters', desc: 'Aged oak spirit blended with roasted cassia nectar.' },
    { title: 'The Shaker Movement', desc: 'Hard Japanese shake aerating and chilling to perfection.' },
    { title: 'Flamed Cassia Quill', desc: 'Torched cinnamon bark releasing wild fragrant smoke.' }
  ];

  const handleStepClick = (index) => {
    soundEngine.playIceClink();
    setActiveStep(index);
  };

  return (
    <section id="bar" className="relative w-full min-h-screen bg-[#070503] py-24 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden border-t border-[#D4AF37]/10">
      {/* Background Amber Speakeasy Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(196,110,24,0.15)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Header */}
      <div className="text-center z-10 mb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16100b] border border-[#D4AF37]/30 backdrop-blur-md mb-4">
          <Wine size={12} className="text-[#D4AF37]" />
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
            Act II · The Alchemical Bar
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-semibold tracking-[0.25em] text-[#F8F5EE]">
          THE BAR
        </h2>

        <p className="font-editorial text-xl sm:text-2xl md:text-3xl italic text-[#E5DFD3]/90 max-w-xl mx-auto mt-2">
          "Crafted for the discerning palate. Scented with wild botanicals."
        </p>
      </div>

      {/* 3D Glass & Interactive Choreography Steps */}
      <div className="relative w-full max-w-5xl flex flex-col lg:flex-row items-center justify-between gap-8 z-10">
        {/* Left: 3D Cocktail Model */}
        <div className="w-full lg:w-3/5 flex flex-col items-center">
          <CocktailGlass3D />
          <p className="text-[9px] tracking-[0.25em] text-[#A3998D]/70 uppercase -mt-4">
            Interactive 3D Old Fashioned · Hand-Carved Ice & Torched Quill
          </p>
        </div>

        {/* Right: Step-by-Step Mixology Choreography */}
        <div className="w-full lg:w-2/5 space-y-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] block font-semibold mb-2">
            The 5-Step Pour Sequence
          </span>

          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => handleStepClick(idx)}
                onMouseEnter={() => setCursor('STEP')}
                onMouseLeave={resetCursor}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                  isActive
                    ? 'bg-[#18110b] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#100b08]/70 border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:bg-[#140e0a]'
                }`}
              >
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-display font-bold shrink-0 transition-colors ${
                  isActive ? 'bg-[#D4AF37] text-[#060504]' : 'border border-[#D4AF37]/30 text-[#A3998D]'
                }`}>
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-display text-sm text-[#F8F5EE]">{step.title}</h4>
                  <p className="text-[11px] text-[#A3998D] mt-0.5 font-sans leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => {
                soundEngine.playIceClink();
                const el = document.getElementById('bar-menu');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={() => setCursor('EXPLORE')}
              onMouseLeave={resetCursor}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0D4] to-[#D4AF37] text-[#060504] text-xs font-display font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <span>Explore The Cocktail List</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
