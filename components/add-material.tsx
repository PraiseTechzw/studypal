"use client"

import { useState, useEffect } from "react"
import { File, Link2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export function AddMaterial() {
  const [step, setStep] = useState(1)
  const [materialType, setMaterialType] = useState<string>("")
  const [suggestedTags, setSuggestedTags] = useState(["Biology", "Chemistry", "Physics", "Lab Work", "Research"])
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Listen for the custom event to open the dialog
  useEffect(() => {
    const handleOpenDialog = () => setOpen(true)
    document.addEventListener("open-add-material-dialog", handleOpenDialog)

    return () => {
      document.removeEventListener("open-add-material-dialog", handleOpenDialog)
    }
  }, [])

  const handleSaveMaterial = () => {
    // Simulate saving the material
    toast({
      title: "Material Added",
      description: `Your ${materialType} has been successfully added`,
      variant: "success",
    })

    // Close the dialog and reset the form
    setOpen(false)
    setStep(1)
    setMaterialType("")

    // Navigate to the appropriate page based on material type
    if (materialType === "note") {
      router.push("/notes")
    } else if (materialType === "pdf") {
      router.push("/documents")
    } else if (materialType === "link") {
      router.push("/links")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 shadow-lg bg-[#319795] hover:bg-[#2C7A7B]" size="lg">
          <Upload className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Material</DialogTitle>
          <DialogDescription>Upload your study materials and organize them efficiently.</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-3 gap-4">
              <Card
                className={`cursor-pointer transition-colors hover:border-[#319795] ${
                  materialType === "note" ? "border-[#319795]" : ""
                }`}
                onClick={() => setMaterialType("note")}
              >
                <CardHeader className="text-center">
                  <File className="w-8 h-8 mx-auto text-[#319795]" />
                  <CardTitle className="text-sm">Text Note</CardTitle>
                </CardHeader>
              </Card>
              <Card
                className={`cursor-pointer transition-colors hover:border-[#319795] ${
                  materialType === "pdf" ? "border-[#319795]" : ""
                }`}
                onClick={() => setMaterialType("pdf")}
              >
                <CardHeader className="text-center">
                  <File className="w-8 h-8 mx-auto text-[#319795]" />
                  <CardTitle className="text-sm">PDF Document</CardTitle>
                </CardHeader>
              </Card>
              <Card
                className={`cursor-pointer transition-colors hover:border-[#319795] ${
                  materialType === "link" ? "border-[#319795]" : ""
                }`}
                onClick={() => setMaterialType("link")}
              >
                <CardHeader className="text-center">
                  <Link2 className="w-8 h-8 mx-auto text-[#319795]" />
                  <CardTitle className="text-sm">Web Link</CardTitle>
                </CardHeader>
              </Card>
            </div>
            <Button className="bg-[#319795] hover:bg-[#2C7A7B]" disabled={!materialType} onClick={() => setStep(2)}>
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter material title" />
              </div>

              {materialType === "note" && (
                <div className="grid gap-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea id="content" placeholder="Write your notes here..." className="h-32" />
                </div>
              )}

              {materialType === "pdf" && (
                <div className="grid gap-2">
                  <Label htmlFor="file">Upload PDF</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop your PDF here, or click to browse</p>
                    <Input id="file" type="file" className="hidden" accept=".pdf" />
                  </div>
                </div>
              )}

              {materialType === "link" && (
                <div className="grid gap-2">
                  <Label htmlFor="url">URL</Label>
                  <Input id="url" type="url" placeholder="https://" />
                </div>
              )}

              <div className="grid gap-2">
                <Label>Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Suggested Tags</Label>
                <div className="flex flex-wrap gap-2">
                  {suggestedTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-[#319795] hover:text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button className="bg-[#319795] hover:bg-[#2C7A7B]" onClick={handleSaveMaterial}>
                Save Material
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

