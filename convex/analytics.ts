import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getStats = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;
    const analytics = await ctx.db
      .query("analytics")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!analytics) {
      return {
        totalMaterials: 0,
        totalStudyTime: 0,
        focusScore: 0,
        studyGroups: 0,
      };
    }

    const materials = await ctx.db
      .query("materials")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    const studyGroups = await ctx.db
      .query("studyGroups")
      .withIndex("by_member", (q) => q.eq("members", userId))
      .collect();

    return {
      totalMaterials: materials.length,
      totalStudyTime: analytics.totalStudyTime,
      focusScore: analytics.focusScore,
      studyGroups: studyGroups.length,
    };
  },
});

export const updateStudyTime = mutation({
  args: {
    duration: v.number(),
    focusScore: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;
    const now = Date.now();

    const analytics = await ctx.db
      .query("analytics")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (!analytics) {
      return await ctx.db.insert("analytics", {
        userId,
        totalStudyTime: args.duration,
        focusScore: args.focusScore || 0,
        materialsCount: 0,
        lastStudyDate: now,
        createdAt: now,
        updatedAt: now,
      });
    }

    return await ctx.db.patch(analytics._id, {
      totalStudyTime: analytics.totalStudyTime + args.duration,
      focusScore: args.focusScore
        ? Math.round((analytics.focusScore + args.focusScore) / 2)
        : analytics.focusScore,
      lastStudyDate: now,
      updatedAt: now,
    });
  },
}); 