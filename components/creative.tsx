"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  BarChart3,
  Brain,
  Briefcase,
  CheckCircle2,
  Clock,
  FileText,
  ListChecks,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
                  <CardContent className="space-y-4">
                    {openRoles.map((role) => (
                      <div key={role.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{role.title}</h3>
                            <p className="text-sm text-muted-foreground">{role.location}</p>
                          </div>
                          <Badge variant="outline" className="rounded-full">
                            {role.priority} priority
                          </Badge>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-primary" /> {role.applicants} applicants
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-primary" /> Updated {role.refreshed}
                          </span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full">
                      <Sparkles className="mr-2 h-4 w-4" /> Add a new role
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="grid gap-6 rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur lg:grid-cols-3">
                {recruiterUniqueFeatures.map((feature) => (
                  <div key={feature.title} className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/80 p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </Card>
            </TabsContent>

            <TabsContent value="candidate" className="mt-8 space-y-10">
              <div id="candidate" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {jobSeekerMetrics.map((metric) => (
                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">
                    <CardHeader className="space-y-2">
                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">
                        {metric.label}
                      </CardDescription>
                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>
                      <p className="text-sm text-muted-foreground">{metric.helper}</p>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="grid gap-6 lg:grid-cols-[1.35fr,0.9fr]">
                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
                  <CardHeader className="space-y-2">
                    <Badge className="w-fit rounded-full bg-primary/10 text-primary">
                      Resume intelligence
                    </Badge>
                    <CardTitle className="text-2xl">Skill coverage and narrative map</CardTitle>
                    <CardDescription>
                      See how your story stacks up, which achievements shine, and exactly where to reinforce credibility.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillCoverage.map((skill) => (
                      <div key={skill.skill} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground">{skill.skill}</span>
                          <span className="text-muted-foreground">{skill.coverage}% • {skill.priority}</span>
                        </div>
                        <Progress value={skill.coverage} className="h-2 rounded-full" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>Growth actions</CardTitle>
                        <CardDescription>AI-recommended edits to unlock the next interview.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {growthActions.map((action) => (
                      <div key={action.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">
                        <h3 className="text-base font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.detail}</p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full border-primary/40">
                      Save to action plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <Badge className="rounded-full bg-primary/10 text-primary">Interview prep</Badge>
                    <h3 className="mt-2 text-2xl font-semibold">Role-targeted question bank</h3>
                    <p className="text-sm text-muted-foreground">
                      Practise with prompts generated from the job description, your resume, and the company context.
                    </p>
                  </div>
                  <Button asChild className="rounded-full">
                    <Link href="/interview-prep">
                      Launch practice mode <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {interviewPrepFocus.map((area) => (
                    <div key={area.category} className="rounded-3xl border border-border/60 bg-white/80 p-6">
                      <h4 className="text-base font-semibold">{area.category}</h4>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {area.prompts.map((prompt) => (
                          <li key={prompt} className="flex items-start gap-2">
                            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                            <span>{prompt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[32px] border border-primary/40 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-3">
                    <Badge className="rounded-full bg-white/20 text-white">Take the next step</Badge>
                    <h3 className="text-2xl font-semibold">Elevate your application in one click</h3>
                    <p className="text-sm text-white/80">
                      Generate a tailored resume using recruiter-approved templates or prep with AI-driven interview drills that mirror the role.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 md:w-80">
                    <Button asChild className="rounded-full bg-white text-indigo-700 hover:bg-white/90">
                      <Link href="/enhance">Enhance resume for this role</Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-white/60 text-white hover:bg-white/10">
                      <Link href="/interview-prep">Generate interview questions</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <footer className="border-t border-border/60 pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-semibold text-white">
                PS8
              </span>
              <div>
                <p className="font-medium text-foreground">Smart Resume Analyzer</p>
                <p>Built for job seekers and recruiting teams who want clarity.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#recruiter" className="transition-colors hover:text-primary">
                Recruiter workspace
              </Link>
              <Link href="#candidate" className="transition-colors hover:text-primary">
                Candidate workspace
              </Link>
              <Link href="/login" className="transition-colors hover:text-primary">
                Sign in
              </Link>
              <span className="text-xs text-muted-foreground">(c) {new Date().getFullYear()} PS8. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}"use client""use client"



import Link from "next/link"import Link from "next/link"

import { motion } from "framer-motion"import { motion } from "framer-motion"

import {import {

  ArrowRight,  ArrowRight,

  BarChart3,  BarChart3,

  Brain,  Brain,

  Briefcase,  Briefcase,

  CheckCircle2,  CheckCircle2,

  Clock,  Clock,

  FileText,  FileText,

  ListChecks,  ListChecks,

  ShieldCheck,  ShieldCheck,

  Sparkles,  Sparkles,

  Target,  Target,

  Users,  Users,

} from "lucide-react"} from "lucide-react"



import { Badge } from "@/components/ui/badge"import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"import { Button } from "@/components/ui/button"

import {import {

  Card,  Card,

  CardContent,  CardContent,

  CardDescription,  CardDescription,

  CardFooter,  CardFooter,

  CardHeader,  CardHeader,

  CardTitle,  CardTitle,

} from "@/components/ui/card"} from "@/components/ui/card"

import { Progress } from "@/components/ui/progress"import { Progress } from "@/components/ui/progress"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"



const recruiterMetrics = [const recruiterMetrics = [

  { label: "Average fit score", value: "87", helper: "+12 vs last week" },  { label: "Average fit score", value: "87", helper: "+12 vs last week" },

  { label: "Time saved per role", value: "18 hrs", helper: "Automated screening" },  { label: "Time saved per role", value: "18 hrs", helper: "Automated screening" },

  { label: "Bias guard coverage", value: "96%", helper: "Monitored attributes" },  { label: "Bias guard coverage", value: "96%", helper: "Monitored attributes" },

  { label: "Interview-ready candidates", value: "14", helper: "Across 3 open roles" },  { label: "Interview-ready candidates", value: "14", helper: "Across 3 open roles" },

]]



const openRoles = [const openRoles = [

  {  {

    title: "Senior Product Manager",    title: "Senior Product Manager",

    location: "Remote • North America",    location: "Remote • North America",

    applicants: 54,    applicants: 54,

    refreshed: "2h ago",    refreshed: "2h ago",

    priority: "High",    priority: "High",

  },  },

  {  {

    title: "Full-Stack Engineer",    title: "Full-Stack Engineer",

    location: "Hybrid • Berlin",    location: "Hybrid • Berlin",

    applicants: 38,    applicants: 38,

    refreshed: "4h ago",    refreshed: "4h ago",

    priority: "Medium",    priority: "Medium",

  },  },

  {  {

    title: "Data Analyst",    title: "Data Analyst",

    location: "Onsite • Singapore",    location: "Onsite • Singapore",

    applicants: 26,    applicants: 26,

    refreshed: "1d ago",    refreshed: "1d ago",

    priority: "High",    priority: "High",

  },  },

]]



const topCandidates = [const topCandidates = [

  {  {

    name: "Priya Shah",    name: "Priya Shah",

    role: "Product Manager",    role: "Product Manager",

    fitScore: 93,    fitScore: 93,

    strengths: ["Go-to-market", "AI roadmap"],    strengths: ["Go-to-market", "AI roadmap"],

    gaps: "Needs stakeholder negotiation example",    gaps: "Needs stakeholder negotiation example",

  },  },

  {  {

    name: "Marcus Lee",    name: "Marcus Lee",

    role: "Product Manager",    role: "Product Manager",

    fitScore: 90,    fitScore: 90,

    strengths: ["Product analytics", "Enterprise delivery"],    strengths: ["Product analytics", "Enterprise delivery"],

    gaps: "Missing AI experimentation",    gaps: "Missing AI experimentation",

  },  },

  {  {

    name: "Sarah Okoro",    name: "Sarah Okoro",

    role: "Product Manager",    role: "Product Manager",

    fitScore: 88,    fitScore: 88,

    strengths: ["Lifecycle growth", "Cross-functional leadership"],    strengths: ["Lifecycle growth", "Cross-functional leadership"],

    gaps: "Add revenue impact metric",    gaps: "Add revenue impact metric",

  },  },

]]



const recruiterUniqueFeatures = [const recruiterUniqueFeatures = [

  {  {

    title: "Opportunity pulse",    title: "Opportunity pulse",

    description: "AI monitors the candidate pool and highlights who is interview-ready, at-risk, or needs nurture outreach.",    description: "AI monitors the candidate pool and highlights who is interview-ready, at-risk, or needs nurture outreach.",

    icon: Users,    icon: Users,

  },  },

  {  {

    title: "Narrative briefs",    title: "Narrative briefs",

    description: "Generate role-specific digests for hiring managers with candidate storylines, skills coverage, and risk flags.",    description: "Generate role-specific digests for hiring managers with candidate storylines, skills coverage, and risk flags.",

    icon: FileText,    icon: FileText,

  },  },

  {  {

    title: "Bias guard",    title: "Bias guard",

    description: "Transparent scoring with protected attribute monitoring and recommendations to rebalance outreach.",    description: "Transparent scoring with protected attribute monitoring and recommendations to rebalance outreach.",

    icon: ShieldCheck,    icon: ShieldCheck,

  },  },

]]



const jobSeekerMetrics = [const jobSeekerMetrics = [

  { label: "Overall job match", value: "89", helper: "Above market benchmark" },  { label: "Overall job match", value: "89", helper: "Above market benchmark" },

  { label: "Impact statements upgraded", value: "7", helper: "Role aligned bullet rewrites" },  { label: "Impact statements upgraded", value: "7", helper: "Role aligned bullet rewrites" },

  { label: "Skill coverage", value: "82%", helper: "16 / 19 target skills" },  { label: "Skill coverage", value: "82%", helper: "16 / 19 target skills" },

  { label: "ATS readiness", value: "96%", helper: "Formatting + keyword density" },  { label: "ATS readiness", value: "96%", helper: "Formatting + keyword density" },

]]



const skillCoverage = [const skillCoverage = [

  { skill: "Product strategy", coverage: 95, priority: "Strength" },  { skill: "Product strategy", coverage: 95, priority: "Strength" },

  { skill: "AI experimentation", coverage: 68, priority: "Growth" },  { skill: "AI experimentation", coverage: 68, priority: "Growth" },

  { skill: "Monetization", coverage: 74, priority: "Growth" },  { skill: "Monetization", coverage: 74, priority: "Growth" },

  { skill: "Stakeholder alignment", coverage: 58, priority: "Gap" },  { skill: "Stakeholder alignment", coverage: 58, priority: "Gap" },

  { skill: "Data storytelling", coverage: 82, priority: "Strength" },  { skill: "Data storytelling", coverage: 82, priority: "Strength" },

]]

                  <Target className="h-4 w-4 text-emerald-200" />

const growthActions = [                  Role-aligned job matching

  {                </div>

    title: "Highlight measurable impact",                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">

    detail: "Add revenue, adoption, or retention metrics to two accomplishments to boost executive appeal.",                  <ShieldCheck className="h-4 w-4 text-emerald-200" />

  },                  Explainable AI decisions

  {                </div>

    title: "Demonstrate AI experimentation",              </CardFooter>

    detail: "Reference prototype or pilot projects and note experimentation frameworks used.",            </Card>

  },            <Card className="rounded-[28px] border border-border/70 bg-white/80 backdrop-blur">

  {              <CardHeader className="space-y-3">

    title: "Cross-functional leadership",                <Badge className="w-fit rounded-full bg-primary/10 text-primary">Dual-sided intelligence</Badge>

    detail: "Showcase collaboration with marketing, data, and engineering to manage stakeholder complexity.",                <CardTitle className="text-2xl">Two workspaces. One shared truth.</CardTitle>

  },                <CardDescription>

]                  Recruiters orchestrate the pipeline with confidence while candidates see exactly how to close the gap and tell a stronger story.

                </CardDescription>

const interviewPrepFocus = [              </CardHeader>

  {              <CardContent className="grid gap-4 text-sm text-muted-foreground">

    category: "Product vision and roadmap",                <div className="flex items-start gap-3">

    prompts: ["Walk me through how you define north-star metrics", "Describe a time you sunset a feature"],                  <div className="rounded-full bg-primary/10 p-2 text-primary">

  },                    <Briefcase className="h-4 w-4" />

  {                  </div>

    category: "Experimentation and AI",                  <p><span className="font-medium text-foreground">Recruiter hub:</span> Add jobs, bulk-upload resumes, compare AI insights, and share shortlist briefings instantly.</p>

    prompts: ["How do you de-risk AI features before launch?", "Share an example of ethical guardrails you implemented"],                </div>

  },                <div className="flex items-start gap-3">

  {                  <div className="rounded-full bg-primary/10 p-2 text-primary">

    category: "Execution and influence",                    <Brain className="h-4 w-4" />

    prompts: ["Tell us about managing conflicting stakeholder priorities", "How do you evaluate launch readiness?"],                  </div>

  },                  <p><span className="font-medium text-foreground">Job seeker hub:</span> Diagnose skill gaps, tailor resumes to each role, and practice with auto-generated interview scenarios.</p>

]                </div>

              </CardContent>

export function DesignaliCreative() {            </Card>

  return (          </div>

    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">        </section>

      <motion.div

        className="pointer-events-none absolute inset-0 -z-10 opacity-20"        <section id="recruiter" className="space-y-8">

        animate={{          <div className="flex flex-col gap-3">

          background: [            <h2 className="text-3xl font-semibold">Recruiter Intelligence Console</h2>

            "radial-gradient(circle at 30% 20%, rgba(120, 41, 190, 0.35) 0%, rgba(53, 71, 125, 0.2) 45%, transparent 70%)",            <p className="text-muted-foreground">

            "radial-gradient(circle at 70% 80%, rgba(76, 175, 80, 0.25) 0%, rgba(32, 119, 188, 0.2) 45%, transparent 75%)",              Upload resumes against a role, let PS8 rank, explain, and recommend. Every view is tuned to help talent teams move from intake to offer with clarity.

          ],            </p>

        }}          </div>

        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}

      />          <Tabs defaultValue="recruiter" className="w-full">

            <TabsList className="grid w-full max-w-lg grid-cols-2 rounded-full bg-muted/60 p-1">

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-24 pt-10 md:px-10">              <TabsTrigger value="recruiter" className="rounded-full">Recruiter workspace</TabsTrigger>

        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">              <TabsTrigger value="candidate" className="rounded-full">Candidate workspace</TabsTrigger>

          <div className="flex items-center gap-3">            </TabsList>

            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-lg font-semibold text-white">

              PS8            <TabsContent value="recruiter" className="mt-8 space-y-10">

            </span>              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div>                {recruiterMetrics.map((metric) => (

              <p className="text-sm font-semibold tracking-wide text-muted-foreground">Smart Resume Analyzer</p>                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">

              <h1 className="text-2xl font-semibold md:text-3xl">Job-ready storytelling for candidates and teams</h1>                    <CardHeader className="space-y-2">

            </div>                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">

          </div>                        {metric.label}

          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">                      </CardDescription>

            <Link href="#recruiter" className="transition-colors hover:text-primary">                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>

              Recruiter workspace                      <p className="text-sm text-muted-foreground">{metric.helper}</p>

            </Link>                    </CardHeader>

            <Link href="#candidate" className="transition-colors hover:text-primary">                  </Card>

              Candidate workspace                ))}

            </Link>              </div>

            <Link href="/login" className="transition-colors hover:text-primary">

              Log in              <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">

            </Link>                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">

            <Button asChild className="rounded-full px-5">                  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

              <Link href="/signup">Start free</Link>                    <div>

            </Button>                      <Badge className="rounded-full bg-primary/10 text-primary">Top matches</Badge>

          </nav>                      <CardTitle className="mt-3 text-2xl">Shortlist preview</CardTitle>

        </header>                      <CardDescription>Transparent ranking with skill signals, narrative notes, and bias checks.</CardDescription>

                    </div>

        <section className="space-y-6">                    <Button variant="outline" className="rounded-full border-primary/40">

          <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary">Statement PS8 • Advanced track</Badge>                      Export briefing

          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">                    </Button>

            <Card className="rounded-[32px] border-none bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white shadow-2xl">                  </CardHeader>

              <CardHeader className="space-y-4">                  <CardContent className="space-y-4">

                <CardTitle className="text-3xl font-semibold">Smart Resume Analyzer with Job Matching</CardTitle>                    {topCandidates.map((candidate) => (

                <CardDescription className="text-base text-white/80">                      <div

                  Upload resumes, benchmark against live roles, and deliver transparent insights on strengths, gaps, and next steps. PS8 surfaces the right candidates for recruiters while helping job seekers tailor, iterate, and land interviews faster.                        key={candidate.name}

                </CardDescription>                        className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/70 px-4 py-4 md:flex-row md:items-center md:justify-between"

              </CardHeader>                      >

              <CardFooter className="flex flex-wrap gap-4">                        <div>

                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">                          <p className="text-sm font-semibold text-muted-foreground">{candidate.role}</p>

                  <Sparkles className="h-4 w-4 text-emerald-200" />                          <h3 className="text-lg font-semibold">{candidate.name}</h3>

                  Guided resume uplift                          <p className="text-sm text-muted-foreground">{candidate.gaps}</p>

                </div>                        </div>

                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">                        <div className="flex flex-col items-start gap-2 md:items-end">

                  <Target className="h-4 w-4 text-emerald-200" />                          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">

                  Role-aligned job matching                            Fit score {candidate.fitScore}

                </div>                          </span>

                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">                          <div className="flex flex-wrap gap-2">

                  <ShieldCheck className="h-4 w-4 text-emerald-200" />                            {candidate.strengths.map((strength) => (

                  Explainable AI decisions                              <Badge key={`${candidate.name}-${strength}`} variant="outline" className="rounded-full">

                </div>                                <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />

              </CardFooter>                                {strength}

            </Card>                              </Badge>

            <Card className="rounded-[28px] border border-border/70 bg-white/80 backdrop-blur">                            ))}

              <CardHeader className="space-y-3">                          </div>

                <Badge className="w-fit rounded-full bg-primary/10 text-primary">Dual-sided intelligence</Badge>                        </div>

                <CardTitle className="text-2xl">Two workspaces. One shared truth.</CardTitle>                      </div>

                <CardDescription>                    ))}

                  Recruiters orchestrate the pipeline with confidence while candidates see exactly how to close the gap and tell a stronger story.                  </CardContent>

                </CardDescription>                </Card>

              </CardHeader>

              <CardContent className="grid gap-4 text-sm text-muted-foreground">                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">

                <div className="flex items-start gap-3">                  <CardHeader className="space-y-4">

                  <div className="rounded-full bg-primary/10 p-2 text-primary">                    <div className="flex items-center gap-3">

                    <Briefcase className="h-4 w-4" />                      <div className="rounded-full bg-primary/10 p-3 text-primary">

                  </div>                        <ListChecks className="h-5 w-5" />

                  <p><span className="font-medium text-foreground">Recruiter hub:</span> Add jobs, bulk-upload resumes, compare AI insights, and share shortlist briefings instantly.</p>                      </div>

                </div>                      <div>

                <div className="flex items-start gap-3">                        <CardTitle>Open roles overview</CardTitle>

                  <div className="rounded-full bg-primary/10 p-2 text-primary">                        <CardDescription>Monitor activity, freshness, and shortlist depth.</CardDescription>

                    <Brain className="h-4 w-4" />                      </div>

                  </div>                    </div>

                  <p><span className="font-medium text-foreground">Job seeker hub:</span> Diagnose skill gaps, tailor resumes to each role, and practice with auto-generated interview scenarios.</p>                  </CardHeader>

                </div>                  <CardContent className="space-y-4">

              </CardContent>                    {openRoles.map((role) => (

            </Card>                      <div key={role.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">

          </div>                        <div className="flex items-center justify-between">

        </section>                          <div>

                            <h3 className="font-semibold">{role.title}</h3>

        <section id="recruiter" className="space-y-8">                            <p className="text-sm text-muted-foreground">{role.location}</p>

          <div className="flex flex-col gap-3">                          </div>

            <h2 className="text-3xl font-semibold">Recruiter Intelligence Console</h2>                          <Badge variant="outline" className="rounded-full">

            <p className="text-muted-foreground">                            {role.priority} priority

              Upload resumes against a role, let PS8 rank, explain, and recommend. Every view is tuned to help talent teams move from intake to offer with clarity.                          </Badge>

            </p>                        </div>

          </div>                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">

                          <span className="flex items-center gap-1">

          <Tabs defaultValue="recruiter" className="w-full">                            <Users className="h-4 w-4 text-primary" /> {role.applicants} applicants

            <TabsList className="grid w-full max-w-lg grid-cols-2 rounded-full bg-muted/60 p-1">                          </span>

              <TabsTrigger value="recruiter" className="rounded-full">Recruiter workspace</TabsTrigger>                          <span className="flex items-center gap-1">

              <TabsTrigger value="candidate" className="rounded-full">Candidate workspace</TabsTrigger>                            <Clock className="h-4 w-4 text-primary" /> Updated {role.refreshed}

            </TabsList>                          </span>

                        </div>

            <TabsContent value="recruiter" className="mt-8 space-y-10">                      </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">                    ))}

                {recruiterMetrics.map((metric) => (                  </CardContent>

                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">                  <CardFooter>

                    <CardHeader className="space-y-2">                    <Button className="w-full rounded-full">

                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">                      <Sparkles className="mr-2 h-4 w-4" /> Add a new role

                        {metric.label}                    </Button>

                      </CardDescription>                  </CardFooter>

                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>                </Card>

                      <p className="text-sm text-muted-foreground">{metric.helper}</p>              </div>

                    </CardHeader>

                  </Card>              <Card className="grid gap-6 rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur lg:grid-cols-3">

                ))}                {recruiterUniqueFeatures.map((feature) => (

              </div>                  <div key={feature.title} className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/80 p-6">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">

              <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">                      <feature.icon className="h-5 w-5" />

                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">                    </div>

                  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">                    <h3 className="text-lg font-semibold">{feature.title}</h3>

                    <div>                    <p className="text-sm text-muted-foreground">{feature.description}</p>

                      <Badge className="rounded-full bg-primary/10 text-primary">Top matches</Badge>                  </div>

                      <CardTitle className="mt-3 text-2xl">Shortlist preview</CardTitle>                ))}

                      <CardDescription>Transparent ranking with skill signals, narrative notes, and bias checks.</CardDescription>              </Card>

                    </div>            </TabsContent>

                    <Button variant="outline" className="rounded-full border-primary/40">

                      Export briefing            <TabsContent value="candidate" className="mt-8 space-y-10">

                    </Button>              <div id="candidate" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                  </CardHeader>                {jobSeekerMetrics.map((metric) => (

                  <CardContent className="space-y-4">                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">

                    {topCandidates.map((candidate) => (                    <CardHeader className="space-y-2">

                      <div                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">

                        key={candidate.name}                        {metric.label}

                        className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/70 px-4 py-4 md:flex-row md:items-center md:justify-between"                      </CardDescription>

                      >                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>

                        <div>                      <p className="text-sm text-muted-foreground">{metric.helper}</p>

                          <p className="text-sm font-semibold text-muted-foreground">{candidate.role}</p>                    </CardHeader>

                          <h3 className="text-lg font-semibold">{candidate.name}</h3>                  </Card>

                          <p className="text-sm text-muted-foreground">{candidate.gaps}</p>                ))}

                        </div>              </div>

                        <div className="flex flex-col items-start gap-2 md:items-end">

                          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">              <div className="grid gap-6 lg:grid-cols-[1.35fr,0.9fr]">

                            Fit score {candidate.fitScore}                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">

                          </span>                  <CardHeader className="space-y-2">

                          <div className="flex flex-wrap gap-2">                    <Badge className="w-fit rounded-full bg-primary/10 text-primary">Resume intelligence</Badge>

                            {candidate.strengths.map((strength) => (                    <CardTitle className="text-2xl">Skill coverage and narrative map</CardTitle>

                              <Badge key={`${candidate.name}-${strength}`} variant="outline" className="rounded-full">                    <CardDescription>

                                <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />                      See how your story stacks up, which achievements shine, and exactly where to reinforce credibility.

                                {strength}                    </CardDescription>

                              </Badge>                  </CardHeader>

                            ))}                  <CardContent className="space-y-4">

                          </div>                    {skillCoverage.map((skill) => (

                        </div>                      <div key={skill.skill} className="space-y-2">

                      </div>                        <div className="flex items-center justify-between text-sm">

                    ))}                          <span className="font-medium text-foreground">{skill.skill}</span>

                  </CardContent>                          <span className="text-muted-foreground">{skill.coverage}% • {skill.priority}</span>

                </Card>                        </div>

                        <Progress value={skill.coverage} className="h-2 rounded-full" />

                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">                      </div>

                  <CardHeader className="space-y-4">                    ))}

                    <div className="flex items-center gap-3">                  </CardContent>

                      <div className="rounded-full bg-primary/10 p-3 text-primary">                </Card>

                        <ListChecks className="h-5 w-5" />

                      </div>                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">

                      <div>                  <CardHeader className="space-y-3">

                        <CardTitle>Open roles overview</CardTitle>                    <div className="flex items-center gap-3">

                        <CardDescription>Monitor activity, freshness, and shortlist depth.</CardDescription>                      <div className="rounded-full bg-primary/10 p-3 text-primary">

                      </div>                        <BarChart3 className="h-5 w-5" />

                    </div>                      </div>

                  </CardHeader>                      <div>

                  <CardContent className="space-y-4">                        <CardTitle>Growth actions</CardTitle>

                    {openRoles.map((role) => (                        <CardDescription>AI-recommended edits to unlock the next interview.</CardDescription>

                      <div key={role.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">                      </div>

                        <div className="flex items-center justify-between">                    </div>

                          <div>                  </CardHeader>

                            <h3 className="font-semibold">{role.title}</h3>                  <CardContent className="space-y-4">

                            <p className="text-sm text-muted-foreground">{role.location}</p>                    {growthActions.map((action) => (

                          </div>                      <div key={action.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">

                          <Badge variant="outline" className="rounded-full">                        <h3 className="text-base font-semibold">{action.title}</h3>

                            {role.priority} priority                        <p className="text-sm text-muted-foreground">{action.detail}</p>

                          </Badge>                      </div>

                        </div>                    ))}

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">                  </CardContent>

                          <span className="flex items-center gap-1">                  <CardFooter>

                            <Users className="h-4 w-4 text-primary" /> {role.applicants} applicants                    <Button variant="outline" className="w-full rounded-full border-primary/40">

                          </span>                      Save to action plan

                          <span className="flex items-center gap-1">                    </Button>

                            <Clock className="h-4 w-4 text-primary" /> Updated {role.refreshed}                  </CardFooter>

                          </span>                </Card>

                        </div>              </div>

                      </div>

                    ))}              <Card className="rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur">

                  </CardContent>                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                  <CardFooter>                  <div>

                    <Button className="w-full rounded-full">                    <Badge className="rounded-full bg-primary/10 text-primary">Interview prep</Badge>

                      <Sparkles className="mr-2 h-4 w-4" /> Add a new role                    <h3 className="mt-2 text-2xl font-semibold">Role-targeted question bank</h3>

                    </Button>                    <p className="text-sm text-muted-foreground">

                  </CardFooter>                      Practise with prompts generated from the job description, your resume, and the company context.

                </Card>                    </p>

              </div>                  </div>

                  <Button asChild className="rounded-full">

              <Card className="grid gap-6 rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur lg:grid-cols-3">                    <Link href="/interview-prep">

                {recruiterUniqueFeatures.map((feature) => (                      Launch practice mode <ArrowRight className="ml-2 h-4 w-4" />

                  <div key={feature.title} className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/80 p-6">                    </Link>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">                  </Button>

                      <feature.icon className="h-5 w-5" />                </div>

                    </div>                <div className="grid gap-4 md:grid-cols-3">

                    <h3 className="text-lg font-semibold">{feature.title}</h3>                  {interviewPrepFocus.map((area) => (

                    <p className="text-sm text-muted-foreground">{feature.description}</p>                    <div key={area.category} className="rounded-3xl border border-border/60 bg-white/80 p-6">

                  </div>                      <h4 className="text-base font-semibold">{area.category}</h4>

                ))}                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">

              </Card>                        {area.prompts.map((prompt) => (

            </TabsContent>                          <li key={prompt} className="flex items-start gap-2">

                            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />

            <TabsContent value="candidate" className="mt-8 space-y-10">                            <span>{prompt}</span>

              <div id="candidate" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">                          </li>

                {jobSeekerMetrics.map((metric) => (                        ))}

                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">                      </ul>

                    <CardHeader className="space-y-2">                    </div>

                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">                  ))}

                        {metric.label}                </div>

                      </CardDescription>              </Card>

                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>

                      <p className="text-sm text-muted-foreground">{metric.helper}</p>              <Card className="rounded-[32px] border border-primary/40 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">

                    </CardHeader>                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                  </Card>                  <div className="space-y-3">

                ))}                    <Badge className="rounded-full bg-white/20 text-white">Take the next step</Badge>

              </div>                    <h3 className="text-2xl font-semibold">Elevate your application in one click</h3>

                    <p className="text-sm text-white/80">

              <div className="grid gap-6 lg:grid-cols-[1.35fr,0.9fr]">                      Generate a tailored resume using recruiter-approved templates or prep with AI-driven interview drills that mirror the role.

                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">                    </p>

                  <CardHeader className="space-y-2">                  </div>

                    <Badge className="w-fit rounded-full bg-primary/10 text-primary">Resume intelligence</Badge>                  <div className="flex flex-col gap-3 md:w-80">

                    <CardTitle className="text-2xl">Skill coverage and narrative map</CardTitle>                    <Button asChild className="rounded-full bg-white text-indigo-700 hover:bg-white/90">

                    <CardDescription>                      <Link href="/enhance">Enhance resume for this role</Link>

                      See how your story stacks up, which achievements shine, and exactly where to reinforce credibility.                    </Button>

                    </CardDescription>                    <Button asChild variant="outline" className="rounded-full border-white/60 text-white hover:bg-white/10">

                  </CardHeader>                      <Link href="/interview-prep">Generate interview questions</Link>

                  <CardContent className="space-y-4">                    </Button>

                    {skillCoverage.map((skill) => (                  </div>

                      <div key={skill.skill} className="space-y-2">                </div>

                        <div className="flex items-center justify-between text-sm">              </Card>

                          <span className="font-medium text-foreground">{skill.skill}</span>            </TabsContent>

                          <span className="text-muted-foreground">{skill.coverage}% • {skill.priority}</span>          </Tabs>

                        </div>        </section>

                        <Progress value={skill.coverage} className="h-2 rounded-full" />

                      </div>        <footer className="border-t border-border/60 pt-8 text-sm text-muted-foreground">

                    ))}          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                  </CardContent>            <div className="flex items-center gap-3">

                </Card>              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-semibold text-white">

                PS8

                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">              </span>

                  <CardHeader className="space-y-3">              <div>

                    <div className="flex items-center gap-3">                <p className="font-medium text-foreground">Smart Resume Analyzer</p>

                      <div className="rounded-full bg-primary/10 p-3 text-primary">                <p>Built for job seekers and recruiting teams who want clarity.</p>

                        <BarChart3 className="h-5 w-5" />              </div>

                      </div>            </div>

                      <div>            <div className="flex flex-wrap items-center gap-4">

                        <CardTitle>Growth actions</CardTitle>              <Link href="#recruiter" className="transition-colors hover:text-primary">

                        <CardDescription>AI-recommended edits to unlock the next interview.</CardDescription>                Recruiter workspace

                      </div>              </Link>

                    </div>              <Link href="#candidate" className="transition-colors hover:text-primary">

                  </CardHeader>                Candidate workspace

                  <CardContent className="space-y-4">              </Link>

                    {growthActions.map((action) => (              <Link href="/login" className="transition-colors hover:text-primary">

                      <div key={action.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">                Sign in

                        <h3 className="text-base font-semibold">{action.title}</h3>              </Link>

                        <p className="text-sm text-muted-foreground">{action.detail}</p>              <span className="text-xs text-muted-foreground">(c) {new Date().getFullYear()} PS8. All rights reserved.</span>

                      </div>            </div>

                    ))}          </div>

                  </CardContent>        </footer>

                  <CardFooter>      </div>

                    <Button variant="outline" className="w-full rounded-full border-primary/40">    </div>

                      Save to action plan  )

                    </Button>}"use client""use client"                          className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"

                  </CardFooter>

                </Card>

              </div>

import Link from "next/link"                        >

              <Card className="rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur">

                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">import { motion } from "framer-motion"

                  <div>

                    <Badge className="rounded-full bg-primary/10 text-primary">Interview prep</Badge>import {import Link from "next/link"                          {subItem.title}

                    <h3 className="mt-2 text-2xl font-semibold">Role-targeted question bank</h3>

                    <p className="text-sm text-muted-foreground">  ArrowRight,

                      Practise with prompts generated from the job description, your resume, and the company context.

                    </p>  BarChart3,import { motion } from "framer-motion"                          {subItem.badge && (

                  </div>

                  <Button asChild className="rounded-full">  Brain,

                    <Link href="/interview-prep">

                      Launch practice mode <ArrowRight className="ml-2 h-4 w-4" />  Briefcase,import {                            <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">

                    </Link>

                  </Button>  CheckCircle2,

                </div>

                <div className="grid gap-4 md:grid-cols-3">  Clock,  ArrowRight,                              {subItem.badge}

                  {interviewPrepFocus.map((area) => (

                    <div key={area.category} className="rounded-3xl border border-border/60 bg-white/80 p-6">  FileText,

                      <h4 className="text-base font-semibold">{area.category}</h4>

                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">  ListChecks,  BarChart3,                            </Badge>

                        {area.prompts.map((prompt) => (

                          <li key={prompt} className="flex items-start gap-2">  ShieldCheck,

                            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />

                            <span>{prompt}</span>  Sparkles,  Brain,                          )}

                          </li>

                        ))}  Target,

                      </ul>

                    </div>  Users,  Briefcase,                        </a>

                  ))}

                </div>} from "lucide-react"

              </Card>

  CheckCircle2,                      ))}

              <Card className="rounded-[32px] border border-primary/40 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">import { Badge } from "@/components/ui/badge"

                  <div className="space-y-3">

                    <Badge className="rounded-full bg-white/20 text-white">Take the next step</Badge>import { Button } from "@/components/ui/button"  Clock,                    </div>

                    <h3 className="text-2xl font-semibold">Elevate your application in one click</h3>

                    <p className="text-sm text-white/80">import {

                      Generate a tailored resume using recruiter-approved templates or prep with AI-driven interview drills that mirror the role.

                    </p>  Card,  FileText,                  )}

                  </div>

                  <div className="flex flex-col gap-3 md:w-80">  CardContent,

                    <Button asChild className="rounded-full bg-white text-indigo-700 hover:bg-white/90">

                      <Link href="/enhance">Enhance resume for this role</Link>  CardDescription,  ListChecks,                </div>

                    </Button>

                    <Button asChild variant="outline" className="rounded-full border-white/60 text-white hover:bg-white/10">  CardFooter,

                      <Link href="/interview-prep">Generate interview questions</Link>

                    </Button>  CardHeader,  ShieldCheck,              ))}

                  </div>

                </div>  CardTitle,

              </Card>

            </TabsContent>} from "@/components/ui/card"  Sparkles,            </div>

          </Tabs>

        </section>import { Progress } from "@/components/ui/progress"



        <footer className="border-t border-border/60 pt-8 text-sm text-muted-foreground">import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"  Target,          </ScrollArea>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-semibold text-white">

                PS8const recruiterMetrics = [  Users,

              </span>

              <div>  { label: "Average fit score", value: "87", helper: "+12 vs last week" },

                <p className="font-medium text-foreground">Smart Resume Analyzer</p>

                <p>Built for job seekers and recruiting teams who want clarity.</p>  { label: "Time saved per role", value: "18 hrs", helper: "Automated screening" },} from "lucide-react"          <div className="border-t p-3">

              </div>

            </div>  { label: "Bias guard coverage", value: "96%", helper: "Monitored attributes" },

            <div className="flex flex-wrap items-center gap-4">

              <Link href="#recruiter" className="transition-colors hover:text-primary">  { label: "Interview-ready candidates", value: "14", helper: "Across 3 open roles" },            <div className="space-y-1">

                Recruiter workspace

              </Link>]

              <Link href="#candidate" className="transition-colors hover:text-primary">

                Candidate workspaceimport { Badge } from "@/components/ui/badge"              <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">

              </Link>

              <Link href="/login" className="transition-colors hover:text-primary">const openRoles = [

                Sign in

              </Link>  {import { Button } from "@/components/ui/button"                <Settings className="h-5 w-5" />

              <span className="text-xs text-muted-foreground">(c) {new Date().getFullYear()} PS8. All rights reserved.</span>

            </div>    title: "Senior Product Manager",

          </div>

        </footer>    location: "Remote • North America",import {                <span>Settings</span>

      </div>

    </div>    applicants: 54,

  )

}    refreshed: "2h ago",  Card,              </button>


    priority: "High",

  },  CardContent,              <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">

  {

    title: "Full-Stack Engineer",  CardDescription,                <div className="flex items-center gap-3">

    location: "Hybrid • Berlin",

    applicants: 38,  CardFooter,                  <Avatar className="h-6 w-6">

    refreshed: "4h ago",

    priority: "Medium",  CardHeader,                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />

  },

  {  CardTitle,                    <AvatarFallback>JD</AvatarFallback>

    title: "Data Analyst",

    location: "Onsite • Singapore",} from "@/components/ui/card"                  </Avatar>

    applicants: 26,

    refreshed: "1d ago",import { Progress } from "@/components/ui/progress"                  <span>John Doe</span>

    priority: "High",

  },import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"                </div>

]

                <Badge variant="outline" className="ml-auto">

const topCandidates = [

  {const recruiterMetrics = [                  Pro

    name: "Priya Shah",

    role: "Product Manager",  { label: "Average fit score", value: "87", helper: "+12 vs last week" },                </Badge>

    fitScore: 93,

    strengths: ["Go-to-market", "AI roadmap"],  { label: "Time saved per role", value: "18 hrs", helper: "Automated screening" },              </button>

    gaps: "Needs stakeholder negotiation example",

  },  { label: "Bias guard coverage", value: "96%", helper: "Monitored attributes" },            </div>

  {

    name: "Marcus Lee",  { label: "Interview-ready candidates", value: "14", helper: "Across 3 open roles" },          </div>

    role: "Product Manager",

    fitScore: 90,]        </div>

    strengths: ["Product analytics", "Enterprise delivery"],

    gaps: "Missing AI experimentation",      </div>

  },

  {const openRoles = [

    name: "Sarah Okoro",

    role: "Product Manager",  {      {/* Main Content */}

    fitScore: 88,

    strengths: ["Lifecycle growth", "Cross-functional leadership"],    title: "Senior Product Manager",      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>

    gaps: "Add revenue impact metric",

  },    location: "Remote • North America",        <header className="sticky top-0 z-10 flex h-16 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">

]

    applicants: 54,          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(true)}>

const recruiterUniqueFeatures = [

  {    refreshed: "2h ago",            <Menu className="h-5 w-5" />

    title: "Opportunity pulse",

    description: "AI monitors the candidate pool and highlights who is interview-ready, at-risk, or needs nurture outreach.",    priority: "High",          </Button>

    icon: Users,

  },  },          <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setSidebarOpen(!sidebarOpen)}>

  {

    title: "Narrative briefs",  {            <PanelLeft className="h-5 w-5" />

    description: "Generate role-specific digests for hiring managers with candidate storylines, skills coverage, and risk flags.",

    icon: FileText,    title: "Full-Stack Engineer",          </Button>

  },

  {    location: "Hybrid • Berlin",          <div className="flex flex-1 items-center justify-between">

    title: "Bias guard",

    description: "Transparent scoring with protected attribute monitoring and recommendations to rebalance outreach.",    applicants: 38,            <h1 className="text-xl font-semibold">Designali Creative</h1>

    icon: ShieldCheck,

  },    refreshed: "4h ago",            <div className="flex items-center gap-3">

]

    priority: "Medium",              <TooltipProvider>

const jobSeekerMetrics = [

  { label: "Overall job match", value: "89", helper: "Above market benchmark" },  },                <Tooltip>

  { label: "Impact statements upgraded", value: "7", helper: "Role aligned bullet rewrites" },

  { label: "Skill coverage", value: "82%", helper: "16 / 19 target skills" },  {                  <TooltipTrigger asChild>

  { label: "ATS readiness", value: "96%", helper: "Formatting + keyword density" },

]    title: "Data Analyst",                    <Button variant="ghost" size="icon" className="rounded-2xl">



const skillCoverage = [    location: "Onsite • Singapore",                      <Cloud className="h-5 w-5" />

  { skill: "Product strategy", coverage: 95, priority: "Strength" },

  { skill: "AI experimentation", coverage: 68, priority: "Growth" },    applicants: 26,                    </Button>

  { skill: "Monetization", coverage: 74, priority: "Growth" },

  { skill: "Stakeholder alignment", coverage: 58, priority: "Gap" },    refreshed: "1d ago",                  </TooltipTrigger>

  { skill: "Data storytelling", coverage: 82, priority: "Strength" },

]    priority: "High",                  <TooltipContent>Cloud Storage</TooltipContent>



const growthActions = [  },                </Tooltip>

  {

    title: "Highlight measurable impact",]              </TooltipProvider>

    detail: "Add revenue, adoption, or retention metrics to two accomplishments to boost executive appeal.",

  },

  {

    title: "Demonstrate AI experimentation",const topCandidates = [              <TooltipProvider>

    detail: "Reference prototype or pilot projects and note experimentation frameworks used.",

  },  {                <Tooltip>

  {

    title: "Cross-functional leadership",    name: "Priya Shah",                  <TooltipTrigger asChild>

    detail: "Showcase collaboration with marketing, data, and engineering to manage stakeholder complexity.",

  },    role: "Product Manager",                    <Button variant="ghost" size="icon" className="rounded-2xl">

]

    fitScore: 93,                      <MessageSquare className="h-5 w-5" />

const interviewPrepFocus = [

  {    strengths: ["Go-to-market", "AI roadmap"],                    </Button>

    category: "Product vision and roadmap",

    prompts: ["Walk me through how you define north-star metrics", "Describe a time you sunset a feature"],    gaps: "Needs stakeholder negotiation example",                  </TooltipTrigger>

  },

  {  },                  <TooltipContent>Messages</TooltipContent>

    category: "Experimentation and AI",

    prompts: ["How do you de-risk AI features before launch?", "Share an example of ethical guardrails you implemented"],  {                </Tooltip>

  },

  {    name: "Marcus Lee",              </TooltipProvider>

    category: "Execution and influence",

    prompts: ["Tell us about managing conflicting stakeholder priorities", "How do you evaluate launch readiness?"],    role: "Product Manager",

  },

]    fitScore: 90,              <TooltipProvider>



export function DesignaliCreative() {    strengths: ["Product analytics", "Enterprise delivery"],                <Tooltip>

  return (

    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">    gaps: "Missing AI experimentation",                  <TooltipTrigger asChild>

      <motion.div

        className="pointer-events-none absolute inset-0 -z-10 opacity-20"  },                    <Button variant="ghost" size="icon" className="rounded-2xl relative">

        animate={{

          background: [  {                      <Bell className="h-5 w-5" />

            "radial-gradient(circle at 30% 20%, rgba(120, 41, 190, 0.35) 0%, rgba(53, 71, 125, 0.2) 45%, transparent 70%)",

            "radial-gradient(circle at 70% 80%, rgba(76, 175, 80, 0.25) 0%, rgba(32, 119, 188, 0.2) 45%, transparent 75%)",    name: "Sarah Okoro",                      {notifications > 0 && (

          ],

        }}    role: "Product Manager",                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">

        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}

      />    fitScore: 88,                          {notifications}



      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-24 pt-10 md:px-10">    strengths: ["Lifecycle growth", "Cross-functional leadership"],                        </span>

        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">    gaps: "Add revenue impact metric",                      )}

            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-lg font-semibold text-white">

              PS8  },                    </Button>

            </span>

            <div>]                  </TooltipTrigger>

              <p className="text-sm font-semibold tracking-wide text-muted-foreground">Smart Resume Analyzer</p>

              <h1 className="text-2xl font-semibold md:text-3xl">Job-ready storytelling for candidates and teams</h1>                  <TooltipContent>Notifications</TooltipContent>

            </div>

          </div>const recruiterUniqueFeatures = [                </Tooltip>

          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">

            <Link href="#recruiter" className="transition-colors hover:text-primary">  {              </TooltipProvider>

              Recruiter workspace

            </Link>    title: "Opportunity pulse",

            <Link href="#candidate" className="transition-colors hover:text-primary">

              Candidate workspace    description: "AI monitors the candidate pool and highlights who is interview-ready, at-risk, or needs nurture outreach.",              <Avatar className="h-9 w-9 border-2 border-primary">

            </Link>

            <Link href="/login" className="transition-colors hover:text-primary">    icon: Users,                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />

              Log in

            </Link>  },                <AvatarFallback>JD</AvatarFallback>

            <Button asChild className="rounded-full px-5">

              <Link href="/signup">Start free</Link>  {              </Avatar>

            </Button>

          </nav>    title: "Narrative briefs",            </div>

        </header>

    description: "Generate role-specific digests for hiring managers with candidate storylines, skills coverage, and risk flags.",          </div>

        <section className="space-y-6">

          <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary">Statement PS8 • Advanced track</Badge>    icon: FileText,        </header>

          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">

            <Card className="rounded-[32px] border-none bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white shadow-2xl">  },

              <CardHeader className="space-y-4">

                <CardTitle className="text-3xl font-semibold">Smart Resume Analyzer with Job Matching</CardTitle>  {        <main className="flex-1 p-4 md:p-6">

                <CardDescription className="text-base text-white/80">

                  Upload resumes, benchmark against live roles, and deliver transparent insights on strengths, gaps, and next steps. PS8 surfaces the right candidates for recruiters while helping job seekers tailor, iterate, and land interviews faster.    title: "Bias guard",          <Tabs defaultValue="home" value={activeTab} onValueChange={setActiveTab} className="w-full">

                </CardDescription>

              </CardHeader>    description: "Transparent scoring with protected attribute monitoring and recommendations to rebalance outreach.",            <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              <CardFooter className="flex flex-wrap gap-4">

                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">    icon: ShieldCheck,              <TabsList className="grid w-full max-w-[600px] grid-cols-5 rounded-2xl p-1">

                  <Sparkles className="h-4 w-4 text-emerald-200" />

                  Guided resume uplift  },                <TabsTrigger value="home" className="rounded-xl data-[state=active]:rounded-xl">

                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">]                  Home

                  <Target className="h-4 w-4 text-emerald-200" />

                  Role-aligned job matching                </TabsTrigger>

                </div>

                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">const jobSeekerMetrics = [                <TabsTrigger value="apps" className="rounded-xl data-[state=active]:rounded-xl">

                  <ShieldCheck className="h-4 w-4 text-emerald-200" />

                  Explainable AI decisions  { label: "Overall job match", value: "89", helper: "Above market benchmark" },                  Apps

                </div>

              </CardFooter>  { label: "Impact statements upgraded", value: "7", helper: "Role aligned bullet rewrites" },                </TabsTrigger>

            </Card>

            <Card className="rounded-[28px] border border-border/70 bg-white/80 backdrop-blur">  { label: "Skill coverage", value: "82%", helper: "16 / 19 target skills" },                <TabsTrigger value="files" className="rounded-xl data-[state=active]:rounded-xl">

              <CardHeader className="space-y-3">

                <Badge className="w-fit rounded-full bg-primary/10 text-primary">Dual-sided intelligence</Badge>  { label: "ATS readiness", value: "96%", helper: "Formatting + keyword density" },                  Files

                <CardTitle className="text-2xl">Two workspaces. One shared truth.</CardTitle>

                <CardDescription>]                </TabsTrigger>

                  Recruiters orchestrate the pipeline with confidence while candidates see exactly how to close the gap and tell a stronger story.

                </CardDescription>                <TabsTrigger value="projects" className="rounded-xl data-[state=active]:rounded-xl">

              </CardHeader>

              <CardContent className="grid gap-4 text-sm text-muted-foreground">const skillCoverage = [                  Projects

                <div className="flex items-start gap-3">

                  <div className="rounded-full bg-primary/10 p-2 text-primary">  { skill: "Product strategy", coverage: 95, priority: "Strength" },                </TabsTrigger>

                    <Briefcase className="h-4 w-4" />

                  </div>  { skill: "AI experimentation", coverage: 68, priority: "Growth" },                <TabsTrigger value="learn" className="rounded-xl data-[state=active]:rounded-xl">

                  <p><span className="font-medium text-foreground">Recruiter hub:</span> Add jobs, bulk-upload resumes, compare AI insights, and share shortlist briefings instantly.</p>

                </div>  { skill: "Monetization", coverage: 74, priority: "Growth" },                  Learn

                <div className="flex items-start gap-3">

                  <div className="rounded-full bg-primary/10 p-2 text-primary">  { skill: "Stakeholder alignment", coverage: 58, priority: "Gap" },                </TabsTrigger>

                    <Brain className="h-4 w-4" />

                  </div>  { skill: "Data storytelling", coverage: 82, priority: "Strength" },              </TabsList>

                  <p><span className="font-medium text-foreground">Job seeker hub:</span> Diagnose skill gaps, tailor resumes to each role, and practice with auto-generated interview scenarios.</p>

                </div>]              <div className="hidden md:flex gap-2">

              </CardContent>

            </Card>                <Button variant="outline" className="rounded-2xl">

          </div>

        </section>const growthActions = [                  <Download className="mr-2 h-4 w-4" />



        <section id="recruiter" className="space-y-8">  {                  Install App

          <div className="flex flex-col gap-3">

            <h2 className="text-3xl font-semibold">Recruiter Intelligence Console</h2>    title: "Highlight measurable impact",                </Button>

            <p className="text-muted-foreground">

              Upload resumes against a role, let PS8 rank, explain, and recommend. Every view is tuned to help talent teams move from intake to offer with clarity.    detail: "Add revenue, adoption, or retention metrics to two accomplishments to boost executive appeal.",                <Button className="rounded-2xl">

            </p>

          </div>  },                  <Plus className="mr-2 h-4 w-4" />



          <Tabs defaultValue="recruiter" className="w-full">  {                  New Project

            <TabsList className="grid w-full max-w-lg grid-cols-2 rounded-full bg-muted/60 p-1">

              <TabsTrigger value="recruiter" className="rounded-full">Recruiter workspace</TabsTrigger>    title: "Demonstrate AI experimentation",                </Button>

              <TabsTrigger value="candidate" className="rounded-full">Candidate workspace</TabsTrigger>

            </TabsList>    detail: "Reference prototype or pilot projects and note experimentation frameworks used.",              </div>



            <TabsContent value="recruiter" className="mt-8 space-y-10">  },            </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                {recruiterMetrics.map((metric) => (  {

                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">

                    <CardHeader className="space-y-2">    title: "Cross-functional leadership",            <AnimatePresence mode="wait">

                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">

                        {metric.label}    detail: "Showcase collaboration with marketing, data, and engineering to manage stakeholder complexity.",              <motion.div

                      </CardDescription>

                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>  },                key={activeTab}

                      <p className="text-sm text-muted-foreground">{metric.helper}</p>

                    </CardHeader>]                initial={{ opacity: 0, y: 10 }}

                  </Card>

                ))}                animate={{ opacity: 1, y: 0 }}

              </div>

const interviewPrepFocus = [                exit={{ opacity: 0, y: -10 }}

              <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">

                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">  {                transition={{ duration: 0.2 }}

                  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">

                    <div>    category: "Product vision and roadmap",              >

                      <Badge className="rounded-full bg-primary/10 text-primary">Top matches</Badge>

                      <CardTitle className="mt-3 text-2xl">Shortlist preview</CardTitle>    prompts: ["Walk me through how you define north-star metrics", "Describe a time you sunset a feature"],                <TabsContent value="home" className="space-y-8 mt-0">

                      <CardDescription>Transparent ranking with skill signals, narrative notes, and bias checks.</CardDescription>

                    </div>  },                  <section>

                    <Button variant="outline" className="rounded-full border-primary/40">

                      Export briefing  {                    <motion.div

                    </Button>

                  </CardHeader>    category: "Experimentation and AI",                      initial={{ opacity: 0, y: 20 }}

                  <CardContent className="space-y-4">

                    {topCandidates.map((candidate) => (    prompts: ["How do you de-risk AI features before launch?", "Share an example of ethical guardrails you implemented"],                      animate={{ opacity: 1, y: 0 }}

                      <div

                        key={candidate.name}  },                      transition={{ duration: 0.5 }}

                        className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/70 px-4 py-4 md:flex-row md:items-center md:justify-between"

                      >  {                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 p-8 text-white"

                        <div>

                          <p className="text-sm font-semibold text-muted-foreground">{candidate.role}</p>    category: "Execution and influence",                    >

                          <h3 className="text-lg font-semibold">{candidate.name}</h3>

                          <p className="text-sm text-muted-foreground">{candidate.gaps}</p>    prompts: ["Tell us about managing conflicting stakeholder priorities", "How do you evaluate launch readiness?"],                      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                        </div>

                        <div className="flex flex-col items-start gap-2 md:items-end">  },                        <div className="space-y-4">

                          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">

                            Fit score {candidate.fitScore}]                          <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">Premium</Badge>

                          </span>

                          <div className="flex flex-wrap gap-2">                          <h2 className="text-3xl font-bold">Welcome to DesignAli Creative Suite</h2>

                            {candidate.strengths.map((strength) => (

                              <Badge key={`${candidate.name}-${strength}`} variant="outline" className="rounded-full">export function DesignaliCreative() {                          <p className="max-w-[600px] text-white/80">

                                <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />

                                {strength}  return (                            Unleash your creativity with our comprehensive suite of professional design tools and

                              </Badge>

                            ))}    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">                            resources.

                          </div>

                        </div>      <motion.div                          </p>

                      </div>

                    ))}        className="pointer-events-none absolute inset-0 -z-10 opacity-20"                          <div className="flex flex-wrap gap-3">

                  </CardContent>

                </Card>        animate={{                            <Button className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90">



                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">          background: [                              Explore Plans

                  <CardHeader className="space-y-4">

                    <div className="flex items-center gap-3">            "radial-gradient(circle at 30% 20%, rgba(120, 41, 190, 0.35) 0%, rgba(53, 71, 125, 0.2) 45%, transparent 70%)",                            </Button>

                      <div className="rounded-full bg-primary/10 p-3 text-primary">

                        <ListChecks className="h-5 w-5" />            "radial-gradient(circle at 70% 80%, rgba(76, 175, 80, 0.25) 0%, rgba(32, 119, 188, 0.2) 45%, transparent 75%)",                            <Button

                      </div>

                      <div>          ],                              variant="outline"

                        <CardTitle>Open roles overview</CardTitle>

                        <CardDescription>Monitor activity, freshness, and shortlist depth.</CardDescription>        }}                              className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"

                      </div>

                    </div>        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}                            >

                  </CardHeader>

                  <CardContent className="space-y-4">      />                              Take a Tour

                    {openRoles.map((role) => (

                      <div key={role.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">                            </Button>

                        <div className="flex items-center justify-between">

                          <div>      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-6 pb-24 pt-10 md:px-10">                          </div>

                            <h3 className="font-semibold">{role.title}</h3>

                            <p className="text-sm text-muted-foreground">{role.location}</p>        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">                        </div>

                          </div>

                          <Badge variant="outline" className="rounded-full">          <div className="flex items-center gap-3">                        <div className="hidden lg:block">

                            {role.priority} priority

                          </Badge>            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-lg font-semibold text-white">                          <motion.div

                        </div>

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">              PS8                            animate={{ rotate: 360 }}

                          <span className="flex items-center gap-1">

                            <Users className="h-4 w-4 text-primary" /> {role.applicants} applicants            </span>                            transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}

                          </span>

                          <span className="flex items-center gap-1">            <div>                            className="relative h-40 w-40"

                            <Clock className="h-4 w-4 text-primary" /> Updated {role.refreshed}

                          </span>              <p className="text-sm font-semibold tracking-wide text-muted-foreground">Smart Resume Analyzer</p>                          >

                        </div>

                      </div>              <h1 className="text-2xl font-semibold md:text-3xl">Job-ready storytelling for candidates and teams</h1>                            <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />

                    ))}

                  </CardContent>            </div>                            <div className="absolute inset-4 rounded-full bg-white/20" />

                  <CardFooter>

                    <Button className="w-full rounded-full">          </div>                            <div className="absolute inset-8 rounded-full bg-white/30" />

                      <Sparkles className="mr-2 h-4 w-4" /> Add a new role

                    </Button>          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">                            <div className="absolute inset-12 rounded-full bg-white/40" />

                  </CardFooter>

                </Card>            <Link href="#recruiter" className="transition-colors hover:text-primary">                            <div className="absolute inset-16 rounded-full bg-white/50" />

              </div>

              Recruiter workspace                          </motion.div>

              <Card className="grid gap-6 rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur lg:grid-cols-3">

                {recruiterUniqueFeatures.map((feature) => (            </Link>                        </div>

                  <div key={feature.title} className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/80 p-6">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">            <Link href="#candidate" className="transition-colors hover:text-primary">                      </div>

                      <feature.icon className="h-5 w-5" />

                    </div>              Candidate workspace                    </motion.div>

                    <h3 className="text-lg font-semibold">{feature.title}</h3>

                    <p className="text-sm text-muted-foreground">{feature.description}</p>            </Link>                  </section>

                  </div>

                ))}            <Link href="/login" className="transition-colors hover:text-primary">

              </Card>

            </TabsContent>              Log in                  <section className="space-y-4">



            <TabsContent value="candidate" className="mt-8 space-y-10">            </Link>                    <div className="flex items-center justify-between">

              <div id="candidate" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

                {jobSeekerMetrics.map((metric) => (            <Button asChild className="rounded-full px-5">                      <h2 className="text-2xl font-semibold">Recent Apps</h2>

                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">

                    <CardHeader className="space-y-2">              <Link href="/signup">Start free</Link>                      <Button variant="ghost" className="rounded-2xl">

                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">

                        {metric.label}            </Button>                        View All

                      </CardDescription>

                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>          </nav>                      </Button>

                      <p className="text-sm text-muted-foreground">{metric.helper}</p>

                    </CardHeader>        </header>                    </div>

                  </Card>

                ))}                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

              </div>

        <section className="space-y-6">                      {apps

              <div className="grid gap-6 lg:grid-cols-[1.35fr,0.9fr]">

                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">          <Badge className="rounded-full bg-primary/10 px-4 py-1 text-primary">Statement PS8 • Advanced track</Badge>                        .filter((app) => app.recent)

                  <CardHeader className="space-y-2">

                    <Badge className="w-fit rounded-full bg-primary/10 text-primary">Resume intelligence</Badge>          <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">                        .map((app) => (

                    <CardTitle className="text-2xl">Skill coverage and narrative map</CardTitle>

                    <CardDescription>            <Card className="rounded-[32px] border-none bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 text-white shadow-2xl">                          <motion.div key={app.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>

                      See how your story stacks up, which achievements shine, and exactly where to reinforce credibility.

                    </CardDescription>              <CardHeader className="space-y-4">                            <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">

                  </CardHeader>

                  <CardContent className="space-y-4">                <CardTitle className="text-3xl font-semibold">Smart Resume Analyzer with Job Matching</CardTitle>                              <CardHeader className="pb-2">

                    {skillCoverage.map((skill) => (

                      <div key={skill.skill} className="space-y-2">                <CardDescription className="text-base text-white/80">                                <div className="flex items-center justify-between">

                        <div className="flex items-center justify-between text-sm">

                          <span className="font-medium text-foreground">{skill.skill}</span>                  Upload resumes, benchmark against live roles, and deliver transparent insights on strengths, gaps, and next steps. PS8 surfaces the right candidates for recruiters while helping job seekers tailor, iterate, and land interviews faster.                                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">

                          <span className="text-muted-foreground">{skill.coverage}% • {skill.priority}</span>

                        </div>                </CardDescription>                                    {app.icon}

                        <Progress value={skill.coverage} className="h-2 rounded-full" />

                      </div>              </CardHeader>                                  </div>

                    ))}

                  </CardContent>              <CardFooter className="flex flex-wrap gap-4">                                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl">

                </Card>

                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">                                    <Star className="h-4 w-4" />

                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">

                  <CardHeader className="space-y-3">                  <Sparkles className="h-4 w-4 text-emerald-200" />                                  </Button>

                    <div className="flex items-center gap-3">

                      <div className="rounded-full bg-primary/10 p-3 text-primary">                  Guided resume uplift                                </div>

                        <BarChart3 className="h-5 w-5" />

                      </div>                </div>                              </CardHeader>

                      <div>

                        <CardTitle>Growth actions</CardTitle>                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">                              <CardContent className="pb-2">

                        <CardDescription>AI-recommended edits to unlock the next interview.</CardDescription>

                      </div>                  <Target className="h-4 w-4 text-emerald-200" />                                <CardTitle className="text-lg">{app.name}</CardTitle>

                    </div>

                  </CardHeader>                  Role-aligned job matching                                <CardDescription>{app.description}</CardDescription>

                  <CardContent className="space-y-4">

                    {growthActions.map((action) => (                </div>                              </CardContent>

                      <div key={action.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">

                        <h3 className="text-base font-semibold">{action.title}</h3>                <div className="flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm">                              <CardFooter>

                        <p className="text-sm text-muted-foreground">{action.detail}</p>

                      </div>                  <ShieldCheck className="h-4 w-4 text-emerald-200" />                                <Button variant="secondary" className="w-full rounded-2xl">

                    ))}

                  </CardContent>                  Explainable AI decisions                                  Open

                  <CardFooter>

                    <Button variant="outline" className="w-full rounded-full border-primary/40">                </div>                                </Button>

                      Save to action plan

                    </Button>              </CardFooter>                              </CardFooter>

                  </CardFooter>

                </Card>            </Card>                            </Card>

              </div>

            <Card className="rounded-[28px] border border-border/70 bg-white/80 backdrop-blur">                          </motion.div>

              <Card className="rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur">

                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">              <CardHeader className="space-y-3">                        ))}

                  <div>

                    <Badge className="rounded-full bg-primary/10 text-primary">Interview prep</Badge>                <Badge className="w-fit rounded-full bg-primary/10 text-primary">Dual-sided intelligence</Badge>                    </div>

                    <h3 className="mt-2 text-2xl font-semibold">Role-targeted question bank</h3>

                    <p className="text-sm text-muted-foreground">                <CardTitle className="text-2xl">Two workspaces. One shared truth.</CardTitle>                  </section>

                      Practise with prompts generated from the job description, your resume, and the company context.

                    </p>                <CardDescription>

                  </div>

                  <Button asChild className="rounded-full">                  Recruiters orchestrate the pipeline with confidence while candidates see exactly how to close the gap and tell a stronger story.                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    <Link href="/interview-prep">

                      Launch practice mode <ArrowRight className="ml-2 h-4 w-4" />                </CardDescription>                    <section className="space-y-4">

                    </Link>

                  </Button>              </CardHeader>                      <div className="flex items-center justify-between">

                </div>

                <div className="grid gap-4 md:grid-cols-3">              <CardContent className="grid gap-4 text-sm text-muted-foreground">                        <h2 className="text-2xl font-semibold">Recent Files</h2>

                  {interviewPrepFocus.map((area) => (

                    <div key={area.category} className="rounded-3xl border border-border/60 bg-white/80 p-6">                <div className="flex items-start gap-3">                        <Button variant="ghost" className="rounded-2xl">

                      <h4 className="text-base font-semibold">{area.category}</h4>

                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">                  <div className="rounded-full bg-primary/10 p-2 text-primary">                          View All

                        {area.prompts.map((prompt) => (

                          <li key={prompt} className="flex items-start gap-2">                    <Briefcase className="h-4 w-4" />                        </Button>

                            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />

                            <span>{prompt}</span>                  </div>                      </div>

                          </li>

                        ))}                  <p><span className="font-medium text-foreground">Recruiter hub:</span> Add jobs, bulk-upload resumes, compare AI insights, and share shortlist briefings instantly.</p>                      <div className="rounded-3xl border">

                      </ul>

                    </div>                </div>                        <div className="grid grid-cols-1 divide-y">

                  ))}

                </div>                <div className="flex items-start gap-3">                          {recentFiles.slice(0, 4).map((file) => (

              </Card>

                  <div className="rounded-full bg-primary/10 p-2 text-primary">                            <motion.div

              <Card className="rounded-[32px] border border-primary/40 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">                    <Brain className="h-4 w-4" />                              key={file.name}

                  <div className="space-y-3">

                    <Badge className="rounded-full bg-white/20 text-white">Take the next step</Badge>                  </div>                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}

                    <h3 className="text-2xl font-semibold">Elevate your application in one click</h3>

                    <p className="text-sm text-white/80">                  <p><span className="font-medium text-foreground">Job seeker hub:</span> Diagnose skill gaps, tailor resumes to each role, and practice with auto-generated interview scenarios.</p>                              className="flex items-center justify-between p-4"

                      Generate a tailored resume using recruiter-approved templates or prep with AI-driven interview drills that mirror the role.

                    </p>                </div>                            >

                  </div>

                  <div className="flex flex-col gap-3 md:w-80">              </CardContent>                              <div className="flex items-center gap-3">

                    <Button asChild className="rounded-full bg-white text-indigo-700 hover:bg-white/90">

                      <Link href="/enhance">Enhance resume for this role</Link>            </Card>                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">

                    </Button>

                    <Button asChild variant="outline" className="rounded-full border-white/60 text-white hover:bg-white/10">          </div>                                  {file.icon}

                      <Link href="/interview-prep">Generate interview questions</Link>

                    </Button>        </section>                                </div>

                  </div>

                </div>                                <div>

              </Card>

            </TabsContent>        <section id="recruiter" className="space-y-8">                                  <p className="font-medium">{file.name}</p>

          </Tabs>

        </section>          <div className="flex flex-col gap-3">                                  <p className="text-sm text-muted-foreground">



        <footer className="border-t border-border/60 pt-8 text-sm text-muted-foreground">            <h2 className="text-3xl font-semibold">Recruiter Intelligence Console</h2>                                    {file.app} • {file.modified}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">            <p className="text-muted-foreground">                                  </p>

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-semibold text-white">

                PS8              Upload resumes against a role, let PS8 rank, explain, and recommend. Every view is tuned to help talent teams move from intake to offer with clarity.                                </div>

              </span>

              <div>            </p>                              </div>

                <p className="font-medium text-foreground">Smart Resume Analyzer</p>

                <p>Built for job seekers and recruiting teams who want clarity.</p>          </div>                              <div className="flex items-center gap-2">

              </div>

            </div>                                {file.shared && (

            <div className="flex flex-wrap items-center gap-4">

              <Link href="#recruiter" className="transition-colors hover:text-primary">          <Tabs defaultValue="recruiter" className="w-full">                                  <Badge variant="outline" className="rounded-xl">

                Recruiter workspace

              </Link>            <TabsList className="grid w-full max-w-lg grid-cols-2 rounded-full bg-muted/60 p-1">                                    <Users className="mr-1 h-3 w-3" />

              <Link href="#candidate" className="transition-colors hover:text-primary">

                Candidate workspace              <TabsTrigger value="recruiter" className="rounded-full">Recruiter workspace</TabsTrigger>                                    {file.collaborators}

              </Link>

              <Link href="/login" className="transition-colors hover:text-primary">              <TabsTrigger value="candidate" className="rounded-full">Candidate workspace</TabsTrigger>                                  </Badge>

                Sign in

              </Link>            </TabsList>                                )}

              <span className="text-xs text-muted-foreground">(c) {new Date().getFullYear()} PS8. All rights reserved.</span>

            </div>                                <Button variant="ghost" size="sm" className="rounded-xl">

          </div>

        </footer>            <TabsContent value="recruiter" className="mt-8 space-y-10">                                  Open

      </div>

    </div>              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">                                </Button>

  )

}                {recruiterMetrics.map((metric) => (                              </div>


                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">                            </motion.div>

                    <CardHeader className="space-y-2">                          ))}

                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">                        </div>

                        {metric.label}                      </div>

                      </CardDescription>                    </section>

                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>

                      <p className="text-sm text-muted-foreground">{metric.helper}</p>                    <section className="space-y-4">

                    </CardHeader>                      <div className="flex items-center justify-between">

                  </Card>                        <h2 className="text-2xl font-semibold">Active Projects</h2>

                ))}                        <Button variant="ghost" className="rounded-2xl">

              </div>                          View All

                        </Button>

              <div className="grid gap-6 lg:grid-cols-[1.4fr,1fr]">                      </div>

                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">                      <div className="rounded-3xl border">

                  <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">                        <div className="grid grid-cols-1 divide-y">

                    <div>                          {projects.slice(0, 3).map((project) => (

                      <Badge className="rounded-full bg-primary/10 text-primary">Top matches</Badge>                            <motion.div

                      <CardTitle className="mt-3 text-2xl">Shortlist preview</CardTitle>                              key={project.name}

                      <CardDescription>Transparent ranking with skill signals, narrative notes, and bias checks.</CardDescription>                              whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}

                    </div>                              className="p-4"

                    <Button variant="outline" className="rounded-full border-primary/40">                            >

                      Export briefing                              <div className="flex items-center justify-between mb-2">

                    </Button>                                <h3 className="font-medium">{project.name}</h3>

                  </CardHeader>                                <Badge variant="outline" className="rounded-xl">

                  <CardContent className="space-y-4">                                  Due {project.dueDate}

                    {topCandidates.map((candidate) => (                                </Badge>

                      <div                              </div>

                        key={candidate.name}                              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>

                        className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/70 px-4 py-4 md:flex-row md:items-center md:justify-between"                              <div className="space-y-2">

                      >                                <div className="flex items-center justify-between text-sm">

                        <div>                                  <span>Progress</span>

                          <p className="text-sm font-semibold text-muted-foreground">{candidate.role}</p>                                  <span>{project.progress}%</span>

                          <h3 className="text-lg font-semibold">{candidate.name}</h3>                                </div>

                          <p className="text-sm text-muted-foreground">{candidate.gaps}</p>                                <Progress value={project.progress} className="h-2 rounded-xl" />

                        </div>                              </div>

                        <div className="flex flex-col items-start gap-2 md:items-end">                              <div className="flex items-center justify-between mt-3 text-sm text-muted-foreground">

                          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">                                <div className="flex items-center">

                            Fit score {candidate.fitScore}                                  <Users className="mr-1 h-4 w-4" />

                          </span>                                  {project.members} members

                          <div className="flex flex-wrap gap-2">                                </div>

                            {candidate.strengths.map((strength) => (                                <div className="flex items-center">

                              <Badge key={`${candidate.name}-${strength}`} variant="outline" className="rounded-full">                                  <FileText className="mr-1 h-4 w-4" />

                                <CheckCircle2 className="mr-1 h-3 w-3 text-emerald-500" />                                  {project.files} files

                                {strength}                                </div>

                              </Badge>                              </div>

                            ))}                            </motion.div>

                          </div>                          ))}

                        </div>                        </div>

                      </div>                      </div>

                    ))}                    </section>

                  </CardContent>                  </div>

                </Card>

                  <section className="space-y-4">

                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">                    <div className="flex items-center justify-between">

                  <CardHeader className="space-y-4">                      <h2 className="text-2xl font-semibold">Community Highlights</h2>

                    <div className="flex items-center gap-3">                      <Button variant="ghost" className="rounded-2xl">

                      <div className="rounded-full bg-primary/10 p-3 text-primary">                        Explore

                        <ListChecks className="h-5 w-5" />                      </Button>

                      </div>                    </div>

                      <div>                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        <CardTitle>Open roles overview</CardTitle>                      {communityPosts.map((post) => (

                        <CardDescription>Monitor activity, freshness, and shortlist depth.</CardDescription>                        <motion.div key={post.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>

                      </div>                          <Card className="overflow-hidden rounded-3xl">

                    </div>                            <div className="aspect-[4/3] overflow-hidden bg-muted">

                  </CardHeader>                              <img

                  <CardContent className="space-y-4">                                src={post.image || "/placeholder.svg"}

                    {openRoles.map((role) => (                                alt={post.title}

                      <div key={role.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"

                        <div className="flex items-center justify-between">                              />

                          <div>                            </div>

                            <h3 className="font-semibold">{role.title}</h3>                            <CardContent className="p-4">

                            <p className="text-sm text-muted-foreground">{role.location}</p>                              <h3 className="font-semibold">{post.title}</h3>

                          </div>                              <p className="text-sm text-muted-foreground">by {post.author}</p>

                          <Badge variant="outline" className="rounded-full">                              <div className="mt-2 flex items-center justify-between text-sm">

                            {role.priority} priority                                <div className="flex items-center gap-2">

                          </Badge>                                  <Heart className="h-4 w-4 text-red-500" />

                        </div>                                  {post.likes}

                        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">                                  <MessageSquare className="ml-2 h-4 w-4 text-blue-500" />

                          <span className="flex items-center gap-1">                                  {post.comments}

                            <Users className="h-4 w-4 text-primary" /> {role.applicants} applicants                                </div>

                          </span>                                <span className="text-muted-foreground">{post.time}</span>

                          <span className="flex items-center gap-1">                              </div>

                            <Clock className="h-4 w-4 text-primary" /> Updated {role.refreshed}                            </CardContent>

                          </span>                          </Card>

                        </div>                        </motion.div>

                      </div>                      ))}

                    ))}                    </div>

                  </CardContent>                  </section>

                  <CardFooter>                </TabsContent>

                    <Button className="w-full rounded-full">

                      <Sparkles className="mr-2 h-4 w-4" /> Add a new role                <TabsContent value="apps" className="space-y-8 mt-0">

                    </Button>                  <section>

                  </CardFooter>                    <motion.div

                </Card>                      initial={{ opacity: 0, y: 20 }}

              </div>                      animate={{ opacity: 1, y: 0 }}

                      transition={{ duration: 0.5 }}

              <Card className="grid gap-6 rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur lg:grid-cols-3">                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 p-8 text-white"

                {recruiterUniqueFeatures.map((feature) => (                    >

                  <div key={feature.title} className="flex flex-col gap-3 rounded-3xl border border-border/60 bg-white/80 p-6">                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">                        <div className="space-y-2">

                      <feature.icon className="h-5 w-5" />                          <h2 className="text-3xl font-bold">Creative Apps Collection</h2>

                    </div>                          <p className="max-w-[600px] text-white/80">

                    <h3 className="text-lg font-semibold">{feature.title}</h3>                            Discover our full suite of professional design and creative applications.

                    <p className="text-sm text-muted-foreground">{feature.description}</p>                          </p>

                  </div>                        </div>

                ))}                        <Button className="w-fit rounded-2xl bg-white text-red-700 hover:bg-white/90">

              </Card>                          <Download className="mr-2 h-4 w-4" />

            </TabsContent>                          Install Desktop App

                        </Button>

            <TabsContent value="candidate" className="mt-8 space-y-10">                      </div>

              <div id="candidate" className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">                    </motion.div>

                {jobSeekerMetrics.map((metric) => (                  </section>

                  <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">

                    <CardHeader className="space-y-2">                  <div className="flex flex-wrap gap-3 mb-6">

                      <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">                    <Button variant="outline" className="rounded-2xl">

                        {metric.label}                      All Categories

                      </CardDescription>                    </Button>

                      <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>                    <Button variant="outline" className="rounded-2xl">

                      <p className="text-sm text-muted-foreground">{metric.helper}</p>                      Creative

                    </CardHeader>                    </Button>

                  </Card>                    <Button variant="outline" className="rounded-2xl">

                ))}                      Video

              </div>                    </Button>

                    <Button variant="outline" className="rounded-2xl">

              <div className="grid gap-6 lg:grid-cols-[1.35fr,0.9fr]">                      Web

                <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">                    </Button>

                  <CardHeader className="space-y-2">                    <Button variant="outline" className="rounded-2xl">

                    <Badge className="w-fit rounded-full bg-primary/10 text-primary">Resume intelligence</Badge>                      3D

                    <CardTitle className="text-2xl">Skill coverage and narrative map</CardTitle>                    </Button>

                    <CardDescription>                    <div className="flex-1"></div>

                      See how your story stacks up, which achievements shine, and exactly where to reinforce credibility.                    <div className="relative w-full md:w-auto mt-3 md:mt-0">

                    </CardDescription>                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

                  </CardHeader>                      <Input

                  <CardContent className="space-y-4">                        type="search"

                    {skillCoverage.map((skill) => (                        placeholder="Search apps..."

                      <div key={skill.skill} className="space-y-2">                        className="w-full rounded-2xl pl-9 md:w-[200px]"

                        <div className="flex items-center justify-between text-sm">                      />

                          <span className="font-medium text-foreground">{skill.skill}</span>                    </div>

                          <span className="text-muted-foreground">{skill.coverage}% • {skill.priority}</span>                  </div>

                        </div>

                        <Progress value={skill.coverage} className="h-2 rounded-full" />                  <section className="space-y-4">

                      </div>                    <h2 className="text-2xl font-semibold">New Releases</h2>

                    ))}                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                  </CardContent>                      {apps

                </Card>                        .filter((app) => app.new)

                        .map((app) => (

                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">                          <motion.div key={app.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>

                  <CardHeader className="space-y-3">                            <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">

                    <div className="flex items-center gap-3">                              <CardHeader className="pb-2">

                      <div className="rounded-full bg-primary/10 p-3 text-primary">                                <div className="flex items-center justify-between">

                        <BarChart3 className="h-5 w-5" />                                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">

                      </div>                                    {app.icon}

                      <div>                                  </div>

                        <CardTitle>Growth actions</CardTitle>                                  <Badge className="rounded-xl bg-amber-500">New</Badge>

                        <CardDescription>AI-recommended edits to unlock the next interview.</CardDescription>                                </div>

                      </div>                              </CardHeader>

                    </div>                              <CardContent className="pb-2">

                  </CardHeader>                                <CardTitle className="text-lg">{app.name}</CardTitle>

                  <CardContent className="space-y-4">                                <CardDescription>{app.description}</CardDescription>

                    {growthActions.map((action) => (                                <div className="mt-2">

                      <div key={action.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">                                  <div className="flex items-center justify-between text-sm">

                        <h3 className="text-base font-semibold">{action.title}</h3>                                    <span>Installation</span>

                        <p className="text-sm text-muted-foreground">{action.detail}</p>                                    <span>{app.progress}%</span>

                      </div>                                  </div>

                    ))}                                  <Progress value={app.progress} className="h-2 mt-1 rounded-xl" />

                  </CardContent>                                </div>

                  <CardFooter>                              </CardContent>

                    <Button variant="outline" className="w-full rounded-full border-primary/40">                              <CardFooter>

                      Save to action plan                                <Button variant="secondary" className="w-full rounded-2xl">

                    </Button>                                  {app.progress < 100 ? "Continue Install" : "Open"}

                  </CardFooter>                                </Button>

                </Card>                              </CardFooter>

              </div>                            </Card>

                          </motion.div>

              <Card className="rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur">                        ))}

                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">                    </div>

                  <div>                  </section>

                    <Badge className="rounded-full bg-primary/10 text-primary">Interview prep</Badge>

                    <h3 className="mt-2 text-2xl font-semibold">Role-targeted question bank</h3>                  <section className="space-y-4">

                    <p className="text-sm text-muted-foreground">                    <h2 className="text-2xl font-semibold">All Apps</h2>

                      Practise with prompts generated from the job description, your resume, and the company context.                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    </p>                      {apps.map((app) => (

                  </div>                        <motion.div key={app.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>

                  <Button asChild className="rounded-full">                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">

                    <Link href="/interview-prep">                            <CardHeader className="pb-2">

                      Launch practice mode <ArrowRight className="ml-2 h-4 w-4" />                              <div className="flex items-center justify-between">

                    </Link>                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">

                  </Button>                                  {app.icon}

                </div>                                </div>

                <div className="grid gap-4 md:grid-cols-3">                                <Badge variant="outline" className="rounded-xl">

                  {interviewPrepFocus.map((area) => (                                  {app.category}

                    <div key={area.category} className="rounded-3xl border border-border/60 bg-white/80 p-6">                                </Badge>

                      <h4 className="text-base font-semibold">{area.category}</h4>                              </div>

                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">                            </CardHeader>

                        {area.prompts.map((prompt) => (                            <CardContent className="pb-2">

                          <li key={prompt} className="flex items-start gap-2">                              <CardTitle className="text-lg">{app.name}</CardTitle>

                            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />                              <CardDescription>{app.description}</CardDescription>

                            <span>{prompt}</span>                            </CardContent>

                          </li>                            <CardFooter className="flex gap-2">

                        ))}                              <Button variant="secondary" className="flex-1 rounded-2xl">

                      </ul>                                {app.progress < 100 ? "Install" : "Open"}

                    </div>                              </Button>

                  ))}                              <Button variant="outline" size="icon" className="rounded-2xl">

                </div>                                <Star className="h-4 w-4" />

              </Card>                              </Button>

                            </CardFooter>

              <Card className="rounded-[32px] border border-primary/40 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">                          </Card>

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">                        </motion.div>

                  <div className="space-y-3">                      ))}

                    <Badge className="rounded-full bg-white/20 text-white">Take the next step</Badge>                    </div>

                    <h3 className="text-2xl font-semibold">Elevate your application in one click</h3>                  </section>

                    <p className="text-sm text-white/80">                </TabsContent>

                      Generate a tailored resume using recruiter-approved templates or prep with AI-driven interview drills that mirror the role.

                    </p>                <TabsContent value="files" className="space-y-8 mt-0">

                  </div>                  <section>

                  <div className="flex flex-col gap-3 md:w-80">                    <motion.div

                    <Button asChild className="rounded-full bg-white text-indigo-700 hover:bg-white/90">                      initial={{ opacity: 0, y: 20 }}

                      <Link href="/enhance">Enhance resume for this role</Link>                      animate={{ opacity: 1, y: 0 }}

                    </Button>                      transition={{ duration: 0.5 }}

                    <Button asChild variant="outline" className="rounded-full border-white/60 text-white hover:bg-white/10">                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 p-8 text-white"

                      <Link href="/interview-prep">Generate interview questions</Link>                    >

                    </Button>                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                  </div>                        <div className="space-y-2">

                </div>                          <h2 className="text-3xl font-bold">Your Creative Files</h2>

              </Card>                          <p className="max-w-[600px] text-white/80">

            </TabsContent>                            Access, manage, and share all your design files in one place.

          </Tabs>                          </p>

        </section>                        </div>

                        <div className="flex flex-wrap gap-3">

        <footer className="border-t border-border/60 pt-8 text-sm text-muted-foreground">                          <Button className="rounded-2xl bg-white/20 backdrop-blur-md hover:bg-white/30">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">                            <Cloud className="mr-2 h-4 w-4" />

            <div className="flex items-center gap-3">                            Cloud Storage

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-semibold text-white">                          </Button>

                PS8                          <Button className="rounded-2xl bg-white text-blue-700 hover:bg-white/90">

              </span>                            <Plus className="mr-2 h-4 w-4" />

              <div>                            Upload Files

                <p className="font-medium text-foreground">Smart Resume Analyzer</p>                          </Button>

                <p>Built for job seekers and recruiting teams who want clarity.</p>                        </div>

              </div>                      </div>

            </div>                    </motion.div>

            <div className="flex flex-wrap items-center gap-4">                  </section>

              <Link href="#recruiter" className="transition-colors hover:text-primary">

                Recruiter workspace                  <div className="flex flex-wrap gap-3 mb-6">

              </Link>                    <Button variant="outline" className="rounded-2xl">

              <Link href="#candidate" className="transition-colors hover:text-primary">                      <FileText className="mr-2 h-4 w-4" />

                Candidate workspace                      All Files

              </Link>                    </Button>

              <Link href="/login" className="transition-colors hover:text-primary">                    <Button variant="outline" className="rounded-2xl">

                Sign in                      <Clock className="mr-2 h-4 w-4" />

              </Link>                      Recent

              <span className="text-xs text-muted-foreground">(c) {new Date().getFullYear()} PS8. All rights reserved.</span>                    </Button>

            </div>                    <Button variant="outline" className="rounded-2xl">

          </div>                      <Users className="mr-2 h-4 w-4" />

        </footer>                      Shared

      </div>                    </Button>

    </div>                    <Button variant="outline" className="rounded-2xl">

  )                      <Star className="mr-2 h-4 w-4" />

}                      Favorites

                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Trash className="mr-2 h-4 w-4" />
                      Trash
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search files..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">All Files</h2>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <PanelLeft className="mr-2 h-4 w-4" />
                          Filter
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-2xl">
                          <ArrowUpDown className="mr-2 h-4 w-4" />
                          Sort
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-3xl border overflow-hidden">
                      <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-12 text-sm font-medium">
                        <div className="col-span-6">Name</div>
                        <div className="col-span-2">App</div>
                        <div className="col-span-2">Size</div>
                        <div className="col-span-2">Modified</div>
                      </div>
                      <div className="divide-y">
                        {recentFiles.map((file) => (
                          <motion.div
                            key={file.name}
                            whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                            className="p-3 md:grid md:grid-cols-12 items-center flex flex-col md:flex-row gap-3 md:gap-0"
                          >
                            <div className="col-span-6 flex items-center gap-3 w-full md:w-auto">
                              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                                {file.icon}
                              </div>
                              <div>
                                <p className="font-medium">{file.name}</p>
                                {file.shared && (
                                  <div className="flex items-center text-xs text-muted-foreground">
                                    <Users className="mr-1 h-3 w-3" />
                                    Shared with {file.collaborators} people
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-span-2 text-sm md:text-base">{file.app}</div>
                            <div className="col-span-2 text-sm md:text-base">{file.size}</div>
                            <div className="col-span-2 flex items-center justify-between w-full md:w-auto">
                              <span className="text-sm md:text-base">{file.modified}</span>
                              <div className="flex gap-1">
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <Share2 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="projects" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Project Management</h2>
                          <p className="max-w-[600px] text-white/80">
                            Organize your creative work into projects and collaborate with your team.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-indigo-700 hover:bg-white/90">
                          <Plus className="mr-2 h-4 w-4" />
                          New Project
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <Layers className="mr-2 h-4 w-4" />
                      All Projects
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Clock className="mr-2 h-4 w-4" />
                      Recent
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Users className="mr-2 h-4 w-4" />
                      Shared
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Archive className="mr-2 h-4 w-4" />
                      Archived
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search projects..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Active Projects</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                      {projects.map((project) => (
                        <motion.div key={project.name} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <CardTitle>{project.name}</CardTitle>
                                <Badge variant="outline" className="rounded-xl">
                                  Due {project.dueDate}
                                </Badge>
                              </div>
                              <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm">
                                  <span>Progress</span>
                                  <span>{project.progress}%</span>
                                </div>
                                <Progress value={project.progress} className="h-2 rounded-xl" />
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Users className="mr-1 h-4 w-4" />
                                  {project.members} members
                                </div>
                                <div className="flex items-center">
                                  <FileText className="mr-1 h-4 w-4" />
                                  {project.files} files
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex gap-2">
                              <Button variant="secondary" className="flex-1 rounded-2xl">
                                Open Project
                              </Button>
                              <Button variant="outline" size="icon" className="rounded-2xl">
                                <Share2 className="h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                      <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                        <Card className="flex h-full flex-col items-center justify-center rounded-3xl border border-dashed p-8 hover:border-primary/50 transition-all duration-300">
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Plus className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-medium">Create New Project</h3>
                          <p className="mb-4 text-center text-sm text-muted-foreground">
                            Start a new creative project from scratch or use a template
                          </p>
                          <Button className="rounded-2xl">New Project</Button>
                        </Card>
                      </motion.div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Project Templates</h2>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 p-6 text-white">
                          <h3 className="text-lg font-medium">Brand Identity</h3>
                          <p className="text-sm text-white/80">Complete brand design package</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            Popular
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-amber-500 to-red-600 p-6 text-white">
                          <h3 className="text-lg font-medium">Marketing Campaign</h3>
                          <p className="text-sm text-white/80">Multi-channel marketing assets</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            New
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-green-500 to-teal-600 p-6 text-white">
                          <h3 className="text-lg font-medium">Website Redesign</h3>
                          <p className="text-sm text-white/80">Complete website design workflow</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            Featured
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                      <Card className="overflow-hidden rounded-3xl">
                        <div className="aspect-video bg-gradient-to-br from-pink-500 to-rose-600 p-6 text-white">
                          <h3 className="text-lg font-medium">Product Launch</h3>
                          <p className="text-sm text-white/80">Product launch campaign assets</p>
                        </div>
                        <CardFooter className="flex justify-between p-4">
                          <Badge variant="outline" className="rounded-xl">
                            Popular
                          </Badge>
                          <Button variant="ghost" size="sm" className="rounded-xl">
                            Use Template
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </section>
                </TabsContent>

                <TabsContent value="learn" className="space-y-8 mt-0">
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden rounded-3xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-white"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2">
                          <h2 className="text-3xl font-bold">Learn & Grow</h2>
                          <p className="max-w-[600px] text-white/80">
                            Expand your creative skills with tutorials, courses, and resources.
                          </p>
                        </div>
                        <Button className="w-fit rounded-2xl bg-white text-emerald-700 hover:bg-white/90">
                          <Crown className="mr-2 h-4 w-4" />
                          Upgrade to Pro
                        </Button>
                      </div>
                    </motion.div>
                  </section>

                  <div className="flex flex-wrap gap-3 mb-6">
                    <Button variant="outline" className="rounded-2xl">
                      <Play className="mr-2 h-4 w-4" />
                      All Tutorials
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Courses
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Lightbulb className="mr-2 h-4 w-4" />
                      Tips & Tricks
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Trending
                    </Button>
                    <Button variant="outline" className="rounded-2xl">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Saved
                    </Button>
                    <div className="flex-1"></div>
                    <div className="relative w-full md:w-auto mt-3 md:mt-0">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search tutorials..."
                        className="w-full rounded-2xl pl-9 md:w-[200px]"
                      />
                    </div>
                  </div>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Featured Tutorials</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {tutorials.slice(0, 3).map((tutorial) => (
                        <motion.div key={tutorial.title} whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }}>
                          <Card className="overflow-hidden rounded-3xl">
                            <div className="aspect-video overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Button size="icon" variant="secondary" className="h-14 w-14 rounded-full">
                                  <Play className="h-6 w-6" />
                                </Button>
                              </div>
                              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">
                                  {tutorial.category}
                                </Badge>
                                <h3 className="mt-2 text-lg font-medium">{tutorial.title}</h3>
                              </div>
                            </div>
                            <CardContent className="p-4">
                              <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                              <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarFallback>{tutorial.instructor.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{tutorial.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Clock className="h-4 w-4" />
                                  {tutorial.duration}
                                </div>
                              </div>
                            </CardContent>
                            <CardFooter className="flex items-center justify-between border-t p-4">
                              <Badge variant="outline" className="rounded-xl">
                                {tutorial.level}
                              </Badge>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Eye className="h-4 w-4" />
                                {tutorial.views} views
                              </div>
                            </CardFooter>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Popular Courses</h2>
                      <Button variant="ghost" className="rounded-2xl">
                        View All
                      </Button>
                    </div>
                    <div className="rounded-3xl border overflow-hidden">
                      <div className="divide-y">
                        {tutorials.slice(3, 5).map((tutorial) => (
                          <motion.div
                            key={tutorial.title}
                            whileHover={{ scale: 1.02, y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="p-4 flex flex-col md:flex-row gap-3"
                          >
                            <div className="flex-shrink-0">
                              <div className="relative h-20 w-20 overflow-hidden rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600">
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play className="h-8 w-8 text-white" />
                                </div>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{tutorial.title}</h3>
                              <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                              <div className="mt-2 flex flex-wrap items-center gap-3">
                                <Badge variant="outline" className="rounded-xl">
                                  {tutorial.level}
                                </Badge>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {tutorial.duration}
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Eye className="h-3 w-3" />
                                  {tutorial.views} views
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <Button variant="ghost" size="sm" className="rounded-xl">
                                Watch Now
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </section>

                  <section className="space-y-4">
                    <h2 className="text-2xl font-semibold">Learning Paths</h2>
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-blue-500">Beginner</Badge>
                            <Award className="h-5 w-5 text-amber-500" />
                          </div>
                          <CardTitle className="mt-2">UI/UX Design Fundamentals</CardTitle>
                          <CardDescription>Master the basics of user interface and experience design</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>8 courses • 24 hours</span>
                              <span>4.8 ★</span>
                            </div>
                            <Progress value={30} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">30% completed</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            Continue Learning
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-amber-500">Intermediate</Badge>
                            <Award className="h-5 w-5 text-amber-500" />
                          </div>
                          <CardTitle className="mt-2">Digital Illustration Mastery</CardTitle>
                          <CardDescription>Create stunning digital artwork and illustrations</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>12 courses • 36 hours</span>
                              <span>4.9 ★</span>
                            </div>
                            <Progress value={0} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">Not started</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            Start Learning
                          </Button>
                        </CardFooter>
                      </Card>

                      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <Badge className="rounded-xl bg-red-500">Advanced</Badge>
                            <Award className="h-5 w-5 text-amber-500" />
                          </div>
                          <CardTitle className="mt-2">Motion Graphics & Animation</CardTitle>
                          <CardDescription>Create professional motion graphics and animations</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>10 courses • 30 hours</span>
                              <span>4.7 ★</span>
                            </div>
                            <Progress value={0} className="h-2 rounded-xl" />
                            <p className="text-xs text-muted-foreground">Not started</p>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="secondary" className="w-full rounded-2xl">
                            Start Learning
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </section>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
