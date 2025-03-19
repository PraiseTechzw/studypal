import { Sparkles, BookOpen, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AiRecommendations() {
  const recommendations = [
    {
      title: "Cell Biology Fundamentals",
      type: "note",
      reason: "Based on your recent Biology studies",
      icon: FileText,
    },
    {
      title: "Advanced Mitochondria Research",
      type: "pdf",
      reason: "Complements your Chapter 5 notes",
      icon: BookOpen,
    },
    {
      title: "Interactive Cell Visualization",
      type: "link",
      reason: "Visual aid for cell structure learning",
      icon: ExternalLink,
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#319795]" />
            <CardTitle className="text-sm font-medium">AI Recommendations</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-xs text-[#319795]">
            View All
          </Button>
        </div>
        <CardDescription className="text-xs pt-1">Personalized resources based on your study patterns</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="space-y-3">
          {recommendations.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-2 rounded-md hover:bg-gray-50 transition-colors">
              <div className="mt-0.5 bg-[#319795]/10 p-1.5 rounded-md">
                <item.icon className="h-3.5 w-3.5 text-[#319795]" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

