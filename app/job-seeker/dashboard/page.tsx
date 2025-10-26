'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { DashboardOverview } from '@/components/job-seeker/dashboard-overview'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { defaultAnalysisId } from '@/lib/job-seeker-data'
import { getLatestAnalysis, listAnalyses, listHistory } from '@/lib/job-seeker-api'
import { me } from '@/lib/api'

type UploadState = UploadedResumeMeta | null

export default function DashboardPage() {
  const [uploadedResume, setUploadedResume] = useState<UploadState>(null)
  const [analysis, setAnalysis] = useState<any | null>(null)
  const [recent, setRecent] = useState<any[]>([])
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        const [latest, recentList, hist, user] = await Promise.all([
          getLatestAnalysis(),
          listAnalyses(),
          listHistory(),
          token ? me(token) : Promise.resolve(null),
        ])
        if (!mounted) return
        setAnalysis(latest.analysis)
        setRecent(recentList.items || [])
        setHistory(hist.items || [])
        if (user && typeof user === 'object') {
          const name = (user as any).full_name || null
          setUserName(name)
        }
      } catch (e: any) {
        setError(e?.message || 'Failed to load dashboard data')
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

  const handleOpenAnalysis = (analysisId: string) => {
    router.push(`/job-seeker/analysis/${analysisId}`)
  }

  if (loading) return <div className="text-sm text-muted-foreground">Loading dashboard…</div>
  if (error) return <div className="text-sm text-red-600">{error}</div>

  return (
    <DashboardOverview
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onOpenAnalysis={(id) => handleOpenAnalysis(id || defaultAnalysisId)}
      analysis={analysis}
      recentAnalyses={recent}
      resumeHistory={history}
      userName={userName}
    />
  )
}
