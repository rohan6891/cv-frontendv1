// components/jobs/JobsContent.tsx
'use client'

import React, { useState, useRef } from 'react'
import { Plus, Trash2, ArrowRight, Upload, FileText, Eye } from 'lucide-react'
import AddJobModal from './AddJobModal'
import ResumeAnalyticsView from '../resume/ResumeAnalyticsView'

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  status: 'active' | 'inactive' | 'paused';
  description: string;
  applicants: number;
  createdDate: string;
}

interface AnalysisOverall {
  overall_match_score: number;
  skills_match: number;
  experience_match: number;
  education_match: number;
  certifications_match: number;
  missing_skills_count: number;
  ats_score: number;
}

interface AnalysisTemplate {
  overall_analysis: AnalysisOverall;
  // allow optional additional fields so mocks don't need to include everything
  charts?: any;
  profile_highlights?: string[];
  improvement_suggestions?: string[];
}

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
  analysis?: AnalysisTemplate;
}

interface JobsContentProps {
  searchQuery: string
}

const mockJobs: Job[] = [
  { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'San Francisco', status: 'active', description: 'Build scalable UIs', applicants: 4, createdDate: '2024-01-15' },
  { id: 2, title: 'Product Manager', department: 'Product', location: 'New York', status: 'active', description: 'Lead product strategy', applicants: 1, createdDate: '2024-01-10' },
]

const mockApplicants: Applicant[] = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    jobId: 1, 
    score: 92, 
    email: 'sarah@example.com', 
    skills: ['React', 'TypeScript', 'Node.js'], 
    experience: 5, 
    location: 'San Francisco, CA', 
    certifications: ['React Certification'], 
    nextOpportunity: 'Tech Lead',
    analysis: { 
      overall_analysis: {
        overall_match_score: 92,
        skills_match: 95,
        experience_match: 90,
        education_match: 85,
        certifications_match: 90,
        missing_skills_count: 1,
        ats_score: 94,
      }
    }
  },
  { 
    id: 2, 
    name: 'Mike Chen', 
    jobId: 1, 
    score: 85, 
    email: 'mike@example.com', 
    skills: ['React', 'Python', 'UI Design'], 
    experience: 3, 
    location: 'New York, NY', 
    nextOpportunity: 'Senior Developer',
    analysis: {
      overall_analysis: {
        overall_match_score: 85,
        skills_match: 80,
        experience_match: 75,
        education_match: 80,
        certifications_match: 70,
        missing_skills_count: 3,
        ats_score: 82,
      },
    }
  },
  { 
    id: 3, 
    name: 'Emma Davis', 
    jobId: 2, 
    score: 78, 
    email: 'emma@example.com', 
    skills: ['Product Strategy', 'Data Analysis', 'UI Design'], 
    experience: 1, 
    location: 'New Delhi, India', 
    certifications: ['Product Designer 2'], 
    nextOpportunity: 'Senior Designer',
    analysis: {
      overall_analysis: {
        overall_match_score: 78,
        skills_match: 85,
        experience_match: 60,
        education_match: 90,
        certifications_match: 80,
        missing_skills_count: 2,
        ats_score: 75,
      },
    }
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
    nextOpportunity: 'Engineering Manager',
    analysis: {
      overall_analysis: {
        overall_match_score: 88,
        skills_match: 90,
        experience_match: 95,
        education_match: 70,
        certifications_match: 85,
        missing_skills_count: 1,
        ats_score: 89,
      },
    }
  },
]

export default function JobsContent({ searchQuery }: JobsContentProps) {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [showJobModal, setShowJobModal] = useState(false)
  const [showJobApplicants, setShowJobApplicants] = useState(false)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>(mockApplicants)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [showResumeAnalytics, setShowResumeAnalytics] = useState(false)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddJob = (newJobData: any) => {
    const newJob: Job = {
      id: jobs.length + 1,
      title: newJobData.title || 'Untitled Job',
      department: newJobData.department || 'General',
      location: 'TBD',
      status: 'active' as const,
      description: newJobData.description || '',
      applicants: 0,
      createdDate: new Date().toISOString().split('T')[0],
    }
    setJobs([...jobs, newJob])
  }

  const handleFiles = (files: FileList | null) => {
    if (files) {
      Array.from(files).forEach(file => {
        console.log('Selected/Dropped file:', file.name, file.type)
      })
    }
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragOver(false)
    handleFiles(e.dataTransfer.files)
  }

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    return 'text-yellow-600'
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'bg-green-600'
    if (score >= 80) return 'bg-blue-600'
    return 'bg-yellow-600'
  }

  const handleDeleteApplicant = (id: number) => {
    setApplicants(applicants.filter(a => a.id !== id))
    if (selectedApplicant?.id === id) {
      setSelectedApplicant(null)
    }
  }

  const jobApplicantsView = selectedJob ? (() => {
    const jobApplicants = applicants.filter(a => a.jobId === selectedJob.id)
    const avgScore = jobApplicants.length > 0 
      ? Math.round(jobApplicants.reduce((sum, a) => sum + a.score, 0) / jobApplicants.length)
      : 0

    const filteredApplicants = jobApplicants.filter(app =>
      app.name.toLowerCase().includes((searchQuery || '').toLowerCase()) ||
      app.email.toLowerCase().includes((searchQuery || '').toLowerCase())
    )

    return (
      <div className="p-8 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <button
          onClick={() => {
            setShowJobApplicants(false)
            setSelectedApplicant(null)
          }}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 mb-4"
        >
          ← Back to Jobs
        </button>

        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Applicants for {selectedJob.title}</h2>
          <p className="text-gray-600 dark:text-gray-400">{selectedJob.department} • {selectedJob.location}</p>
        </div>

        {/* Upload Section and Quick Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upload Applicants</h3>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.zip"
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />
              <div
                onClick={handleBrowseClick}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-500'
                }`}
              >
                <Upload size={32} className="mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600 dark:text-gray-400">Drag & drop ZIP file or PDF resumes here</p>
                <p className="text-sm text-gray-500 mt-1">or click to browse</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Applicants</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{jobApplicants.length}</p>
                </div>
                <div className="p-3 bg-green-50 dark:bg-green-900 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{avgScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Applicants List - Full Width */}
        <div className="space-y-4">
          {filteredApplicants.map(app => (
            <div 
              key={app.id}
              className="bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all hover:border-blue-500"
            >
              <div className="flex items-start justify-between gap-6">
                {/* Avatar and Info */}
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {app.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 dark:text-white text-lg">→ {app.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">0-{app.experience} Years of Experience</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{app.location || 'Location not specified'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">• Available Immediately</p>
                  </div>
                </div>

                {/* Score Circle */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${(app.score / 100) * 282.7} 282.7`}
                        className={`${getProgressColor(app.score)} transition-all`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${getScoreColor(app.score)}`}>{app.score}%</span>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 flex-shrink-0 max-w-xs">
                  {app.skills.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full font-medium">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button 
                    onClick={() => {
                      console.log('Resume button clicked for:', app.name)
                      setSelectedApplicant(app)
                      setShowResumeAnalytics(true)
                    }}
                    className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm font-medium flex items-center gap-2">
                    <FileText size={16} /> Resume
                  </button>
                  <button 
                    onClick={() => {
                      console.log('Analytics button clicked for:', app.name)
                      setSelectedApplicant(app)
                      setShowResumeAnalytics(true)
                    }}
                    className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm font-medium">
                    Analytics
                  </button>
                  <button
                    onClick={() => handleDeleteApplicant(app.id)}
                    className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-red-600 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredApplicants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 font-medium">No applicants found</p>
            </div>
          )}
        </div>
      </div>
    )
  })() : null

  const jobsView = (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Job Postings</h1>
        <button 
          onClick={() => setShowJobModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} /> Add Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map(job => (
          <div key={job.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg">{job.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{job.department} • {job.location}</p>
              </div>
              <button 
                onClick={() => setJobs(jobs.filter(j => j.id !== job.id))}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">{job.description}</p>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
              <button
                onClick={() => {
                  setSelectedJob(job)
                  setShowJobApplicants(true)
                  setSelectedApplicant(null)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-800 transition-colors"
              >
                View Applicants ({job.applicants}) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <>
      {showJobApplicants ? jobApplicantsView : jobsView}
      
      <AddJobModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        onAddJob={handleAddJob}
      />

      {/* Resume Analytics Modal */}
      {showResumeAnalytics && selectedApplicant && (
        <ResumeAnalyticsView
          applicant={selectedApplicant as any}
          onClose={() => {
            setShowResumeAnalytics(false)
            setSelectedApplicant(null)
          }}
        />
      )}
    </>
  )
}