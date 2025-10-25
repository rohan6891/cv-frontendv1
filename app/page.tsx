import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  FileText,
  LineChart,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const featureHighlights = [
  {
    icon: Sparkles,
    title: "AI-Powered Resume Audit",
    description:
      "Parse every section of your resume, detect missing context, and surface high-impact improvements in seconds.",
  },
  {
    icon: Target,
    title: "Job Fit Scoring",
    description:
      "Match instantly against curated job descriptions with transparent scoring that shows exactly what drives the fit.",
  },
  {
    icon: LineChart,
    title: "Skill Gap Guidance",
    description:
      "Reveal critical gaps, recommended certifications, and suggested projects to close the distance on target roles.",
  },
  {
    icon: Users,
    title: "Recruiter-Ready Reports",
    description:
      "Generate concise summaries and tailored talking points that hiring teams can trust at a glance.",
  },
]

const processSteps = [
  {
    step: "Upload",
    title: "Import your resume and target role",
    description: "Drag-and-drop a PDF or paste your resume, then attach a job post or choose from our library.",
  },
  {
    step: "Analyze",
    title: "Let the AI deconstruct the details",
    description: "Our engine uncovers strengths, blind spots, and impact statements that hiring managers expect.",
  },
  {
    step: "Match",
    title: "Compare against live opportunities",
    description: "Receive a prioritized list of openings along with fit scores and recommended next actions.",
  },
  {
    step: "Elevate",
    title: "Ship polished, tailored applications",
    description: "Export recruiter-ready resumes, cover letters, and outreach messages crafted for each role.",
  },
]

const metrics = [
  {
    label: "Resume uplift",
    value: "92%",
    description: "of users see ATS scores improve after their first analysis run.",
  },
  {
    label: "Curated roles",
    value: "4k+",
    description: "fresh tech, product, and business openings refreshed daily.",
  },
  {
    label: "Time saved",
    value: "8 hrs/week",
    description: "reclaimed by automating tailoring and application research.",
  },
]

const insightHighlights = [
  "Strength, gap, and risk scoring for every section",
  "Impact language suggestions tuned to the job description",
  "Keyword coverage tracking for ATS alignment",
  "Instant skill graph that maps to market demand",
]

const testimonials = [
  {
    name: "Leah Ortiz",
    role: "Product Manager, Series B Startup",
    quote:
      "The analyzer showed me exactly where my resume fell flat for strategy roles. I landed three interviews in two weeks after applying the suggestions.",
  },
  {
    name: "Marcus Reid",
    role: "Technical Recruiter",
    quote:
      "Being able to hand candidates a prioritized action list is a game changer. It cuts my screening time in half and increases placement quality.",
  },
]

const personaBenefits = [
  {
    title: "For job seekers",
    points: [
      "Create role-specific resumes without rewriting from scratch.",
      "Understand exactly how your skills stack against the market.",
      "Track applications, feedback, and next steps in one workspace.",
    ],
    icon: FileText,
  },
  {
    title: "For recruiters",
    points: [
      "Screen faster with structured candidate snapshots.",
      "Surface qualified matches based on competency evidence.",
      "Share AI summaries with hiring managers instantly.",
    ],
    icon: Briefcase,
  },
]

export default function Home() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-24 top-0 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-purple-500/25 via-indigo-500/20 to-transparent blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-60px] h-[580px] w-[580px] rounded-full bg-gradient-to-tr from-blue-500/25 via-purple-500/15 to-transparent blur-3xl" />
      </div>

      <div className="relative">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-6 md:px-10">
          <Link href="/" className="flex items-center gap-3 font-semibold">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-lg text-white">
              PS8
            </span>
            <span className="hidden text-sm text-muted-foreground sm:block">Smart Resume Analyzer</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <Link href="#features" className="transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="transition-colors hover:text-primary">
              How it works
            </Link>
            <Link href="#insights" className="transition-colors hover:text-primary">
              Insights
            </Link>
            <Link href="#testimonials" className="transition-colors hover:text-primary">
              Voices
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden text-sm font-semibold text-muted-foreground transition-colors hover:text-primary md:block">
              Log in
            </Link>
            <Button asChild className="rounded-full px-5 py-2.5">
              <Link href="/signup">Start free</Link>
            </Button>
          </div>
        </header>

        <main>
          <section id="hero" className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-24 pt-12 md:pt-20 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary">Smart matching for high-impact careers</Badge>
                <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Craft resumes that hiring teams remember and match with roles that matter.
                </h1>
                <p className="max-w-xl text-base text-muted-foreground md:text-lg">
                  PS8 helps you elevate every job application with AI. Upload your resume, benchmark it against target positions, and receive actionable guidance that turns experience into measurable outcomes.
                </p>
              </div>

              <div className="flex flex-col items-start gap-3 sm:flex-row">
                <Button asChild className="rounded-full px-8 py-6 text-base">
                  <Link href="/signup">Launch my first analysis</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-full border-primary/40 bg-white/70 px-8 py-6 text-base backdrop-blur transition-colors hover:border-primary hover:bg-primary/10"
                >
                  <Link href="#how-it-works" className="flex items-center gap-2">
                    See how it works
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/70 backdrop-blur">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>
                      <CardDescription className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                        {metric.label}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{metric.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card className="relative overflow-hidden rounded-[34px] border-none bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl">
              <div className="absolute inset-0 opacity-30" aria-hidden>
                <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-white/20 blur-[120px]" />
                <div className="absolute bottom-0 left-[-100px] h-64 w-64 rounded-full bg-blue-400/30 blur-[100px]" />
              </div>
              <CardHeader className="relative space-y-2">
                <Badge className="w-fit rounded-full bg-white/20 text-white">Live insight preview</Badge>
                <CardTitle className="text-2xl font-semibold">Resume readiness snapshot</CardTitle>
                <CardDescription className="text-sm text-white/80">
                  Get a recruiter-grade overview before you ever hit submit.
                </CardDescription>
              </CardHeader>
              <CardContent className="relative space-y-5">
                <div className="flex flex-col gap-3">
                  {insightHighlights.map((item) => (
                    <div key={item} className="flex items-start gap-3 rounded-2xl bg-white/10 p-3 text-sm">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-200" />
                      <span className="text-white/90">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-3xl bg-white/15 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-sm text-white/80">
                    <span>Job match index</span>
                    <span className="font-semibold text-white">87 / 100</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                    <div className="h-full w-[87%] rounded-full bg-emerald-300" />
                  </div>
                  <p className="mt-3 text-xs text-white/70">
                    Boost to 92 with impact metrics for your product launch and advanced analytics tooling.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          <section id="features" className="mx-auto w-full max-w-7xl px-6 pb-24">
            <div className="mx-auto mb-14 max-w-3xl text-center">
              <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary">Built for modern hiring</Badge>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Deep intelligence for resumes, cover letters, and job matching.
              </h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Our AI interprets your experience the way a recruiter would, translating achievements into quantifiable value and highlighting the roles that match your trajectory.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featureHighlights.map((feature) => (
                <Card
                  key={feature.title}
                  className="group h-full rounded-3xl border border-border/60 bg-white/80 p-1 transition-transform hover:-translate-y-2 hover:border-primary/40"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section id="how-it-works" className="mx-auto w-full max-w-7xl px-6 pb-24">
            <div className="grid gap-8 rounded-[34px] border border-border/70 bg-white/80 p-8 backdrop-blur lg:grid-cols-[0.9fr,1.1fr] lg:p-12">
              <div className="space-y-6">
                <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary">Four steps. Immediate impact.</Badge>
                <h2 className="text-3xl font-semibold md:text-4xl">
                  A guided journey from raw resume to interview-ready materials.
                </h2>
                <p className="text-muted-foreground">
                  We pair transparent AI analysis with human-centered guidance so you always understand what to change and why it matters.
                </p>
                <div className="rounded-3xl bg-gradient-to-br from-purple-600/90 via-indigo-600/90 to-blue-600/90 p-6 text-white">
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <ShieldCheck className="h-5 w-5 text-emerald-200" />
                    Private by design
                  </div>
                  <p className="mt-3 text-lg font-semibold">Your data stays yours.</p>
                  <p className="text-sm text-white/80">
                    We anonymize uploads, encrypt every report, and purge files on request. Enterprise controls are available for recruiting teams.
                  </p>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {processSteps.map((step, index) => (
                  <Card key={step.title} className="rounded-3xl border border-border/60 bg-white/90 p-1">
                    <CardHeader className="space-y-3">
                      <Badge className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
                        Step {index + 1}
                      </Badge>
                      <CardTitle className="text-lg font-semibold">{step.step}</CardTitle>
                      <CardDescription className="text-base text-foreground">{step.title}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section id="insights" className="mx-auto w-full max-w-7xl px-6 pb-24">
            <div className="grid gap-8 lg:grid-cols-2">
              {personaBenefits.map((persona) => (
                <Card key={persona.title} className="h-full rounded-[32px] border border-border/70 bg-white/85 p-1">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <persona.icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-2xl font-semibold">{persona.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {persona.points.map((point) => (
                      <div key={point} className="flex items-start gap-3">
                        <BarChart3 className="mt-1 h-4 w-4 text-primary" />
                        <p className="text-sm text-muted-foreground">{point}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
              <Card className="rounded-[32px] border-none bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 p-10 text-white shadow-xl">
                <div className="flex items-center gap-3 text-sm uppercase tracking-widest text-white/70">
                  <Sparkles className="h-5 w-5" />
                  Advanced AI engine
                </div>
                <h3 className="mt-6 text-3xl font-semibold">Explainable intelligence from resume to offer.</h3>
                <p className="mt-4 text-white/80">
                  Understand exactly why the system recommends each change. Transparency modes visualize the keywords, competencies, and experience signals influencing every suggestion.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {[
                    "Role-specific keyword coverage",
                    "Quantified achievement rewrites",
                    "Portfolio and certification prompts",
                    "Interview-ready briefing docs",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm text-white/90">
                      <CheckCircle2 className="h-4 w-4 text-emerald-200" />
                      {item}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          <section id="testimonials" className="mx-auto w-full max-w-7xl px-6 pb-24">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary">What people are saying</Badge>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">Loved by ambitious candidates and fast-moving teams.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name} className="h-full rounded-3xl border border-border/60 bg-white/85 p-1">
                  <CardContent className="space-y-4 p-6">
                    <p className="text-lg font-medium text-foreground">“{testimonial.quote}”</p>
                    <div className="text-sm text-muted-foreground">
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p>{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="mx-auto w-full max-w-6xl px-6 pb-24">
            <Card className="overflow-hidden rounded-[36px] border-none bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 text-white shadow-2xl">
              <div className="relative p-10 md:p-16">
                <div className="absolute -right-32 top-1/2 hidden h-56 w-56 -translate-y-1/2 rounded-full bg-white/10 blur-3xl md:block" />
                <div className="space-y-6 md:max-w-3xl">
                  <Badge className="rounded-full bg-white/20 text-white">Ready when you are</Badge>
                  <h2 className="text-3xl font-semibold md:text-4xl">
                    Accelerate your next career move with tailored, data-backed applications.
                  </h2>
                  <p className="text-base text-white/80">
                    Join PS8 and transform your resume into a strategic asset. Every insight is actionable, every recommendation is transparent, and every application tells the story recruiters want to hear.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button asChild className="rounded-full bg-white px-8 py-6 text-base font-semibold text-indigo-700 hover:bg-white/90">
                      <Link href="/signup">Create your account</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="rounded-full border-white/50 px-8 py-6 text-base text-white hover:bg-white/10"
                    >
                      <Link href="/login">I already have access</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </section>
        </main>

        <footer className="border-t border-border/60 bg-white/70 backdrop-blur">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-semibold text-white">
                PS8
              </span>
              <div>
                <p className="font-medium text-foreground">Smart Resume Analyzer</p>
                <p className="text-xs text-muted-foreground">AI insights for standout applications.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <Link href="#features" className="transition-colors hover:text-primary">
                Product
              </Link>
              <Link href="#how-it-works" className="transition-colors hover:text-primary">
                Workflow
              </Link>
              <Link href="#testimonials" className="transition-colors hover:text-primary">
                Stories
              </Link>
              <Link href="/login" className="transition-colors hover:text-primary">
                Sign in
              </Link>
              <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} PS8. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
