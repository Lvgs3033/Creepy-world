import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { Providers } from "./providers"
import { Toaster } from "@/components/ui/toaster"
import { LiveChat } from "./components/live-chat"
import { StoryProvider } from "./contexts/StoryContext"
import { SpookyGhost } from "./components/spooky-ghost"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creepy World",
  description: "Share and explore chilling tales of horror",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <StoryProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="container mx-auto px-4 py-8 flex-grow relative">{children}</main>
              <Footer />
            </div>
            <LiveChat />
            <Toaster />
            <SpookyGhost />
          </StoryProvider>
        </Providers>
        <div className="fixed inset-0 bg-black opacity-90 z-[-1]"></div>
      </body>
    </html>
  )
}

