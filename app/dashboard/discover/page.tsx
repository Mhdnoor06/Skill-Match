"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Search,
  Filter,
  Users,
  Target,
  TrendingUp,
  MessageCircle,
  Video,
  Calendar,
  Star,
  MapPin,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import MatchDiscoveryPage from "@/app/match-discovery/page"

// Mock data for matches
const mockMatches = [
  {
    id: "1",
    name: "Sarah Johnson",
    title: "Python Developer & Data Scientist",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 127,
    location: "San Francisco, CA",
    matchPercentage: 95,
    teachingSkills: ["Python", "Data Science", "Machine Learning"],
    learningSkills: ["React", "TypeScript"],
    hourlyRate: 45,
    responseTime: "Usually responds in 2 hours",
    languages: ["English", "Spanish"],
    bio: "Experienced Python developer with 8+ years in data science and machine learning. I love helping others learn programming and data analysis.",
    availability: "Available weekdays 6-9 PM PST",
    totalStudents: 89,
    completedSessions: 234,
  },
  {
    id: "2",
    name: "Michael Chen",
    title: "UX Designer & Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 93,
    location: "New York, NY",
    matchPercentage: 88,
    teachingSkills: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
    learningSkills: ["Vue.js", "Node.js"],
    hourlyRate: 55,
    responseTime: "Usually responds in 1 hour",
    languages: ["English", "Mandarin"],
    bio: "Senior UX designer passionate about creating intuitive user experiences. I enjoy teaching design principles and helping developers understand user-centered design.",
    availability: "Available weekends and evenings",
    totalStudents: 67,
    completedSessions: 156,
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    title: "Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 78,
    location: "Austin, TX",
    matchPercentage: 82,
    teachingSkills: ["React", "Node.js", "MongoDB"],
    learningSkills: ["DevOps", "AWS"],
    hourlyRate: 40,
    responseTime: "Usually responds in 3 hours",
    languages: ["English", "Spanish"],
    bio: "Full-stack developer with expertise in modern web technologies. I love sharing knowledge about React and helping others build amazing web applications.",
    availability: "Flexible schedule",
    totalStudents: 45,
    completedSessions: 123,
  },
]

// Mock data for new potential matches
const potentialMatches = [
  {
    id: "4",
    name: "David Kim",
    title: "Mobile App Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 156,
    location: "Seattle, WA",
    matchPercentage: 92,
    teachingSkills: ["React Native", "Flutter", "iOS Development"],
    learningSkills: ["Backend Development", "GraphQL"],
    hourlyRate: 50,
    responseTime: "Usually responds in 1 hour",
    languages: ["English", "Korean"],
    bio: "Mobile app developer with 6+ years of experience. Passionate about creating beautiful, performant mobile applications and teaching others the art of mobile development.",
    availability: "Available weekdays 7-10 PM PST",
    totalStudents: 72,
    completedSessions: 189,
  },
  {
    id: "5",
    name: "Lisa Patel",
    title: "DevOps Engineer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 134,
    location: "Denver, CO",
    matchPercentage: 87,
    teachingSkills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    learningSkills: ["Machine Learning", "Python"],
    hourlyRate: 60,
    responseTime: "Usually responds in 2 hours",
    languages: ["English", "Hindi"],
    bio: "DevOps engineer specializing in cloud infrastructure and automation. I enjoy helping developers understand deployment pipelines and cloud architecture.",
    availability: "Available weekends",
    totalStudents: 58,
    completedSessions: 167,
  },
]

export default function DiscoverPage() {
  const [currentView, setCurrentView] = useState<"discover" | "findMatches" | "matchDetail">("discover")
  const [selectedMatch, setSelectedMatch] = useState<any>(null)
  const handleBackToDiscover = () => {
    setCurrentView("discover")
    setSelectedMatch(null)
  }
  const [isSearching, setIsSearching] = useState(false)
  const [newMatches, setNewMatches] = useState<any[]>([])
  const [connectionStatuses, setConnectionStatuses] = useState<Record<string, "none" | "pending" | "connected">>({})

  const handleFindMatches = () => {
    setCurrentView("findMatches")
  }

  const handleMatchClick = (match: any) => {
    setSelectedMatch(match)
    setCurrentView("matchDetail")
  }

  const handleBackToFindMatches = () => {
    setCurrentView("findMatches")
    setSelectedMatch(null)
  }

  const handleConnectionRequest = (matchId: string) => {
    setConnectionStatuses((prev) => ({ ...prev, [matchId]: "pending" }))
    // Simulate API call
    setTimeout(() => {
      setConnectionStatuses((prev) => ({
        ...prev,
        [matchId]: Math.random() > 0.3 ? "connected" : "pending",
      }))
    }, 1000)
  }

  // Match Detail View
  if (currentView === "matchDetail" && selectedMatch) {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={currentView === "matchDetail" ? handleBackToFindMatches : handleBackToDiscover}
            className="flex items-center gap-2 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Match Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">View detailed information about this match</p>
          </div>
        </div>

        {/* Match Detail Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="w-24 h-24 mx-auto">
                    <AvatarImage src={selectedMatch.avatar || "/placeholder.svg"} alt={selectedMatch.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                      {selectedMatch.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedMatch.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{selectedMatch.title}</p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(selectedMatch.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedMatch.rating} ({selectedMatch.reviewCount} reviews)
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  >
                    {selectedMatch.matchPercentage}% Match
                  </Badge>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    {selectedMatch.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    {selectedMatch.responseTime}
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">${selectedMatch.hourlyRate}/hour</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Video className="w-4 h-4 mr-2" />
                    Video Call
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Bio */}
            <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h4>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedMatch.bio}</p>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Teaching</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedMatch.teachingSkills.map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Learning</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedMatch.learningSkills.map((skill: string, index: number) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Teaching Stats</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedMatch.totalStudents}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedMatch.completedSessions}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Sessions Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  // Find Matches View
  if (currentView === "findMatches") {
    return (
      <div className="space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDiscover}
            className="flex items-center gap-2 hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Discover
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Find New Matches</h1>
            <p className="text-gray-600 dark:text-gray-400">
              AI-powered matching to find your perfect learning partners
            </p>
          </div>
        </div>

        {/* Use the MatchDiscoveryPage component */}
        <div className="h-full">
          <MatchDiscoveryPage />
        </div>
      </div>
    )
  }

  // Main Discover View
  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Discover Matches</h1>
          <p className="text-gray-600 dark:text-gray-400">Find your perfect learning partners and skill teachers</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2">
            <Search className="w-4 h-4" />
            Search
          </Button>
          <Button
            onClick={handleFindMatches}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Find Matches</span>
            <span className="sm:hidden">Find</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{mockMatches.length}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Matches</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">89%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Compatibility</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">New This Week</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Matches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Your Current Matches</h2>
          <div className="flex gap-2">
            {["All", "Python", "React", "Design", "Data Science"].map((filter) => (
              <Badge
                key={filter}
                variant={filter === "All" ? "default" : "secondary"}
                className="cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {filter}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockMatches.map((match) => {
            const connectionStatus = connectionStatuses[match.id] || "none"

            return (
              <Card
                key={match.id}
                className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-gray-200/40 dark:border-zinc-800/40 hover:scale-105 transition-all duration-200 group"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={match.avatar || "/placeholder.svg"} alt={match.name} />
                          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                            {match.name
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                            {match.name}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{match.title}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {match.matchPercentage}%
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(match.rating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {match.rating} ({match.reviewCount})
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <p className="text-xs font-medium text-gray-900 dark:text-white mb-1">Teaching:</p>
                        <div className="flex flex-wrap gap-1">
                          {match.teachingSkills.slice(0, 2).map((skill: string, index: number) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {match.teachingSkills.length > 2 && (
                            <Badge variant="secondary" className="text-xs">
                              +{match.teachingSkills.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <MapPin className="w-3 h-3" />
                        {match.location.split(",")[0]}
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">${match.hourlyRate}/hr</span>
                    </div>

                    {/* Connection Status Section */}
                    <div className="pt-3 border-t border-gray-200/50 dark:border-zinc-800/50">
                      <div className="flex items-center justify-between gap-2">
                        {connectionStatus === "none" && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleConnectionRequest(match.id)
                              }}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-all duration-200 text-xs font-medium"
                            >
                              Connect
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMatchClick(match)
                              }}
                              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              View Profile
                            </button>
                          </>
                        )}

                        {connectionStatus === "pending" && (
                          <>
                            <div className="flex-1 bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800/50 py-2 px-3 rounded-lg text-center text-xs font-medium">
                              Request Sent
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMatchClick(match)
                              }}
                              className="px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                            >
                              View Profile
                            </button>
                          </>
                        )}

                        {connectionStatus === "connected" && (
                          <>
                            <div className="flex-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/50 py-2 px-3 rounded-lg text-center text-xs font-medium flex items-center justify-center gap-2">
                              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                              Connected
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleMatchClick(match)
                              }}
                              className="px-3 py-2 bg-blue-600 text-white text-xs rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Message
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
