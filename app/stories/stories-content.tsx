"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StoryCard } from "../components/story-card"
import { generateMockStories } from "../utils/mock-data"
import { useSearchParams } from "next/navigation"

export default function StoriesContent() {
  const [stories, setStories] = useState(generateMockStories(50))
  const [sortBy, setSortBy] = useState("newest")
  const [page, setPage] = useState(1)
  const searchParams = useSearchParams()
  const search = searchParams.get("search")

  useEffect(() => {
    if (search) {
      const filteredStories = stories.filter((story) => story.title.toLowerCase().includes(search.toLowerCase()))
      setStories(filteredStories)
    } else {
      setStories(generateMockStories(50))
    }
  }, [search, stories]) // Added 'stories' to the dependency array

  const sortStories = (method: string) => {
    const sorted = [...stories]
    switch (method) {
      case "oldest":
        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating)
        break
      default:
        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
    setStories(sorted)
    setSortBy(method)
    setPage(1)
  }

  const loadMoreStories = () => {
    const newStories = generateMockStories(10)
    setStories([...stories, ...newStories])
    setPage(page + 1)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        loadMoreStories()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [page])

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stories</h1>
        <Select onValueChange={sortStories} defaultValue={sortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.slice(0, page * 10).map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  )
}

