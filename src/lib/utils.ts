import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'INR'): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  return `${displayHour}:${minutes} ${ampm}`
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(text: string, length = 150): string {
  if (text.length <= length) return text
  return text.slice(0, length) + '...'
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function generateTimeSlots(
  startHour = 9,
  endHour = 21,
  intervalMinutes = 30
): string[] {
  const slots: string[] = []
  let current = startHour * 60
  const end = endHour * 60
  while (current < end) {
    const hours = Math.floor(current / 60)
    const mins = current % 60
    slots.push(`${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`)
    current += intervalMinutes
  }
  return slots
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function isDatePast(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

export const SERVICES_DATA = [
  {
    category: 'Hair Services',
    slug: 'hair-services',
    icon: 'Scissors',
    color: '#9C6FDE',
    services: [
      { name: 'Premium Haircut', duration: 60, price: 1500, description: 'Expert styling by master stylists', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80' },
      { name: 'Hair Spa', duration: 90, price: 2500, description: 'Deep conditioning and repair treatment', image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80' },
      { name: 'Hair Coloring', duration: 120, price: 4500, description: 'Professional color with premium products', image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?w=800&q=80' },
      { name: 'Keratin Treatment', duration: 180, price: 8000, description: 'Smoothing and frizz control', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80' },
    ]
  },
  {
    category: 'Spa Services',
    slug: 'spa-services',
    icon: 'Leaf',
    color: '#10B981',
    services: [
      { name: 'Deep Tissue Massage', duration: 90, price: 3500, description: 'Therapeutic deep muscle relief', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80' },
      { name: 'Aromatherapy', duration: 60, price: 2800, description: 'Essential oil relaxation journey', image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80' },
      { name: 'Hot Stone Therapy', duration: 75, price: 4200, description: 'Volcanic basalt stone healing', image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80' },
      { name: 'Body Polishing', duration: 90, price: 3800, description: 'Full body exfoliation & glow', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80' },
    ]
  },
  {
    category: 'Skin Care',
    slug: 'skin-care',
    icon: 'Sparkles',
    color: '#F59E0B',
    services: [
      { name: 'Luxury Facial', duration: 60, price: 2200, description: 'Customized skin transformation', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80' },
      { name: 'Gold Cleanup', duration: 45, price: 1800, description: 'Gold-infused deep cleansing', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80' },
      { name: 'Anti-Aging Therapy', duration: 90, price: 5500, description: 'Advanced rejuvenation treatment', image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?w=800&q=80' },
      { name: 'Hydra Facial', duration: 75, price: 4500, description: 'Deep hydration & brightening', image: 'https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=800&q=80' },
    ]
  },
  {
    category: 'Beauty Services',
    slug: 'beauty-services',
    icon: 'Flower2',
    color: '#EC4899',
    services: [
      { name: 'Luxury Manicure', duration: 60, price: 1200, description: 'Premium nail care & art', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80' },
      { name: 'Luxury Pedicure', duration: 75, price: 1500, description: 'Foot spa & nail perfection', image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=800&q=80' },
      { name: 'Bridal Makeup', duration: 180, price: 15000, description: 'Flawless bridal transformation', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80' },
      { name: 'Party Makeup', duration: 90, price: 5000, description: 'Glamorous event makeup', image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80' },
    ]
  },
]

export const MEMBERSHIP_PLANS = [
  {
    name: 'Silver',
    tier: 'SILVER',
    price: 2999,
    duration: 6,
    discount: 5,
    color: '#C0C0C0',
    benefits: [
      '5% Discount on all services',
      'Priority booking access',
      'Birthday special treatment',
      'Monthly newsletter',
      '50 bonus reward points',
    ],
  },
  {
    name: 'Gold',
    tier: 'GOLD',
    price: 5999,
    duration: 12,
    discount: 10,
    color: '#D4AF37',
    popular: true,
    benefits: [
      '10% Discount on all services',
      'Priority booking access',
      'Free monthly consultation',
      'Exclusive member events',
      'Birthday luxury treatment',
      '150 bonus reward points',
      'Guest pass (2 per year)',
    ],
  },
  {
    name: 'Platinum',
    tier: 'PLATINUM',
    price: 11999,
    duration: 12,
    discount: 20,
    color: '#E5E4E2',
    benefits: [
      '20% Discount on all services',
      'VIP lounge access',
      'Personal dedicated therapist',
      'Unlimited priority booking',
      'Free quarterly facial',
      'Exclusive Platinum events',
      'Birthday full-day spa package',
      '500 bonus reward points',
      'Guest pass (6 per year)',
      'Home service (2 per month)',
    ],
  },
]
