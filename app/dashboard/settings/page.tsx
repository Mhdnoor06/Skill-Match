"use client"

import { useState } from "react"
import { Bell, Shield, User, Mail, Globe, Moon, Sun, Monitor, Smartphone, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [profileVisible, setProfileVisible] = useState(true)
  const [directMessages, setDirectMessages] = useState(true)
  const [onlineStatus, setOnlineStatus] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and privacy settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-1">
        {/* Account Settings */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 dark:bg-blue-400/10">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Account Settings</CardTitle>
                <CardDescription>Manage your personal information and preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john@example.com"
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="johndoe"
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Change Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50 pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Availability Status</Label>
              <Select defaultValue="available">
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      Available
                    </div>
                  </SelectItem>
                  <SelectItem value="busy">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      Busy
                    </div>
                  </SelectItem>
                  <SelectItem value="away">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      Away
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 dark:bg-purple-400/10">
                <Bell className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 dark:bg-gray-800/40 border border-gray-200/30 dark:border-gray-700/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Label className="font-medium">Email Notifications</Label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive notifications via email</p>
                </div>
                <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 dark:bg-gray-800/40 border border-gray-200/30 dark:border-gray-700/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="h-4 w-4 text-gray-500" />
                    <Label className="font-medium">Push Notifications</Label>
                    <Badge variant="secondary" className="text-xs">
                      New
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications on your device</p>
                </div>
                <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
            </div>

            <Separator className="bg-gray-200/50 dark:bg-gray-700/50" />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Notification Frequency</Label>
              <Select defaultValue="immediate">
                <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 dark:border-gray-700/50">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="hourly">Hourly digest</SelectItem>
                  <SelectItem value="daily">Daily digest</SelectItem>
                  <SelectItem value="weekly">Weekly digest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 dark:bg-green-400/10">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Privacy & Security</CardTitle>
                <CardDescription>Control your privacy and security preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 dark:bg-gray-800/40 border border-gray-200/30 dark:border-gray-700/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-500" />
                    <Label className="font-medium">Public Profile</Label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Make your profile visible to everyone</p>
                </div>
                <Switch checked={profileVisible} onCheckedChange={setProfileVisible} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 dark:bg-gray-800/40 border border-gray-200/30 dark:border-gray-700/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <Label className="font-medium">Direct Messages</Label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Allow others to send you direct messages</p>
                </div>
                <Switch checked={directMessages} onCheckedChange={setDirectMessages} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-white/40 dark:bg-gray-800/40 border border-gray-200/30 dark:border-gray-700/30">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <Label className="font-medium">Online Status</Label>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Show when you're online to other users</p>
                </div>
                <Switch checked={onlineStatus} onCheckedChange={setOnlineStatus} />
              </div>
            </div>

            <Separator className="bg-gray-200/50 dark:bg-gray-700/50" />

            <div className="space-y-2">
              <Label className="text-sm font-medium">Data Export</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Download a copy of your data</p>
              <Button variant="outline" className="w-full sm:w-auto">
                <Lock className="h-4 w-4 mr-2" />
                Request Data Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card className="border-0 shadow-lg bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-900/80 dark:to-gray-800/80 backdrop-blur-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 dark:bg-orange-400/10">
                <Monitor className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle className="text-xl">Appearance</CardTitle>
                <CardDescription>Customize how the app looks and feels</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Theme</Label>
              <div className="grid grid-cols-3 md:grid-cols-6 xl:grid-cols-3 gap-3">
                <Button variant="outline" className="h-20 flex-col gap-2 bg-white/50 dark:bg-gray-800/50">
                  <Sun className="h-5 w-5" />
                  <span className="text-xs">Light</span>
                </Button>
                <Button variant="outline" className="h-20 flex-col gap-2 bg-white/50 dark:bg-gray-800/50">
                  <Moon className="h-5 w-5" />
                  <span className="text-xs">Dark</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-20 flex-col gap-2 bg-white/50 dark:bg-gray-800/50 border-primary"
                >
                  <Monitor className="h-5 w-5" />
                  <span className="text-xs">System</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}
