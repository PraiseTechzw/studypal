"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, FileText, Globe, Grid2X2, List, MoreVertical, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useToast } from "@/hooks/use-toast"
import { LoadingCard } from "@/components/ui/loading-card"

export function ResourceGrid() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  })

  const resources = [
    {
      id: 1,
      title: "Biology Notes - Chapter 5",
      type: "note",
      tags: ["Biology", "Semester 4"],
      priority: "high",
      date: "2024-02-20",
      aiEnhanced: true,
    },
    {
      id: 2,
      title: "Physics Lab Report",
      type: "pdf",
      tags: ["Physics", "Lab Work"],
      priority: "medium",
      date: "2024-02-18",
      aiEnhanced: false,
    },
    {
      id: 3,
      title: "Chemistry Reference",
      type: "link",
      tags: ["Chemistry", "Reference"],
      priority: "low",
      date: "2024-02-15",
      aiEnhanced: true,
    },
    {
      id: 4,
      title: "Calculus Formulas",
      type: "note",
      tags: ["Math", "Calculus"],
      priority: "medium",
      date: "2024-02-22",
      aiEnhanced: true,
    },
    {
      id: 5,
      title: "Spanish Vocabulary",
      type: "pdf",
      tags: ["Spanish", "Vocabulary"],
      priority: "low",
      date: "2024-02-10",
      aiEnhanced: false,
    },
    {
      id: 6,
      title: "History Timeline",
      type: "link",
      tags: ["History", "Reference"],
      priority: "medium",
      date: "2024-02-17",
      aiEnhanced: true,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="w-4 h-4" />
      case "pdf":
        return <BookOpen className="w-4 h-4" />
      case "link":
        return <Globe className="w-4 h-4" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-[#E53E3E] text-white"
      case "medium":
        return "bg-[#319795] text-white"
      case "low":
        return "bg-gray-500 text-white"
      default:
        return "bg-gray-200"
    }
  }

  const handleResourceAction = (resourceId: number, action: string) => {
    toast({
      title: `Resource ${action}`,
      description: `Resource #${resourceId} has been ${action.toLowerCase()}`,
      variant: "success",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-[#2D3748]">Your Resources</h2>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-gray-100 dark:bg-gray-800" : ""}
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-gray-100 dark:bg-gray-800" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <LoadingCard key={i} hasFooter={true} lines={2} />
          ))}
        </div>
      ) : (
        <motion.div
          className={viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" : "flex flex-col gap-4"}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.05,
              },
            },
          }}
        >
          <AnimatePresence>
            {resources.map((resource) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Card className={`group ${viewMode === "list" ? "flex flex-col sm:flex-row sm:items-center" : ""}`}>
                  <CardHeader
                    className={`flex flex-row items-start justify-between space-y-0 ${viewMode === "list" ? "flex-1" : ""}`}
                  >
                    <div className="flex items-center space-x-2">
                      {getIcon(resource.type)}
                      <span className="font-medium">{resource.title}</span>
                      {resource.aiEnhanced && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="cursor-help">
                                <Sparkles className="w-3.5 h-3.5 text-[#319795]" />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p className="text-xs">AI Enhanced</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      onClick={() => handleResourceAction(resource.id, "Opened")}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </CardHeader>
                  <CardContent className={viewMode === "list" ? "hidden sm:block" : ""}>
                    <div className="flex flex-wrap gap-2">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className={`flex justify-between ${viewMode === "list" ? "sm:w-48" : ""}`}>
                    <Badge className={getPriorityColor(resource.priority)}>{resource.priority}</Badge>
                    <span className="text-sm text-gray-500">{resource.date}</span>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  )
}

