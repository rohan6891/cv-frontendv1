'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { AnalysisUpload } from '@/components/job-seeker/analysis-upload'
import type { UploadedResumeMeta } from '@/lib/job-seeker-data'
import { defaultAnalysisId } from '@/lib/job-seeker-data'
import { generateAnalysis } from '@/lib/job-seeker-api'

export default function AnalysisPage() {
  const [uploadedResume, setUploadedResume] = useState<UploadedResumeMeta | null>(null)
  const [lastFile, setLastFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUploadResume = (file: File | null) => {
    if (!file) {
      setUploadedResume(null)
      setLastFile(null)
      return
    }
    setUploadedResume({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() })
    setLastFile(file)
  }

  const goToDashboard = () => router.push('/job-seeker/dashboard')
  const goToLatestAnalysis = () => router.push(`/job-seeker/analysis/${defaultAnalysisId}`)

  const handleGenerateAnalysis = async (jobLink: string) => {
    try {
      if (!lastFile) throw new Error('Please upload a resume file first.')
      if (!jobLink) throw new Error('Please provide a job description link.')
      setLoading(true)
      const res = await generateAnalysis({ jobUrl: jobLink, file: lastFile })
      router.push(`/job-seeker/analysis/${res.id}`)
    } catch (e: any) {
      alert(e?.message || 'Failed to generate analysis')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnalysisUpload
      uploadedResume={uploadedResume}
      onUploadResume={handleUploadResume}
      onBackToDashboard={goToDashboard}
      onViewExistingAnalysis={goToLatestAnalysis}
      onGenerateAnalysis={handleGenerateAnalysis}
      loading={loading}
    />
  )
}
