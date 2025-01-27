import Link from "next/link"

const updates = [
  {
    date: "December 30, 2024",
    title: "Creepy World's 2024 End of Year Review",
    excerpt: "Greetings, storytellers, readers, and aficionados of the dark and mysterious — what a year it's been!",
  },
  {
    date: "October 31, 2024",
    title: "The Winners of our Halloween Writing Contest",
    excerpt: "As Halloween is finally upon us, it's time to unveil the eerie tales that left us spellbound.",
  },
]

export function NewsUpdates() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">News & Updates</h2>
        <Link href="/news" className="text-sm text-blue-500 hover:text-blue-400">
          All news
        </Link>
      </div>
      <div className="space-y-4">
        {updates.map((update, index) => (
          <div key={index} className="p-4 bg-gray-800/50 rounded-lg space-y-2">
            <time className="text-sm text-gray-400">{update.date}</time>
            <h3 className="font-semibold hover:text-gray-300 cursor-pointer">{update.title}</h3>
            <p className="text-sm text-gray-400">{update.excerpt}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

