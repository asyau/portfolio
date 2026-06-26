"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Mail } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle")
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    setErrorMsg("")

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/admin/blog` },
    })

    if (error) {
      setErrorMsg(error.message)
      setStatus("error")
    } else {
      setStatus("sent")
    }
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Admin</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with a magic link to access the blog dashboard.
          </p>
        </div>

        {status === "sent" ? (
          <div className="p-4 rounded-xl border border-border bg-secondary/30 text-sm">
            Check your email — a magic link was sent to{" "}
            <strong>{email}</strong>.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border/50 bg-background focus:border-foreground focus:outline-none transition-colors text-sm"
              />
            </div>
            {errorMsg && (
              <p className="text-sm text-destructive">{errorMsg}</p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-accent-brand text-white rounded-lg font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === "loading" ? "Sending…" : "Send magic link"}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
