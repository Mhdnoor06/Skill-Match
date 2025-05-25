"use client"

import type React from "react"

import { Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { TimeSlot } from "@/components/availability-scheduler"
import type { SocialMediaLink } from "@/components/social-media-links"
import { SocialMediaIcon } from "@/components/social-media-icon"
import Image from "next/image"
import { useState } from "react"
import type { Skill } from "@/lib/types"

interface ReviewStepProps {
  formData: {
    fullName: string
    profilePicture: string | null
    socialLinks: SocialMediaLink[]
    teachingSkills: Skill[]
    learningSkills: Skill[]
    availability: TimeSlot[]
    bio: string
  }
  isSubmitting: boolean
  onSubmit: () => Promise<void>
}

export function ReviewStep({ formData, isSubmitting, onSubmit }: ReviewStepProps) {
  const [isSubmittingState, setIsSubmitting] = useState(isSubmitting)
  // Format days of week
  const formatDays = (days: string[]) => {
    const dayMap: Record<string, string> = {
      monday: "Mon",
      tuesday: "Tue",
      wednesday: "Wed",
      thursday: "Thu",
      friday: "Fri",
      saturday: "Sat",
      sunday: "Sun",
    }
    return days.map((day) => dayMap[day] || day).join(", ")
  }

  // Format time range
  const formatTimeRange = (startTime: string, endTime: string) => {
    return `${startTime} - ${endTime}`
  }

  // Get platform name
  const getPlatformName = (platformId: string) => {
    const platforms: Record<string, string> = {
      linkedin: "LinkedIn",
      github: "GitHub",
      twitter: "Twitter",
      instagram: "Instagram",
      facebook: "Facebook",
      youtube: "YouTube",
      medium: "Medium",
      dribbble: "Dribbble",
      behance: "Behance",
      website: "Personal Website",
    }
    return platforms[platformId] || platformId
  }

  // Simple markdown-like formatting for the bio
  const formatBio = (text: string) => {
    if (!text) return ""

    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/_(.*?)_/g, "<em>$1</em>")
      .replace(/^• (.*)$/gm, "<li>$1</li>")
      .replace(/^(\d+)\. (.*)$/gm, "<li>$2</li>")
      .split("\n")
      .join("<br />")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Set a flag in sessionStorage to indicate we're coming from onboarding
      sessionStorage.setItem("fromOnboarding", "true")

      await onSubmit()
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Review your profile</h2>
        <p className="text-muted-foreground mt-1">Please review your information before completing your profile</p>
      </div>

      <div className="space-y-6">
        {/* Personal Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg bg-muted/20">
          {formData.profilePicture ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden">
              <Image
                src={formData.profilePicture || "/placeholder.svg"}
                alt="Profile"
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-2xl font-semibold">
              {formData.fullName.charAt(0)}
            </div>
          )}
          <div className="flex-1">
            <h3 className="text-xl font-semibold">{formData.fullName}</h3>

            {/* Social Media Links */}
            {formData.socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    title={getPlatformName(link.platform)}
                  >
                    <SocialMediaIcon platform={link.platform} />
                    <span className="sr-only">{getPlatformName(link.platform)}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Skills You Can Teach</h4>
              <div className="flex flex-wrap gap-2">
                {formData.teachingSkills.map((skill) => (
                  <Badge key={skill.name} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Skills You Want to Learn</h4>
              <div className="flex flex-wrap gap-2">
                {formData.learningSkills.map((skill) => (
                  <Badge key={skill.name} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Availability */}
        {formData.availability.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">Your Availability</h4>
              <div className="space-y-2">
                {formData.availability.map((slot) => (
                  <div key={slot.id} className="text-sm p-2 border rounded flex justify-between bg-muted/20">
                    <span>{formatDays(slot.days)}</span>
                    <span>{formatTimeRange(slot.startTime, slot.endTime)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Bio */}
        {formData.bio && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">About You</h4>
              <div
                className="text-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: formatBio(formData.bio) }}
              />
            </CardContent>
          </Card>
        )}

        <Button onClick={handleSubmit} className="w-full rounded-full mt-4" disabled={isSubmittingState}>
          {isSubmittingState ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              Complete Profile
              <Check className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
