// components/dashboard/DashboardContent.tsx
'use client'

import React, { useState, useEffect } from 'react'

// Mock data - replace with your state management (e.g., Zustand, Redux, or props from provider)
const mockJobs = [
  { id: 1, title: 'Senior React Developer', applicants: 4 },
  { id: 2, title: 'Product Manager', applicants: 1 },
]

const mockApplicants = [
  { id: 1, name: 'Sarah Johnson', jobId: 1, score: 92 },
  { id: 2, name: 'Mike Chen', jobId: 1, score: 85 },
  { id: 3, name: 'Emma Davis', jobId: 2, score: 78 },
  { id: 4, name: 'Alex Rodriguez', jobId: 1, score: 88 },
]

export default function DashboardContent({ searchQuery }: { searchQuery: string }) {
  const [stats, setStats] = useState({
    totalApplicants: 0,
    avgScore: 0,
    activeJobs: 0,
  })
  const [applicants, setApplicants] = useState(mockApplicants)
  const [jobs, setJobs] = useState(mockJobs)

  useEffect(() => {
    const totalApplicants = applicants.length
    const avgScore = totalApplicants > 0 ? Math.round(applicants.reduce((sum, app) => sum + app.score, 0) / totalApplicants) : 0
    const activeJobs = jobs.length

    setStats({ totalApplicants, avgScore, activeJobs })
  }, [applicants, jobs])

  const filteredApplicants = applicants
    .filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)

  return (
  <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { label: 'Total Applicants', value: stats.totalApplicants },
          { label: 'Average Score', value: `${stats.avgScore}%` },
          { label: 'Active Jobs', value: stats.activeJobs },
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-foreground">Top Applicants</h2>
        <div className="space-y-3">
          {filteredApplicants.map(app => {
            const job = jobs.find(j => j.id === app.jobId)
            return (
              <div key={app.id} className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/40 p-4">
                <div>
                  <p className="font-medium text-foreground">{app.name}</p>
                  <p className="text-sm text-muted-foreground">{job?.title}</p>
                </div>
                <div
                  className={`text-lg font-semibold ${
                    app.score >= 90 ? 'text-emerald-600' : app.score >= 80 ? 'text-foreground' : 'text-amber-600'
                  }`}
                >
                  {app.score}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}