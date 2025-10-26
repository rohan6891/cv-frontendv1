// components/jobs/JobsContent.tsx
'use client'

import React, { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, ArrowRight, FileText, Plus, Trash2, Upload } from 'lucide-react'

import AddJobModal from './AddJobModal'
import { getRecruiterApplicants, getRecruiterJobs, type RecruiterApplicant, type RecruiterJob } from '@/lib/recruiter-data'

interface JobsContentProps {
  searchQuery: string
}

export default function JobsContent({ searchQuery }: JobsContentProps) {
  const router = useRouter()
  const [jobs, setJobs] = useState<RecruiterJob[]>(getRecruiterJobs())
  const [showJobModal, setShowJobModal] = useState(false)
  const [showJobApplicants, setShowJobApplicants] = useState(false)
  const [selectedJob, setSelectedJob] = useState<RecruiterJob | null>(null)
  const [applicants, setApplicants] = useState<RecruiterApplicant[]>(getRecruiterApplicants())
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddJob = (newJobData: any) => {
    const newJob: RecruiterJob = {
      id: jobs.length + 1,
      title: newJobData.title || 'Untitled Job',
      department: newJobData.department || 'General',
      location: 'TBD',
      status: 'active',
      description: newJobData.description || '',
      applicants: 0,
      createdDate: new Date().toISOString().split('T')[0],
    }
    setJobs(prev => [...prev, newJob])
  }

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach(file => {
      console.log('Selected/Dropped file:', file.name, file.type)
    })
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragOver(false)
    handleFiles(event.dataTransfer.files)
  }

  const handleDeleteApplicant = (id: number) => {
    setApplicants(prev => prev.filter(applicant => applicant.id !== id))
  }

  const handleDeleteJob = (id: number) => {
    setJobs(prev => prev.filter(job => job.id !== id))
  }

  const filteredJobs = jobs.filter(job => {
    const query = searchQuery.toLowerCase()
    return job.title.toLowerCase().includes(query) || job.department.toLowerCase().includes(query)
  })

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600'
    if (score >= 80) return 'text-foreground'
    return 'text-amber-600'
  }

  const getProgressColor = (score: number) => {
    if (score >= 90) return 'text-emerald-500'
    if (score >= 80) return 'text-foreground'
    return 'text-amber-500'
  }

  const renderApplicants = () => {
    if (!selectedJob) return null

    const jobApplicants = applicants.filter(applicant => applicant.jobId === selectedJob.id)
    const avgScore = jobApplicants.length
      ? Math.round(jobApplicants.reduce((sum, applicant) => sum + applicant.score, 0) / jobApplicants.length)
      : 0

    const filteredApplicants = jobApplicants.filter(applicant => {
      const query = searchQuery.toLowerCase()
      return (
        applicant.name.toLowerCase().includes(query) || applicant.email.toLowerCase().includes(query)
      )
    })

    return (
      <div className="space-y-6">
        <button
          onClick={() => {
            setShowJobApplicants(false)
            setSelectedJob(null)
          }}
          className="flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-muted-foreground"
        >
          <ArrowLeft size={16} /> Back to Jobs
        </button>

        <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
          <h2 className="mb-2 text-2xl font-semibold text-foreground">Applicants for {selectedJob.title}</h2>
          <p className="text-sm text-muted-foreground">
            {selectedJob.department} • {selectedJob.location}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Upload Applicants</h3>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.zip"
                onChange={event => handleFiles(event.target.files)}
                className="hidden"
              />
              <div
                onClick={handleBrowseClick}
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-colors ${
                  isDragOver ? 'border-black bg-muted/40' : 'border-border/60 hover:border-black'
                }`}
              >
                <Upload size={32} className="mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag & drop ZIP file or PDF resumes here</p>
                <p className="mt-1 text-xs text-muted-foreground">or click to browse</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Stats</h3>
              <div className="space-y-3">
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-sm text-muted-foreground">Total Applicants</p>
                  <p className="text-2xl font-semibold text-foreground">{jobApplicants.length}</p>
                </div>
                <div className="rounded-xl bg-muted/40 p-3">
                  <p className="text-sm text-muted-foreground">Avg Score</p>
                  <p className="text-2xl font-semibold text-emerald-600">{avgScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredApplicants.map(applicant => (
            <div
              key={applicant.id}
              className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition-all hover:border-black hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex flex-1 items-start gap-4">
                  <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
                    {applicant.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground">→ {applicant.name}</h3>
                    <p className="text-xs text-muted-foreground">0-{applicant.experience} Years of Experience</p>
                    <p className="text-xs text-muted-foreground">
                      {applicant.location || 'Location not specified'}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">• Available Immediately</p>
                  </div>
                </div>

                <div className="flex flex-shrink-0 flex-col items-center gap-2">
                  <div className="relative h-16 w-16">
                    <svg className="h-16 w-16 -rotate-90 transform" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-border/40"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${(applicant.score / 100) * 282.7} 282.7`}
                        className={`${getProgressColor(applicant.score)} transition-all`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-lg font-bold ${getScoreColor(applicant.score)}`}>
                        {applicant.score}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex max-w-xs flex-shrink-0 flex-wrap gap-2">
                  {applicant.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex flex-shrink-0 gap-2">
                  <button
                    onClick={() => router.push(`/recruiter/resume/${applicant.id}`)}
                    className="flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm font-medium text-foreground transition hover:border-black"
                  >
                    <FileText size={16} /> Resume
                  </button>
                  <button
                    onClick={() => router.push(`/recruiter/analytics/${applicant.id}`)}
                    className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-black/90"
                  >
                    Analytics
                  </button>
                  <button
                    onClick={() => handleDeleteApplicant(applicant.id)}
                    className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredApplicants.length === 0 && (
            <div className="py-12 text-center">
              <p className="font-medium text-muted-foreground">No applicants found</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const renderJobs = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Job Postings</h1>
        <button
          onClick={() => setShowJobModal(true)}
          className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
        >
          <Plus size={20} /> Add Job
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className="rounded-2xl border border-border/60 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="mb-3 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                <p className="text-sm text-muted-foreground">{job.department} • {job.location}</p>
              </div>
              <button
                onClick={() => handleDeleteJob(job.id)}
                className="rounded-lg p-2 text-red-600 transition hover:bg-red-100"
              >
                <Trash2 size={16} />
              </button>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">{job.description}</p>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-foreground">
                {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
              </span>
              <button
                onClick={() => {
                  setSelectedJob(job)
                  setShowJobApplicants(true)
                }}
                className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
              >
                View Applicants ({job.applicants}) <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <div className="rounded-2xl border border-border/60 bg-white p-12 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">No job postings match your search</p>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <>
      {showJobApplicants ? renderApplicants() : renderJobs()}

      <AddJobModal
        isOpen={showJobModal}
        onClose={() => setShowJobModal(false)}
        onAddJob={handleAddJob}
      />
    </>
  )
}