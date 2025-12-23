
import { Product, BusinessInfo, Testimonial } from './types';

export const BUSINESS_INFO: BusinessInfo = {
  name: "Jumbo Meat Suppliers",
  tagline: "Quality Fresh Meat in Bulawayo",
  address: "65 Josiah Tongogara Rd, Bulawayo, Zimbabwe",
  phone: "[Company Phone Number]",
  whatsapp: "[Company WhatsApp Number]",
  email: "[Company Email Address]",
  hours: {
    weekday: "08:00 AM - 05:30 PM",
    saturday: "08:00 AM - 01:00 PM",
    sunday: "Closed"
  }
};

export const PRODUCTS: Product[] = []; // Initialized as empty to remove mock data

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Ndlovu',
    role: 'Local Resident',
    content: "The best T-bone in Bulawayo! I won't buy my meat anywhere else. Always fresh and the service is excellent.",
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: '2',
    name: 'James Moyo',
    role: 'Braai Enthusiast',
    content: "Their Boerewors is legendary. Perfectly spiced and always juicy. Jumbo Meats is my go-to for every weekend braai.",
    avatar: 'https://i.pravatar.cc/150?u=james'
  },
  {
    id: '3',
    name: 'Tendai G.',
    role: 'Restaurant Owner',
    content: "We've been sourcing our wholesale beef from Jumbo for 5 years. Consistency and quality are top-notch.",
    avatar: 'https://i.pravatar.cc/150?u=tendai'
  }
];
