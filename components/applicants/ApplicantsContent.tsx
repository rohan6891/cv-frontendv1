// components/applicants/ApplicantsContent.tsx
'use client'

import React, { useState } from 'react'
import { Trash2, Filter } from 'lucide-react'

interface Applicant {
  id: number;
  name: string;
  jobId: number;
  score: number;
  email: string;
  skills: string[];
  experience: number;
  location?: string;
  certifications?: string[];
  nextOpportunity?: string;
}

interface ApplicantsContentProps {
  searchQuery?: string
}

const mockApplicants: Applicant[] = [
  { 
    id: 1, 
    name: 'Emma Davis', 
    jobId: 1, 
    score: 80, 
    email: 'emma@example.com', 
    skills: ['Product Strategy', 'Data Analysis', 'UI Design'], 
    experience: 1,
    location: 'New Delhi, India',
    certifications: ['Product Designer 2'],
    nextOpportunity: 'Senior Designer'
  },
  { 
    id: 2, 
    name: 'Sarah Johnson', 
    jobId: 1, 
    score: 92, 
    email: 'sarah@example.com', 
    skills: ['React', 'TypeScript', 'Node.js'], 
    experience: 5,
    location: 'San Francisco, CA',
    certifications: ['React Certification'],
    nextOpportunity: 'Tech Lead'
  },
  { 
    id: 3, 
    name: 'Mike Chen', 
    jobId: 1, 
    score: 85, 
    email: 'mike@example.com', 
    skills: ['React', 'Python', 'UI Design'], 
    experience: 3,
    location: 'New York, NY',
    nextOpportunity: 'Senior Developer'
  },
  { 
    id: 4, 
    name: 'Alex Rodriguez', 
    jobId: 1, 
    score: 88, 
    email: 'alex@example.com', 
    skills: ['React', 'Vue', 'Angular'], 
    experience: 6,
    location: 'Austin, TX',
    nextOpportunity: 'Engineering Manager'
  },
]

export default function ApplicantsContent({ searchQuery = '' }: ApplicantsContentProps) {
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants)
  const [scoreFilter, setScoreFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')

  const handleDeleteApplicant = (id: number) => {
    setApplicants(applicants.filter(a => a.id !== id))
  }

  // Get unique locations
  const uniqueLocations = Array.from(new Set(applicants.map(a => a.location).filter(Boolean)))

  // Apply filters
  let filteredApplicants = applicants

  if (scoreFilter !== 'all') {
    if (scoreFilter === 'high') filteredApplicants = filteredApplicants.filter(a => a.score >= 85)
    else if (scoreFilter === 'medium') filteredApplicants = filteredApplicants.filter(a => a.score >= 70 && a.score < 85)
    else if (scoreFilter === 'low') filteredApplicants = filteredApplicants.filter(a => a.score < 70)
  }

  if (locationFilter !== 'all') {
    filteredApplicants = filteredApplicants.filter(a => a.location === locationFilter)
  }

  filteredApplicants = filteredApplicants.filter(app =>
    app.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
    app.email.toLowerCase().includes((searchQuery || '').toLowerCase())
  )

  return (
  <div className="space-y-6">
      <h1 className="mb-8 text-3xl font-semibold text-foreground">All Applicants</h1>

      {/* Filters */}
      <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Filter size={20} className="text-muted-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Filter */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-muted-foreground">Filter by Score</label>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="w-full rounded-lg border border-border/60 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Scores</option>
              <option value="high">High (85+)</option>
              <option value="medium">Medium (70-84)</option>
              <option value="low">Low (&lt;70)</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-muted-foreground">Filter by Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full rounded-lg border border-border/60 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Applicants List */}
      <div className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/60 bg-muted/40">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Role (Next Opportunity)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Experience</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredApplicants.map(app => (
                <tr key={app.id} className="transition-colors hover:bg-muted/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-foreground">{app.nextOpportunity || 'Not specified'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${
                        app.score >= 85 ? 'text-emerald-600' : app.score >= 70 ? 'text-foreground' : 'text-amber-600'
                      }`}>
                        {app.score}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{app.location || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-muted-foreground">{app.experience} years</p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteApplicant(app.id)}
                      className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredApplicants.length === 0 && (
          <div className="text-center py-12">
            <p className="font-medium text-muted-foreground">No applicants found</p>
          </div>
        )}
      </div>
    </div>
  )
}