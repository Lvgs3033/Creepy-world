export interface Story {
  id: number
  title: string
  author: string
  content: string
  imageUrl: string
  createdAt: string
  rating: number
  ratingCount: number
  likes: number
  views: number
  scaryScore: number
  comments: { author: string; content: string }[]
  readingTime: number
  isNarrated?: boolean
  tags: string[]
  followers: number
}

