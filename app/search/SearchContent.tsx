"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { StoryCardHorizontal } from "../components/story-card-horizontal"
import { useStories } from "../contexts/StoryContext"

export default function SearchContent() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams?.get("q") || "")
  const { stories } = useStories()

  const filteredStories = stories.filter(
    (story) =>
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  useEffect(() => {
    const query = searchParams?.get("q")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">Search Creepy World</h1>
      <Input
        type="search"
        placeholder="Search stories by title or author..."
        className="max-w-xl mx-auto"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="space-y-6">
        {filteredStories.map((story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
        {filteredStories.length === 0 && (
          <p className="text-center text-gray-400">No stories found. Try a different search term.</p>
        )}
      </div>
    </div>
  )
}

