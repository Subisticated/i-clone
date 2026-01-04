import { NextResponse } from "next/server"
import clientPromise from "@/lib/mongo"
import { ObjectId } from "mongodb"
import { decrypt } from "@/lib/crypto"

// MongoDB connection is now managed globally in lib/mongo.ts

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const apiKey = req.headers.get("x-api-key")
    const expected = process.env.DECRYPT_API_KEY
    if (!expected || apiKey !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const id = params.id
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

    let client
    try {
      client = await clientPromise
      console.log("[MongoDB] Connected for GET /api/login/[id]/decrypt")
    } catch (err) {
      console.error("[MongoDB] Connection failed for GET /api/login/[id]/decrypt:", err)
      return NextResponse.json({ error: "Database connection error" }, { status: 500 })
    }
    const db = client.db("my_app_db")
    const collection = db.collection("logins")

    const doc = await collection.findOne({ _id: new ObjectId(id) })
    if (!doc) {
      console.log(`[MongoDB] No document found for id=${id}`)
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    // Hardcoded 32-byte base64 key (for demo only)
    const encryptionKey = "QWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo0NTY3ODkwMTIzNDU2Nzg5MDEyMw==";

    const decrypted = decrypt(doc.password, encryptionKey)
    console.log(`[MongoDB] Decrypted password for id=${id}`)
    return NextResponse.json({ ok: true, password: decrypted })
  } catch (err: any) {
    console.error("[API /api/login/[id]/decrypt] Error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
