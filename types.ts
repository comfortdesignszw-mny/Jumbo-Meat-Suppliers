
export interface Product {
  id: string;
  name: string;
  category: 'Beef' | 'Pork' | 'Chicken' | 'Offals' | 'Boerewors';
  description: string;
  priceRange: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  date: number;
  isHighlighted: boolean;
}

export interface AdminAccount {
  id: string;
  username: string;
  passwordHash: string;
  isApproved: boolean;
  isPrimary: boolean;
  createdAt: number;
}

export interface BusinessInfo {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  hours: {
    weekday: string;
    saturday: string;
    sunday: string;
  };
}

export interface WebsiteSettings extends BusinessInfo {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

export interface CartItem extends Product {
  quantity: number;
}
