import Link from "next/link"
import { Star, Heart, Eye, Skull } from "lucide-react"

const categories = [
  {
    icon: Star,
    title: "Top Rated",
    description: "The absolute best stories available on Creepy World.",
    href: "/stories/top-rated",
    color: "text-yellow-500",
  },
  {
    icon: Heart,
    title: "Most Favorited",
    description: "Exhilarating stories loved by the Creepy World community.",
    href: "/stories/most-favorited",
    color: "text-red-500",
  },
  {
    icon: Eye,
    title: "Most Read",
    description: "Read the most popular stories available on Creepy World.",
    href: "/stories/most-read",
    color: "text-blue-500",
  },
  {
    icon: Skull,
    title: "Hollow Halloween",
    description: "The best submissions from our #Halloween2024 writing contest.",
    href: "/stories/halloween",
    color: "text-orange-500",
  },
]

export function CategoryNav() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.title}
          href={category.href}
          className="group p-6 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors"
        >
          <div className="space-y-2">
            <category.icon className={`h-6 w-6 ${category.color}`} />
            <h3 className="font-semibold group-hover:text-white transition-colors">{category.title}</h3>
            <p className="text-sm text-gray-400 line-clamp-2">{category.description}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}

