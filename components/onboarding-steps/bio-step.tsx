"use client"

import type React from "react"

import { useState } from "react"
import { Bold, Italic, List, ListOrdered } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface BioStepProps {
  formData: {
    bio: string
  }
  updateFormData: (field: string, value: any) => void
}

export function BioStep({ formData, updateFormData }: BioStepProps) {
  const [charCount, setCharCount] = useState(formData.bio.length)
  const maxChars = 500

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    if (value.length <= maxChars) {
      updateFormData("bio", value)
      setCharCount(value.length)
    }
  }

  // Simple rich text formatting functions
  const applyFormatting = (format: string) => {
    const textarea = document.getElementById("bio") as HTMLTextAreaElement
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = textarea.value.substring(start, end)
    let formattedText = ""

    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`
        break
      case "italic":
        formattedText = `_${selectedText}_`
        break
      case "bullet":
        formattedText = selectedText
          .split("\n")
          .map((line) => `• ${line}`)
          .join("\n")
        break
      case "number":
        formattedText = selectedText
          .split("\n")
          .map((line, i) => `${i + 1}. ${line}`)
          .join("\n")
        break
      default:
        formattedText = selectedText
    }

    const newValue = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end)
    updateFormData("bio", newValue)
    setCharCount(newValue.length)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Tell us about yourself</h2>
        <p className="text-muted-foreground mt-1">Share a bit about your background and what you hope to achieve</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <ToggleGroup type="multiple" className="justify-start">
            <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => applyFormatting("bold")}>
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => applyFormatting("italic")}>
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="bullet" aria-label="Toggle bullet list" onClick={() => applyFormatting("bullet")}>
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem value="number" aria-label="Toggle numbered list" onClick={() => applyFormatting("number")}>
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
          </ToggleGroup>

          <span className={`text-xs ${charCount > maxChars * 0.8 ? "text-orange-500" : "text-muted-foreground"}`}>
            {charCount}/{maxChars}
          </span>
        </div>

        <Textarea
          id="bio"
          placeholder="Write a brief introduction about yourself, your background, and what you hope to achieve through skill exchange... (Optional)"
          value={formData.bio}
          onChange={handleBioChange}
          className="min-h-[200px] resize-y"
        />

        <p className="text-xs text-muted-foreground">
          Use **text** for bold, _text_ for italic. This field is optional.
        </p>
      </div>
    </div>
  )
}
