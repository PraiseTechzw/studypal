import { PomodoroTimer } from "@/components/pomodoro-timer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, BarChart3, Target } from "lucide-react"

export default function StudyTimerPage() {
  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <h1 className="text-2xl font-bold text-foreground">Study Timer</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <PomodoroTimer />

          <Card>
            <CardHeader>
              <CardTitle>Study Sessions</CardTitle>
              <CardDescription>Your recent focus sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="today">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="week">This Week</TabsTrigger>
                  <TabsTrigger value="month">This Month</TabsTrigger>
                </TabsList>
                <TabsContent value="today" className="space-y-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Biology Focus Session</p>
                        <p className="text-xs text-muted-foreground">9:30 AM - 10:30 AM</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">4 pomodoros</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Chemistry Study</p>
                        <p className="text-xs text-muted-foreground">1:15 PM - 2:45 PM</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">6 pomodoros</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Math Problem Set</p>
                        <p className="text-xs text-muted-foreground">4:00 PM - 5:30 PM</p>
                      </div>
                    </div>
                    <div className="text-sm font-medium">3 pomodoros</div>
                  </div>
                </TabsContent>
                <TabsContent value="week" className="mt-4">
                  <div className="flex items-center justify-center p-6 text-center">
                    <p className="text-muted-foreground">You've completed 28 pomodoros this week!</p>
                  </div>
                </TabsContent>
                <TabsContent value="month" className="mt-4">
                  <div className="flex items-center justify-center p-6 text-center">
                    <p className="text-muted-foreground">You've completed 112 pomodoros this month!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Focus</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.5 hrs</div>
              <p className="text-xs text-muted-foreground">13 pomodoros completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Average</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.2 hrs</div>
              <p className="text-xs text-muted-foreground">Per day this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.5/10</div>
              <p className="text-xs text-muted-foreground">Based on completion rate</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

