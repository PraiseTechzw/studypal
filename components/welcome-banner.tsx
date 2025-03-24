"use client"

import { motion } from "framer-motion"
import { Bell, BrainCircuit, BookOpen, Clock, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"

export function WelcomeBanner() {
  const { user } = useUser()
  const stats = useQuery(api.analytics.getStats)
  const [notificationCount, setNotificationCount] = useState(0)
  const { toast } = useToast()

  const getTimeOfDay = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "morning"
    if (hour < 17) return "afternoon"
    return "evening"
  }

  return (
    <Card className="border-none bg-gradient-to-r from-[#2D3748] to-[#319795] overflow-hidden relative">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full"
        animate={{
          x: [50, 30, 50],
          y: [-50, -30, -50],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full"
        animate={{
          x: [-20, 0, -20],
          y: [20, 0, 20],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">
              Good {getTimeOfDay()}, {user?.firstName || "Student"}! 👋
            </CardTitle>
            <CardDescription className="text-gray-200">
              Here's your study overview for today
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => toast.info("AI Assistant is ready to help you!")}
              >
                <BrainCircuit className="h-4 w-4" />
                AI Assistant
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="secondary"
                className="flex items-center gap-2"
                onClick={() => toast.info("You have new notifications!")}
              >
                <Bell className="h-4 w-4" />
                {notificationCount > 0 && (
                  <motion.span
                    className="bg-[#E53E3E] text-white text-xs rounded-full px-2 py-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    {notificationCount}
                  </motion.span>
                )}
                Notifications
              </Button>
            </motion.div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Total Materials",
              value: stats?.totalMaterials || 0,
              icon: BookOpen,
            },
            {
              title: "Study Time",
              value: `${Math.round((stats?.totalStudyTime || 0) / 60)}h`,
              icon: Clock,
            },
            {
              title: "Focus Score",
              value: `${stats?.focusScore || 0}%`,
              icon: Target,
            },
            {
              title: "Study Groups",
              value: stats?.studyGroups || 0,
              icon: Users,
            },
          ].map((stat) => (
            <motion.div
              key={stat.title}
              className="bg-white/10 rounded-lg p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(255, 255, 255, 0.15)" }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-gray-200">{stat.title}</p>
                  <motion.p
                    className="text-2xl font-bold text-white"
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 + 0.1 * index, type: "spring", stiffness: 300 }}
                  >
                    {stat.value}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

