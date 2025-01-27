"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { StoryCardHorizontal } from "@/components/story-card-horizontal"
import { useStories } from "@/contexts/StoryContext"
import { Badge } from "@/components/ui/badge"

export default function TagPage() {
  const { tag } = useParams()
  const { stories } = useStories()
  const [filteredStories, setFilteredStories] = useState(stories)

  useEffect(() => {
    const filtered = stories.filter((story) => story.tags.some((t) => t.toLowerCase() === tag.toLowerCase()))
    setFilteredStories(filtered)
  }, [stories, tag])

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold">Stories tagged</h1>
          <Badge variant="secondary" className="text-lg px-4 py-1">
            #{tag}
          </Badge>
        </div>
        <span className="text-gray-400">{filteredStories.length} Stories</span>
      </div>

      <div className="space-y-6">
        {filteredStories.map((story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
        {filteredStories.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-400 mb-4">No stories found</h2>
            <p className="text-gray-500">Be the first to share a story with this tag!</p>
          </div>
        )}
      </div>
    </div>
  )
}

