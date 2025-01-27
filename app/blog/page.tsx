"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { PenSquare } from "lucide-react"
import { StoryCardHorizontal } from "../components/story-card-horizontal"
import { useStories } from "../contexts/StoryContext"

export default function Blog() {
  const router = useRouter()
  const { stories } = useStories()
  const [sortBy, setSortBy] = useState("latest")

  const sortedStories = [...stories].sort((a, b) => {
    switch (sortBy) {
      case "topRated":
        return b.rating - a.rating
      case "mostFavorited":
        return b.likes - a.likes
      case "mostRead":
        return b.followers - a.followers
      case "latest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Stories</h1>
        <Button onClick={() => router.push("/blog/new")} className="bg-red-500 hover:bg-red-600">
          <PenSquare className="mr-2 h-5 w-5" />
          New Story
        </Button>
      </div>

      <div className="space-y-6">
        {sortedStories.map((story) => (
          <StoryCardHorizontal key={story.id} story={story} />
        ))}
        {sortedStories.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-2xl text-gray-400 mb-4">No stories yet</h2>
            <p className="text-gray-500 mb-8">Be the first to share your story!</p>
            <Button onClick={() => router.push("/blog/new")} className="bg-red-500 hover:bg-red-600">
              <PenSquare className="mr-2 h-5 w-5" />
              Write Your First Story
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

