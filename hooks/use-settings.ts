"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

// Define types for our settings
export interface AccountSettings {
  name: string
  email: string
  major: string
  year: string
  profilePicture: string
}

export interface AppearanceSettings {
  themeMode: string
  fontSize: string
}

export interface NotificationSettings {
  emailNotifications: boolean
  pushNotifications: boolean
  deadlineReminders: boolean
  studyGroupUpdates: boolean
  aiRecommendations: boolean
}

export interface SecuritySettings {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  twoFactorEnabled: boolean
}

export interface LanguageSettings {
  displayLanguage: string
  region: string
  dateFormat: string
}

// Default settings
const defaultAccountSettings: AccountSettings = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  major: "cs",
  year: "junior",
  profilePicture: "/placeholder.svg",
}

const defaultAppearanceSettings: AppearanceSettings = {
  themeMode: "system",
  fontSize: "medium",
}

const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  pushNotifications: true,
  deadlineReminders: true,
  studyGroupUpdates: true,
  aiRecommendations: true,
}

const defaultSecuritySettings: SecuritySettings = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
  twoFactorEnabled: false,
}

const defaultLanguageSettings: LanguageSettings = {
  displayLanguage: "en-US",
  region: "us",
  dateFormat: "mdy",
}

export function useSettings() {
  const { theme, setTheme } = useTheme()
  const [isLoaded, setIsLoaded] = useState(false)

  // State for each settings category
  const [accountSettings, setAccountSettings] = useState<AccountSettings>(defaultAccountSettings)
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>(defaultAppearanceSettings)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(defaultNotificationSettings)
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>(defaultSecuritySettings)
  const [languageSettings, setLanguageSettings] = useState<LanguageSettings>(defaultLanguageSettings)

  // Load settings from localStorage on initial render
  useEffect(() => {
    const loadSettings = () => {
      try {
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
        } else if (theme) {
          // If no saved appearance but theme is set
          setAppearanceSettings((prev) => ({
            ...prev,
            themeMode: theme,
          }))
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

        setIsLoaded(true)
      } catch (error) {
        console.error("Error loading settings:", error)
        setIsLoaded(true)
      }
    }

    loadSettings()
  }, [setTheme, theme])

  // Save settings to localStorage
  const saveAccountSettings = (settings: AccountSettings) => {
    setAccountSettings(settings)
    localStorage.setItem("studpal_account", JSON.stringify(settings))
  }

  const saveAppearanceSettings = (settings: AppearanceSettings) => {
    setAppearanceSettings(settings)
    localStorage.setItem("studpal_appearance", JSON.stringify(settings))

    // Apply theme
    if (settings.themeMode) {
      setTheme(settings.themeMode)
    }
  }

  const saveNotificationSettings = (settings: NotificationSettings) => {
    setNotificationSettings(settings)
    localStorage.setItem("studpal_notifications", JSON.stringify(settings))
  }

  const saveSecuritySettings = (settings: SecuritySettings) => {
    // Don't save passwords to localStorage
    const securityToSave = {
      twoFactorEnabled: settings.twoFactorEnabled,
    }

    setSecuritySettings(settings)
    localStorage.setItem("studpal_security", JSON.stringify(securityToSave))
  }

  const saveLanguageSettings = (settings: LanguageSettings) => {
    setLanguageSettings(settings)
    localStorage.setItem("studpal_language", JSON.stringify(settings))
  }

  return {
    isLoaded,
    accountSettings,
    appearanceSettings,
    notificationSettings,
    securitySettings,
    languageSettings,
    saveAccountSettings,
    saveAppearanceSettings,
    saveNotificationSettings,
    saveSecuritySettings,
    saveLanguageSettings,
  }
}

