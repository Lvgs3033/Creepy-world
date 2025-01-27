"use client"

import { useState, useEffect } from "react"
import { StoryCardHorizontal } from "../../components/story-card-horizontal"
import { useStories } from "../../contexts/StoryContext"
import { HalloweenGhost } from "../../components/halloween-ghost"
import { motion } from "framer-motion"
import { Skull } from "lucide-react"

export default function HalloweenStories() {
  const { stories } = useStories()
  const [halloweenStories, setHalloweenStories] = useState(stories)

  useEffect(() => {
    const filtered = stories.filter((story) =>
      story.tags.some(
        (tag) =>
          tag.toLowerCase().includes("halloween") ||
          tag.toLowerCase() === "horror" ||
          tag.toLowerCase().includes("ghost") ||
          tag.toLowerCase().includes("spooky"),
      ),
    )
    setHalloweenStories(filtered)
  }, [stories])

  return (
    <div className="relative min-h-screen">
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-20 right-20">
          <HalloweenGhost />
        </div>
        <div className="absolute top-40 left-20 scale-75 opacity-50">
          <HalloweenGhost />
        </div>
        <div className="absolute bottom-20 right-40 scale-50 opacity-30">
          <HalloweenGhost />
        </div>
      </motion.div>

      <div className="relative z-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skull className="h-8 w-8 text-orange-500" />
            <h1 className="text-4xl font-bold text-orange-500">Hollow Halloween</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-orange-500">🎃</span>
            <span className="text-gray-400">{halloweenStories.length} Spooky Tales</span>
          </div>
        </div>

        <div className="space-y-6 relative">
          {halloweenStories.length > 0 ? (
            halloweenStories.map((story) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <StoryCardHorizontal story={story} />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl text-gray-400 mb-4">No Halloween stories yet...</h2>
              <p className="text-gray-500">Be the first to share a spooky Halloween tale!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

