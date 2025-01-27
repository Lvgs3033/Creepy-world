"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StoryCardHorizontal } from "./components/story-card-horizontal"
import { CategoryNav } from "./components/category-nav"
import { useStories } from "./contexts/StoryContext"

export default function Home() {
  const { stories } = useStories()
  const [sortBy, setSortBy] = useState("latest")

  const sortedStories = [...stories].sort((a, b) => {
    switch (sortBy) {
      case "topRated":
        return b.rating - a.rating
      case "mostFavorited":
        return b.likes - a.likes
      case "mostRead":
        return b.comments.length - a.comments.length
      case "latest":
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  return (
    <div className="space-y-8">
      <CategoryNav />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Stories</h1>
          {stories.length > 0 && (
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">Latest</SelectItem>
                <SelectItem value="topRated">Top Rated</SelectItem>
                <SelectItem value="mostFavorited">Most Favorited</SelectItem>
                <SelectItem value="mostRead">Most Read</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
        {stories.length > 0 ? (
          <div className="divide-y divide-gray-800">
            {sortedStories.map((story) => (
              <StoryCardHorizontal key={story.id} story={story} />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-xl text-gray-400">No stories found. Check back later for new tales of terror!</p>
          </div>
        )}
      </div>
    </div>
  )
}

