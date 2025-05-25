"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BackgroundPattern } from "@/components/background-pattern";
import { OnboardingHeader } from "@/components/onboarding-header";
import { StepperOnboarding } from "@/components/stepper-onboarding";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function OnboardingPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);

    try {
      // Call the API to update the profile
      const response = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update profile");
      }

      // Show success toast
      toast({
        title: "Profile completed!",
        description: "Your profile has been successfully updated.",
        duration: 3000,
      });

      // Short delay before redirecting to give the toast time to be seen
      setTimeout(() => {
        // Navigate to dashboard
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Something went wrong",
        description:
          error instanceof Error ? error.message : "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col">
      <BackgroundPattern />
      <OnboardingHeader />

      <main className="flex-1 relative z-10 px-4 py-6 md:py-8 lg:py-12 flex items-center justify-center">
        <StepperOnboarding
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </main>

      <Toaster />
    </div>
  );
}
