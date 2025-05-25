"use client"

import type React from "react"

import { useState } from "react"
import {
  Mail,
  MapPin,
  Edit3,
  Save,
  X,
  Camera,
  Plus,
  Settings,
  Shield,
  Bell,
  Download,
  Award,
  BookOpen,
  GraduationCap,
  Globe,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    role: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience in web technologies. Love teaching and learning new skills through peer collaboration.",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    profilePicture: null as string | null,
    teachingSkills: ["JavaScript", "React", "Node.js", "TypeScript"],
    learningSkills: ["Python", "Machine Learning", "Data Science"],
    socialLinks: [
      { platform: "LinkedIn", url: "https://linkedin.com/in/johndoe", icon: Linkedin },
      { platform: "GitHub", url: "https://github.com/johndoe", icon: Github },
      { platform: "Twitter", url: "https://twitter.com/johndoe", icon: Twitter },
    ],
    availability: "Weekdays 6-9 PM PST",
    completionPercentage: 85,
  })

  const [tempData, setTempData] = useState(profileData)

  const handleEdit = (section: string) => {
    setEditingSection(section)
    setTempData(profileData)
  }

  const handleSave = (section: string) => {
    setProfileData(tempData)
    setEditingSection(null)
  }

  const handleCancel = () => {
    setTempData(profileData)
    setEditingSection(null)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setTempData({ ...tempData, profilePicture: result })
        setProfileData({ ...profileData, profilePicture: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const addSkill = (type: "teaching" | "learning", skill: string) => {
    if (skill.trim()) {
      if (type === "teaching") {
        setTempData({ ...tempData, teachingSkills: [...tempData.teachingSkills, skill.trim()] })
      } else {
        setTempData({ ...tempData, learningSkills: [...tempData.learningSkills, skill.trim()] })
      }
    }
  }

  const removeSkill = (type: "teaching" | "learning", index: number) => {
    if (type === "teaching") {
      setTempData({
        ...tempData,
        teachingSkills: tempData.teachingSkills.filter((_, i) => i !== index),
      })
    } else {
      setTempData({
        ...tempData,
        learningSkills: tempData.learningSkills.filter((_, i) => i !== index),
      })
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 dark:from-[#0F0F12] dark:via-[#1A1A1E] dark:to-[#0F0F12]">
      {/* Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0F0F12]/70 backdrop-blur-xl border border-white/20 dark:border-[#1F1F23]/50 shadow-xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent mb-2">
                My Profile
              </h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your learning profile and preferences</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div className="text-sm font-medium text-blue-700 dark:text-blue-300">Profile Completion</div>
                  <div className="text-sm font-bold text-blue-700 dark:text-blue-300">
                    {profileData.completionPercentage}%
                  </div>
                </div>
                <div className="w-32 bg-blue-200/50 dark:bg-blue-800/50 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${profileData.completionPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Header */}
          <div className="bg-white/60 dark:bg-zinc-900/60 backdrop-blur-sm rounded-xl p-6 border border-white/30 dark:border-zinc-800/30 shadow-lg">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Enhanced Profile Picture */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  {/* Animated gradient ring */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-emerald-500 -m-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>

                  {profileData.profilePicture ? (
                    <img
                      src={profileData.profilePicture || "/placeholder.svg"}
                      alt="Profile"
                      className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl md:text-3xl font-bold border-4 border-white dark:border-gray-700 shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300">
                      {profileData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}

                  <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                      <Camera className="w-6 h-6 text-white drop-shadow-lg" />
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex-1">
                {editingSection === "basic" ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                      <input
                        type="text"
                        value={tempData.name}
                        onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role</label>
                      <input
                        type="text"
                        value={tempData.role}
                        onChange={(e) => setTempData({ ...tempData, role: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bio</label>
                      <textarea
                        value={tempData.bio}
                        onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleSave("basic")}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl flex items-center gap-2 border border-gray-200 dark:border-gray-600 backdrop-blur-sm transition-all duration-300 font-medium"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{profileData.name}</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400">{profileData.role}</p>
                      </div>
                      <button
                        onClick={() => handleEdit("basic")}
                        className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300 group"
                      >
                        <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      </button>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{profileData.bio}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-gray-700 dark:text-gray-300">{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                        <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        <span className="text-gray-700 dark:text-gray-300">{profileData.location}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Teaching Skills */}
        <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0F0F12]/70 backdrop-blur-xl border border-white/20 dark:border-[#1F1F23]/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skills I Teach</h3>
              </div>
              <button
                onClick={() => handleEdit("teaching")}
                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-300"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>

            {editingSection === "teaching" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tempData.teachingSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-800 dark:text-blue-300 rounded-xl text-sm border border-blue-200/50 dark:border-blue-800/50"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill("teaching", index)}
                        className="ml-1 text-blue-600 hover:text-blue-800 hover:bg-blue-200/50 rounded-full p-1 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill..."
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill("teaching", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector('input[placeholder="Add a skill..."]') as HTMLInputElement
                      if (input) {
                        addSkill("teaching", input.value)
                        input.value = ""
                      }
                    }}
                    className="px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave("teaching")}
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl flex items-center gap-2 border border-gray-200 dark:border-gray-600 backdrop-blur-sm transition-all duration-300 font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.teachingSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-800 dark:text-blue-300 rounded-xl text-sm border border-blue-200/50 dark:border-blue-800/50 hover:shadow-md transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Learning Skills */}
        <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0F0F12]/70 backdrop-blur-xl border border-white/20 dark:border-[#1F1F23]/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500/10 to-emerald-600/10 rounded-xl">
                  <BookOpen className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Skills I Want to Learn</h3>
              </div>
              <button
                onClick={() => handleEdit("learning")}
                className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all duration-300"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>

            {editingSection === "learning" ? (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {tempData.learningSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 text-emerald-800 dark:text-emerald-300 rounded-xl text-sm border border-emerald-200/50 dark:border-emerald-800/50"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill("learning", index)}
                        className="ml-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-200/50 rounded-full p-1 transition-all"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add a skill to learn..."
                    className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white backdrop-blur-sm focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        addSkill("learning", e.currentTarget.value)
                        e.currentTarget.value = ""
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      const input = document.querySelector(
                        'input[placeholder="Add a skill to learn..."]',
                      ) as HTMLInputElement
                      if (input) {
                        addSkill("learning", input.value)
                        input.value = ""
                      }
                    }}
                    className="px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleSave("learning")}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl flex items-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl flex items-center gap-2 border border-gray-200 dark:border-gray-600 backdrop-blur-sm transition-all duration-300 font-medium"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {profileData.learningSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-800/20 text-emerald-800 dark:text-emerald-300 rounded-xl text-sm border border-emerald-200/50 dark:border-emerald-800/50 hover:shadow-md transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additional Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact & Social */}
        <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0F0F12]/70 backdrop-blur-xl border border-white/20 dark:border-[#1F1F23]/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-xl">
                  <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Contact & Social</h3>
              </div>
              <button
                onClick={() => handleEdit("contact")}
                className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-xl transition-all duration-300"
              >
                <Edit3 className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                  <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">{profileData.location}</span>
              </div>
              {profileData.socialLinks.map((link, index) => {
                const IconComponent = link.icon
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <div className="p-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30 transition-colors">
                      <IconComponent className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{link.platform}</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-purple-600 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300 text-sm truncate transition-colors"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0F0F12]/70 backdrop-blur-xl border border-white/20 dark:border-[#1F1F23]/50 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5"></div>
          <div className="relative p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-xl">
                <Settings className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick Actions</h3>
            </div>

            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-700/60 transition-all duration-300 group">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">General Settings</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-700/60 transition-all duration-300 group">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800/50 transition-colors">
                  <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Privacy & Security</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-700/60 transition-all duration-300 group">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Notifications</span>
              </button>
              <button className="w-full flex items-center gap-3 p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-md hover:bg-white/80 dark:hover:bg-gray-700/60 transition-all duration-300 group">
                <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg group-hover:bg-orange-200 dark:group-hover:bg-orange-800/50 transition-colors">
                  <Download className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-gray-700 dark:text-gray-300 font-medium">Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative overflow-hidden rounded-2xl bg-white/70 dark:bg-[#0F0F12]/70 backdrop-blur-xl border border-white/20 dark:border-[#1F1F23]/50 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-emerald-500/5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl"></div>

        <div className="relative p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 rounded-xl">
              <Award className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Learning Statistics</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 bg-clip-text text-transparent mb-1">
                12
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Skills Teaching</div>
            </div>
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-400 dark:to-emerald-500 bg-clip-text text-transparent mb-1">
                8
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Skills Learning</div>
            </div>
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-400 dark:to-purple-500 bg-clip-text text-transparent mb-1">
                45
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Total Sessions</div>
            </div>
            <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl border border-white/30 dark:border-gray-700/30 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 dark:from-orange-400 dark:to-orange-500 bg-clip-text text-transparent mb-1">
                4.8
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
