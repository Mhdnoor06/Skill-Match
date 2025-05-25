"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { BackgroundPattern } from "@/components/background-pattern";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

function VerifyContent() {
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get("token");
        const type = searchParams.get("type");
        const redirectTo = searchParams.get("redirect_to");

        if (!token || !type) {
          throw new Error("Invalid verification link");
        }

        if (type === "signup") {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "signup",
          });

          if (error) throw error;

          setIsVerified(true);
          toast({
            title: "Email verified!",
            description: "Your email has been successfully verified.",
          });

          // Redirect to onboarding or dashboard after a short delay
          setTimeout(() => {
            router.push(redirectTo || "/onboarding");
          }, 2000);
        } else if (type === "recovery") {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: "recovery",
          });

          if (error) throw error;

          setIsVerified(true);
          toast({
            title: "Password reset verified!",
            description: "You can now set your new password.",
          });

          // Redirect to password reset page
          setTimeout(() => {
            router.push("/auth/reset-password");
          }, 2000);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Verification failed");
        toast({
          title: "Verification failed",
          description:
            err instanceof Error ? err.message : "Something went wrong",
          variant: "destructive",
        });
      } finally {
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, router, supabase.auth]);

  return (
    <div className="flex min-h-[100dvh] w-full bg-background flex-col relative overflow-hidden isolate">
      <BackgroundPattern />

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10 overflow-hidden rounded-2xl shadow-xl border border-border/40 bg-background/80 backdrop-blur-sm p-8 text-center"
        >
          {isVerifying ? (
            <div className="space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <h2 className="text-2xl font-bold">Verifying your email</h2>
              <p className="text-muted-foreground">
                Please wait while we verify your email address...
              </p>
            </div>
          ) : isVerified ? (
            <div className="space-y-4">
              <CheckCircle2 className="h-12 w-12 mx-auto text-green-500" />
              <h2 className="text-2xl font-bold">Email Verified!</h2>
              <p className="text-muted-foreground">
                Your email has been successfully verified.
              </p>
              <p className="text-sm text-muted-foreground">
                Redirecting you to the next step...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <XCircle className="h-12 w-12 mx-auto text-destructive" />
              <h2 className="text-2xl font-bold">Verification Failed</h2>
              <p className="text-muted-foreground">
                {error || "Something went wrong during verification."}
              </p>
              <Button onClick={() => router.push("/login")} className="mt-4">
                Return to Login
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default function VerifyPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[100dvh] w-full bg-background flex-col relative overflow-hidden isolate">
          <BackgroundPattern />
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-md relative z-10 overflow-hidden rounded-2xl shadow-xl border border-border/40 bg-background/80 backdrop-blur-sm p-8 text-center">
              <div className="space-y-4">
                <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
                <h2 className="text-2xl font-bold">Loading...</h2>
                <p className="text-muted-foreground">
                  Please wait while we load the verification page...
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <VerifyContent />
    </Suspense>
  );
}
