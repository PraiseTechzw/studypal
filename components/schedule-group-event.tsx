"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, MapPin, Video } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"

interface ScheduleGroupEventProps {
  groupId: string | number
  onEventCreated?: (event: any) => void
  onCancel?: () => void
}

export function ScheduleGroupEvent({ groupId, onEventCreated, onCancel }: ScheduleGroupEventProps) {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    isOnline: false,
    meetingLink: "",
    sendReminders: true,
  })

  const handleInputChange = (field: string, value: any) => {
    setEventData({
      ...eventData,
      [field]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!eventData.title || !eventData.date || !eventData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Validate location
    if (!eventData.isOnline && !eventData.location) {
      toast({
        title: "Missing Location",
        description: "Please provide a location for the in-person event",
        variant: "destructive",
      })
      return
    }

    // Validate meeting link
    if (eventData.isOnline && !eventData.meetingLink) {
      toast({
        title: "Missing Meeting Link",
        description: "Please provide a meeting link for the online event",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const newEvent = {
        id: Math.floor(Math.random() * 1000),
        title: eventData.title,
        date: `${eventData.date}T${eventData.time}:00`,
        location: eventData.isOnline ? "Online" : eventData.location,
        description: eventData.description,
        isOnline: eventData.isOnline,
        meetingLink: eventData.meetingLink,
        groupId: groupId,
        createdAt: new Date().toISOString(),
      }

      setIsSubmitting(false)

      toast({
        title: "Event Scheduled",
        description: "Your event has been scheduled successfully",
        variant: "success",
      })

      if (onEventCreated) {
        onEventCreated(newEvent)
      }
    }, 1000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Schedule Group Event</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Event Title</Label>
            <Input
              id="title"
              placeholder="Enter event title"
              value={eventData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="date"
                  type="date"
                  className="pl-10"
                  value={eventData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="time"
                  type="time"
                  className="pl-10"
                  value={eventData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Event Type</Label>
            <RadioGroup
              defaultValue="in-person"
              className="flex space-x-4"
              value={eventData.isOnline ? "online" : "in-person"}
              onValueChange={(value) => handleInputChange("isOnline", value === "online")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person" className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  In-Person
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="online" id="online" />
                <Label htmlFor="online" className="flex items-center gap-1">
                  <Video className="h-4 w-4" />
                  Online
                </Label>
              </div>
            </RadioGroup>
          </div>

          {eventData.isOnline ? (
            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link</Label>
              <Input
                id="meetingLink"
                placeholder="Enter meeting URL"
                value={eventData.meetingLink}
                onChange={(e) => handleInputChange("meetingLink", e.target.value)}
              />
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  id="location"
                  placeholder="Enter location"
                  className="pl-10"
                  value={eventData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the event"
              value={eventData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="sendReminders"
              checked={eventData.sendReminders}
              onCheckedChange={(checked) => handleInputChange("sendReminders", checked)}
            />
            <Label htmlFor="sendReminders">Send reminders to group members</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="bg-[#319795] hover:bg-[#2C7A7B]" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                Scheduling...
              </>
            ) : (
              <>Schedule Event</>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

