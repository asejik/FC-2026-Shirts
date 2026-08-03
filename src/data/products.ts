export type TShirtSize = 'Small' | 'Medium' | 'Large' | 'XL' | 'XXL';
export type Category = 'Premium' | 'Standard';

export interface QualityTier {
  id: string;
  name: string;
  price: number;
}

export interface TShirtOption {
  id: string;
  code: string;
  name: string;
  category: Category;
  basePrice: number;
  qualityTiers: QualityTier[];
  colors: string[];
  sizes: TShirtSize[];
  description: string;
  images: {
    front: string;
    back: string;
  };
}

export const ALL_SIZES: TShirtSize[] = ['Small', 'Medium', 'Large', 'XL', 'XXL'];

export const PREMIUM_TIERS: QualityTier[] = [
  { id: 'prem-rn', name: 'Premium Round Neck', price: 15000 },
  { id: 'heavy-prem-rn', name: 'Heavy Premium Round Neck', price: 18000 },
  { id: 'ultra-prem-rn', name: 'Ultra Premium Round Neck', price: 26000 },
];

export const STANDARD_TIERS: QualityTier[] = [
  { id: 'std-rn', name: 'Standard Round Neck', price: 7000 },
];

export const products: TShirtOption[] = [
  // Premium Shirt Designs
  {
    id: 'premium-option-1',
    code: 'PRM-OPT-01',
    name: 'Premium 1',
    category: 'Premium',
    basePrice: 15000,
    qualityTiers: PREMIUM_TIERS,
    colors: ['Black', 'Orange', 'Ash', 'Blue'],
    sizes: ALL_SIZES,
    description: 'Exclusive FC2026 Premium Option 1 design available in Premium, Heavy Premium, and Ultra Premium fabric qualities.',
    images: {
      front: '/assets/premium/premium 1 (front).jpg',
      back: '/assets/premium/premium 1 (back).jpg',
    },
  },
  {
    id: 'premium-option-2',
    code: 'PRM-OPT-02',
    name: 'Premium 2',
    category: 'Premium',
    basePrice: 15000,
    qualityTiers: PREMIUM_TIERS,
    colors: ['Black', 'Orange', 'Ash', 'Blue'],
    sizes: ALL_SIZES,
    description: 'Exclusive FC2026 Premium Option 2 design available in Premium, Heavy Premium, and Ultra Premium fabric qualities.',
    images: {
      front: '/assets/premium/premium 2 (front).jpg',
      back: '/assets/premium/premium 2 (back).jpg',
    },
  },
  {
    id: 'premium-option-3',
    code: 'PRM-OPT-03',
    name: 'Premium 3',
    category: 'Premium',
    basePrice: 15000,
    qualityTiers: PREMIUM_TIERS,
    colors: ['Black', 'Orange', 'Ash', 'Blue'],
    sizes: ALL_SIZES,
    description: 'Exclusive FC2026 Premium Option 3 design available in Premium, Heavy Premium, and Ultra Premium fabric qualities.',
    images: {
      front: '/assets/premium/premium 3 (front).jpg',
      back: '/assets/premium/premium 3 (back).jpg',
    },
  },

  // Standard Shirt Designs
  {
    id: 'std-round-1',
    code: 'STD-OPT-01',
    name: 'Standard 1',
    category: 'Standard',
    basePrice: 7000,
    qualityTiers: STANDARD_TIERS,
    colors: ['Black', 'White', 'Orange', 'Navy Blue'],
    sizes: ALL_SIZES,
    description: 'Classic FC2026 Standard Option 1 T-shirt in crisp white finish.',
    images: {
      front: '/assets/standard/standard 1 - white (front).jpg',
      back: '/assets/standard/standard 1 - white (back).jpg',
    },
  },
  {
    id: 'std-round-2',
    code: 'STD-OPT-02',
    name: 'Standard 2',
    category: 'Standard',
    basePrice: 7000,
    qualityTiers: STANDARD_TIERS,
    colors: ['Black', 'White', 'Orange', 'Navy Blue'],
    sizes: ALL_SIZES,
    description: 'Classic FC2026 Standard Option 2 T-shirt for daily member wear.',
    images: {
      front: '/assets/standard/standard 2 - white (front).jpg',
      back: '/assets/standard/standard 2 - white (back).jpg',
    },
  },
  {
    id: 'std-round-3',
    code: 'STD-OPT-03',
    name: 'Standard 3',
    category: 'Standard',
    basePrice: 7000,
    qualityTiers: STANDARD_TIERS,
    colors: ['Black', 'White', 'Orange', 'Navy Blue'],
    sizes: ALL_SIZES,
    description: 'Classic FC2026 Standard Option 3 T-shirt in sleek black finish.',
    images: {
      front: '/assets/standard/standard 3 - black (front).jpg',
      back: '/assets/standard/standard 3 - black (back).jpg',
    },
  },
  {
    id: 'std-round-4',
    code: 'STD-OPT-04',
    name: 'Standard 4',
    category: 'Standard',
    basePrice: 7000,
    qualityTiers: STANDARD_TIERS,
    colors: ['Black', 'White', 'Orange', 'Navy Blue'],
    sizes: ALL_SIZES,
    description: 'Classic FC2026 Standard Option 4 T-shirt with front and back print.',
    images: {
      front: '/assets/standard/standard 4 - black (front).jpg',
      back: '/assets/standard/standard 4 - black (back).jpg',
    },
  },
];
