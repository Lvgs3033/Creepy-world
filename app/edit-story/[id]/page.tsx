"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Upload, ImageIcon, Hash } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useStories } from "../../contexts/StoryContext"

export default function EditStory({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { stories, updateStory } = useStories()
  const { toast } = useToast()
  const [story, setStory] = useState(stories.find((s) => s.id === Number(params.id)))

  const [title, setTitle] = useState(story?.title || "")
  const [content, setContent] = useState(story?.content || "")
  const [author, setAuthor] = useState(story?.author || "")
  const [previewUrl, setPreviewUrl] = useState<string | null>(story?.imageUrl || null)
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>(story?.tags || [])

  useEffect(() => {
    if (!story) {
      toast({
        title: "Story not found",
        description: "The story you're trying to edit doesn't exist.",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [story, router, toast])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (story) {
      const updatedStory = {
        ...story,
        title,
        content,
        author,
        imageUrl: previewUrl || story.imageUrl,
        tags: tags.includes("user-submitted") ? tags : [...tags, "user-submitted"],
      }
      updateStory(updatedStory)
      toast({
        title: "Story updated!",
        description: "Your story has been successfully updated.",
      })
      router.push("/")
    }
  }

  if (!story) return null

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Edit Your Story</h1>
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
                  onClick={() => setPreviewUrl(null)}
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
          Update Story
        </Button>
      </form>
    </div>
  )
}

