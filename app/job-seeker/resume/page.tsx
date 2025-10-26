'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { ResumeEnhancer } from '@/components/job-seeker/resume-enhancer'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { analysisReport, resumeTemplates } from '@/lib/job-seeker-data'

export default function ResumePage() {
  const [uploadedResume, setUploadedResume] = useState<UploadedResumeMeta | null>(null)
  const router = useRouter()

  const handleUploadResume = (file: File | null) => {
    if (!file) {
      setUploadedResume(null)
      return
    }
    setUploadedResume({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() })
  }

  return (
    <ResumeEnhancer
      analysis={analysisReport}
      templates={resumeTemplates}
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onGoToAnalysis={() => router.push('/job-seeker/analysis')}
    />
  )
}
