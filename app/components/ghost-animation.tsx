"use client"

import { motion } from "framer-motion"
import { Ghost } from "lucide-react"

export function GhostAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: [0, 1, 0],
        y: [50, -50, 50],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="fixed bottom-10 right-10 z-50"
    >
      <Ghost className="h-12 w-12 text-white" />
    </motion.div>
  )
}

