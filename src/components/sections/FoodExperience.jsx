import React, { useState } from 'react';
import { MENU_ITEMS } from '../../data/menuData';
import { useCursor } from '../../context/CursorContext';
import { soundEngine } from '../../utils/soundEngine';
import { UtensilsCrossed, Sparkles, ArrowRight } from 'lucide-react';

export const FoodExperience = ({ onOpenFullMenu, onReserveItem }) => {
  const foodItems = MENU_ITEMS.filter(item => item.category === 'food');
  const [activeDish, setActiveDish] = useState(foodItems[0] || null);
  const { setCursor, resetCursor } = useCursor();

  return (
    <section id="food" className="relative w-full min-h-screen bg-[#070504] py-24 px-6 md:px-12 flex flex-col justify-center border-t border-[#D4AF37]/10">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-[#D4AF37]/20 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#140f0c] border border-[#D4AF37]/30 backdrop-blur-md mb-3">
              <UtensilsCrossed size={12} className="text-[#D4AF37]" />
              <span className="text-[9px] md:text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] font-semibold">
                Act III · Progressive Gastronomy
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold tracking-wider text-[#F8F5EE]">
              FOOD
            </h2>
          </div>
          <p className="font-editorial text-lg md:text-xl italic text-[#A3998D] max-w-md mt-4 md:mt-0">
            Himalayan produce, classical French reduction, and centuries of Awadhi dum artistry.
          </p>
        </div>

        {/* Hero Culinary Dish Display */}
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-[#0f0b08] shadow-2xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Plating Presentation */}
            <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden group">
              <img
                src={activeDish?.image || '/assets/food/food_dish_hero.jpg'}
                alt={activeDish?.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070504] via-transparent to-transparent opacity-80" />
            </div>

            {/* Plating Story & Elements Breakdown */}
            <div className="lg:col-span-5 p-8 md:p-10 flex flex-col justify-between bg-gradient-to-b from-[#140e0a] to-[#0c0806]">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] block font-semibold mb-2">
                  Chef's Degustation Feature
                </span>
                <h3 className="font-display text-2xl md:text-3xl text-[#F8F5EE]">
                  {activeDish?.name}
                </h3>
                <p className="text-xs text-[#D4AF37]/80 font-editorial italic mt-1 mb-4">
                  {activeDish?.subtitle}
                </p>

                <p className="text-xs text-[#A3998D] leading-relaxed font-sans mb-6">
                  {activeDish?.description}
                </p>

                {/* Ingredients & Elements */}
                <div className="space-y-2 border-t border-[#D4AF37]/15 pt-4">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#E5DFD3]/80 font-semibold block">
                    Curated Elements:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeDish?.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] px-2.5 py-1 rounded bg-[#1c140f] border border-[#D4AF37]/20 text-[#E5DFD3]"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#D4AF37]/20">
                <div>
                  <span className="text-[9px] tracking-[0.3em] uppercase text-[#A3998D] block">Course Price</span>
                  <span className="font-display text-2xl font-bold text-[#F8F5EE]">
                    {activeDish?.currency}{activeDish?.price}
                  </span>
                </div>

                <button
                  onClick={() => {
                    soundEngine.playClick();
                    if (onReserveItem) onReserveItem(activeDish);
                  }}
                  onMouseEnter={() => setCursor('RESERVE')}
                  onMouseLeave={resetCursor}
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#060504] font-display font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#FFF0D4] transition-colors"
                >
                  Reserve For Dinner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dish Switcher Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {foodItems.map((dish) => {
            const isSelected = activeDish?.id === dish.id;
            return (
              <div
                key={dish.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveDish(dish);
                }}
                onMouseEnter={() => setCursor('VIEW')}
                onMouseLeave={resetCursor}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#18110b] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.2)]'
                    : 'bg-[#100a07]/50 border-[#D4AF37]/15 hover:border-[#D4AF37]/40 hover:bg-[#140e0a]'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-display text-sm text-[#F8F5EE]">{dish.name}</h4>
                  <span className="font-display text-xs text-[#D4AF37] font-semibold ml-2">
                    {dish.currency}{dish.price}
                  </span>
                </div>
                <p className="text-[11px] text-[#A3998D] mt-1 line-clamp-2 font-sans">
                  {dish.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Explore All Foods Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenFullMenu('food');
            }}
            onMouseEnter={() => setCursor('ALL FOOD')}
            onMouseLeave={resetCursor}
            className="px-8 py-3.5 rounded-full border border-[#D4AF37]/40 bg-[#120d09] text-[#D4AF37] text-xs font-display tracking-[0.25em] uppercase hover:bg-[#D4AF37] hover:text-[#060504] transition-all duration-300 font-semibold"
          >
            Explore Complete Culinary Collection
          </button>
        </div>
      </div>
    </section>
  );
};
