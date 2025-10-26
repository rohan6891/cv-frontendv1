import { Suspense } from 'react'

import type { AnalysisMetadata } from '@/components/job-seeker/analysis-report'
import { analysisReport, findAnalysisMetadataById } from '@/lib/job-seeker-data'

import AnalysisReportClient from './report-client'

export const dynamic = 'force-dynamic'

export default function AnalysisDetailsPage({ params }: { params: { analysisId: string } }) {
  const metadata = buildMetadata(params.analysisId)

  return (
    <Suspense fallback={<div className="text-sm text-muted-foreground">Loading analysis…</div>}>
      <AnalysisReportClient metadata={metadata} />
    </Suspense>
  )
}

function buildMetadata(analysisId: string): AnalysisMetadata {
  const lookup = findAnalysisMetadataById(analysisId)
  if (lookup) {
    return lookup
  }

  return {
    id: analysisId,
    role: analysisReport.candidate.targetRole,
    company: analysisReport.candidate.targetCompany,
    summary: 'Generated analysis ready for review. Persisted data will appear here once the backend stores the report.',
    updatedAt: new Date().toLocaleString(),
    matchScore: Math.round(analysisReport.metrics.jobMatchScore * 100),
  }
}

