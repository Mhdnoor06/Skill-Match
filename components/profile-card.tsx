"use client"

import { useState } from "react"
import { BookOpen, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { Skill } from "@/lib/types"

interface ProfileCardProps {
  name: string
  role: string
  avatar: string
  learningSkills: Skill[]
  teachingSkills: Skill[]
}

export function ProfileCard({ name, role, avatar, learningSkills, teachingSkills }: ProfileCardProps) {
  const [showAllLearning, setShowAllLearning] = useState(false)
  const [showAllTeaching, setShowAllTeaching] = useState(false)

  const SKILL_THRESHOLD = 5
  const learningSkillsExceedThreshold = learningSkills.length > SKILL_THRESHOLD
  const teachingSkillsExceedThreshold = teachingSkills.length > SKILL_THRESHOLD

  const visibleLearningSkills = showAllLearning ? learningSkills : learningSkills.slice(0, SKILL_THRESHOLD)
  const visibleTeachingSkills = showAllTeaching ? teachingSkills : teachingSkills.slice(0, SKILL_THRESHOLD)

  const getLevelColor = (level?: Skill["level"]) => {
    // For learning skills, we might not have a level
    if (!level && level !== undefined) {
      return "bg-blue-900/20 text-blue-300 border-blue-800/50" // Default for learning skills
    }

    switch (level) {
      case "beginner":
        return "bg-blue-900/20 text-blue-300 border-blue-800/50"
      case "intermediate":
        return "bg-purple-900/20 text-purple-300 border-purple-800/50"
      case "advanced":
        return "bg-amber-900/20 text-amber-300 border-amber-800/50"
      case "expert":
        return "bg-emerald-900/20 text-emerald-300 border-emerald-800/50"
      default:
        return "bg-zinc-800/50 text-zinc-300 border-zinc-700"
    }
  }

  return (
    <div className="w-full">
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-xl min-h-[200px] max-h-[600px]">
        {/* Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-40 h-40 border border-zinc-600 rotate-45 -translate-x-20 -translate-y-20"></div>
          <div className="absolute top-0 right-0 w-60 h-60 border border-zinc-600 rotate-45 translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 border border-zinc-600 rotate-45 -translate-x-10 translate-y-10"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border border-zinc-600 rotate-45 translate-x-5 translate-y-5"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 border border-zinc-600 rotate-45 -translate-x-1/2 -translate-y-1/2"></div>
        </div>

        {/* Mobile-optimized layout */}
        <div className="relative px-3 sm:px-6 pt-4 sm:pt-8 pb-4 sm:pb-6">
          <div className="flex items-center gap-3 mb-3 sm:mb-6">
            <div className="relative shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 -m-0.5"></div>
              <Image
                src={avatar || "/placeholder.svg"}
                alt={name}
                width={80}
                height={80}
                className="rounded-full ring-2 ring-zinc-800 object-cover relative z-10 w-12 h-12 sm:w-[80px] sm:h-[80px]"
              />
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <h2 className="text-base sm:text-xl font-semibold text-zinc-100">{name}</h2>
              <p className="text-xs sm:text-base text-zinc-400">{role}</p>
            </div>
          </div>

          {/* Skills Sections - Always in a single column */}
          <div className="space-y-3 sm:space-y-4">
            {/* Learning Skills */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-100">
                <BookOpen className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-blue-400" />
                <h3 className="text-xs sm:text-base font-medium">Wants to Learn</h3>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {visibleLearningSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 rounded-md border ${getLevelColor(skill.level)}`}
                  >
                    {skill.name}
                  </span>
                ))}

                {learningSkillsExceedThreshold && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 rounded-md border bg-zinc-800/50 text-zinc-300 border-zinc-700 flex items-center gap-1">
                        {showAllLearning ? (
                          <>
                            <ChevronUp className="w-3 h-3" />
                            <span>Show Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            <span>+{learningSkills.length - SKILL_THRESHOLD} More</span>
                          </>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2 bg-zinc-800 border-zinc-700">
                      <div className="flex flex-col gap-1">
                        {learningSkills.slice(SKILL_THRESHOLD).map((skill) => (
                          <span
                            key={skill.name}
                            className={`text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 rounded-md border ${getLevelColor(skill.level)}`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>

            {/* Teaching Skills */}
            <div className="space-y-1.5 sm:space-y-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-100">
                <GraduationCap className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-400" />
                <h3 className="text-xs sm:text-base font-medium">Can Teach</h3>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {visibleTeachingSkills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 rounded-md border ${getLevelColor(skill.level)}`}
                  >
                    {skill.name}
                  </span>
                ))}

                {teachingSkillsExceedThreshold && (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 rounded-md border bg-zinc-800/50 text-zinc-300 border-zinc-700 flex items-center gap-1">
                        {showAllTeaching ? (
                          <>
                            <ChevronUp className="w-3 h-3" />
                            <span>Show Less</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3 h-3" />
                            <span>+{teachingSkills.length - SKILL_THRESHOLD} More</span>
                          </>
                        )}
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-2 bg-zinc-800 border-zinc-700">
                      <div className="flex flex-col gap-1">
                        {teachingSkills.slice(SKILL_THRESHOLD).map((skill) => (
                          <span
                            key={skill.name}
                            className={`text-[10px] sm:text-xs px-1.5 sm:px-2.5 py-0.5 rounded-md border ${getLevelColor(skill.level)}`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
