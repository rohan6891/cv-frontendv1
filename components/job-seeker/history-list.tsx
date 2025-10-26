'use client'

import { BarChart3, Clock, FileText, MessageSquare } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { HistoryEntry } from '@/lib/job-seeker-data'

export type HistoryListProps = {
  entries: HistoryEntry[]
  onOpenAnalysis: (historyId: string) => void
  onOpenInterview: (historyId: string) => void
  onOpenResume: (historyId: string) => void
}

export function HistoryList({ entries, onOpenAnalysis, onOpenInterview, onOpenResume }: HistoryListProps) {
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
              entry.hasAnalysis ? 'Analysis completed' : null,
              entry.hasInterviewPack ? 'Question pack ready' : null,
              entry.hasEnhancedResume ? 'Enhanced resume saved' : null,
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
