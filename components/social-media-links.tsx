"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SocialMediaLink {
  id: string
  platform: string
  url: string
}

interface SocialMediaLinksProps {
  value: SocialMediaLink[]
  onChange: (value: SocialMediaLink[]) => void
  className?: string
}

const SOCIAL_PLATFORMS = [
  { id: "linkedin", name: "LinkedIn", placeholder: "https://linkedin.com/in/username" },
  { id: "github", name: "GitHub", placeholder: "https://github.com/username" },
  { id: "twitter", name: "Twitter", placeholder: "https://twitter.com/username" },
  { id: "instagram", name: "Instagram", placeholder: "https://instagram.com/username" },
  { id: "facebook", name: "Facebook", placeholder: "https://facebook.com/username" },
  { id: "youtube", name: "YouTube", placeholder: "https://youtube.com/c/channelname" },
  { id: "medium", name: "Medium", placeholder: "https://medium.com/@username" },
  { id: "dribbble", name: "Dribbble", placeholder: "https://dribbble.com/username" },
  { id: "behance", name: "Behance", placeholder: "https://behance.net/username" },
  { id: "website", name: "Personal Website", placeholder: "https://yourwebsite.com" },
]

export function SocialMediaLinks({ value, onChange, className }: SocialMediaLinksProps) {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const addLink = () => {
    const newLink: SocialMediaLink = {
      id: crypto.randomUUID(),
      platform: "",
      url: "",
    }
    onChange([...value, newLink])
  }

  const removeLink = (id: string) => {
    onChange(value.filter((link) => link.id !== id))
    // Remove any errors for this link
    const newErrors = { ...errors }
    delete newErrors[id]
    setErrors(newErrors)
  }

  const updateLink = (id: string, field: keyof SocialMediaLink, newValue: string) => {
    onChange(
      value.map((link) => {
        if (link.id === id) {
          return { ...link, [field]: newValue }
        }
        return link
      }),
    )

    // Clear error when field is updated
    if (errors[id]) {
      const newErrors = { ...errors }
      delete newErrors[id]
      setErrors(newErrors)
    }
  }

  const validateUrl = (id: string, url: string, platform: string) => {
    if (!url) return

    // Basic URL validation
    try {
      new URL(url)
      // Clear error if URL is valid
      if (errors[id]) {
        const newErrors = { ...errors }
        delete newErrors[id]
        setErrors(newErrors)
      }
    } catch (e) {
      setErrors({ ...errors, [id]: "Please enter a valid URL" })
      return
    }

    // Platform-specific validation (optional)
    if (platform) {
      const platformInfo = SOCIAL_PLATFORMS.find((p) => p.id === platform)
      if (platformInfo) {
        const platformDomain = new URL(platformInfo.placeholder).hostname
        try {
          const urlDomain = new URL(url).hostname
          if (!urlDomain.includes(platformDomain.split(".")[0])) {
            setErrors({ ...errors, [id]: `URL should be from ${platformDomain}` })
          }
        } catch (e) {
          // If URL parsing fails, we already set an error above
        }
      }
    }
  }

  const getPlaceholder = (platform: string) => {
    const platformInfo = SOCIAL_PLATFORMS.find((p) => p.id === platform)
    return platformInfo ? platformInfo.placeholder : "https://example.com/username"
  }

  return (
    <div className={cn("space-y-4", className)}>
      {value.length === 0 ? (
        <Button
          type="button"
          variant="outline"
          onClick={addLink}
          className="w-full flex items-center justify-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Social Media Profile
        </Button>
      ) : (
        <>
          <div className="space-y-4">
            {value.map((link) => (
              <div key={link.id} className="space-y-2 p-4 border rounded-lg bg-background/50">
                <div className="flex justify-between items-center">
                  <Label htmlFor={`platform-${link.id}`} className="text-sm font-medium">
                    Platform
                  </Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(link.id)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>

                <Select value={link.platform} onValueChange={(value) => updateLink(link.id, "platform", value)}>
                  <SelectTrigger id={`platform-${link.id}`}>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {SOCIAL_PLATFORMS.map((platform) => (
                      <SelectItem key={platform.id} value={platform.id}>
                        {platform.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="space-y-2">
                  <Label htmlFor={`url-${link.id}`} className="text-sm font-medium">
                    Profile URL
                  </Label>
                  <Input
                    id={`url-${link.id}`}
                    value={link.url}
                    onChange={(e) => updateLink(link.id, "url", e.target.value)}
                    onBlur={() => validateUrl(link.id, link.url, link.platform)}
                    placeholder={getPlaceholder(link.platform)}
                    className={cn(errors[link.id] && "border-destructive")}
                  />
                  {errors[link.id] && <p className="text-destructive text-xs">{errors[link.id]}</p>}
                </div>
              </div>
            ))}
          </div>

          <Button
            type="button"
            variant="outline"
            onClick={addLink}
            className="w-full flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Another Profile
          </Button>
        </>
      )}
    </div>
  )
}
