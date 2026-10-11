# GamlaWala 🌱 — Plant E-Commerce Platform
> **Brand Tagline:** *Har Ghar Hariyali*

A botanical e-commerce platform designed for India, connecting online plant parents with nursery inventory, transit-safe packaging, and an admin operations portal.

---

## 🛠️ Technology Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) with React 19 & TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with GamlaWala brand tokens (*Forest Green*, *Sage*, *Cream*, *Terracotta*)
- **Database & Auth:** [Supabase](https://supabase.com/) (PostgreSQL + RLS + Supabase Auth + Supabase Storage)
- **Currency Convention:** Stored in **paise** (`price_paise bigint`), converted to INR (`₹`) in UI
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 How to Run Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.local` and add your Supabase credentials:
```bash
# In .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
```
*(Note: If you haven't connected your Supabase project yet, the application gracefully loads an authentic starter botanical catalog so you can develop immediately!)*

### 3. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or `http://localhost:3001` if port 3000 is occupied) in your browser.

---

## 🗄️ Supabase Database Setup

All migration and seed scripts are ready in `supabase/migrations/`:

1. **Core Commerce Schema:** Run [`supabase/migrations/01_core_schema.sql`](file:///Volumes/VikashSSD/New-Plan/gamlawala/supabase/migrations/01_core_schema.sql) in Supabase SQL Editor:
   - Tables: `categories`, `products`, `product_variants`, `product_images`, `stores`, `inventory`, `addresses`, `orders`, `order_items`, `payments`, `shipments`, `profiles`, `user_roles`.
2. **Row Level Security (RLS):** Run [`supabase/migrations/02_rls_policies.sql`](file:///Volumes/VikashSSD/New-Plan/gamlawala/supabase/migrations/02_rls_policies.sql):
   - Secure customer data and allow public storefront access to active catalog items.
3. **Seed Botanical Catalog:** Run [`supabase/migrations/03_seed_data.sql`](file:///Volumes/VikashSSD/New-Plan/gamlawala/supabase/migrations/03_seed_data.sql):
   - Starter categories, Connaught Place & South Delhi physical hubs, and top Indian botanical varieties (Money Plant, Snake Plant, Monstera, Sacred Tulsi).

---

## 🗺️ Application Routes

| Route | Description |
|---|---|
| [`/`](file:///Volumes/VikashSSD/New-Plan/gamlawala/src/app/page.tsx) | Homepage with *Har Ghar Hariyali* hero, curated categories, best sellers, and nursery assurance |
| [`/shop`](file:///Volumes/VikashSSD/New-Plan/gamlawala/src/app/shop/page.tsx) | Nursery catalog with category filter tabs and search |
| [`/products/[slug]`](file:///Volumes/VikashSSD/New-Plan/gamlawala/src/app/products/%5Bslug%5D/page.tsx) | Product detail page with pot variant picker, care requirements (sunlight, water), and Add to Cart |
| [`/cart`](file:///Volumes/VikashSSD/New-Plan/gamlawala/src/app/cart/page.tsx) | Dedicated Cart & Indian Checkout with PIN code validation and Razorpay / COD selection |
| [`/plant-care`](file:///Volumes/VikashSSD/New-Plan/gamlawala/src/app/plant-care/page.tsx) | Horticulture guide (Sunlight, finger moisture test, GamlaWala 4-component potting soil mix) |
| [`/api/products`](file:///Volumes/VikashSSD/New-Plan/gamlawala/src/app/api/products/route.ts) | Next.js API Route Handler returning JSON catalog |

---

## 📂 Project Structure

```
gamlawala/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (Header, CartDrawer, Footer)
│   │   ├── globals.css         # Tailwind & GamlaWala styling tokens
│   │   ├── page.tsx            # Storefront homepage
│   │   ├── shop/               # Catalog listing
│   │   ├── products/[slug]/    # Product details & variant selector
│   │   ├── cart/               # Cart & checkout
│   │   ├── plant-care/         # Plant care guides
│   │   └── api/products/       # REST API endpoint
│   ├── components/             # Reusable UI components (Header, Footer, ProductCard, CartDrawer)
│   ├── features/               # Cart state & Product fetcher
│   ├── lib/supabase/           # Supabase browser & server clients
│   └── types/database.ts       # TypeScript types & paise-to-rupee currency formatter
├── supabase/
│   └── migrations/             # SQL scripts for Supabase SQL Editor
├── .env.local                  # Local environment configuration
└── package.json
```
