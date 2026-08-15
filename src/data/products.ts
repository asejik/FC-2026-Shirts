export type TShirtSize = 'Small' | 'Medium' | 'Large' | 'XL' | 'XXL';
export type Category = 'Standard' | 'Premium 1' | 'Premium 2';

export interface QualityTier {
  id: string;
  name: string;
  price: number;
}

export interface ColorOption {
  name: string;
  imageFront: string;
  imageBack?: string;
}

export interface TShirtOption {
  id: string;
  code: string;
  name: string;
  category: Category;
  basePrice: number;
  qualityTiers: QualityTier[];
  colors: ColorOption[];
  sizes: TShirtSize[];
  description: string;
}

export const ALL_SIZES: TShirtSize[] = ['Small', 'Medium', 'Large', 'XL', 'XXL'];

export const STANDARD_TIERS: QualityTier[] = [
  { id: 'std', name: 'Standard', price: 7000 },
];

export const PREMIUM_1_TIERS: QualityTier[] = [
  { id: 'prem-1', name: 'Premium', price: 15000 },
];

export const PREMIUM_2_ULTRA_TIERS: QualityTier[] = [
  { id: 'ultra-prem', name: 'Ultra Premium', price: 18000 },
];

export const PREMIUM_2_HEAVY_TIERS: QualityTier[] = [
  { id: 'heavy-prem', name: 'Heavy Premium', price: 26000 },
];

export const products: TShirtOption[] = [
  // Standard
  {
    id: 'std-1',
    code: 'STD-1',
    name: 'Standard 1',
    category: 'Standard',
    basePrice: 7000,
    qualityTiers: STANDARD_TIERS,
    sizes: ALL_SIZES,
    description: 'Standard Option 1 T-shirt.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/standard 1 - black (front).jpg', imageBack: '/assets/new/standard 1 - black (back).jpg' },
      { name: 'Navy Blue', imageFront: '/assets/new/standard 1 - navy blue (front).jpg', imageBack: '/assets/new/standard 1 - navy blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/standard 1 - orange (front).jpg', imageBack: '/assets/new/standard 1 - orange (back).jpg' },
    ]
  },
  {
    id: 'std-2',
    code: 'STD-2',
    name: 'Standard 2',
    category: 'Standard',
    basePrice: 7000,
    qualityTiers: STANDARD_TIERS,
    sizes: ALL_SIZES,
    description: 'Standard Option 2 T-shirt.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/standard 2 - black (front).jpg', imageBack: '/assets/new/standard 2 - black (back).jpg' },
      { name: 'Navy Blue', imageFront: '/assets/new/standard 2 - navy blue (front).jpg', imageBack: '/assets/new/standard 2 - navy blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/standard 2 - orange (front).jpg', imageBack: '/assets/new/standard 2 - orange (back).jpg' },
    ]
  },
  // Premium 1
  {
    id: 'prem-1a',
    code: 'PRM-1A',
    name: 'Premium 1a',
    category: 'Premium 1',
    basePrice: 15000,
    qualityTiers: PREMIUM_1_TIERS,
    sizes: ALL_SIZES,
    description: 'Premium Option 1a T-shirt.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/premium 1a - black (front).jpg', imageBack: '/assets/new/premium 1a - black (back).jpg' },
      { name: 'Grey', imageFront: '/assets/new/premium 1a - grey (front).jpg', imageBack: '/assets/new/premium 1a - grey (back).jpg' },
      { name: 'Navy Blue', imageFront: '/assets/new/premium 1a - navy blue (front).jpg', imageBack: '/assets/new/premium 1a - navy blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/premium 1a - orange (front).jpg', imageBack: '/assets/new/premium 1a - orange (back).jpg' },
    ]
  },
  {
    id: 'prem-1b',
    code: 'PRM-1B',
    name: 'Premium 1b',
    category: 'Premium 1',
    basePrice: 15000,
    qualityTiers: PREMIUM_1_TIERS,
    sizes: ALL_SIZES,
    description: 'Premium Option 1b T-shirt.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/premium 1b - black (front).jpg', imageBack: '/assets/new/premium 1b - black (back).jpg' },
      { name: 'Navy Blue', imageFront: '/assets/new/premium 1b - navy blue (front).jpg', imageBack: '/assets/new/premium 1b - navy blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/premium 1b - orange (front).jpg', imageBack: '/assets/new/premium 1b - orange (back).jpg' },
      { name: 'White', imageFront: '/assets/new/premium 1b - white (front).jpg', imageBack: '/assets/new/premium 1b - white (back).jpg' },
    ]
  },
  // Premium 2
  {
    id: 'prem-2a-ultra',
    code: 'PRM-2A-ULT',
    name: 'Premium 2a - Ultra Premium',
    category: 'Premium 2',
    basePrice: 18000,
    qualityTiers: PREMIUM_2_ULTRA_TIERS,
    sizes: ALL_SIZES,
    description: 'Premium Option 2a T-shirt in Ultra Premium quality.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/premium 2a - black (front).jpg', imageBack: '/assets/new/premium 2a - black (back).jpg' },
      { name: 'Ash', imageFront: '/assets/new/premium 2a - ash (front).jpg', imageBack: '/assets/new/premium 2a - ash (back).jpg' },
      { name: 'Blue', imageFront: '/assets/new/premium 2a - blue (front).jpg', imageBack: '/assets/new/premium 2a - blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/premium 2a - orange (front).jpg', imageBack: '/assets/new/premium 2a - orange (back).jpg' },
    ]
  },
  {
    id: 'prem-2a-heavy',
    code: 'PRM-2A-HVY',
    name: 'Premium 2a - Heavy Premium',
    category: 'Premium 2',
    basePrice: 26000,
    qualityTiers: PREMIUM_2_HEAVY_TIERS,
    sizes: ALL_SIZES,
    description: 'Premium Option 2a T-shirt in Heavy Premium quality.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/premium 2a - black (front).jpg', imageBack: '/assets/new/premium 2a - black (back).jpg' },
      { name: 'Ash', imageFront: '/assets/new/premium 2a - ash (front).jpg', imageBack: '/assets/new/premium 2a - ash (back).jpg' },
      { name: 'Blue', imageFront: '/assets/new/premium 2a - blue (front).jpg', imageBack: '/assets/new/premium 2a - blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/premium 2a - orange (front).jpg', imageBack: '/assets/new/premium 2a - orange (back).jpg' },
    ]
  },
  {
    id: 'prem-2b-ultra',
    code: 'PRM-2B-ULT',
    name: 'Premium 2b - Ultra Premium',
    category: 'Premium 2',
    basePrice: 18000,
    qualityTiers: PREMIUM_2_ULTRA_TIERS,
    sizes: ALL_SIZES,
    description: 'Premium Option 2b T-shirt in Ultra Premium quality.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/premium 2b - black (front).jpg', imageBack: '/assets/new/premium 2b - black (back).jpg' },
      { name: 'Ash', imageFront: '/assets/new/premium 2b - ash (front).jpg', imageBack: '/assets/new/premium 2b - ash (back).jpg' },
      { name: 'Blue', imageFront: '/assets/new/premium 2b - blue (front).jpg', imageBack: '/assets/new/premium 2b - blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/premium 2b - orange (front).jpg', imageBack: '/assets/new/premium 2b - orange (back).jpg' },
    ]
  },
  {
    id: 'prem-2b-heavy',
    code: 'PRM-2B-HVY',
    name: 'Premium 2b - Heavy Premium',
    category: 'Premium 2',
    basePrice: 26000,
    qualityTiers: PREMIUM_2_HEAVY_TIERS,
    sizes: ALL_SIZES,
    description: 'Premium Option 2b T-shirt in Heavy Premium quality.',
    colors: [
      { name: 'Black', imageFront: '/assets/new/premium 2b - black (front).jpg', imageBack: '/assets/new/premium 2b - black (back).jpg' },
      { name: 'Ash', imageFront: '/assets/new/premium 2b - ash (front).jpg', imageBack: '/assets/new/premium 2b - ash (back).jpg' },
      { name: 'Blue', imageFront: '/assets/new/premium 2b - blue (front).jpg', imageBack: '/assets/new/premium 2b - blue (back).jpg' },
      { name: 'Orange', imageFront: '/assets/new/premium 2b - orange (front).jpg', imageBack: '/assets/new/premium 2b - orange (back).jpg' },
    ]
  }
];
