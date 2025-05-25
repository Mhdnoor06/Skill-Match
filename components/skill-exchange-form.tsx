"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Bold, Calendar, Italic, List, ListOrdered, Loader2, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ProfilePictureUpload } from "@/components/profile-picture-upload"
import { AnimatedSkillSelector } from "@/components/animated-skill-selector"
import { AvailabilityScheduler, type TimeSlot } from "@/components/availability-scheduler"
import { skillCategories } from "@/lib/skills-data"
import { cn } from "@/lib/utils"

interface SkillExchangeFormProps {
  onSubmit: (formData: any) => Promise<void>
  isSubmitting: boolean
}

export function SkillExchangeForm({ onSubmit, isSubmitting }: SkillExchangeFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    profilePicture: null as string | null,
    teachingSkills: [] as string[],
    learningSkills: [] as string[],
    availability: [] as TimeSlot[],
    bio: "",
  })

  const [errors, setErrors] = useState({
    fullName: "",
    teachingSkills: "",
    learningSkills: "",
  })

  const [activeCategory, setActiveCategory] = useState("Technology")
  const [charCount, setCharCount] = useState(0)
  const maxChars = 500

  // Get all skills for the active category
  const getCategorySkills = () => {
    const category = skillCategories.find((c) => c.name === activeCategory)
    return category?.skills || []
  }

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when field is updated
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      updateFormData("bio", value)
      setCharCount(value.length)
    }
  }

  // Simple rich text formatting functions
  const applyFormatting = (format: string) => {
    const textarea = document.getElementById("bio") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `_${selectedText}_`
        break
      case "bullet":
        formattedText = selectedText
          .split("\n")
          .map((line) => `• ${line}`)
          .join("\n")
        break
      case "number":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n")
        break
      default:
        formattedText = selectedText
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
    updateFormData("bio", newValue)
    setCharCount(newValue.length)
  }

  const handleToggleTeachingSkill = (skill: string) => {
    const updatedSkills = formData.teachingSkills.includes(skill)
      ? formData.teachingSkills.filter((s) => s !== skill)
      : [...formData.teachingSkills, skill]

    updateFormData("teachingSkills", updatedSkills)
  }

  const handleToggleLearningSkill = (skill: string) => {
    const updatedSkills = formData.learningSkills.includes(skill)
      ? formData.learningSkills.filter((s) => s !== skill)
      : [...formData.learningSkills, skill]

    updateFormData("learningSkills", updatedSkills)
  }

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      teachingSkills: "",
      learningSkills: "",
    }

    let isValid = true

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your full name"
      isValid = false
    }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[1400px] mx-auto"
    >
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">Complete Your Skill Exchange Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tell us about yourself and the skills you want to teach and learn. This information will help us connect you
          with the perfect skill exchange partners.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Personal Information */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>

              <div className="flex flex-col items-center space-y-6">
                <ProfilePictureUpload
                  value={formData.profilePicture}
                  onChange={(value) => updateFormData("profilePicture", value)}
                />

                <div className="w-full space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => updateFormData("fullName", e.target.value)}
                      className={cn("pl-10", errors.fullName ? "border-destructive" : "")}
                    />
                  </div>
                  {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">About You</h2>
                <span className={`text-xs ${charCount > maxChars * 0.8 ? "text-orange-500" : "text-muted-foreground"}`}>
                  {charCount}/{maxChars}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-1 mb-2">
                  <ToggleGroup type="multiple" className="justify-start">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => applyFormatting("bold")}>
                      <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="italic"
                      aria-label="Toggle italic"
                      onClick={() => applyFormatting("italic")}
                    >
                      <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="bullet"
                      aria-label="Toggle bullet list"
                      onClick={() => applyFormatting("bullet")}
                    >
                      <List className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="number"
                      aria-label="Toggle numbered list"
                      onClick={() => applyFormatting("number")}
                    >
                      <ListOrdered className="h-4 w-4" />
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>

                <Textarea
                  id="bio"
                  placeholder="Write a brief introduction about yourself, your background, and what you hope to achieve through skill exchange... (Optional)"
                  value={formData.bio}
                  onChange={handleBioChange}
                  className="min-h-[200px] resize-y"
                />
                <p className="text-xs text-muted-foreground">
                  Use **text** for bold, _text_ for italic. This field is optional.
                </p>
              </div>
            </div>

            {/* Availability Section */}
            <div className="bg-background/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold">Your Availability</h2>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-4">
                  Set your weekly availability for teaching and learning sessions. This helps us match you with partners
                  who have compatible schedules.
                </p>

                <AvailabilityScheduler
                  value={formData.availability}
                  onChange={(value) => updateFormData("availability", value)}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Skills Exchange */}
          <div className="lg:col-span-8 bg-background/80 backdrop-blur-sm rounded-xl border border-border/40 shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-6">Skills Exchange</h2>

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

            <Tabs defaultValue="teaching" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="teaching">Skills You Can Teach</TabsTrigger>
                <TabsTrigger value="learning">Skills You Want to Learn</TabsTrigger>
              </TabsList>

              {/* Teaching Skills Tab */}
              <TabsContent value="teaching" className="space-y-4">
                <AnimatedSkillSelector
                  skills={getCategorySkills()}
                  selectedSkills={formData.teachingSkills}
                  onSkillToggle={handleToggleTeachingSkill}
                  searchPlaceholder="Search for skills you can teach..."
                  errorMessage={errors.teachingSkills}
                />
              </TabsContent>

              {/* Learning Skills Tab */}
              <TabsContent value="learning" className="space-y-4">
                <AnimatedSkillSelector
                  skills={getCategorySkills()}
                  selectedSkills={formData.learningSkills}
                  onSkillToggle={handleToggleLearningSkill}
                  searchPlaceholder="Search for skills you want to learn..."
                  errorMessage={errors.learningSkills}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button type="submit" className="rounded-full px-12 py-6 text-lg" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Complete Profile
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
