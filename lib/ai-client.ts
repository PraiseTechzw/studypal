import { GoogleGenerativeAI } from "@ai-sdk/google"
import { generateText, streamText } from "ai"

// Initialize the Google Generative AI client
export const gemini = GoogleGenerativeAI(process.env.GEMINI_API_KEY || "")

// Define the model to use
const MODEL = "gemini-1.5-pro"

// Function to generate text with Gemini
export async function generateAIResponse(prompt: string, systemPrompt?: string) {
  try {
    const { text } = await generateText({
      model: gemini(MODEL),
      prompt,
      system: systemPrompt,
    })

    return { text, error: null }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      text: "I'm sorry, I encountered an error processing your request. Please try again.",
      error,
    }
  }
}

// Function to stream text with Gemini
export function streamAIResponse(prompt: string, systemPrompt?: string, onChunk?: (chunk: string) => void) {
  try {
    const result = streamText({
      model: gemini(MODEL),
      prompt,
      system: systemPrompt,
      onChunk: ({ chunk }) => {
        if (chunk.type === "text-delta") {
          onChunk?.(chunk.text)
        }
      },
    })

    return result
  } catch (error) {
    console.error("Error streaming AI response:", error)
    onChunk?.("I'm sorry, I encountered an error processing your request. Please try again.")
    throw error
  }
}

// Function to generate a summary
export async function generateSummary(content: string, options: { length: string; style: string }) {
  const prompt = `Summarize the following content. Length: ${options.length}. Style: ${options.style}.\n\nContent: ${content}`
  return generateAIResponse(prompt, "You are an expert summarizer. Create concise, accurate summaries.")
}

// Function to generate flashcards
export async function generateFlashcards(content: string, options: { count: number; format: string }) {
  const prompt = `Create ${options.count} flashcards in ${options.format} format from the following content:\n\nContent: ${content}`
  return generateAIResponse(prompt, "You are an expert educator. Create effective flashcards for learning.")
}

// Function to generate a quiz
export async function generateQuiz(content: string, options: { questionType: string; count: number }) {
  const prompt = `Create a ${options.questionType} quiz with ${options.count} questions from the following content:\n\nContent: ${content}`
  return generateAIResponse(prompt, "You are an expert educator. Create challenging but fair quiz questions.")
}

// Function to generate study notes
export async function generateNotes(content: string, options: { structure: string; detailLevel: string }) {
  const prompt = `Transform the following content into structured study notes. Structure: ${options.structure}. Detail level: ${options.detailLevel}.\n\nContent: ${content}`
  return generateAIResponse(prompt, "You are an expert note-taker. Create well-organized, comprehensive study notes.")
}

// Function to generate AI recommendations
export async function generateRecommendations(recentTopics: string[], studyHistory: string) {
  const prompt = `Based on the user's recent topics (${recentTopics.join(", ")}) and study history: ${studyHistory}, recommend 3 resources that would be helpful for their studies.`
  return generateAIResponse(
    prompt,
    "You are an expert learning advisor. Recommend relevant, high-quality study resources.",
  )
}

// Function to extract key concepts and tags
export async function extractKeyConceptsAndTags(content: string) {
  const prompt = `Extract the key concepts and relevant tags from the following content:\n\nContent: ${content}`
  const { text } = await generateAIResponse(
    prompt,
    "You are an expert in knowledge organization. Extract the most important concepts and relevant tags.",
  )

  // Parse the response to get an array of tags
  try {
    // Assuming the AI returns tags in a format we can parse
    const tags = text.split(",").map((tag) => tag.trim())
    return tags
  } catch (error) {
    console.error("Error parsing tags:", error)
    return []
  }
}

