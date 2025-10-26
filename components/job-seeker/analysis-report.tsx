'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowRight, Award, BarChart3, CheckCircle2, FileText, MessageSquare, Sparkles, Target, TrendingUp } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import type { AnalysisTemplate, CandidateAnalysis } from '@/lib/job-seeker-data'

export type AnalysisMetadata = {
  id: string
  role: string
  company: string
  summary: string
  updatedAt: string
  matchScore?: number
}

export type AnalysisReportProps = {
  analysis: CandidateAnalysis
  template: AnalysisTemplate
  metadata: AnalysisMetadata | null
  onBack: () => void
  onGoToInterview: () => void
  onGoToResume: () => void
}

export function AnalysisReport({ analysis, template, metadata, onBack, onGoToInterview, onGoToResume }: AnalysisReportProps) {
  const overview = template.overall_analysis
  const charts = template.charts
  const suggestions = template.improvement_suggestions

  const overviewMetrics = useMemo(
    () => [
      { key: 'overall', label: 'Overall match', value: overview.overall_match_score, helper: 'Director target ≥ 85%', icon: Target },
      { key: 'skills', label: 'Skills coverage', value: overview.skills_match, helper: 'Address missing signals', icon: Sparkles },
      { key: 'experience', label: 'Experience alignment', value: overview.experience_match, helper: 'Frame equivalent scope', icon: TrendingUp },
      { key: 'ats', label: 'ATS readiness', value: overview.ats_score, helper: 'Keep formatting clean', icon: CheckCircle2 },
      { key: 'education', label: 'Education', value: overview.education_match, helper: 'Director requirement met', icon: Award },
      { key: 'certifications', label: 'Certifications', value: overview.certifications_match, helper: 'Add notable programs', icon: BarChart3 },
    ],
    [overview],
  )

  const skillSegments = useMemo(() => {
    const distribution = charts.skill_match_distribution
    return [
      { label: 'Matched', value: distribution.matched, color: 'bg-emerald-500' },
      { label: 'Partially matched', value: distribution.partially_matched, color: 'bg-amber-500' },
      { label: 'Missing', value: distribution.missing, color: 'bg-rose-500' },
    ]
  }, [charts.skill_match_distribution])

  const skillTotal = skillSegments.reduce((acc, segment) => acc + segment.value, 0) || 1

  const experienceRows = useMemo(() => {
    const { required_experience_years, candidate_experience_years } = charts.experience_comparison
    return [
      { label: 'Role benchmark', value: required_experience_years, color: 'bg-primary' },
      { label: 'Current signal', value: candidate_experience_years, color: 'bg-primary/60' },
    ]
  }, [charts.experience_comparison])

  const maxExperience = Math.max(...experienceRows.map((row) => row.value), 1)

  const maxKeywordFrequency = charts.word_cloud_keywords.reduce((max, keyword) => Math.max(max, keyword.frequency), 1)

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
          {metadata ? (
            <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="outline" className="rounded-full">{metadata.role}</Badge>
              <span>{metadata.company}</span>
              {metadata.matchScore ? <span className="text-primary font-semibold">{metadata.matchScore}% match</span> : null}
              <span className="text-xs uppercase tracking-wide">Updated {metadata.updatedAt}</span>
            </div>
          ) : null}
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
                <Link href={course.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center text-xs font-medium text-primary underline">
                  View course
                  <ArrowRight className="ml-2 h-3 w-3" />
                </Link>
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
        <Button className="rounded-full md:mr-auto" onClick={onGoToInterview}>
          Generate interview questions
          <MessageSquare className="ml-2 h-4 w-4" />
        </Button>
        <Button variant="outline" className="rounded-full" onClick={onGoToResume}>
          Enhance my resume
          <FileText className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
