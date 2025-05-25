import type React from "react"
import { BackgroundPattern } from "@/components/background-pattern"
import PeerLearningSidebar from "@/components/peer-learning-sidebar"
import PeerLearningTopNav from "@/components/peer-learning-top-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen relative">
      {/* Add the geometrical background */}
      <BackgroundPattern />

      <PeerLearningSidebar />
      <div className="w-full flex flex-1 flex-col relative z-10">
        <header className="h-16 border-b border-gray-200 dark:border-[#1F1F23] bg-white/80 dark:bg-[#0F0F12]/80 backdrop-blur-sm">
          <PeerLearningTopNav />
        </header>
        <main className="flex-1 overflow-auto p-6 bg-transparent">{children}</main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0F0F12]/90 backdrop-blur-sm border-t border-gray-200 dark:border-[#1F1F23]">
        <div className="flex items-center justify-around py-2 px-4">
          {/* Navigation items will be handled by the sidebar component */}
        </div>
      </nav>
    </div>
  )
}
