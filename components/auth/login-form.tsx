"use client"

import { useState, type FormEvent, type ChangeEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LogoMark } from "./logo-mark"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setError("")
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // TODO: Implement Spotify OAuth flow
      console.log("[v0] OAuth login initiated for:", email)
      // Placeholder for auth.js integration
    } catch (err) {
      setError("An error occurred. Please try again.")
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

      {/* Form Card */}
      <div className="space-y-6 bg-card-bg border border-card-border rounded-lg p-6 sm:p-8">
        {/* Email Input Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-foreground font-medium">
              Email Address
            </Label>
            <div className="mt-1">
              <Input
                id="email"
                type="email"
                variant="default"
                size="lg"
                placeholder="you@example.com"
                value={email}
                onChange={handleEmailChange}
                disabled={isLoading}
                required
                aria-required="true"
                aria-describedby={error ? "email-error" : undefined}
              />
            </div>
            {error && (
              <p id="email-error" className="text-sm text-red-500">
                {error}
              </p>
            )}
          </div>

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
              "Continue with Spotify"
            )}
          </Button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 border-t border-card-border" />
          <span className="text-xs text-secondary-text">or</span>
          <div className="flex-1 border-t border-card-border" />
        </div>

        <Button variant="outline" size="lg" className="w-full bg-transparent">
          Try as Guest
        </Button>
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
