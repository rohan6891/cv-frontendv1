"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Download,
  ExternalLink,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  UploadCloud,
  type LucideIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

type SectionKey = "dashboard" | "analysis" | "analysisDetails" | "interview" | "resume" | "history"

type NavigationItem = {
  id: Exclude<SectionKey, "analysisDetails">
  label: string
  icon: LucideIcon
}

type ResumeTemplate = {
  id: string
  name: string
  description: string
  highlights: string[]
  sections: string[]
  generatedSample: string
}

type UploadedResumeMeta = {
  name: string
  size: number
  uploadedAt: string
}

type RecentAnalysis = {
  id: string
  role: string
  company: string
  matchScore: number
  updatedAt: string
  summary: string
  highlights: string[]
}

type AnalysisTemplate = {
  overall_analysis: {
    overall_match_score: number
    skills_match: number
    experience_match: number
    education_match: number
    certifications_match: number
    missing_skills_count: number
    ats_score: number
  }
  charts: {
    skill_match_distribution: {
      matched: number
      partially_matched: number
      missing: number
    }
    experience_comparison: {
      required_experience_years: number
      candidate_experience_years: number
    }
    word_cloud_keywords: { word: string; frequency: number }[]
    career_timeline: { year: string; role: string; organization: string }[]
    resume_effectiveness: { gauge_score: number }
  }
  profile_highlights: {
    publications: string[]
    volunteer_work: string[]
  }
  improvement_suggestions: {
    textual_feedback: string[]
    recommended_courses: { name: string; platform: string; url: string }[]
    skill_gap_closure_plan: {
      missing_skill: string
      recommended_action: string
      priority_level: string
    }[]
    resume_optimization_tips: string[]
  }
}

type JobRecord = {
  job_title: string
  company: {
    name: string
    location: string
    industry: string
  }
  job_details: {
    employment_type: string
    work_mode: string
    experience_required: string
    salary_range: string
    posted_date: string
  }
  requirements: {
    must_have_skills: string[]
    nice_to_have_skills: string[]
    education: string[]
    experience_years: number
    certifications: string[]
  }
  responsibilities: string[]
  core_competencies_needed: string[]
  job_description_raw: string
  application_url: string
}

const navigationItems: NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "analysis", label: "Analysis", icon: BarChart3 },
  { id: "interview", label: "Interview question generator", icon: MessageSquare },
  { id: "resume", label: "Resume enhancer", icon: FileText },
  { id: "history", label: "History", icon: Clock },
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
      coaching:
        "Connect to the applied AI roadmap you delivered at Lumina and reference the governance framework you set up.",
    },
    {
      topic: "Experimentation and measurement",
      questions: [
        "Describe your experimentation framework for feature validation.",
        "Share a time an experiment disproved your hypothesis and what you did next.",
        "How do you ensure statistical rigor while moving quickly?",
      ],
      coaching:
        "Reference your weekly metric reviews and how you pair data science with product marketing to interpret results.",
    },
    {
      topic: "Executive communication",
      questions: [
        "Tell us about aligning conflicting senior stakeholders.",
        "How do you adapt the product narrative for board-level updates?",
        "Describe a moment you influenced a go-to-market pivot.",
      ],
      coaching:
        "Highlight the quarterly storytelling cadences you own and any narrative frameworks you rely on.",
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
] as const

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
] as const

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
] as const

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
    sections: [
      "Narrative summary",
      "Case study: AI dispatch",
      "Case study: Responsible experimentation",
      "Thought leadership",
      "Community impact",
    ],
    generatedSample: `AMELIA CHEN\nStory-first product leader galvanizing teams around ambitious AI bets.\n\nNARRATIVE SUMMARY\nBlends analytical rigor with storytelling to align executives, legal, and customer teams on responsible AI growth.\n\nCASE STUDY: AI DISPATCH\nSituation: Delivery times plateaued at 48 hrs.\nAction: Led cross-functional swarm to design and test LLM-driven dispatch sequencing.\nOutcome: 17% faster fulfillment, $18M ARR, exec sponsor quote "Best narrative clarity of the fiscal year."\n\nCASE STUDY: RESPONSIBLE EXPERIMENTATION\nSituation: Fragmented AI governance risked compliance findings.\nAction: Built ethics scoring, red-team sprints, and approval rituals.\nOutcome: 12 launches with zero escalations and adoption across three business units.\n\nTHOUGHT LEADERSHIP\n- Speaker, Responsible AI Forum 2024\n- Author, "Storytelling systems for AI roadmaps" (10k reads)`,
  },
]

const recentAnalyses: RecentAnalysis[] = [
  {
    id: "analysis-ps8-director",
    role: "Director of Product Strategy",
    company: "PS8 Labs",
    matchScore: 88,
    updatedAt: "Oct 24, 2025 · 6:15 PM",
    summary: "Improved leadership narrative and quantified AI governance wins.",
    highlights: ["Stakeholder alignment vignette added", "Responsible AI framework clarified"],
  },
  {
    id: "analysis-nexio-ml-lead",
    role: "Lead Machine Learning PM",
    company: "Nexio Systems",
    matchScore: 82,
    updatedAt: "Oct 19, 2025 · 1:42 PM",
    summary: "Focused on experimentation velocity and GTM storytelling.",
    highlights: ["Experiment playbook section rewritten", "Added customer narrative metrics"],
  },
  {
    id: "analysis-vertex-ai-director",
    role: "Director of Applied AI",
    company: "Vertex Analytics",
    matchScore: 79,
    updatedAt: "Oct 11, 2025 · 9:05 AM",
    summary: "Surface-level impact strong; needs deeper people leadership proof.",
    highlights: ["Add people leadership metrics", "Tighten quant results per initiative"],
  },
]

type HistoryEntry = {
  id: string
  role: string
  company: string
  uploadedAt: string
  matchScore?: number
  hasAnalysis: boolean
  hasInterviewPack: boolean
  hasEnhancedResume: boolean
  job: JobRecord
}

const resumeHistory: HistoryEntry[] = [
  {
    id: "history-ps8-director",
    role: "Director of Product Strategy",
    company: "PS8 Labs",
    uploadedAt: "Oct 24, 2025 · 6:12 PM",
    matchScore: 88,
    hasAnalysis: true,
    hasInterviewPack: true,
    hasEnhancedResume: true,
    job: {
      job_title: "Director of Product Strategy",
      company: {
        name: "PS8 Labs",
        location: "San Francisco, CA",
        industry: "Applied AI",
      },
      job_details: {
        employment_type: "Full-time",
        work_mode: "Hybrid",
        experience_required: "10+ years leadership experience",
        salary_range: "$220K - $260K OTE",
        posted_date: "Oct 20, 2025",
      },
      requirements: {
        must_have_skills: ["AI product strategy", "Executive storytelling", "Experimentation frameworks", "Stakeholder alignment"],
        nice_to_have_skills: ["Regulated industry experience", "LLM productization"],
        education: ["MBA or equivalent executive program"],
        experience_years: 10,
        certifications: ["PMI-ACP", "Responsible AI Governance"],
      },
      responsibilities: [
        "Own the multi-year AI product portfolio and communicate impact to executive stakeholders.",
        "Lead cross-functional pods to deliver experimentation-led launches with measurable revenue outcomes.",
        "Scale governance rituals that balance innovation velocity with responsible AI safeguards.",
      ],
      core_competencies_needed: [
        "Executive communication",
        "Roadmap prioritization",
        "Responsible AI governance",
      ],
      job_description_raw:
        "PS8 Labs is hiring a Director of Product Strategy to translate our applied AI breakthroughs into measurable customer and revenue wins. You will partner with GTM, research, risk, and finance stakeholders to define the roadmap and ensure disciplined execution.",
      application_url: "https://ps8labs.com/careers/director-product-strategy",
    },
  },
  {
    id: "history-nexio-ml-lead",
    role: "Lead Machine Learning PM",
    company: "Nexio Systems",
    uploadedAt: "Oct 19, 2025 · 1:35 PM",
    matchScore: 82,
    hasAnalysis: true,
    hasInterviewPack: true,
    hasEnhancedResume: false,
    job: {
      job_title: "Lead Machine Learning Product Manager",
      company: {
        name: "Nexio Systems",
        location: "Remote - North America",
        industry: "Enterprise SaaS",
      },
      job_details: {
        employment_type: "Full-time",
        work_mode: "Remote",
        experience_required: "8+ years in ML product roles",
        salary_range: "$190K - $225K base",
        posted_date: "Oct 15, 2025",
      },
      requirements: {
        must_have_skills: ["Machine learning roadmaps", "Experiment design", "Metrics storytelling"],
        nice_to_have_skills: ["Data governance", "B2B GTM alignment"],
        education: ["BS in Computer Science or related field"],
        experience_years: 8,
        certifications: ["AWS Machine Learning Specialty"],
      },
      responsibilities: [
        "Translate customer problems into ML-powered product hypotheses.",
        "Partner with data science to validate experiments and measure lift.",
        "Align GTM teams on launches with clear messaging and enablement materials.",
      ],
      core_competencies_needed: [
        "Hypothesis driven experimentation",
        "Cross-functional leadership",
        "Lifecycle analytics",
      ],
      job_description_raw:
        "Nexio Systems is looking for a Lead ML PM to orchestrate the roadmap for our analytics suite. You will oversee the experimentation backlog, partner with data science, and ensure successful commercialization of new ML-driven capabilities.",
      application_url: "https://nexiosystems.com/careers/lead-ml-product-manager",
    },
  },
  {
    id: "history-vertex-ai-director",
    role: "Director of Applied AI",
    company: "Vertex Analytics",
    uploadedAt: "Oct 11, 2025 · 9:00 AM",
    matchScore: 79,
    hasAnalysis: true,
    hasInterviewPack: false,
    hasEnhancedResume: false,
    job: {
      job_title: "Director of Applied AI",
      company: {
        name: "Vertex Analytics",
        location: "Seattle, WA",
        industry: "Data and Analytics",
      },
      job_details: {
        employment_type: "Full-time",
        work_mode: "Onsite",
        experience_required: "10+ years building AI products",
        salary_range: "$210K - $240K base",
        posted_date: "Oct 5, 2025",
      },
      requirements: {
        must_have_skills: ["AI commercialization", "Team leadership", "Enterprise platform delivery"],
        nice_to_have_skills: ["Healthcare compliance", "MLOps"],
        education: ["MS in Computer Science or related field"],
        experience_years: 10,
        certifications: [],
      },
      responsibilities: [
        "Lead the applied AI portfolio from discovery through scaled rollout.",
        "Mentor product and engineering leads to deliver compliant, high-impact features.",
        "Build executive trust through clear progress storytelling and KPI reviews.",
      ],
      core_competencies_needed: [
        "Enterprise stakeholder management",
        "Technical depth across AI stacks",
        "Operational rigor",
      ],
      job_description_raw:
        "Vertex Analytics needs a Director of Applied AI to convert R&D investments into production-ready capabilities across analytics products. The role blends technical depth with executive-facing leadership.",
      application_url: "https://vertexanalytics.com/careers/director-applied-ai",
    },
  },
  {
    id: "history-galileo-growth",
    role: "Head of AI Product",
    company: "Galileo Growth",
    uploadedAt: "Sep 28, 2025 · 4:22 PM",
    hasAnalysis: false,
    hasInterviewPack: false,
    hasEnhancedResume: true,
    job: {
      job_title: "Head of AI Product",
      company: {
        name: "Galileo Growth",
        location: "New York, NY",
        industry: "Growth Marketing Platforms",
      },
      job_details: {
        employment_type: "Contract-to-hire",
        work_mode: "Hybrid",
        experience_required: "7+ years product leadership",
        salary_range: "$180K - $210K contract equivalent",
        posted_date: "Sep 24, 2025",
      },
      requirements: {
        must_have_skills: ["Growth experimentation", "AI roadmap development"],
        nice_to_have_skills: ["Agency collaboration", "Revenue operations"],
        education: ["BA/BS degree"],
        experience_years: 7,
        certifications: ["Pragmatic Institute PMC"],
      },
      responsibilities: [
        "Define the AI-informed roadmap for Galileo's growth experimentation platform.",
        "Run discovery loops with agency partners to surface monetizable opportunities.",
        "Build KPI frameworks that tie AI initiatives to pipeline and revenue.",
      ],
      core_competencies_needed: [
        "Customer discovery",
        "AI-powered growth strategy",
        "Partner enablement",
      ],
      job_description_raw:
        "Galileo Growth is seeking a Head of AI Product to expand its experimentation platform. You will partner with agencies and revenue teams to deliver AI capabilities that accelerate growth outcomes.",
      application_url: "https://galileogrowth.com/jobs/head-of-ai-product",
    },
  },
]

const knowledgeFocusAreas = [
  {
    label: "Leadership narrative",
    value: "Add a stakeholder alignment vignette with quantified impact.",
  },
  {
    label: "Experimentation velocity",
    value: "Reference decision cadence and guardrails within each initiative.",
  },
  {
    label: "Responsible AI",
    value: "Document governance framework (ethics scoring, red-team sprints).",
  },
] as const

const analysisTemplateMock: AnalysisTemplate = {
  overall_analysis: {
    overall_match_score: 82,
    skills_match: 78,
    experience_match: 74,
    education_match: 92,
    certifications_match: 56,
    missing_skills_count: 3,
    ats_score: 88,
  },
  charts: {
    skill_match_distribution: {
      matched: 42,
      partially_matched: 9,
      missing: 5,
    },
    experience_comparison: {
      required_experience_years: 10,
      candidate_experience_years: 8,
    },
    word_cloud_keywords: [
      { word: "AI strategy", frequency: 14 },
      { word: "Experimentation", frequency: 9 },
      { word: "Stakeholder", frequency: 7 },
      { word: "GTM", frequency: 6 },
      { word: "Metrics", frequency: 8 },
      { word: "Roadmap", frequency: 5 },
      { word: "Alignment", frequency: 4 },
    ],
    career_timeline: [
      { year: "2025", role: "Senior Product Manager, Applied AI", organization: "PS8 Labs" },
      { year: "2022", role: "Product Manager, AI Experimentation", organization: "Neural North" },
      { year: "2019", role: "Associate Product Manager", organization: "DataForge" },
      { year: "2016", role: "Business Analyst", organization: "Insight Partners" },
    ],
    resume_effectiveness: {
      gauge_score: 72,
    },
  },
  profile_highlights: {
    publications: [
      "Driving Responsible AI Outcomes in Healthcare Platforms (2024)",
      "Experimentation-First Product Roadmaps (2022)",
    ],
    volunteer_work: [
      "AI Literacy Mentor · TechBridge Women",
      "Product Strategy Advisor · Startup Corps",
    ],
  },
  improvement_suggestions: {
    textual_feedback: [
      "Quantify stakeholder alignment wins with post-launch adoption metrics.",
      "Elevate cross-functional leadership signals in the professional summary.",
      "Tighten bullet structure to surface KPIs within the first sentence.",
    ],
    recommended_courses: [
      {
        name: "Executive Storytelling for Product Leaders",
        platform: "Reforge",
        url: "https://www.reforge.com/programs/storytelling",
      },
      {
        name: "Metrics for Product Strategy",
        platform: "Coursera",
        url: "https://www.coursera.org/learn/metrics-for-product",
      },
    ],
    skill_gap_closure_plan: [
      {
        missing_skill: "Regulatory AI compliance",
        recommended_action:
          "Partner with legal to add governance outcomes across roadmap milestones.",
        priority_level: "High",
      },
      {
        missing_skill: "Executive stakeholder facilitation",
        recommended_action: "Document a cross-functional workshop series leading to AI pilot approvals.",
        priority_level: "Medium",
      },
    ],
    resume_optimization_tips: [
      "Move the metrics summary capsule into the top third of page one.",
      "Create a dedicated \"AI leadership\" section highlighting governance and ethics initiatives.",
      "Use power verbs (\"orchestrated\", \"deployed\") to open each bullet before quantifying impact.",
    ],
  },
}

const dashboardMetricsFromAnalysis = [
  {
    label: "Job match score",
    helper: "Target ≥ 85%",
    icon: Target,
    getValue: () => Math.round(analysisReport.metrics.jobMatchScore * 100),
  },
  {
    label: "ATS readiness",
    helper: "Optimized for ATS parsers",
    icon: Sparkles,
    getValue: () => Math.round(analysisReport.metrics.atsScore * 100),
  },
  {
    label: "Leadership narrative",
    helper: "Add stakeholder vignettes",
    icon: TrendingUp,
    getValue: () => Math.round(analysisReport.metrics.leadershipNarrative * 100),
  },
  {
    label: "Quant evidence",
    helper: "Keep metrics front-and-center",
    icon: CheckCircle2,
    getValue: () => Math.round(analysisReport.metrics.quantitativeEvidence * 100),
  },
]

const dashboardQuickSteps = [
  "Extract structured data from resume",
  "Compare against target role requirements",
  "Generate competency insights",
  "Produce interview question packs",
] as const

const quickActionOptions = [
  {
    label: "Review latest analysis",
    description: "Deep dive the AI-generated insights and action plan.",
    icon: Sparkles,
    target: "analysis",
  },
  {
    label: "Prep interview questions",
    description: "Spin up a question pack tailored to this role.",
    icon: MessageSquare,
    target: "interview",
  },
  {
    label: "Enhance resume",
    description: "Generate an upgraded draft with LLM guidance.",
    icon: FileText,
    target: "resume",
  },
] as const

const templateGalleryPlaceholderCount = 10

type DashboardSectionProps = {
  analysis: typeof analysisReport
  recentAnalyses: RecentAnalysis[]
  uploadedResume: UploadedResumeMeta | null
  onUploadResume: (file: File | null) => void
  onOpenAnalysis: (analysisId: string) => void
  onGoToSection: (section: SectionKey) => void
}

type AnalysisSectionProps = {
  uploadedResume: UploadedResumeMeta | null
  onUploadResume: (file: File | null) => void
  onShowDashboard: () => void
  onShowDetails: () => void
}

type AnalysisDetailsSectionProps = {
  analysis: typeof analysisReport
  onBack: () => void
  onGenerateQuestions: () => void
  onEnhanceResume: () => void
}

type HistorySectionProps = {
  entries: HistoryEntry[]
  onOpenAnalysis: (historyId: string) => void
  onOpenInterview: (historyId: string) => void
  onOpenResume: (historyId: string) => void
}

type InterviewSectionProps = {
  analysis: typeof analysisReport
  onBackToAnalysis: () => void
  onGoToResume: () => void
  showIntakeFields: boolean
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
  uploadedResume: UploadedResumeMeta | null
  onUploadResume: (file: File | null) => void
  showIntakeFields: boolean
}

type RadarChartDatum = {
  label: string
  value: number
}

function RadarChart({ data, maxValue = 100, levels = 4 }: { data: RadarChartDatum[]; maxValue?: number; levels?: number }) {
  if (!data.length) {
    return null
  }

  const size = 260
  const center = size / 2
  const radius = size * 0.38
  const angleStep = (Math.PI * 2) / data.length

  const normalize = (value: number) => Math.max(0, Math.min(maxValue, value)) / maxValue

  const generatePoints = (ratio: number) =>
    data
      .map((_, index) => {
        const angle = angleStep * index - Math.PI / 2
        const x = center + Math.cos(angle) * radius * ratio
        const y = center + Math.sin(angle) * radius * ratio
        return `${x.toFixed(1)},${y.toFixed(1)}`
      })
      .join(" ")

  const dataPoints = data
    .map((datum, index) => {
      const angle = angleStep * index - Math.PI / 2
      const ratio = normalize(datum.value)
      const x = center + Math.cos(angle) * radius * ratio
      const y = center + Math.sin(angle) * radius * ratio
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="h-60 w-60">
      {[...Array(levels)].map((_, levelIndex) => {
        const ratio = ((levelIndex + 1) / levels) * 0.9
        return (
          <polygon
            key={levelIndex}
            points={generatePoints(ratio)}
            fill="none"
            stroke="hsl(var(--muted-foreground) / 0.15)"
            strokeWidth={1}
          />
        )
      })}
      {data.map((datum, index) => {
        const angle = angleStep * index - Math.PI / 2
        const x = center + Math.cos(angle) * radius
        const y = center + Math.sin(angle) * radius
        const labelRadius = radius + 24
        const labelX = center + Math.cos(angle) * labelRadius
        const labelY = center + Math.sin(angle) * labelRadius
        const anchor = Math.abs(labelX - center) < 8 ? "middle" : labelX > center ? "start" : "end"

        return (
          <g key={datum.label}>
            <line x1={center} y1={center} x2={x} y2={y} stroke="hsl(var(--muted-foreground) / 0.25)" strokeWidth={1} />
            <text x={labelX} y={labelY} textAnchor={anchor} className="fill-muted-foreground text-xs">
              {datum.label}
            </text>
          </g>
        )
      })}
      <polygon points={dataPoints} fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2} />
    </svg>
  )
}

function DashboardSection({ analysis, recentAnalyses, uploadedResume, onUploadResume, onOpenAnalysis, onGoToSection }: DashboardSectionProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onUploadResume(file)
    event.target.value = ""
  }

  const formatSize = (bytes: number) => {
    const kb = Math.max(1, Math.round(bytes / 1024))
    return `${kb} KB`
  }

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
  }

  const uploadSummary = uploadedResume
    ? `${uploadedResume.name} · ${formatSize(uploadedResume.size)} · Uploaded ${formatTimestamp(uploadedResume.uploadedAt)}`
    : "No resume uploaded yet. Drop a PDF or DOCX to kick-off a fresh analysis."

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Badge className="rounded-full bg-primary/10 text-primary">Workspace overview</Badge>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Last synced · Oct 25, 2025</span>
          </div>
          <CardTitle className="text-3xl font-semibold text-foreground">Welcome back, {analysis.candidate.name}</CardTitle>
          <CardDescription>
            Targeting {analysis.candidate.targetRole} at {analysis.candidate.targetCompany}. Keep your resume signals and
            interview prep in one streamlined hub.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-3">
          <Badge variant="outline" className="rounded-full">
            Current role · {analysis.candidate.currentRole}
          </Badge>
          <Badge variant="outline" className="rounded-full">
            Match score · {Math.round(analysis.metrics.jobMatchScore * 100)}%
          </Badge>
          <Badge variant="outline" className="rounded-full">
            ATS readiness · {Math.round(analysis.metrics.atsScore * 100)}%
          </Badge>
        </CardFooter>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="rounded-[32px] border border-dashed border-primary/40 bg-primary/5">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Upload resume</Badge>
            <CardTitle className="text-2xl">Run a fresh analysis</CardTitle>
            <CardDescription>
              Upload your latest resume to regenerate metrics, interview questions, and tailored enhancement templates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input ref={uploadInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUploadChange} />
            <div className="rounded-3xl border border-dashed border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground">
              <p className="text-sm font-medium text-foreground">{uploadSummary}</p>
              <p className="mt-2 text-xs text-muted-foreground">Supported formats: PDF, DOC, DOCX · Max 5 MB</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button type="button" className="rounded-full" onClick={handleTriggerUpload}>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  {uploadedResume ? "Upload another resume" : "Upload resume"}
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => onGoToSection("analysis")}>View latest analysis</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Quick actions</Badge>
            <CardTitle className="text-xl">Move faster on your search</CardTitle>
            <CardDescription>Select what you want to focus on next.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActionOptions.map((action) => (
              <button
                key={action.label}
                type="button"
                onClick={() => onGoToSection(action.target)}
                className="flex w-full items-start gap-3 rounded-2xl border border-border/70 bg-white/70 p-4 text-left transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <action.icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Momentum</Badge>
            <CardTitle className="text-xl">Workflow timeline</CardTitle>
            <CardDescription>Track every action PS8 guided you through this week.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {activityTimeline.map((item) => (
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
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Recent analyses</Badge>
            <CardTitle className="text-xl">Snapshots</CardTitle>
            <CardDescription>Jump back into any saved run.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAnalyses.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onOpenAnalysis(item.id)}
                className="w-full rounded-3xl border border-border/60 bg-white/70 p-4 text-left transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-foreground">{item.role}</p>
                  <Badge variant="outline" className="rounded-full">
                    {item.matchScore}% match
                  </Badge>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{item.company}</p>
                <p className="mt-2 text-xs text-muted-foreground">{item.summary}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                  {item.highlights.map((highlight) => (
                    <span key={highlight} className="rounded-full bg-muted px-2 py-1">
                      {highlight}
                    </span>
                  ))}
                </div>
                <p className="mt-3 text-xs text-muted-foreground">Updated {item.updatedAt}</p>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Insights</Badge>
            <CardTitle className="text-xl">Resource library</CardTitle>
            <CardDescription>Deepen your prep with curated playbooks and templates.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {knowledgeResources.map((resource) => (
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

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Focus areas</Badge>
            <CardTitle className="text-xl">What to reinforce</CardTitle>
            <CardDescription>Based on recruiter notes from the last call.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {knowledgeFocusAreas.map((area) => (
              <div key={area.label} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">{area.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{area.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Pipeline</Badge>
            <CardTitle className="text-xl">Upcoming interviews</CardTitle>
            <CardDescription>Stay ahead of prep with snapshots of every conversation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingInterviews.map((interview) => (
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

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Dashboard metrics</Badge>
            <CardTitle className="text-xl">Signal summary</CardTitle>
            <CardDescription>Monitor at a glance.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {dashboardMetricsFromAnalysis.map((metric) => {
              const value = metric.getValue()
              return (
                <div key={metric.label} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <metric.icon className="h-4 w-4 text-primary" />
                      <span className="text-sm font-semibold text-foreground">{metric.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-primary">{value}%</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{metric.helper}</p>
                  <Progress value={value} className="mt-3 h-2 rounded-full" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function HistorySection({ entries, onOpenAnalysis, onOpenInterview, onOpenResume }: HistorySectionProps) {
  const totals = entries.reduce(
    (acc, entry) => {
      if (entry.hasAnalysis) acc.analysis += 1
      if (entry.hasInterviewPack) acc.interview += 1
      if (entry.hasEnhancedResume) acc.resume += 1
      return acc
    },
    { analysis: 0, interview: 0, resume: 0 },
  )

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">History</Badge>
          <CardTitle className="text-2xl">Resume journey</CardTitle>
          <CardDescription>Revisit every analysis, interview pack, and enhanced draft you've generated.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border/60 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Analyses completed</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{totals.analysis}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Question packs</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{totals.interview}</p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-white/70 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Enhanced resumes</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{totals.resume}</p>
          </div>
        </CardContent>
      </Card>

      {entries.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {entries.map((entry) => {
            const statuses = [
              entry.hasAnalysis ? "Analysis completed" : null,
              entry.hasInterviewPack ? "Question pack ready" : null,
              entry.hasEnhancedResume ? "Enhanced resume saved" : null,
            ].filter((status): status is string => Boolean(status))

            return (
              <Card key={entry.id} className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-xl">{entry.role}</CardTitle>
                    {entry.matchScore ? (
                      <Badge variant="outline" className="rounded-full">
                        {entry.matchScore}% match
                      </Badge>
                    ) : null}
                  </div>
                  <CardDescription>{entry.company}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Uploaded {entry.uploadedAt}</span>
                  </div>
                  {statuses.length ? (
                    <div className="flex flex-wrap gap-2">
                      {statuses.map((status) => (
                        <Badge key={status} className="rounded-full bg-primary/10 text-primary">
                          {status}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Resume uploaded with no generated outputs yet.</p>
                  )}
                  <div className="rounded-2xl border border-dashed border-border/60 bg-white/70 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Job description snapshot</p>
                    <p className="mt-2 text-sm text-muted-foreground">{entry.job.job_description_raw}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center gap-3">
                  {entry.hasAnalysis ? (
                    <Button variant="outline" className="rounded-full" onClick={() => onOpenAnalysis(entry.id)}>
                      View analytics
                      <BarChart3 className="ml-2 h-4 w-4" />
                    </Button>
                  ) : null}
                  {entry.hasInterviewPack ? (
                    <Button className="rounded-full" onClick={() => onOpenInterview(entry.id)}>
                      Question pack
                      <MessageSquare className="ml-2 h-4 w-4" />
                    </Button>
                  ) : null}
                  {entry.hasEnhancedResume ? (
                    <Button variant="outline" className="rounded-full" onClick={() => onOpenResume(entry.id)}>
                      Enhanced resume
                      <FileText className="ml-2 h-4 w-4" />
                    </Button>
                  ) : null}
                  {!entry.hasInterviewPack && !entry.hasAnalysis && !entry.hasEnhancedResume ? (
                    <p className="text-xs text-muted-foreground">No generated outputs yet.</p>
                  ) : null}
                </CardFooter>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card className="rounded-[32px] border border-dashed border-border/70 bg-white/80 p-8 text-center backdrop-blur">
          <CardHeader>
            <CardTitle className="text-xl">No history yet</CardTitle>
            <CardDescription>Upload a resume to start tracking your progress.</CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}

function AnalysisSection({ uploadedResume, onUploadResume, onShowDashboard, onShowDetails }: AnalysisSectionProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [jobLink, setJobLink] = useState("")

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onUploadResume(file)
    event.target.value = ""
  }

  const formatSize = (bytes: number) => {
    const kb = Math.max(1, Math.round(bytes / 1024))
    return `${kb} KB`
  }

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
  }

  const uploadSummary = uploadedResume
    ? `${uploadedResume.name} · ${formatSize(uploadedResume.size)} · Uploaded ${formatTimestamp(uploadedResume.uploadedAt)}`
    : "No resume uploaded yet. Drop a PDF or DOCX to kick-off a fresh analysis."

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="flex items-center justify-between gap-3">
          <CardTitle className="text-2xl font-semibold text-foreground">Resume analysis</CardTitle>
          <Button variant="ghost" className="rounded-full text-xs text-muted-foreground hover:text-foreground" onClick={onShowDashboard}>
            Back to dashboard
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="analysis-job-link" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Job description link
            </label>
            <Input
              id="analysis-job-link"
              value={jobLink}
              onChange={(event) => setJobLink(event.target.value)}
              placeholder="https://..."
            />
          </div>
          <input ref={uploadInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUploadChange} />
          <div className="rounded-[28px] border border-dashed border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground">
            <p className="text-sm font-medium text-foreground">{uploadSummary}</p>
            <p className="mt-2 text-xs">Supported formats: PDF, DOC, DOCX · Max 5 MB</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button type="button" className="rounded-full" onClick={handleTriggerUpload}>
                <UploadCloud className="mr-2 h-4 w-4" />
                {uploadedResume ? "Upload another resume" : "Upload resume"}
              </Button>
              <Button variant="outline" className="rounded-full" onClick={onShowDetails}>
                View analysis details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-end gap-3">
        <Button className="rounded-full" onClick={onShowDetails}>
          Generate Analysis 
          <BarChart3 className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">What happens next</Badge>
          <CardTitle className="text-xl">Analysis pipeline</CardTitle>
          <CardDescription>The platform runs these steps every time you upload.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="grid gap-3 text-sm text-muted-foreground md:grid-cols-2 xl:grid-cols-4">
            {dashboardQuickSteps.map((step, index) => (
              <li key={step} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">{index + 1}</span>
                  Step {index + 1}
                </div>
                <p className="mt-2 text-sm text-foreground">{step}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

function AnalysisDetailsSection({ analysis, onBack, onGenerateQuestions, onEnhanceResume }: AnalysisDetailsSectionProps) {
  const template = analysisTemplateMock
  const overview = template.overall_analysis
  const charts = template.charts
  const highlights = template.profile_highlights
  const suggestions = template.improvement_suggestions

  const overviewMetrics = useMemo(
    () => [
      { key: "overall", label: "Overall match", value: overview.overall_match_score, helper: "Director target ≥ 85%", icon: Target },
      { key: "skills", label: "Skills coverage", value: overview.skills_match, helper: "Address missing signals", icon: Sparkles },
      { key: "experience", label: "Experience alignment", value: overview.experience_match, helper: "Frame equivalent scope", icon: TrendingUp },
      { key: "ats", label: "ATS readiness", value: overview.ats_score, helper: "Keep formatting clean", icon: CheckCircle2 },
      { key: "education", label: "Education", value: overview.education_match, helper: "Director requirement met", icon: Award },
      { key: "certifications", label: "Certifications", value: overview.certifications_match, helper: "Add notable programs", icon: BarChart3 },
    ],
    [overview],
  )

  const skillSegments = useMemo(() => {
    const distribution = charts.skill_match_distribution
    return [
      { label: "Matched", value: distribution.matched, color: "bg-emerald-500" },
      { label: "Partially matched", value: distribution.partially_matched, color: "bg-amber-500" },
      { label: "Missing", value: distribution.missing, color: "bg-rose-500" },
    ]
  }, [charts.skill_match_distribution])
  const skillTotal = skillSegments.reduce((acc, segment) => acc + segment.value, 0) || 1

  const experienceRows = useMemo(() => {
    const { required_experience_years, candidate_experience_years } = charts.experience_comparison
    return [
      { label: "Role benchmark", value: required_experience_years, color: "bg-primary" },
      { label: "Current signal", value: candidate_experience_years, color: "bg-primary/60" },
    ]
  }, [charts.experience_comparison])
  const maxExperience = Math.max(...experienceRows.map((row) => row.value), 1)

  const maxKeywordFrequency = charts.word_cloud_keywords.reduce((max, keyword) => Math.max(max, keyword.frequency), 1)

  const gaugeScore = charts.resume_effectiveness.gauge_score

  const resumeEffectivenessAxes = useMemo(
    () => [
      { label: "Technical skills", value: overview.skills_match },
      { label: "Experience", value: overview.experience_match },
      { label: "Education", value: overview.education_match },
      { label: "Soft skills", value: Math.round(analysis.metrics.leadershipNarrative * 100) },
      { label: "Certifications", value: overview.certifications_match },
    ],
    [analysis.metrics.leadershipNarrative, overview],
  )

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Badge className="rounded-full bg-primary/10 text-primary">Analysis snapshot</Badge>
            <Button variant="ghost" className="rounded-full text-xs text-muted-foreground hover:text-foreground" onClick={onBack}>
              Back
            </Button>
          </div>
          <CardTitle className="text-3xl font-semibold text-foreground">Latest match insights</CardTitle>
          <CardDescription>
            Resume alignment for {analysis.candidate.targetRole} at {analysis.candidate.targetCompany}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{analysis.summary}</p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <Card key={metric.key} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <CardDescription className="uppercase tracking-wide text-xs text-muted-foreground">{metric.label}</CardDescription>
                <metric.icon className="h-4 w-4 text-primary" />
              </div>
              <CardTitle className="text-3xl font-semibold text-primary">{metric.value}%</CardTitle>
              <p className="text-sm text-muted-foreground">{metric.helper}</p>
            </CardHeader>
            <CardContent>
              <Progress value={metric.value} className="h-2 rounded-full" />
            </CardContent>
          </Card>
        ))}
        <Card className="rounded-3xl border border-dashed border-border/70 bg-white/80 p-5 text-sm text-muted-foreground backdrop-blur">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">Missing skills</p>
              <p className="mt-1 text-sm text-muted-foreground">Targeted additions to close the gap.</p>
            </div>
            <Badge variant="outline" className="rounded-full text-base font-semibold text-foreground">
              {overview.missing_skills_count}
            </Badge>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">Prioritize these in the skill plan below.</p>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <div className="grid gap-6">
          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Skill coverage</Badge>
              <CardTitle className="text-2xl">Match distribution</CardTitle>
              <CardDescription>Understand how your current resume maps to required competencies.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
                {skillSegments.map((segment) => (
                  <div
                    key={segment.label}
                    className={`${segment.color} transition-all`}
                    style={{ width: `${(segment.value / skillTotal) * 100}%` }}
                  />
                ))}
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {skillSegments.map((segment) => (
                  <div key={segment.label} className="rounded-2xl border border-border/60 bg-white/70 p-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{segment.label}</p>
                    <p className="mt-1 text-lg font-semibold text-foreground">{segment.value}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round((segment.value / skillTotal) * 100)}% of required signals
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Experience check</Badge>
              <CardTitle className="text-2xl">Years vs requirement</CardTitle>
              <CardDescription>Compare duties and scope to the hiring bar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {experienceRows.map((row) => (
                <div key={row.label}>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{row.label}</span>
                    <span>{row.value} yrs</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className={`${row.color} h-full`} style={{ width: `${(row.value / maxExperience) * 100}%` }} />
                  </div>
                </div>
              ))}
              <p className="text-xs text-muted-foreground">
                Consider framing equivalent scope (budget, team size, velocity) to reinforce experience parity.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Keyword pulse</Badge>
              <CardTitle className="text-2xl">Word cloud highlights</CardTitle>
              <CardDescription>Surface the strongest signals recruiters will scan for.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {charts.word_cloud_keywords.map((keyword) => {
                  const scale = 0.85 + (keyword.frequency / maxKeywordFrequency) * 0.75
                  return (
                    <span
                      key={keyword.word}
                      className="rounded-full bg-primary/10 px-3 py-1 text-primary"
                      style={{ fontSize: `${scale}rem` }}
                    >
                      {keyword.word}
                    </span>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
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
              <p className="mt-2 text-xs text-muted-foreground">Aim for 80%+ coverage with strong context in bullet points.</p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Coaching</Badge>
            <CardTitle className="text-2xl">Textual feedback</CardTitle>
            <CardDescription>Immediate tweaks to elevate clarity and impact.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {suggestions.textual_feedback.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Courses</Badge>
            <CardTitle className="text-2xl">Recommended upskilling</CardTitle>
            <CardDescription>Resources that close the strongest gaps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {suggestions.recommended_courses.map((course) => (
              <div key={course.name} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                <p className="text-sm font-semibold text-foreground">{course.name}</p>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{course.platform}</p>
                <a href={course.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center text-xs font-medium text-primary underline">
                  View course
                </a>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Skill gap plan</Badge>
            <CardTitle className="text-2xl">Closing actions</CardTitle>
            <CardDescription>Prioritized steps to reinforce missing competencies.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            {suggestions.skill_gap_closure_plan.map((item) => (
              <div key={item.missing_skill} className="rounded-2xl border border-dashed border-border/60 p-4">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                  <span>{item.missing_skill}</span>
                  <Badge variant="outline" className="rounded-full">
                    {item.priority_level}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-foreground">{item.recommended_action}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Resume polish</Badge>
            <CardTitle className="text-2xl">Optimization tips</CardTitle>
            <CardDescription>Packaging tweaks to maximize recruiter recall.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {suggestions.resume_optimization_tips.map((tip) => (
                <li key={tip} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 text-emerald-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

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

      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <Button className="rounded-full md:mr-auto" onClick={onGenerateQuestions}>
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

function InterviewSection({ analysis, onBackToAnalysis, onGoToResume, showIntakeFields }: InterviewSectionProps) {
  const [stage, setStage] = useState<"intake" | "ready" | "results">(showIntakeFields ? "intake" : "ready")
  const [jobLink, setJobLink] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [competencies, setCompetencies] = useState("")
  const [interviewType, setInterviewType] = useState("mixed")
  const [uploadedResumeFile, setUploadedResumeFile] = useState<File | null>(null)
  const [numberOfQuestions, setNumberOfQuestions] = useState("6")
  const [openQuestionIds, setOpenQuestionIds] = useState<string[]>([])
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setStage(showIntakeFields ? "intake" : "ready")
    setOpenQuestionIds([])
  }, [showIntakeFields])

  const questionBank = useMemo(() => {
    return analysis.interviewTopics.flatMap((topic) =>
      topic.questions.map((question, index) => ({
        id: `${topic.topic}-${index}`,
        topic: topic.topic,
        question,
        answer: topic.coaching,
      })),
    )
  }, [analysis.interviewTopics])

  const maxQuestions = Math.max(1, questionBank.length)
  const sanitizedCount = Math.max(1, Math.min(maxQuestions, parseInt(numberOfQuestions, 10) || 1))
  const displayedQuestions = questionBank.slice(0, sanitizedCount)

  const interviewTypeLabels: Record<string, string> = {
    technical: "Technical interview focus",
    behavioral: "Behavioral interview focus",
    "system-design": "System design focus",
    mixed: "Mixed format pack",
  }
  const interviewTypeLabel = interviewTypeLabels[interviewType] ?? interviewTypeLabels.mixed

  const formatSize = (bytes: number) => {
    const kb = Math.max(1, Math.round(bytes / 1024))
    return `${kb} KB`
  }

  const uploadSummary = uploadedResumeFile
    ? `${uploadedResumeFile.name} · ${formatSize(uploadedResumeFile.size)} · Ready for context blend`
    : "No resume uploaded yet. Upload to personalise the questions."

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setUploadedResumeFile(file)
    event.target.value = ""
  }

  const handleGenerate = () => {
    setOpenQuestionIds([])
    setStage("results")
  }

  const handleResetStage = () => {
    setOpenQuestionIds([])
    setStage(showIntakeFields ? "intake" : "ready")
  }

  const toggleQuestion = (id: string) => {
    setOpenQuestionIds((previous) => (previous.includes(id) ? previous.filter((entry) => entry !== id) : [...previous, id]))
  }

  const handleDownload = (includeAnswers: boolean) => {
    const lines = displayedQuestions.map((item, index) => {
      const answerSection = includeAnswers ? `\nAnswer: ${item.answer}` : ""
      return `${index + 1}. ${item.question}${answerSection}`
    })
    const content = lines.join("\n\n")
    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = includeAnswers ? "question-pack-with-answers.txt" : "question-pack.txt"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Interview prep</Badge>
          <CardTitle className="text-2xl">
            {stage === "results"
              ? "Generated prompts"
              : showIntakeFields
                ? "Tailor your question pack"
                : "Ready to generate questions"}
          </CardTitle>
          <CardDescription>
            {stage === "results"
              ? `Here’s a ${sanitizedCount}-question pack aligned to ${analysis.candidate.targetRole}.`
              : showIntakeFields
                ? "Share the latest role context and supporting resume before generating prompts."
                : `Using your ${analysis.candidate.targetRole} analysis for ${analysis.candidate.targetCompany}.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {stage === "results" ? (
            <>
              <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-primary/30 bg-background/70 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{interviewTypeLabel}</p>
                  <p className="text-xs text-muted-foreground">
                    {(jobTitle || analysis.candidate.targetRole).trim()} · {analysis.candidate.targetCompany}
                  </p>
                  {jobLink ? (
                    <a href={jobLink} target="_blank" rel="noreferrer" className="text-xs text-primary underline">
                      View job description
                    </a>
                  ) : null}
                  {jobDescription ? <p className="text-xs text-muted-foreground">{jobDescription}</p> : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="rounded-full" onClick={() => handleDownload(true)}>
                    <Download className="mr-2 h-4 w-4" /> Download with answers
                  </Button>
                  <Button variant="outline" className="rounded-full" onClick={() => handleDownload(false)}>
                    <Download className="mr-2 h-4 w-4" /> Download without answers
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {displayedQuestions.map((item, index) => {
                  const isOpen = openQuestionIds.includes(item.id)
                  return (
                    <Card key={item.id} className="rounded-3xl border border-border/60 bg-white/80 backdrop-blur transition">
                      <button
                        type="button"
                        onClick={() => toggleQuestion(item.id)}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Question {index + 1}</p>
                          <p className="mt-1 text-sm font-semibold text-foreground">{item.question}</p>
                        </div>
                        {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                      </button>
                      {isOpen ? (
                        <div className="border-t border-border/50 bg-white/70 px-5 py-4">
                          <Badge variant="outline" className="rounded-full">
                            {item.topic}
                          </Badge>
                          <p className="mt-3 text-sm font-medium text-foreground">Suggested response</p>
                          <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                        </div>
                      ) : null}
                    </Card>
                  )
                })}
              </div>
            </>
          ) : stage === "intake" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="interview-job-link" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Job description link
                  </label>
                  <Input id="interview-job-link" value={jobLink} onChange={(event) => setJobLink(event.target.value)} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="interview-job-title" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Job title
                  </label>
                  <Input id="interview-job-title" value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} placeholder={analysis.candidate.targetRole} />
                </div>
                <div className="space-y-2">
                  <label htmlFor="interview-experience-level" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Experience level
                  </label>
                  <Input id="interview-experience-level" value={experienceLevel} onChange={(event) => setExperienceLevel(event.target.value)} placeholder="Director" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="interview-job-description" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Focus areas
                  </label>
                  <Input
                    id="interview-job-description"
                    value={jobDescription}
                    onChange={(event) => setJobDescription(event.target.value)}
                    placeholder="Responsible AI · GTM experimentation · Stakeholder alignment"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="interview-competencies" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Competencies to emphasize
                  </label>
                  <Input
                    id="interview-competencies"
                    value={competencies}
                    onChange={(event) => setCompetencies(event.target.value)}
                    placeholder="Executive storytelling, experimentation velocity, metrics governance"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-interview-type" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Interview type
                  </label>
                  <select
                    id="form-interview-type"
                    value={interviewType}
                    onChange={(event) => setInterviewType(event.target.value)}
                    className="w-full rounded-2xl border border-border/70 bg-white/90 p-3 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="system-design">System design</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-question-count" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Number of questions
                  </label>
                  <Input
                    id="form-question-count"
                    type="number"
                    min={1}
                    max={maxQuestions}
                    value={numberOfQuestions}
                    onChange={(event) => setNumberOfQuestions(event.target.value)}
                    placeholder="6"
                  />
                  <p className="text-xs text-muted-foreground">Up to {maxQuestions} curated prompts available.</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Upload resume</p>
                <input ref={uploadInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUploadChange} />
                <div className="rounded-[28px] border border-dashed border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground">
                  <p className="text-sm font-medium text-foreground">{uploadSummary}</p>
                  <p className="mt-2 text-xs">Supported formats: PDF, DOC, DOCX · Max 5 MB</p>
                  <div className="mt-4">
                    <Button type="button" className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90" onClick={handleTriggerUpload}>
                      Upload resume
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[28px] border border-dashed border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground">
                <p className="text-sm font-medium text-foreground">
                  Your latest analysis inputs power this session. Update the role brief anytime from the Interview tab.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="form-question-count" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Number of questions
                  </label>
                  <Input
                    id="form-question-count"
                    type="number"
                    min={1}
                    max={maxQuestions}
                    value={numberOfQuestions}
                    onChange={(event) => setNumberOfQuestions(event.target.value)}
                    placeholder="6"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-interview-type" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Interview type
                  </label>
                  <select
                    id="form-interview-type"
                    value={interviewType}
                    onChange={(event) => setInterviewType(event.target.value)}
                    className="w-full rounded-2xl border border-border/70 bg-white/90 p-3 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="system-design">System design</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap justify-end gap-3">
          {stage === "results" ? (
            <>
              <Button variant="outline" className="rounded-full" onClick={handleResetStage}>
                Adjust inputs
              </Button>
              <Button type="button" className="rounded-full" onClick={handleGenerate}>
                Regenerate pack
              </Button>
            </>
          ) : (
            <Button type="button" className="rounded-full" onClick={handleGenerate}>
              Generate question pack
            </Button>
          )}
        </CardFooter>
      </Card>

      {stage === "results" ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Button variant="outline" className="rounded-full md:mr-auto" onClick={onBackToAnalysis}>
            Back to analysis
          </Button>
          <Button className="rounded-full" onClick={onGoToResume}>
            Jump to resume enhancer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardFooter className="flex flex-col gap-3 md:flex-row md:items-center">
            <Button variant="outline" className="rounded-full md:mr-auto" onClick={onBackToAnalysis}>
              Back to analysis
            </Button>
            <Button className="rounded-full" onClick={onGoToResume}>
              Jump to resume enhancer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
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
  uploadedResume,
  onUploadResume,
  showIntakeFields,
}: ResumeSectionProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [jobLink, setJobLink] = useState("")

  const templateGallery = useMemo(() => {
    return Array.from({ length: templateGalleryPlaceholderCount }, (_, index) => {
      const linkedTemplate = templates[index % templates.length]
      return {
        id: `template-gallery-${index + 1}`,
        label: `Template ${index + 1}`,
        imageSrc: `/images/template-placeholder-${(index % 3) + 1}.png`,
        linkedTemplateId: linkedTemplate?.id ?? null,
      }
    })
  }, [templates])

  const formatSize = (bytes: number) => {
    const kb = Math.max(1, Math.round(bytes / 1024))
    return `${kb} KB`
  }

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString)
    return date.toLocaleString(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })
  }

  const uploadSummary = uploadedResume
    ? `${uploadedResume.name} · ${formatSize(uploadedResume.size)} · Uploaded ${formatTimestamp(uploadedResume.uploadedAt)}`
    : "No resume uploaded yet. Drop a PDF or DOCX to kick-off a fresh analysis."

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onUploadResume(file)
    event.target.value = ""
  }

  const handleSelectGallery = (item: (typeof templateGallery)[number]) => {
    if (item.linkedTemplateId) {
      onSelectTemplate(item.linkedTemplateId)
    }
  }

  return (
    <div className="space-y-8">
      {showIntakeFields ? (
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Resume intake</Badge>
            <CardTitle className="text-2xl">Provide job context</CardTitle>
            <CardDescription>Share the job link and upload the latest resume before generating templates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="resume-job-link" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Job description link
              </label>
              <Input id="resume-job-link" value={jobLink} onChange={(event) => setJobLink(event.target.value)} placeholder="https://..." />
            </div>
            <input ref={uploadInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUploadChange} />
            <div className="rounded-[28px] border border-dashed border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground">
              <p className="text-sm font-medium text-foreground">{uploadSummary}</p>
              <p className="mt-2 text-xs">Supported formats: PDF, DOC, DOCX · Max 5 MB</p>
              <div className="mt-4">
                <Button type="button" className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90" onClick={handleTriggerUpload}>
                  Upload resume
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : null}

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Template resumes</Badge>
          <CardTitle className="text-2xl">Visual gallery</CardTitle>
          <CardDescription>Select a layout to preview before generating your draft.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {templateGallery.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectGallery(item)}
              className="group flex flex-col items-start gap-3 rounded-2xl border border-border/60 bg-white/70 p-3 text-left transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="relative w-full overflow-hidden rounded-xl">
                <div className="aspect-[3/4] w-full bg-muted/50" />
                <img
                  src={item.imageSrc}
                  alt={`${item.label} preview`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">Click to select this template</p>
              </div>
            </button>
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
                    {isRecommended ? <Badge className="rounded-full bg-primary/10 text-primary">Recommended</Badge> : null}
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
  const [uploadedResume, setUploadedResume] = useState<UploadedResumeMeta | null>(null)
  const [selectedTemplateId, setSelectedTemplateId] = useState<ResumeTemplate["id"]>(resumeTemplates[0].id)
  const [generatedResume, setGeneratedResume] = useState<{ templateId: string; content: string } | null>(null)
  const [resumeEntryMode, setResumeEntryMode] = useState<"direct" | "analysis">("direct")
  const [interviewEntryMode, setInterviewEntryMode] = useState<"direct" | "analysis">("direct")

  const selectedTemplate = useMemo(() => {
    return resumeTemplates.find((template) => template.id === selectedTemplateId) ?? resumeTemplates[0]
  }, [selectedTemplateId])

  const recommendedTemplateIds = useMemo(() => {
    return new Set(analysisReport.resumeAngles.map((angle) => angle.templateId))
  }, [])

  const handleUploadResume = (file: File | null) => {
    if (!file) {
      setUploadedResume(null)
      return
    }
    setUploadedResume({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() })
  }

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

  const goToSection = (section: SectionKey, entryMode: "direct" | "analysis" = "direct") => {
    if (section === "resume") {
      setResumeEntryMode(entryMode)
    }
    if (section === "interview") {
      setInterviewEntryMode(entryMode)
    }
    setActiveSection(section)
  }

  const handleOpenAnalysis = (_analysisId: string) => {
    goToSection("analysisDetails", "analysis")
  }

  const handleOpenHistoryAnalysis = (_historyId: string) => {
    goToSection("analysisDetails", "analysis")
  }

  const handleOpenHistoryInterview = (_historyId: string) => {
    goToSection("interview", "analysis")
  }

  const handleOpenHistoryResume = (_historyId: string) => {
    goToSection("resume", "analysis")
  }

  const renderSection = () => {
    switch (activeSection) {
      case "history":
        return (
          <HistorySection
            entries={resumeHistory}
            onOpenAnalysis={handleOpenHistoryAnalysis}
            onOpenInterview={handleOpenHistoryInterview}
            onOpenResume={handleOpenHistoryResume}
          />
        )
      case "analysis":
        return (
          <AnalysisSection
            uploadedResume={uploadedResume}
            onUploadResume={handleUploadResume}
            onShowDashboard={() => goToSection("dashboard")}
            onShowDetails={() => goToSection("analysisDetails")}
          />
        )
      case "analysisDetails":
        return (
          <AnalysisDetailsSection
            analysis={analysisReport}
            onBack={() => goToSection("analysis")}
            onGenerateQuestions={() => goToSection("interview", "analysis")}
            onEnhanceResume={() => goToSection("resume", "analysis")}
          />
        )
      case "interview":
        return (
          <InterviewSection
            analysis={analysisReport}
            onBackToAnalysis={() => goToSection("analysis")}
            onGoToResume={() => goToSection("resume", "analysis")}
            showIntakeFields={interviewEntryMode === "direct"}
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
            onGoToAnalysis={() => goToSection("analysis")}
            uploadedResume={uploadedResume}
            onUploadResume={handleUploadResume}
            showIntakeFields={resumeEntryMode === "direct"}
          />
        )
      default:
        return (
          <DashboardSection
            analysis={analysisReport}
            recentAnalyses={recentAnalyses}
            uploadedResume={uploadedResume}
            onUploadResume={handleUploadResume}
            onOpenAnalysis={handleOpenAnalysis}
            onGoToSection={goToSection}
          />
        )
    }
  }

  return (
    <div className="flex h-screen min-h-screen overflow-hidden bg-background text-foreground">
      <aside className="hidden h-full w-72 flex-col overflow-y-auto border-r border-border/60 bg-muted/20 p-6 md:flex">
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
                onClick={() => goToSection(item.id)}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  isActive ? "bg-primary text-primary-foreground shadow" : "text-muted-foreground hover:bg-muted/60"
                }`}
              >
                <item.icon className={`h-4 w-4 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </aside>

      <main className="flex flex-1 min-w-0 flex-col overflow-hidden">
        <header className="shrink-0 border-b border-border/60 px-6 py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">Candidate command center</h1>
              <p className="text-sm text-muted-foreground">
                Coordinate your analysis, interview prep, and resume upgrades without leaving this workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => goToSection("analysis")}>
                View latest analysis
              </Button>
              <Button className="rounded-full" onClick={() => goToSection("resume")}>Enhance resume</Button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 md:hidden">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                className="flex-1 rounded-full text-xs"
                onClick={() => goToSection(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8">{renderSection()}</div>
      </main>
    </div>
  )
}
