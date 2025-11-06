"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { LogoMark } from "./logo-mark"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSpotifyLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // TODO: Implement Spotify OAuth flow with auth.js
      console.log("[v0] Spotify OAuth login initiated")
      // Redirect to Spotify auth callback after implementation
    } catch (err) {
      console.error("[v0] Auth error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 text-center">
        <LogoMark />
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Play O'Day</h1>
          <p className="text-sm text-secondary-text">Share your music, every day</p>
        </div>
      </div>

      {/* Form Card - Simplified for Spotify-only auth */}
      <div className="bg-card-bg border border-card-border rounded-lg p-6 sm:p-8">
        <form onSubmit={handleSpotifyLogin} className="space-y-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={isLoading}
            className="w-full"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">◌</span>
                Connecting...
              </span>
            ) : (
              "Sign in with Spotify"
            )}
          </Button>
        </form>
      </div>

      {/* Footer Info */}
      <div className="space-y-3 text-center text-xs text-secondary-text">
        <p>
          By continuing, you agree to our{" "}
          <a href="#" className="text-primary hover:text-primary-dark underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:text-primary-dark underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
