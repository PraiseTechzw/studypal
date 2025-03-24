"use client"

import { BrainCircuit, FileText, BookOpen, Globe } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const handleAction = (action: string) => {
    // For resource creation actions, trigger the add material dialog
    if (action === "create-note" || action === "upload-pdf" || action === "save-link") {
      document.dispatchEvent(
        new CustomEvent("open-add-material-dialog", {
          detail: { type: action === "create-note" ? "note" : action === "upload-pdf" ? "pdf" : "link" },
        }),
      )
    } else {
      // For other actions, navigate to the appropriate page
      router.push(action)
    }
  }

  const actions = [
    {
      title: "Ask AI Assistant",
      description: "Get help with your studies",
      icon: BrainCircuit,
      color: "bg-[#319795]/10",
      textColor: "text-[#319795]",
      action: "/ai-assistant",
    },
    {
      title: "Create Note",
      description: "Write a new text note",
      icon: FileText,
      color: "bg-blue-100",
      textColor: "text-blue-600",
      action: "create-note",
    },
    {
      title: "Upload PDF",
      description: "Add a new document",
      icon: BookOpen,
      color: "bg-amber-100",
      textColor: "text-amber-600",
      action: "upload-pdf",
    },
    {
      title: "Save Link",
      description: "Bookmark a web resource",
      icon: Globe,
      color: "bg-purple-100",
      textColor: "text-purple-600",
      action: "save-link",
    },
    {
      title: "Generate Exam",
      description: "Create practice tests",
      icon: BookOpen,
      color: "bg-green-100",
      textColor: "text-green-600",
      action: "/exam-generator",
    },
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {actions.map((action, index) => (
            <div
              key={index}
              onClick={() => handleAction(action.action)}
              className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className={`p-3 rounded-full ${action.color} mb-2`}>
                <action.icon className={`h-5 w-5 ${action.textColor}`} />
              </div>
              <h3 className="text-sm font-medium">{action.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{action.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

