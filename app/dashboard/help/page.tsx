"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { BookOpen, ChevronDown, HelpCircle, Mail, MessageSquare, Search, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

export default function HelpPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [feedbackMessage, setFeedbackMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast.info(`Searching for "${searchQuery}"`)
    }
  }

  const handleSubmitFeedback = () => {
    if (!feedbackMessage.trim()) {
      toast.error("Please enter your feedback message")
      return
    }

    setIsSubmitting(true)

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setFeedbackMessage("")
      toast.success("Thank you for your feedback!")
    }, 1000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const faqItems = [
    {
      question: "How do I create a new study resource?",
      answer:
        "To create a new study resource, click on the 'Add Resource' button in the sidebar or the floating button at the bottom right of the screen. You can then choose the type of resource you want to create (Text Note, PDF Document, or Web Link) and fill in the details.",
    },
    {
      question: "How does the AI assistant work?",
      answer:
        "The AI assistant uses advanced natural language processing to help with your studies. You can ask it questions, request summaries of your notes, generate flashcards, or create quizzes based on your study materials. Simply navigate to the AI Assistant page from the sidebar and start chatting with it.",
    },
    {
      question: "Can I share my resources with other students?",
      answer:
        "Yes, you can share your resources with other students. When viewing a resource, click on the 'Share' button to generate a shareable link or directly invite other users by their email address. You can also join or create study groups to collaborate with peers.",
    },
    {
      question: "How do I organize my resources?",
      answer:
        "StudPal offers several ways to organize your resources. You can use tags to categorize your materials, set priority levels, and filter resources by type. The search function also helps you quickly find specific materials across your entire library.",
    },
    {
      question: "What is the Pomodoro timer and how do I use it?",
      answer:
        "The Pomodoro timer is a productivity technique that involves working in focused intervals (typically 25 minutes) followed by short breaks. To use it, go to the Study Timer page, set your desired focus and break durations, and click 'Start'. The timer will help you maintain focus and track your study sessions.",
    },
    {
      question: "How do I track my study progress?",
      answer:
        "You can track your study progress through the Analytics page, which provides insights into your study habits, resource usage, and productivity patterns. The dashboard shows metrics like total study time, resources created, and focus scores to help you understand and improve your study habits.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes, we take data security seriously. All your study materials and personal information are encrypted and stored securely. You can control the privacy settings of your resources and choose who can access them. For more details, please refer to our Privacy Policy.",
    },
  ]

  const quickStartGuides = [
    {
      title: "Getting Started with StudPal",
      description: "Learn the basics of StudPal and set up your account",
      icon: BookOpen,
    },
    {
      title: "Creating and Managing Resources",
      description: "Master the resource creation and organization tools",
      icon: BookOpen,
    },
    {
      title: "Using the AI Assistant",
      description: "Leverage AI to enhance your study experience",
      icon: BookOpen,
    },
    {
      title: "Collaborating with Study Groups",
      description: "Work together with peers for better learning outcomes",
      icon: BookOpen,
    },
  ]

  return (
    <motion.div className="container p-4 sm:p-6 mx-auto" variants={container} initial="hidden" animate="show">
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold mb-6">Help & Support</h1>
      </motion.div>

      <motion.div className="mb-8" variants={item}>
        <Card className="bg-[#319795] text-white">
          <CardHeader>
            <CardTitle className="text-xl">How can we help you?</CardTitle>
            <CardDescription className="text-gray-100">
              Search our knowledge base or browse the frequently asked questions below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search for help articles..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus-visible:ring-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white text-[#319795] hover:bg-white/90"
              >
                Search
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-[3fr_1fr]">
        <motion.div variants={item}>
          <Tabs defaultValue="faq">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq">
                <HelpCircle className="mr-2 h-4 w-4" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="guides">
                <BookOpen className="mr-2 h-4 w-4" />
                Guides
              </TabsTrigger>
              <TabsTrigger value="contact">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Us
              </TabsTrigger>
            </TabsList>

            <TabsContent value="faq" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common questions about StudPal</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqItems.map((item, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                        <AccordionContent>{item.answer}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Start Guides</CardTitle>
                  <CardDescription>Step-by-step tutorials to help you get the most out of StudPal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {quickStartGuides.map((guide, index) => (
                      <Card key={index} className="overflow-hidden">
                        <CardHeader className="p-4">
                          <div className="flex items-center gap-2">
                            <guide.icon className="h-5 w-5 text-[#319795]" />
                            <CardTitle className="text-base">{guide.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <CardDescription>{guide.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="p-4 pt-0">
                          <Button variant="ghost" className="w-full justify-between">
                            Read Guide
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Get in touch with our support team for personalized assistance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" placeholder="What's your question about?" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question in detail..."
                      className="min-h-[150px]"
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Mail className="mr-2 h-4 w-4" />
                    Email Support
                  </Button>
                  <Button
                    className="bg-[#319795] hover:bg-[#2C7A7B]"
                    onClick={handleSubmitFeedback}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size="sm" className="mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Submit
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>

        <motion.div className="space-y-6" variants={item}>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Video Tutorials</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md overflow-hidden bg-muted aspect-video flex items-center justify-center">
                <BookOpen className="h-10 w-10 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="font-medium">StudPal Basics</h3>
                <p className="text-sm text-muted-foreground">
                  Learn the fundamentals of using StudPal in this 5-minute tutorial.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Watch Now
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Was this helpful?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Let us know if you found the information you were looking for.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => toast.success("Thank you for your feedback!")}
                >
                  <ThumbsUp className="mr-2 h-4 w-4" />
                  Yes
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() =>
                    toast({
                      title: "We're sorry to hear that",
                      description: "Please let us know how we can improve",
                      variant: "info",
                    })
                  }
                >
                  <ThumbsUp className="mr-2 h-4 w-4 rotate-180" />
                  No
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}

