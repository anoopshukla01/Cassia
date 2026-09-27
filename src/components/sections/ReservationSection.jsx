import React, { useState } from 'react';
import { Calendar, Clock, Users, Sparkles, CheckCircle2, Send, MessageSquare } from 'lucide-react';
import { CASSIA_STORY } from '../../data/menuData';
import { useCursor } from '../../context/CursorContext';
import { soundEngine } from '../../utils/soundEngine';

export const ReservationSection = () => {
  const [formData, setFormData] = useState({
    guests: '2 Guests',
    date: new Date().toISOString().split('T')[0],
    time: '20:00 (Dinner)',
    salon: 'Main Dining Salon',
    name: '',
    phone: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const { setCursor, resetCursor } = useCursor();

  const salons = [
    'Main Dining Salon',
    'The Bar Lounge',
    'Porte-Cochère Terrazzo',
    'Private Chef’s Table'
  ];

  const times = [
    '12:30 (Lunch)',
    '14:00 (Afternoon)',
    '18:30 (Aperitivo)',
    '20:00 (Dinner)',
    '21:30 (Late Bar)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEngine.playChime();
    
    // Generate bespoke booking reference
    const code = `CAS-${Math.floor(1000 + Math.random() * 9000)}`;
    setReservationCode(code);
    setIsSubmitted(true);

    // Prepare WhatsApp concierge payload
    const textMsg = encodeURIComponent(
      `Hello Cassia Concierge, I would like to reserve a table.\n\nReference: ${code}\nName: ${formData.name}\nPhone: ${formData.phone}\nDate: ${formData.date}\nTime: ${formData.time}\nGuests: ${formData.guests}\nArea: ${formData.salon}\nSpecial Notes: ${formData.notes || 'None'}`
    );
    const whatsappUrl = `https://wa.me/${CASSIA_STORY.whatsapp}?text=${textMsg}`;
    
    // Store in window for direct concierge trigger
    window.__lastCassiaReservation = { ...formData, code, whatsappUrl };
  };

  const handleWhatsAppDirect = () => {
    soundEngine.playClick();
    if (window.__lastCassiaReservation?.whatsappUrl) {
      window.open(window.__lastCassiaReservation.whatsappUrl, '_blank');
    }
  };

  return (
    <section 
      id="reservation" 
      className="relative w-full min-h-screen bg-[#060403] py-24 px-6 md:px-12 flex flex-col items-center justify-center border-t border-[#D4AF37]/10"
    >
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#120d09] border border-[#D4AF37]/30 backdrop-blur-md mb-3">
            <Calendar size={12} className="text-[#D4AF37]" />
            <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
              Bespoke Hospitality
            </span>
          </div>

          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[#F8F5EE]">
            Table Reservation
          </h2>

          <p className="font-editorial text-lg md:text-xl italic text-[#A3998D] max-w-md mx-auto mt-2">
            "YOUR TABLE AWAITS."
          </p>
        </div>

        {/* Minimal Luxury Form Card */}
        <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-b from-[#120d0a] to-[#090604] border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Salon Area */}
                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-2">
                    Atmosphere & Salon
                  </label>
                  <select
                    value={formData.salon}
                    onChange={(e) => setFormData({ ...formData, salon: e.target.value })}
                    className="w-full bg-[#18120d] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-xs text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {salons.map((s) => (
                      <option key={s} value={s} className="bg-[#120d09]">{s}</option>
                    ))}
                  </select>
                </div>

                {/* Guests */}
                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-2">
                    Party Size
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full bg-[#18120d] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-xs text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5 Guests', '6 Guests', 'Private Salon (7-12)'].map((g) => (
                      <option key={g} value={g} className="bg-[#120d09]">{g}</option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-[#18120d] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-xs text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                {/* Time */}
                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-2">
                    Seating Time
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#18120d] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-xs text-[#F8F5EE] focus:outline-none focus:border-[#D4AF37]"
                  >
                    {times.map((t) => (
                      <option key={t} value={t} className="bg-[#120d09]">{t}</option>
                    ))}
                  </select>
                </div>

                {/* Full Name */}
                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-2">
                    Guest Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Sharma"
                    className="w-full bg-[#18120d] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-xs text-[#F8F5EE] placeholder-[#A3998D]/40 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-2">
                    Mobile / WhatsApp Contact
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#18120d] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-xs text-[#F8F5EE] placeholder-[#A3998D]/40 focus:outline-none focus:border-[#D4AF37]"
                    required
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase text-[#D4AF37] font-semibold block mb-2">
                  Dietary Preferences or Occasion (Optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Anniversary, bespoke sommelier pairing, dietary requirements..."
                  rows={3}
                  className="w-full bg-[#18120d] border border-[#D4AF37]/20 rounded-xl py-3 px-4 text-xs text-[#F8F5EE] placeholder-[#A3998D]/40 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Reserve CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  onMouseEnter={() => setCursor('CONFIRM')}
                  onMouseLeave={resetCursor}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF0D4] to-[#D4AF37] text-[#060403] font-display font-bold text-xs tracking-[0.3em] uppercase hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-all duration-300"
                >
                  RESERVE AT CASSIA
                </button>
              </div>

              <p className="text-center text-[10px] text-[#A3998D] tracking-widest uppercase">
                A member of our concierge desk will confirm your seating within 15 minutes.
              </p>
            </form>
          ) : (
            /* Luxury Confirmation State */
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center mx-auto text-[#D4AF37]">
                <CheckCircle2 size={32} />
              </div>

              <div>
                <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold block mb-1">
                  Reservation Recorded
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#F8F5EE]">
                  We Look Forward to Welcoming You, {formData.name}
                </h3>
                <p className="text-xs text-[#A3998D] mt-2 font-mono">
                  REFERENCE CODE: <span className="text-[#D4AF37] font-bold">{reservationCode}</span>
                </p>
              </div>

              <div className="max-w-md mx-auto p-4 rounded-xl bg-[#140e0a] border border-[#D4AF37]/20 text-xs text-left space-y-1.5 text-[#E5DFD3]/90">
                <p><span className="text-[#A3998D]">Salon:</span> {formData.salon}</p>
                <p><span className="text-[#A3998D]">Date & Time:</span> {formData.date} at {formData.time}</p>
                <p><span className="text-[#A3998D]">Party:</span> {formData.guests}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <button
                  onClick={handleWhatsAppDirect}
                  onMouseEnter={() => setCursor('WHATSAPP')}
                  onMouseLeave={resetCursor}
                  className="py-3 px-6 rounded-full bg-[#25D366] text-[#060403] text-xs font-display tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-2 hover:bg-[#20ba59] transition-colors"
                >
                  <MessageSquare size={14} />
                  <span>Send Directly to WhatsApp Concierge</span>
                </button>

                <button
                  onClick={() => setIsSubmitted(false)}
                  onMouseEnter={() => setCursor('NEW')}
                  onMouseLeave={resetCursor}
                  className="py-3 px-6 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-display tracking-[0.2em] uppercase hover:border-[#D4AF37] transition-colors"
                >
                  Modify Details
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
