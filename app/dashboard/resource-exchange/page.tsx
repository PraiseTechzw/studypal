"use client"

import { useState } from "react"
import { Store, Search, Filter, Star, Download, BookOpen, FileText, Globe, Users, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ResourceExchangePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const resources = [
    {
      id: 1,
      title: "Advanced Cell Biology Notes",
      type: "note",
      subject: "Biology",
      author: "Emma Johnson",
      rating: 4.8,
      downloads: 342,
      tags: ["Cell Biology", "Mitochondria", "Advanced"],
    },
    {
      id: 2,
      title: "Quantum Physics Simplified",
      type: "pdf",
      subject: "Physics",
      author: "David Chen",
      rating: 4.5,
      downloads: 215,
      tags: ["Quantum", "Physics", "Beginner Friendly"],
    },
    {
      id: 3,
      title: "Organic Chemistry Reaction Guide",
      type: "note",
      subject: "Chemistry",
      author: "Sarah Williams",
      rating: 4.9,
      downloads: 567,
      tags: ["Chemistry", "Organic", "Reactions"],
    },
    {
      id: 4,
      title: "Interactive Calculus Visualizer",
      type: "link",
      subject: "Mathematics",
      author: "Michael Brown",
      rating: 4.3,
      downloads: 189,
      tags: ["Calculus", "Interactive", "Visualization"],
    },
    {
      id: 5,
      title: "Spanish Vocabulary Flashcards",
      type: "pdf",
      subject: "Languages",
      author: "Maria Garcia",
      rating: 4.7,
      downloads: 423,
      tags: ["Spanish", "Vocabulary", "Flashcards"],
    },
    {
      id: 6,
      title: "World History Timeline",
      type: "link",
      subject: "History",
      author: "James Wilson",
      rating: 4.4,
      downloads: 276,
      tags: ["History", "Timeline", "Reference"],
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

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-[#319795]" />
          <h1 className="text-2xl font-bold text-[#2D3748]">Resource Exchange</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input placeholder="Search for study materials..." className="pl-10" />
          </div>

          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="languages">Languages</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>

            <Button variant="outline" className="gap-2">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </Button>
          </div>
        </div>

        <Tabs defaultValue="discover">
          <TabsList>
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
            <TabsTrigger value="downloaded">Most Downloaded</TabsTrigger>
          </TabsList>

          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("grid")}
              className={viewMode === "grid" ? "bg-gray-100" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-grid-2x2"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M3 12h18" />
                <path d="M12 3v18" />
              </svg>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setViewMode("list")}
              className={viewMode === "list" ? "bg-gray-100" : ""}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-list"
              >
                <line x1="8" x2="21" y1="6" y2="6" />
                <line x1="8" x2="21" y1="12" y2="12" />
                <line x1="8" x2="21" y1="18" y2="18" />
                <line x1="3" x2="3.01" y1="6" y2="6" />
                <line x1="3" x2="3.01" y1="12" y2="12" />
                <line x1="3" x2="3.01" y1="18" y2="18" />
              </svg>
            </Button>
          </div>

          <TabsContent value="discover" className="mt-0">
            <div
              className={
                viewMode === "grid" ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4" : "flex flex-col gap-4 mt-4"
              }
            >
              {resources.map((resource) => (
                <Card key={resource.id} className={`group ${viewMode === "list" ? "flex flex-row" : ""}`}>
                  <CardHeader className={`${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-md bg-[#319795]/10">{getIcon(resource.type)}</div>
                        <div>
                          <h3 className="font-medium">{resource.title}</h3>
                          <p className="text-sm text-gray-500">{resource.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{resource.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className={`${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {resource.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="w-3.5 h-3.5" />
                      <span>By {resource.author}</span>
                    </div>
                  </CardContent>
                  <CardFooter className={`${viewMode === "list" ? "w-48" : ""}`}>
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Download className="w-3.5 h-3.5" />
                        <span>{resource.downloads}</span>
                      </div>
                      <Button size="sm" className="bg-[#319795] hover:bg-[#2C7A7B]">
                        Download
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium">Popular Resources</h3>
              <p className="text-gray-500">Discover the most popular study materials among students</p>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium">Recently Added</h3>
              <p className="text-gray-500">Browse the newest study materials added to the platform</p>
            </div>
          </TabsContent>

          <TabsContent value="downloaded">
            <div className="p-8 text-center">
              <h3 className="text-lg font-medium">Most Downloaded</h3>
              <p className="text-gray-500">Access the most downloaded study materials</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-center mt-4">
          <Button variant="outline" className="gap-2">
            Load More Resources
          </Button>
        </div>
      </div>
    </div>
  )
}

