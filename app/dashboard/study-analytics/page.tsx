"use client"

import { useState } from "react"
import { Calendar, Clock, BrainCircuit, BookOpen, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

export default function StudyAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("week")
  const [activeTab, setActiveTab] = useState("subjects")

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Study Analytics</h1>
            <p className="text-muted-foreground">Track your study habits and progress</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="semester">This Semester</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Study Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42.5 hrs</div>
              <p className="text-xs text-muted-foreground">+12% from last {timeRange}</p>
              <Progress value={68} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Resources Created</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">+8% from last {timeRange}</p>
              <Progress value={45} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Interactions</CardTitle>
              <BrainCircuit className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">78</div>
              <p className="text-xs text-muted-foreground">+32% from last {timeRange}</p>
              <Progress value={78} className="h-2 mt-3" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Goals</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/5</div>
              <p className="text-xs text-muted-foreground">60% completion rate</p>
              <Progress value={60} className="h-2 mt-3" />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-7">
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Study Time Distribution</CardTitle>
              <CardDescription>Hours spent studying by subject</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                {/* This would be a real chart in production */}
                <div className="flex h-full items-end gap-2 pb-6 pt-6">
                  <div className="relative flex h-full w-full flex-col justify-end">
                    <div className="absolute -left-[12px] bottom-0 top-0 flex w-6 flex-col justify-between py-2 text-xs text-muted-foreground">
                      <span>20h</span>
                      <span>15h</span>
                      <span>10h</span>
                      <span>5h</span>
                      <span>0h</span>
                    </div>
                    <div className="flex items-end gap-2 pl-6">
                      <div className="group flex flex-col items-center">
                        <div className="bg-primary h-[60%] w-9 rounded-md" />
                        <span className="mt-2 text-xs text-muted-foreground">Bio</span>
                      </div>
                      <div className="group flex flex-col items-center">
                        <div className="bg-[#319795] h-[80%] w-9 rounded-md" />
                        <span className="mt-2 text-xs text-muted-foreground">Chem</span>
                      </div>
                      <div className="group flex flex-col items-center">
                        <div className="bg-blue-500 h-[40%] w-9 rounded-md" />
                        <span className="mt-2 text-xs text-muted-foreground">Phys</span>
                      </div>
                      <div className="group flex flex-col items-center">
                        <div className="bg-amber-500 h-[70%] w-9 rounded-md" />
                        <span className="mt-2 text-xs text-muted-foreground">Math</span>
                      </div>
                      <div className="group flex flex-col items-center">
                        <div className="bg-green-500 h-[30%] w-9 rounded-md" />
                        <span className="mt-2 text-xs text-muted-foreground">Hist</span>
                      </div>
                      <div className="group flex flex-col items-center">
                        <div className="bg-purple-500 h-[25%] w-9 rounded-md" />
                        <span className="mt-2 text-xs text-muted-foreground">Lang</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Study Efficiency</CardTitle>
              <CardDescription>Productivity by time of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                {/* This would be a real chart in production */}
                <div className="flex h-full flex-col justify-between rounded-md border p-6">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#319795]" />
                    <span className="text-xs text-muted-foreground">Morning (6AM-12PM): High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-xs text-muted-foreground">Afternoon (12PM-6PM): Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    <span className="text-xs text-muted-foreground">Evening (6PM-12AM): Very High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-gray-500" />
                    <span className="text-xs text-muted-foreground">Night (12AM-6AM): Low</span>
                  </div>
                  <div className="mt-6 flex justify-between">
                    <div className="text-center">
                      <div className="text-2xl font-bold">8.5</div>
                      <div className="text-xs text-muted-foreground">Avg. Focus Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-xs text-muted-foreground">Pomodoros</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">85%</div>
                      <div className="text-xs text-muted-foreground">Completion Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
            <TabsTrigger value="resources">By Resource Type</TabsTrigger>
            <TabsTrigger value="time">By Time Period</TabsTrigger>
          </TabsList>
          <TabsContent value="subjects" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Biology", time: "12.5 hrs", progress: 78, resources: 8, aiUsage: "High" },
                { name: "Chemistry", time: "10.2 hrs", progress: 65, resources: 6, aiUsage: "Medium" },
                { name: "Physics", time: "8.3 hrs", progress: 42, resources: 5, aiUsage: "Low" },
                { name: "Mathematics", time: "7.8 hrs", progress: 56, resources: 7, aiUsage: "High" },
                { name: "History", time: "3.2 hrs", progress: 28, resources: 3, aiUsage: "Medium" },
                { name: "Languages", time: "2.5 hrs", progress: 15, resources: 2, aiUsage: "Low" },
              ].map((subject, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle>{subject.name}</CardTitle>
                    <CardDescription>{subject.time} studied</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{subject.progress}%</span>
                      </div>
                      <Progress value={subject.progress} className="h-2" />
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{subject.resources}</span>
                          <span className="text-xs text-muted-foreground">Resources</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{subject.aiUsage}</span>
                          <span className="text-xs text-muted-foreground">AI Usage</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="resources" className="mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                { type: "Notes", count: 15, usage: "8.5 hrs", efficiency: 85 },
                { type: "PDFs", count: 12, usage: "10.2 hrs", efficiency: 72 },
                { type: "Web Links", count: 8, usage: "5.5 hrs", efficiency: 68 },
                { type: "Flashcards", count: 6, usage: "4.8 hrs", efficiency: 92 },
                { type: "Quizzes", count: 4, usage: "3.2 hrs", efficiency: 88 },
                { type: "AI Summaries", count: 10, usage: "6.5 hrs", efficiency: 95 },
              ].map((resource, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle>{resource.type}</CardTitle>
                    <CardDescription>{resource.count} resources created</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Efficiency</span>
                        <span>{resource.efficiency}%</span>
                      </div>
                      <Progress value={resource.efficiency} className="h-2" />
                      <div className="pt-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{resource.usage}</span>
                          <span className="text-xs text-muted-foreground">Total Usage Time</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="time" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Study Pattern</CardTitle>
                <CardDescription>Hours studied by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  {/* This would be a real chart in production */}
                  <div className="flex h-full items-end gap-2 pb-6 pt-6">
                    <div className="relative flex h-full w-full flex-col justify-end">
                      <div className="absolute -left-[12px] bottom-0 top-0 flex w-6 flex-col justify-between py-2 text-xs text-muted-foreground">
                        <span>8h</span>
                        <span>6h</span>
                        <span>4h</span>
                        <span>2h</span>
                        <span>0h</span>
                      </div>
                      <div className="flex items-end gap-6 pl-6">
                        <div className="group flex flex-col items-center">
                          <div className="bg-primary h-[40%] w-12 rounded-md" />
                          <span className="mt-2 text-xs text-muted-foreground">Mon</span>
                        </div>
                        <div className="group flex flex-col items-center">
                          <div className="bg-primary h-[60%] w-12 rounded-md" />
                          <span className="mt-2 text-xs text-muted-foreground">Tue</span>
                        </div>
                        <div className="group flex flex-col items-center">
                          <div className="bg-primary h-[30%] w-12 rounded-md" />
                          <span className="mt-2 text-xs text-muted-foreground">Wed</span>
                        </div>
                        <div className="group flex flex-col items-center">
                          <div className="bg-primary h-[80%] w-12 rounded-md" />
                          <span className="mt-2 text-xs text-muted-foreground">Thu</span>
                        </div>
                        <div className="group flex flex-col items-center">
                          <div className="bg-primary h-[50%] w-12 rounded-md" />
                          <span className="mt-2 text-xs text-muted-foreground">Fri</span>
                        </div>
                        <div className="group flex flex-col items-center">
                          <div className="bg-primary h-[90%] w-12 rounded-md" />
                          <span className="mt-2 text-xs text-muted-foreground">Sat</span>
                        </div>
                        <div className="group flex flex-col items-center">
                          <div className="bg-primary h-[70%] w-12 rounded-md" />
                          <span className="mt-2 text-xs text-muted-foreground">Sun</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

