"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { ProfileCard } from "@/components/profile-card";
import { MatchCard } from "@/components/match-card";
import { Button } from "@/components/ui/button";
import { generateMatches } from "@/lib/generate-matches";
import type { User, Match } from "@/lib/types";
import Link from "next/link";

export default function MatchDiscoveryPage() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [potentialMatches, setPotentialMatches] = useState<Match[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [matchFound, setMatchFound] = useState<Match | null>(null);
  const [matchScore, setMatchScore] = useState(0);
  const [cardHeight, setCardHeight] = useState(0);
  const [matchTimer, setMatchTimer] = useState<NodeJS.Timeout | null>(null);

  // References for measuring card heights
  const profileCardRef = useRef<HTMLDivElement>(null);
  const matchCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Try to get user profile from localStorage
    try {
      const storedProfile = localStorage.getItem("userProfile");
      if (storedProfile) {
        const profile = JSON.parse(storedProfile);
        setCurrentUser(profile);

        // Auto-start matching after a short delay if coming from onboarding
        const fromOnboarding = sessionStorage.getItem("fromOnboarding");
        if (fromOnboarding === "true") {
          sessionStorage.removeItem("fromOnboarding");
          setTimeout(() => {
            startMatching();
          }, 1500);
        }
      } else {
        // Fallback to default user if no profile in localStorage
        setCurrentUser({
          id: "user-1",
          name: "Alex Morgan",
          role: "UX Designer",
          avatar:
            "/placeholder.svg?height=80&width=80&query=professional+portrait",
          learningSkills: [
            { name: "JavaScript", level: "beginner" },
            { name: "React", level: "beginner" },
            { name: "Node.js", level: "beginner" },
            { name: "TypeScript", level: "beginner" },
            { name: "GraphQL", level: "beginner" },
          ],
          teachingSkills: [
            { name: "UI Design", level: "expert" },
            { name: "User Research", level: "advanced" },
            { name: "Figma", level: "expert" },
            { name: "Wireframing", level: "advanced" },
            { name: "Prototyping", level: "expert" },
          ],
        });
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      // Set default user on error
      setCurrentUser({
        id: "user-1",
        name: "Alex Morgan",
        role: "UX Designer",
        avatar:
          "/placeholder.svg?height=80&width=80&query=professional+portrait",
        learningSkills: [
          { name: "JavaScript", level: "beginner" },
          { name: "React", level: "beginner" },
        ],
        teachingSkills: [
          { name: "UI Design", level: "expert" },
          { name: "Figma", level: "expert" },
        ],
      });
    }

    // Generate sample matches
    try {
      const matches = generateMatches();
      setPotentialMatches(matches);
    } catch (error) {
      console.error("Error generating matches:", error);
      // Set fallback matches
      setPotentialMatches([
        {
          id: "match-1",
          name: "Sarah Chen",
          role: "Frontend Developer",
          avatar: "/placeholder.svg?height=80&width=80&query=woman+developer",
          learningSkills: [{ name: "UI Design", level: "beginner" }],
          teachingSkills: [{ name: "React", level: "expert" }],
          matchScore: 85,
        },
        {
          id: "match-2",
          name: "David Kim",
          role: "Backend Developer",
          avatar: "/placeholder.svg?height=80&width=80&query=man+developer",
          learningSkills: [{ name: "Frontend", level: "intermediate" }],
          teachingSkills: [{ name: "Node.js", level: "expert" }],
          matchScore: 78,
        },
      ]);
    }
  }, []);

  // Update card height when window resizes or content changes
  useEffect(() => {
    const updateCardHeights = () => {
      if (profileCardRef.current) {
        const height = profileCardRef.current.offsetHeight;
        // Add extra padding to ensure all content is visible
        const extraPadding = window.innerWidth < 640 ? 20 : 30;
        setCardHeight(height + extraPadding);
      }
    };

    // Initial measurement and setup resize listener
    updateCardHeights();
    window.addEventListener("resize", updateCardHeights);

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCardHeights);
      if (matchTimer) {
        clearTimeout(matchTimer);
      }
    };
  }, [matchTimer, currentUser]);

  const startMatching = () => {
    setIsSearching(true);
    setMatchFound(null);

    // Simulate finding a match after some time
    const timer = setTimeout(
      () => {
        const bestMatch =
          potentialMatches[Math.floor(Math.random() * potentialMatches.length)];
        setMatchFound(bestMatch);
        setMatchScore(Math.floor(Math.random() * 30) + 70); // Random score between 70-99
        setIsSearching(false);
      },
      8000 + Math.random() * 4000 // Random time between 8-12 seconds
    );

    setMatchTimer(timer);
  };

  const cancelMatching = () => {
    if (matchTimer) {
      clearTimeout(matchTimer);
      setMatchTimer(null);
    }
    setIsSearching(false);
  };

  // Create a continuous array of cards for the animation
  const animationCards = [
    ...potentialMatches,
    ...potentialMatches,
    ...potentialMatches,
  ];

  if (!currentUser) {
    return (
      <div className="min-h-screen p-3 sm:p-8 flex items-center justify-center">
        <div className="text-center max-w-md p-6 rounded-xl bg-zinc-900/80 border border-zinc-800">
          <h1 className="text-xl sm:text-3xl font-bold text-white mb-4">
            Profile Not Found
          </h1>
          <p className="text-zinc-400 mb-6">
            We couldn't find your profile information. Please complete the
            onboarding process first.
          </p>
          <Link href="/onboarding">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Go to Onboarding
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-3 sm:p-8 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Mobile-optimized layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-8 items-start">
          {/* User's profile section */}
          <div className="flex flex-col items-center">
            <div className="mb-2 sm:mb-4 text-center">
              <h2 className="text-sm sm:text-lg font-medium text-zinc-300 mb-0.5 sm:mb-1">
                Your Profile
              </h2>
              <p className="text-xs text-zinc-500">
                This is what potential matches will see
              </p>
            </div>

            <div className="w-full max-w-sm" ref={profileCardRef}>
              <ProfileCard
                name={currentUser.name}
                role={currentUser.role}
                avatar={currentUser.avatar}
                learningSkills={currentUser.learningSkills}
                teachingSkills={currentUser.teachingSkills}
              />
            </div>
          </div>

          {/* Matching animation section */}
          <div className="flex flex-col items-center">
            <div className="mb-2 sm:mb-4 text-center">
              <h2 className="text-sm sm:text-lg font-medium text-zinc-300 mb-0.5 sm:mb-1">
                {matchFound ? "Match Found!" : "Potential Matches"}
              </h2>
              <p className="text-xs text-zinc-500">
                {matchFound
                  ? `${matchScore}% compatibility based on skills`
                  : "Finding someone with complementary skills"}
              </p>
            </div>

            <div
              className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
              style={{
                height: cardHeight > 0 ? `${cardHeight}px` : "auto",
                minHeight: "280px",
              }}
              ref={matchCardRef}
            >
              {/* Match found display */}
              {matchFound && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="absolute inset-0 z-20"
                >
                  <div className="relative h-full">
                    <MatchCard user={matchFound} />
                    <motion.div
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute top-0 right-0 -mt-2 -mr-2 sm:-mt-4 sm:-mr-4 bg-green-500 text-white rounded-full p-0.5 sm:p-1"
                    >
                      <CheckCircle2 className="w-5 h-5 sm:w-8 sm:h-8" />
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Clean, non-overlapping card animation */}
              {isSearching && (
                <div className="absolute inset-0 overflow-hidden">
                  <motion.div
                    className="flex flex-col"
                    initial={{ y: 0 }}
                    animate={{
                      y: `-${(animationCards.length - 1) * 300}px`,
                    }}
                    transition={{
                      y: {
                        duration: animationCards.length * 2,
                        ease: "linear",
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      },
                    }}
                  >
                    {animationCards.map((match, index) => (
                      <div
                        key={`card-${match.id}-${index}`}
                        style={{ height: "300px" }}
                        className="shrink-0"
                      >
                        <MatchCardSkeleton user={match} />
                      </div>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* Initial state - before searching */}
              {!isSearching && !matchFound && (
                <div className="flex items-center justify-center h-full min-h-[280px]">
                  <div className="text-center p-3 sm:p-6">
                    <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-zinc-600 mx-auto mb-2 sm:mb-4" />
                    <h3 className="text-sm sm:text-lg font-medium text-zinc-300 mb-1 sm:mb-2">
                      Ready to Find Matches?
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-500 mb-2 sm:mb-4">
                      Click the button below to start finding your perfect
                      match.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Perfect Match info - Moved below the card */}
            {matchFound && (
              <div className="w-full max-w-sm mt-3 sm:mt-4 p-2 sm:p-3 rounded-lg bg-purple-900/20 border border-purple-800/30">
                <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
                  <h3 className="text-xs sm:text-sm font-medium text-purple-300">
                    Perfect Match
                  </h3>
                </div>
                <p className="text-[10px] sm:text-xs text-purple-200/70">
                  {matchFound.name} can teach you{" "}
                  {matchFound.teachingSkills[0]?.name || "new skills"} and wants
                  to learn {matchFound.learningSkills[0]?.name || "from you"}!
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-3 sm:mt-8 flex justify-center">
              {!isSearching && !matchFound && (
                <Button
                  onClick={startMatching}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-base sm:px-6 sm:py-2"
                >
                  Start Matching
                  <ArrowRight className="ml-1 sm:ml-2 w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              )}

              {!isSearching && matchFound && (
                <div className="flex gap-2 sm:gap-4">
                  <Button
                    onClick={() => setMatchFound(null)}
                    variant="outline"
                    size="sm"
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs sm:text-sm"
                  >
                    Decline
                  </Button>
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm"
                  >
                    Connect
                  </Button>
                </div>
              )}

              {isSearching && (
                <Button
                  variant="outline"
                  size="sm"
                  className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 text-xs sm:text-sm"
                  onClick={cancelMatching}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Improved skeleton card component that matches the profile card style
function MatchCardSkeleton({ user }: { user: Match }) {
  return (
    <div className="w-full h-full p-3 sm:p-4">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl h-full">
        {/* Geometric Background Pattern - matching the profile card */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 border border-zinc-600 rotate-45 -translate-x-20 -translate-y-20"></div>
          <div className="absolute top-0 right-0 w-60 h-60 border border-zinc-600 rotate-45 translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 border border-zinc-600 rotate-45 -translate-x-10 translate-y-10"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border border-zinc-600 rotate-45 translate-x-5 translate-y-5"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-zinc-600 rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="relative px-3 sm:px-6 pt-4 sm:pt-8 pb-4 sm:pb-6 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-3 sm:mb-6">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 -m-0.5"></div>
              <div className="w-12 h-12 sm:w-[80px] sm:h-[80px] rounded-full bg-zinc-800 relative z-10 ring-2 ring-zinc-800"></div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="h-4 sm:h-6 w-24 sm:w-32 bg-zinc-800 rounded mb-1 sm:mb-2"></div>
              <div className="h-3 sm:h-4 w-16 sm:w-24 bg-zinc-800/70 rounded"></div>
            </div>
          </div>

          {/* Skills Sections - Always in a single column like the user card */}
          <div className="flex flex-col gap-3 sm:gap-4 mt-auto">
            {/* Learning Skills */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-blue-800/50"></div>
                <div className="h-3 sm:h-4 w-14 sm:w-24 bg-zinc-800 rounded"></div>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                <div className="h-4 sm:h-6 w-12 sm:w-20 bg-blue-900/20 border border-blue-800/50 rounded-md"></div>
                <div className="h-4 sm:h-6 w-10 sm:w-16 bg-blue-900/20 border border-blue-800/50 rounded-md"></div>
                <div className="h-4 sm:h-6 w-14 sm:w-18 bg-blue-900/20 border border-blue-800/50 rounded-md"></div>
              </div>
            </div>

            {/* Teaching Skills */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-emerald-800/50"></div>
                <div className="h-3 sm:h-4 w-14 sm:w-24 bg-zinc-800 rounded"></div>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                <div className="h-4 sm:h-6 w-12 sm:w-20 bg-emerald-900/20 border border-emerald-800/50 rounded-md"></div>
                <div className="h-4 sm:h-6 w-10 sm:w-16 bg-emerald-900/20 border border-emerald-800/50 rounded-md"></div>
                <div className="h-4 sm:h-6 w-14 sm:w-18 bg-emerald-900/20 border border-emerald-800/50 rounded-md"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
