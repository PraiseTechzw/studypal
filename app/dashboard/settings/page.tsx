"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Bell, Globe, Key, Lock, Moon, Palette, Save, Shield, Sun, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function SettingsPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("account")
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)

    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      toast.success("Settings saved successfully")
    }, 1000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <motion.div className="container p-4 sm:p-6 mx-auto" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        <motion.div variants={item}>
          <Tabs
            defaultValue={activeTab}
            orientation="vertical"
            onValueChange={setActiveTab}
            className="h-full space-y-6"
          >
            <TabsList className="flex flex-col h-auto bg-transparent space-y-1 p-0">
              <TabsTrigger value="account" className="justify-start data-[state=active]:bg-muted w-full">
                <User className="mr-2 h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger value="appearance" className="justify-start data-[state=active]:bg-muted w-full">
                <Palette className="mr-2 h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="justify-start data-[state=active]:bg-muted w-full">
                <Bell className="mr-2 h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start data-[state=active]:bg-muted w-full">
                <Shield className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="language" className="justify-start data-[state=active]:bg-muted w-full">
                <Globe className="mr-2 h-4 w-4" />
                Language
              </TabsTrigger>
            </TabsList>

            <div className="flex-1">
              <TabsContent value="account" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your account information and profile details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="Alex Johnson" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue="alex.johnson@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="major">Major</Label>
                        <Select defaultValue="cs">
                          <SelectTrigger>
                            <SelectValue placeholder="Select your major" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="engineering">Engineering</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Academic Year</Label>
                        <Select defaultValue="junior">
                          <SelectTrigger>
                            <SelectValue placeholder="Select your year" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="freshman">Freshman</SelectItem>
                            <SelectItem value="sophomore">Sophomore</SelectItem>
                            <SelectItem value="junior">Junior</SelectItem>
                            <SelectItem value="senior">Senior</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your profile picture</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="relative h-20 w-20 overflow-hidden rounded-full">
                        <img src="/placeholder.svg" alt="Profile" className="h-full w-full object-cover" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline" size="sm">
                          Upload New Picture
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Remove Picture
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Theme</CardTitle>
                    <CardDescription>Customize the appearance of the application</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <Label>Theme Mode</Label>
                      <RadioGroup defaultValue="system" className="grid grid-cols-3 gap-4">
                        <div>
                          <RadioGroupItem value="light" id="theme-light" className="peer sr-only" />
                          <Label
                            htmlFor="theme-light"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Sun className="mb-3 h-6 w-6" />
                            Light
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="dark" id="theme-dark" className="peer sr-only" />
                          <Label
                            htmlFor="theme-dark"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <Moon className="mb-3 h-6 w-6" />
                            Dark
                          </Label>
                        </div>
                        <div>
                          <RadioGroupItem value="system" id="theme-system" className="peer sr-only" />
                          <Label
                            htmlFor="theme-system"
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <div className="mb-3 flex h-6 w-6 items-center justify-center rounded-full border-2">
                              <div className="h-2.5 w-5 rounded-full bg-foreground" />
                            </div>
                            System
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="font-size">Font Size</Label>
                        <span className="text-sm text-muted-foreground">Medium</span>
                      </div>
                      <Select defaultValue="medium">
                        <SelectTrigger>
                          <SelectValue placeholder="Select font size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Configure how and when you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                          <span>Email Notifications</span>
                          <span className="font-normal text-xs text-muted-foreground">Receive notifications via email</span>
                        </Label>
                        <Switch id="email-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                          <span>Push Notifications</span>
                          <span className="font-normal text-xs text-muted-foreground">
                            Receive notifications in the browser
                          </span>
                        </Label>
                        <Switch id="push-notifications" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="deadline-reminders" className="flex flex-col space-y-1">
                          <span>Deadline Reminders</span>
                          <span className="font-normal text-xs text-muted-foreground">
                            Get reminders for upcoming deadlines
                          </span>
                        </Label>
                        <Switch id="deadline-reminders" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="study-group-updates" className="flex flex-col space-y-1">
                          <span>Study Group Updates</span>
                          <span className="font-normal text-xs text-muted-foreground">
                            Notifications about study group activity
                          </span>
                        </Label>
                        <Switch id="study-group-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="ai-recommendations" className="flex flex-col space-y-1">
                          <span>AI Recommendations</span>
                          <span className="font-normal text-xs text-muted-foreground">
                            Receive AI-powered study recommendations
                          </span>
                        </Label>
                        <Switch id="ai-recommendations" defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Update Password
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                      <div className="space-y-0.5">
                        <div className="font-medium">Two-Factor Authentication</div>
                        <div className="text-sm text-muted-foreground">
                          Protect your account with an additional security layer
                        </div>
                      </div>
                      <Switch id="two-factor" />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">
                      <Lock className="mr-2 h-4 w-4" />
                      Setup 2FA
                    </Button>
                    <Button variant="outline" className="text-destructive">
                      Disable 2FA
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="mt-0 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Language Settings</CardTitle>
                    <CardDescription>Choose your preferred language and region</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">Display Language</Label>
                      <Select defaultValue="en-US">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en-US">English (United States)</SelectItem>
                          <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                          <SelectItem value="zh">Chinese</SelectItem>
                          <SelectItem value="ja">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Select defaultValue="us">
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="uk">United Kingdom</SelectItem>
                          <SelectItem value="au">Australia</SelectItem>
                          <SelectItem value="eu">Europe</SelectItem>
                          <SelectItem value="asia">Asia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="date-format">Date Format</Label>
                      <Select defaultValue="mdy">
                        <SelectTrigger>
                          <SelectValue placeholder="Select date format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                          <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                          <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button onClick={handleSave} className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}

