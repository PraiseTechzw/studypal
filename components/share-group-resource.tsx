"use client"

import type React from "react"

import { useState } from "react"
import { FileText, BookOpen, Globe, Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

interface ShareGroupResourceProps {
  groupId: string | number
  onResourceShared?: (resource: any) => void
  onCancel?: () => void
}

export function ShareGroupResource({ groupId, onResourceShared, onCancel }: ShareGroupResourceProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("note")
  const [resourceData, setResourceData] = useState({
    title: "",
    description: "",
    content: "",
    url: "",
    file: null as File | null,
  })

  const handleInputChange = (field: string, value: any) => {
    setResourceData({
      ...resourceData,
      [field]: value,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResourceData({
        ...resourceData,
        file: e.target.files[0],
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!resourceData.title) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for the resource",
        variant: "destructive",
      })
      return
    }

    // Validate type-specific fields
    if (activeTab === "note" && !resourceData.content) {
      toast({
        title: "Missing Content",
        description: "Please provide content for the note",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "link" && !resourceData.url) {
      toast({
        title: "Missing URL",
        description: "Please provide a URL for the web link",
        variant: "destructive",
      })
      return
    }

    if (activeTab === "pdf" && !resourceData.file) {
      toast({
        title: "Missing File",
        description: "Please upload a PDF file",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newResource = {
        id: Math.floor(Math.random() * 1000),
        title: resourceData.title,
        description: resourceData.description,
        type: activeTab,
        content: resourceData.content,
        url: resourceData.url,
        fileName: resourceData.file?.name,
        groupId: groupId,
        addedBy: "Alex Johnson", // Current user
        addedAt: "Just now",
      }

      setIsSubmitting(false)

      toast({
        title: "Resource Shared",
        description: "Your resource has been shared with the group",
        variant: "success",
      })

      if (onResourceShared) {
        onResourceShared(newResource)
      }
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Resource with Group</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter resource title"
              value={resourceData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe this resource"
              value={resourceData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="note" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                Note
              </TabsTrigger>
              <TabsTrigger value="pdf" className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                PDF
              </TabsTrigger>
              <TabsTrigger value="link" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                Web Link
              </TabsTrigger>
            </TabsList>

            <TabsContent value="note" className="space-y-2 mt-4">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter your notes here"
                className="min-h-[200px]"
                value={resourceData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
              />
            </TabsContent>

            <TabsContent value="pdf" className="space-y-2 mt-4">
              <Label htmlFor="file">Upload PDF</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">
                  {resourceData.file ? resourceData.file.name : "Drag and drop your PDF here, or click to browse"}
                </p>
                <Input id="file" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
                <Button type="button" variant="outline" onClick={() => document.getElementById("file")?.click()}>
                  Browse Files
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="link" className="space-y-2 mt-4">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://"
                value={resourceData.url}
                onChange={(e) => handleInputChange("url", e.target.value)}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="bg-[#319795] hover:bg-[#2C7A7B]" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Sharing...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" />
                Share with Group
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

