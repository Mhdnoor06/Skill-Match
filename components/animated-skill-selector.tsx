"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface AnimatedSkillSelectorProps {
  skills: string[]
  selectedSkills: string[]
  onSkillToggle: (skill: string) => void
  searchPlaceholder?: string
  errorMessage?: string
}

const transitionProps = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.5,
}

export function AnimatedSkillSelector({
  skills,
  selectedSkills,
  onSkillToggle,
  searchPlaceholder = "Search for skills...",
  errorMessage,
}: AnimatedSkillSelectorProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredSkills, setFilteredSkills] = useState(skills)

  useEffect(() => {
    if (searchTerm) {
      setFilteredSkills(skills.filter((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      setFilteredSkills(skills)
    }
  }, [searchTerm, skills])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {errorMessage && <p className="text-destructive text-sm">{errorMessage}</p>}

      <motion.div className="flex flex-wrap gap-2 overflow-visible" layout transition={transitionProps}>
        {filteredSkills.map((skill) => {
          const isSelected = selectedSkills.includes(skill)
          return (
            <motion.button
              key={skill}
              type="button"
              onClick={() => onSkillToggle(skill)}
              layout
              initial={false}
              animate={{
                backgroundColor: isSelected ? "hsl(var(--primary) / 0.15)" : "transparent",
              }}
              whileHover={{
                backgroundColor: isSelected ? "hsl(var(--primary) / 0.2)" : "hsl(var(--muted) / 0.7)",
              }}
              whileTap={{
                backgroundColor: isSelected ? "hsl(var(--primary) / 0.25)" : "hsl(var(--muted) / 0.9)",
              }}
              transition={{
                ...transitionProps,
                backgroundColor: { duration: 0.1 },
              }}
              className={cn(
                "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium",
                "whitespace-nowrap overflow-hidden border",
                isSelected
                  ? "text-primary border-primary/30"
                  : "text-muted-foreground border-border hover:text-foreground",
              )}
            >
              <motion.div
                className="relative flex items-center"
                animate={{
                  width: isSelected ? "auto" : "100%",
                  paddingRight: isSelected ? "1.5rem" : "0",
                }}
                transition={{
                  ease: [0.175, 0.885, 0.32, 1.275],
                  duration: 0.3,
                }}
              >
                <span>{skill}</span>
                <AnimatePresence>
                  {isSelected && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={transitionProps}
                      className="absolute right-0"
                    >
                      <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                        <Check className="w-3 h-3 text-primary-foreground" strokeWidth={2} />
                      </div>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.button>
          )
        })}
      </motion.div>

      {filteredSkills.length === 0 && (
        <p className="text-muted-foreground text-center py-4">No skills found matching your search.</p>
      )}
    </div>
  )
}
