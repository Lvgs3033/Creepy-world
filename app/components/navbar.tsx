"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Ghost, Search, Shuffle, Home, PenSquare, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useStories } from "../contexts/StoryContext"

export function Navbar() {
  const router = useRouter()
  const { stories } = useStories()

  const handleRandomStory = () => {
    if (stories.length > 0) {
      const randomIndex = Math.floor(Math.random() * stories.length)
      const randomStory = stories[randomIndex]
      router.push(`/story/${randomStory.id}`)
    }
  }

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-xl">
            <Ghost className="h-8 w-8 text-red-500" />
            <span>Creepy World</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/" className="hover:text-gray-300 transition-colors">
              <Home className="h-5 w-5" />
            </Link>
            <Link href="/blog" className="hover:text-gray-300 transition-colors">
              <PenSquare className="h-5 w-5" />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push("/search")}
              className="hover:text-gray-300 transition-colors"
            >
              <Search className="h-5 w-5" />
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={handleRandomStory} variant="ghost" size="icon" disabled={stories.length === 0}>
                    <Shuffle className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Go to random story</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/login">
                <LogIn className="h-5 w-5 mr-2" />
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

