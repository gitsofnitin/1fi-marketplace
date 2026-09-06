export type ProductCategory = 'All' | 'Smartphones' | 'Laptops' | 'Audio' | 'Wearables';

export interface ProductVariant {
  id: string;
  name: string; // e.g., "128 GB", "256 GB", "512 GB"
  color: string; // e.g., "Space Black", "Natural Titanium"
  colorHex: string; // e.g., "#1f2022", "#9e9689"
  storage?: string;
  ram?: string;
  price: number; // Final calculated price for this variant
  originalPrice?: number;
  inStock: boolean;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  tagline?: string;
  description: string;
  basePrice: number;
  originalBasePrice?: number;
  featured?: boolean;
  rating: number;
  reviewsCount: number;
  images: string[];
  variants: ProductVariant[];
  features: string[];
  specs: Record<string, string>;
  startingEmi: number;
  badge?: string; // e.g. "0% Interest", "Bestseller", "Instant Approval"
}
