"use client"

import { motion } from "framer-motion"

export function HalloweenGhost() {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [0, -20, 0],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      className="w-32 h-32 relative"
    >
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <motion.path
          d="M20 90 C20 90, 50 100, 80 90 L80 50 C80 22.3858 62.6142 0 40 0 C17.3858 0 0 22.3858 0 50 L0 90 Z"
          fill="white"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <circle cx="30" cy="40" r="5" fill="black" />
        <circle cx="50" cy="40" r="5" fill="black" />
        <circle cx="40" cy="55" r="3" fill="black" />
        <motion.ellipse
          cx="50"
          cy="95"
          rx="30"
          ry="3"
          fill="rgba(0,0,0,0.2)"
          initial={{ opacity: 0.2 }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </svg>
    </motion.div>
  )
}

