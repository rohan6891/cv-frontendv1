'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { InterviewPrep } from '@/components/job-seeker/interview-prep'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { analysisReport } from '@/lib/job-seeker-data'

export default function InterviewPage() {
  const router = useRouter()
  const [uploadedResume, setUploadedResume] = useState<UploadedResumeMeta | null>(null)

  const handleUploadResume = (file: File | null) => {
    if (!file) {
      setUploadedResume(null)
      return
    }
    setUploadedResume({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() })
  }

  return (
    <InterviewPrep
      analysis={analysisReport}
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onBackToAnalysis={() => router.push('/job-seeker/analysis')}
      onGoToResume={() => router.push('/job-seeker/resume')}
    />
  )
}
