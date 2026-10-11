-- ==========================================================
-- GamlaWala 🌱: Row Level Security (RLS) Policies
-- Brand Tagline: Har Ghar Hariyali
-- Run in Supabase SQL Editor.
-- ==========================================================

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_variants enable row level security;
alter table public.product_images enable row level security;
alter table public.stores enable row level security;
alter table public.inventory enable row level security;
alter table public.addresses enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payments enable row level security;
alter table public.shipments enable row level security;

-- Public storefront: active catalog only
drop policy if exists "Public can view active categories" on public.categories;
create policy "Public can view active categories"
on public.categories for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public can view active products" on public.products;
create policy "Public can view active products"
on public.products for select
to anon, authenticated
using (status = 'active');

drop policy if exists "Public can view active variants" on public.product_variants;
create policy "Public can view active variants"
on public.product_variants for select
to anon, authenticated
using (
  is_active = true
  and exists (
    select 1
    from public.products p
    where p.id = product_id
      and p.status = 'active'
  )
);

drop policy if exists "Public can view product images" on public.product_images;
create policy "Public can view product images"
on public.product_images for select
to anon, authenticated
using (
  exists (
    select 1
    from public.products p
    where p.id = product_id
      and p.status = 'active'
  )
);

-- Profiles
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

-- Addresses
drop policy if exists "Users can view their own addresses" on public.addresses;
create policy "Users can view their own addresses"
on public.addresses for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert their own addresses" on public.addresses;
create policy "Users can insert their own addresses"
on public.addresses for insert
to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update their own addresses" on public.addresses;
create policy "Users can update their own addresses"
on public.addresses for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

drop policy if exists "Users can delete their own addresses" on public.addresses;
create policy "Users can delete their own addresses"
on public.addresses for delete
to authenticated
using ((select auth.uid()) = user_id);

-- Orders
drop policy if exists "Users can view their own orders" on public.orders;
create policy "Users can view their own orders"
on public.orders for select
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "Users can view their own order items" on public.order_items;
create policy "Users can view their own order items"
on public.order_items for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id
      and o.user_id = (select auth.uid())
  )
);

-- Payments
drop policy if exists "Users can view their own payments" on public.payments;
create policy "Users can view their own payments"
on public.payments for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id
      and o.user_id = (select auth.uid())
  )
);

-- Shipments
drop policy if exists "Users can view their own shipments" on public.shipments;
create policy "Users can view their own shipments"
on public.shipments for select
to authenticated
using (
  exists (
    select 1 from public.orders o
    where o.id = order_id
      and o.user_id = (select auth.uid())
  )
);
