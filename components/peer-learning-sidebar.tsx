"use client"

import type React from "react"

import {
  Users,
  MessageSquare,
  User,
  Settings,
  BookOpen,
  Target,
  Calendar,
  Award,
  HelpCircle,
  Menu,
  GraduationCap,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"

export default function PeerLearningSidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  function handleNavigation() {
    setIsMobileMenuOpen(false)
  }

  function NavItem({
    href,
    icon: Icon,
    children,
    isActive = false,
  }: {
    href: string
    icon: any
    children: React.ReactNode
    isActive?: boolean
  }) {
    return (
      <Link
        href={href}
        onClick={handleNavigation}
        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
          isActive
            ? "bg-gray-100 dark:bg-[#1F1F23] text-gray-900 dark:text-white"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-[#1F1F23]"
        }`}
      >
        <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
        {children}
      </Link>
    )
  }

  return (
    <>
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-[70] p-2 rounded-lg bg-white dark:bg-[#0F0F12] shadow-md"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      </button>
      <nav
        className={`
    fixed inset-y-0 left-0 z-[70] w-64 bg-white/90 dark:bg-[#0F0F12]/90 backdrop-blur-xl transform transition-transform duration-200 ease-in-out
    lg:translate-x-0 lg:static lg:w-64 border-r border-gray-200/50 dark:border-[#1F1F23]/50
    ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <div className="h-full flex flex-col">
          <Link
            href="/dashboard"
            className="h-16 px-6 flex items-center border-b border-gray-200 dark:border-[#1F1F23]"
          >
            <div className="flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-gray-900 dark:text-white" />
              <span className="text-lg font-semibold hover:cursor-pointer text-gray-900 dark:text-white">
                SkillMatch
              </span>
            </div>
          </Link>

          <div className="flex-1 overflow-y-auto py-4 px-4">
            <div className="space-y-6">
              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Learning
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/discover" icon={Users} isActive={pathname === "/dashboard/discover"}>
                    Discover Matches
                  </NavItem>
                  <NavItem href="/dashboard/chat" icon={MessageSquare} isActive={pathname === "/dashboard/chat"}>
                    Messages
                  </NavItem>
                  <NavItem href="/dashboard/sessions" icon={Calendar}>
                    My Sessions
                  </NavItem>
                  <NavItem href="/dashboard/progress" icon={Target}>
                    Progress
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Skills
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/teaching" icon={BookOpen}>
                    Teaching
                  </NavItem>
                  <NavItem href="/dashboard/learning" icon={GraduationCap}>
                    Learning
                  </NavItem>
                  <NavItem href="/dashboard/achievements" icon={Award}>
                    Achievements
                  </NavItem>
                </div>
              </div>

              <div>
                <div className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Account
                </div>
                <div className="space-y-1">
                  <NavItem href="/dashboard/profile" icon={User} isActive={pathname === "/dashboard/profile"}>
                    Profile
                  </NavItem>
                  <NavItem href="/dashboard/settings" icon={Settings} isActive={pathname === "/dashboard/settings"}>
                    Settings
                  </NavItem>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-4 border-t border-gray-200 dark:border-[#1F1F23]">
            <div className="space-y-1">
              <NavItem href="/help" icon={HelpCircle}>
                Help & Support
              </NavItem>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}
