"use client"

import Link from "next/link"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function OnboardingHeader() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure theme is available on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="w-full py-4 px-6 relative z-10 border-b border-border/30 bg-background/50 backdrop-blur-sm">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="size-8 rounded-lg bg-primary flex items-center justify-center text-white">SM</div>
          <span>Skill-Match</span>
        </Link>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link
            href="/"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Link>
        </div>
      </div>
    </header>
  )
}
