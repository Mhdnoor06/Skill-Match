import type { Match } from "./types"

export function generateMatches(): Match[] {
  return [
    {
      id: "user-2",
      name: "Jordan Lee",
      role: "Frontend Developer",
      avatar: "/professional-dark-hair-portrait.png",
      learningSkills: [
        { name: "UI Design", level: "beginner" },
        { name: "Figma", level: "intermediate" },
        { name: "User Research", level: "beginner" },
      ],
      teachingSkills: [
        { name: "JavaScript", level: "expert" },
        { name: "React", level: "advanced" },
        { name: "TypeScript", level: "intermediate" },
      ],
      matchScore: 92,
    },
    {
      id: "user-3",
      name: "Taylor Kim",
      role: "Full Stack Developer",
      avatar: "/smiling-professional-portrait.png",
      learningSkills: [
        { name: "UI Design", level: "beginner" },
        { name: "UX Research", level: "beginner" },
        { name: "Wireframing", level: "intermediate" },
      ],
      teachingSkills: [
        { name: "Node.js", level: "expert" },
        { name: "React", level: "advanced" },
        { name: "MongoDB", level: "advanced" },
      ],
      matchScore: 85,
    },
    {
      id: "user-4",
      name: "Casey Rivera",
      role: "Backend Developer",
      avatar: "/professional-portrait-glasses.png",
      learningSkills: [
        { name: "UI Design", level: "beginner" },
        { name: "Figma", level: "beginner" },
        { name: "Prototyping", level: "beginner" },
      ],
      teachingSkills: [
        { name: "JavaScript", level: "advanced" },
        { name: "Python", level: "expert" },
        { name: "Django", level: "advanced" },
      ],
      matchScore: 78,
    },
    {
      id: "user-5",
      name: "Morgan Chen",
      role: "Mobile Developer",
      avatar: "/professional-short-hair-portrait.png",
      learningSkills: [
        { name: "UI Design", level: "intermediate" },
        { name: "User Research", level: "beginner" },
        { name: "Design Systems", level: "beginner" },
      ],
      teachingSkills: [
        { name: "React Native", level: "expert" },
        { name: "JavaScript", level: "advanced" },
        { name: "Swift", level: "intermediate" },
      ],
      matchScore: 81,
    },
    {
      id: "user-6",
      name: "Riley Johnson",
      role: "Data Scientist",
      avatar: "/placeholder.svg?height=200&width=200&query=professional portrait",
      learningSkills: [
        { name: "UI Design", level: "beginner" },
        { name: "Figma", level: "beginner" },
        { name: "UX Writing", level: "intermediate" },
      ],
      teachingSkills: [
        { name: "Python", level: "expert" },
        { name: "Machine Learning", level: "advanced" },
        { name: "Data Visualization", level: "expert" },
      ],
      matchScore: 75,
    },
  ]
}
