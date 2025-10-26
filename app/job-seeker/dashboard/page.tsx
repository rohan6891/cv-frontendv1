'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { DashboardOverview } from '@/components/job-seeker/dashboard-overview'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { defaultAnalysisId } from '@/lib/job-seeker-data'

type UploadState = UploadedResumeMeta | null

export default function DashboardPage() {
  const [uploadedResume, setUploadedResume] = useState<UploadState>(null)
  const router = useRouter()

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

  return (
    <DashboardOverview
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onOpenAnalysis={(id) => handleOpenAnalysis(id || defaultAnalysisId)}
    />
  )
}
