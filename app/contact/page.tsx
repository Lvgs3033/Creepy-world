"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit")

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block">
            Name <span className="text-red-500">*</span>
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="bg-gray-800"
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block">
            Email <span className="text-red-500">*</span>
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-gray-800"
            placeholder="Your email address"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="block">
            Subject <span className="text-red-500">*</span>
          </label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
            className="bg-gray-800"
            placeholder="Subject"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block">
            Your Message <span className="text-red-500">*</span>
          </label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
            className="bg-gray-800 min-h-[200px]"
            placeholder="Your Message"
          />
        </div>

        <div className="space-y-4">
          <div className="h-[78px] bg-white rounded">
            {/* hCaptcha would be integrated here in production */}
            <div className="h-full flex items-center justify-center text-gray-900">hCaptcha Integration</div>
          </div>

          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>
      </form>
    </div>
  )
}

