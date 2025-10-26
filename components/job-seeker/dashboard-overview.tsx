'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, Calendar, Clock, FileText, MessageSquare, Sparkles, UploadCloud } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  activityTimeline,
  computeDashboardMetrics,
  dashboardQuickSteps,
  knowledgeFocusAreas,
  knowledgeResources,
  upcomingInterviews,
  type UploadedResumeMeta,
} from '@/lib/job-seeker-data'

const quickActionOptions = [
  {
    label: 'Review latest analysis',
    description: 'Deep dive the AI-generated insights and action plan.',
    href: '/job-seeker/analysis',
    icon: Sparkles,
  },
  {
    label: 'Prep interview questions',
    description: 'Spin up a question pack tailored to this role.',
    href: '/job-seeker/interview',
    icon: MessageSquare,
  },
  {
    label: 'Enhance resume',
    description: 'Generate an upgraded draft with LLM guidance.',
    href: '/job-seeker/resume',
    icon: FileText,
  },
] as const

function formatSize(bytes: number) {
  const kb = Math.max(1, Math.round(bytes / 1024))
  return `${kb} KB`
}

function formatTimestamp(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export type DashboardOverviewProps = {
  uploadedResume: UploadedResumeMeta | null
  onUploadResume: (file: File | null) => void
  onOpenAnalysis: (analysisId: string) => void
  analysis: any | null
  recentAnalyses: Array<{ id: string; role: string; company: string; matchScore: number; updatedAt: string; summary: string; highlights: string[] }>
  resumeHistory: any[]
  userName?: string | null
}

export function DashboardOverview({ uploadedResume, onUploadResume, onOpenAnalysis, analysis, recentAnalyses, resumeHistory, userName }: DashboardOverviewProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const router = useRouter()

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onUploadResume(file)
    event.target.value = ''
  }

  const uploadSummary = uploadedResume
    ? `${uploadedResume.name} · ${formatSize(uploadedResume.size)} · Uploaded ${formatTimestamp(uploadedResume.uploadedAt)}`
    : 'No resume uploaded yet. Drop a PDF or DOCX to kick-off a fresh analysis.'

  const dashboardMetrics = analysis ? computeDashboardMetrics(analysis) : []

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Badge className="rounded-full bg-primary/10 text-primary">Workspace overview</Badge>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Last synced · Oct 25, 2025</span>
          </div>
          <CardTitle className="text-3xl font-semibold text-foreground">Welcome back{userName ? `, ${userName}` : analysis?.candidate?.name ? `, ${analysis.candidate.name}` : ''}</CardTitle>
          <CardDescription>
            Targeting {analysis?.candidate?.targetRole ?? 'your target role'} at {analysis?.candidate?.targetCompany ?? 'your target company'}. Keep your resume signals and
            interview prep in one streamlined hub.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex flex-wrap gap-3">
          {analysis?.candidate?.currentRole ? (
            <Badge variant="outline" className="rounded-full">
              Current role · {analysis.candidate.currentRole}
            </Badge>
          ) : null}
          {analysis?.metrics?.jobMatchScore != null ? (
            <Badge variant="outline" className="rounded-full">
              Match score · {Math.round(analysis.metrics.jobMatchScore * 100)}%
            </Badge>
          ) : null}
          {analysis?.metrics?.atsScore != null ? (
            <Badge variant="outline" className="rounded-full">
              ATS readiness · {Math.round(analysis.metrics.atsScore * 100)}%
            </Badge>
          ) : null}
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
                  {uploadedResume ? 'Upload another resume' : 'Upload resume'}
                </Button>
                <Button variant="outline" className="rounded-full" onClick={() => router.push('/job-seeker/analysis')}>
                  View latest analysis
                </Button>
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
                onClick={() => router.push(action.href)}
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
                    <ArrowRight className="ml-2 h-3 w-3" />
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
            {dashboardMetrics.map((metric) => (
              <div key={metric.label} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <metric.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-foreground">{metric.label}</span>
                  </div>
                  <span className="text-sm font-semibold text-primary">{metric.value}%</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{metric.helper}</p>
                <Progress value={metric.value} className="mt-3 h-2 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">History insight</Badge>
          <CardTitle className="text-xl">Recent uploads</CardTitle>
          <CardDescription>Resume IDs ready for a deeper dive.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {resumeHistory.slice(0, 3).map((entry) => (
            <div key={entry.id} className="rounded-2xl border border-border/60 bg-white/70 p-4">
              <p className="text-sm font-semibold text-foreground">{entry.role}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{entry.company}</p>
              <p className="mt-2 text-xs text-muted-foreground">Uploaded {entry.uploadedAt}</p>
              <Button
                variant="outline"
                className="mt-4 w-full rounded-full"
                onClick={() => onOpenAnalysis(entry.id)}
              >
                View analysis
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
