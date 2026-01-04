"use client"

import { useState } from "react"

type Props = {
  className?: string
}

export function InstagramLogo({ className = "" }: Props) {
  const [src, setSrc] = useState<string>(`/instagram-wordmark.png`)

  const handleError = () => {
    // switch to svg only once to avoid infinite loop
    setSrc((s) => (s.endsWith(".svg") ? s : "/instagram-wordmark.svg"))
  }

  return <img src={src} alt="Instagram" className={`h-10 select-none ${className}`} onError={handleError} />
}
