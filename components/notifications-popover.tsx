"use client"

import { useState } from "react"
import { Bell, BookOpen, Calendar, MessageSquare, Sparkles, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotificationsPopover() {
  const [open, setOpen] = useState(false)

  const notifications = [
    {
      id: "1",
      title: "New AI Summary Available",
      message: "Your Biology notes have been summarized by AI",
      time: "10 minutes ago",
      type: "ai",
      read: false,
    },
    {
      id: "2",
      title: "Study Group Invitation",
      message: "Sarah invited you to join 'Biology 101 Study Group'",
      time: "1 hour ago",
      type: "group",
      read: false,
    },
    {
      id: "3",
      title: "Resource Shared With You",
      message: "Michael shared 'Physics Lab Notes' with you",
      time: "3 hours ago",
      type: "resource",
      read: true,
    },
    {
      id: "4",
      title: "Upcoming Study Session",
      message: "Chemistry study session starts in 30 minutes",
      time: "30 minutes ago",
      type: "event",
      read: true,
    },
    {
      id: "5",
      title: "AI Assistant Response",
      message: "Your question about mitochondria has been answered",
      time: "2 hours ago",
      type: "ai",
      read: true,
    },
  ]

  const unreadCount = notifications.filter((n) => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case "ai":
        return <Sparkles className="h-4 w-4 text-[#319795]" />
      case "group":
        return <Users className="h-4 w-4 text-blue-500" />
      case "resource":
        return <BookOpen className="h-4 w-4 text-amber-500" />
      case "event":
        return <Calendar className="h-4 w-4 text-green-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && <span className="absolute top-0 right-0 h-2 w-2 bg-[#E53E3E] rounded-full" />}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <h4 className="font-medium">Notifications</h4>
            <TabsList className="grid grid-cols-2 h-8">
              <TabsTrigger value="all" className="text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="unread" className="text-xs">
                Unread
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="m-0">
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-3 hover:bg-muted/50 ${!notification.read ? "bg-muted/30" : ""}`}
                >
                  <div className="mt-1">{getIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{notification.title}</p>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.time}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <div className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                Mark all as read
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="unread" className="m-0">
            <ScrollArea className="h-[300px]">
              {notifications
                .filter((n) => !n.read)
                .map((notification) => (
                  <div key={notification.id} className="flex items-start gap-3 p-3 hover:bg-muted/50 bg-muted/30">
                    <div className="mt-1">{getIcon(notification.type)}</div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  </div>
                ))}
            </ScrollArea>
            <div className="p-2 border-t">
              <Button variant="ghost" size="sm" className="w-full text-xs">
                Mark all as read
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}

