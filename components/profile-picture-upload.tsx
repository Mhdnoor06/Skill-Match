"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Camera, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProfilePictureUploadProps {
  value: string | null
  onChange: (value: string | null) => void
  className?: string
}

export function ProfilePictureUpload({ value, onChange, className }: ProfilePictureUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file")
      return
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(null)
    if (inputRef.current) {
      inputRef.current.value = ""
    }
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div
        className={cn(
          "relative group cursor-pointer rounded-full overflow-hidden border-2 border-dashed transition-all",
          dragActive ? "border-primary scale-105" : "border-border hover:border-primary/50",
          value ? "border-solid border-primary/50" : "",
        )}
        onClick={handleClick}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {value ? (
          <div className="relative w-32 h-32">
            <Image
              src={value || "/placeholder.svg"}
              alt="Profile picture"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 128px"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={handleRemove}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove image</span>
            </Button>
          </div>
        ) : (
          <div className="w-32 h-32 bg-muted rounded-full flex flex-col items-center justify-center p-2 text-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Upload photo</span>
            <span className="text-xs text-muted-foreground/70 mt-1">Drag or click</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
        aria-label="Upload profile picture"
      />

      <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF (max. 5MB)</p>
    </div>
  )
}
