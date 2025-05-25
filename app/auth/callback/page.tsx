"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Loader2 } from "lucide-react";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Check if we have a code parameter (code-based flow)
        const code = searchParams.get("code");
        const next = searchParams.get("next");

        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else {
          // Handle hash fragment (OAuth flow)
          const hash = window.location.hash.substring(1);
          if (!hash) {
            throw new Error("No authentication data found");
          }

          // Parse the hash fragment
          const params = new URLSearchParams(hash);
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");
          const expiresIn = params.get("expires_in");
          const tokenType = params.get("token_type");

          if (!accessToken || !refreshToken) {
            throw new Error("Missing tokens in hash fragment");
          }

          // Set the session using the tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (error) throw error;
        }

        // After successful authentication, check onboarding status
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) throw new Error("No user found after authentication");

        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("onboarding_completed")
          .eq("id", user.id)
          .single();

        if (profileError) throw profileError;

        // Determine where to redirect
        let redirectPath = "/dashboard";

        // If there's a specific next parameter and onboarding is completed, use it
        if (next && profile?.onboarding_completed) {
          redirectPath = next;
        }
        // If onboarding is not completed, redirect to onboarding
        else if (!profile?.onboarding_completed) {
          redirectPath = "/onboarding";
        }

        router.push(redirectPath);
      } catch (error) {
        console.error("Error during authentication:", error);
        router.push("/login?error=Authentication failed");
      }
    };

    handleCallback();
  }, [router, searchParams, supabase.auth]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
}
