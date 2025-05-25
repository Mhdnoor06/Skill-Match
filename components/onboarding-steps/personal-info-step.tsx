"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProfilePictureUpload } from "@/components/profile-picture-upload"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface PersonalInfoStepProps {
  formData: {
    fullName: string
    profilePicture: string | null
  }
  updateFormData: (field: string, value: any) => void
  onNext?: () => void
}

export function PersonalInfoStep({ formData, updateFormData, onNext }: PersonalInfoStepProps) {
  const [error, setError] = useState("")
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    // Validate when component mounts if there's already data
    if (formData.fullName) {
      validateName(formData.fullName)
    }
  }, [formData.fullName])

  const validateName = (name: string) => {
    if (!name.trim()) {
      setError("Full name is required")
      return false
    } else {
      setError("")
      return true
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    updateFormData("fullName", value)
    if (touched) {
      validateName(value)
    }
  }

  const handleBlur = () => {
    setTouched(true)
    validateName(formData.fullName)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateName(formData.fullName) && onNext) {
      onNext()
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Tell us about yourself</h2>
        <p className="text-muted-foreground mt-1">Let's start with your name and a profile picture</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-8">
        <ProfilePictureUpload
          value={formData.profilePicture}
          onChange={(value) => updateFormData("profilePicture", value)}
        />

        <div className="w-full max-w-md space-y-2">
          <Label htmlFor="fullName" className="flex items-center justify-between">
            <span>Full Name</span>
            <span className="text-xs text-destructive">*Required</span>
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleNameChange}
              onBlur={handleBlur}
              className={cn("pl-10", error ? "border-destructive" : "")}
            />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
        </div>

        {onNext && (
          <Button type="submit" className="rounded-full mt-4">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </form>
    </div>
  )
}
