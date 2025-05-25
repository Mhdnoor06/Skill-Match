"use client"
import { AvailabilityScheduler, type TimeSlot } from "@/components/availability-scheduler"

interface AvailabilityStepProps {
  formData: {
    availability: TimeSlot[]
  }
  updateFormData: (field: string, value: any) => void
}

export function AvailabilityStep({ formData, updateFormData }: AvailabilityStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Set your availability</h2>
        <p className="text-muted-foreground mt-1">
          Let others know when you're available for teaching and learning sessions
        </p>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Add time slots for when you're typically available. This helps us match you with partners who have compatible
          schedules.
        </p>

        <AvailabilityScheduler
          value={formData.availability}
          onChange={(value) => updateFormData("availability", value)}
        />
      </div>
    </div>
  )
}
