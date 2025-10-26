import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BarChart3,
  CheckCircle2,
  ExternalLink,
  FileText,
  Sparkles,
  Target,
  TrendingUp,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { getRecruiterApplicantById, getRecruiterJobById } from '@/lib/recruiter-data'

export default function RecruiterAnalyticsPage({ params }: { params: { applicantId: string } }) {
  const applicantId = Number(params.applicantId)
  if (Number.isNaN(applicantId)) {
    notFound()
  }

  const applicant = getRecruiterApplicantById(applicantId)
  if (!applicant) {
    notFound()
  }

  const job = getRecruiterJobById(applicant.jobId)
  const analysis = applicant.analysis
  if (!analysis) {
    return (
      <div className="space-y-6">
        <Link
          href="/recruiter/jobs"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to job board
        </Link>
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-2xl">No analytics available (yet)</CardTitle>
            <CardDescription>
              {applicant.name} has not generated an AI-assisted analysis. Request an updated resume to unlock this view.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="rounded-full">
              <Link href={`/recruiter/resume/${applicant.id}`}>Open resume profile</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const overviewMetrics = [
    { key: 'overall', label: 'Overall match', value: analysis.overall_analysis.overall_match_score, icon: Target, helper: 'Ideal ≥ 85%' },
    { key: 'skills', label: 'Skills coverage', value: analysis.overall_analysis.skills_match, icon: Sparkles, helper: 'Optimize critical signals' },
    { key: 'experience', label: 'Experience alignment', value: analysis.overall_analysis.experience_match, icon: TrendingUp, helper: 'Focus on leadership scope' },
    { key: 'ats', label: 'ATS readiness', value: analysis.overall_analysis.ats_score, icon: CheckCircle2, helper: 'Keep formatting clean' },
    { key: 'education', label: 'Education', value: analysis.overall_analysis.education_match, icon: Award, helper: 'Ensure degree prominence' },
    { key: 'certifications', label: 'Certifications', value: analysis.overall_analysis.certifications_match, icon: BarChart3, helper: 'Highlight relevant badges' },
  ]

  const skillSegments = analysis.charts?.skill_match_distribution ?? { matched: 0, partially_matched: 0, missing: 0 }
  const skillTotal = skillSegments.matched + skillSegments.partially_matched + skillSegments.missing || 1
  const experienceComparison = analysis.charts?.experience_comparison ?? {
    required_experience_years: applicant.experience,
    candidate_experience_years: applicant.experience,
  }
  const maxExperience = Math.max(
    experienceComparison.required_experience_years,
    experienceComparison.candidate_experience_years,
    1,
  )
  const wordCloudKeywords = analysis.charts?.word_cloud_keywords ?? []
  const maxKeywordFrequency = wordCloudKeywords.reduce((max, keyword) => Math.max(max, keyword.frequency), 1)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link
          href={`/recruiter/resume/${applicant.id}`}
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to resume
        </Link>
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/recruiter/jobs">Return to jobs</Link>
        </Button>
      </div>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <Badge className="rounded-full bg-primary/10 text-primary">AI analysis</Badge>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Match score {analysis.overall_analysis.overall_match_score}%
            </span>
          </div>
          <CardTitle className="text-3xl font-semibold text-foreground">{applicant.name}</CardTitle>
          <CardDescription>
            {job ? (
              <span className="text-sm text-muted-foreground">Assessment for {job.title} · {job.department}</span>
            ) : (
              <span className="text-sm text-muted-foreground">Role metadata unavailable</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Snapshot of resume alignment across required competencies, experience depth, and ATS heuristics.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {overviewMetrics.map((metric) => (
          <Card key={metric.key} className="rounded-3xl border border-border/70 bg-white/80 backdrop-blur">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                <span>{metric.label}</span>
                <metric.icon size={14} className="text-primary" />
              </div>
              <CardTitle className="text-3xl font-semibold text-primary">{metric.value}%</CardTitle>
              <CardDescription>{metric.helper}</CardDescription>
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
              <p className="mt-1 text-sm text-muted-foreground">Highlighted below in the improvement plan.</p>
            </div>
            <Badge variant="outline" className="rounded-full text-base font-semibold text-foreground">
              {analysis.overall_analysis.missing_skills_count}
            </Badge>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Skill alignment</Badge>
            <CardTitle className="text-2xl">Match distribution</CardTitle>
            <CardDescription>Breakdown of required competencies vs current resume signals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
              <div className="bg-emerald-500" style={{ width: `${(skillSegments.matched / skillTotal) * 100}%` }} />
              <div className="bg-amber-500" style={{ width: `${(skillSegments.partially_matched / skillTotal) * 100}%` }} />
              <div className="bg-rose-500" style={{ width: `${(skillSegments.missing / skillTotal) * 100}%` }} />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-border/60 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Matched</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{skillSegments.matched}</p>
                <p className="text-xs text-muted-foreground">{Math.round((skillSegments.matched / skillTotal) * 100)}% coverage</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Partial</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{skillSegments.partially_matched}</p>
                <p className="text-xs text-muted-foreground">{Math.round((skillSegments.partially_matched / skillTotal) * 100)}% coverage</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-white/70 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Missing</p>
                <p className="mt-1 text-lg font-semibold text-foreground">{skillSegments.missing}</p>
                <p className="text-xs text-muted-foreground">{Math.round((skillSegments.missing / skillTotal) * 100)}% gap</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="space-y-6">
          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Experience check</Badge>
              <CardTitle className="text-2xl">Years vs requirement</CardTitle>
              <CardDescription>Compare candidate tenure against job benchmark.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[{
                label: 'Role benchmark',
                value: experienceComparison.required_experience_years,
                color: 'bg-primary',
              }, {
                label: 'Current signal',
                value: experienceComparison.candidate_experience_years,
                color: 'bg-primary/60',
              }].map((row) => (
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
              <p className="text-xs text-muted-foreground">Bridge any gap by highlighting scope and ownership signals.</p>
            </CardContent>
          </Card>

          {analysis.charts?.resume_effectiveness ? (
            <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
              <CardHeader className="space-y-2">
                <Badge className="w-fit rounded-full bg-primary/10 text-primary">Resume quality</Badge>
                <CardTitle className="text-2xl">Effectiveness gauge</CardTitle>
                <CardDescription>LLM assessment of structure, clarity, and ATS hygiene.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-4xl font-semibold text-primary">{analysis.charts.resume_effectiveness.gauge_score}%</div>
                <Progress value={analysis.charts.resume_effectiveness.gauge_score} className="h-2 rounded-full" />
                <p className="text-xs text-muted-foreground">
                  Scores above 85% indicate the resume is ready to forward without edits.
                </p>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>

      {wordCloudKeywords.length ? (
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Keyword pulse</Badge>
            <CardTitle className="text-2xl">Hiring manager signal</CardTitle>
            <CardDescription>Higher frequency words indicate strong alignment with the scorecard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {wordCloudKeywords.map((keyword) => {
                const scale = 0.85 + (keyword.frequency / maxKeywordFrequency) * 0.8
                return (
                  <span key={keyword.word} className="rounded-full bg-primary/10 px-3 py-1 text-primary" style={{ fontSize: `${scale}rem` }}>
                    {keyword.word}
                  </span>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        {analysis.profile_highlights?.publications?.length ? (
          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Highlights</Badge>
              <CardTitle className="text-2xl">Thought leadership</CardTitle>
              <CardDescription>Signals that reinforce seniority and expertise.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {analysis.profile_highlights.publications.map((publication) => (
                <p key={publication} className="rounded-2xl border border-border/60 bg-white/70 p-3">{publication}</p>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {analysis.profile_highlights?.volunteer_work?.length ? (
          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Community</Badge>
              <CardTitle className="text-2xl">Volunteer impact</CardTitle>
              <CardDescription>Additional signals recruiters can spotlight in outreach.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {analysis.profile_highlights.volunteer_work.map((entry) => (
                <p key={entry} className="rounded-2xl border border-border/60 bg-white/70 p-3">{entry}</p>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>

      {analysis.improvement_suggestions ? (
        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Coaching</Badge>
              <CardTitle className="text-2xl">Textual feedback</CardTitle>
              <CardDescription>Highest leverage edits before sending next outreach.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {analysis.improvement_suggestions.textual_feedback.map((feedback) => (
                  <li key={feedback} className="flex items-start gap-2">
                    <AlertTriangle size={14} className="mt-0.5 text-amber-500" />
                    <span>{feedback}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Upskilling</Badge>
              <CardTitle className="text-2xl">Recommended courses</CardTitle>
              <CardDescription>Resources to close the most significant gaps.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {analysis.improvement_suggestions.recommended_courses.map((course) => (
                <div key={course.name} className="rounded-2xl border border-border/60 bg-white/70 p-4">
                  <p className="text-sm font-semibold text-foreground">{course.name}</p>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground">{course.platform}</p>
                  <Link
                    href={course.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
                  >
                    Explore
                    <ExternalLink size={12} />
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
            <CardHeader className="space-y-2">
              <Badge className="w-fit rounded-full bg-primary/10 text-primary">Gap plan</Badge>
              <CardTitle className="text-2xl">Closing actions</CardTitle>
              <CardDescription>Use these prompts during recruiter follow-ups.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              {analysis.improvement_suggestions.skill_gap_closure_plan.map((item) => (
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
              <CardDescription>Make it effortless for the hiring panel to skim.</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {analysis.improvement_suggestions.resume_optimization_tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-500" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 md:flex-row md:justify-end">
        <Button asChild variant="outline" className="rounded-full">
          <Link href={`/recruiter/resume/${applicant.id}`}>Review resume again</Link>
        </Button>
        <Button asChild className="rounded-full">
          <Link href="/recruiter/jobs">Back to applicant list</Link>
        </Button>
      </div>
    </div>
  )
}
