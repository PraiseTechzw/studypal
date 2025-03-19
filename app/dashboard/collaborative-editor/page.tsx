"use client"

import { useState } from "react"
import { Save, Users, History, FileText, Lock, LockOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CollaborativeEditorPage() {
  const [documentTitle, setDocumentTitle] = useState("Biology Notes - Chapter 5")
  const [isEditing, setIsEditing] = useState(true)
  const [content, setContent] = useState(`# Cell Structure and Function

## Introduction
The cell is the basic structural, functional, and biological unit of all known living organisms. A cell is the smallest unit of life that can replicate independently.

## Key Components

### Cell Membrane
- Surrounds the cell and controls what enters and exits
- Made of phospholipid bilayer with embedded proteins

### Nucleus
- Contains the cell's genetic material (DNA)
- Controls the cell's activities

### Cytoplasm
- Gel-like substance where organelles are suspended
- Site of many cellular reactions

### Mitochondria
- Known as the "powerhouse of the cell"
- Generates energy through ATP production
- Has its own DNA

## Types of Cells

1. **Prokaryotic Cells**
   - No nucleus or membrane-bound organelles
   - Example: Bacteria

2. **Eukaryotic Cells**
   - Has a nucleus and membrane-bound organelles
   - Examples: Plant and animal cells

## Cell Division
- Process by which cells reproduce
- Types: Mitosis and Meiosis

## Questions for Review
1. What is the function of the cell membrane?
2. Why are mitochondria called the "powerhouse of the cell"?
3. Compare and contrast prokaryotic and eukaryotic cells.`)

  const collaborators = [
    { id: 1, name: "Alex Johnson", avatar: "/placeholder.svg", status: "editing" },
    { id: 2, name: "Sarah Chen", avatar: "/placeholder.svg", status: "viewing" },
    { id: 3, name: "Michael Brown", avatar: "/placeholder.svg", status: "offline" },
  ]

  const versions = [
    { id: 1, author: "Alex Johnson", timestamp: "10 minutes ago", changes: "Added section on mitochondria" },
    { id: 2, author: "Sarah Chen", timestamp: "1 hour ago", changes: "Updated introduction" },
    { id: 3, author: "Michael Brown", timestamp: "2 hours ago", changes: "Created document" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "editing":
        return "bg-green-500"
      case "viewing":
        return "bg-blue-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#319795]" />
            <Input
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="text-xl font-bold border-none focus-visible:ring-0 p-0 h-auto"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {collaborators
                .filter((c) => c.status !== "offline")
                .map((user) => (
                  <div key={user.id} className="relative">
                    <Avatar className="border-2 border-background">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full ${getStatusColor(user.status)} ring-2 ring-background`}
                    ></span>
                  </div>
                ))}
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Users className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <History className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Save className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Save</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? (
                <>
                  <Lock className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Lock</span>
                </>
              ) : (
                <>
                  <LockOpen className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Edit</span>
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <Card>
            <CardContent className="p-0">
              <Tabs defaultValue="edit">
                <TabsList className="w-full rounded-none border-b">
                  <TabsTrigger value="edit" className="rounded-none">
                    Edit
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="rounded-none">
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="ai" className="rounded-none">
                    AI Tools
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="edit" className="m-0 p-4">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[60vh] font-mono text-sm border-none focus-visible:ring-0 p-0 resize-none"
                    disabled={!isEditing}
                  />
                </TabsContent>
                <TabsContent value="preview" className="m-0 p-6">
                  <div className="prose max-w-none dark:prose-invert">
                    <h1>Cell Structure and Function</h1>
                    <h2>Introduction</h2>
                    <p>
                      The cell is the basic structural, functional, and biological unit of all known living organisms. A
                      cell is the smallest unit of life that can replicate independently.
                    </p>
                    <h2>Key Components</h2>
                    <h3>Cell Membrane</h3>
                    <ul>
                      <li>Surrounds the cell and controls what enters and exits</li>
                      <li>Made of phospholipid bilayer with embedded proteins</li>
                    </ul>
                    <h3>Nucleus</h3>
                    <ul>
                      <li>Contains the cell's genetic material (DNA)</li>
                      <li>Controls the cell's activities</li>
                    </ul>
                    <h3>Cytoplasm</h3>
                    <ul>
                      <li>Gel-like substance where organelles are suspended</li>
                      <li>Site of many cellular reactions</li>
                    </ul>
                    <h3>Mitochondria</h3>
                    <ul>
                      <li>Known as the "powerhouse of the cell"</li>
                      <li>Generates energy through ATP production</li>
                      <li>Has its own DNA</li>
                    </ul>
                    <h2>Types of Cells</h2>
                    <ol>
                      <li>
                        <strong>Prokaryotic Cells</strong>
                        <ul>
                          <li>No nucleus or membrane-bound organelles</li>
                          <li>Example: Bacteria</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Eukaryotic Cells</strong>
                        <ul>
                          <li>Has a nucleus and membrane-bound organelles</li>
                          <li>Examples: Plant and animal cells</li>
                        </ul>
                      </li>
                    </ol>
                    <h2>Cell Division</h2>
                    <ul>
                      <li>Process by which cells reproduce</li>
                      <li>Types: Mitosis and Meiosis</li>
                    </ul>
                    <h2>Questions for Review</h2>
                    <ol>
                      <li>What is the function of the cell membrane?</li>
                      <li>Why are mitochondria called the "powerhouse of the cell"?</li>
                      <li>Compare and contrast prokaryotic and eukaryotic cells.</li>
                    </ol>
                  </div>
                </TabsContent>
                <TabsContent value="ai" className="m-0 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">AI Tools</h3>
                      <p className="text-sm text-muted-foreground mb-4">Enhance your document with AI-powered tools</p>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start text-sm h-auto py-2">
                          <span className="bg-[#319795]/10 p-1.5 rounded-md mr-2">
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
                              className="text-[#319795]"
                            >
                              <path d="M12 3v12" />
                              <path d="m8 11 4 4 4-4" />
                              <path d="M8 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-4" />
                            </svg>
                          </span>
                          Summarize
                        </Button>
                        <Button variant="outline" className="justify-start text-sm h-auto py-2">
                          <span className="bg-[#319795]/10 p-1.5 rounded-md mr-2">
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
                              className="text-[#319795]"
                            >
                              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                              <polyline points="14 2 14 8 20 8" />
                              <path d="M16 13H8" />
                              <path d="M16 17H8" />
                              <path d="M10 9H8" />
                            </svg>
                          </span>
                          Generate Flashcards
                        </Button>
                        <Button variant="outline" className="justify-start text-sm h-auto py-2">
                          <span className="bg-[#319795]/10 p-1.5 rounded-md mr-2">
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
                              className="text-[#319795]"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                              <path d="M12 17h.01" />
                            </svg>
                          </span>
                          Create Quiz
                        </Button>
                        <Button variant="outline" className="justify-start text-sm h-auto py-2">
                          <span className="bg-[#319795]/10 p-1.5 rounded-md mr-2">
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
                              className="text-[#319795]"
                            >
                              <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
                              <line x1="16" x2="2" y1="8" y2="22" />
                              <line x1="17.5" x2="9" y1="15" y2="15" />
                            </svg>
                          </span>
                          Improve Writing
                        </Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="text-lg font-medium mb-2">AI Suggestions</h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-muted/50 rounded-md">
                          <p className="text-sm font-medium">Add a section on cell organelles</p>
                          <p className="text-xs text-muted-foreground">
                            Your notes could benefit from more details about other organelles like ribosomes, Golgi
                            apparatus, and endoplasmic reticulum.
                          </p>
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-xs h-7">
                              Ignore
                            </Button>
                            <Button size="sm" className="text-xs h-7 bg-[#319795] hover:bg-[#2C7A7B]">
                              Generate Content
                            </Button>
                          </div>
                        </div>
                        <div className="p-3 bg-muted/50 rounded-md">
                          <p className="text-sm font-medium">Add diagrams or illustrations</p>
                          <p className="text-xs text-muted-foreground">
                            Visual aids would help explain cell structure concepts more clearly.
                          </p>
                          <div className="flex justify-end mt-2">
                            <Button variant="ghost" size="sm" className="text-xs h-7">
                              Ignore
                            </Button>
                            <Button size="sm" className="text-xs h-7 bg-[#319795] hover:bg-[#2C7A7B]">
                              Generate Images
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={isEditing ? "default" : "outline"}>{isEditing ? "Editing" : "Locked"}</Badge>
                    <Badge variant="outline">Collaborative</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Tags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <Badge variant="secondary">Biology</Badge>
                    <Badge variant="secondary">Cell Structure</Badge>
                    <Badge variant="secondary">Notes</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Visibility</p>
                  <Select defaultValue="collaborators">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="collaborators">Collaborators Only</SelectItem>
                      <SelectItem value="public">Public</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Collaborators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {collaborators.map((user) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground capitalize">{user.status}</p>
                      </div>
                    </div>
                    <Select defaultValue="editor">
                      <SelectTrigger className="h-8 w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="owner">Owner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
                <Button variant="outline" className="w-full text-sm">
                  <Users className="h-3.5 w-3.5 mr-2" />
                  Invite More
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Version History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {versions.map((version) => (
                  <div key={version.id} className="flex items-start gap-2">
                    <History className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{version.author}</p>
                      <p className="text-xs text-muted-foreground">
                        {version.changes} • {version.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

