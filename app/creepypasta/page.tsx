import Link from "next/link"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const creepypastaStories = [
  {
    title: "The Whispers in the Walls",
    description:
      "A chilling tale of a family who moves into a new home, only to discover that the walls are alive with sinister whispers.",
    link: "#",
  },
  {
    title: "The Last Selfie",
    description:
      "A teenager's innocent selfie captures something terrifying in the background, leading to a horrifying discovery.",
    link: "#",
  },
  {
    title: "The Midnight Game",
    description: "A group of friends decide to play a dangerous occult game at midnight, with dire consequences.",
    link: "#",
  },
]

export default function Creepypasta() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Creepypasta Stories</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {creepypastaStories.map((story, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
              <CardDescription>{story.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" asChild className="w-full">
                <Link href={story.link}>Read Story</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold mb-4">Explore More Creepypasta</h2>
        <p className="mb-4">Discover a vast collection of chilling tales at Nightscribe:</p>
        <Button asChild>
          <a href="https://nightscribe.co/" target="_blank" rel="noopener noreferrer">
            Visit Nightscribe
          </a>
        </Button>
      </div>
    </div>
  )
}

