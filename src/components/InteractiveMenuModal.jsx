import React, { useState, useEffect } from 'react';
import { X, Search, Sparkles, Coffee, Wine, UtensilsCrossed, Cake, Check, ArrowRight } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { soundEngine } from '../utils/soundEngine';
import { useCursor } from '../context/CursorContext';

export const InteractiveMenuModal = ({ isOpen, initialCategory = 'all', onClose, onReserveItem }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (id) => {
    switch (id) {
      case 'coffee': return <Coffee size={14} />;
      case 'bar': return <Wine size={14} />;
      case 'food': return <UtensilsCrossed size={14} />;
      case 'desserts': return <Cake size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <div className="fixed inset-0 z-[9995] flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-300">
      {/* Dark Ambient Backdrop */}
      <div 
        className="absolute inset-0 bg-[#060504]/94 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Main Modal Card */}
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-[#0c0907] border border-[#D4AF37]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10">
        {/* Top Luxury Header */}
        <div className="p-6 md:px-10 border-b border-[#D4AF37]/20 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-[#140f0c] via-[#0c0907] to-[#140f0c]">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">
              CASSIA · GORAKHPUR
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-[#F8F5EE] mt-0.5 tracking-wider">
              The Grand Gastronomy Collection
            </h2>
          </div>

          {/* Search Bar + Close Button */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A3998D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients, notes..."
                className="w-full bg-[#16110e] border border-[#D4AF37]/20 rounded-full py-2 pl-9 pr-4 text-xs text-[#F8F5EE] placeholder-[#A3998D]/60 focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              onMouseEnter={() => setCursor('CLOSE')}
              onMouseLeave={resetCursor}
              className="p-2.5 rounded-full border border-[#D4AF37]/30 text-[#A3998D] hover:text-[#F8F5EE] hover:border-[#D4AF37] transition-colors"
              aria-label="Close menu modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-6 md:px-10 py-3 bg-[#110d0a] border-b border-[#D4AF37]/10 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEngine.playClick();
                setActiveCategory(cat.id);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-display tracking-wider whitespace-nowrap transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#D4AF37] text-[#060504] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'bg-[#181310] text-[#A3998D] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:text-[#F8F5EE]'
              }`}
            >
              {getCategoryIcon(cat.id)}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Menu Grid Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onMouseEnter={() => setCursor('DETAILS')}
                onMouseLeave={resetCursor}
                className="group p-6 rounded-xl bg-gradient-to-b from-[#140f0c] to-[#0f0b09] border border-[#D4AF37]/15 hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.signature && (
                          <span className="px-2 py-0.5 rounded text-[8px] tracking-[0.2em] uppercase font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                            SIGNATURE
                          </span>
                        )}
                        {item.abv && (
                          <span className="text-[9px] text-[#A3998D] font-mono">
                            {item.abv === '0.0%' ? 'ZERO-PROOF' : `ABV ${item.abv}`}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-lg text-[#F8F5EE] group-hover:text-[#D4AF37] transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#D4AF37]/80 font-editorial italic mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="font-display text-lg font-bold text-[#F8F5EE]">
                        {item.currency}{item.price}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#A3998D] leading-relaxed my-3 font-sans">
                    {item.description}
                  </p>

                  {/* Tasting Notes */}
                  {item.tastingNotes && item.tastingNotes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tastingNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded-full text-[9px] bg-[#1a1410] border border-[#D4AF37]/20 text-[#E5DFD3]/80"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Ingredients */}
                  <div className="border-t border-[#D4AF37]/10 pt-2.5 text-[10px] text-[#A3998D]/70 font-sans">
                    <span className="text-[#D4AF37]/70 font-semibold uppercase tracking-wider mr-1">Origin / Elements:</span>
                    {item.ingredients.join(' · ')}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#D4AF37]/10">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#A3998D]/60">
                    Artisanal Prep
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onClose();
                      if (onReserveItem) onReserveItem(item);
                    }}
                    className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-[#D4AF37] hover:text-[#FFF0D4] font-semibold transition-colors"
                  >
                    <span>Request at Table</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-[#A3998D]">
              <p className="font-display text-lg">No culinary items found matching your criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="mt-4 px-5 py-2 rounded-full border border-[#D4AF37]/40 text-xs text-[#D4AF37]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Note */}
        <div className="p-4 md:px-10 bg-[#080605] border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#A3998D]">
          <span>All taxes and service calculated per luxury hospitality standards. Special dietary adjustments honored upon request.</span>
          <span className="text-[#D4AF37] font-semibold tracking-widest uppercase">Cassia · Civil Lines, Gorakhpur</span>
        </div>
      </div>
    </div>
  );
};
