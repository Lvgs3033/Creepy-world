"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Story } from "../types/story"

interface StoryContextType {
  stories: Story[]
  addStory: (story: Story) => void
  updateStory: (story: Story) => void
  deleteStory: (id: number) => void
}

const StoryContext = createContext<StoryContextType | undefined>(undefined)

export function StoryProvider({ children }: { children: React.ReactNode }) {
  const [stories, setStories] = useState<Story[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      const storedStories = localStorage.getItem("stories")
      if (storedStories) {
        setStories(JSON.parse(storedStories))
      }
      setIsInitialized(true)
    }
  }, [isInitialized])

  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      localStorage.setItem("stories", JSON.stringify(stories))
    }
  }, [stories, isInitialized])

  const addStory = (newStory: Story) => {
    setStories((prevStories) => [newStory, ...prevStories])
  }

  const updateStory = (updatedStory: Story) => {
    setStories((prevStories) => prevStories.map((story) => (story.id === updatedStory.id ? updatedStory : story)))
  }

  const deleteStory = (id: number) => {
    setStories((prevStories) => prevStories.filter((story) => story.id !== id))
  }

  return (
    <StoryContext.Provider value={{ stories, addStory, updateStory, deleteStory }}>{children}</StoryContext.Provider>
  )
}

export function useStories() {
  const context = useContext(StoryContext)
  if (context === undefined) {
    throw new Error("useStories must be used within a StoryProvider")
  }
  return context
}

