"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  title: string
}

interface ResponsiveStepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function ResponsiveStepper({ steps, currentStep, className }: ResponsiveStepperProps) {
  return (
    <div className={cn("mb-8 overflow-x-auto pb-2", className)}>
      {/* Desktop Stepper (md and up) */}
      <div className="hidden md:flex items-center justify-between min-w-max">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  index < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground/50",
                )}
              >
                {index < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] w-16 transition-colors",
                    index < currentStep ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium text-center w-full max-w-[80px]",
                index === currentStep ? "text-primary" : "text-muted-foreground",
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile Stepper (sm and down) */}
      <div className="flex md:hidden items-center justify-between min-w-max">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div className="flex items-center">
              <div
                className={cn(
                  "relative flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors",
                  index < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : index === currentStep
                      ? "border-primary text-primary"
                      : "border-muted-foreground/30 text-muted-foreground/50",
                )}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-[2px] w-6 transition-colors",
                    index < currentStep ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-[10px] font-medium text-center w-full max-w-[60px]",
                index === currentStep ? "text-primary" : "text-muted-foreground",
              )}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
