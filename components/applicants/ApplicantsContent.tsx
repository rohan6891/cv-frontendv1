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
    <div className="p-8 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">All Applicants</h1>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Filter size={20} className="text-gray-600 dark:text-gray-400" />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Filter by Score</label>
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Scores</option>
              <option value="high">High (85+)</option>
              <option value="medium">Medium (70-84)</option>
              <option value="low">Low (&lt;70)</option>
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Filter by Location</label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Role (Next Opportunity)</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Location</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Experience</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredApplicants.map(app => (
                <tr key={app.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{app.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900 dark:text-white font-medium">{app.nextOpportunity || 'Not specified'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${
                        app.score >= 85 ? 'text-green-600' : app.score >= 70 ? 'text-blue-600' : 'text-yellow-600'
                      }`}>
                        {app.score}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{app.location || 'N/A'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{app.experience} years</p>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteApplicant(app.id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-red-600 transition-colors"
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
            <p className="text-gray-600 dark:text-gray-400 font-medium">No applicants found</p>
          </div>
        )}
      </div>
    </div>
  )
}