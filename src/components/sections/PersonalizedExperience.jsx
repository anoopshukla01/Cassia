import React, { useState } from 'react';
import { PERSONALIZATION_OPTIONS } from '../../data/experienceData';
import { useCursor } from '../../context/CursorContext';
import { soundEngine } from '../../utils/soundEngine';
import { Sun, Moon, Coffee, Wine, Volume2, Users, Compass, ArrowRight } from 'lucide-react';

export const PersonalizedExperience = ({ onSelectRecommendation }) => {
  const [selectedTime, setSelectedTime] = useState(PERSONALIZATION_OPTIONS.timeOfDay[1]); // Default Golden Hour
  const [selectedFocus, setSelectedFocus] = useState(PERSONALIZATION_OPTIONS.focus[0]); // Default Coffee
  const [selectedAtmosphere, setSelectedAtmosphere] = useState(PERSONALIZATION_OPTIONS.atmosphere[0]); // Default Quiet
  const { setCursor, resetCursor } = useCursor();

  const handleTimeChange = (item) => {
    soundEngine.playClick();
    setSelectedTime(item);
  };

  const handleFocusChange = (item) => {
    soundEngine.playClick();
    setSelectedFocus(item);
  };

  const handleAtmosphereChange = (item) => {
    soundEngine.playClick();
    setSelectedAtmosphere(item);
  };

  return (
    <section
      id="your-cassia"
      className="relative w-full min-h-screen py-24 px-6 md:px-12 flex flex-col items-center justify-center transition-all duration-700 border-t border-[#D4AF37]/10"
      style={{
        background: selectedTime.bgGradient
      }}
    >
      <div className="max-w-5xl mx-auto w-full z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140f0c]/80 border border-[#D4AF37]/30 backdrop-blur-md mb-3">
            <Compass size={12} className="text-[#D4AF37]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
              Curate Your Visit
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[#F8F5EE]">
            YOUR CASSIA
          </h2>

          <p className="font-editorial text-lg md:text-xl italic text-[#E5DFD3]/85 max-w-xl mx-auto mt-2">
            "Configure your preferred time, mood, and atmosphere. Let the room attune to you."
          </p>
        </div>

        {/* 3 Interactive Toggle Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Time of Day */}
          <div className="p-6 rounded-2xl bg-[#0f0b08]/80 border border-[#D4AF37]/20 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mb-3">
                01 · Hour & Lighting
              </span>
              <div className="space-y-2">
                {PERSONALIZATION_OPTIONS.timeOfDay.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleTimeChange(t)}
                    onMouseEnter={() => setCursor('LIGHT')}
                    onMouseLeave={resetCursor}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-display tracking-wider text-left transition-all flex items-center justify-between ${
                      selectedTime.id === t.id
                        ? 'bg-[#D4AF37] text-[#060504] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-[#18120d] text-[#A3998D] hover:text-[#F8F5EE] border border-transparent hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <span>{t.label}</span>
                    {t.id === 'morning' ? <Sun size={14} /> : <Moon size={14} />}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#A3998D] mt-4 font-sans italic border-t border-[#D4AF37]/10 pt-3">
              {selectedTime.vibe}
            </p>
          </div>

          {/* Culinary / Bar Focus */}
          <div className="p-6 rounded-2xl bg-[#0f0b08]/80 border border-[#D4AF37]/20 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mb-3">
                02 · Primary Pursuit
              </span>
              <div className="space-y-2">
                {PERSONALIZATION_OPTIONS.focus.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFocusChange(f)}
                    onMouseEnter={() => setCursor('CHOOSE')}
                    onMouseLeave={resetCursor}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-display tracking-wider text-left transition-all flex items-center justify-between ${
                      selectedFocus.id === f.id
                        ? 'bg-[#D4AF37] text-[#060504] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-[#18120d] text-[#A3998D] hover:text-[#F8F5EE] border border-transparent hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <span>{f.label}</span>
                    {f.id === 'coffee' ? <Coffee size={14} /> : <Wine size={14} />}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#A3998D] mt-4 font-sans italic border-t border-[#D4AF37]/10 pt-3">
              {selectedFocus.id === 'coffee'
                ? 'Espresso bar seating with barista consultation.'
                : 'Back-bar lounge seating with mixology service.'}
            </p>
          </div>

          {/* Room Atmosphere */}
          <div className="p-6 rounded-2xl bg-[#0f0b08]/80 border border-[#D4AF37]/20 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mb-3">
                03 · Social Cadence
              </span>
              <div className="space-y-2">
                {PERSONALIZATION_OPTIONS.atmosphere.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleAtmosphereChange(a)}
                    onMouseEnter={() => setCursor('SET')}
                    onMouseLeave={resetCursor}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-display tracking-wider text-left transition-all flex items-center justify-between ${
                      selectedAtmosphere.id === a.id
                        ? 'bg-[#D4AF37] text-[#060504] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                        : 'bg-[#18120d] text-[#A3998D] hover:text-[#F8F5EE] border border-transparent hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <span>{a.label}</span>
                    {a.id === 'quiet' ? <Volume2 size={14} /> : <Users size={14} />}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-[11px] text-[#A3998D] mt-4 font-sans italic border-t border-[#D4AF37]/10 pt-3">
              {selectedAtmosphere.note}
            </p>
          </div>
        </div>

        {/* Personalized Recommendation Card */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-[#18110b] via-[#120d09] to-[#18110b] border border-[#D4AF37]/35 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold block mb-1">
              Your Customized Cassia Recommendation
            </span>
            <h3 className="font-display text-2xl md:text-3xl text-[#F8F5EE]">
              {selectedTime.heroRecommendation}
            </h3>
            <p className="text-xs text-[#E5DFD3]/80 font-editorial italic mt-1">
              Ideal for {selectedTime.label} · {selectedFocus.label} · {selectedAtmosphere.label}
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              const el = document.getElementById('reservation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={() => setCursor('RESERVE')}
            onMouseLeave={resetCursor}
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0D4] to-[#D4AF37] text-[#060504] font-display font-bold text-xs tracking-[0.2em] uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all flex items-center gap-2 shrink-0"
          >
            <span>Book This Experience</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
