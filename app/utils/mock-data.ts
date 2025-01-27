import type { Story } from "../types/story"

const titles = [
  "The Whisper in the Walls",
  "Shadows at Midnight",
  "The Cursed Doll's Eyes",
  "Echoes from the Attic",
  "The Forgotten Crypt",
  "The Copycats",
  "Four Hours It Stared",
  "The Last Train Home",
  "The Thing in the Basement",
  "What Lives in the Fog",
]

const authors = [
  "Edgar Allan Poe",
  "Stephen King",
  "H.P. Lovecraft",
  "Shirley Jackson",
  "Clive Barker",
  "R.L. Stine",
  "Anne Rice",
  "Dean Koontz",
  "Bram Stoker",
  "Mary Shelley",
]

const tags = [
  "apocalypse",
  "monsters",
  "ghosts",
  "paranormal",
  "psychological",
  "creepypasta",
  "urban legend",
  "supernatural",
  "haunted",
  "mystery",
]

export function generateMockStory(id: number): Story {
  const randomTags = tags.sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 3) + 1)

  return {
    id,
    title: titles[Math.floor(Math.random() * titles.length)],
    author: authors[Math.floor(Math.random() * authors.length)],
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    imageUrl: `https://sjc.microlink.io/Qwj73aVjWh2cpeuT2pPrlqOjAiJA09vuuSPJ4Ra7YJPjMQxZcnKWx7jOEx4QMn9IPKMUnCTLT_LN6jLx3ZVyhQ.jpeg`, // Using the provided image as placeholder
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    rating: Math.random() * 5,
    likes: Math.floor(Math.random() * 1000),
    views: Math.floor(Math.random() * 10000),
    scaryScore: Math.floor(Math.random() * 10),
    readingTime: Math.floor(Math.random() * 20) + 5,
    isNarrated: Math.random() > 0.7,
    tags: randomTags,
    comments: Array(Math.floor(Math.random() * 5))
      .fill(null)
      .map(() => ({
        author: authors[Math.floor(Math.random() * authors.length)],
        content: "This is a scary story! I couldn't sleep for days after reading it.",
      })),
  }
}

export function generateMockStories(count: number): Story[] {
  return Array(count)
    .fill(null)
    .map((_, index) => generateMockStory(index + 1))
}

