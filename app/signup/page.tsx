"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Ghost } from "lucide-react"
import { useState } from "react"

export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
    newsletter: false,
    terms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle signup logic here
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
            <Ghost className="h-8 w-8 text-red-500" />
            <span>Creepy World</span>
          </Link>
        </div>

        <Button variant="outline" className="w-full">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google Signup
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-700" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="bg-gray-800"
          />

          <Input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            required
            className="bg-gray-800"
          />

          <Input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            className="bg-gray-800"
          />

          <Input
            type="password"
            placeholder="Repeat password"
            value={formData.repeatPassword}
            onChange={(e) => setFormData({ ...formData, repeatPassword: e.target.value })}
            required
            className="bg-gray-800"
          />

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="newsletter"
                checked={formData.newsletter}
                onCheckedChange={(checked) => setFormData({ ...formData, newsletter: checked as boolean })}
              />
              <label htmlFor="newsletter" className="text-sm text-gray-400">
                I want to receive news and weekly highlights of the best new stories.
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={formData.terms}
                onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                I have read and agree to Creepy World's{" "}
                <Link href="/terms" className="text-blue-500 hover:text-blue-400">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-500 hover:text-blue-400">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  )
}

