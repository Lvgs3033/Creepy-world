import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MessageSquare, Star, Edit, Trash } from "lucide-react"
import type { Story } from "../types/story"
import { useRouter } from "next/navigation"
import { useStories } from "../contexts/StoryContext"

interface StoryCardHorizontalProps {
  story: Story
}

export function StoryCardHorizontal({ story }: StoryCardHorizontalProps) {
  const router = useRouter()
  const { deleteStory } = useStories()

  const handleEdit = () => {
    router.push(`/edit-story/${story.id}`)
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this story?")) {
      deleteStory(story.id)
    }
  }

  return (
    <div className="flex gap-6 py-6 border-b border-gray-800">
      <Link href={`/story/${story.id}`} className="relative w-72 h-48 overflow-hidden rounded-lg shrink-0">
        <Image src={story.imageUrl || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
        {story.isNarrated && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded text-sm">
            <span>🎧</span> Narrated
          </div>
        )}
      </Link>
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="h-4 w-4" />
          <span>{story.readingTime} min read</span>
        </div>
        <Link href={`/story/${story.id}`}>
          <h2 className="text-2xl font-bold hover:text-gray-300 transition-colors">{story.title}</h2>
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${story.author}`} />
              <AvatarFallback>{story.author[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-400">by {story.author}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span>{story.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{story.comments.length}</span>
            </div>
          </div>
        </div>
        <p className="text-gray-400 line-clamp-2">{story.content}</p>
        <div className="flex gap-2">
          {story.tags.map((tag) => (
            <Link key={tag} href={`/tag/${tag}`}>
              <Badge variant="secondary" className="hover:bg-gray-700 cursor-pointer">
                #{tag}
              </Badge>
            </Link>
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  )
}

