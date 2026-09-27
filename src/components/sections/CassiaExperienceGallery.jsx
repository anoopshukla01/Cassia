import React, { useRef, useState, useEffect } from 'react';
import { GALLERY_MOMENTS } from '../../data/experienceData';
import { useCursor } from '../../context/CursorContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const CassiaExperienceGallery = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalScrollable = rect.height - windowH;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative w-full h-[240vh] bg-[#050403] text-[#F8F5EE] border-t border-[#D4AF37]/10"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-center px-6 md:px-16">
        {/* Editorial Top Title */}
        <div className="max-w-6xl mx-auto w-full mb-8 z-10 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-2 font-semibold">
              Atmosphere & Rhythm
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[#F8F5EE]">
              The Cassia Experience
            </h2>
          </div>
          <p className="font-editorial text-lg md:text-xl italic text-[#D4AF37] mt-3 md:mt-0 tracking-wide">
            "NOT JUST A TABLE. A PLACE TO STAY A LITTLE LONGER."
          </p>
        </div>

        {/* Horizontal Moving Cinematic Track */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-8 transition-transform duration-300 ease-out will-change-transform"
            style={{
              transform: `translateX(${-scrollProgress * (GALLERY_MOMENTS.length - 1) * 360}px)`
            }}
          >
            {GALLERY_MOMENTS.map((moment, idx) => (
              <div
                key={moment.id}
                onMouseEnter={() => setCursor('DISCOVER')}
                onMouseLeave={resetCursor}
                className="w-[320px] sm:w-[420px] md:w-[500px] shrink-0 rounded-2xl overflow-hidden border border-[#D4AF37]/25 bg-[#0f0b08] shadow-2xl group flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={moment.image}
                    alt={moment.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090604] via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] tracking-[0.25em] uppercase font-bold bg-[#060403]/85 border border-[#D4AF37]/30 text-[#D4AF37] backdrop-blur-md">
                    {moment.tag}
                  </span>
                </div>

                <div className="p-6 bg-gradient-to-b from-[#140e0a] to-[#0c0806] flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl text-[#F8F5EE] group-hover:text-[#D4AF37] transition-colors">
                      {moment.title}
                    </h3>
                    <p className="text-xs text-[#A3998D] mt-1 font-sans">
                      {moment.subtitle}
                    </p>
                  </div>

                  <p className="mt-4 pt-4 border-t border-[#D4AF37]/15 font-editorial text-sm italic text-[#E5DFD3]/85">
                    "{moment.quote}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Progress Indicator Strip */}
        <div className="max-w-6xl mx-auto w-full mt-8 flex items-center justify-between text-[10px] text-[#A3998D] tracking-widest uppercase">
          <span>01 / Entrance</span>
          <div className="w-48 h-[2px] bg-[#1a1410] rounded-full overflow-hidden mx-4">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-150"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
          <span>05 / Cuisine</span>
        </div>
      </div>
    </section>
  );
};
