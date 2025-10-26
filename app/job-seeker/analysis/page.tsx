'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AnalysisUpload } from '@/components/job-seeker/analysis-upload'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { defaultAnalysisId } from '@/lib/job-seeker-data'

export default function AnalysisPage() {
  const [uploadedResume, setUploadedResume] = useState<UploadedResumeMeta | null>(null)
  const router = useRouter()

  const handleUploadResume = (file: File | null) => {
    if (!file) {
      setUploadedResume(null)
      return
    }
    setUploadedResume({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() })
  }

  const goToDashboard = () => router.push('/job-seeker/dashboard')
  const goToLatestAnalysis = () => router.push(`/job-seeker/analysis/${defaultAnalysisId}`)

  const handleGenerateAnalysis = () => {
    const generatedId = `analysis-${Date.now()}`
    router.push(`/job-seeker/analysis/${generatedId}`)
  }

  return (
    <AnalysisUpload
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onBackToDashboard={goToDashboard}
      onViewExistingAnalysis={goToLatestAnalysis}
      onGenerateAnalysis={handleGenerateAnalysis}
    />
  )
}
