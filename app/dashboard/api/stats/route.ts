import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProfile = await db.userProfile.findUnique({
      where: { clerkId: userId },
      include: {
        materials: true,
        studyGroups: true,
        analytics: true,
      },
    });

    if (!userProfile) {
      return new NextResponse("User not found", { status: 404 });
    }

    const stats = {
      totalMaterials: userProfile.materials.length,
      totalStudyTime: userProfile.analytics?.totalStudyTime || 0,
      focusScore: userProfile.analytics?.focusScore || 0,
      studyGroups: userProfile.studyGroups.length,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("[STATS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 