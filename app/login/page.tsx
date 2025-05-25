"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Mail,
  Lock,
  User,
  ArrowLeft,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { BackgroundPattern } from "@/components/background-pattern";
import { toast } from "@/components/ui/use-toast";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure animations and theme are properly applied
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      const { error } = isLogin
        ? await signIn(data.email, data.password)
        : await signUp(data.email, data.password);

      if (error) throw error;

      toast({
        title: isLogin ? "Welcome back!" : "Account created!",
        description: isLogin
          ? "You have successfully signed in."
          : "Please check your email to verify your account.",
      });

      if (isLogin) {
        // The middleware will handle the redirect based on onboarding status
        router.push(redirectTo);
      } else {
        setIsLogin(true);
        toast({
          title: "Verification email sent",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] w-full bg-background flex-col relative overflow-hidden isolate">
      <BackgroundPattern />

      {/* Header with branding */}
      <header className="w-full py-4 px-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">
              SM
            </div>
            <span>Skill-Match</span>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[18px]" />
            ) : (
              <Moon className="size-[18px]" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        {/* Card container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md relative z-10 overflow-hidden rounded-2xl shadow-xl border border-border/40 bg-background/80 backdrop-blur-sm p-8"
        >
          {/* Pill-shaped toggle bar */}
          <div className="relative bg-muted/70 rounded-full p-1.5 flex w-full mb-8">
            <button
              onClick={() => setIsLogin(true)}
              className={cn(
                "relative rounded-full py-2.5 flex-1 flex items-center justify-center text-sm font-medium transition-all duration-300 z-10",
                isLogin
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={cn(
                "relative rounded-full py-2.5 flex-1 flex items-center justify-center text-sm font-medium transition-all duration-300 z-10",
                !isLogin
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Sign Up
            </button>
            <motion.div
              className="absolute top-1.5 left-1.5 bottom-1.5 rounded-full bg-primary shadow-lg"
              initial={{ width: "calc(50% - 3px)" }}
              animate={{
                x: isLogin ? "0%" : "100%",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ width: "calc(50% - 3px)" }}
            />
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Welcome back</h2>
                  <p className="text-muted-foreground text-sm">
                    Enter your credentials to access your account
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-9"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="#"
                        className="text-sm text-primary hover:text-primary/90"
                      >
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-9"
                        {...register("password")}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="remember" className="text-sm font-normal">
                      Remember me for 30 days
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Sign in to account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative bg-background px-4 text-sm text-muted-foreground">
                    Or continue with
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Create account</h2>
                  <p className="text-muted-foreground text-sm">
                    Enter your information to get started
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="pl-9"
                        {...register("email")}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        className="pl-9"
                        {...register("password")}
                      />
                    </div>
                    {errors.password && (
                      <p className="text-sm text-destructive">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor="terms" className="text-sm font-normal">
                      I agree to the{" "}
                      <Link
                        href="#"
                        className="text-primary hover:text-primary/90"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="#"
                        className="text-primary hover:text-primary/90"
                      >
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full rounded-full text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative bg-background px-4 text-sm text-muted-foreground">
                    Or continue with
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to home link */}
          <div className="text-center pt-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
