"use client"

import { SocialMediaLinks } from "@/components/social-media-links"
import type { SocialMediaLink } from "@/components/social-media-links"

interface SocialMediaStepProps {
  formData: {
    socialLinks: SocialMediaLink[]
  }
  updateFormData: (field: string, value: any) => void
}

export function SocialMediaStep({ formData, updateFormData }: SocialMediaStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Connect your social profiles</h2>
        <p className="text-muted-foreground mt-1">
          Add your social media profiles to help others connect with you (optional)
        </p>
      </div>

      <div className="space-y-6">
        <SocialMediaLinks value={formData.socialLinks} onChange={(value) => updateFormData("socialLinks", value)} />

        <p className="text-sm text-muted-foreground text-center mt-4">
          This step is optional. You can add social profiles to enhance your credibility and provide additional ways for
          others to connect with you.
        </p>
      </div>
    </div>
  )
}
