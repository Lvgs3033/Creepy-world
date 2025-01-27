"use client"

import { motion } from "framer-motion"
import { Ghost } from "lucide-react"

export function FeaturedGhost() {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0.3, scale: 0.8 }}
        animate={{
          opacity: [0.3, 0.7, 0.3],
          scale: [0.8, 1.2, 0.8],
          y: [0, -20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute -top-12 right-4"
      >
        <Ghost className="h-16 w-16 text-purple-400/50" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0.2 }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute -top-8 right-16"
      >
        <Ghost className="h-12 w-12 text-blue-400/40" />
      </motion.div>
    </div>
  )
}

