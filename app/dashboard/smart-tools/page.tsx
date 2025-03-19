"use client"

import { useState } from "react"
import { Sparkles, FileText, BookOpen, Brain, Lightbulb, Zap, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SmartToolsPage() {
  const [activeTab, setActiveTab] = useState("summarize")
  const [inputText, setInputText] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState("")

  const handleProcess = () => {
    if (!inputText.trim()) return

    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      let generatedResult = ""

      switch (activeTab) {
        case "summarize":
          generatedResult =
            "The cell is the basic structural unit of all living organisms. Key components include the cell membrane, nucleus, cytoplasm, and mitochondria. The mitochondria functions as the powerhouse of the cell, generating ATP through cellular respiration."
          break
        case "flashcards":
          generatedResult =
            "Card 1: What is the basic structural unit of all living organisms?\nAnswer: The cell\n\nCard 2: What is the function of mitochondria?\nAnswer: Generate ATP through cellular respiration\n\nCard 3: What are the key components of a cell?\nAnswer: Cell membrane, nucleus, cytoplasm, and mitochondria"
          break
        case "quiz":
          generatedResult =
            "1. What is the basic structural unit of all living organisms?\na) Atom\nb) Cell\nc) Tissue\nd) Organ\n\n2. Which organelle is known as the powerhouse of the cell?\na) Nucleus\nb) Ribosome\nc) Mitochondria\nd) Golgi apparatus"
          break
        case "notes":
          generatedResult =
            "# Cell Structure Notes\n\n## Definition\n- Basic structural unit of all living organisms\n- Smallest unit of life that can replicate independently\n\n## Key Components\n1. Cell membrane - Controls what enters and exits the cell\n2. Nucleus - Contains genetic material\n3. Cytoplasm - Gel-like substance where organelles are suspended\n4. Mitochondria - Generates energy through ATP production"
          break
      }

      setResult(generatedResult)
      setIsProcessing(false)
    }, 1500)
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

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>
                    {activeTab === "summarize" && "AI Summarization"}
                    {activeTab === "flashcards" && "Generate Flashcards"}
                    {activeTab === "quiz" && "Create Quiz"}
                    {activeTab === "notes" && "Generate Smart Notes"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "summarize" && "Convert lengthy content into concise summaries"}
                    {activeTab === "flashcards" && "Create study flashcards from your content"}
                    {activeTab === "quiz" && "Generate practice questions to test your knowledge"}
                    {activeTab === "notes" && "Transform raw content into structured study notes"}
                  </CardDescription>
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

                    {activeTab === "summarize" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Length</Label>
                          <Select defaultValue="medium">
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
                          <Select defaultValue="academic">
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
                    )}

                    {activeTab === "flashcards" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Number of Cards</Label>
                          <Select defaultValue="5">
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
                          <Select defaultValue="qa">
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
                    )}

                    {activeTab === "quiz" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Question Type</Label>
                          <Select defaultValue="multiple">
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
                          <Select defaultValue="5">
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
                    )}

                    {activeTab === "notes" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Structure</Label>
                          <Select defaultValue="outline">
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
                          <Select defaultValue="medium">
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
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full bg-[#319795] hover:bg-[#2C7A7B]"
                    onClick={handleProcess}
                    disabled={isProcessing || !inputText.trim()}
                  >
                    {isProcessing ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
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

              {result && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">Result</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-line bg-gray-50 p-4 rounded-md border">{result}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      Save to Notes
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </Tabs>
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
                <Button variant="outline" className="w-full justify-start text-sm">
                  <FileText className="h-4 w-4 mr-2 text-[#319795]" />
                  Lecture Note Summarizer
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
                  <BookOpen className="h-4 w-4 mr-2 text-[#319795]" />
                  PDF Analyzer
                </Button>
                <Button variant="outline" className="w-full justify-start text-sm">
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

