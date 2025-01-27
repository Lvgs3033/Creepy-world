import Link from "next/link"
import { Ghost } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const popularTags = [
  "creepypasta",
  "reality",
  "locations",
  "creatures",
  "paranoia",
  "ghosts",
  "madness",
  "mindfuck",
  "sleeping",
]

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-xl">
              <Ghost className="h-8 w-8 text-red-500" />
              <span className="font-bold text-white">Creepy World</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The world's largest library of short horror, thriller, mystery, dark fantasy and sci-fi stories. Creepy
              World connects thousands of readers and writers with an appreciation for the uncanny.
            </p>
          </div>

          {/* Links Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Links</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Submission Terms
              </Link>
            </nav>
          </div>

          {/* Popular Tags Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  <Badge variant="secondary" className="bg-gray-800 hover:bg-gray-700 text-gray-300 cursor-pointer">
                    #{tag}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-gray-800">
          <div className="flex space-x-4 mb-4 md:mb-0">
            <Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} Creepy World</div>
        </div>
      </div>
    </footer>
  )
}

