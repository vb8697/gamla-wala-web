-- ==========================================================
-- GamlaWala 🌱: Seed Data
-- Brand Tagline: Har Ghar Hariyali
-- Run in Supabase SQL Editor.
-- ==========================================================

-- 1. Starter Categories
insert into public.categories (name, slug, sort_order, image_url)
values
  ('Indoor Plants', 'indoor-plants', 1, 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80'),
  ('Outdoor Plants', 'outdoor-plants', 2, 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80'),
  ('Flowering Plants', 'flowering-plants', 3, 'https://images.unsplash.com/photo-1596724803273-04ef9647e307?auto=format&fit=crop&w=800&q=80'),
  ('Air Purifying', 'air-purifying', 4, 'https://images.unsplash.com/photo-1599598425947-630b91e988cf?auto=format&fit=crop&w=800&q=80'),
  ('Succulents', 'succulents', 5, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'),
  ('Pots & Planters', 'pots-planters', 6, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80'),
  ('Seeds & Gardening', 'seeds-gardening', 7, 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80')
on conflict (slug) do nothing;

-- 2. Physical Stores (Physical Nursery + Fulfillment Hub)
insert into public.stores (name, code, address, is_active)
values
  (
    'GamlaWala Heritage Nursery (Connaught Place)',
    'DL-CP-01',
    '{"line1": "Plot 14, Barakhamba Road", "city": "New Delhi", "state": "Delhi", "postal_code": "110001", "phone": "+91 11 2345 6789"}'::jsonb,
    true
  ),
  (
    'GamlaWala Botanical Greenhouse & Fulfillment Center',
    'DL-SD-02',
    '{"line1": "Sainik Farms, Western Avenue", "city": "New Delhi", "state": "Delhi", "postal_code": "110062", "phone": "+91 11 2955 8899"}'::jsonb,
    true
  )
on conflict (code) do nothing;

-- 3. Money Plant (Golden Pothos)
with new_product as (
  insert into public.products (
    category_id,
    name,
    slug,
    description,
    care_instructions,
    status,
    is_featured
  )
  select
    id,
    'Golden Money Plant (Pothos)',
    'money-plant',
    'Traditional auspicious Indian houseplant symbolizing prosperity, good fortune, and abundant positive energy. Features heart-shaped jade leaves splashed with vibrant gold.',
    '{"sunlight": "Bright Indirect", "watering": "Once a week", "maintenance": "Easy", "petFriendly": false}'::jsonb,
    'active',
    true
  from public.categories
  where slug = 'indoor-plants'
  on conflict (slug) do update set status = 'active'
  returning id
)
insert into public.product_variants (
  product_id,
  sku,
  variant_name,
  price_paise,
  compare_at_price_paise,
  weight_grams,
  is_active
)
select id, 'GW-MP-001', '6-inch Nursery Gamla', 29900, 39900, 1200, true
from new_product
on conflict (sku) do nothing;

-- 4. Snake Plant Laurentii
with new_product as (
  insert into public.products (
    category_id,
    name,
    slug,
    description,
    care_instructions,
    status,
    is_featured
  )
  select
    id,
    'Snake Plant Laurentii (Sansevieria)',
    'snake-plant-laurentii',
    'NASA-approved air purifier releasing rich oxygen throughout the night. Virtually indestructible with architectural sword-like variegated golden yellow borders.',
    '{"sunlight": "Low to Bright Indirect", "watering": "Every 10-14 days", "maintenance": "Very Easy", "petFriendly": false}'::jsonb,
    'active',
    true
  from public.categories
  where slug = 'air-purifying'
  on conflict (slug) do update set status = 'active'
  returning id
)
insert into public.product_variants (
  product_id,
  sku,
  variant_name,
  price_paise,
  compare_at_price_paise,
  weight_grams,
  is_active
)
select id, 'GW-SNK-002', '8-inch Self-Watering Planter', 54900, 69900, 1800, true
from new_product
on conflict (sku) do nothing;

-- 5. Monstera Deliciosa (Swiss Cheese Plant)
with new_product as (
  insert into public.products (
    category_id,
    name,
    slug,
    description,
    care_instructions,
    status,
    is_featured
  )
  select
    id,
    'Monstera Deliciosa (Swiss Cheese Plant)',
    'monstera-deliciosa',
    'The iconic Swiss Cheese plant famous for its magnificent split glossy green leaves. The ultimate statement focal point for modern Indian living rooms and workspaces.',
    '{"sunlight": "Bright Indirect", "watering": "When top 2 inches dry", "maintenance": "Moderate", "petFriendly": false}'::jsonb,
    'active',
    true
  from public.categories
  where slug = 'indoor-plants'
  on conflict (slug) do update set status = 'active'
  returning id
)
insert into public.product_variants (
  product_id,
  sku,
  variant_name,
  price_paise,
  compare_at_price_paise,
  weight_grams,
  is_active
)
select id, 'GW-MONS-003', '10-inch Terracotta Gamla', 89900, 119900, 3200, true
from new_product
on conflict (sku) do nothing;

-- 6. Tulsi / Holy Basil (Shyam Tulsi)
with new_product as (
  insert into public.products (
    category_id,
    name,
    slug,
    description,
    care_instructions,
    status,
    is_featured
  )
  select
    id,
    'Sacred Shyam Tulsi (Holy Basil)',
    'shyam-tulsi',
    'Revered sacred Indian botanical possessing therapeutic, air-purifying, and spiritual significance. Rich in antioxidants and calming herbal aroma.',
    '{"sunlight": "Direct Morning Sunlight (4-6 hrs)", "watering": "Daily light watering", "maintenance": "Easy", "petFriendly": true}'::jsonb,
    'active',
    true
  from public.categories
  where slug = 'outdoor-plants'
  on conflict (slug) do update set status = 'active'
  returning id
)
insert into public.product_variants (
  product_id,
  sku,
  variant_name,
  price_paise,
  compare_at_price_paise,
  weight_grams,
  is_active
)
select id, 'GW-TUL-004', 'Traditional Handcrafted Earthen Pot', 19900, 29900, 1000, true
from new_product
on conflict (sku) do nothing;
