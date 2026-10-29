/**
 * Central utility to safely resolve botanical product image URLs.
 * Handles full URLs, Base64 data URLs, and Supabase Storage paths with graceful fallback.
 */

export const DEFAULT_PLANT_IMAGE =
  'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80';

export function resolveProductImageUrl(path?: string | null): string {
  if (!path || typeof path !== 'string' || path.trim() === '') {
    return DEFAULT_PLANT_IMAGE;
  }

  const trimmed = path.trim();

  // Already a full external URL or data URL
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image')) {
    return trimmed;
  }

  // Relative Supabase Storage path
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bfxktbtobusflbvbiotb.supabase.co';
  const clean = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;

  if (clean.startsWith('storage/v1/object/public/')) {
    return `${supabaseUrl}/${clean}`;
  }

  if (clean.startsWith('product-images/')) {
    return `${supabaseUrl}/storage/v1/object/public/${clean}`;
  }

  return `${supabaseUrl}/storage/v1/object/public/product-images/${clean}`;
}
