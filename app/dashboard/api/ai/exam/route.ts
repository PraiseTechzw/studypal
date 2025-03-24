import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { gemini } from "@/lib/ai-client"

export const runtime = "nodejs"

export async function POST(request: NextRequest) {
  try {
    const { subject, topic, difficulty, questionCount, questionTypes, includeAnswers, includeExplanations } =
      await request.json()

    // Validate required fields
    if (!subject || !topic) {
      return NextResponse.json({ error: "Subject and topic are required" }, { status: 400 })
    }

    // Create a detailed prompt for the AI
    const prompt = `Generate a practice exam for ${subject} focusing on ${topic}.
    
    Details:
    - Difficulty level: ${difficulty}
    - Number of questions: ${questionCount}
    - Question types: ${questionTypes.join(", ")}
    - Include answers: ${includeAnswers ? "Yes" : "No"}
    - Include explanations: ${includeExplanations ? "Yes" : "No"}
    
    Format the exam with clear sections, numbered questions, and ${includeAnswers ? "answers" : "no answers"}.
    ${includeExplanations ? "For each answer, provide a brief explanation of why it's correct." : ""}
    
    Make sure the questions are challenging but appropriate for the ${difficulty} difficulty level.
    For multiple-choice questions, provide 4 options (A, B, C, D) with only one correct answer.
    For true/false questions, clearly state whether the statement is true or false.
    For short-answer questions, provide a model answer that would be considered correct.
    For fill-in-the-blank questions, clearly indicate the blank with underscores and provide the correct word or phrase.`

    // System prompt to guide the AI
    const systemPrompt = `You are an expert educator and exam creator. Create high-quality, accurate practice exams that test understanding and knowledge of the subject matter. Format the exam professionally with clear sections and numbering.`

    // Generate the exam content
    const { text } = await generateText({
      model: gemini("gemini-1.5-pro"),
      prompt,
      system: systemPrompt,
    })

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Error in AI exam generation:", error)
    return NextResponse.json({ error: "An error occurred generating the exam" }, { status: 500 })
  }
}

