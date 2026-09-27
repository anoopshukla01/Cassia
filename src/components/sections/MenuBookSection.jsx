import React, { useState } from 'react';
import { MenuBook3D } from '../3D/MenuBook3D';
import { BookOpen, Sparkles, ArrowRight } from 'lucide-react';
import { useCursor } from '../../context/CursorContext';

export const MenuBookSection = ({ onOpenFullMenu }) => {
  const [activeCategory, setActiveCategory] = useState('coffee');
  const { setCursor, resetCursor } = useCursor();

  return (
    <section 
      id="menu-book" 
      className="relative w-full min-h-screen bg-[#060403] py-24 px-6 md:px-12 flex flex-col items-center justify-center border-t border-[#D4AF37]/10"
    >
      <div className="max-w-5xl mx-auto w-full text-center">
        {/* Flagship Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120d09] border border-[#D4AF37]/30 backdrop-blur-md mb-4">
          <BookOpen size={12} className="text-[#D4AF37]" />
          <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
            The Interactive Manuscript
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wider text-[#F8F5EE]">
          The 3D Menu Book
        </h2>

        <p className="font-editorial text-xl sm:text-2xl md:text-3xl italic text-[#E5DFD3]/85 max-w-xl mx-auto mt-2 mb-10">
          "Turn each physical leaf in three-dimensional space, or expand into the full catalog."
        </p>

        {/* 3D Physical Menu Book on Polished Nero Marquina Marble */}
        <div className="relative w-full flex flex-col items-center">
          <MenuBook3D
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onOpenFullMenu={onOpenFullMenu}
          />
        </div>
      </div>
    </section>
  );
};
