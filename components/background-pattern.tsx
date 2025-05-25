"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function BackgroundPattern() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80"></div>

      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-[80vw] h-[80vh] bg-gradient-to-r from-purple-500/20 to-violet-500/20 rounded-full blur-[120px] opacity-50 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-[70vw] h-[70vh] bg-gradient-to-l from-indigo-500/20 to-pink-500/20 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vh] bg-gradient-to-t from-purple-500/10 to-violet-400/10 rounded-full blur-[120px] opacity-30 animate-blob animation-delay-4000"></div>

      {/* Grid pattern overlay - Enhanced visibility for both themes */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

      
    </div>
  )
}
