"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Chatbot() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }])
      setInput("")
      // Simulate a response from the chatbot
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "I'm sorry, but I can't respond right now. The darkness is too strong...", isUser: false },
        ])
      }, 1000)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Chat with the Void</h1>
      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-4">
          <ScrollArea className="h-[400px] mb-4">
            {messages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.isUser ? "text-right" : "text-left"}`}>
                <span className={`inline-block p-2 rounded-lg ${message.isUser ? "bg-blue-600" : "bg-gray-700"}`}>
                  {message.text}
                </span>
              </div>
            ))}
          </ScrollArea>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-grow"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

