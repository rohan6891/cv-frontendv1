import Link from "next/link"
import type { Metadata } from "next"
import { ArrowRight, Lock, Mail, Sparkles, User, UserPlus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "Sign up | PS8 Smart Resume Analyzer",
  description: "Create your PS8 account to unlock AI insights, resume optimization, and tailored job matching.",
}

export default function SignupPage() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground md:flex-row">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-500/10 via-indigo-500/10 to-blue-500/10" aria-hidden />
      <div className="absolute -left-24 top-16 -z-10 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/30 blur-3xl" aria-hidden />
      <div className="absolute bottom-12 right-[-90px] -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-blue-500/25 to-purple-500/15 blur-3xl" aria-hidden />

      <aside className="hidden w-full flex-1 flex-col justify-between bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white md:flex">
        <div className="p-12">
          <Badge className="rounded-full bg-white/20 px-3 py-1 text-white">Create your workspace</Badge>
          <h1 className="mt-6 text-3xl font-semibold leading-tight">Set up PS8 and start matching with better opportunities.</h1>
          <p className="mt-4 max-w-sm text-sm text-white/80">
            Our onboarding flow tailors recommendations to the roles and industries that inspire you.
          </p>
        </div>
        <div className="space-y-4 p-12">
          {[
            "Upload resumes in PDF, DOCX, or text formats",
            "Compare against real job descriptions in seconds",
            "Track improvements with weekly progress snapshots",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/85">
              <Sparkles className="h-4 w-4 flex-shrink-0 text-emerald-200" />
              {item}
            </div>
          ))}
        </div>
      </aside>

      <div className="flex w-full flex-1 items-center justify-center px-6 py-12 md:px-12">
        <Card className="w-full max-w-md rounded-[28px] border border-border/70 bg-white/95 p-1 backdrop-blur">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UserPlus className="h-5 w-5" />
            </div>
            <CardTitle className="text-2xl font-semibold">Join PS8</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Unlock the Smart Resume Analyzer and tailored job-matching intelligence.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Full name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="name" placeholder="Jordan Smith" className="h-12 rounded-xl pl-10" />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="signup-email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="signup-email" type="email" placeholder="you@example.com" className="h-12 rounded-xl pl-10" />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="signup-password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="signup-password" type="password" placeholder="Create a strong password" className="h-12 rounded-xl pl-10" />
              </div>
            </div>
            <div className="space-y-1">
              <label htmlFor="role-focus" className="text-sm font-medium text-foreground">
                Desired role focus
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="role-focus" placeholder="e.g., Product Manager, Data Analyst" className="h-12 rounded-xl pl-10" />
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              By creating an account you agree to our
              <Link href="#" className="mx-1 font-medium text-primary hover:text-primary/80">
                Terms
              </Link>
              and
              <Link href="#" className="mx-1 font-medium text-primary hover:text-primary/80">
                Privacy Policy
              </Link>
              .
            </div>
            <Button className="h-12 w-full rounded-xl text-base font-semibold">Create account</Button>
            <Button variant="outline" className="h-12 w-full rounded-xl border-border/70">
              <span className="flex items-center justify-center gap-2 text-sm font-medium">
                Continue with LinkedIn
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 text-sm text-muted-foreground">
            <div className="flex justify-center gap-2">
              <span>Already have an account?</span>
              <Link href="/login" className="font-medium text-primary transition-colors hover:text-primary/80">
                Log in
              </Link>
            </div>
            <p className="text-center text-xs">
              We use encrypted storage and never share your resume without explicit consent.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
