"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Thanks for subscribing!",
      description: "You'll be the first to know when we unleash new tales.",
    })
    setEmail("")
  }

  return (
    <div className="p-6 bg-gray-800/50 rounded-lg space-y-4">
      <h2 className="text-xl font-bold">Unlock the secrets of the night</h2>
      <p className="text-sm text-gray-400">
        Subscribe to our newsletter and follow us to become the first to know when we unleash new tales upon the web.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" className="w-full">
          Subscribe
        </Button>
      </form>
    </div>
  )
}

