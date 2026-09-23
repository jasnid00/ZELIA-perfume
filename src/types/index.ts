export interface FragranceNote {
  name: string;
  category: 'Top' | 'Heart' | 'Base';
  origin: string;
  description: string;
}

export interface BottleSize {
  size: string; // e.g. "30 ml", "50 ml", "100 ml", "125 ml", "200 ml"
  millilitres: number;
  price: number; // in INR (₹)
  originalPrice?: number;
  inStock: boolean;
}

export interface Perfume {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number; // in INR (₹)
  originalPrice?: number;
  discountPercent?: number;
  millilitres: number; // default ml
  volume: string; // e.g. "50 ml"
  availableSizes: BottleSize[];
  category: 'Floral & Solar' | 'Amber & Woods' | 'Fresh & Citrus' | 'Gourmand & Oud' | 'Festive Exclusive' | 'Ruby Red Edition' | 'Blush Pink Edition' | 'Royal Blue Edition';
  bottleColor?: 'red' | 'pink' | 'royal-blue' | 'gold' | 'amber' | 'emerald';
  image: string;
  description: string;
  detailedDescription: string;
  concentration: string;
  longevity: string;
  sillage: string;
  mood: string;
  season: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  isFestiveOffer?: boolean;
  offerBadge?: string;
  badgeColor?: string;
  occasionCategory?: 'seasonal' | 'gift' | 'relationship' | 'mood' | 'wedding' | 'yacht' | 'gala';
}

export interface CartItem {
  product: Perfume;
  selectedSize: string;
  millilitres: number;
  price: number;
  quantity: number;
  engraving?: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  perfumeName: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface OutfitPairing {
  id: string;
  celebrityName: string;
  occasion: string;
  outfitDescription: string;
  vibe: string;
  pairedPerfumeId: string;
  image: string;
  quote: string;
}

export interface SlideItem {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  badge: string;
  discountText: string;
  image: string;
  buttonText: string;
  secondaryButtonText: string;
  perfumeId?: string;
  accentColor: string;
}
