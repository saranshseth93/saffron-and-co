/**
 * Image slots for Saffron & Co.
 *
 * Each slot describes what the page needs, not which photo to use. The
 * resolver picks a real royalty-free photo per slot and pins it in
 * images.lock.json; the build turns those pins into responsive derivatives.
 *
 * `query`        what to search the provider for
 * `aspect`       width / height the slot is cropped to
 * `widths`       derivative widths generated (must cover the largest render)
 * `focus`        sharp crop anchor — 'attention' keeps the subject in frame
 * `usage`        human note, ends up in CREDITS.md
 */

export const site = {
  name: 'Saffron & Co',
}

/** @typedef {{
 *   id: string,
 *   query: string,
 *   usage: string,
 *   aspect: number,
 *   widths: number[],
 *   orientation?: 'landscape' | 'portrait' | 'square',
 *   minWidth?: number,
 *   focus?: string,
 *   placeholderColours?: [string, string],
 * }} Slot
 */

/** @type {Slot[]} */
export const slots = [
  {
    id: 'hero',
    query: 'indian restaurant interior warm lighting',
    usage: 'Hero background',
    aspect: 1.6,
    widths: [768, 1280, 1920, 2560],
    orientation: 'landscape',
    minWidth: 2000,
    focus: 'attention',
    placeholderColours: ['#4A3A22', '#0C0A08'],
  },
  {
    id: 'dish-dosa',
    query: 'dosa south indian crepe chutney',
    usage: 'Feature dish — The Dosa',
    aspect: 1.25,
    widths: [420, 720, 1040],
    orientation: 'landscape',
    focus: 'attention',
    placeholderColours: ['#A0845C', '#2A2118'],
  },
  {
    id: 'dish-biryani',
    query: 'lamb biryani rice saffron bowl',
    usage: 'Feature dish — Weekend Biryani',
    aspect: 1.25,
    widths: [420, 720, 1040],
    orientation: 'landscape',
    focus: 'attention',
    placeholderColours: ['#E8A838', '#3A2A16'],
  },
  {
    id: 'dish-eggs',
    query: 'scrambled eggs sourdough toast breakfast',
    usage: 'Feature dish — Masala Scrambled Eggs',
    aspect: 1.25,
    widths: [420, 720, 1040],
    orientation: 'landscape',
    focus: 'attention',
    placeholderColours: ['#C73E1D', '#2A1810'],
  },
  {
    id: 'chai',
    query: 'masala chai tea pouring glass spices',
    usage: 'Chai & coffee section',
    aspect: 0.8,
    widths: [420, 720, 1040],
    orientation: 'portrait',
    focus: 'attention',
    placeholderColours: ['#C4A882', '#241E16'],
  },
  {
    id: 'bar',
    query: 'cocktail bar dark moody drinks',
    usage: 'The Bar section',
    aspect: 1.5,
    widths: [768, 1280, 1920],
    orientation: 'landscape',
    focus: 'attention',
    placeholderColours: ['#5C4A2A', '#0C0A08'],
  },
  {
    id: 'story',
    query: 'chef cooking kitchen restaurant hands',
    usage: 'Our Story portrait',
    aspect: 0.78,
    widths: [420, 720, 1040],
    orientation: 'portrait',
    focus: 'attention',
    placeholderColours: ['#7B8F6A', '#1A1510'],
  },
  {
    id: 'spices',
    query: 'indian spices bowls turmeric cardamom',
    usage: 'Menu section header texture',
    aspect: 2.4,
    widths: [768, 1280, 1920],
    orientation: 'landscape',
    focus: 'attention',
    placeholderColours: ['#E8A838', '#C73E1D'],
  },
  {
    id: 'gallery-1',
    query: 'cafe latte coffee cup table',
    usage: 'Gallery tile',
    aspect: 1,
    widths: [320, 640],
    orientation: 'square',
    minWidth: 1000,
    focus: 'attention',
    placeholderColours: ['#E8A838', '#241E16'],
  },
  {
    id: 'gallery-2',
    query: 'indian street food snacks plate',
    usage: 'Gallery tile',
    aspect: 1,
    widths: [320, 640],
    orientation: 'square',
    minWidth: 1000,
    focus: 'attention',
    placeholderColours: ['#C73E1D', '#241E16'],
  },
  {
    id: 'gallery-3',
    query: 'fresh coriander herbs cooking ingredients',
    usage: 'Gallery tile',
    aspect: 1,
    widths: [320, 640],
    orientation: 'square',
    minWidth: 1000,
    focus: 'attention',
    placeholderColours: ['#7B8F6A', '#1A1510'],
  },
  {
    id: 'gallery-4',
    query: 'bakery pastry cake slice plate',
    usage: 'Gallery tile',
    aspect: 1,
    widths: [320, 640],
    orientation: 'square',
    minWidth: 1000,
    focus: 'attention',
    placeholderColours: ['#A0845C', '#241E16'],
  },
]
