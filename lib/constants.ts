export type Dietary = 'v' | 'vg' | 'gf' | 'n'

export interface MenuDish {
  name: string
  description: string
  price: string
  /** Second price for a size or variant, e.g. small / large filter coffee. */
  altPrice?: string
  dietary?: Dietary[]
  /** Slot id from images.config.mjs — set only on dishes we photograph. */
  slot?: string
  /** Short flag shown against the dish, e.g. availability. */
  note?: string
}

export interface MenuSection {
  id: string
  title: string
  /** Service window, shown under the section title. */
  service: string
  blurb: string
  dishes: MenuDish[]
}

export type HoursEntry = {
  days: string
  hours: string
  highlight?: boolean
}

export type ContactDetail = {
  icon: 'mail' | 'instagram' | 'phone'
  label: string
  href: string
}

export const dietaryLegend: Record<Dietary, string> = {
  v: 'Vegetarian',
  vg: 'Vegan',
  gf: 'Gluten free',
  n: 'Contains nuts',
}

/**
 * The full menu, in the order it is served. Feature dishes carry a `slot` and
 * are pulled out into photographed cards at the top of the menu.
 */
export const menu: MenuSection[] = [
  {
    id: 'breakfast',
    title: 'Breakfast',
    service: '7am - 11.30am',
    blurb:
      'The first half of the day, cooked the way we actually eat it at home. Bread comes from the bakery three doors down.',
    dishes: [
      {
        name: 'Masala Scrambled Eggs',
        description:
          'Free-range eggs, green chilli, cumin, coriander, fresh curry leaves. On sourdough, obviously.',
        price: '19',
        dietary: ['v'],
        slot: 'dish-eggs',
      },
      {
        name: 'The Dosa',
        description:
          "Crispy rice and lentil crepe. Sambar, coconut chutney, potato masala. Our amma's recipe, and no, we won't adjust it.",
        price: '17',
        dietary: ['vg', 'gf'],
        slot: 'dish-dosa',
      },
      {
        name: 'Eggs Kejriwal',
        description:
          'Fried eggs, melted cheese, green chilli, coriander. A Bombay club classic that has no business being this good.',
        price: '18',
        dietary: ['v'],
      },
      {
        name: 'Chilli Scrambled Tofu',
        description:
          'Silken tofu, mustard seed, turmeric, spring onion. Smoked chilli oil over the top.',
        price: '18',
        dietary: ['vg'],
      },
      {
        name: 'Coconut Chia & Mango',
        description:
          'Coconut chia, alphonso mango, toasted coconut, lime. Cold, sharp, sweet.',
        price: '14',
        dietary: ['vg', 'gf'],
      },
      {
        name: 'Bombay Toastie',
        description:
          'Potato, mint chutney, cheese, chaat masala. Pressed until the edges go crisp.',
        price: '16',
        dietary: ['v'],
      },
    ],
  },
  {
    id: 'all-day',
    title: 'All Day',
    service: 'From 11.30am',
    blurb:
      'Bigger plates from mid-morning until the kitchen closes. The specials board changes weekly because we get bored.',
    dishes: [
      {
        name: 'Weekend Biryani',
        description:
          'Slow-cooked lamb shoulder, saffron rice, burnt onion, raita on the side. One pot, and when it is gone it is gone.',
        price: '24',
        note: 'Sat & Sun only',
        slot: 'dish-biryani',
      },
      {
        name: 'Tandoori Mushroom Toastie',
        description:
          'Tandoori-spiced field mushrooms, spinach, mozzarella, mint chutney. Pressed on sourdough.',
        price: '18',
        dietary: ['v'],
      },
      {
        name: 'Butter Chicken Toastie',
        description:
          'The Sunday-night leftover, done properly. Slow-cooked thigh, fenugreek, far too much cheese.',
        price: '21',
      },
      {
        name: 'Keema Pav',
        description:
          'Spiced lamb mince, soft buttered rolls, pickled onion, coriander. Eat it with your hands.',
        price: '22',
      },
      {
        name: 'Kachumber Grain Bowl',
        description:
          'Freekeh, cucumber, tomato, pomegranate, mint, toasted seeds, lemon dressing.',
        price: '19',
        dietary: ['vg'],
      },
      {
        name: 'Chaat Fries',
        description:
          'Hot chips, yoghurt, tamarind, mint, sev, pomegranate. Structurally unsound. Order them anyway.',
        price: '14',
        dietary: ['v'],
      },
    ],
  },
  {
    id: 'sweets',
    title: 'Sweets & Bakery',
    service: 'Until we sell out',
    blurb:
      'Baked here each morning. Arjun starts at four, which explains a lot about his personality.',
    dishes: [
      {
        name: 'Chai-Spiced Banana Bread',
        description:
          'Cardamom, cinnamon and star anise through the batter. Served warm with salted butter.',
        price: '8',
        dietary: ['v'],
      },
      {
        name: 'Gulab Jamun Doughnut',
        description:
          'Rose and cardamom syrup, milk-solid crumb, crushed pistachio. Get one before eleven.',
        price: '7',
        dietary: ['v', 'n'],
      },
      {
        name: 'Cardamom Kouign-Amann',
        description:
          'Laminated, caramelised, faintly ridiculous. Brittany by way of Kerala.',
        price: '7.5',
        dietary: ['v'],
      },
      {
        name: 'Pistachio & Rose Cake',
        description:
          'Semolina, pistachio, rosewater syrup, thick cream. Dense in the right way.',
        price: '9',
        dietary: ['v', 'n'],
      },
      {
        name: 'Kulfi Affogato',
        description:
          'Cardamom kulfi, a shot of filter coffee poured over it at the table.',
        price: '12',
        dietary: ['v', 'n'],
      },
    ],
  },
  {
    id: 'drinks',
    title: 'Chai, Coffee & Cold',
    service: 'All opening hours',
    blurb:
      'Beans roasted in Brunswick. Spices ground here every Tuesday. The chai recipe is not negotiable and not for sale.',
    dishes: [
      {
        name: 'Masala Chai',
        description:
          'Whole spices, fresh ginger, full-cream milk, boiled properly. No syrup, no powder.',
        price: '5.5',
        dietary: ['v', 'gf'],
      },
      {
        name: 'Turmeric Latte',
        description:
          'Haldi doodh, but make it Melbourne. Oat milk, whole turmeric, black pepper, honey.',
        price: '6.5',
        dietary: ['v', 'gf'],
      },
      {
        name: 'Filter Coffee',
        description:
          'South Indian style, pulled long between two tumblers. Small or large.',
        price: '4.5',
        altPrice: '5.5',
        dietary: ['v', 'gf'],
      },
      {
        name: 'Cold Brew, Salted Jaggery',
        description:
          'Eighteen-hour cold brew, jaggery syrup, a pinch of sea salt. Over a lot of ice.',
        price: '7',
        dietary: ['vg', 'gf'],
      },
      {
        name: 'Mango Lassi',
        description:
          'Yoghurt, alphonso mango, cardamom. Thick enough to stand a spoon in.',
        price: '8',
        dietary: ['v', 'gf'],
      },
      {
        name: 'Nimbu Soda',
        description: 'Lime, soda, black salt, mint. Sweet or salty, your call.',
        price: '6',
        dietary: ['vg', 'gf'],
      },
    ],
  },
  {
    id: 'bar',
    title: 'The Bar',
    service: 'Fri & Sat, 5pm till late',
    blurb:
      'The espresso machine sleeps and the shaker wakes up. Same spice rack, different application.',
    dishes: [
      {
        name: 'Masala Old Fashioned',
        description: 'Bourbon, jaggery syrup, cardamom bitters, orange zest.',
        price: '22',
      },
      {
        name: 'Tamarind Margarita',
        description: 'Tequila, tamarind, lime, chilli salt rim. Sweet, sour, heat.',
        price: '20',
      },
      {
        name: 'Mango Lassi Sour',
        description: 'Vodka, mango, yoghurt, lime, egg white. Dessert in a glass.',
        price: '21',
      },
      {
        name: 'Chai Espresso Martini',
        description: 'Vodka, chai-spiced espresso, vanilla, cardamom dust.',
        price: '23',
      },
      {
        name: 'Curry Leaf Gimlet',
        description: 'Gin, curry leaf cordial, lime. Herbal, dry, a bit unexpected.',
        price: '21',
      },
      {
        name: 'Beer & Wine',
        description:
          'Two local taps, a short natural wine list, and a lassi for whoever is driving.',
        price: '9',
        altPrice: '14',
      },
    ],
  },
]

/** Dishes we photograph, pulled out into feature cards above the menu. */
export const featureDishes: MenuDish[] = menu
  .flatMap((section) => section.dishes)
  .filter((dish) => dish.slot)

export const introParagraphs: string[] = [
  'We didn’t open Saffron & Co because Melbourne needed another café. We opened it because we were tired of choosing between our cultures.',
  'This is where your amma’s chai recipe meets single-origin Melbourne coffee. Where masala scrambled eggs sit next to smashed avo. Where a dosa can be your Tuesday breakfast and nobody thinks that’s unusual.',
  'We cook the way second-gen kids actually eat, with one foot in our parents’ kitchen and another on Brunswick Street.',
]

export const storyParagraphs: string[] = [
  'Priya grew up watching her mum make chai every morning. Whole spices, fresh ginger, the works. By 16 she was also pulling shots at a Fitzroy café and arguing with regulars about single-origin beans.',
  'Arjun’s thing was bread. Naan at home, sourdough at work. He spent five years baking at three different Melbourne bakeries before deciding that tandoori and sourdough weren’t as different as people thought.',
  'They met at a Diwali party in Northcote and bonded over the fact that both their families thought their cooking was ‘too experimental’. Saffron & Co opened eight months later.',
  'The menu changes constantly because Priya and Arjun cook what they actually want to eat, which is never the same thing two weeks running. The chai recipe, though? That doesn’t change. That’s amma’s.',
]

export const hours: HoursEntry[] = [
  { days: 'Tues–Thu', hours: '7am – 4pm' },
  { days: 'Fri–Sat', hours: '7am – 4pm · Bar 5pm – late', highlight: true },
  { days: 'Sunday', hours: '8am – 3pm' },
  { days: 'Monday', hours: 'Closed (we’re human)' },
]

export const contactDetails: ContactDetail[] = [
  {
    icon: 'mail',
    label: 'hello@saffronand.co',
    href: 'mailto:hello@saffronand.co',
  },
  {
    icon: 'instagram',
    label: '@saffronandco',
    href: '#gallery',
  },
  {
    icon: 'phone',
    label: '0400 000 000',
    href: 'tel:+61400000000',
  },
]

export const floatingWords: string[] = [
  'turmeric',
  'cardamom',
  'chai',
  'masala',
  'saffron',
  'cinnamon',
  'ginger',
  'star anise',
]

export const navLinks: { label: string; href: string }[] = [
  { label: 'Menu', href: '#menu' },
  { label: 'Our Story', href: '#story' },
  { label: 'The Bar', href: '#bar' },
  { label: 'Find Us', href: '#details' },
]

/**
 * Saffron & Co is not a real business. This notice is rendered on the page and
 * in the document metadata so the site can never be mistaken for one.
 */
export const specNotice = {
  short: 'Demo site · fictional business',
  long: 'Saffron & Co is a fictional café, designed and built by Pixel Pundit as a portfolio piece. The menu, prices, people, phone number and address are illustrative. It is not a trading business, and no reviews, awards, press coverage or customer numbers are claimed.',
  studio: 'Pixel Pundit',
  studioUrl: 'https://pixelpundit.com.au',
}
