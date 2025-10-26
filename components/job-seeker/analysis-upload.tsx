'use client'

import { useRef, useState } from 'react'
import { UploadCloud } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { dashboardQuickSteps, type UploadedResumeMeta } from '@/lib/job-seeker-data'

function formatSize(bytes: number) {
  const kb = Math.max(1, Math.round(bytes / 1024))
  return `${kb} KB`
}

function formatTimestamp(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export type AnalysisUploadProps = {
  uploadedResume: UploadedResumeMeta | null
  onUploadResume: (file: File | null) => void
  onBackToDashboard: () => void
  onViewExistingAnalysis: () => void
  onGenerateAnalysis: () => void
}

export function AnalysisUpload({
  uploadedResume,
  onUploadResume,
  onBackToDashboard,
  onViewExistingAnalysis,
  onGenerateAnalysis,
}: AnalysisUploadProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [jobLink, setJobLink] = useState('')

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onUploadResume(file)
    event.target.value = ''
  }

  const uploadSummary = uploadedResume
    ? `${uploadedResume.name} · ${formatSize(uploadedResume.size)} · Uploaded ${formatTimestamp(uploadedResume.uploadedAt)}`
    : 'No resume uploaded yet. Drop a PDF or DOCX to kick-off a fresh analysis.'

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="flex items-center justify-between gap-3">
          <div>
            <Badge className="rounded-full bg-primary/10 text-primary">Resume analysis</Badge>
            <CardTitle className="mt-4 text-2xl font-semibold text-foreground">Run a fresh analysis</CardTitle>
            <CardDescription className="mt-1">
              Provide the job description link and upload your latest resume to generate an AI-powered report.
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            className="rounded-full text-xs text-muted-foreground hover:text-foreground"
            onClick={onBackToDashboard}
          >
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
                {uploadedResume ? 'Upload another resume' : 'Upload resume'}
              </Button>
              <Button variant="outline" className="rounded-full" onClick={onViewExistingAnalysis}>
                View saved analyses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap justify-end gap-3">
        <Button className="rounded-full" onClick={onGenerateAnalysis}>
          Generate analysis
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
