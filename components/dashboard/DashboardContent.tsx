// components/dashboard/DashboardContent.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { Briefcase, Users } from 'lucide-react'

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
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Applicants', value: stats.totalApplicants, color: 'blue' },
          { label: 'Average Score', value: `${stats.avgScore}%`, color: 'green' },
          { label: 'Active Jobs', value: stats.activeJobs, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{stat.label}</p>
                <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Top Applicants</h2>
        <div className="space-y-3">
          {filteredApplicants.map(app => {
            const job = jobs.find(j => j.id === app.jobId)
            return (
              <div key={app.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{app.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{job?.title}</p>
                </div>
                <div className={`text-lg font-bold ${app.score >= 90 ? 'text-green-600' : app.score >= 80 ? 'text-blue-600' : 'text-yellow-600'}`}>
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