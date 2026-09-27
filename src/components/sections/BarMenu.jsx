import React, { useState } from 'react';
import { MENU_ITEMS } from '../../data/menuData';
import { useCursor } from '../../context/CursorContext';
import { soundEngine } from '../../utils/soundEngine';
import { Wine, ArrowRight } from 'lucide-react';

export const BarMenu = ({ onOpenFullMenu, onReserveItem }) => {
  const barItems = MENU_ITEMS.filter(item => item.category === 'bar');
  const [activeItem, setActiveItem] = useState(barItems[0] || null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section 
      id="bar-menu" 
      className="relative w-full min-h-screen bg-[#080503] py-24 px-6 md:px-12 flex flex-col justify-center border-t border-[#D4AF37]/10"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D4AF37]/20 pb-8">
          <div>
            <span className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] block mb-2">
              The Alchemy of Spirits
            </span>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold tracking-wider text-[#F8F5EE]">
              Craft Mixology
            </h2>
          </div>
          <p className="font-editorial text-lg italic text-[#A3998D] max-w-sm mt-4 md:mt-0">
            Aged oak, hand-harvested wild botanicals, and bespoke zero-proof distillations.
          </p>
        </div>

        {/* Editorial Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Large Editorial Hero Visual */}
          <div className="lg:col-span-6 relative group">
            <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/25 aspect-[4/3] bg-[#120c08] shadow-2xl">
              <img
                src={activeItem?.image || '/assets/bar/cocktail_smoked_hero.jpg'}
                alt={activeItem?.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060403] via-transparent to-transparent opacity-85" />

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#D4AF37] font-semibold">
                    {activeItem?.signature ? '★ Bar Signature' : 'Artisan Pour'}
                  </span>
                  <span className="text-[9px] text-[#A3998D] font-mono">
                    {activeItem?.abv === '0.0%' ? 'ZERO-PROOF' : `ABV ${activeItem?.abv}`}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-[#F8F5EE]">
                  {activeItem?.name}
                </h3>
                <p className="text-xs text-[#E5DFD3]/80 font-editorial italic mt-1">
                  {activeItem?.subtitle}
                </p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#D4AF37]/20">
                  <span className="font-display text-xl text-[#D4AF37] font-bold">
                    {activeItem?.currency}{activeItem?.price}
                  </span>
                  <button
                    onClick={() => {
                      soundEngine.playIceClink();
                      if (onReserveItem) onReserveItem(activeItem);
                    }}
                    onMouseEnter={() => setCursor('ORDER')}
                    onMouseLeave={resetCursor}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D4AF37] text-[#080605] text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#FFF0D4] transition-colors"
                  >
                    <span>Request at Bar</span>
                    <ArrowRight size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Interactive Product Selection List */}
          <div className="lg:col-span-6 space-y-4">
            {barItems.map((item) => {
              const isSelected = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    soundEngine.playIceClink();
                    setActiveItem(item);
                  }}
                  onMouseEnter={() => {
                    setCursor('SELECT');
                    setActiveItem(item);
                  }}
                  onMouseLeave={resetCursor}
                  className={`p-6 rounded-xl border transition-all duration-400 cursor-pointer ${
                    isSelected
                      ? 'bg-[#18110a] border-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.25)] translate-x-2'
                      : 'bg-[#100a07]/60 border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:bg-[#140d09]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-display text-base md:text-lg text-[#F8F5EE]">
                          {item.name}
                        </h4>
                        {item.signature && (
                          <span className="px-2 py-0.5 rounded text-[8px] tracking-[0.2em] uppercase font-bold bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                            SIGNATURE
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#A3998D] mt-1 font-sans">
                        {item.description}
                      </p>
                    </div>

                    <span className="font-display text-lg font-bold text-[#D4AF37] ml-4">
                      {item.currency}{item.price}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded bg-[#090503] border border-[#D4AF37]/15 text-[#E5DFD3]/75"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="pt-4">
              <button
                onClick={() => {
                  soundEngine.playClick();
                  onOpenFullMenu('bar');
                }}
                onMouseEnter={() => setCursor('FULL BAR')}
                onMouseLeave={resetCursor}
                className="w-full py-3.5 rounded-full border border-[#D4AF37]/40 bg-[#140d08] text-[#D4AF37] text-xs font-display tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-[#060504] transition-all duration-300 font-semibold text-center"
              >
                Browse Complete Bar Archive & Reserve
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
