import React from 'react';
import { LocationBeacon3D } from '../3D/LocationBeacon3D';
import { CASSIA_STORY } from '../../data/menuData';
import { useCursor } from '../../context/CursorContext';
import { soundEngine } from '../../utils/soundEngine';
import { MapPin, Phone, Clock, Navigation, Calendar } from 'lucide-react';

export const LocationSection = ({ onOpenReservation }) => {
  const { setCursor, resetCursor } = useCursor();

  const handleDirections = () => {
    soundEngine.playClick();
    window.open('https://maps.google.com/?q=Park+Road+Civil+Lines+Gorakhpur+Uttar+Pradesh', '_blank');
  };

  const handleCall = () => {
    soundEngine.playClick();
    window.location.href = `tel:${CASSIA_STORY.phone.replace(/\s+/g, '')}`;
  };

  return (
    <section 
      id="location" 
      className="relative w-full min-h-screen bg-[#070504] py-24 px-6 md:px-12 flex flex-col justify-center border-t border-[#D4AF37]/10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120d09] border border-[#D4AF37]/30 backdrop-blur-md mb-3">
            <MapPin size={12} className="text-[#D4AF37]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
              Gorakhpur, Uttar Pradesh
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[#F8F5EE]">
            The Destination
          </h2>

          <p className="font-editorial text-lg md:text-xl italic text-[#A3998D] max-w-lg mx-auto mt-2">
            An oasis of understated luxury nestled along the leafy avenues of Civil Lines.
          </p>
        </div>

        {/* Stylized Architectural Visualization & Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Stylized 3D Beacon Map Visualization */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#0d0907] p-6 shadow-2xl flex flex-col items-center">
            {/* Architectural Grid overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

            {/* Coordinates Badge */}
            <div className="w-full flex items-center justify-between text-[10px] text-[#A3998D] font-mono border-b border-[#D4AF37]/15 pb-3 mb-2 z-10">
              <span className="text-[#D4AF37] font-semibold">26°45'38.2"N · 83°22'23.5"E</span>
              <span>ELEVATION: 84M</span>
            </div>

            {/* 3D Golden Radar Beacon */}
            <LocationBeacon3D />

            <div className="text-center z-10 mt-2">
              <h4 className="font-display text-lg text-[#F8F5EE] tracking-widest">
                CASSIA · ESTATE RESERVE
              </h4>
              <p className="text-xs text-[#A3998D] mt-1 font-sans">
                {CASSIA_STORY.address}
              </p>
            </div>
          </div>

          {/* Right: Operational Details, Hours & Concierge */}
          <div className="lg:col-span-6 space-y-6">
            {/* Hours card */}
            <div className="p-6 rounded-2xl bg-[#0f0b08] border border-[#D4AF37]/20 space-y-4">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <Clock size={16} />
                <h4 className="font-display text-sm uppercase tracking-widest text-[#F8F5EE]">
                  Hours of Service
                </h4>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1.5 border-b border-[#D4AF37]/10">
                  <span className="text-[#A3998D]">Specialty Coffee Counter</span>
                  <span className="text-[#F8F5EE] font-medium">{CASSIA_STORY.hours.coffee}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#D4AF37]/10">
                  <span className="text-[#A3998D]">Gastronomy & Dining</span>
                  <span className="text-[#F8F5EE] font-medium">{CASSIA_STORY.hours.dining}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#A3998D]">The Craft Cocktail Bar</span>
                  <span className="text-[#D4AF37] font-semibold">{CASSIA_STORY.hours.bar}</span>
                </div>
              </div>
            </div>

            {/* Concierge & Valet Card */}
            <div className="p-6 rounded-2xl bg-[#0f0b08] border border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mb-1">
                  Valet & Accessibility
                </span>
                <p className="text-xs text-[#E5DFD3]/80 font-sans">
                  Complimentary private valet parking available at our main porte-cochère.
                </p>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-[#18120d] border border-[#D4AF37]/30 text-[10px] text-[#D4AF37] tracking-wider whitespace-nowrap font-mono">
                VALET ON SITE
              </div>
            </div>

            {/* Quick Contact & Directions CTAs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleDirections}
                onMouseEnter={() => setCursor('NAVIGATE')}
                onMouseLeave={resetCursor}
                className="py-3.5 px-6 rounded-full bg-[#140e0a] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060504] transition-all duration-300 text-xs font-display tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2"
              >
                <Navigation size={14} />
                <span>Get Directions</span>
              </button>

              <button
                onClick={handleCall}
                onMouseEnter={() => setCursor('CALL')}
                onMouseLeave={resetCursor}
                className="py-3.5 px-6 rounded-full bg-[#140e0a] border border-[#D4AF37]/40 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#060504] transition-all duration-300 text-xs font-display tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2"
              >
                <Phone size={14} />
                <span>Call Cassia</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
