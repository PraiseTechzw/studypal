import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, type, content, fileUrl, linkUrl, tags } = body;

    // Get or create user profile
    let userProfile = await db.userProfile.findUnique({
      where: { clerkId: userId },
    });

    if (!userProfile) {
      userProfile = await db.userProfile.create({
        data: {
          clerkId: userId,
          email: "", // This will be updated when user profile is created
        },
      });
    }

    // Create the study material
    const material = await db.studyMaterial.create({
      data: {
        title,
        description,
        type,
        content,
        fileUrl,
        linkUrl,
        userId: userProfile.id,
        tags: {
          connectOrCreate: tags?.map((tag: string) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json(material);
  } catch (error) {
    console.error("[MATERIALS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProfile = await db.userProfile.findUnique({
      where: { clerkId: userId },
    });

    if (!userProfile) {
      return new NextResponse("User not found", { status: 404 });
    }

    const materials = await db.studyMaterial.findMany({
      where: {
        userId: userProfile.id,
      },
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error("[MATERIALS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 