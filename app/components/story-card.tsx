import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, MessageSquare, Share2 } from "lucide-react"
import type { Story } from "../types/story"

interface StoryCardProps {
  story: Story
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/story/${story.id}`}>
        <Image
          src={story.imageUrl || "/placeholder.svg"}
          alt={story.title}
          width={400}
          height={200}
          className="w-full h-48 object-cover"
        />
      </Link>
      <CardHeader>
        <CardTitle className="line-clamp-2">{story.title}</CardTitle>
        <p className="text-sm text-gray-400">by {story.author}</p>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3">{story.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Star className="h-4 w-4" />
            <span className="sr-only">Rate</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Like</span>
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-4 w-4" />
            <span className="sr-only">Comment</span>
          </Button>
        </div>
        <Button variant="ghost" size="icon">
          <Share2 className="h-4 w-4" />
          <span className="sr-only">Share</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

