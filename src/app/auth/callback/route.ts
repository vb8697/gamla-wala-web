import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/cart";

  if (code) {
    const destination = new URL(next.startsWith("/") ? next : `/${next}`, request.url);
    const response = NextResponse.redirect(destination);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-key",
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options as any);
            });
          },
        },
      }
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return response;
    }

    console.error("Supabase code exchange error:", error);
  }

  // Return to destination with informative param on failure
  const fallbackUrl = new URL(next.startsWith("/") ? next : "/cart", request.url);
  fallbackUrl.searchParams.set("auth_status", "callback_error");
  return NextResponse.redirect(fallbackUrl);
}
