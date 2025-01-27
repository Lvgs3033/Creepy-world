"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Upload, ImageIcon, Hash } from "lucide-react"
import Image from "next/image"
import { useStories } from "../../contexts/StoryContext"
import { Badge } from "@/components/ui/badge"

const placeholderImages = ["/horror-1.jpg", "/horror-2.jpg", "/horror-3.jpg", "/horror-4.jpg", "/horror-5.jpg"]

export default function NewStory() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [author, setAuthor] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const { toast } = useToast()
  const { addStory } = useStories()
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(file.name)
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      const newTag = tagInput.trim().toLowerCase()
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setTagInput("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const getRandomPlaceholderImage = () => {
    const randomIndex = Math.floor(Math.random() * placeholderImages.length)
    return placeholderImages[randomIndex]
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newStory = {
      id: Date.now(),
      title,
      content,
      author,
      imageUrl: previewUrl || getRandomPlaceholderImage(),
      createdAt: new Date().toISOString(),
      rating: 0,
      ratingCount: 0,
      likes: 0,
      views: 0,
      scaryScore: 0,
      comments: [],
      readingTime: Math.ceil(content.split(" ").length / 200),
      isNarrated: false,
      tags: [...tags, "user-submitted"],
      followers: 0,
    }
    addStory(newStory)
    toast({
      title: "Story submitted!",
      description: "Your story has been successfully submitted.",
    })
    router.push("/blog")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Write Your Story</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-300">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your story title"
            required
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="author" className="block text-sm font-medium text-gray-300">
            Your Name
          </label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Enter your name or pseudonym"
            required
          />
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Tags</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                #{tag}
                <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                  ×
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-gray-400" />
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Add tags (press Enter)"
              className="flex-1"
            />
          </div>
          <p className="text-sm text-gray-400">Suggested: #horror, #ghost, #paranormal, #halloween</p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-300">Story Image</label>
          <div className="grid gap-4">
            {previewUrl ? (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image src={previewUrl || "/placeholder.svg"} alt="Story preview" fill className="object-cover" />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setImage(null)
                    setPreviewUrl(null)
                  }}
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-4 rounded-full bg-gray-800">
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="text-center">
                    <Button type="button" variant="ghost" className="relative">
                      <input
                        type="file"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        accept="image/*"
                      />
                      Upload image
                    </Button>
                    <p className="text-sm text-gray-400">
                      or drag and drop
                      <br />
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300">
            Story
          </label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your story here..."
            rows={12}
            required
          />
        </div>

        <Button type="submit" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Submit Story
        </Button>
      </form>
    </div>
  )
}

