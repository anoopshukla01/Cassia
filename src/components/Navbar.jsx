import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';
import { useCursor } from '../context/CursorContext';

export const Navbar = ({ onOpenReservation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

      setScrolled(scrollY > 50);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundEngine.toggleMute();
    setIsAudioActive(active);
  };

  const scrollTo = (id) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div 
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-[#826312] via-[#D4AF37] to-[#FFF0D4] z-[9990] transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Floating Minimal Navigation Bar */}
      <header 
        className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-[9900] transition-all duration-500 rounded-full ${
          scrolled 
            ? 'luxury-glass py-2.5 px-6 shadow-2xl border border-[rgba(212,175,55,0.2)]' 
            : 'bg-transparent py-4 px-6 border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <button
            onClick={() => scrollTo('hero')}
            onMouseEnter={() => setCursor('TOP')}
            onMouseLeave={resetCursor}
            className="flex items-center gap-3 group text-left focus:outline-none"
            aria-label="Cassia Home"
          >
            <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center p-1.5 transition-transform duration-500 group-hover:scale-105 group-hover:border-[#D4AF37]">
              <img src="/assets/logo/cassia_mark.svg" alt="" className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-sm md:text-base font-semibold tracking-[0.25em] text-[#F8F5EE] group-hover:text-[#D4AF37] transition-colors">
                CASSIA
              </span>
              <span className="text-[8px] tracking-[0.3em] text-[#A3998D] -mt-0.5 hidden sm:block">
                GORAKHPUR
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] font-sans-ui tracking-[0.2em] uppercase text-[#E5DFD3]/80">
            <button
              onClick={() => scrollTo('experience')}
              onMouseEnter={() => setCursor('EXPLORE')}
              onMouseLeave={resetCursor}
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Experience
            </button>
            <button
              onClick={() => scrollTo('coffee')}
              onMouseEnter={() => setCursor('COFFEE')}
              onMouseLeave={resetCursor}
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Coffee
            </button>
            <button
              onClick={() => scrollTo('bar')}
              onMouseEnter={() => setCursor('THE BAR')}
              onMouseLeave={resetCursor}
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              The Bar
            </button>
            <button
              onClick={() => scrollTo('food')}
              onMouseEnter={() => setCursor('FOOD')}
              onMouseLeave={resetCursor}
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Cuisine
            </button>
            <button
              onClick={() => scrollTo('menu-book')}
              onMouseEnter={() => setCursor('3D BOOK')}
              onMouseLeave={resetCursor}
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Menu Book
            </button>
            <button
              onClick={() => scrollTo('location')}
              onMouseEnter={() => setCursor('FIND US')}
              onMouseLeave={resetCursor}
              className="hover:text-[#D4AF37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#D4AF37] hover:after:w-full after:transition-all"
            >
              Location
            </button>
          </nav>

          {/* Right Action Icons (Audio Toggle + Reserve CTA + Mobile Menu Button) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleSound}
              onMouseEnter={() => setCursor(isAudioActive ? 'MUTE' : 'UNMUTE')}
              onMouseLeave={resetCursor}
              className={`p-2.5 rounded-full border transition-all duration-300 flex items-center gap-2 ${
                isAudioActive 
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.3)]' 
                  : 'border-[#A3998D]/20 text-[#A3998D] hover:border-[#D4AF37]/50 hover:text-[#F8F5EE]'
              }`}
              title={isAudioActive ? 'Sound On' : 'Sound Off'}
              aria-label={isAudioActive ? 'Mute audio' : 'Unmute audio'}
            >
              {isAudioActive ? <Volume2 size={14} className="animate-pulse" /> : <VolumeX size={14} />}
              <span className="text-[9px] font-sans tracking-widest hidden md:inline uppercase">
                {isAudioActive ? 'Ambience' : 'Sound'}
              </span>
            </button>

            {/* Reserve CTA */}
            <button
              onClick={() => {
                soundEngine.playClick();
                if (onOpenReservation) onOpenReservation();
                else scrollTo('reservation');
              }}
              onMouseEnter={() => setCursor('RESERVE')}
              onMouseLeave={resetCursor}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#826312]/30 via-[#D4AF37]/20 to-[#826312]/30 text-[#F8F5EE] text-[10px] tracking-[0.2em] uppercase font-semibold hover:border-[#FFF0D4] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300"
            >
              <span>Reserve Table</span>
              <ArrowUpRight size={12} className="text-[#D4AF37]" />
            </button>

            {/* Mobile Circular Menu Button */}
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="lg:hidden w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center text-[#F8F5EE] hover:border-[#D4AF37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Luxury Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[9850] bg-[#060504]/96 backdrop-blur-2xl flex flex-col justify-between p-8 pt-24 animate-in fade-in duration-300">
          <div className="flex flex-col space-y-6">
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]/60">Navigation</span>
            {[
              { id: 'hero', label: 'Entrance' },
              { id: 'experience', label: 'The Cassia Experience' },
              { id: 'coffee', label: 'Specialty Coffee' },
              { id: 'bar', label: 'Craft Mixology & Bar' },
              { id: 'food', label: 'Culinary Gastronomy' },
              { id: 'menu-book', label: '3D Menu Book' },
              { id: 'your-cassia', label: 'Personalize Your Visit' },
              { id: 'location', label: 'Location & Hours' },
              { id: 'reservation', label: 'Table Reservations' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left font-display text-2xl text-[#F8F5EE] hover:text-[#D4AF37] transition-colors tracking-wider"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="border-t border-[#D4AF37]/20 pt-6 flex flex-col gap-4">
            <p className="text-xs text-[#A3998D] tracking-widest font-sans">
              Park Road, Civil Lines, Gorakhpur, UP
            </p>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                scrollTo('reservation');
              }}
              className="w-full py-3.5 rounded-full bg-[#D4AF37] text-[#060504] font-display font-semibold text-xs tracking-[0.25em] uppercase"
            >
              Reserve At Cassia
            </button>
          </div>
        </div>
      )}
    </>
  );
};
