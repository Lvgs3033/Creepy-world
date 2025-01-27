import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json()

    const client = await clientPromise
    const db = client.db("creepy-world")

    await db.collection("contacts").insertOne({
      name,
      email,
      subject,
      message,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}

