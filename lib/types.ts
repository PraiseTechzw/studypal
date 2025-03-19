// User types
export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: "student" | "teacher" | "admin"
  major?: string
  year?: string
  createdAt: Date
}

// Resource types
export type ResourceType = "note" | "pdf" | "link" | "flashcard" | "quiz"
export type PriorityLevel = "low" | "medium" | "high"

export interface Resource {
  id: string
  title: string
  type: ResourceType
  content?: string
  url?: string
  filePath?: string
  tags: string[]
  priority: PriorityLevel
  createdAt: Date
  updatedAt: Date
  userId: string
  isPublic: boolean
  isAiEnhanced: boolean
  collaborators?: string[]
  analytics?: ResourceAnalytics
}

export interface ResourceAnalytics {
  views: number
  downloads: number
  shares: number
  averageRating: number
  totalRatings: number
}

// Study Group types
export interface StudyGroup {
  id: string
  name: string
  description: string
  members: GroupMember[]
  resources: string[]
  events: StudyEvent[]
  createdAt: Date
  updatedAt: Date
  isPublic: boolean
}

export interface GroupMember {
  userId: string
  role: "owner" | "admin" | "member"
  joinedAt: Date
}

export interface StudyEvent {
  id: string
  title: string
  description?: string
  startTime: Date
  endTime: Date
  location?: string
  isOnline: boolean
  meetingUrl?: string
}

// AI types
export interface AIAssistantMessage {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

export interface AIAssistantConversation {
  id: string
  title: string
  messages: AIAssistantMessage[]
  createdAt: Date
  updatedAt: Date
}

export interface AIGenerationRequest {
  content: string
  type: "summary" | "flashcards" | "quiz" | "notes"
  options: Record<string, any>
}

export interface AIGenerationResult {
  id: string
  content: string
  type: "summary" | "flashcards" | "quiz" | "notes"
  createdAt: Date
  sourceId?: string
}

// Analytics types
export interface StudyAnalytics {
  totalStudyTime: number
  sessionsCompleted: number
  resourcesCreated: number
  resourcesAccessed: number
  aiInteractions: number
  weeklyProgress: WeeklyProgress[]
}

export interface WeeklyProgress {
  week: string
  studyTime: number
  resourcesAccessed: number
  aiInteractions: number
}

// Notification types
export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "system" | "resource" | "group" | "event" | "ai"
  isRead: boolean
  createdAt: Date
  resourceId?: string
  groupId?: string
  eventId?: string
}

