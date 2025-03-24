"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface AIOptions {
  [key: string]: any
}

export function useAI() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const { toast } = useToast()

  const generateAIContent = async (action: string, content: string, options?: AIOptions) => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action,
          content,
          options,
        }),
      })

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setResult(data.text)
      return data.text
    } catch (error) {
      console.error("Error generating AI content:", error)
      toast({
        title: "Error",
        description: "Failed to generate AI content. Please try again.",
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isLoading,
    result,
    generateAIContent,
  }
}

