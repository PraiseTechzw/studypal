"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useParams } from "next/navigation"
import {
  Users,
  MessageSquare,
  Calendar,
  Settings,
  Send,
  Plus,
  FileText,
  BookOpen,
  Globe,
  Clock,
  Info,
  Share2,
  UserPlus,
  LogOut,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ShareGroupResource } from "@/components/share-group-resource"
import { ScheduleGroupEvent } from "@/components/schedule-group-event"

export default function GroupDetailPage() {
  const params = useParams()
  const { toast } = useToast()
  const groupId = params.id
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("discussion")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [group, setGroup] = useState<any>(null)
  const [showAddResource, setShowAddResource] = useState(false)
  const [showScheduleEvent, setShowScheduleEvent] = useState(false)

  // Mock data for the group
  useEffect(() => {
    // Simulate API call to fetch group data
    setTimeout(() => {
      setGroup({
        id: groupId,
        name: "Biology Study Group",
        description:
          "Weekly study sessions for Biology 101. We focus on cellular biology, genetics, and ecology. Join us to prepare for exams and collaborate on assignments.",
        subject: "Biology",
        isPublic: true,
        createdAt: "2023-09-15",
        members: [
          { id: 1, name: "Alex Johnson", role: "owner", avatar: "/placeholder.svg", status: "online" },
          { id: 2, name: "Sarah Chen", role: "admin", avatar: "/placeholder.svg", status: "offline" },
          { id: 3, name: "Michael Brown", role: "member", avatar: "/placeholder.svg", status: "online" },
          { id: 4, name: "Emma Wilson", role: "member", avatar: "/placeholder.svg", status: "offline" },
          { id: 5, name: "David Kim", role: "member", avatar: "/placeholder.svg", status: "offline" },
        ],
        messages: [
          {
            id: 1,
            userId: 2,
            userName: "Sarah Chen",
            content: "Has anyone started the lab report yet?",
            timestamp: "2 days ago",
            avatar: "/placeholder.svg",
          },
          {
            id: 2,
            userId: 1,
            userName: "Alex Johnson",
            content: "I've completed the introduction section. I can share my notes if anyone needs them.",
            timestamp: "2 days ago",
            avatar: "/placeholder.svg",
          },
          {
            id: 3,
            userId: 3,
            userName: "Michael Brown",
            content: "That would be great! I'm struggling with the methodology part.",
            timestamp: "1 day ago",
            avatar: "/placeholder.svg",
          },
          {
            id: 4,
            userId: 2,
            userName: "Sarah Chen",
            content: "I found some good resources for the discussion section. I'll upload them to our shared folder.",
            timestamp: "1 day ago",
            avatar: "/placeholder.svg",
          },
          {
            id: 5,
            userId: 5,
            userName: "David Kim",
            content: "Thanks everyone! When are we meeting next to discuss the project?",
            timestamp: "5 hours ago",
            avatar: "/placeholder.svg",
          },
          {
            id: 6,
            userId: 1,
            userName: "Alex Johnson",
            content: "How about Thursday at 4pm in the library?",
            timestamp: "3 hours ago",
            avatar: "/placeholder.svg",
          },
          {
            id: 7,
            userId: 4,
            userName: "Emma Wilson",
            content: "Thursday works for me. I'll bring my notes from the lecture.",
            timestamp: "2 hours ago",
            avatar: "/placeholder.svg",
          },
        ],
        resources: [
          { id: 1, title: "Cell Biology Notes", type: "note", addedBy: "Alex Johnson", addedAt: "1 week ago" },
          { id: 2, title: "Lab Report Template", type: "pdf", addedBy: "Sarah Chen", addedAt: "5 days ago" },
          { id: 3, title: "Genetics Study Guide", type: "note", addedBy: "Michael Brown", addedAt: "3 days ago" },
          { id: 4, title: "Interactive Cell Diagram", type: "link", addedBy: "Emma Wilson", addedAt: "2 days ago" },
        ],
        events: [
          {
            id: 1,
            title: "Study Session",
            date: "2023-10-12T16:00:00",
            location: "Main Library, Room 204",
            description: "Review for midterm exam",
          },
          {
            id: 2,
            title: "Lab Report Workshop",
            date: "2023-10-15T14:30:00",
            location: "Science Building, Lab 3",
            description: "Work together on the upcoming lab report",
          },
          {
            id: 3,
            title: "Guest Lecture: Advances in Genetics",
            date: "2023-10-20T13:00:00",
            location: "Online (Zoom)",
            description: "Special lecture by Dr. James Wilson",
          },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [groupId])

  // Scroll to bottom of messages when they change
  useEffect(() => {
    if (activeTab === "discussion") {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [group?.messages, activeTab])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add the new message
    const newMessage = {
      id: group.messages.length + 1,
      userId: 1, // Current user
      userName: "Alex Johnson", // Current user
      content: message,
      timestamp: "Just now",
      avatar: "/placeholder.svg",
    }

    setGroup({
      ...group,
      messages: [...group.messages, newMessage],
    })

    setMessage("")
  }

  const handleResourceShared = (resource: any) => {
    setGroup({
      ...group,
      resources: [resource, ...group.resources],
    })
    setShowAddResource(false)
  }

  const handleEventCreated = (event: any) => {
    setGroup({
      ...group,
      events: [event, ...group.events],
    })
    setShowScheduleEvent(false)
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "note":
        return <FileText className="w-4 h-4" />
      case "pdf":
        return <BookOpen className="w-4 h-4" />
      case "link":
        return <Globe className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isLoading) {
    return (
      <div className="container p-4 sm:p-6 mx-auto">
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#319795]"></div>
            <p className="text-sm text-muted-foreground">Loading group...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!group) {
    return (
      <div className="container p-4 sm:p-6 mx-auto">
        <div className="flex items-center justify-center h-[calc(100vh-200px)]">
          <div className="flex flex-col items-center gap-2">
            <Info className="h-8 w-8 text-muted-foreground" />
            <p className="text-lg font-medium">Group not found</p>
            <p className="text-sm text-muted-foreground">
              The study group you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button className="mt-4" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#2D3748]">{group.name}</h1>
              {!group.isPublic && (
                <Badge variant="outline" className="text-xs">
                  Private
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground">{group.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(`https://studpal.app/groups/${group.id}`)
                    toast({
                      title: "Link Copied",
                      description: "Group link copied to clipboard",
                      variant: "success",
                    })
                  }}
                >
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem>Share via Email</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite Members</DialogTitle>
                  <DialogDescription>Invite your classmates to join this study group</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Email Addresses</Label>
                    <Textarea placeholder="Enter email addresses separated by commas" />
                  </div>
                  <div className="space-y-2">
                    <Label>Personal Message (Optional)</Label>
                    <Textarea placeholder="Add a personal message to your invitation" />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-[#319795] hover:bg-[#2C7A7B]">Send Invitations</Button>
                </div>
              </DialogContent>
            </Dialog>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Group</DropdownMenuItem>
                <DropdownMenuItem>Manage Members</DropdownMenuItem>
                <DropdownMenuItem>Notification Settings</DropdownMenuItem>
                <Separator className="my-1" />
                <DropdownMenuItem className="text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  Leave Group
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="discussion">
              <MessageSquare className="h-4 w-4 mr-2" />
              Discussion
            </TabsTrigger>
            <TabsTrigger value="resources">
              <FileText className="h-4 w-4 mr-2" />
              Resources
            </TabsTrigger>
            <TabsTrigger value="events">
              <Calendar className="h-4 w-4 mr-2" />
              Events
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discussion" className="mt-4">
            <Card className="h-[calc(100vh-300px)] flex flex-col">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Group Discussion</CardTitle>
                <CardDescription>Chat with group members about study materials, assignments, and more</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {group.messages.map((msg: any) => (
                    <div key={msg.id} className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={msg.avatar} alt={msg.userName} />
                        <AvatarFallback>{msg.userName[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{msg.userName}</span>
                          <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                        </div>
                        <p className="text-sm mt-1">{msg.content}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </CardContent>
              <CardFooter className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2 w-full">
                  <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={!message.trim()} className="bg-[#319795] hover:bg-[#2C7A7B]">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="resources" className="mt-4">
            {showAddResource ? (
              <ShareGroupResource
                groupId={groupId}
                onResourceShared={handleResourceShared}
                onCancel={() => setShowAddResource(false)}
              />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Shared Resources</CardTitle>
                    <CardDescription>Study materials shared by group members</CardDescription>
                  </div>
                  <Button className="bg-[#319795] hover:bg-[#2C7A7B]" onClick={() => setShowAddResource(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.resources.map((resource: any) => (
                      <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-gray-100 rounded-md">{getResourceIcon(resource.type)}</div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">
                              Added by {resource.addedBy} • {resource.addedAt}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="events" className="mt-4">
            {showScheduleEvent ? (
              <ScheduleGroupEvent
                groupId={groupId}
                onEventCreated={handleEventCreated}
                onCancel={() => setShowScheduleEvent(false)}
              />
            ) : (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle className="text-lg">Upcoming Events</CardTitle>
                    <CardDescription>Study sessions, meetings, and other group events</CardDescription>
                  </div>
                  <Button className="bg-[#319795] hover:bg-[#2C7A7B]" onClick={() => setShowScheduleEvent(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Event
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {group.events.map((event: any) => (
                      <div key={event.id} className="p-4 rounded-lg border">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{event.title}</h3>
                          <Badge variant="outline">{new Date(event.date) > new Date() ? "Upcoming" : "Past"}</Badge>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatEventDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                        <p className="text-sm mt-2">{event.description}</p>
                        <div className="flex justify-end mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="members" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Group Members</CardTitle>
                <CardDescription>{group.members.length} members in this group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {group.members.map((member: any) => (
                    <div key={member.id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant={member.role === "owner" ? "default" : "outline"} className="text-xs">
                              {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                            </Badge>
                            <span
                              className={`text-xs ${member.status === "online" ? "text-green-500" : "text-gray-500"}`}
                            >
                              {member.status === "online" ? "Online" : "Offline"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Message
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

