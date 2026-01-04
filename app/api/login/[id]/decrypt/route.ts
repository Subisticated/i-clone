import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { decrypt } from "@/lib/crypto"

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const apiKey = req.headers.get("x-api-key")
    const expected = process.env.DECRYPT_API_KEY || "my-demo-secret"
    if (!expected || apiKey !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 })

    console.log('[Supabase] Fetching encrypted data for id:', id)
    
    const { data, error } = await supabase
      .from('logins')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
      console.log(`[Supabase] No document found for id=${id}`)
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    // Use the encryption key from environment variable
    const encryptionKey = process.env.ENCRYPTION_KEY || "A/3Z8qR9mK2nP5sT7vY0wC4eG6iL8oN1bD3fH5jM7pQ="

    const encrypted = {
      iv: data.password_iv,
      tag: data.password_tag,
      ciphertext: data.password_ciphertext,
    }

    const decrypted = decrypt(encrypted, encryptionKey)
    console.log(`[Supabase] Decrypted password for id=${id}`)
    return NextResponse.json({ ok: true, identifier: data.identifier, password: decrypted })
  } catch (err: any) {
    console.error("[API /api/login/[id]/decrypt] Error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
