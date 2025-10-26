'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { HistoryList } from '@/components/job-seeker/history-list'
import { listHistory } from '@/lib/job-seeker-api'

export default function HistoryPage() {
  const router = useRouter()
  const [entries, setEntries] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const res = await listHistory()
        if (!mounted) return
        setEntries(res.items || [])
      } catch (e: any) {
        setError(e?.message || 'Failed to load history')
      } finally {
        setLoading(false)
      }
    })()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div className="text-sm text-muted-foreground">Loading history…</div>
  if (error) return <div className="text-sm text-red-600">{error}</div>

  return (
    <HistoryList
      entries={entries as any}
      onOpenAnalysis={(historyId) => router.push(`/job-seeker/analysis/${historyId}`)}
      onOpenInterview={() => router.push('/job-seeker/interview')}
      onOpenResume={() => router.push('/job-seeker/resume')}
    />
  )
}
