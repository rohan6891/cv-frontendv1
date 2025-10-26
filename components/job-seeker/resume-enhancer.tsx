'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
  onGenerateTemplate?: (templateId: string) => Promise<{ html: string; pdf_path?: string | null; pdf_url?: string | null; enhanced_id?: string | null }>
  onFetchTemplateHtml?: (templateId: string) => Promise<string>
  showIntakeFields?: boolean
}

export function ResumeEnhancer({ analysis, templates = resumeTemplates, templateIds, uploadedResume, onUploadResume, onGoToAnalysis, onGenerateTemplate, onFetchTemplateHtml, showIntakeFields }: ResumeEnhancerProps) {
  const uploadInputRef = useRef<HTMLInputElement | null>(null)
  const [jobLink, setJobLink] = useState('')
  const hasBackendTemplates = Boolean(templateIds && templateIds.length)
  const initialTpl = hasBackendTemplates ? templateIds?.[0]?.id : templates[0]?.id
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTpl ?? '')
  const [generatedResume, setGeneratedResume] = useState<{ templateId: string; content: string; pdf_url?: string | null; enhanced_id?: string | null } | null>(null)
  const [loading, setLoading] = useState(false)
  const [downloadLoading, setDownloadLoading] = useState(false)
  const [downloadError, setDownloadError] = useState<string | null>(null)
  const [templatePreviews, setTemplatePreviews] = useState<Record<string, string>>({})
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const templateLayoutClass = hasBackendTemplates ? 'space-y-6' : 'grid gap-6 xl:grid-cols-[1.2fr,0.8fr]'

  const availableTemplates = useMemo<ResumeTemplate[]>(() => {
    if (hasBackendTemplates) {
      return (templateIds ?? []).map((entry) => ({
        id: entry.id,
        name: entry.label,
        description: 'ATS-friendly layout provided by the resume enhancer service.',
        highlights: [],
        sections: [],
        generatedSample: '',
      }))
    }
    return templates
  }, [hasBackendTemplates, templateIds, templates])

  const selectedTemplate = useMemo(() => {
    return availableTemplates.find((template) => template.id === selectedTemplateId) ?? availableTemplates[0]
  }, [availableTemplates, selectedTemplateId])

  const recommendedTemplateIds = useMemo(() => {
    return new Set(analysis.resumeAngles.map((angle) => angle.templateId))
  }, [analysis.resumeAngles])

  const templateGallery = useMemo(() => {
    const source = availableTemplates.length ? availableTemplates : resumeTemplates
    return Array.from({ length: templateGalleryPlaceholderCount }, (_, index) => {
      const linkedTemplate = source[index % source.length]
      return {
        id: `template-gallery-${index + 1}`,
        label: `Template ${index + 1}`,
        imageSrc: `/images/template-placeholder-${(index % 3) + 1}.png`,
        linkedTemplateId: linkedTemplate?.id ?? null,
      }
    })
  }, [availableTemplates])

  useEffect(() => {
    if (hasBackendTemplates) {
      setSelectedTemplateId((prev) => {
        if (prev && templateIds?.some((entry) => entry.id === prev)) {
          return prev
        }
        return templateIds?.[0]?.id ?? ''
      })
    } else {
      setSelectedTemplateId((prev) => {
        if (prev && availableTemplates.some((entry) => entry.id === prev)) {
          return prev
        }
        return availableTemplates[0]?.id ?? ''
      })
    }
  }, [hasBackendTemplates, templateIds, availableTemplates])

  useEffect(() => {
    if (!hasBackendTemplates) return
    if (!onFetchTemplateHtml) return
    if (!selectedTemplateId) return
    if (!templateIds?.some((entry) => entry.id === selectedTemplateId)) return
    if (templatePreviews[selectedTemplateId]) {
      setPreviewLoading(false)
      return
    }

    let cancelled = false
    setPreviewLoading(true)
    setPreviewError(null)

    onFetchTemplateHtml(selectedTemplateId)
      .then((html) => {
        if (cancelled) return
        setTemplatePreviews((prev) => ({ ...prev, [selectedTemplateId]: html }))
      })
      .catch((error: any) => {
        if (cancelled) return
        setPreviewError(error?.message || 'Failed to load template preview')
      })
      .finally(() => {
        if (cancelled) return
        setPreviewLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [hasBackendTemplates, onFetchTemplateHtml, selectedTemplateId, templateIds, templatePreviews])

  const selectedTemplateHtml = templatePreviews[selectedTemplateId]

  useEffect(() => {
    if (hasBackendTemplates) return
    setTemplatePreviews((prev) => (Object.keys(prev).length ? {} : prev))
    setPreviewError((prev) => (prev ? null : prev))
    setPreviewLoading(false)
  }, [hasBackendTemplates])

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
    if (hasBackendTemplates) {
      setPreviewError(null)
      if (templatePreviews[templateId]) {
        setPreviewLoading(false)
      }
    }
  }

  const handleGenerateResume = async (templateId: string) => {
    if (!templateId) return
    setDownloadError(null)
    if (onGenerateTemplate) {
      try {
        setLoading(true)
        const res = await onGenerateTemplate(templateId)
        setGeneratedResume({ templateId, content: res.html, pdf_url: res.pdf_url, enhanced_id: res.enhanced_id ?? null })
      } finally {
        setLoading(false)
      }
    } else {
      const template = availableTemplates.find((entry) => entry.id === templateId)
      if (!template) return
      setGeneratedResume({ templateId, content: template.generatedSample })
    }
  }

  const handleDownloadGeneratedResume = async () => {
    if (!generatedResume) return
    setDownloadError(null)

    if (generatedResume.pdf_url) {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
      if (!token) {
        setDownloadError('Sign in again to download the PDF.')
        return
      }
      try {
        setDownloadLoading(true)
        const response = await fetch(generatedResume.pdf_url, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          throw new Error('Failed to download PDF')
        }
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `resume-${generatedResume.templateId}.pdf`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        return
      } catch (error: any) {
        setDownloadError(error?.message || 'Unable to download PDF right now.')
        return
      } finally {
        setDownloadLoading(false)
      }
    }

    const blob = new Blob([generatedResume.content], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `resume-${generatedResume.templateId}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
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

      <div className={templateLayoutClass}>
        {!hasBackendTemplates ? (
          <div className="grid gap-4 md:grid-cols-2">
            {availableTemplates.map((template) => {
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
        ) : null}

        <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardHeader className="space-y-2">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Selected template</Badge>
            <CardTitle className="text-2xl">{templateIds?.find(t=>t.id===selectedTemplateId)?.label || selectedTemplate?.name || 'Template'}</CardTitle>
            <CardDescription>{selectedTemplate?.description || 'Generate an upgraded draft tailored to your target role.'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {hasBackendTemplates ? (
              <div className="space-y-3">
                <p className="text-sm font-semibold text-muted-foreground">Template preview</p>
                <div className="rounded-2xl border border-border/60 bg-white/70 p-2">
                  {previewLoading ? (
                    <div className="flex h-[420px] items-center justify-center text-sm text-muted-foreground">Loading preview…</div>
                  ) : previewError ? (
                    <div className="flex h-[420px] items-center justify-center text-sm text-red-600">{previewError}</div>
                  ) : selectedTemplateHtml ? (
                    <iframe title="Template Preview" srcDoc={selectedTemplateHtml} className="h-[420px] w-full rounded-xl border border-border/60"></iframe>
                  ) : (
                    <div className="flex h-[420px] items-center justify-center text-sm text-muted-foreground">Select a template to see its preview.</div>
                  )}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-sm font-semibold text-muted-foreground">Structure outline</p>
                <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
                  {(selectedTemplate?.sections ?? []).map((section) => (
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
            <Button className="rounded-full" onClick={() => handleGenerateResume(selectedTemplateId)} disabled={loading || !selectedTemplateId}>
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
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => void handleDownloadGeneratedResume()} className="rounded-full" disabled={downloadLoading}>
                {downloadLoading ? 'Downloading…' : generatedResume.pdf_url ? 'Download PDF' : 'Download HTML version'}
              </Button>
              {!generatedResume.pdf_url ? (
                <p className="text-xs text-muted-foreground">PDF download becomes available once the enhancer service returns a PDF link.</p>
              ) : null}
            </div>
            {downloadError ? <p className="text-sm text-destructive">{downloadError}</p> : null}
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}
