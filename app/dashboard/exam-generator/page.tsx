"use client"

import { useState } from "react"
import { BookOpen, FileText, Brain, CheckCircle, Download, Sparkles, Printer, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function ExamGeneratorPage() {
  const { toast } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [examGenerated, setExamGenerated] = useState(false)
  const [examContent, setExamContent] = useState("")
  const [examConfig, setExamConfig] = useState({
    subject: "",
    topic: "",
    difficulty: "medium",
    questionCount: 10,
    questionTypes: ["multiple-choice"],
    timeLimit: 30,
    includeAnswers: true,
    includeExplanations: true,
  })

  // Sample subjects and their topics
  const subjectTopics: Record<string, string[]> = {
    biology: ["Cell Biology", "Genetics", "Ecology", "Human Anatomy", "Evolution"],
    chemistry: ["Organic Chemistry", "Inorganic Chemistry", "Thermodynamics", "Chemical Bonding", "Acids and Bases"],
    physics: ["Mechanics", "Electromagnetism", "Thermodynamics", "Quantum Physics", "Optics"],
    mathematics: ["Calculus", "Algebra", "Geometry", "Statistics", "Trigonometry"],
    history: ["World War II", "Ancient Civilizations", "Renaissance", "Cold War", "Industrial Revolution"],
    literature: ["Shakespeare", "American Literature", "Poetry Analysis", "Literary Devices", "Modern Fiction"],
  }

  const handleInputChange = (field: string, value: any) => {
    setExamConfig((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleQuestionTypeToggle = (type: string) => {
    setExamConfig((prev) => {
      const currentTypes = [...prev.questionTypes]
      if (currentTypes.includes(type)) {
        return {
          ...prev,
          questionTypes: currentTypes.filter((t) => t !== type),
        }
      } else {
        return {
          ...prev,
          questionTypes: [...currentTypes, type],
        }
      }
    })
  }

  const generateExam = async () => {
    if (!examConfig.subject || !examConfig.topic) {
      toast({
        title: "Missing Information",
        description: "Please select a subject and topic",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)

    try {
      // Call the AI API to generate the exam
      const response = await fetch("/api/ai/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: examConfig.subject,
          topic: examConfig.topic,
          difficulty: examConfig.difficulty,
          questionCount: examConfig.questionCount,
          questionTypes: examConfig.questionTypes,
          includeAnswers: examConfig.includeAnswers,
          includeExplanations: examConfig.includeExplanations,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate exam")
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setExamContent(data.text)
      setExamGenerated(true)

      toast({
        title: "Exam Generated",
        description: "Your practice exam has been created successfully",
        variant: "success",
      })
    } catch (error) {
      console.error("Error generating exam:", error)
      toast({
        title: "Generation Failed",
        description: "There was an error generating your exam. Please try again.",
        variant: "destructive",
      })

      // Provide a fallback exam for demonstration purposes
      if (process.env.NODE_ENV === "development") {
        const fallbackExam = `# ${examConfig.subject.charAt(0).toUpperCase() + examConfig.subject.slice(1)} Exam: ${examConfig.topic}

## Multiple Choice Questions

1. What is the primary function of mitochondria in a cell?
   A) Protein synthesis
   B) Lipid storage
   C) Energy production
   D) Cell division

2. Which of the following is NOT a part of the cell membrane?
   A) Phospholipids
   B) Cholesterol
   C) Ribosomes
   D) Glycoproteins

3. The process by which cells engulf large particles is called:
   A) Exocytosis
   B) Endocytosis
   C) Osmosis
   D) Diffusion

## True/False Questions

4. True or False: All cells have a nucleus.

5. True or False: Mitochondria have their own DNA.

## Short Answer Questions

6. Explain the difference between passive and active transport across the cell membrane.

7. Describe the structure and function of the Golgi apparatus.

## Answers

1. C) Energy production
2. C) Ribosomes
3. B) Endocytosis
4. False. Prokaryotic cells do not have a nucleus.
5. True. Mitochondria have their own circular DNA.
6. Passive transport does not require energy and moves molecules from high to low concentration. Active transport requires energy (ATP) and can move molecules against their concentration gradient.
7. The Golgi apparatus is a stack of flattened membrane-bound sacs that modify, sort, and package proteins for secretion or use within the cell.`

        setExamContent(fallbackExam)
        setExamGenerated(true)
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container p-4 sm:p-6 mx-auto">
      <div className="grid gap-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-[#319795]" />
          <h1 className="text-2xl font-bold text-[#2D3748]">AI Exam Generator</h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Create Practice Exam</CardTitle>
                <CardDescription>
                  Generate customized practice exams with AI to test your knowledge and prepare for tests
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={examConfig.subject} onValueChange={(value) => handleInputChange("subject", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="biology">Biology</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="history">History</SelectItem>
                        <SelectItem value="literature">Literature</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="topic">Topic</Label>
                    <Select
                      value={examConfig.topic}
                      onValueChange={(value) => handleInputChange("topic", value)}
                      disabled={!examConfig.subject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={examConfig.subject ? "Select topic" : "Select subject first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {examConfig.subject &&
                          subjectTopics[examConfig.subject as keyof typeof subjectTopics]?.map((topic) => (
                            <SelectItem key={topic} value={topic}>
                              {topic}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom Topic (Optional)</Label>
                  <Textarea
                    placeholder="Enter a specific topic or paste content to generate questions from..."
                    className="h-20"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Difficulty Level</Label>
                    <span className="text-sm capitalize text-muted-foreground">{examConfig.difficulty}</span>
                  </div>
                  <RadioGroup
                    className="flex space-x-2"
                    value={examConfig.difficulty}
                    onValueChange={(value) => handleInputChange("difficulty", value)}
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="easy" id="difficulty-easy" />
                      <Label htmlFor="difficulty-easy" className="text-sm">
                        Easy
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="medium" id="difficulty-medium" />
                      <Label htmlFor="difficulty-medium" className="text-sm">
                        Medium
                      </Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="hard" id="difficulty-hard" />
                      <Label htmlFor="difficulty-hard" className="text-sm">
                        Hard
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Number of Questions</Label>
                    <span className="text-sm text-muted-foreground">{examConfig.questionCount} questions</span>
                  </div>
                  <Slider
                    value={[examConfig.questionCount]}
                    min={5}
                    max={30}
                    step={5}
                    onValueChange={(value) => handleInputChange("questionCount", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Question Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="multiple-choice"
                        checked={examConfig.questionTypes.includes("multiple-choice")}
                        onCheckedChange={() => handleQuestionTypeToggle("multiple-choice")}
                      />
                      <Label htmlFor="multiple-choice" className="text-sm">
                        Multiple Choice
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="true-false"
                        checked={examConfig.questionTypes.includes("true-false")}
                        onCheckedChange={() => handleQuestionTypeToggle("true-false")}
                      />
                      <Label htmlFor="true-false" className="text-sm">
                        True/False
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="short-answer"
                        checked={examConfig.questionTypes.includes("short-answer")}
                        onCheckedChange={() => handleQuestionTypeToggle("short-answer")}
                      />
                      <Label htmlFor="short-answer" className="text-sm">
                        Short Answer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="fill-blank"
                        checked={examConfig.questionTypes.includes("fill-blank")}
                        onCheckedChange={() => handleQuestionTypeToggle("fill-blank")}
                      />
                      <Label htmlFor="fill-blank" className="text-sm">
                        Fill in the Blank
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Time Limit (minutes)</Label>
                    <span className="text-sm text-muted-foreground">{examConfig.timeLimit} minutes</span>
                  </div>
                  <Slider
                    value={[examConfig.timeLimit]}
                    min={10}
                    max={120}
                    step={5}
                    onValueChange={(value) => handleInputChange("timeLimit", value[0])}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Options</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="include-answers"
                        checked={examConfig.includeAnswers}
                        onCheckedChange={(checked) => handleInputChange("includeAnswers", checked)}
                      />
                      <Label htmlFor="include-answers" className="text-sm">
                        Include Answers
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="include-explanations"
                        checked={examConfig.includeExplanations}
                        onCheckedChange={(checked) => handleInputChange("includeExplanations", checked)}
                      />
                      <Label htmlFor="include-explanations" className="text-sm">
                        Include Explanations
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-[#319795] hover:bg-[#2C7A7B]"
                  onClick={generateExam}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Generating Exam...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Exam
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {examGenerated && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated Exam</CardTitle>
                  <CardDescription>
                    Your practice exam is ready. You can print it, download it, or take it online.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-md border max-h-[500px] overflow-y-auto">
                    <div className="prose max-w-none dark:prose-invert">
                      <h1 className="text-xl font-bold mb-4">
                        {examConfig.subject.charAt(0).toUpperCase() + examConfig.subject.slice(1)} Exam:{" "}
                        {examConfig.topic}
                      </h1>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-1" />
                          <span>{examConfig.questionCount} questions</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{examConfig.timeLimit} minutes</span>
                        </div>
                        <div className="flex items-center">
                          <Brain className="h-4 w-4 mr-1" />
                          <span className="capitalize">{examConfig.difficulty} difficulty</span>
                        </div>
                      </div>
                      <div className="whitespace-pre-line">{examContent}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" className="gap-2">
                    <Printer className="h-4 w-4" />
                    Print Exam
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                  <Button className="gap-2 bg-[#319795] hover:bg-[#2C7A7B]">
                    <CheckCircle className="h-4 w-4" />
                    Take Exam
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
                    <BookOpen className="h-4 w-4 text-[#319795]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Select Subject & Topic</p>
                    <p className="text-xs text-gray-500">Choose what you want to be tested on</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#319795]/10 p-2 rounded-full">
                    <Sparkles className="h-4 w-4 text-[#319795]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Generation</p>
                    <p className="text-xs text-gray-500">Our AI creates custom questions based on your selections</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-[#319795]/10 p-2 rounded-full">
                    <CheckCircle className="h-4 w-4 text-[#319795]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Take the Exam</p>
                    <p className="text-xs text-gray-500">Test your knowledge and track your progress</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Popular Exam Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setExamConfig({
                      ...examConfig,
                      subject: "biology",
                      topic: "Cell Biology",
                      difficulty: "medium",
                      questionCount: 15,
                      questionTypes: ["multiple-choice", "true-false"],
                    })
                  }}
                >
                  <FileText className="h-4 w-4 mr-2 text-[#319795]" />
                  Biology Midterm Review
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setExamConfig({
                      ...examConfig,
                      subject: "mathematics",
                      topic: "Calculus",
                      difficulty: "hard",
                      questionCount: 10,
                      questionTypes: ["multiple-choice", "short-answer"],
                    })
                  }}
                >
                  <FileText className="h-4 w-4 mr-2 text-[#319795]" />
                  Calculus Practice Test
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-sm"
                  onClick={() => {
                    setExamConfig({
                      ...examConfig,
                      subject: "chemistry",
                      topic: "Organic Chemistry",
                      difficulty: "medium",
                      questionCount: 20,
                      questionTypes: ["multiple-choice"],
                    })
                  }}
                >
                  <FileText className="h-4 w-4 mr-2 text-[#319795]" />
                  Organic Chemistry Quiz
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Recent Exams</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h3 className="font-medium text-sm">Biology: Cell Structure</h3>
                      <p className="text-xs text-gray-500">15 questions • Taken 2 days ago</p>
                    </div>
                    <div className="text-sm font-medium text-[#319795]">85%</div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h3 className="font-medium text-sm">Chemistry: Periodic Table</h3>
                      <p className="text-xs text-gray-500">10 questions • Taken 5 days ago</p>
                    </div>
                    <div className="text-sm font-medium text-[#319795]">92%</div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h3 className="font-medium text-sm">Physics: Mechanics</h3>
                      <p className="text-xs text-gray-500">20 questions • Taken 1 week ago</p>
                    </div>
                    <div className="text-sm font-medium text-[#319795]">78%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

