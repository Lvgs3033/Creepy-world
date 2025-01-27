"use client"

import { motion } from "framer-motion"
import { Ghost } from "lucide-react"

export function SpookyGhost() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0.5, 1.2, 0.5],
        x: ["-100%", "100%"],
        y: ["-100%", "100%"],
      }}
      transition={{
        duration: 10,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      className="fixed z-0 pointer-events-none"
    >
      <Ghost className="h-16 w-16 text-blue-300 opacity-30" />
    </motion.div>
  )
}

