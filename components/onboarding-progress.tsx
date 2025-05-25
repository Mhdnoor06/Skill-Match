import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  name: string
  description: string
}

interface OnboardingProgressProps {
  steps: Step[]
  currentStep: number
}

export function OnboardingProgress({ steps, currentStep }: OnboardingProgressProps) {
  return (
    <div className="hidden md:block">
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, index) => (
            <li key={step.name} className={cn("relative flex-1", index !== steps.length - 1 ? "pr-8" : "")}>
              {index < currentStep ? (
                <div className="group">
                  <span className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                      <Check className="h-5 w-5 text-white" aria-hidden="true" />
                      <span className="sr-only">{step.name}</span>
                    </span>
                    <span className="ml-3 text-sm font-medium text-foreground">{step.name}</span>
                  </span>
                  <span className="absolute -bottom-6 left-0 text-xs text-muted-foreground">{step.description}</span>
                </div>
              ) : index === currentStep ? (
                <div className="group" aria-current="step">
                  <span className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background">
                      <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                      <span className="sr-only">{step.name}</span>
                    </span>
                    <span className="ml-3 text-sm font-medium text-primary">{step.name}</span>
                  </span>
                  <span className="absolute -bottom-6 left-0 text-xs text-muted-foreground">{step.description}</span>
                </div>
              ) : (
                <div className="group">
                  <span className="flex items-center">
                    <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background">
                      <span className="h-2.5 w-2.5 rounded-full bg-transparent" />
                      <span className="sr-only">{step.name}</span>
                    </span>
                    <span className="ml-3 text-sm font-medium text-muted-foreground">{step.name}</span>
                  </span>
                  <span className="absolute -bottom-6 left-0 text-xs text-muted-foreground">{step.description}</span>
                </div>
              )}

              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "absolute right-0 top-4 h-0.5 w-full -translate-y-1/2",
                    index < currentStep ? "bg-primary" : "bg-border",
                  )}
                >
                  <div className="h-full w-full" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Mobile progress indicator */}
      <div className="md:hidden flex items-center justify-between mt-2">
        <span className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm text-muted-foreground">{steps[currentStep].name}</span>
      </div>

      {/* Progress bar for mobile */}
      <div className="md:hidden mt-2 h-1 w-full bg-border rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
