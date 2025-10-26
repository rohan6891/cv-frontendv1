"use client"
import Link from "next/link"
// import type { Metadata } from "next"
import { Lock, Mail, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { login, me } from "@/lib/api"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

// export const metadata: Metadata = {
//   title: "Log in | PS8 Smart Resume Analyzer",
//   description: "Access your PS8 workspace to continue optimizing resumes and matching with top job opportunities.",
// }

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { access_token } = await login({ email, password })
      localStorage.setItem("token", access_token)
      const user = await me(access_token)
      localStorage.setItem("user", JSON.stringify(user))
      // redirect based on role
      if (user.role === "candidate") {
        router.push("/job-seeker/dashboard")
      } else {
        router.push("/")
      }
    } catch (err: any) {
      setError(err?.message || "Failed to sign in")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10" aria-hidden />
      <div className="absolute -right-24 top-24 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/30 blur-3xl" aria-hidden />
      <div className="absolute -left-24 bottom-16 -z-10 h-56 w-56 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/15 blur-3xl" aria-hidden />

      <aside className="hidden w-full flex-1 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white md:flex">
        <div className="flex w-full flex-col justify-between p-12">
          <div>
            <Badge className="rounded-full bg-white/20 px-3 py-1 text-white">Welcome back</Badge>
            <h1 className="mt-6 text-3xl font-semibold leading-tight">Keep building momentum toward the role you want.</h1>
            <p className="mt-4 max-w-sm text-sm text-white/80">
              Continue tailoring applications, monitoring skill gaps, and discovering openings that resonate with your goals.
            </p>
          </div>
          <div className="space-y-4">
            {[
              "Personalized scorecards for every job you track",
              "Real-time alerts when new matching roles drop",
              "Secure document storage for your resume versions",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/85">
                <Sparkles className="h-4 w-4 flex-shrink-0 text-emerald-200" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex w-full flex-1 items-center justify-center px-6 py-12 md:px-12">
        <Card className="w-full max-w-md rounded-[28px] border border-border/70 bg-white/90 p-1 backdrop-blur">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Lock className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl font-semibold">Log in to PS8</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Access the Smart Resume Analyzer to continue refining your job applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}
            <form className="space-y-6" onSubmit={onSubmit}>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="h-12 rounded-xl pl-10" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" className="h-12 rounded-xl pl-10" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="size-4 rounded border border-border text-primary" />
                Remember me
              </label>
              <Link href="#" className="font-medium text-primary transition-colors hover:text-primary/80">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" disabled={loading} className="h-12 w-full rounded-xl text-base font-semibold">
              {loading ? "Signing in..." : "Sign in"}
            </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex justify-center gap-2">
              <span>New to PS8?</span>
              <Link href="/signup" className="font-medium text-primary transition-colors hover:text-primary/80">
                Create an account
              </Link>
            </div>
            <p className="text-center text-xs">Protected by enterprise-grade security. We never share your data.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
