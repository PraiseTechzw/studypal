import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { title, description, type, content, fileUrl, linkUrl, tags } = body;

    // Get or create user profile
    const userProfile = await prisma.userProfile.upsert({
      where: { clerkId: userId },
      update: {},
      create: {
        clerkId: userId,
        email: "", // You'll need to get this from Clerk
        firstName: "", // You'll need to get this from Clerk
        lastName: "", // You'll need to get this from Clerk
      },
    });

    // Create material with tags
    const material = await prisma.studyMaterial.create({
      data: {
        title,
        description,
        type,
        content,
        fileUrl,
        linkUrl,
        userId: userProfile.id,
        tags: {
          connectOrCreate: tags.map((tag: string) => ({
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
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { clerkId: userId },
    });

    if (!userProfile) {
      return new NextResponse("User not found", { status: 404 });
    }

    const materials = await prisma.studyMaterial.findMany({
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