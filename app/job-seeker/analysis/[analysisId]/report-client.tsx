'use client'

import { useRouter } from 'next/navigation'

import { AnalysisReport, type AnalysisMetadata } from '@/components/job-seeker/analysis-report'
import { analysisReport, analysisTemplateMock } from '@/lib/job-seeker-data'

export default function AnalysisReportClient({ metadata }: { metadata: AnalysisMetadata }) {
  const router = useRouter()

  return (
    <AnalysisReport
      analysis={analysisReport}
      template={analysisTemplateMock}
      metadata={metadata}
      onBack={() => router.push('/job-seeker/analysis')}
      onGoToInterview={() => router.push('/job-seeker/interview')}
      onGoToResume={() => router.push('/job-seeker/resume')}
    />
  )
}
