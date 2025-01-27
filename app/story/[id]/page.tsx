"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageSquare, Share2, Twitter, Facebook, Send, UserPlus } from "lucide-react"
import { useStories } from "../../contexts/StoryContext"
import type { Story } from "../../types/story"

function StarRating({ rating, onRate }: { rating: number; onRate: (rating: number) => void }) {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onRate(star)}
          className={`text-2xl ${star <= rating ? "text-yellow-500" : "text-gray-400"}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

export default function StoryDetail() {
  const { id } = useParams()
  const { stories, updateStory } = useStories()
  const [story, setStory] = useState<Story | null>(null)
  const [comment, setComment] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [isLiked, setIsLiked] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const foundStory = stories.find((s) => s.id === Number(id))
    if (foundStory) {
      setStory(foundStory)
    }
  }, [id, stories])

  if (!story) return <div>Loading...</div>

  const handleRating = (rating: number) => {
    setUserRating(rating)
    if (story) {
      const updatedStory = {
        ...story,
        rating: (story.rating * story.ratingCount + rating) / (story.ratingCount + 1),
        ratingCount: story.ratingCount + 1,
      }
      updateStory(updatedStory)
      setStory(updatedStory)
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (story) {
      const updatedStory = {
        ...story,
        likes: isLiked ? story.likes - 1 : story.likes + 1,
      }
      updateStory(updatedStory)
      setStory(updatedStory)
    }
  }

  const handleFollow = () => {
    setIsFollowing(!isFollowing)
    // In a real app, you would update the follow status on the server
  }

  const handleComment = () => {
    if (comment.trim() && story) {
      const newComment = {
        author: "Current User", // In a real app, this would be the logged-in user
        content: comment,
      }
      const updatedStory = {
        ...story,
        comments: [...story.comments, newComment],
      }
      updateStory(updatedStory)
      setStory(updatedStory)
      setComment("")
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <Image
        src={story.imageUrl || "/placeholder.svg"}
        alt={story.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-4xl font-bold">{story.title}</h1>
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${story.author}`} />
          <AvatarFallback>{story.author[0]}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{story.author}</p>
          <p className="text-sm text-gray-400">{new Date(story.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="text-lg leading-relaxed">{story.content}</p>
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 items-center">
          <StarRating rating={userRating} onRate={handleRating} />
          <span className="text-gray-400">({story.rating.toFixed(1)})</span>
          <Button variant="outline" onClick={handleLike}>
            <Heart className={`mr-2 h-4 w-4 ${isLiked ? "text-red-500 fill-red-500" : ""}`} />
            Like ({story.likes})
          </Button>
          <Button variant="outline" onClick={handleFollow}>
            <UserPlus className={`mr-2 h-4 w-4 ${isFollowing ? "text-green-500" : ""}`} />
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon">
            <Twitter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Facebook className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comments</h2>
        {story.comments.map((comment, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Avatar>
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${comment.author}`} />
                <AvatarFallback>{comment.author[0]}</AvatarFallback>
              </Avatar>
              <p className="font-semibold">{comment.author}</p>
            </div>
            <p>{comment.content}</p>
          </div>
        ))}
        <div className="flex space-x-2">
          <Textarea placeholder="Add a comment..." value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button onClick={handleComment}>
            <Send className="mr-2 h-4 w-4" />
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}

