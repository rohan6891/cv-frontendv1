import type { LucideIcon } from "lucide-react"
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
  UploadCloud,
} from "lucide-react"

export type ResumeTemplate = {
  id: string
  name: string
  description: string
  highlights: string[]
  sections: string[]
  generatedSample: string
}

export type UploadedResumeMeta = {
  name: string
  size: number
  uploadedAt: string
}

export type RecentAnalysis = {
  id: string
  role: string
  company: string
  matchScore: number
  updatedAt: string
  summary: string
  highlights: string[]
}

export type AnalysisTemplate = {
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

export type JobRecord = {
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

export type HistoryEntry = {
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

export type CandidateAnalysis = {
  candidate: {
    name: string
    currentRole: string
    targetRole: string
    targetCompany: string
  }
  metrics: {
    jobMatchScore: number
    atsScore: number
    leadershipNarrative: number
    quantitativeEvidence: number
  }
  summary: string
  strengths: { label: string; detail: string }[]
  improvementAreas: { label: string; actions: string[] }[]
  recommendedKeywords: { keyword: string; coverage: number }[]
  nextSteps: string[]
  interviewTopics: {
    topic: string
    questions: string[]
    coaching: string
  }[]
  resumeAngles: {
    templateId: string
    positioning: string
    headline: string
  }[]
}

export const analysisReport: CandidateAnalysis = {
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
}

export const activityTimeline = [
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

export const upcomingInterviews = [
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

export const knowledgeResources = [
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

export const resumeTemplates: ResumeTemplate[] = [
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
    generatedSample: `AMELIA CHEN\nStory-first product leader galvanizing teams around ambitious AI bets.\n\nNARRATIVE SUMMARY\nBlends analytical rigor with storytelling to align executives, legal, and customer teams on responsible AI growth.\n\nCASE STUDY: AI DISPATCH\nSituation: Delivery times plateaued at 48 hrs.\nAction: Led cross-functional swarm to design and test LLM-driven dispatch sequencing.\nOutcome: 17% faster fulfillment, $18M ARR, exec sponsor quote "Best narrative clarity of the fiscal year."\n\nCASE STUDY: RESPONSIBLE EXPERIMENTATION\nSituation: Fragmented AI governance risked compliance findings.\nAction: Built ethics scoring, red-team sprints, and approval rituals.\nOutcome: 12 launches with zero escalations and adoption across three business units.\n\nTHOUGHT LEADERSHIP\n- Speaker, Responsible AI Forum 2024\n- Author, "Storytelling systems for AI roadmaps" (10k reads)`
  },
]

export const recentAnalyses: RecentAnalysis[] = [
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

export const resumeHistory: HistoryEntry[] = [
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

export const knowledgeFocusAreas = [
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

export const analysisTemplateMock: AnalysisTemplate = {
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

export const dashboardQuickSteps = [
  "Extract structured data from resume",
  "Compare against target role requirements",
  "Generate competency insights",
  "Produce interview question packs",
] as const

export const templateGalleryPlaceholderCount = 10

export const interviewTypeLabels: Record<string, string> = {
  technical: "Technical interview focus",
  behavioral: "Behavioral interview focus",
  "system-design": "System design focus",
  mixed: "Mixed format pack",
}

export const interviewExperienceOptions = ["Associate", "Senior", "Director", "VP"] as const

export const interviewQuestionLimit = 12

export const defaultAnalysisId = recentAnalyses[0]?.id ?? "analysis-latest"

export const defaultHistoryAnalysisId = resumeHistory.find((entry) => entry.hasAnalysis)?.id ?? "history-analysis"

export function computeDashboardMetrics(analysis: CandidateAnalysis) {
  return [
    {
      label: "Job match score",
      helper: "Target ≥ 85%",
      icon: Target,
      value: Math.round(analysis.metrics.jobMatchScore * 100),
    },
    {
      label: "ATS readiness",
      helper: "Optimized for ATS parsers",
      icon: Sparkles,
      value: Math.round(analysis.metrics.atsScore * 100),
    },
    {
      label: "Leadership narrative",
      helper: "Add stakeholder vignettes",
      icon: TrendingUp,
      value: Math.round(analysis.metrics.leadershipNarrative * 100),
    },
    {
      label: "Quant evidence",
      helper: "Keep metrics front-and-center",
      icon: CheckCircle2,
      value: Math.round(analysis.metrics.quantitativeEvidence * 100),
    },
  ] as const
}

export const focusAreaIcons = {
  upload: UploadCloud,
  analysis: BarChart3,
  interview: MessageSquare,
  resume: FileText,
  alert: AlertTriangle,
  card: ExternalLink,
  download: Download,
  clock: Clock,
  arrow: ArrowRight,
  award: Award,
  calendar: Calendar,
}

export type NavigationItem = {
  href: string
  label: string
  icon: LucideIcon
}

export const jobSeekerNavigationItems: NavigationItem[] = [
  { href: "/job-seeker/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/job-seeker/analysis", label: "Analysis", icon: Target },
  { href: "/job-seeker/interview", label: "Interview prep", icon: MessageSquare },
  { href: "/job-seeker/resume", label: "Resume enhancer", icon: FileText },
  { href: "/job-seeker/history", label: "History", icon: Clock },
]

export function findAnalysisMetadataById(id: string) {
  const recent = recentAnalyses.find((analysis) => analysis.id === id)
  if (recent) {
    return {
      id: recent.id,
      role: recent.role,
      company: recent.company,
      summary: recent.summary,
      updatedAt: recent.updatedAt,
      matchScore: recent.matchScore,
    }
  }

  const history = resumeHistory.find((entry) => entry.id === id)
  if (history) {
    return {
      id: history.id,
      role: history.role,
      company: history.company,
      summary: history.job.job_description_raw,
      updatedAt: history.uploadedAt,
      matchScore: history.matchScore,
    }
  }

  return null
}
