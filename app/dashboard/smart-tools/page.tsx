"use client"

import { useState } from "react"
import { Sparkles, FileText, BookOpen, Brain, Lightbulb, Zap, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAI } from "@/hooks/use-ai"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function SmartToolsPage() {
  const [activeTab, setActiveTab] = useState("summarize")
  const [inputText, setInputText] = useState("")
  const [options, setOptions] = useState({
    summarize: { length: "medium", style: "academic" },
    flashcards: { count: 5, format: "qa" },
    quiz: { questionType: "multiple", count: 5 },
    notes: { structure: "outline", detailLevel: "medium" },
  })
  const { isLoading, result, generateAIContent } = useAI()

  const handleProcess = async () => {
    if (!inputText.trim()) return

    const currentOptions = options[activeTab as keyof typeof options]
    await generateAIContent(activeTab, inputText, currentOptions)
  }

  const handleOptionChange = (tab: string, key: string, value: any) => {
    setOptions((prev) => ({
      ...prev,
      [tab]: {
        ...prev[tab as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#319795]" />
          <h1 className="text-2xl font-bold text-[#2D3748]">AI Smart Tools</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="summarize" className="flex items-center gap-1">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Summarize</span>
                </TabsTrigger>
                <TabsTrigger value="flashcards" className="flex items-center gap-1">
                  <FileText className="h-3.5 w-3.5" />
                  <span>Flashcards</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-1">
                  <Lightbulb className="h-3.5 w-3.5" />
                  <span>Quiz</span>
                </TabsTrigger>
                <TabsTrigger value="notes" className="flex items-center gap-1">
                  <Brain className="h-3.5 w-3.5" />
                  <span>Smart Notes</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="summarize" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Summarization</CardTitle>
                    <CardDescription>Convert lengthy content into concise summaries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Input your content</Label>
                        <div className="flex gap-2 mt-1.5">
                          <div className="flex-1">
                            <Textarea
                              placeholder="Paste your text or notes here..."
                              className="h-40"
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center p-4 border-2 border-dashed rounded-md">
                            <Upload className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Upload File</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Length</Label>
                          <Select
                            defaultValue={options.summarize.length}
                            onValueChange={(value) => handleOptionChange("summarize", "length", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="short">Short (1-2 paragraphs)</SelectItem>
                              <SelectItem value="medium">Medium (3-4 paragraphs)</SelectItem>
                              <SelectItem value="long">Long (5+ paragraphs)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Style</Label>
                          <Select
                            defaultValue={options.summarize.style}
                            onValueChange={(value) => handleOptionChange("summarize", "style", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="academic">Academic</SelectItem>
                              <SelectItem value="simple">Simple</SelectItem>
                              <SelectItem value="bullet">Bullet Points</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-[#319795] hover:bg-[#2C7A7B]"
                      onClick={handleProcess}
                      disabled={isLoading || !inputText.trim()}
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="flashcards" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Flashcards</CardTitle>
                    <CardDescription>Create study flashcards from your content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Input your content</Label>
                        <div className="flex gap-2 mt-1.5">
                          <div className="flex-1">
                            <Textarea
                              placeholder="Paste your text or notes here..."
                              className="h-40"
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center p-4 border-2 border-dashed rounded-md">
                            <Upload className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Upload File</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Number of Cards</Label>
                          <Select
                            defaultValue={options.flashcards.count.toString()}
                            onValueChange={(value) => handleOptionChange("flashcards", "count", Number.parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 cards</SelectItem>
                              <SelectItem value="10">10 cards</SelectItem>
                              <SelectItem value="15">15 cards</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Format</Label>
                          <Select
                            defaultValue={options.flashcards.format}
                            onValueChange={(value) => handleOptionChange("flashcards", "format", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="qa">Question & Answer</SelectItem>
                              <SelectItem value="term">Term & Definition</SelectItem>
                              <SelectItem value="fill">Fill in the Blank</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-[#319795] hover:bg-[#2C7A7B]"
                      onClick={handleProcess}
                      disabled={isLoading || !inputText.trim()}
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="quiz" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Quiz</CardTitle>
                    <CardDescription>Generate practice questions to test your knowledge</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Input your content</Label>
                        <div className="flex gap-2 mt-1.5">
                          <div className="flex-1">
                            <Textarea
                              placeholder="Paste your text or notes here..."
                              className="h-40"
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center p-4 border-2 border-dashed rounded-md">
                            <Upload className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Upload File</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Question Type</Label>
                          <Select
                            defaultValue={options.quiz.questionType}
                            onValueChange={(value) => handleOptionChange("quiz", "questionType", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="multiple">Multiple Choice</SelectItem>
                              <SelectItem value="truefalse">True/False</SelectItem>
                              <SelectItem value="short">Short Answer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Number of Questions</Label>
                          <Select
                            defaultValue={options.quiz.count.toString()}
                            onValueChange={(value) => handleOptionChange("quiz", "count", Number.parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="5">5 questions</SelectItem>
                              <SelectItem value="10">10 questions</SelectItem>
                              <SelectItem value="15">15 questions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-[#319795] hover:bg-[#2C7A7B]"
                      onClick={handleProcess}
                      disabled={isLoading || !inputText.trim()}
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notes" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Smart Notes</CardTitle>
                    <CardDescription>Transform raw content into structured study notes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Input your content</Label>
                        <div className="flex gap-2 mt-1.5">
                          <div className="flex-1">
                            <Textarea
                              placeholder="Paste your text or notes here..."
                              className="h-40"
                              value={inputText}
                              onChange={(e) => setInputText(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-col justify-center items-center p-4 border-2 border-dashed rounded-md">
                            <Upload className="h-6 w-6 text-gray-400 mb-2" />
                            <span className="text-xs text-gray-500">Upload File</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Structure</Label>
                          <Select
                            defaultValue={options.notes.structure}
                            onValueChange={(value) => handleOptionChange("notes", "structure", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="outline">Outline</SelectItem>
                              <SelectItem value="cornell">Cornell Method</SelectItem>
                              <SelectItem value="mindmap">Mind Map Style</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Detail Level</Label>
                          <Select
                            defaultValue={options.notes.detailLevel}
                            onValueChange={(value) => handleOptionChange("notes", "detailLevel", value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="detailed">Detailed</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-[#319795] hover:bg-[#2C7A7B]"
                      onClick={handleProcess}
                      disabled={isLoading || !inputText.trim()}
                    >
                      {isLoading ? (
                        <>
                          <LoadingSpinner size="sm" className="mr-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate with AI
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {result && (
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="text-sm">Result</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-line bg-gray-50 p-4 rounded-md border">{result}</div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(result)
                    }}
                  >
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    Save to Notes
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-[#319795]/10 p-2 rounded-full">
                    <Upload className="h-4 w-4 text-[#319795]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Input Content</p>
                    <p className="text-xs text-gray-500">Paste text or upload files</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#319795]/10 p-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-[#319795]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Processing</p>
                    <p className="text-xs text-gray-500">Our AI analyzes your content</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#319795]/10 p-2 rounded-full">
                    <Brain className="h-4 w-4 text-[#319795]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Smart Output</p>
                    <p className="text-xs text-gray-500">Get transformed study materials</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Popular Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setActiveTab("summarize")
                    setInputText(
                      "The cell is the basic structural, functional, and biological unit of all known living organisms. A cell is the smallest unit of life that can replicate independently. Cells consist of cytoplasm enclosed within a membrane, which contains many biomolecules such as proteins and nucleic acids.",
                    )
                  }}
                >
                  <FileText className="h-4 w-4 mr-2 text-[#319795]" />
                  Lecture Note Summarizer
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setActiveTab("notes")
                    setInputText(
                      "Photosynthesis is the process by which green plants and certain other organisms transform light energy into chemical energy. During photosynthesis in green plants, light energy is captured and used to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds.",
                    )
                  }}
                >
                  <BookOpen className="h-4 w-4 mr-2 text-[#319795]" />
                  PDF Analyzer
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setActiveTab("quiz")
                    setInputText(
                      "The periodic table is a tabular arrangement of the chemical elements, ordered by their atomic number, electron configurations, and recurring chemical properties. The seven rows of the table, called periods, generally have metals on the left and nonmetals on the right. The columns, called groups, contain elements with similar chemical behaviors.",
                    )
                  }}
                >
                  <Lightbulb className="h-4 w-4 mr-2 text-[#319795]" />
                  Exam Prep Generator
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Usage Limits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">AI Generations</span>
                    <span className="text-sm font-medium">12/20</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#319795] h-2.5 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Your plan refreshes in 8 days</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

