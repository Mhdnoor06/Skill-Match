// lib/supabaseServer.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    {
      cookies: {
        get(key) {
          return cookieStore.get(key)?.value;
        },
        set(key, value, options) {
          cookieStore.set(key, value, options);
        },
        remove(key, options) {
          cookieStore.set(key, "", { ...options, maxAge: 0 });
        },
      },
    }
  );
};
