"use client"

import { useState, useEffect } from "react"
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
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { toast } = useToast()
  const { theme, setTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("account")
  const [isSaving, setIsSaving] = useState(false)
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    major: "cs",
    year: "junior",
    profilePicture: "/placeholder.svg",
  })

  // Appearance settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    themeMode: "system",
    fontSize: "medium",
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    deadlineReminders: true,
    studyGroupUpdates: true,
    aiRecommendations: true,
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: false,
  })

  // Language settings
  const [languageSettings, setLanguageSettings] = useState({
    displayLanguage: "en-US",
    region: "us",
    dateFormat: "mdy",
  })

  // Initialize appearance settings from theme
  useEffect(() => {
    setAppearanceSettings((prev) => ({
      ...prev,
      themeMode: theme || "system",
    }))
  }, [theme])

  // Handle account settings change
  const handleAccountChange = (field: string, value: string) => {
    setAccountSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle appearance settings change
  const handleAppearanceChange = (field: string, value: string) => {
    if (field === "themeMode") {
      setTheme(value)
    }

    setAppearanceSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle notification settings change
  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle security settings change
  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecuritySettings((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Check password match
    if (field === "newPassword" || field === "confirmPassword") {
      const newPass = field === "newPassword" ? value : securitySettings.newPassword
      const confirmPass = field === "confirmPassword" ? value : securitySettings.confirmPassword

      if (newPass && confirmPass) {
        setPasswordMatch(newPass === confirmPass)
      }
    }
  }

  // Handle language settings change
  const handleLanguageChange = (field: string, value: string) => {
    setLanguageSettings((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle save for account settings
  const handleSaveAccount = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Account Updated",
        description: "Your account information has been saved successfully",
        variant: "success",
      })

      // Save to localStorage for persistence
      localStorage.setItem("studpal_account", JSON.stringify(accountSettings))
    }, 1000)
  }

  // Handle save for appearance settings
  const handleSaveAppearance = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Appearance Updated",
        description: "Your appearance settings have been saved successfully",
        variant: "success",
      })

      // Save to localStorage for persistence
      localStorage.setItem("studpal_appearance", JSON.stringify(appearanceSettings))
    }, 1000)
  }

  // Handle save for notification settings
  const handleSaveNotifications = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Notifications Updated",
        description: "Your notification preferences have been saved successfully",
        variant: "success",
      })

      // Save to localStorage for persistence
      localStorage.setItem("studpal_notifications", JSON.stringify(notificationSettings))
    }, 1000)
  }

  // Handle password change
  const handleChangePassword = () => {
    // Validate inputs
    if (!securitySettings.currentPassword) {
      toast({
        title: "Current Password Required",
        description: "Please enter your current password",
        variant: "destructive",
      })
      return
    }

    if (!securitySettings.newPassword) {
      toast({
        title: "New Password Required",
        description: "Please enter a new password",
        variant: "destructive",
      })
      return
    }

    if (!passwordMatch) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation don't match",
        variant: "destructive",
      })
      return
    }

    setIsChangingPassword(true)

    // Simulate API call
    setTimeout(() => {
      setIsChangingPassword(false)

      // Reset password fields
      setSecuritySettings((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))

      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully",
        variant: "success",
      })
    }, 1500)
  }

  // Handle 2FA toggle
  const handleToggle2FA = (enabled: boolean) => {
    setSecuritySettings((prev) => ({
      ...prev,
      twoFactorEnabled: enabled,
    }))

    toast({
      title: enabled ? "2FA Enabled" : "2FA Disabled",
      description: enabled
        ? "Two-factor authentication has been enabled for your account"
        : "Two-factor authentication has been disabled for your account",
      variant: enabled ? "success" : "info",
    })

    // Save to localStorage for persistence
    localStorage.setItem(
      "studpal_security",
      JSON.stringify({
        ...securitySettings,
        twoFactorEnabled: enabled,
        // Don't save passwords to localStorage
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }),
    )
  }

  // Handle save for language settings
  const handleSaveLanguage = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Language Settings Updated",
        description: "Your language preferences have been saved successfully",
        variant: "success",
      })

      // Save to localStorage for persistence
      localStorage.setItem("studpal_language", JSON.stringify(languageSettings))
    }, 1000)
  }

  // Load settings from localStorage on initial render
  useEffect(() => {
    const loadSettings = () => {
      // Load account settings
      const savedAccount = localStorage.getItem("studpal_account")
      if (savedAccount) {
        setAccountSettings(JSON.parse(savedAccount))
      }

      // Load appearance settings
      const savedAppearance = localStorage.getItem("studpal_appearance")
      if (savedAppearance) {
        const parsedAppearance = JSON.parse(savedAppearance)
        setAppearanceSettings(parsedAppearance)
        // Apply theme
        if (parsedAppearance.themeMode) {
          setTheme(parsedAppearance.themeMode)
        }
      }

      // Load notification settings
      const savedNotifications = localStorage.getItem("studpal_notifications")
      if (savedNotifications) {
        setNotificationSettings(JSON.parse(savedNotifications))
      }

      // Load security settings (only 2FA status, not passwords)
      const savedSecurity = localStorage.getItem("studpal_security")
      if (savedSecurity) {
        const parsedSecurity = JSON.parse(savedSecurity)
        setSecuritySettings((prev) => ({
          ...prev,
          twoFactorEnabled: parsedSecurity.twoFactorEnabled || false,
        }))
      }

      // Load language settings
      const savedLanguage = localStorage.getItem("studpal_language")
      if (savedLanguage) {
        setLanguageSettings(JSON.parse(savedLanguage))
      }
    }

    loadSettings()
  }, [setTheme])

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
                      <Input
                        id="name"
                        value={accountSettings.name}
                        onChange={(e) => handleAccountChange("name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={accountSettings.email}
                        onChange={(e) => handleAccountChange("email", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="major">Major</Label>
                      <Select
                        value={accountSettings.major}
                        onValueChange={(value) => handleAccountChange("major", value)}
                      >
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
                      <Select
                        value={accountSettings.year}
                        onValueChange={(value) => handleAccountChange("year", value)}
                      >
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
                  <Button onClick={handleSaveAccount} className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={isSaving}>
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
                      <img
                        src={accountSettings.profilePicture || "/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          // In a real app, this would open a file picker
                          toast({
                            title: "Upload Feature",
                            description: "This would open a file picker in a real app",
                            variant: "info",
                          })
                        }}
                      >
                        Upload New Picture
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={() => {
                          setAccountSettings((prev) => ({
                            ...prev,
                            profilePicture: "/placeholder.svg",
                          }))
                          toast({
                            title: "Picture Removed",
                            description: "Your profile picture has been reset to default",
                            variant: "info",
                          })
                        }}
                      >
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
                    <RadioGroup
                      value={appearanceSettings.themeMode}
                      onValueChange={(value) => handleAppearanceChange("themeMode", value)}
                      className="grid grid-cols-3 gap-4"
                    >
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
                      <span className="text-sm text-muted-foreground capitalize">{appearanceSettings.fontSize}</span>
                    </div>
                    <Select
                      value={appearanceSettings.fontSize}
                      onValueChange={(value) => handleAppearanceChange("fontSize", value)}
                    >
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
                  <Button
                    onClick={handleSaveAppearance}
                    className="bg-[#319795] hover:bg-[#2C7A7B]"
                    disabled={isSaving}
                  >
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
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications via email
                        </span>
                      </Label>
                      <Switch
                        id="email-notifications"
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("emailNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                        <span>Push Notifications</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications in the browser
                        </span>
                      </Label>
                      <Switch
                        id="push-notifications"
                        checked={notificationSettings.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange("pushNotifications", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="deadline-reminders" className="flex flex-col space-y-1">
                        <span>Deadline Reminders</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Get reminders for upcoming deadlines
                        </span>
                      </Label>
                      <Switch
                        id="deadline-reminders"
                        checked={notificationSettings.deadlineReminders}
                        onCheckedChange={(checked) => handleNotificationChange("deadlineReminders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="study-group-updates" className="flex flex-col space-y-1">
                        <span>Study Group Updates</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notifications about study group activity
                        </span>
                      </Label>
                      <Switch
                        id="study-group-updates"
                        checked={notificationSettings.studyGroupUpdates}
                        onCheckedChange={(checked) => handleNotificationChange("studyGroupUpdates", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="ai-recommendations" className="flex flex-col space-y-1">
                        <span>AI Recommendations</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive AI-powered study recommendations
                        </span>
                      </Label>
                      <Switch
                        id="ai-recommendations"
                        checked={notificationSettings.aiRecommendations}
                        onCheckedChange={(checked) => handleNotificationChange("aiRecommendations", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handleSaveNotifications}
                    className="bg-[#319795] hover:bg-[#2C7A7B]"
                    disabled={isSaving}
                  >
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
                    <Input
                      id="current-password"
                      type="password"
                      value={securitySettings.currentPassword}
                      onChange={(e) => handleSecurityChange("currentPassword", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={securitySettings.newPassword}
                      onChange={(e) => handleSecurityChange("newPassword", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={securitySettings.confirmPassword}
                      onChange={(e) => handleSecurityChange("confirmPassword", e.target.value)}
                      className={!passwordMatch && securitySettings.confirmPassword ? "border-red-500" : ""}
                    />
                    {!passwordMatch && securitySettings.confirmPassword && (
                      <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    onClick={handleChangePassword}
                    className="bg-[#319795] hover:bg-[#2C7A7B]"
                    disabled={isChangingPassword || !passwordMatch}
                  >
                    {isChangingPassword ? (
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
                    <Switch
                      id="two-factor"
                      checked={securitySettings.twoFactorEnabled}
                      onCheckedChange={handleToggle2FA}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (securitySettings.twoFactorEnabled) {
                        toast({
                          title: "2FA Setup",
                          description: "This would open the 2FA setup wizard in a real app",
                          variant: "info",
                        })
                      } else {
                        toast({
                          title: "2FA Not Enabled",
                          description: "Enable 2FA first to set it up",
                          variant: "info",
                        })
                      }
                    }}
                    disabled={!securitySettings.twoFactorEnabled}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Setup 2FA
                  </Button>
                  <Button
                    variant="outline"
                    className="text-destructive"
                    onClick={() => {
                      if (securitySettings.twoFactorEnabled) {
                        handleToggle2FA(false)
                      } else {
                        toast({
                          title: "2FA Not Enabled",
                          description: "2FA is already disabled",
                          variant: "info",
                        })
                      }
                    }}
                    disabled={!securitySettings.twoFactorEnabled}
                  >
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
                    <Select
                      value={languageSettings.displayLanguage}
                      onValueChange={(value) => handleLanguageChange("displayLanguage", value)}
                    >
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
                    <Select
                      value={languageSettings.region}
                      onValueChange={(value) => handleLanguageChange("region", value)}
                    >
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
                    <Select
                      value={languageSettings.dateFormat}
                      onValueChange={(value) => handleLanguageChange("dateFormat", value)}
                    >
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
                  <Button onClick={handleSaveLanguage} className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={isSaving}>
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
          </Tabs>
        </motion.div>
      </div>
    </motion.div>
  )
}

