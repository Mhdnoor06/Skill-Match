"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AnimatedSkillSelector } from "@/components/animated-skill-selector"
import { skillCategories } from "@/lib/skills-data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import type { Skill } from "@/lib/types"

interface SkillsStepProps {
  formData: {
    teachingSkills: Skill[]
    learningSkills: Skill[]
  }
  updateFormData: (field: string, value: any) => void
}

export function SkillsStep({ formData, updateFormData }: SkillsStepProps) {
  const [activeCategory, setActiveCategory] = useState("Technology")
  const [errors, setErrors] = useState({
    teachingSkills: "",
    learningSkills: "",
  })
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [selectedLevel, setSelectedLevel] = useState<Skill["level"]>("intermediate")
  const [activeTab, setActiveTab] = useState<"teaching" | "learning">("teaching")

  // Get all skills for the active category
  const getCategorySkills = () => {
    const category = skillCategories.find((c) => c.name === activeCategory)
    return category?.skills || []
  }

  const validateSkills = () => {
    const newErrors = {
      teachingSkills: "",
      learningSkills: "",
    }

    let isValid = true

    if (formData.teachingSkills.length === 0) {
      newErrors.teachingSkills = "Please select at least one skill you can teach"
      isValid = false
    }

    if (formData.learningSkills.length === 0) {
      newErrors.learningSkills = "Please select at least one skill you want to learn"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  useEffect(() => {
    if (formData.teachingSkills.length > 0 || formData.learningSkills.length > 0) {
      validateSkills()
    }
  }, [])

  const handleToggleTeachingSkill = (skillName: string) => {
    const existingSkill = formData.teachingSkills.find((s) => s.name === skillName)

    if (existingSkill) {
      // Remove skill
      const updatedSkills = formData.teachingSkills.filter((s) => s.name !== skillName)
      updateFormData("teachingSkills", updatedSkills)

      // Show error if no skills left
      if (updatedSkills.length === 0) {
        setErrors((prev) => ({ ...prev, teachingSkills: "Please select at least one skill you can teach" }))
      }
    } else {
      // Add skill with level
      setSelectedSkill(skillName)
      // Clear error when adding a skill
      setErrors((prev) => ({ ...prev, teachingSkills: "" }))
    }
  }

  const handleToggleLearningSkill = (skillName: string) => {
    const existingSkill = formData.learningSkills.find((s) => s.name === skillName)

    if (existingSkill) {
      // Remove skill
      const updatedSkills = formData.learningSkills.filter((s) => s.name !== skillName)
      updateFormData("learningSkills", updatedSkills)

      // Show error if no skills left
      if (updatedSkills.length === 0) {
        setErrors((prev) => ({ ...prev, learningSkills: "Please select at least one skill you want to learn" }))
      }
    } else {
      // Add skill directly without level selection
      const newSkill: Skill = {
        name: skillName,
        level: "beginner", // Default to beginner for learning skills
      }
      updateFormData("learningSkills", [...formData.learningSkills, newSkill])
      // Clear error when adding a skill
      setErrors((prev) => ({ ...prev, learningSkills: "" }))
    }
  }

  const addSkillWithLevel = () => {
    if (!selectedSkill) return

    const newSkill: Skill = {
      name: selectedSkill,
      level: selectedLevel,
    }

    if (activeTab === "teaching") {
      updateFormData("teachingSkills", [...formData.teachingSkills, newSkill])
      setSelectedSkill(null)
    }
  }

  const getSelectedSkills = (type: "teaching" | "learning") => {
    return type === "teaching" ? formData.teachingSkills.map((s) => s.name) : formData.learningSkills.map((s) => s.name)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Select your skills</h2>
        <p className="text-muted-foreground mt-1">Choose skills you can teach and skills you want to learn</p>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Select a category</h3>
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex space-x-2">
            {skillCategories.map((category) => (
              <Button
                key={category.name}
                type="button"
                variant={activeCategory === category.name ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.name)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <Tabs
        defaultValue="teaching"
        className="w-full"
        onValueChange={(value) => setActiveTab(value as "teaching" | "learning")}
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="teaching">Skills You Can Teach</TabsTrigger>
          <TabsTrigger value="learning">Skills You Want to Learn</TabsTrigger>
        </TabsList>

        {/* Teaching Skills Tab */}
        <TabsContent value="teaching" className="space-y-4">
          <AnimatedSkillSelector
            skills={getCategorySkills()}
            selectedSkills={getSelectedSkills("teaching")}
            onSkillToggle={handleToggleTeachingSkill}
            searchPlaceholder="Search for skills you can teach..."
            errorMessage={errors.teachingSkills}
          />

          {selectedSkill && activeTab === "teaching" && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/20">
              <h4 className="text-sm font-medium mb-3">Set your proficiency level for: {selectedSkill}</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skill-level">Proficiency Level</Label>
                  <Select value={selectedLevel} onValueChange={(value) => setSelectedLevel(value as Skill["level"])}>
                    <SelectTrigger id="skill-level">
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={addSkillWithLevel} size="sm">
                    Add Skill
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">Selected: {formData.teachingSkills.length} skills</p>
            {errors.teachingSkills && <p className="text-red-500 text-sm">{errors.teachingSkills}</p>}
          </div>
        </TabsContent>

        {/* Learning Skills Tab */}
        <TabsContent value="learning" className="space-y-4">
          <AnimatedSkillSelector
            skills={getCategorySkills()}
            selectedSkills={getSelectedSkills("learning")}
            onSkillToggle={handleToggleLearningSkill}
            searchPlaceholder="Search for skills you want to learn..."
            errorMessage={errors.learningSkills}
          />

          {/* Remove the selectedSkill UI for learning tab */}

          <div className="pt-2">
            <p className="text-sm text-muted-foreground">Selected: {formData.learningSkills.length} skills</p>
            {errors.learningSkills && <p className="text-red-500 text-sm">{errors.learningSkills}</p>}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
