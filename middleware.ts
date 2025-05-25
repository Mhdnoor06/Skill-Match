import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Auth routes and login page handling
  if (
    req.nextUrl.pathname.startsWith("/auth") ||
    req.nextUrl.pathname === "/login"
  ) {
    if (session) {
      // Check onboarding status for logged-in users
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", session.user.id)
        .single();

      // If onboarding is not completed, redirect to onboarding
      if (!profile?.onboarding_completed) {
        return NextResponse.redirect(new URL("/onboarding", req.url));
      }

      // If onboarding is completed, redirect to dashboard or the original destination
      const redirectTo = req.nextUrl.searchParams.get("redirectTo");
      return NextResponse.redirect(
        new URL(redirectTo || "/dashboard", req.url)
      );
    }
    return res;
  }

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/profile", "/match-discovery"];
  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (!session) {
      // If user is not signed in and tries to access protected routes, redirect to login
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirectTo", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Check if user has completed onboarding
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", session.user.id)
      .single();

    // If onboarding is not completed and trying to access protected routes (except onboarding)
    if (
      !profile?.onboarding_completed &&
      !req.nextUrl.pathname.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/onboarding", req.url));
    }

    // If onboarding is completed and trying to access onboarding page
    if (
      profile?.onboarding_completed &&
      req.nextUrl.pathname.startsWith("/onboarding")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return res;
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
