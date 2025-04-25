"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DiscordRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the Discord invite link
    window.location.href = "https://discord.gg/yXUWUzQU"
  }, [router])

  return (
    <div className="container py-20">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Redirecting to Discord...</h1>
        <p className="text-muted-foreground">
          If you are not automatically redirected, please{" "}
          <a
            href="https://discord.gg/yXUWUzQU"
            className="text-primary hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            click here
          </a>
          .
        </p>
      </div>
    </div>
  )
}
