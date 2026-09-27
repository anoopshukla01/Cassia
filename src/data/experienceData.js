/**
 * CASSIA — Experience & Personalization Data
 */

export const PERSONALIZATION_OPTIONS = {
  timeOfDay: [
    {
      id: 'morning',
      label: 'Morning Sun',
      accentColor: '#E6B87D',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #201711 0%, #0d0a07 70%, #050403 100%)',
      vibe: 'Warm dawn rays, gentle aroma of freshly ground Ethiopian roast, serene acoustic warmth.',
      recommendedCategory: 'coffee',
      heroRecommendation: 'Cassia Signature Saffron Cortado'
    },
    {
      id: 'golden',
      label: 'Golden Hour',
      accentColor: '#D4AF37',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #2d1e14 0%, #140d0a 70%, #080605 100%)',
      vibe: 'Mellow amber glow, conversational hum, aperitifs and artisanal small plates.',
      recommendedCategory: 'food',
      heroRecommendation: 'Truffle Morel Brioche & Burrata'
    },
    {
      id: 'night',
      label: 'Late Night Bar',
      accentColor: '#C49746',
      bgGradient: 'radial-gradient(ellipse at 50% 30%, #1a1210 0%, #0e0908 70%, #040303 100%)',
      vibe: 'Intimate candlelight, low bass notes, smoky cocktails and shadowed velvet booths.',
      recommendedCategory: 'bar',
      heroRecommendation: 'The Gorakhpur Old Fashioned'
    }
  ],
  focus: [
    { id: 'coffee', label: 'Artisan Coffee', icon: 'coffee' },
    { id: 'bar', label: 'Craft Mixology', icon: 'wine' }
  ],
  atmosphere: [
    { id: 'quiet', label: 'Intimate & Quiet', note: 'Soft lighting, low background murmur, solitude or quiet conversations.' },
    { id: 'social', label: 'Vibrant & Social', note: 'Energetic rhythm, ice shaking, clinking crystal, lively ambience.' }
  ]
};

export const GALLERY_MOMENTS = [
  {
    id: 'm1',
    title: 'THE ARCHITECTURAL SALON',
    subtitle: 'Dark oak, Nero Marquina marble & warm brass',
    tag: 'Interior',
    image: '/assets/experience/interior_ambience.jpg',
    quote: 'NOT JUST A TABLE. A PLACE TO STAY A LITTLE LONGER.'
  },
  {
    id: 'm2',
    title: 'THE ROASTER’S CRAFT',
    subtitle: 'Single origin lots roasted in micro batches',
    tag: 'Coffee',
    image: '/assets/coffee/coffee_pour_hero.jpg',
    quote: 'POURED WITH INTENTION, NEVER HURRIED.'
  },
  {
    id: 'm3',
    title: 'THE ALCHEMY OF SMOKE',
    subtitle: 'Wild cassia quills torched over crystal glassware',
    tag: 'Bar',
    image: '/assets/bar/cocktail_smoked_hero.jpg',
    quote: 'WHERE BOTANICALS MEET TIMELESS REFINEMENT.'
  },
  {
    id: 'm4',
    title: 'THE MIDNIGHT SHAKER',
    subtitle: 'Precision mixology calibrated to the second',
    tag: 'Action',
    image: '/assets/bar/bartender_shaker.jpg',
    quote: 'EVERY MOVEMENT A CHOREOGRAPHED RHYTHM.'
  },
  {
    id: 'm5',
    title: 'MODERN HIMALAYAN GASTRONOMY',
    subtitle: 'Rare mountain ingredients with French classical technique',
    tag: 'Cuisine',
    image: '/assets/food/food_dish_hero.jpg',
    quote: 'HONORING HERITAGE WITH PROGRESSIVE ARTISTRY.'
  }
];
