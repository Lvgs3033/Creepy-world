"use client"

import { useState, useEffect } from "react"
import { StoryCardHorizontal } from "../components/story-card-horizontal"
import { useStories } from "../contexts/StoryContext"
import { FeaturedGhost } from "../components/featured-ghost"

export default function MostLikedStories() {
  const { stories } = useStories()
  const [sortedStories, setSortedStories] = useState(stories)

  useEffect(() => {
    const sorted = [...stories].sort((a, b) => b.likes - a.likes)
    setSortedStories(sorted)
  }, [stories])

  return (
    <div className="relative space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Most Liked Stories</h1>
        <FeaturedGhost />
      </div>
      <div className="space-y-6">
        {sortedStories.map((story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
        {sortedStories.length === 0 && <p className="text-center text-gray-400">No stories found.</p>}
      </div>
    </div>
  )
}

