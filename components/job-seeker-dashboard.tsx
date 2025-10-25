"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type SectionKey = "dashboard" | "analysis" | "interview" | "resume"

type NavigationItem = {
  id: SectionKey
  label: string
  icon: typeof LayoutDashboard
}

type ResumeTemplate = {
  id: string
  name: string
  description: string
  highlights: string[]
  sections: string[]
  generatedSample: string
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analysis", label: "Analysis", icon: BarChart3 },
  { id: "interview", label: "Interview question generator", icon: MessageSquare },
  { id: "resume", label: "Resume enhancer", icon: FileText },
]

const analysisReport = {
  candidate: {
    name: "Amelia Chen",
    currentRole: "Senior Product Manager, Applied AI",
    targetRole: "Director of Product Strategy",
    targetCompany: "PS8 Labs",
  },
  metrics: {
    jobMatchScore: 0.89,
    atsScore: 0.96,
    leadershipNarrative: 0.84,
    quantitativeEvidence: 0.91,
  },
  summary:
    "Your profile tells a compelling story about launching measurable AI capabilities. Strengthen the leadership narrative and alignment proof points to exceed director-level expectations.",
  strengths: [
    {
      label: "AI roadmap delivery",
      detail: "Launched three experimentation-led AI initiatives with quantified adoption and revenue impact.",
    },
    {
      label: "Outcome communication",
      detail: "Translates complex technical wins into digestible executive narratives with KPIs in context.",
    },
    {
      label: "Cross-functional orchestration",
      detail: "Demonstrates collaboration across data science, product marketing, and go-to-market for sustained velocity.",
    },
  ],
  improvementAreas: [
    {
      label: "Stakeholder alignment narrative",
      actions: [
        "Add a vignette about reconciling conflicting executive priorities.",
        "Highlight how you kept legal, risk, and policy aligned during experimentation phases.",
      ],
    },
    {
      label: "Quantify people leadership",
      actions: [
        "Include team size, rituals, and coaching systems that increased feature throughput.",
        "Introduce metrics around hiring, mentoring, or retention for the product pod.",
      ],
    },
  ],
  recommendedKeywords: [
    { keyword: "AI experimentation", coverage: 0.72 },
    { keyword: "Revenue impact", coverage: 0.64 },
    { keyword: "Cross-functional rituals", coverage: 0.58 },
    { keyword: "Responsible AI", coverage: 0.54 },
  ],
  nextSteps: [
    "Quantify the revenue lift tied to the 2024 autonomous dispatch program.",
    "Spell out how you govern experimentation guardrails for AI launches.",
    "Surface a board-level update or narrative you crafted for the strategy pivot.",
  ],
  interviewTopics: [
    {
      topic: "AI product strategy",
      questions: [
        "How do you evaluate responsible AI risk before launch?",
        "Walk us through a time you sunset an AI initiative.",
        "What signals do you monitor to confirm AI features drive value?",
      ],
      coaching: "Connect to the applied AI roadmap you delivered at Lumina and reference the governance framework you set up.",
    },
    {
      topic: "Experimentation and measurement",
      questions: [
        "Describe your experimentation framework for feature validation.",
        "Share a time an experiment disproved your hypothesis and what you did next.",
        "How do you ensure statistical rigor while moving quickly?",
      ],
      coaching: "Reference your weekly metric reviews and how you pair data science with product marketing to interpret results.",
    },
    {
      topic: "Executive communication",
      questions: [
        "Tell us about aligning conflicting senior stakeholders.",
        "How do you adapt the product narrative for board-level updates?",
        "Describe a moment you influenced a go-to-market pivot.",
      ],
      coaching: "Highlight the quarterly storytelling cadences you own and any narrative frameworks you rely on.",
    },
  ],
  resumeAngles: [
    {
      templateId: "product-visionary",
      positioning: "Vision-led storytelling with executive-friendly metrics.",
      headline: "Ships AI leaps from concept to measurable revenue.",
    },
    {
      templateId: "operator",
      positioning: "Operational excellence with precise throughput metrics.",
      headline: "Builds delivery systems that accelerate roadmap velocity.",
    },
  ],
} as const

const activityTimeline = [
  {
    time: "Today",
    title: "LLM analysis completed",
    detail: "Resume scored against Director of Product Strategy role.",
    icon: Sparkles,
  },
  {
    time: "Yesterday",
    title: "Template exploration",
    detail: "Compared Product Visionary and Operator resume layouts.",
    icon: BookOpen,
  },
  {
    time: "2 days ago",
    title: "Interview prep session",
    detail: "Generated AI product strategy question bank.",
    icon: MessageSquare,
  },
]

const upcomingInterviews = [
  {
    company: "PS8 Labs",
    stage: "Panel interview",
    date: "Oct 30, 2025",
    time: "10:30 AM PT",
    focus: "Strategy deep dive + product leadership",
  },
  {
    company: "Nexio Systems",
    stage: "Hiring manager call",
    date: "Nov 2, 2025",
    time: "1:00 PM PT",
    focus: "AI experimentation practices",
  },
]

const knowledgeResources = [
  {
    title: "Director-level product storytelling guide",
    description: "Framework to translate complex AI programs into executive-ready narratives.",
    link: "#",
  },
  {
    title: "Responsible AI experimentation checklist",
    description: "Keep risk, legal, and policy aligned while shipping high-velocity experiments.",
    link: "#",
  },
  {
    title: "Stakeholder alignment retro template",
    description: "Capture conflicting priorities, decisions, and follow-ups in a single artifact.",
    link: "#",
  },
]

const resumeTemplates: ResumeTemplate[] = [
  {
    id: "product-visionary",
    name: "Product Visionary",
    description: "Executive overview that pairs north-star storytelling with quantified outcomes.",
    highlights: [
      "Lead with strategic outcomes and customer vision",
      "Spotlight experimentation guardrails and governance",
      "Quantify AI program impact with revenue and adoption metrics",
    ],
    sections: ["Hero statement", "Signature wins", "Leadership narrative", "Key programs", "Technical toolkit"],
    generatedSample: `AMELIA CHEN | Product Strategy Leader\nSan Francisco, CA · amelia.chen@email.com · (415) 555-0132\n\nVISION SUMMARY\nDirector-level product leader translating applied AI into measurable business growth. Shipped three experimentation-led platforms delivering $48M in annualized revenue while governing responsible AI guardrails across global teams.\n\nSIGNATURE WINS\nPS8 Labs · Senior PM, Applied AI (2022-present)\n- Launched autonomous dispatch optimization; +17% fulfillment speed, $18M ARR lift, new GTM narrative adopted by C-suite.\n- Built experimentation council spanning data science, legal, and policy to de-risk AI launches; cleared 12 releases with zero escalations.\n- Orchestrated story-driven board updates that unlocked 22% headcount expansion for AI roadmap.\n\nLEADERSHIP NARRATIVE\n- Coach and grow a 12-person product triad with rituals that increased launch velocity 28%.\n- Align marketing, sales, and customer success on AI positioning through quarterly narrative playbooks.\n\nKEY PROGRAMS\n- Responsible AI governance framework (RACI, red-team sprints, ethics scoring).\n- GTM experimentation engine tying funnel metrics to roadmap prioritization.\n\nTECHNICAL TOOLKIT\nRoadmapping · OKR design · Causal inference · LLM productization · Stakeholder alignment`,
  },
  {
    id: "operator",
    name: "Operator's Playbook",
    description: "Delivery-first layout showing operational systems, rituals, and velocity gains.",
    highlights: [
      "Timeline view of platform launches",
      "Cross-functional operating rituals",
      "KPI dashboard anchoring throughput and quality",
    ],
    sections: ["Summary", "Operating rhythm", "Delivery excellence", "Team leadership", "Impact metrics"],
    generatedSample: `AMELIA CHEN\nDirector of Product Strategy (target) | Operational Excellence Path\n\nSUMMARY\nOperator who scales AI product delivery with rigor. Builds cross-functional systems that lift shipping velocity and quality simultaneously.\n\nOPERATING RHYTHM\n- Weekly experiment triage with data science, design, and GTM to unblock decisions in <48h.\n- Quarterly alignment summits aligning product, risk, and legal on responsible AI standards.\n\nDELIVERY EXCELLENCE\n- 32 releases in 18 months with 0 regression incidents > Sev2.\n- Introduced readiness scorecard that cut launch delays by 36%.\n\nTEAM LEADERSHIP\n- Directly managed PMs, designers, and analysts; instituted coaching cadences leading to 94% engagement.\n- Created apprenticeship pipeline adding three internal transfers into PM roles.\n\nIMPACT METRICS\nVelocity +28% · Customer NPS +12 · Revenue influence $48M · Compliance escalations 0`,
  },
  {
    id: "storyteller",
    name: "Storyteller Portfolio",
    description: "Case-study driven narrative centering problem, action, and outcome arcs.",
    highlights: [
      "Deep dives per flagship initiative",
      "Customer and stakeholder quotes",
      "Outcome highlights for each phase",
    ],
    sections: ["Narrative summary", "Case study: AI dispatch", "Case study: Responsible experimentation", "Thought leadership", "Community impact"],
    generatedSample: `AMELIA CHEN\nStory-first product leader galvanizing teams around ambitious AI bets.\n\nNARRATIVE SUMMARY\nBlends analytical rigor with storytelling to align executives, legal, and customer teams on responsible AI growth.\n\nCASE STUDY: AI DISPATCH\nSituation: Delivery times plateaued at 48 hrs.\nAction: Led cross-functional swarm to design and test LLM-driven dispatch sequencing.\nOutcome: 17% faster fulfillment, $18M ARR, exec sponsor quote "Best narrative clarity of the fiscal year."\n\nCASE STUDY: RESPONSIBLE EXPERIMENTATION\nSituation: Fragmented AI governance risked compliance findings.\nAction: Built ethics scoring, red-team sprints, and approval rituals.\nOutcome: 12 launches with zero escalations and adoption across three business units.\n\nTHOUGHT LEADERSHIP\n- Speaker, Responsible AI Forum 2024\n- Author, "Storytelling systems for AI roadmaps" (10k reads)`,
  },
]

type DashboardSectionProps = {
  analysis: typeof analysisReport
  activity: typeof activityTimeline
  interviews: typeof upcomingInterviews
  resources: typeof knowledgeResources
  onGoToAnalysis: () => void
}

type AnalysisSectionProps = {
  analysis: typeof analysisReport
  onGenerateQuestions: () => void
  onEnhanceResume: () => void
}

type InterviewSectionProps = {
  analysis: typeof analysisReport
  onBackToAnalysis: () => void
  onGoToResume: () => void
}

type ResumeSectionProps = {
  analysis: typeof analysisReport
  templates: ResumeTemplate[]
  selectedTemplateId: ResumeTemplate["id"]
  selectedTemplate: ResumeTemplate
  recommendedTemplateIds: Set<string>
  generatedResume: { templateId: string; content: string } | null
  onSelectTemplate: (templateId: ResumeTemplate["id"]) => void
  onGenerateResume: (templateId: ResumeTemplate["id"]) => void
  onGoToAnalysis: () => void
}

function DashboardSection({ analysis, activity, interviews, resources, onGoToAnalysis }: DashboardSectionProps) {
  const dashboardMetrics = [
    {
      label: "Job match score",
      value: `${Math.round(analysis.metrics.jobMatchScore * 100)}%`,
      helper: "Target ≥ 85%",
      progress: Math.round(analysis.metrics.jobMatchScore * 100),
      icon: Target,
    },
    {
      label: "ATS readiness",
      value: `${Math.round(analysis.metrics.atsScore * 100)}%`,
      helper: "Optimized for ATS parsers",
      progress: Math.round(analysis.metrics.atsScore * 100),
      icon: Sparkles,
    },
    {
      label: "Leadership narrative",
      value: `${Math.round(analysis.metrics.leadershipNarrative * 100)}%`,
      helper: "Add stakeholder vignettes",
      progress: Math.round(analysis.metrics.leadershipNarrative * 100),
      icon: TrendingUp,
    },
    {
      label: "Quant evidence",
      value: `${Math.round(analysis.metrics.quantitativeEvidence * 100)}%`,
      helper: "Keep revenue and adoption front-and-center",
      progress: Math.round(analysis.metrics.quantitativeEvidence * 100),
      icon: CheckCircle2,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">
                  {metric.label}
                </CardDescription>
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>
              <p className="text-sm text-muted-foreground">{metric.helper}</p>
            </CardHeader>
            <CardContent>
              <Progress value={metric.progress} className="h-2 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="rounded-[32px] border border-border/70 bg-white/80 p-6 backdrop-blur">
        <CardHeader className="space-y-3">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Summary</Badge>
          <CardTitle className="text-2xl">Latest analysis highlights</CardTitle>
          <CardDescription>{analysis.summary}</CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap items-center gap-3">
          <Button className="rounded-full" onClick={onGoToAnalysis}>
            View full analysis
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Badge variant="outline" className="rounded-full">
            Target role · {analysis.candidate.targetRole}
          </Badge>
          <Badge variant="outline" className="rounded-full">
            Focus company · {analysis.candidate.targetCompany}
          </Badge>
        </CardFooter>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Momentum</Badge>
            <CardTitle className="text-xl">Workflow timeline</CardTitle>
            <CardDescription>Track every action PS8 guided you through this week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activity.map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <item.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    <span>{item.time}</span>
                    <span className="text-primary/70">Update</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Pipeline</Badge>
            <CardTitle className="text-xl">Upcoming interviews</CardTitle>
            <CardDescription>Stay ahead of prep with snapshots of every conversation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {interviews.map((interview) => (
              <div key={`${interview.company}-${interview.date}`} className="rounded-2xl border border-dashed border-border/60 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary">{interview.stage}</p>
                    <h3 className="text-base font-semibold">{interview.company}</h3>
                  </div>
                  <Badge variant="outline" className="w-fit rounded-full">
                    {interview.focus}
                  </Badge>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4 text-primary" /> {interview.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" /> {interview.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Insights</Badge>
          <CardTitle className="text-xl">Resource library</CardTitle>
          <CardDescription>Deepen your prep with curated playbooks and templates.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {resources.map((resource) => (
            <div key={resource.title} className="rounded-3xl border border-border/60 bg-white/70 p-5">
              <h4 className="text-base font-semibold text-foreground">{resource.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{resource.description}</p>
              <Button asChild variant="link" className="mt-4 h-auto px-0 text-primary">
                <Link href={resource.link}>
                  Access resource
                  <ExternalLink className="ml-2 h-3 w-3" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function AnalysisSection({ analysis, onGenerateQuestions, onEnhanceResume }: AnalysisSectionProps) {
  const analysisMetrics = [
    {
      label: "Job match score",
      value: `${Math.round(analysis.metrics.jobMatchScore * 100)}%`,
      helper: "Role benchmark: 85%",
      progress: Math.round(analysis.metrics.jobMatchScore * 100),
      icon: Target,
    },
    {
      label: "ATS readiness",
      value: `${Math.round(analysis.metrics.atsScore * 100)}%`,
      helper: "Formatting, keyword density, structure",
      progress: Math.round(analysis.metrics.atsScore * 100),
      icon: Sparkles,
    },
    {
      label: "Leadership narrative",
      value: `${Math.round(analysis.metrics.leadershipNarrative * 100)}%`,
      helper: "Add stakeholder alignment proof",
      progress: Math.round(analysis.metrics.leadershipNarrative * 100),
      icon: TrendingUp,
    },
    {
      label: "Quant evidence",
      value: `${Math.round(analysis.metrics.quantitativeEvidence * 100)}%`,
      helper: "Keep metrics in every bullet",
      progress: Math.round(analysis.metrics.quantitativeEvidence * 100),
      icon: CheckCircle2,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {analysisMetrics.map((metric) => (
          <Card key={metric.label} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">
                  {metric.label}
                </CardDescription>
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-3xl font-semibold text-primary">{metric.value}</CardTitle>
              <p className="text-sm text-muted-foreground">{metric.helper}</p>
            </CardHeader>
            <CardContent>
              <Progress value={metric.progress} className="h-2 rounded-full" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Strengths</Badge>
            <CardTitle className="text-2xl">Where you stand out</CardTitle>
            <CardDescription>LLM surfaced these differentiators relative to the role brief.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.strengths.map((strength) => (
              <div key={strength.label} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  {strength.label}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{strength.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Opportunities</Badge>
            <CardTitle className="text-2xl">Level-up areas</CardTitle>
            <CardDescription>Prioritize these edits to unlock director-level signal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {analysis.improvementAreas.map((area) => (
              <div key={area.label} className="rounded-2xl border border-dashed border-border/60 p-4">
                <p className="text-sm font-semibold text-foreground">{area.label}</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {area.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2">
                      <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Keyword coverage</Badge>
          <CardTitle className="text-2xl">Role-specific signal</CardTitle>
          <CardDescription>Ensure critical phrases appear with enough density and context.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {analysis.recommendedKeywords.map((keyword) => (
            <div key={keyword.keyword} className="rounded-2xl border border-border/60 bg-white/70 p-4">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold text-foreground">{keyword.keyword}</span>
                <span className="text-muted-foreground">{Math.round(keyword.coverage * 100)}%</span>
              </div>
              <Progress value={keyword.coverage * 100} className="mt-3 h-2 rounded-full" />
              <p className="mt-2 text-xs text-muted-foreground">
                Aim for 80%+ coverage with strong context in bullet points.
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Next steps</Badge>
          <CardTitle className="text-2xl">Action plan</CardTitle>
          <CardDescription>Follow these sequenced edits before running a fresh analysis.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {analysis.nextSteps.map((step) => (
              <li key={step} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Templates suggested</Badge>
          <CardTitle className="text-2xl">Resume angles to explore</CardTitle>
          <CardDescription>LLM recommends these layouts based on recruiter feedback.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {analysis.resumeAngles.map((angle) => (
            <div key={angle.templateId} className="rounded-2xl border border-border/60 bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{angle.templateId}</p>
              <h3 className="text-base font-semibold text-foreground">{angle.headline}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{angle.positioning}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">LLM payload</Badge>
          <CardTitle className="text-2xl">Analysis JSON</CardTitle>
          <CardDescription>The structured response stored for this candidate snapshot.</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="max-h-[320px] overflow-auto rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
            {JSON.stringify(analysis, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 md:flex-row">
        <Button className="rounded-full" onClick={onGenerateQuestions}>
          Generate interview questions
          <MessageSquare className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="rounded-full" onClick={onEnhanceResume}>
          Enhance my resume
          <FileText className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function InterviewSection({ analysis, onBackToAnalysis, onGoToResume }: InterviewSectionProps) {
  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Question generator</Badge>
          <CardTitle className="text-2xl">Role-aligned prompts</CardTitle>
          <CardDescription>Drill with questions grounded in your analysis and target role.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {analysis.interviewTopics.map((topic) => (
            <div key={topic.topic} className="rounded-2xl border border-border/60 bg-white/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-foreground">{topic.topic}</h3>
                <Badge variant="outline" className="rounded-full">Focus area</Badge>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {topic.questions.map((question) => (
                  <li key={question} className="flex items-start gap-2">
                    <MessageSquare className="mt-0.5 h-4 w-4 text-primary" />
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-primary">Coaching: {topic.coaching}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 md:flex-row">
          <Button variant="outline" className="rounded-full" onClick={onBackToAnalysis}>
            Back to analysis
          </Button>
          <Button className="rounded-full" onClick={onGoToResume}>
            Jump to resume enhancer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Prep cadence</Badge>
          <CardTitle className="text-2xl">Suggested rehearsal plan</CardTitle>
          <CardDescription>Structure your practice sessions for the upcoming interviews.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Calendar className="mt-0.5 h-4 w-4 text-primary" />
              <span>Book two 60-minute mock interviews focused on AI strategy before Oct 28.</span>
            </li>
            <li className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
              <span>Record answers and highlight where stakeholder alignment examples feel thin.</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="mt-0.5 h-4 w-4 text-primary" />
              <span>Refresh responsible AI guardrails and note how you would scale them at PS8 Labs.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

function ResumeSection({
  analysis,
  templates,
  selectedTemplateId,
  selectedTemplate,
  recommendedTemplateIds,
  generatedResume,
  onSelectTemplate,
  onGenerateResume,
  onGoToAnalysis,
}: ResumeSectionProps) {
  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">LLM guidance</Badge>
          <CardTitle className="text-2xl">Recommended angles</CardTitle>
          <CardDescription>Choose a template and generate an enhanced resume instantly.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {analysis.resumeAngles.map((angle) => (
            <div key={angle.templateId} className="rounded-2xl border border-border/60 bg-white/70 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">{angle.templateId}</p>
              <h3 className="text-base font-semibold text-foreground">{angle.headline}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{angle.positioning}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.2fr,0.8fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => {
            const isActive = template.id === selectedTemplateId
            const isRecommended = recommendedTemplateIds.has(template.id)

            return (
              <Card
                key={template.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectTemplate(template.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onSelectTemplate(template.id)
                  }
                }}
                className={`h-full cursor-pointer rounded-3xl border ${
                  isActive ? "border-primary shadow-lg" : "border-border/70"
                } bg-white/80 p-1 transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{template.name}</CardTitle>
                    {isRecommended ? (
                      <Badge className="rounded-full bg-primary/10 text-primary">Recommended</Badge>
                    ) : null}
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {template.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-2">
                        <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <Badge variant="outline" className="rounded-full">
                    {template.sections.length} sections
                  </Badge>
                  <span>Press Enter to select</span>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Selected template</Badge>
            <CardTitle className="text-2xl">{selectedTemplate.name}</CardTitle>
            <CardDescription>{selectedTemplate.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-muted-foreground">Structure outline</p>
              <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                {selectedTemplate.sections.map((section) => (
                  <li key={section} className="flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-primary" />
                    <span>{section}</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">
              We will merge this layout with your existing accomplishments to produce a ready-to-edit draft.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 md:flex-row">
            <Button className="rounded-full" onClick={() => onGenerateResume(selectedTemplate.id)}>
              Generate enhanced resume
            </Button>
            <Button variant="outline" className="rounded-full" onClick={onGoToAnalysis}>
              Back to analysis view
            </Button>
          </CardFooter>
        </Card>
      </div>

      {generatedResume ? (
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Enhanced resume draft</Badge>
            <CardTitle className="text-2xl">
              {templates.find((template) => template.id === generatedResume.templateId)?.name ?? "Resume"} output
            </CardTitle>
            <CardDescription>Copy and refine the sections, then export to your preferred format.</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="max-h-[400px] overflow-auto rounded-2xl bg-muted/60 p-4 text-xs leading-relaxed text-muted-foreground">
              {generatedResume.content}
            </pre>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

export function JobSeekerDashboard() {
  const [activeSection, setActiveSection] = useState<SectionKey>("dashboard")
  const [selectedTemplateId, setSelectedTemplateId] = useState<ResumeTemplate["id"]>(resumeTemplates[0].id)
  const [generatedResume, setGeneratedResume] = useState<{ templateId: string; content: string } | null>(null)

  const selectedTemplate = useMemo(() => {
    return resumeTemplates.find((template) => template.id === selectedTemplateId) ?? resumeTemplates[0]
  }, [selectedTemplateId])

  const recommendedTemplateIds = useMemo(() => {
    return new Set(analysisReport.resumeAngles.map((angle) => angle.templateId))
  }, [])

  const handleSelectTemplate = (templateId: ResumeTemplate["id"]) => {
    setSelectedTemplateId(templateId)
    setGeneratedResume((previous) => (previous?.templateId === templateId ? previous : null))
  }

  const handleGenerateResume = (templateId: ResumeTemplate["id"]) => {
    const template = resumeTemplates.find((entry) => entry.id === templateId)
    if (!template) {
      return
    }
    setGeneratedResume({ templateId, content: template.generatedSample })
  }

  const renderSection = () => {
    switch (activeSection) {
      case "analysis":
        return (
          <AnalysisSection
            analysis={analysisReport}
            onGenerateQuestions={() => setActiveSection("interview")}
            onEnhanceResume={() => setActiveSection("resume")}
          />
        )
      case "interview":
        return (
          <InterviewSection
            analysis={analysisReport}
            onBackToAnalysis={() => setActiveSection("analysis")}
            onGoToResume={() => setActiveSection("resume")}
          />
        )
      case "resume":
        return (
          <ResumeSection
            analysis={analysisReport}
            templates={resumeTemplates}
            selectedTemplateId={selectedTemplateId}
            selectedTemplate={selectedTemplate}
            recommendedTemplateIds={recommendedTemplateIds}
            generatedResume={generatedResume}
            onSelectTemplate={handleSelectTemplate}
            onGenerateResume={handleGenerateResume}
            onGoToAnalysis={() => setActiveSection("analysis")}
          />
        )
      default:
        return (
          <DashboardSection
            analysis={analysisReport}
            activity={activityTimeline}
            interviews={upcomingInterviews}
            resources={knowledgeResources}
            onGoToAnalysis={() => setActiveSection("analysis")}
          />
        )
    }
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-72 flex-col border-r border-border/60 bg-muted/20 p-6 md:flex">
        <div className="flex items-center gap-3 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-lg font-semibold text-white">
            PS8
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Job seeker workspace</p>
            <p className="text-sm font-semibold text-foreground">Smart Resume Analyzer</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {navigationItems.map((item) => {
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-muted-foreground hover:bg-muted/60"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
        <Card className="mt-6 rounded-3xl border border-dashed border-primary/40 bg-primary/10">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-white/20 text-white">Next milestone</Badge>
            <CardTitle className="text-lg text-primary">Panel interview in 4 days</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Revisit the analysis to reinforce stakeholder alignment stories before Oct 30.
            </CardDescription>
          </CardHeader>
        </Card>
      </aside>

      <main className="flex-1">
        <header className="border-b border-border/60 px-6 py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">Candidate command center</h1>
              <p className="text-sm text-muted-foreground">
                Coordinate your analysis, interview prep, and resume upgrades without leaving this workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => setActiveSection("analysis")}>
                View latest analysis
              </Button>
              <Button className="rounded-full" onClick={() => setActiveSection("resume")}>
                Enhance resume
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 md:hidden">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                className="flex-1 rounded-full text-xs"
                onClick={() => setActiveSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </header>

        <div className="px-6 py-8">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
