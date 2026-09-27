/**
 * CASSIA — Gastronomy, Specialty Coffee & Mixology Menu Data
 * Clean decoupled data structure for easy client/CMS updating.
 */

export const MENU_CATEGORIES = [
  { id: 'all', label: 'Complete Collection' },
  { id: 'coffee', label: 'Specialty Coffee' },
  { id: 'bar', label: 'Craft Mixology' },
  { id: 'food', label: 'Culinary Dishes' },
  { id: 'desserts', label: 'Patisserie & Confections' }
];

export const MENU_ITEMS = [
  // SPECIALTY COFFEE
  {
    id: 'c1',
    category: 'coffee',
    name: 'Cassia Signature Saffron Cortado',
    subtitle: 'Estate Arabica · Wild Cassia Bark · Kashmiri Saffron Infusion',
    description: 'Double ristretto pulled over hand-harvested wild cassia cinnamon bark, finished with silky microfoam infused with organic Kashmiri saffron threads.',
    ingredients: ['Kalledevarapura Estate Arabica', 'Whole Wild Cassia', 'Kashmiri Mongra Saffron', 'Velvet Whole Milk / Oat'],
    tastingNotes: ['Spiced Caramel', 'Smoked Honey', 'Orange Zest'],
    price: 360,
    currency: '₹',
    featured: true,
    signature: true,
    image: '/assets/coffee/coffee_pour_hero.jpg',
    abv: '0.0%'
  },
  {
    id: 'c2',
    category: 'coffee',
    name: 'Smoked Cascara Espresso',
    subtitle: 'Aged Single-Origin · Cherry Husk Extraction',
    description: 'Concentrated 22g shot extracted through toasted cascara berries, served alongside chilled sparkling mineral water and smoked sea salt.',
    ingredients: ['Chikmagalur Red Honey Process', 'Sun-Dried Cascara', 'Himalayan Pink Rock Salt'],
    tastingNotes: ['Dark Cocoa', 'Sun-dried Plum', 'Charred Oak'],
    price: 310,
    currency: '₹',
    featured: false,
    signature: false,
    image: '/assets/coffee/coffee_pour_hero.jpg',
    abv: '0.0%'
  },
  {
    id: 'c3',
    category: 'coffee',
    name: 'Monsooned Malabar Pour-Over',
    subtitle: 'V60 Hand-Drip · Low Acidity Velvet Finish',
    description: 'Slow-dripped over a calibrated 3-minute bloom. Heavy body with earthen richness unique to Malabar coastal monsoon curing.',
    ingredients: ['Monsooned Malabar AA', 'Volcanic Filtered Spring Water (93°C)'],
    tastingNotes: ['Pipe Tobacco', 'Toasted Hazelnut', 'Baker’s Chocolate'],
    price: 380,
    currency: '₹',
    featured: true,
    signature: false,
    image: '/assets/coffee/coffee_pour_hero.jpg',
    abv: '0.0%'
  },
  {
    id: 'c4',
    category: 'coffee',
    name: 'Nitro Cold Brew with Cassia Cream',
    subtitle: '24-Hour Steeping · Nitrogen Cascade',
    description: 'Slow cold-steeped micro-lot served on nitro tap, crowned with a cold-frothed cream infused with ground Ceylon cinnamon and raw demerara.',
    ingredients: ['Washed Arabica', 'Pure Liquid Nitrogen', 'Cassia Spiced Heavy Cream'],
    tastingNotes: ['Guinness Creaminess', 'Nutmeg', 'Dark Cherry'],
    price: 420,
    currency: '₹',
    featured: false,
    signature: true,
    image: '/assets/coffee/coffee_pour_hero.jpg',
    abv: '0.0%'
  },

  // CRAFT MIXOLOGY & BAR
  {
    id: 'b1',
    category: 'bar',
    name: 'The Gorakhpur Old Fashioned',
    subtitle: 'Small-Batch Bourbon · Torched Cassia Quills · Artisanal Jaggery',
    description: 'A tribute to the heart of Uttar Pradesh: small batch bourbon slow-infused with roasted cassia quills, organic cane gur syrup, and house-made orange-clove bitters over hand-carved clear crystal ice.',
    ingredients: ['Aged Oak Bourbon', 'Roasted Cassia Bark', 'Organic Gorakhpur Jaggery Nectar', 'House Bitters', 'Flamed Orange Peel'],
    tastingNotes: ['Woodsmoke', 'Molasses', 'Warm Spice', 'Cured Citrus'],
    price: 850,
    currency: '₹',
    featured: true,
    signature: true,
    image: '/assets/bar/cocktail_smoked_hero.jpg',
    abv: '28.5%'
  },
  {
    id: 'b2',
    category: 'bar',
    name: 'Midnight Espresso Martini',
    subtitle: 'Cassia Cold Brew · Belgian Cacao · Madagascar Vanilla Vodka',
    description: 'Fresh pulled Cassia single-origin espresso shaken hard with pure grain vodka, dark cacao liquor, and a whisper of smoked sea salt.',
    ingredients: ['Fresh Cassia Double Shot', 'Distilled Wheat Vodka', '70% Valrhona Cacao Liqueur', 'Organic Vanilla Bean'],
    tastingNotes: ['Roasted Mocha', 'Silky Crema', 'Dark Truffle'],
    price: 780,
    currency: '₹',
    featured: true,
    signature: true,
    image: '/assets/bar/bartender_shaker.jpg',
    abv: '21.0%'
  },
  {
    id: 'b3',
    category: 'bar',
    name: 'Saffron Silk Clarified Punch',
    subtitle: 'Kashmiri Saffron · Clarified Botanicals · Spiced Rum',
    description: 'Milk-washed crystal-clear aperitif infused over 48 hours with wild botanicals, green cardamom, roasted almonds, and Kashmiri saffron petals.',
    ingredients: ['Aged Flor de Caña Rum', 'Clarified Milk Whey', 'Kashmiri Mongra Saffron', 'Green Cardamom', 'Yuzu'],
    tastingNotes: ['Velvet Floral', 'Candied Citrus', 'Warm Almond Finish'],
    price: 890,
    currency: '₹',
    featured: false,
    signature: false,
    image: '/assets/bar/cocktail_smoked_hero.jpg',
    abv: '18.2%'
  },
  {
    id: 'b4',
    category: 'bar',
    name: 'Royal Terai Botanist (Zero-Proof)',
    subtitle: 'Distilled Botanicals · Lychee Shrub · Pink Peppercorn',
    description: 'Non-alcoholic distilled botanical elixir crafted with wild juniper extract, Terai foothills lychee reduction, tonic, and smoked rosemary.',
    ingredients: ['Non-Alcoholic Botanical Distillate', 'Terai Lychee Shrub', 'Pink Peppercorn', 'Fever-Tree Aromatic Tonic'],
    tastingNotes: ['Crisp Floral', 'Gentle Tartness', 'Herbal Smoke'],
    price: 520,
    currency: '₹',
    featured: false,
    signature: false,
    image: '/assets/bar/cocktail_smoked_hero.jpg',
    abv: '0.0%'
  },

  // FOOD & GASTRONOMY
  {
    id: 'f1',
    category: 'food',
    name: 'Pan-Seared Himalayan Trout',
    subtitle: 'Crisp Skin · Saffron Emulsion · Charred Wild Asparagus',
    description: 'Sustainably farmed pristine mountain river trout seared in brown butter, rested on a velvety saffron potato purée, charred pencil asparagus, edible 24k gold leaf, and shaved black winter truffles.',
    ingredients: ['Himachal Brook Trout', 'Peshawari Saffron Cream', 'Black Truffle Shavings', 'Wild Asparagus', 'Fleur de Sel'],
    tastingNotes: ['Buttery Umami', 'Crisp Salinity', 'Earthy Aromatics'],
    price: 1150,
    currency: '₹',
    featured: true,
    signature: true,
    image: '/assets/food/food_dish_hero.jpg',
    abv: null
  },
  {
    id: 'f2',
    category: 'food',
    name: 'Truffle Morel Brioche & Burrata',
    subtitle: 'Wild Himalayan Morels · Handcrafted Burrata · Aged Balsamic',
    description: 'House-baked golden brioche toasted in clarified butter, smothered with pan-roasted wild morel mushrooms in white wine reduction and torn buffalo burrata.',
    ingredients: ['Wild Guchhi Morels', 'Organic Artisanal Burrata', 'Freshly Baked Brioche', '12-Yr Modenese Balsamic'],
    tastingNotes: ['Rich Woodiness', 'Creamy Curd', 'Sweet Acidity'],
    price: 880,
    currency: '₹',
    featured: false,
    signature: false,
    image: '/assets/food/food_dish_hero.jpg',
    abv: null
  },
  {
    id: 'f3',
    category: 'food',
    name: 'Slow-Simmered Awadhi Dum Biryani',
    subtitle: 'Aged Basmati · Rose Water · Cassia Dum Sealed Clay Handi',
    description: 'Prime cuts braised in aromatic yogurt, layered with extra-long grain basmati scented with kewra, green cardamom, and freshly crushed cassia, sealed under dough pastry.',
    ingredients: ['Aged Dehradun Basmati', 'Heritage Spices', 'Pure Desi Ghee', 'Saffron Threads', 'Silver Leaf Varq'],
    tastingNotes: ['Regal Fragrance', 'Tender Melt-in-Mouth', 'Subtle Heat'],
    price: 980,
    currency: '₹',
    featured: true,
    signature: true,
    image: '/assets/food/food_dish_hero.jpg',
    abv: null
  },

  // DESSERTS & CONFECTIONS
  {
    id: 'd1',
    category: 'desserts',
    name: 'Cassia Spiced Valrhona Marquise',
    subtitle: '70% Dark Guanaja · Smoked Sea Salt · Gold Dust',
    description: 'Decadent French flourless chocolate marquise spiced subtly with Cassia bark essence, resting on a crushed almond praline base, crowned with espresso gelato.',
    ingredients: ['Valrhona 70% Chocolate', 'Ground Cassia Bark', 'Tahitian Vanilla Gelato', 'Gold Flake'],
    tastingNotes: ['Intense Bittersweet', 'Velvet Warmth', 'Crunchy Praline'],
    price: 560,
    currency: '₹',
    featured: true,
    signature: true,
    image: '/assets/menu/menu_book_cover.jpg',
    abv: null
  }
];

export const CASSIA_STORY = {
  name: 'CASSIA',
  tagline: 'Coffee · Food · Bar',
  city: 'Gorakhpur, Uttar Pradesh',
  address: 'Park Road, Civil Lines, Gorakhpur, UP 273001, India',
  phone: '+91 551 220 2277',
  whatsapp: '915512202277',
  email: 'concierge@cassiaexperience.com',
  hours: {
    coffee: '08:00 AM – 11:30 PM',
    dining: '12:00 PM – 11:30 PM',
    bar: '05:00 PM – 01:00 AM'
  },
  coordinates: {
    lat: 26.7606,
    lng: 83.3732
  },
  editorialPhrases: [
    'ENTER CASSIA.',
    'A PLACE TO PAUSE.',
    'POURED WITH INTENTION.',
    'WHERE TIME SLOWS DOWN.',
    'NOT JUST A TABLE. A PLACE TO STAY A LITTLE LONGER.',
    'YOUR TABLE AWAITS.'
  ]
};
