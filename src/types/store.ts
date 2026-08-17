export interface ShoeProduct {
  id: string;
  name: string;
  tagline: string;
  category: 'running' | 'streetwear' | 'retro' | 'limited' | 'trail';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  colors: string[];
  sizes: number[];
  inStock: boolean;
  stockLeft?: number;
  description: string;
  techFeatures: string[];
  releaseYear: string;
  weight: string;
  cushioning: string;
}

export interface CartItem {
  product: ShoeProduct;
  size: number;
  color: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  shoeName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
