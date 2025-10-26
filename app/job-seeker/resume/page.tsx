'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { ResumeEnhancer } from '@/components/job-seeker/resume-enhancer'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { enhanceResume, getLatestAnalysis, getResumeTemplatePreview, listResumeTemplates } from '@/lib/job-seeker-api'

export default function ResumePage() {
  const [uploadedResume, setUploadedResume] = useState<UploadedResumeMeta | null>(null)
  const [analysis, setAnalysis] = useState<any | null>(null)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Array<{ id: string; label: string }>>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [latest, tpl] = await Promise.all([getLatestAnalysis(), listResumeTemplates()])
        if (!mounted) return
        setAnalysis(latest.analysis)
        setAnalysisId(latest.metadata?.id || null)
        setTemplates(tpl.items || [])
      } catch (e: any) {
        setError(e?.message || 'Failed to load data')
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  const handleUploadResume = (file: File | null) => {
    if (!file) {
      setUploadedResume(null)
      return
    }
    setUploadedResume({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() })
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading…</div>
  if (error) return <div className="text-sm text-red-600">{error}</div>
  if (!analysis || !analysisId) return <div className="text-sm text-muted-foreground">No analysis available. Generate one first.</div>

  return (
    <ResumeEnhancer
      analysis={analysis}
      templateIds={templates}
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onGoToAnalysis={() => router.push('/job-seeker/analysis')}
      onGenerateTemplate={async (templateId) => {
        const res = await enhanceResume({ analysisId, templateId })
        return res
      }}
      onFetchTemplateHtml={async (templateId) => {
        const res = await getResumeTemplatePreview(templateId)
        return res.html
      }}
      showIntakeFields={false}
    />
  )
}
