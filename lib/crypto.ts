import crypto from "crypto"

type Encrypted = {
  iv: string
  tag: string
  ciphertext: string
}

export function encrypt(text: string, base64Key: string): Encrypted {
  const key = Buffer.from(base64Key, "base64")
  if (key.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes (base64-encoded)")

  const iv = crypto.randomBytes(12) // recommended size for GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()])
  const tag = cipher.getAuthTag()

  return {
    iv: iv.toString("base64"),
    tag: tag.toString("base64"),
    ciphertext: encrypted.toString("base64"),
  }
}

export function decrypt(enc: Encrypted, base64Key: string): string {
  const key = Buffer.from(base64Key, "base64")
  if (key.length !== 32) throw new Error("ENCRYPTION_KEY must be 32 bytes (base64-encoded)")

  const iv = Buffer.from(enc.iv, "base64")
  const tag = Buffer.from(enc.tag, "base64")
  const ciphertext = Buffer.from(enc.ciphertext, "base64")

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(tag)
  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()])
  return decrypted.toString("utf8")
}

export type { Encrypted }
