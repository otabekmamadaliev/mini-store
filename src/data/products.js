// MiniStore catalog — generic, trademark-safe product names with CSS/SVG art.
// price is in whole dollars.cents; `shape` maps to the ProductArt renderer.

export const CATEGORIES = ['All', 'Snacks', 'Beverages', 'Personal Care', 'Household'];

export const PRODUCTS = [
  // ---- Snacks ----
  {
    id: 'classic-chips', name: 'Classic Potato Chips', category: 'Snacks', price: 2.49,
    shape: 'bag', colors: { a: '#ffd23f', b: '#f0a500', accent: '#e23b2e' },
    rating: 4.8, tagline: 'Lightly salted, thin & crispy.',
    description: 'Our best-selling potato chips — thin-cut, kettle-cooked and lightly salted for that perfect everyday crunch.',
    weight: '150g',
  },
  {
    id: 'choc-cookies', name: 'Chocolate Chip Cookies', category: 'Snacks', price: 3.29,
    shape: 'box', colors: { a: '#8a4b2a', b: '#6b3618', accent: '#f4d38a' },
    rating: 4.9, tagline: 'Soft-baked, loaded with chips.',
    description: 'Soft-baked cookies packed with real chocolate chips. A lunchbox and coffee-break classic.',
    weight: '300g',
  },
  {
    id: 'peanut-bar', name: 'Peanut Snack Bars', category: 'Snacks', price: 4.19,
    shape: 'bar', colors: { a: '#c98a3a', b: '#9c651f', accent: '#3a2a18' },
    rating: 4.6, tagline: 'Protein-packed, on the go.',
    description: 'Chewy peanut and oat bars with a chocolate base — a quick, filling snack for busy days. Pack of 6.',
    weight: '6 × 40g',
  },
  {
    id: 'popcorn', name: 'Butter Popcorn', category: 'Snacks', price: 2.99,
    shape: 'bag', colors: { a: '#f6e7b8', b: '#e8c96a', accent: '#c0392b' },
    rating: 4.5, tagline: 'Movie-night ready.',
    description: 'Fluffy microwave popcorn with a rich buttery flavour. Ready in three minutes.',
    weight: '3 × 90g',
  },

  // ---- Beverages ----
  {
    id: 'cola-can', name: 'Cola Can', category: 'Beverages', price: 1.49,
    shape: 'can', colors: { a: '#e2241a', b: '#b81b12', accent: '#ffffff' },
    rating: 4.7, tagline: 'Ice-cold classic cola.',
    description: 'The classic sparkling cola you know and love. Best served ice-cold. 330ml can.',
    weight: '330ml',
  },
  {
    id: 'orange-juice', name: 'Orange Juice', category: 'Beverages', price: 3.79,
    shape: 'carton', colors: { a: '#ff9f1c', b: '#e07a00', accent: '#2f6b3d' },
    rating: 4.8, tagline: '100% squeezed, no sugar added.',
    description: 'Not-from-concentrate orange juice, 100% squeezed with no added sugar. 1 litre carton.',
    weight: '1L',
  },
  {
    id: 'spring-water', name: 'Spring Water 6-Pack', category: 'Beverages', price: 2.99,
    shape: 'bottle', colors: { a: '#dff1fb', b: '#a9d8ef', accent: '#2b6cc4' },
    rating: 4.9, tagline: 'Pure & refreshing.',
    description: 'Natural spring water in a recyclable bottle. Six-pack, perfect for home, gym or the office.',
    weight: '6 × 500ml',
  },
  {
    id: 'energy-drink', name: 'Energy Drink', category: 'Beverages', price: 2.29,
    shape: 'can', colors: { a: '#2f8f4e', b: '#1c6633', accent: '#e9ff5a' },
    rating: 4.3, tagline: 'Get the boost you need.',
    description: 'A crisp citrus energy drink with caffeine and B-vitamins to power through your day. 250ml can.',
    weight: '250ml',
  },

  // ---- Personal Care ----
  {
    id: 'body-wash', name: 'Gentle Body Wash', category: 'Personal Care', price: 5.49,
    shape: 'pump', colors: { a: '#fdfdfa', b: '#e9e9e1', accent: '#2b6cc4' },
    rating: 4.8, tagline: 'Nourishing daily cleanser.',
    description: 'A moisturising body wash with a soft, clean scent. Gentle enough for everyday use on all skin types.',
    weight: '500ml',
  },
  {
    id: 'shampoo', name: 'Everyday Shampoo', category: 'Personal Care', price: 4.99,
    shape: 'pump', colors: { a: '#e9f7ef', b: '#bfe4cd', accent: '#2f6b3d' },
    rating: 4.6, tagline: 'Soft, healthy-looking hair.',
    description: 'A nourishing shampoo for all hair types, leaving hair soft, shiny and easy to manage.',
    weight: '400ml',
  },
  {
    id: 'toothpaste', name: 'Fresh Mint Toothpaste', category: 'Personal Care', price: 3.19,
    shape: 'tube', colors: { a: '#ffffff', b: '#e6ecf2', accent: '#2b6cc4' },
    rating: 4.7, tagline: 'All-day fresh breath.',
    description: 'Fluoride toothpaste with a cool mint flavour for complete daily protection and fresh breath.',
    weight: '100ml',
  },
  {
    id: 'hand-soap', name: 'Hand Soap', category: 'Personal Care', price: 3.49,
    shape: 'pump', colors: { a: '#f6ead9', b: '#e8d3b4', accent: '#b98a3e' },
    rating: 4.5, tagline: 'Softening & fragrant.',
    description: 'A gentle foaming hand soap that cleans without drying, with a warm, subtle fragrance.',
    weight: '300ml',
  },

  // ---- Household ----
  {
    id: 'paper-towels', name: 'Paper Towels', category: 'Household', price: 7.99,
    shape: 'towels', colors: { a: '#ffffff', b: '#e8e8e8', accent: '#3f8a4d' },
    rating: 4.9, tagline: 'Strong & absorbent, 6 rolls.',
    description: 'Extra-absorbent two-ply paper towels. Strong when wet and highly absorbent. Six-roll pack.',
    weight: '6 rolls',
  },
  {
    id: 'dish-soap', name: 'Dish Soap', category: 'Household', price: 2.79,
    shape: 'pump', colors: { a: '#e5f6ff', b: '#b7e2f5', accent: '#1e88a8' },
    rating: 4.6, tagline: 'Cuts grease fast.',
    description: 'A concentrated dish soap that cuts through grease quickly and rinses clean. A little goes a long way.',
    weight: '750ml',
  },
  {
    id: 'trash-bags', name: 'Trash Bags', category: 'Household', price: 5.99,
    shape: 'box', colors: { a: '#3a3f45', b: '#23272b', accent: '#3f8a4d' },
    rating: 4.7, tagline: 'Tough, tear-resistant.',
    description: 'Heavy-duty tall kitchen trash bags with reinforced seams. Box of 40, drawstring closure.',
    weight: '40 bags',
  },
  {
    id: 'sponges', name: 'Scrub Sponges', category: 'Household', price: 3.99,
    shape: 'box', colors: { a: '#f4c430', b: '#e0a800', accent: '#2f8f4e' },
    rating: 4.4, tagline: 'Non-scratch scrubbing.',
    description: 'Dual-sided scrub sponges — a soft absorbent side and a tough non-scratch scrubber. Pack of 6.',
    weight: '6 sponges',
  },
];

export const getProduct = (id) => PRODUCTS.find((p) => p.id === id);
