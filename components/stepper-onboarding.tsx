"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { TimeSlot } from "@/components/availability-scheduler"
import type { SocialMediaLink } from "@/components/social-media-links"
import type { Skill } from "@/lib/types"
import { toast } from "@/components/ui/use-toast"

// Step components
import { PersonalInfoStep } from "@/components/onboarding-steps/personal-info-step"
import { SkillsStep } from "@/components/onboarding-steps/skills-step"
import { AvailabilityStep } from "@/components/onboarding-steps/availability-step"
import { BioStep } from "@/components/onboarding-steps/bio-step"
import { ReviewStep } from "@/components/onboarding-steps/review-step"
import { SocialMediaStep } from "@/components/onboarding-steps/social-media-step"

// Import the new ResponsiveStepper component
import { ResponsiveStepper } from "@/components/responsive-stepper"
import { useRouter } from "next/navigation"

interface StepperOnboardingProps {
  onSubmit: (formData: any) => Promise<void>
  isSubmitting: boolean
}

const steps = [
  { id: "personal", title: "Personal Info" },
  { id: "social", title: "Social Media" },
  { id: "skills", title: "Skills" },
  { id: "availability", title: "Availability" },
  { id: "bio", title: "About You" },
  { id: "review", title: "Review" },
]

export function StepperOnboarding({ onSubmit, isSubmitting }: StepperOnboardingProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: "",
    role: "Skill Exchange Member",
    profilePicture: null as string | null,
    socialLinks: [] as SocialMediaLink[],
    teachingSkills: [] as Skill[],
    learningSkills: [] as Skill[],
    availability: [] as TimeSlot[],
    bio: "",
  })

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const nextStep = () => {
    // Validate current step before proceeding
    if (!validateCurrentStep()) {
      return
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const showValidationError = (message: string) => {
    toast({
      title: "Validation Error",
      description: message,
      variant: "destructive",
      duration: 3000,
    })
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Personal Info
        if (!formData.fullName.trim()) {
          showValidationError("Please enter your full name")
          return false
        }
        return true
      case 1: // Social Media
        // Social media is optional
        return true
      case 2: // Skills
        if (formData.teachingSkills.length === 0) {
          showValidationError("Please select at least one skill you can teach")
          return false
        }
        if (formData.learningSkills.length === 0) {
          showValidationError("Please select at least one skill you want to learn")
          return false
        }
        return true
      case 3: // Availability
        // Availability is optional
        return true
      case 4: // Bio
        // Bio is optional
        return true
      case 5: // Review
        return true
      default:
        return true
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    try {
      // Call the parent component's onSubmit function
      await onSubmit(formData)
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress Indicator */}
      <ResponsiveStepper steps={steps} currentStep={currentStep} />

      {/* Step Content */}
      <Card className="border border-border/40 shadow-lg bg-background/80 backdrop-blur-sm p-6 md:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {currentStep === 0 && (
              <PersonalInfoStep formData={formData} updateFormData={updateFormData} onNext={nextStep} />
            )}
            {currentStep === 1 && <SocialMediaStep formData={formData} updateFormData={updateFormData} />}
            {currentStep === 2 && <SkillsStep formData={formData} updateFormData={updateFormData} />}
            {currentStep === 3 && <AvailabilityStep formData={formData} updateFormData={updateFormData} />}
            {currentStep === 4 && <BioStep formData={formData} updateFormData={updateFormData} />}
            {currentStep === 5 && (
              <ReviewStep formData={formData} isSubmitting={isSubmitting} onSubmit={handleSubmit} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0 || isSubmitting}
            className="rounded-full"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>

          {currentStep < steps.length - 1 ? (
            currentStep === 0 ? null : (
              <Button type="button" onClick={nextStep} className="rounded-full">
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            )
          ) : (
            <Button type="button" onClick={handleSubmit} className="rounded-full" disabled={isSubmitting}>
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
          )}
        </div>
      </Card>
    </div>
  )
}
