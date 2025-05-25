"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ArrowLeft, ArrowRight, Check, ChevronsUpDown, X } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { skillCategories } from "@/lib/skills-data"

interface TeachingSkillsStepProps {
  formData: {
    teachingSkills: string[]
  }
  updateFormData: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export function TeachingSkillsStep({ formData, updateFormData, onNext, onBack }: TeachingSkillsStepProps) {
  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState("")
  const [error, setError] = useState("")

  const handleSelect = (skill: string) => {
    if (formData.teachingSkills.includes(skill)) {
      updateFormData(
        "teachingSkills",
        formData.teachingSkills.filter((s) => s !== skill),
      )
    } else {
      updateFormData("teachingSkills", [...formData.teachingSkills, skill])
    }
    setError("")
  }

  const handleRemoveSkill = (skill: string) => {
    updateFormData(
      "teachingSkills",
      formData.teachingSkills.filter((s) => s !== skill),
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.teachingSkills.length === 0) {
      setError("Please select at least one skill you can teach")
      return
    }

    onNext()
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">What skills can you teach?</h2>
          <p className="text-muted-foreground mt-1">
            Select skills you're proficient in and would be willing to teach others.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between h-auto min-h-10 py-2"
                >
                  <span className="truncate">
                    {formData.teachingSkills.length > 0
                      ? `${formData.teachingSkills.length} skill${formData.teachingSkills.length > 1 ? "s" : ""} selected`
                      : "Select skills..."}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command className="max-h-[300px]">
                  <CommandInput placeholder="Search skills..." value={searchValue} onValueChange={setSearchValue} />
                  <CommandList>
                    <CommandEmpty>No skills found.</CommandEmpty>
                    {skillCategories.map((category) => (
                      <CommandGroup key={category.name} heading={category.name}>
                        {category.skills
                          .filter((skill) => skill.toLowerCase().includes(searchValue.toLowerCase()))
                          .map((skill) => (
                            <CommandItem key={skill} value={skill} onSelect={() => handleSelect(skill)}>
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.teachingSkills.includes(skill) ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {skill}
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    ))}
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            {error && <p className="text-destructive text-sm">{error}</p>}

            {formData.teachingSkills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {formData.teachingSkills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1.5">
                    {skill}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1"
                      onClick={() => handleRemoveSkill(skill)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {skill}</span>
                    </Button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack} className="rounded-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button type="submit" className="rounded-full">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
