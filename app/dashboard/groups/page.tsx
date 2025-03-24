"use client"

import { useState } from "react"
import { MessageSquare, Plus, Users, Calendar, Search, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function GroupsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const [newGroup, setNewGroup] = useState({
    name: "",
    description: "",
    subject: "",
    isPublic: true,
  })

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Biology Study Group",
      description: "Weekly study sessions for Biology 101",
      subject: "Biology",
      members: 5,
      messages: 12,
      isPublic: true,
      lastActive: "2 hours ago",
      upcomingEvents: 1,
    },
    {
      id: 2,
      name: "Physics Lab Team",
      description: "Collaboration for physics lab reports",
      subject: "Physics",
      members: 4,
      messages: 8,
      isPublic: true,
      lastActive: "1 day ago",
      upcomingEvents: 0,
    },
    {
      id: 3,
      name: "Math Help",
      description: "Peer tutoring for calculus",
      subject: "Mathematics",
      members: 8,
      messages: 24,
      isPublic: true,
      lastActive: "3 hours ago",
      upcomingEvents: 2,
    },
    {
      id: 4,
      name: "Chemistry Study Circle",
      description: "Organic chemistry study group",
      subject: "Chemistry",
      members: 6,
      messages: 15,
      isPublic: false,
      lastActive: "5 hours ago",
      upcomingEvents: 1,
    },
    {
      id: 5,
      name: "Literature Analysis",
      description: "Discussion group for literary works",
      subject: "Literature",
      members: 7,
      messages: 32,
      isPublic: true,
      lastActive: "Yesterday",
      upcomingEvents: 0,
    },
    {
      id: 6,
      name: "Computer Science Projects",
      description: "Collaborative coding and project work",
      subject: "Computer Science",
      members: 10,
      messages: 45,
      isPublic: false,
      lastActive: "Just now",
      upcomingEvents: 3,
    },
  ])

  const myGroups = [1, 2, 4, 6] // IDs of groups the user is a member of

  const handleCreateGroup = () => {
    if (!newGroup.name || !newGroup.description || !newGroup.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsCreatingGroup(true)

    // Simulate API call
    setTimeout(() => {
      const newId = groups.length + 1
      const createdGroup = {
        id: newId,
        name: newGroup.name,
        description: newGroup.description,
        subject: newGroup.subject,
        members: 1,
        messages: 0,
        isPublic: newGroup.isPublic,
        lastActive: "Just now",
        upcomingEvents: 0,
      }

      setGroups([createdGroup, ...groups])
      setNewGroup({
        name: "",
        description: "",
        subject: "",
        isPublic: true,
      })
      setIsCreatingGroup(false)

      toast({
        title: "Group Created",
        description: "Your study group has been created successfully",
        variant: "success",
      })

      // Navigate to the new group
      router.push(`/groups/${newId}`)
    }, 1000)
  }

  const filteredGroups = groups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#2D3748]">Study Groups</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#319795] hover:bg-[#2C7A7B]">
                <Plus className="h-4 w-4 mr-2" />
                Create Group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create Study Group</DialogTitle>
                <DialogDescription>Create a new study group to collaborate with your peers.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Group Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter group name"
                    value={newGroup.name}
                    onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={newGroup.subject}
                    onValueChange={(value) => setNewGroup({ ...newGroup, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Literature">Literature</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the purpose of your group"
                    value={newGroup.description}
                    onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor="isPublic" className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="isPublic"
                      className="rounded border-gray-300 text-[#319795] focus:ring-[#319795]"
                      checked={newGroup.isPublic}
                      onChange={(e) => setNewGroup({ ...newGroup, isPublic: e.target.checked })}
                    />
                    <span>Make this group public</span>
                  </Label>
                  <span className="text-xs text-muted-foreground">Public groups can be found and joined by anyone</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  className="bg-[#319795] hover:bg-[#2C7A7B]"
                  onClick={handleCreateGroup}
                  disabled={isCreatingGroup}
                >
                  {isCreatingGroup ? "Creating..." : "Create Group"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search study groups..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="biology">Biology</SelectItem>
                <SelectItem value="chemistry">Chemistry</SelectItem>
                <SelectItem value="physics">Physics</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
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

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Groups</TabsTrigger>
            <TabsTrigger value="my">My Groups</TabsTrigger>
            <TabsTrigger value="public">Public Groups</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGroups.map((group) => (
                <Link href={`/dashboard/groups/${group.id}`} key={group.id}>
                  <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between">
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        {!group.isPublic && (
                          <Badge variant="outline" className="text-xs">
                            Private
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge className="mb-2">{group.subject}</Badge>
                      <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{group.members} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{group.messages} messages</span>
                        </div>
                      </div>
                      {group.upcomingEvents > 0 && (
                        <div className="flex items-center gap-1 text-sm text-[#319795] mt-2">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>
                            {group.upcomingEvents} upcoming {group.upcomingEvents === 1 ? "event" : "events"}
                          </span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter className="text-xs text-muted-foreground">
                      <div className="w-full flex justify-between items-center">
                        <span>Active {group.lastActive}</span>
                        {myGroups.includes(group.id) ? (
                          <Badge variant="secondary">Member</Badge>
                        ) : (
                          <Button size="sm" className="bg-[#319795] hover:bg-[#2C7A7B]">
                            Join
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGroups
                .filter((group) => myGroups.includes(group.id))
                .map((group) => (
                  <Link href={`/groups/${group.id}`} key={group.id}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <div className="flex justify-between">
                          <CardTitle className="text-lg">{group.name}</CardTitle>
                          {!group.isPublic && (
                            <Badge variant="outline" className="text-xs">
                              Private
                            </Badge>
                          )}
                        </div>
                        <CardDescription>{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge className="mb-2">{group.subject}</Badge>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{group.members} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{group.messages} messages</span>
                          </div>
                        </div>
                        {group.upcomingEvents > 0 && (
                          <div className="flex items-center gap-1 text-sm text-[#319795] mt-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {group.upcomingEvents} upcoming {group.upcomingEvents === 1 ? "event" : "events"}
                            </span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        <div className="w-full flex justify-between items-center">
                          <span>Active {group.lastActive}</span>
                          <Badge variant="secondary">Member</Badge>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="public" className="mt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredGroups
                .filter((group) => group.isPublic)
                .map((group) => (
                  <Link href={`/groups/${group.id}`} key={group.id}>
                    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{group.name}</CardTitle>
                        <CardDescription>{group.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge className="mb-2">{group.subject}</Badge>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Users className="w-3.5 h-3.5" />
                            <span>{group.members} members</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{group.messages} messages</span>
                          </div>
                        </div>
                        {group.upcomingEvents > 0 && (
                          <div className="flex items-center gap-1 text-sm text-[#319795] mt-2">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>
                              {group.upcomingEvents} upcoming {group.upcomingEvents === 1 ? "event" : "events"}
                            </span>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="text-xs text-muted-foreground">
                        <div className="w-full flex justify-between items-center">
                          <span>Active {group.lastActive}</span>
                          {myGroups.includes(group.id) ? (
                            <Badge variant="secondary">Member</Badge>
                          ) : (
                            <Button size="sm" className="bg-[#319795] hover:bg-[#2C7A7B]">
                              Join
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

