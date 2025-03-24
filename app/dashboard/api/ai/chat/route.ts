import { type NextRequest, NextResponse } from "next/server"
import { streamText } from "ai"
import { gemini } from "@/lib/ai-client"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json()

    // Format the messages for the AI
    const formattedMessages = messages.map((message: any) => ({
      role: message.role,
      content: message.content,
    }))

    // Get the last user message
    const lastUserMessage = formattedMessages.filter((message: any) => message.role === "user").pop()?.content || ""

    // Create a system prompt
    const systemPrompt =
      "You are StudPal AI, a helpful study assistant. Provide concise, accurate information to help students with their studies. Be friendly and encouraging."

    // Stream the response
    const stream = streamText({
      model: gemini("gemini-1.5-pro"),
      prompt: lastUserMessage,
      system: systemPrompt,
    })

    return new NextResponse(stream.toReadableStream())
  } catch (error) {
    console.error("Error in AI chat API route:", error)
    return NextResponse.json({ error: "An error occurred processing your request" }, { status: 500 })
  }
}

