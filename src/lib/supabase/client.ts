import { createBrowserClient } from "@supabase/ssr";

const FALLBACK_URL = "https://bfxktbtobusflbvbiotb.supabase.co";
const FALLBACK_KEY = "sb_publishable_85D2M33SYckSQtlO--tEFQ_VSpxOjGO";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || FALLBACK_KEY;

  return createBrowserClient(url, key);
}
