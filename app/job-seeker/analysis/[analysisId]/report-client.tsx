'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AnalysisReport, type AnalysisMetadata } from '@/components/job-seeker/analysis-report'
import { getAnalysis } from '@/lib/job-seeker-api'

export default function AnalysisReportClient({ metadata }: { metadata: AnalysisMetadata }) {
  const router = useRouter()
  const [analysis, setAnalysis] = useState<any | null>(null)
  const [template, setTemplate] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await getAnalysis(metadata.id)
        if (!mounted) return
        setAnalysis(res.analysis)
        setTemplate(res.template)
      } catch (e: any) {
        setError(e?.message || 'Failed to load analysis')
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [metadata.id])

  if (loading) return <div className="text-sm text-muted-foreground">Loading analysis…</div>
  if (error) return <div className="text-sm text-red-600">{error}</div>
  if (!analysis || !template) return <div className="text-sm text-muted-foreground">No analysis found.</div>

  return (
    <AnalysisReport
      analysis={analysis}
      template={template}
      metadata={metadata}
      onBack={() => router.push('/job-seeker/analysis')}
      onGoToInterview={() => router.push('/job-seeker/interview')}
      onGoToResume={() => router.push('/job-seeker/resume')}
    />
  )
}
