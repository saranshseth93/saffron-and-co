export type MenuItem = {
  name: string
  description: string
  price: string
  gradient: [string, string, string]
  size: 'sm' | 'md' | 'lg'
  gridArea: string
}

export type DrinkItem = {
  name: string
  description: string
  price: string
  gradient: [string, string, string]
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

export const menuItems: MenuItem[] = [
  {
    name: 'Turmeric Latte',
    description:
      'Haldi doodh, but make it Melbourne. Oat milk, whole turmeric, black pepper, honey.',
    price: '$6.5',
    gradient: ['#E8A838', '#8B6914', 'transparent'],
    size: 'lg',
    gridArea: 'latte',
  },
  {
    name: 'Masala Scrambled Eggs',
    description:
      'Free-range eggs, green chilli, cumin, coriander, fresh curry leaves. On sourdough, obviously.',
    price: '$19',
    gradient: ['#C73E1D', '#8B2A10', 'transparent'],
    size: 'sm',
    gridArea: 'eggs',
  },
  {
    name: 'The Dosa',
    description:
      "Crispy rice & lentil cr\u00eape. Sambar, coconut chutney, potato masala. Our amma's recipe. Don't argue.",
    price: '$17',
    gradient: ['#A0845C', '#6B5A3E', 'transparent'],
    size: 'sm',
    gridArea: 'dosa',
  },
  {
    name: 'Chai-Spiced Banana Bread',
    description:
      'Cardamom, cinnamon, star anise through the batter. Served warm with salted butter.',
    price: '$8',
    gradient: ['#8B6914', '#5C4A2A', 'transparent'],
    size: 'md',
    gridArea: 'bread',
  },
  {
    name: 'Tandoori Mushroom Toastie',
    description:
      'Tandoori-spiced field mushrooms, spinach, mozzarella, mint chutney. Pressed on sourdough.',
    price: '$18',
    gradient: ['#C73E1D', '#2A1A14', 'transparent'],
    size: 'md',
    gridArea: 'toastie',
  },
  {
    name: 'Weekend Biryani',
    description:
      'Slow-cooked lamb. Saffron rice. Raita on the side. Saturday & Sunday only. Sells out by noon.',
    price: '$24',
    gradient: ['#E8A838', '#7B8F6A', 'transparent'],
    size: 'lg',
    gridArea: 'biryani',
  },
]

export const drinkItems: DrinkItem[] = [
  {
    name: 'Masala Old Fashioned',
    description: 'Bourbon, jaggery syrup, cardamom bitters, orange zest.',
    price: '$22',
    gradient: ['#8B6914', '#5C4A2A', 'transparent'],
  },
  {
    name: 'Tamarind Margarita',
    description: 'Tequila, tamarind, lime, chilli salt rim. Sweet, sour, heat.',
    price: '$20',
    gradient: ['#C73E1D', '#E8A838', 'transparent'],
  },
  {
    name: 'Mango Lassi Sour',
    description: 'Vodka, mango, yoghurt, lime, egg white. Dessert in a glass.',
    price: '$21',
    gradient: ['#E8A838', '#F5EDE0', 'transparent'],
  },
  {
    name: 'Chai Espresso Martini',
    description: 'Vodka, chai-spiced espresso, vanilla, cardamom dust.',
    price: '$23',
    gradient: ['#5C4A2A', '#E8A838', 'transparent'],
  },
]

export const introParagraphs: string[] = [
  "We're the neighbourhood spot where turmeric lattes meet natural wine, where your nani's recipes get the Melbourne treatment.",
  "Part caf\u00e9, part bar, part love letter to the spices we grew up with. Open Tuesday to Sunday in the heart of Fitzroy.",
  'No reservations. No pretension. Just really good food with a bit of soul.',
]

export const storyParagraphs: string[] = [
  "Priya grew up in her amma's kitchen in Chennai, grinding spices before school. Arjun grew up in his dad's pub kitchen in Collingwood, learning to flip eggs at six.",
  'They met at a wine bar on Smith Street. She ordered a masala chai. He made her one with oat milk and cardamom. She said it was almost as good as her mum\u2019s.',
  "Saffron & Co opened in 2022 in a converted boot factory on Brunswick Street. The menu is what happens when two food cultures collide \u2014 respectfully, deliciously, and with a lot of ghee.",
  "We don't do fusion for the sake of it. Every dish has a story, a family recipe, a reason. We just happen to serve it with sourdough and natural wine.",
]

export const pressNames: string[] = [
  'Broadsheet',
  'TimeOut Melbourne',
  'The Age',
  'Good Food Guide',
  'Concrete Playground',
  'Eater',
]

export const hours: HoursEntry[] = [
  { days: 'Tuesday \u2013 Thursday', hours: '7:30am \u2013 4pm' },
  { days: 'Friday \u2013 Saturday', hours: '7:30am \u2013 4pm' },
  { days: 'Friday \u2013 Saturday', hours: 'Bar: 5pm \u2013 10pm', highlight: true },
  { days: 'Sunday', hours: '8am \u2013 4pm' },
]

export const contactDetails: ContactDetail[] = [
  {
    icon: 'mail',
    label: 'hello@saffronandco.com.au',
    href: 'mailto:hello@saffronandco.com.au',
  },
  {
    icon: 'instagram',
    label: '@saffronandco',
    href: 'https://instagram.com/saffronandco',
  },
  {
    icon: 'phone',
    label: '0401 234 567',
    href: 'tel:+61401234567',
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
