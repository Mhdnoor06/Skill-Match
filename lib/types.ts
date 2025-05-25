export interface Skill {
  name: string
  level?: "beginner" | "intermediate" | "advanced" | "expert"
}

export interface User {
  id: string
  name: string
  role: string
  avatar: string
  learningSkills: Skill[]
  teachingSkills: Skill[]
}

export interface Match extends User {
  matchScore?: number
}
