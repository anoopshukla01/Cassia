import React from 'react';
import { CASSIA_STORY } from '../../data/menuData';
import { useCursor } from '../../context/CursorContext';
import { soundEngine } from '../../utils/soundEngine';
import { ArrowUp, Mail, Phone, MessageSquare } from 'lucide-react';

export const FinalScene = ({ onOpenReservation }) => {
  const { setCursor, resetCursor } = useCursor();

  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#050403] text-[#F8F5EE] pt-28 pb-16 px-6 md:px-12 flex flex-col items-center justify-center border-t border-[#D4AF37]/15 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full text-center relative z-10">
        {/* Brand Mark with Light Sweep */}
        <div className="w-16 h-16 mx-auto mb-8 rounded-full border border-[#D4AF37]/50 p-3 light-sweep shadow-[0_0_30px_rgba(212,175,55,0.25)] flex items-center justify-center">
          <img src="/assets/logo/cassia_mark.svg" alt="Cassia Crest" className="w-full h-full" />
        </div>

        {/* Grand Typography Logo */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[0.3em] text-gold-shimmer mb-4">
          CASSIA
        </h2>

        {/* Editorial Tagline */}
        <p className="font-editorial text-xl sm:text-2xl md:text-3xl italic text-[#E5DFD3]/90 tracking-wider max-w-xl mx-auto mb-6">
          "Coffee · Progressive Cuisine · The Bar"
        </p>

        <p className="text-xs text-[#A3998D] tracking-[0.35em] uppercase font-sans-ui mb-10">
          Gorakhpur, Uttar Pradesh · India
        </p>

        {/* Reserve CTA Button */}
        <div className="mb-14">
          <button
            onClick={() => {
              soundEngine.playClick();
              const el = document.getElementById('reservation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => setCursor('RESERVE')}
            onMouseLeave={resetCursor}
            className="px-10 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0D4] to-[#D4AF37] text-[#060403] font-display font-bold text-xs tracking-[0.3em] uppercase hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] transition-all duration-300"
          >
            RESERVE YOUR TABLE
          </button>
        </div>

        {/* Social Links & Concierge Contacts */}
        <div className="flex items-center justify-center gap-6 mb-12 text-[#A3998D]">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursor('INSTAGRAM')}
            onMouseLeave={resetCursor}
            className="p-3 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            aria-label="Instagram"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          <a
            href={`https://wa.me/${CASSIA_STORY.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => setCursor('WHATSAPP')}
            onMouseLeave={resetCursor}
            className="p-3 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            aria-label="WhatsApp"
          >
            <MessageSquare size={16} />
          </a>
          <a
            href={`tel:${CASSIA_STORY.phone.replace(/\s+/g, '')}`}
            onMouseEnter={() => setCursor('CALL')}
            onMouseLeave={resetCursor}
            className="p-3 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            aria-label="Phone"
          >
            <Phone size={16} />
          </a>
          <a
            href={`mailto:${CASSIA_STORY.email}`}
            onMouseEnter={() => setCursor('EMAIL')}
            onMouseLeave={resetCursor}
            className="p-3 rounded-full border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
            aria-label="Email"
          >
            <Mail size={16} />
          </a>
        </div>

        {/* Return to Top Button */}
        <button
          onClick={scrollToTop}
          onMouseEnter={() => setCursor('TOP')}
          onMouseLeave={resetCursor}
          className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-[#A3998D] hover:text-[#D4AF37] transition-colors mb-12"
        >
          <ArrowUp size={12} />
          <span>Return To Threshold</span>
        </button>

        {/* Fine Print / Credits */}
        <div className="pt-8 border-t border-[#D4AF37]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#A3998D]/60 tracking-widest font-sans">
          <span>© {new Date().getFullYear()} CASSIA HOSPITALITY GROUP. ALL RIGHTS RESERVED.</span>
          <span>PARK ROAD, CIVIL LINES, GORAKHPUR 273001</span>
        </div>
      </div>
    </footer>
  );
};
