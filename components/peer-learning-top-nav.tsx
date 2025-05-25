"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Bell, ChevronRight } from "lucide-react";
import PeerLearningProfile from "@/components/peer-learning-profile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function PeerLearningTopNav() {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/dashboard/discover":
        return "Discover Matches";
      case "/dashboard/chat":
        return "Messages";
      case "/dashboard/profile":
        return "Profile";
      case "/dashboard/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "SkillMatch", href: "/dashboard" },
    { label: getPageTitle().toLowerCase() },
  ];

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] border-b border-gray-200 dark:border-[#1F1F23] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">
                {item.label}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto sm:ml-0">
        <button
          type="button"
          className="relative p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src="/placeholder.svg?height=32&width=32&text=User"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <PeerLearningProfile />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
