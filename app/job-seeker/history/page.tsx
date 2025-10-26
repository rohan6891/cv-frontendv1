'use client'

import { useRouter } from 'next/navigation'

import { HistoryList } from '@/components/job-seeker/history-list'
import { resumeHistory } from '@/lib/job-seeker-data'

export default function HistoryPage() {
  const router = useRouter()

  return (
    <HistoryList
      entries={resumeHistory}
      onOpenAnalysis={(historyId) => router.push(`/job-seeker/analysis/${historyId}`)}
      onOpenInterview={() => router.push('/job-seeker/interview')}
      onOpenResume={() => router.push('/job-seeker/resume')}
    />
  )
}
