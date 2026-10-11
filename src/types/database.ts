export type AppRole = 'customer' | 'staff' | 'admin';
export type ProductStatus = 'draft' | 'active' | 'archived';
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  sku: string;
  variant_name: string;
  price_paise: number; // Stored in paise (e.g. 29900 = ₹299.00)
  compare_at_price_paise: number | null;
  weight_grams: number | null;
  pot_size?: string | null;
  height_approx?: string | null;
  is_active: boolean;
  created_at: string;
}

export interface ProductImage {
  id: string;
  product_id: string;
  storage_path: string;
  alt_text: string | null;
  sort_order: number;
  is_primary?: boolean;
}

export interface CareInstructions {
  sunlight?: string;
  watering?: string;
  maintenance?: string;
  petFriendly?: boolean;
  room_type?: string;
  soil_mix?: string;
}

export interface Product {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  botanical_name?: string | null;
  description: string | null;
  care_instructions: CareInstructions;
  tags?: string[] | null;
  status: ProductStatus;
  is_featured: boolean;
  rating?: number;
  review_count?: number;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
    slug: string;
  } | null;
  product_variants?: ProductVariant[];
  product_images?: ProductImage[];
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: 'flat' | 'percentage';
  discount_value: number;
  min_order_paise: number;
  is_active: boolean;
}

export interface PincodeInfo {
  pincode: string;
  city: string;
  state: string;
  is_serviceable: boolean;
  estimated_delivery_hours: number;
  express_available: boolean;
  cod_available: boolean;
}

export interface PlantHold {
  id: string;
  user_id?: string | null;
  session_id?: string | null;
  status: 'active' | 'released' | 'expired' | 'consumed';
  expires_at: string;
  created_at?: string;
}

export interface Store {
  id: string;
  name: string;
  code: string;
  city?: string;
  state?: string;
  address: {
    line1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    phone?: string;
  };
  is_active: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

/**
 * Currency Utility: Converts database integer paise into formatted INR string
 * Example: 29900 paise -> "₹299" or "₹299.00"
 */
export function formatPaise(paise: number, showDecimals = false): string {
  const rupees = paise / 100;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(rupees);
}
