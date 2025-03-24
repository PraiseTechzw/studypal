"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Calendar,
  FileText,
  Globe,
  Hash,
  Home,
  Plus,
  Users,
  BrainCircuit,
  Sparkles,
  Store,
  Clock,
  BarChart3,
  FileEdit,
  Settings,
  Lightbulb,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Logo } from "@/components/ui/logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const mainNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Text Notes", href: "/dashboard/notes", icon: FileText },
    { name: "PDF Documents", href: "/dashboard/documents", icon: BookOpen },
    { name: "Web Links", href: "/dashboard/links", icon: Globe },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Tags", href: "/dashboard/tags", icon: Hash },
    { name: "Study Groups", href: "/dashboard/groups", icon: Users },
  ]

  const aiFeatures = [
    { name: "AI Assistant", href: "/dashboard/ai-assistant", icon: BrainCircuit, isNew: true },
    { name: "Smart Tools", href: "/dashboard/smart-tools", icon: Sparkles },
    { name: "Resource Exchange", href: "/dashboard/resource-exchange", icon: Store },
  ]

  // Find the productivityTools array and add the exam generator as a new item
  const productivityTools = [
    { name: "Study Timer", href: "/dashboard/study-timer", icon: Clock, isNew: true },
    { name: "Analytics", href: "/dashboard/study-analytics", icon: BarChart3 },
    { name: "Collaborative Editor", href: "/dashboard/collaborative-editor", icon: FileEdit, isNew: true },
    { name: "Exam Generator", href: "/dashboard/exam-generator", icon: BookOpen, isNew: true },
  ]

  const settings = [
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Help & Feedback", href: "/dashboard/help", icon: Lightbulb },
  ]

  if (!isMounted) return null

  return (
    <motion.div
      className={cn("flex h-full flex-col bg-background border-r")}
      initial={{ width: isCollapsed ? 64 : 256 }}
      animate={{ width: isCollapsed ? 64 : 256 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-4">
        <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
          <AnimatePresence initial={false}>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Logo />
              </motion.div>
            )}
          </AnimatePresence>
          <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)} className="lg:flex hidden">
            <motion.div animate={{ rotate: isCollapsed ? 0 : 180 }} transition={{ duration: 0.3 }}>
              <ChevronRight className="h-4 w-4" />
            </motion.div>
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-2 overflow-y-auto">
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="py-2"
            >
              <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Resources</h2>
            </motion.div>
          )}
        </AnimatePresence>
        <TooltipProvider delayDuration={0}>
          <div className="space-y-1">
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2 transition-all duration-200",
                        isCollapsed && "justify-center",
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-4 h-4" />
                          <AnimatePresence initial={false}>
                            {!isCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
                </Tooltip>
              )
            })}
          </div>
        </TooltipProvider>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="py-2 mt-4"
            >
              <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">AI Features</h2>
            </motion.div>
          )}
        </AnimatePresence>
        <TooltipProvider delayDuration={0}>
          <div className="space-y-1">
            {aiFeatures.map((item) => {
              const isActive = pathname === item.href
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2 transition-all duration-200",
                        isCollapsed && "justify-center",
                        "relative",
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-4 h-4 text-[#319795]" />
                          <AnimatePresence initial={false}>
                            {!isCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        {!isCollapsed && item.isNew && (
                          <motion.span
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#319795] text-white"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          >
                            New
                          </motion.span>
                        )}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      {item.name} {item.isNew && <span className="text-[#319795]">(New)</span>}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </div>
        </TooltipProvider>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="py-2 mt-4"
            >
              <h2 className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Productivity
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
        <TooltipProvider delayDuration={0}>
          <div className="space-y-1">
            {productivityTools.map((item) => {
              const isActive = pathname === item.href
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn(
                        "w-full justify-start gap-2 transition-all duration-200",
                        isCollapsed && "justify-center",
                        "relative",
                      )}
                      asChild
                    >
                      <Link href={item.href}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2"
                        >
                          <item.icon className="w-4 h-4" />
                          <AnimatePresence initial={false}>
                            {!isCollapsed && (
                              <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                        {!isCollapsed && item.isNew && (
                          <motion.span
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded-full text-xs font-medium bg-[#319795] text-white"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                          >
                            New
                          </motion.span>
                        )}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent side="right">
                      {item.name} {item.isNew && <span className="text-[#319795]">(New)</span>}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}
          </div>
        </TooltipProvider>

        <div className="mt-auto pt-4">
          <TooltipProvider delayDuration={0}>
            <div className="space-y-1">
              {settings.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Tooltip key={item.name}>
                    <TooltipTrigger asChild>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-2 transition-all duration-200",
                          isCollapsed && "justify-center",
                        )}
                        asChild
                      >
                        <Link href={item.href}>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2"
                          >
                            <item.icon className="w-4 h-4" />
                            <AnimatePresence initial={false}>
                              {!isCollapsed && (
                                <motion.span
                                  initial={{ opacity: 0, width: 0 }}
                                  animate={{ opacity: 1, width: "auto" }}
                                  exit={{ opacity: 0, width: 0 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {item.name}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    {isCollapsed && <TooltipContent side="right">{item.name}</TooltipContent>}
                  </Tooltip>
                )
              })}
            </div>
          </TooltipProvider>
        </div>
      </nav>
      <div className="p-4 border-t">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className={cn(
              "gap-2 bg-[#319795] hover:bg-[#2C7A7B] w-full transition-all duration-200",
              isCollapsed && "px-0",
            )}
            onClick={() => {
              // Open the AddMaterial dialog by triggering a custom event
              document.dispatchEvent(new CustomEvent("open-add-material-dialog"))
            }}
          >
            <Plus className="w-4 h-4" />
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Add Resource
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

