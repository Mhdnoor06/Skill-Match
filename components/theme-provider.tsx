"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)

  // Make sure the theme is fully mounted before rendering children
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same structure to avoid layout shift
    return <div className="contents">{children}</div>
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
