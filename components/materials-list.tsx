"use client"

import { useEffect, useState } from "react"
import { File, Link2, BookOpen, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface Material {
  id: string
  title: string
  description: string
  type: string
  content: string
  fileUrl: string
  linkUrl: string
  tags: { name: string }[]
  subject: string
  priority: string
  createdAt: string
}

export function MaterialsList() {
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchMaterials()
  }, [])

  const fetchMaterials = async () => {
    try {
      const response = await fetch("/api/materials")
      if (!response.ok) {
        throw new Error("Failed to fetch materials")
      }
      const data = await response.json()
      setMaterials(data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load materials. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case "note":
        return <BookOpen className="w-5 h-5" />
      case "pdf":
        return <File className="w-5 h-5" />
      case "link":
        return <Link2 className="w-5 h-5" />
      default:
        return <File className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-20 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (materials.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No materials yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          Get started by adding your first study material.
        </p>
        <Button
          className="mt-4 bg-[#319795] hover:bg-[#2C7A7B]"
          onClick={() => document.dispatchEvent(new Event("open-add-material-dialog"))}
        >
          Add Material
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {materials.map((material) => (
        <Card key={material.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="flex items-center space-x-2">
              {getMaterialIcon(material.type)}
              <CardTitle className="text-lg">{material.title}</CardTitle>
            </div>
            <Badge variant="secondary" className={getPriorityColor(material.priority)}>
              {material.priority}
            </Badge>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 line-clamp-2">{material.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {material.tags.map((tag) => (
                <Badge key={tag.name} variant="outline" className="flex items-center">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag.name}
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-xs text-gray-500">
                {new Date(material.createdAt).toLocaleDateString()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  // TODO: Implement view material functionality
                  toast({
                    title: "Coming soon",
                    description: "View functionality will be available soon.",
                  })
                }}
              >
                View
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 