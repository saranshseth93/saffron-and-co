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
  'We didn\u2019t open Saffron & Co because Melbourne needed another caf\u00e9. We opened it because we were tired of choosing between our cultures.',
  'This is where your amma\u2019s chai recipe meets single-origin Melbourne coffee. Where masala scrambled eggs sit next to smashed avo. Where a dosa can be your Tuesday breakfast and nobody thinks that\u2019s unusual.',
  'We cook the way second-gen kids actually eat \u2014 with one foot in our parents\u2019 kitchen and another in Brunswick Street.',
]

export const storyParagraphs: string[] = [
  'Priya grew up watching her mum make chai every morning \u2014 whole spices, fresh ginger, the works. By 16, she was also pulling shots at a Fitzroy caf\u00e9 and arguing about single-origin beans.',
  'Arjun\u2019s thing was bread. Naan at home. Sourdough at work. He spent five years baking at three different Melbourne bakeries before deciding that tandoori and sourdough weren\u2019t as different as people thought.',
  'They met at a Diwali party in Northcote. Bonded over the fact that both their families thought their cooking was \u2018too experimental.\u2019 Saffron & Co opened eight months later.',
  'The menu changes constantly because Priya and Arjun cook what they actually want to eat \u2014 which is never the same thing two weeks in a row. The chai recipe, though? That doesn\u2019t change. That\u2019s amma\u2019s.',
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
  { days: 'Tues\u2013Thu', hours: '7am \u2013 4pm' },
  { days: 'Fri\u2013Sat', hours: '7am \u2013 4pm \u00b7 Bar 5pm \u2013 10pm', highlight: true },
  { days: 'Sunday', hours: '8am \u2013 3pm' },
  { days: 'Monday', hours: 'Closed (we\u2019re human)' },
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
