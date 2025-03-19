"use client"

import { useState, useEffect, useRef } from "react"
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PomodoroTimer() {
  const [mode, setMode] = useState<"focus" | "shortBreak" | "longBreak">("focus")
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Set up audio element
    audioRef.current = new Audio("/notification.mp3") // This would be a real sound file in production

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    // Reset timer when mode changes
    switch (mode) {
      case "focus":
        setTimeLeft(25 * 60) // 25 minutes
        break
      case "shortBreak":
        setTimeLeft(5 * 60) // 5 minutes
        break
      case "longBreak":
        setTimeLeft(15 * 60) // 15 minutes
        break
    }
    setIsRunning(false)
  }, [mode])

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Timer completed
            clearInterval(timerRef.current!)
            setIsRunning(false)

            // Play sound if enabled
            if (soundEnabled && audioRef.current) {
              audioRef.current.play().catch((e) => console.error("Error playing sound:", e))
            }

            // If focus session completed, increment counter
            if (mode === "focus") {
              setCompletedPomodoros((prev) => prev + 1)

              // Auto switch to break
              if (completedPomodoros % 4 === 3) {
                // Every 4th pomodoro, take a long break
                setMode("longBreak")
              } else {
                setMode("shortBreak")
              }
            } else {
              // Auto switch back to focus after break
              setMode("focus")
            }

            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRunning, mode, completedPomodoros, soundEnabled])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const calculateProgress = () => {
    let total
    switch (mode) {
      case "focus":
        total = 25 * 60
        break
      case "shortBreak":
        total = 5 * 60
        break
      case "longBreak":
        total = 15 * 60
        break
      default:
        total = 25 * 60
    }

    return 100 - (timeLeft / total) * 100
  }

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    switch (mode) {
      case "focus":
        setTimeLeft(25 * 60)
        break
      case "shortBreak":
        setTimeLeft(5 * 60)
        break
      case "longBreak":
        setTimeLeft(15 * 60)
        break
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pomodoro Timer</CardTitle>
        <CardDescription>Stay focused with timed study sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={mode} onValueChange={(value) => setMode(value as any)}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="focus">Focus</TabsTrigger>
            <TabsTrigger value="shortBreak">Short Break</TabsTrigger>
            <TabsTrigger value="longBreak">Long Break</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col items-center justify-center py-6">
          <div className="text-5xl font-bold mb-6">{formatTime(timeLeft)}</div>
          <Progress value={calculateProgress()} className="w-full h-2" />
        </div>

        <div className="flex justify-center space-x-4">
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            className={isRunning ? "bg-red-500 hover:bg-red-600" : "bg-[#319795] hover:bg-[#2C7A7B]"}
            onClick={handleStartPause}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Start
              </>
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={() => setSoundEnabled(!soundEnabled)}>
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="auto-start" className="text-sm">
            Auto-start breaks
          </Label>
          <Switch id="auto-start" />
        </div>
        <div className="text-sm text-muted-foreground">
          Completed: <span className="font-medium">{completedPomodoros}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

