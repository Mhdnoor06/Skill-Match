"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Check, Loader2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface FinishStepProps {
  formData: {
    fullName: string
    teachingSkills: string[]
    learningSkills: string[]
    bio: string
  }
  onSubmit: () => Promise<void>
  onBack: () => void
}

export function FinishStep({ formData, onSubmit, onBack }: FinishStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await onSubmit()
    } catch (error) {
      console.error("Error submitting form:", error)
      setIsSubmitting(false)
    }
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

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Review your profile</h2>
          <p className="text-muted-foreground mt-1">
            Please review your information before completing your profile setup.
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Full Name</h3>
                <p className="text-lg font-medium">{formData.fullName}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Skills You Can Teach</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.teachingSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Skills You Want to Learn</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.learningSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {formData.bio && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">About You</h3>
                  <div className="mt-2 text-sm" dangerouslySetInnerHTML={{ __html: formatBio(formData.bio) }} />
                </div>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={onBack} className="rounded-full" disabled={isSubmitting}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={handleSubmit} className="rounded-full" disabled={isSubmitting}>
              {isSubmitting ? (
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
      </div>
    </motion.div>
  )
}
