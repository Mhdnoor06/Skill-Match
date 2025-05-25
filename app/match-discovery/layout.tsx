import type React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Skill Matches | Skill-Match",
  description:
    "Find people who can teach what you want to learn and learn what you can teach.",
};

export default function MatchDiscoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900">
      {children}
    </div>
  );
}
