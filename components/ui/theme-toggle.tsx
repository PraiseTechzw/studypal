"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light")
            // Save to localStorage
            const savedAppearance = localStorage.getItem("studpal_appearance")
            if (savedAppearance) {
              const parsedAppearance = JSON.parse(savedAppearance)
              localStorage.setItem(
                "studpal_appearance",
                JSON.stringify({
                  ...parsedAppearance,
                  themeMode: "light",
                }),
              )
            } else {
              localStorage.setItem(
                "studpal_appearance",
                JSON.stringify({
                  themeMode: "light",
                  fontSize: "medium",
                }),
              )
            }
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark")
            // Save to localStorage
            const savedAppearance = localStorage.getItem("studpal_appearance")
            if (savedAppearance) {
              const parsedAppearance = JSON.parse(savedAppearance)
              localStorage.setItem(
                "studpal_appearance",
                JSON.stringify({
                  ...parsedAppearance,
                  themeMode: "dark",
                }),
              )
            } else {
              localStorage.setItem(
                "studpal_appearance",
                JSON.stringify({
                  themeMode: "dark",
                  fontSize: "medium",
                }),
              )
            }
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system")
            // Save to localStorage
            const savedAppearance = localStorage.getItem("studpal_appearance")
            if (savedAppearance) {
              const parsedAppearance = JSON.parse(savedAppearance)
              localStorage.setItem(
                "studpal_appearance",
                JSON.stringify({
                  ...parsedAppearance,
                  themeMode: "system",
                }),
              )
            } else {
              localStorage.setItem(
                "studpal_appearance",
                JSON.stringify({
                  themeMode: "system",
                  fontSize: "medium",
                }),
              )
            }
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

