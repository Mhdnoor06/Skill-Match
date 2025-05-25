import { Github, Linkedin, Twitter, Instagram, Facebook, Youtube, Globe, ExternalLink } from "lucide-react"

interface SocialMediaIconProps {
  platform: string
  className?: string
  size?: number
}

export function SocialMediaIcon({ platform, className, size = 16 }: SocialMediaIconProps) {
  switch (platform) {
    case "github":
      return <Github className={className} size={size} />
    case "linkedin":
      return <Linkedin className={className} size={size} />
    case "twitter":
      return <Twitter className={className} size={size} />
    case "instagram":
      return <Instagram className={className} size={size} />
    case "facebook":
      return <Facebook className={className} size={size} />
    case "youtube":
      return <Youtube className={className} size={size} />
    case "website":
      return <Globe className={className} size={size} />
    default:
      return <ExternalLink className={className} size={size} />
  }
}
