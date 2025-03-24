import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    type: v.string(),
    content: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    linkUrl: v.optional(v.string()),
    tags: v.array(v.string()),
    subject: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;
    const now = Date.now();

    return await ctx.db.insert("materials", {
      ...args,
      userId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const userId = identity.subject;
    return await ctx.db
      .query("materials")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getById = query({
  args: { id: v.id("materials") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const material = await ctx.db.get(args.id);
    if (!material) {
      throw new Error("Material not found");
    }

    if (material.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    return material;
  },
});

export const update = mutation({
  args: {
    id: v.id("materials"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    content: v.optional(v.string()),
    fileUrl: v.optional(v.string()),
    linkUrl: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    subject: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const { id, ...updates } = args;
    const material = await ctx.db.get(id);
    if (!material) {
      throw new Error("Material not found");
    }

    if (material.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("materials") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Unauthorized");
    }

    const material = await ctx.db.get(args.id);
    if (!material) {
      throw new Error("Material not found");
    }

    if (material.userId !== identity.subject) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id);
  },
}); 