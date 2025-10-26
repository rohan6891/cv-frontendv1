'use client'

import { useMemo, useRef, useState } from 'react'
import { ArrowRight, Sparkles, UploadCloud } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { CandidateAnalysis, ResumeTemplate, UploadedResumeMeta } from '@/lib/job-seeker-data'
import { resumeTemplates, templateGalleryPlaceholderCount } from '@/lib/job-seeker-data'

function formatSize(bytes: number) {
  const kb = Math.max(1, Math.round(bytes / 1024))
  return `${kb} KB`
}

function formatTimestamp(isoString: string) {
  const date = new Date(isoString)
  return date.toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
}

export type ResumeEnhancerProps = {
  analysis: CandidateAnalysis
  templates?: ResumeTemplate[]
  templateIds?: Array<{ id: string; label: string }>
  uploadedResume: UploadedResumeMeta | null
  onUploadResume: (file: File | null) => void
  onGoToAnalysis: () => void
  onGenerateTemplate?: (templateId: string) => Promise<{ html: string; pdf_path?: string | null; pdf_url?: string | null }>
  showIntakeFields?: boolean
}

export function ResumeEnhancer({ analysis, templates = resumeTemplates, templateIds, uploadedResume, onUploadResume, onGoToAnalysis, onGenerateTemplate, showIntakeFields }: ResumeEnhancerProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [jobLink, setJobLink] = useState('')
  const initialTpl = templateIds?.[0]?.id ?? templates[0]?.id
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTpl)
  const [generatedResume, setGeneratedResume] = useState<{ templateId: string; content: string; pdf_url?: string | null } | null>(null)
  const [loading, setLoading] = useState(false)

  const selectedTemplate = useMemo(() => {
    return templates.find((template) => template.id === selectedTemplateId) ?? templates[0]
  }, [selectedTemplateId, templates])

  const recommendedTemplateIds = useMemo(() => {
    return new Set(analysis.resumeAngles.map((angle) => angle.templateId))
  }, [analysis.resumeAngles])

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

  const uploadSummary = uploadedResume
    ? `${uploadedResume.name} · ${formatSize(uploadedResume.size)} · Uploaded ${formatTimestamp(uploadedResume.uploadedAt)}`
    : 'No resume uploaded yet. Drop a PDF or DOCX to kick-off a fresh analysis.'

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    onUploadResume(file)
    event.target.value = ''
  }

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId)
    setGeneratedResume((previous) => (previous?.templateId === templateId ? previous : null))
  }

  const handleGenerateResume = async (templateId: string) => {
    if (onGenerateTemplate) {
      try {
        setLoading(true)
        const res = await onGenerateTemplate(templateId)
        setGeneratedResume({ templateId, content: res.html, pdf_url: res.pdf_url })
      } finally {
        setLoading(false)
      }
    } else {
      const template = templates.find((entry) => entry.id === templateId)
      if (!template) return
      setGeneratedResume({ templateId, content: template.generatedSample })
    }
  }

  const showIntake = showIntakeFields ?? !uploadedResume

  return (
    <div className="space-y-8">
  {showIntake ? (
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
      ) : (
        <input ref={uploadInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUploadChange} />
      )}

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Template resumes</Badge>
          <CardTitle className="text-2xl">Visual gallery</CardTitle>
          <CardDescription>Select a layout to preview before generating your draft.</CardDescription>
        </CardHeader>
        {templateIds && templateIds.length ? (
          <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {templateIds.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => handleSelectTemplate(t.id)}
                className={`rounded-2xl border ${selectedTemplateId === t.id ? 'border-primary' : 'border-border/60'} bg-white/70 p-3 text-left transition hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
              >
                <p className="text-sm font-semibold text-foreground">{t.label}</p>
                <p className="text-xs text-muted-foreground">Click to select</p>
              </button>
            ))}
          </CardContent>
        ) : (
          <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {templateGallery.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => item.linkedTemplateId && handleSelectTemplate(item.linkedTemplateId)}
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
        )}
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
                onClick={() => handleSelectTemplate(template.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    handleSelectTemplate(template.id)
                  }
                }}
                className={`h-full cursor-pointer rounded-3xl border ${
                  isActive ? 'border-primary shadow-lg' : 'border-border/70'
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
            <CardTitle className="text-2xl">{templateIds?.find(t=>t.id===selectedTemplateId)?.label || selectedTemplate?.name || 'Template'}</CardTitle>
            <CardDescription>{selectedTemplate?.description || 'Generate an upgraded draft tailored to your target role.'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(!templateIds || !templateIds.length) && (
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
            )}
            <p className="text-sm text-muted-foreground">We will merge this layout with your existing accomplishments to produce a ready-to-edit draft.</p>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 md:flex-row">
            <Button className="rounded-full" onClick={() => handleGenerateResume(selectedTemplateId)} disabled={loading}>
              {loading ? 'Generating…' : 'Generate enhanced resume'}
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
              {(templateIds?.find(t=>t.id===generatedResume.templateId)?.label) || (templates.find((template) => template.id === generatedResume.templateId)?.name) || 'Resume'} output
            </CardTitle>
            <CardDescription>Preview the generated HTML below. You can also download the PDF if available.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border/60 bg-white/70 p-2">
              <iframe title="Resume Preview" srcDoc={generatedResume.content} className="h-[500px] w-full rounded-xl border border-border/60"></iframe>
            </div>
            {generatedResume.pdf_url ? (
              <a href={generatedResume.pdf_url} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
                Download PDF
              </a>
            ) : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
