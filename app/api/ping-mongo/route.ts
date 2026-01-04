import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI || ""

export async function GET() {
  try {
    if (!uri) {
      return NextResponse.json({ ok: false, error: "MONGODB_URI not set" }, { status: 500 })
    }
    const client = new MongoClient(uri)
    await client.connect()
    await client.db().admin().ping()
    await client.close()
    return NextResponse.json({ ok: true, message: "MongoDB connection successful" })
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 })
  }
}
