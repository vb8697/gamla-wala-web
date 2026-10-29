import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types/database";
import { resolveProductImageUrl } from "@/lib/images";

export const fallbackProducts: Product[] = [
  {
    id: "prod-1",
    category_id: "cat-1",
    name: "Golden Money Plant (Pothos)",
    slug: "money-plant",
    description: "Traditional auspicious Indian houseplant symbolizing prosperity, good fortune, and abundant positive energy. Features heart-shaped jade leaves splashed with vibrant gold.",
    care_instructions: {
      sunlight: "Bright Indirect Sunlight",
      watering: "Once a week (when topsoil dries)",
      maintenance: "Beginner Friendly",
      petFriendly: false,
    },
    status: "active",
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      name: "Indoor Plants",
      slug: "indoor-plants",
    },
    product_variants: [
      {
        id: "var-1",
        product_id: "prod-1",
        sku: "GW-MP-001",
        variant_name: "6-inch Eco Nursery Gamla",
        price_paise: 29900,
        compare_at_price_paise: 39900,
        weight_grams: 1200,
        is_active: true,
        created_at: new Date().toISOString(),
      },
      {
        id: "var-1-b",
        product_id: "prod-1",
        sku: "GW-MP-001-CER",
        variant_name: "8-inch Glazed Ceramic Pot",
        price_paise: 49900,
        compare_at_price_paise: 64900,
        weight_grams: 2200,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
    product_images: [
      {
        id: "img-1",
        product_id: "prod-1",
        storage_path: "https://images.unsplash.com/photo-1596724803273-04ef9647e307?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Golden Money Plant in Ceramic Pot",
        sort_order: 1,
      },
    ],
  },
  {
    id: "prod-2",
    category_id: "cat-4",
    name: "Snake Plant Laurentii (Sansevieria)",
    slug: "snake-plant-laurentii",
    description: "NASA-approved top air purifying botanical that releases pure oxygen throughout the night. Virtually indestructible with sword-like variegated golden yellow edges.",
    care_instructions: {
      sunlight: "Low to Bright Indirect Light",
      watering: "Every 10-14 days",
      maintenance: "Extremely Resilient",
      petFriendly: false,
    },
    status: "active",
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      name: "Air Purifying",
      slug: "air-purifying",
    },
    product_variants: [
      {
        id: "var-2",
        product_id: "prod-2",
        sku: "GW-SNK-002",
        variant_name: "8-inch Self-Watering Planter",
        price_paise: 54900,
        compare_at_price_paise: 69900,
        weight_grams: 1800,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
    product_images: [
      {
        id: "img-2",
        product_id: "prod-2",
        storage_path: "https://images.unsplash.com/photo-1599598425947-630b91e988cf?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Snake Plant Laurentii in White Planter",
        sort_order: 1,
      },
    ],
  },
  {
    id: "prod-3",
    category_id: "cat-1",
    name: "Monstera Deliciosa (Swiss Cheese)",
    slug: "monstera-deliciosa",
    description: "The magnificent Swiss Cheese plant celebrated for its iconic perforated tropical fenestrations. The ultimate statement focal point for Indian homes and modern workspaces.",
    care_instructions: {
      sunlight: "Bright Filtered Light",
      watering: "When top 2 inches dry",
      maintenance: "Moderate",
      petFriendly: false,
    },
    status: "active",
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      name: "Indoor Plants",
      slug: "indoor-plants",
    },
    product_variants: [
      {
        id: "var-3",
        product_id: "prod-3",
        sku: "GW-MONS-003",
        variant_name: "10-inch Handcrafted Terracotta Gamla",
        price_paise: 89900,
        compare_at_price_paise: 119900,
        weight_grams: 3200,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
    product_images: [
      {
        id: "img-3",
        product_id: "prod-3",
        storage_path: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Monstera Deliciosa in living room",
        sort_order: 1,
      },
    ],
  },
  {
    id: "prod-4",
    category_id: "cat-2",
    name: "Sacred Shyam Tulsi (Holy Basil)",
    slug: "shyam-tulsi",
    description: "Revered sacred Indian botanical possessing therapeutic, air-purifying, and spiritual significance. Rich in antioxidants and calming herbal aroma.",
    care_instructions: {
      sunlight: "Direct Morning Sunlight (4-6 hrs)",
      watering: "Daily light watering",
      maintenance: "Easy",
      petFriendly: true,
    },
    status: "active",
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      name: "Outdoor Plants",
      slug: "outdoor-plants",
    },
    product_variants: [
      {
        id: "var-4",
        product_id: "prod-4",
        sku: "GW-TUL-004",
        variant_name: "Traditional Handcrafted Earthen Gamla",
        price_paise: 19900,
        compare_at_price_paise: 29900,
        weight_grams: 1000,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
    product_images: [
      {
        id: "img-4",
        product_id: "prod-4",
        storage_path: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Sacred Shyam Tulsi in Clay Pot",
        sort_order: 1,
      },
    ],
  },
  {
    id: "prod-5",
    category_id: "cat-1",
    name: "Peace Lily (Spathiphyllum)",
    slug: "peace-lily",
    description: "Elegant white blooms with glossy dark emerald leaves. Signifies tranquility and removes toxic airborne benzene, formaldehyde, and carbon monoxide.",
    care_instructions: {
      sunlight: "Shade to Medium Light",
      watering: "When leaves start to droop slightly",
      maintenance: "Easy",
      petFriendly: false,
    },
    status: "active",
    is_featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      name: "Indoor Plants",
      slug: "indoor-plants",
    },
    product_variants: [
      {
        id: "var-5",
        product_id: "prod-5",
        sku: "GW-PL-005",
        variant_name: "7-inch Ceramic Planter",
        price_paise: 44900,
        compare_at_price_paise: 59900,
        weight_grams: 1600,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
    product_images: [
      {
        id: "img-5",
        product_id: "prod-5",
        storage_path: "https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Peace Lily with White Blossom",
        sort_order: 1,
      },
    ],
  },
  {
    id: "prod-6",
    category_id: "cat-4",
    name: "Areca Palm (Butterfly Palm)",
    slug: "areca-palm",
    description: "Graceful feathery fronds that bring a lush tropical oasis vibe indoors while serving as a natural room humidifier.",
    care_instructions: {
      sunlight: "Bright Filtered Sunlight",
      watering: "Twice a week in summer",
      maintenance: "Moderate",
      petFriendly: true,
    },
    status: "active",
    is_featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    categories: {
      name: "Air Purifying",
      slug: "air-purifying",
    },
    product_variants: [
      {
        id: "var-6",
        product_id: "prod-6",
        sku: "GW-AP-006",
        variant_name: "12-inch Premium Nursery Gamla",
        price_paise: 79900,
        compare_at_price_paise: 109900,
        weight_grams: 4000,
        is_active: true,
        created_at: new Date().toISOString(),
      },
    ],
    product_images: [
      {
        id: "img-6",
        product_id: "prod-6",
        storage_path: "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=1000&q=80",
        alt_text: "Areca Palm in Living Room",
        sort_order: 1,
      },
    ],
  },
];

// Sample (placeholder) catalogue entries for non-plant categories. Replace with real products in Supabase.
function sampleItem(
  n: number,
  o: {
    name: string; slug: string; desc: string; cat: { name: string; slug: string };
    img: string; variants: [string, number, number | null][]; care?: Product["care_instructions"];
    featured?: boolean;
  }
): Product {
  const id = `prod-s${n}`;
  const now = new Date().toISOString();
  return {
    id,
    category_id: `cat-s${n}`,
    name: o.name,
    slug: o.slug,
    description: o.desc,
    care_instructions: o.care ?? {},
    status: "active",
    is_featured: !!o.featured,
    created_at: now,
    updated_at: now,
    categories: o.cat,
    product_variants: o.variants.map(([variant_name, price_paise, compare], i) => ({
      id: `${id}-v${i}`,
      product_id: id,
      sku: `GW-S${n}-${i}`,
      variant_name,
      price_paise,
      compare_at_price_paise: compare,
      weight_grams: null,
      is_active: true,
      created_at: now,
    })),
    product_images: [{ id: `${id}-img`, product_id: id, storage_path: o.img, alt_text: o.name, sort_order: 1 }],
  };
}

const POTS = { name: "Gamlas & Pots", slug: "pots-planters" };
const SUCC = { name: "Succulents", slug: "succulents" };
const SOIL = { name: "Soil & Nutrition", slug: "seeds-gardening" };
const IMG_POT = "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1000&q=80";
const IMG_SUCC = "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=1000&q=80";
const IMG_SOIL = "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=80";

fallbackProducts.push(
  sampleItem(1, { name: "Classic Terracotta Gamla", slug: "classic-terracotta-gamla", desc: "Handmade earthen pot with a drainage hole. Naturally breathable, so roots stay healthy and cool in summer.", cat: POTS, img: IMG_POT, variants: [["6 inch", 14900, 19900], ["8 inch", 24900, 29900], ["10 inch", 39900, null]], featured: true }),
  sampleItem(2, { name: "Painted Ceramic Planter", slug: "painted-ceramic-planter", desc: "Glazed ceramic planter that suits desks, shelves and balconies. Includes a matching saucer.", cat: POTS, img: IMG_POT, variants: [["Small", 29900, 39900], ["Medium", 49900, 64900]] }),
  sampleItem(3, { name: "Jade Succulent", slug: "jade-succulent", desc: "Thick glossy leaves and very low maintenance. Needs sun and only a little water.", cat: SUCC, img: IMG_SUCC, variants: [["4 inch pot", 19900, 24900]], care: { sunlight: "Bright light, some direct sun", watering: "Every 10-14 days", maintenance: "Beginner Friendly", petFriendly: false }, featured: true }),
  sampleItem(4, { name: "Mixed Succulent Set (3 pcs)", slug: "mixed-succulent-set", desc: "Three assorted succulents in small pots, ready to display on a desk or windowsill.", cat: SUCC, img: IMG_SUCC, variants: [["Set of 3", 34900, 44900]], care: { sunlight: "Bright indirect light", watering: "Every 10-14 days", maintenance: "Beginner Friendly" } }),
  sampleItem(5, { name: "Organic Potting Mix (5 kg)", slug: "organic-potting-mix", desc: "Ready-to-use mix of cocopeat, vermicompost, perlite and neem cake for healthy roots and good drainage.", cat: SOIL, img: IMG_SOIL, variants: [["2 kg", 14900, null], ["5 kg", 29900, 34900]] }),
  sampleItem(6, { name: "Vermicompost (3 kg)", slug: "vermicompost", desc: "Natural, nutrient-rich compost that feeds your plants slowly. Mix a handful into the topsoil every month.", cat: SOIL, img: IMG_SOIL, variants: [["3 kg", 19900, null]] }),
);

const FALLBACK_URL = "https://bfxktbtobusflbvbiotb.supabase.co";
const FALLBACK_KEY = "sb_publishable_85D2M33SYckSQtlO--tEFQ_VSpxOjGO";

let memoryCache: { data: Product[]; expiresAt: number } | null = null;
const CACHE_TTL_MS = 30_000; // 30-second cache to make navigation instant

export async function getProducts(forceRefresh = false): Promise<Product[]> {
  const now = Date.now();
  if (!forceRefresh && memoryCache && memoryCache.expiresAt > now) {
    return memoryCache.data;
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;
    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("YOUR_PROJECT")) {
      return fallbackProducts;
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        botanical_name,
        description,
        care_instructions,
        tags,
        is_featured,
        rating,
        review_count,
        categories (name, slug),
        product_variants (
          id,
          sku,
          variant_name,
          price_paise,
          compare_at_price_paise,
          weight_grams,
          pot_size,
          height_approx,
          is_active
        ),
        product_images (
          storage_path,
          alt_text,
          sort_order,
          is_primary
        )
      `)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      console.warn("Using fallback products catalog:", error?.message);
      return fallbackProducts;
    }

    const mapped = (data as unknown as Product[]).map((p) => {
      const imgs = (p.product_images || []).slice().sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1;
        if (!a.is_primary && b.is_primary) return 1;
        return (a.sort_order ?? 0) - (b.sort_order ?? 0);
      });
      return {
        ...p,
        product_images: imgs.map((img) => ({
          ...img,
          storage_path: resolveProductImageUrl(img.storage_path),
        })),
      };
    });

    const result = mapped.length > 0 ? mapped : fallbackProducts;
    memoryCache = { data: result, expiresAt: now + CACHE_TTL_MS };
    return result;
  } catch (err) {
    console.warn("Supabase fetch failed, returning initial botanical catalog:", err);
    return fallbackProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  const directMatch = products.find((p) => p.slug === slug);
  if (directMatch) return directMatch;

  // Handle common slug variations (e.g. golden-money-plant <-> money-plant)
  return (
    products.find(
      (p) =>
        p.slug.includes(slug) ||
        slug.includes(p.slug) ||
        p.name.toLowerCase().includes(slug.replace(/-/g, ' '))
    ) ?? null
  );
}
