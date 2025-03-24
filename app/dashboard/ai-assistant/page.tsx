"use client"

import { useState, useRef, useEffect } from "react"
import { Send, BrainCircuit, Sparkles, Lightbulb, BookOpen, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useChat } from "ai/react"
import { LoadingDots } from "@/components/ui/loading-dots"

export default function AIAssistantPage() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [recentTopics, setRecentTopics] = useState([
    "Cell Biology",
    "Mitochondria",
    "Krebs Cycle",
    "Cellular Respiration",
  ])

  // Use the AI SDK's useChat hook
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/ai/chat",
    initialMessages: [
      {
        role: "assistant",
        content: "Hi there! I'm your StudPal AI Assistant. How can I help with your studies today?",
        id: "initial-message",
      },
    ],
    onFinish: (message) => {
      // Extract potential topics from the conversation
      const newTopics = extractTopics(message.content)
      if (newTopics.length > 0) {
        setRecentTopics((prev) => {
          const combined = [...newTopics, ...prev]
          // Remove duplicates and keep only the first 5
          return Array.from(new Set(combined)).slice(0, 5)
        })
      }
    },
  })

  // Extract potential topics from text
  const extractTopics = (text: string): string[] => {
    // This is a simple implementation - in a real app, you'd use NLP or the AI itself
    const words = text.split(/\s+/)
    return words.filter((word) => word.length > 5 && /^[A-Z]/.test(word)).slice(0, 3)
  }

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const suggestions = [
    "Explain the Krebs cycle in simple terms",
    "Help me understand quantum mechanics",
    "Create flashcards for Spanish vocabulary",
    "Summarize my biology notes",
    "Generate practice questions for calculus",
  ]

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col h-[calc(100vh-12rem)]">
          <h1 className="text-2xl font-bold text-[#2D3748] mb-4">AI Study Assistant</h1>

          <div className="flex-1 overflow-y-auto mb-4 border rounded-lg p-4 bg-gray-50">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user" ? "bg-[#319795] text-white" : "bg-white border shadow-sm"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-2 mb-2">
                      <BrainCircuit className="h-4 w-4 text-[#319795]" />
                      <span className="font-medium text-[#319795]">StudPal AI</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="max-w-[80%] rounded-lg p-3 bg-white border shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <BrainCircuit className="h-4 w-4 text-[#319795]" />
                    <span className="font-medium text-[#319795]">StudPal AI</span>
                  </div>
                  <LoadingDots color="text-[#319795]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask anything about your studies..."
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()} className="bg-[#319795] hover:bg-[#2C7A7B]">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Suggested Prompts</CardTitle>
              <CardDescription className="text-xs">Try asking the AI assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-sm h-auto py-2 px-3"
                  onClick={() => {
                    handleInputChange({ target: { value: suggestion } } as any)
                    // Submit after a short delay to allow the input to update
                    setTimeout(() => {
                      const form = document.querySelector("form")
                      if (form) form.dispatchEvent(new Event("submit", { cancelable: true }))
                    }, 100)
                  }}
                >
                  <Lightbulb className="h-3.5 w-3.5 mr-2 text-[#319795]" />
                  {suggestion}
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">AI Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="learn">
                <TabsList className="grid grid-cols-3 mb-2">
                  <TabsTrigger value="learn">Learn</TabsTrigger>
                  <TabsTrigger value="create">Create</TabsTrigger>
                  <TabsTrigger value="analyze">Analyze</TabsTrigger>
                </TabsList>
                <TabsContent value="learn" className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <Sparkles className="h-4 w-4 mt-0.5 text-[#319795]" />
                    <div>
                      <p className="text-xs font-medium">Explain Concepts</p>
                      <p className="text-xs text-muted-foreground">Get clear explanations on any topic</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <BookOpen className="h-4 w-4 mt-0.5 text-[#319795]" />
                    <div>
                      <p className="text-xs font-medium">Answer Questions</p>
                      <p className="text-xs text-muted-foreground">Get help with homework and assignments</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="create" className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <FileText className="h-4 w-4 mt-0.5 text-[#319795]" />
                    <div>
                      <p className="text-xs font-medium">Generate Flashcards</p>
                      <p className="text-xs text-muted-foreground">Create study materials automatically</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <Lightbulb className="h-4 w-4 mt-0.5 text-[#319795]" />
                    <div>
                      <p className="text-xs font-medium">Practice Questions</p>
                      <p className="text-xs text-muted-foreground">Generate quizzes to test your knowledge</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="analyze" className="space-y-2">
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <Sparkles className="h-4 w-4 mt-0.5 text-[#319795]" />
                    <div>
                      <p className="text-xs font-medium">Summarize Content</p>
                      <p className="text-xs text-muted-foreground">Get key points from your materials</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50">
                    <BrainCircuit className="h-4 w-4 mt-0.5 text-[#319795]" />
                    <div>
                      <p className="text-xs font-medium">Analyze Papers</p>
                      <p className="text-xs text-muted-foreground">Get insights from research papers</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Your Recent Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recentTopics.map((topic, index) => (
                  <Badge key={index} variant="secondary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

