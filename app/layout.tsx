import type React from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/lib/auth/auth-context";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Skill-Match - Community Skill Sharing Platform",
  description:
    "Connect with people who want to learn what you know, and teach what you want to learn. A free community-driven skill sharing platform.",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
          :root {
            --primary: 263 70% 50%;
            --primary-foreground: 0 0% 100%;
            --ring: 263 70% 50%;
          }
          .dark {
            --primary: 263 70% 60%;
            --primary-foreground: 0 0% 100%;
            --ring: 263 70% 60%;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
