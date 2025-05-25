"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Mail, Lock, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex min-h-screen w-full bg-background items-center justify-center relative overflow-hidden">
      {/* Hero Section Background - Copied from home page */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-[80vw] h-[80vh] bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-[120px] opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[70vw] h-[70vh] bg-gradient-to-l from-indigo-500/20 to-pink-500/20 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-gradient-to-t from-purple-500/10 to-violet-400/10 rounded-full blur-[120px] opacity-30 animate-blob animation-delay-4000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>

      {/* Centered Auth Form */}
      <div className="w-full max-w-md relative z-10 p-8">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-2xl mb-8 justify-center">
          <div className="size-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white">
            SM
          </div>
          <span>Skill-Match</span>
        </div>

        {/* Card container with glass effect */}
        <div className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border/40">
          {/* Toggle Switch */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative bg-muted rounded-full p-1 flex w-full h-12">
              <button
                className={cn(
                  "relative rounded-full flex-1 flex items-center justify-center text-sm font-medium transition-all duration-300 z-10",
                  isLogin ? "text-white" : "text-muted-foreground",
                )}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={cn(
                  "relative rounded-full flex-1 flex items-center justify-center text-sm font-medium transition-all duration-300 z-10",
                  !isLogin ? "text-white" : "text-muted-foreground",
                )}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
              <motion.div
                className="absolute top-1 left-1 bottom-1 rounded-full bg-primary shadow-lg"
                initial={{ width: "calc(50% - 2px)" }}
                animate={{
                  x: isLogin ? "0%" : "100%",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ width: "calc(50% - 2px)" }}
              />
            </div>
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
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Welcome back</h2>
                  <p className="text-muted-foreground text-sm">Enter your credentials to access your account</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email" placeholder="m@example.com" type="email" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-sm text-primary hover:text-primary/90">
                        Forgot?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password" type="password" className="pl-10" />
                    </div>
                  </div>
                  <Button className="w-full rounded-full text-white">
                    Login
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative bg-background px-4 text-sm text-muted-foreground">Or continue with</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="rounded-full">
                    Google
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    GitHub
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <button onClick={toggleForm} className="text-primary hover:text-primary/90">
                    Sign up
                  </button>
                </p>
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
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Create an account</h2>
                  <p className="text-muted-foreground text-sm">Enter your information to get started</p>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="name" placeholder="John Doe" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email-signup">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="email-signup" placeholder="m@example.com" type="email" className="pl-10" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password-signup">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="password-signup" type="password" className="pl-10" />
                    </div>
                  </div>
                  <Button className="w-full rounded-full text-white">
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t"></div>
                  </div>
                  <div className="relative bg-background px-4 text-sm text-muted-foreground">Or continue with</div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="rounded-full">
                    Google
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    GitHub
                  </Button>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <button onClick={toggleForm} className="text-primary hover:text-primary/90">
                    Login
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Back to home link */}
        <div className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
