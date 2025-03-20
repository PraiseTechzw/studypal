import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
      include: {
        analytics: true,
        materials: {
          select: {
            id: true,
            title: true,
            type: true,
            createdAt: true,
          },
        },
        studySessions: {
          select: {
            duration: true,
            focusScore: true,
            startTime: true,
          },
        },
      },
    });

    if (!userProfile) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Calculate quick stats
    const totalMaterials = userProfile.materials.length;
    const totalStudyTime = userProfile.studySessions.reduce(
      (acc, session) => acc + (session.duration || 0),
      0
    );
    const averageFocusScore = userProfile.studySessions.length
      ? userProfile.studySessions.reduce(
          (acc, session) => acc + (session.focusScore || 0),
          0
        ) / userProfile.studySessions.length
      : 0;

    return NextResponse.json({
      totalMaterials,
      totalStudyTime,
      averageFocusScore,
      lastStudyDate: userProfile.analytics?.lastStudyDate,
    });
  } catch (error) {
    console.error("[ANALYTICS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 