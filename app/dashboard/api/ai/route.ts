import { type NextRequest, NextResponse } from "next/server"
import {
  generateAIResponse,
  generateSummary,
  generateFlashcards,
  generateQuiz,
  generateNotes,
  generateRecommendations,
  extractKeyConceptsAndTags,
} from "@/lib/ai-client"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, content, options } = body

    let result

    switch (action) {
      case "chat":
        result = await generateAIResponse(
          content,
          "You are StudPal AI, a helpful study assistant. Provide concise, accurate information to help students with their studies.",
        )
        break
      case "summarize":
        result = await generateSummary(content, options)
        break
      case "flashcards":
        result = await generateFlashcards(content, options)
        break
      case "quiz":
        result = await generateQuiz(content, options)
        break
      case "notes":
        result = await generateNotes(content, options)
        break
      case "recommendations":
        result = await generateRecommendations(options.recentTopics, options.studyHistory)
        break
      case "extract-tags":
        result = await extractKeyConceptsAndTags(content)
        break
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error in AI API route:", error)
    return NextResponse.json({ error: "An error occurred processing your request" }, { status: 500 })
  }
}

