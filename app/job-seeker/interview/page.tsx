'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { InterviewPrep } from '@/components/job-seeker/interview-prep'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { generateInterviewPack, getLatestAnalysis } from '@/lib/job-seeker-api'

export default function InterviewPage() {
  const router = useRouter()
  const [uploadedResume, setUploadedResume] = useState<UploadedResumeMeta | null>(null)
  const [analysis, setAnalysis] = useState<any | null>(null)
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
  const latest = await getLatestAnalysis()
        if (!mounted) return
  setAnalysis(latest.analysis)
  setAnalysisId(latest.metadata?.id || null)
      } catch (e: any) {
        setError(e?.message || 'Failed to load analysis')
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
  if (!analysis) return <div className="text-sm text-muted-foreground">No analysis available. Generate one first.</div>

  return (
    <InterviewPrep
      analysis={analysis}
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onBackToAnalysis={() => router.push('/job-seeker/analysis')}
      onGoToResume={() => router.push('/job-seeker/resume')}
      onGenerateQuestions={analysisId ? async ({ interviewType, count }) => {
        const res = await generateInterviewPack({ analysisId, interviewType, count })
        return res.items
      } : undefined}
    />
  )
}
