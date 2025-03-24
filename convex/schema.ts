import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  materials: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    type: v.string(),
    content: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    linkUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    subject: v.optional(v.string()),
    priority: v.optional(v.string()),
    userId: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  studyGroups: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    members: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_member", ["members"]),

  studySessions: defineTable({
    userId: v.string(),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    duration: v.optional(v.number()),
    focusScore: v.optional(v.number()),
    materials: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),

  analytics: defineTable({
    userId: v.string(),
    totalStudyTime: v.number(),
    focusScore: v.number(),
    materialsCount: v.number(),
    lastStudyDate: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user", ["userId"]),
}); 