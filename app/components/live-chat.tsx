"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, X } from "lucide-react"

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [scrollAreaRef])

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput("")
      // Simulate a bot response
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "Thanks for your message! How can I help you today?", isUser: false }])
      }, 1000)
    }
  }

  return (
    <>
      {!isOpen && (
        <Button className="fixed bottom-4 right-4 rounded-full p-4" onClick={() => setIsOpen(true)}>
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 w-80 z-50">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Live Chat</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4" ref={scrollAreaRef}>
              {messages.map((message, index) => (
                <div key={index} className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}>
                  <span className={`inline-block p-2 rounded-lg ${message.isUser ? "bg-blue-600" : "bg-gray-700"}`}>
                    {message.text}
                  </span>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex w-full space-x-2"
            >
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
              <Button type="submit">Send</Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  )
}

