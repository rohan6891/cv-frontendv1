'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { X, UploadCloud, Globe } from 'lucide-react'

// Types matching JobsContent
interface JobData {
  title: string;
  department: string;
  location: string;
  description: string;
  employment_type?: string;
  work_mode?: string;
  experience_required?: string;
  salary_range?: string;
  must_have_skills?: string[];
  nice_to_have_skills?: string[];
  responsibilities?: string[];
}

interface AddJobModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddJob: (data: JobData) => void;
}

export default function AddJobModal({ isOpen, onClose, onAddJob }: AddJobModalProps) {
  const [activeTab, setActiveTab] = useState<'url' | 'manual'>('manual')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('') // Explicit string init
  const [formData, setFormData] = useState<JobData>({
    title: '',
    department: '',
    location: '',
    description: '',
  })
  const [isExtracting, setIsExtracting] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Debounced extraction for Manual mode
  useEffect(() => {
    const timer = setTimeout(() => {
      // Null-safe check: Ensure description is a string before trimming
      if (description?.trim() && activeTab === 'manual') {
        extractFromDescription(description)
      }
    }, 500) // Debounce 500ms

    return () => clearTimeout(timer)
  }, [description, activeTab])

  // Simple regex-based extraction (improve with Grok API)
  const extractFromDescription = useCallback(async (text: string | undefined) => {
    // Guard clause: Skip if text is undefined or empty
    if (!text || typeof text !== 'string') {
      console.warn('Extraction skipped: Invalid text input')
      setIsExtracting(false)
      return
    }

    setIsExtracting(true)
    try {
      // Basic patterns - customize as needed
      const titleMatch = text.match(/^(?:Position|Job|Role):\s*(.+?)(?:\n|$)/i) || text.match(/^[A-Z][a-zA-Z\s]+(?:Engineer|Developer|Manager)/)
      const deptMatch = text.match(/(Engineering|Product|Marketing|Sales|Design|HR)/i)
      const locMatch = text.match(/(San Francisco|New York|Remote|([A-Z][a-z]+,\s*[A-Z]{2}))/i)
      const expMatch = text.match(/(\d+)\s*years?/i)
      const salaryMatch = text.match(/\$(\d+(?:,\d+)?)\s*-\s*\$(\d+(?:,\d+)?)/i)

      const extracted: Partial<JobData> = {
        title: titleMatch ? titleMatch[1].trim() : 'Untitled Position',
        department: deptMatch ? deptMatch[1] : 'General',
        location: locMatch ? (locMatch[1] || locMatch[0]) : 'Remote',
        experience_required: expMatch ? `${expMatch[1]} years` : undefined,
        salary_range: salaryMatch ? `$${salaryMatch[1]}-${salaryMatch[2]}` : undefined,
        // Skills/Responsibilities: Split by bullets or keywords (simplified)
        must_have_skills: text.match(/•\s*([A-Za-z\s]+)/g)?.map(m => m.replace(/•\s*/, '').trim()) || [],
        responsibilities: text.split('\n').filter(line => line.includes('include') || line.includes('responsible')).slice(0, 3),
      }

      setFormData(prev => ({ ...prev, ...extracted, description: text }))
      setIsValid(!!(extracted.title && text.trim()))
    } catch (error) {
      console.error('Extraction failed:', error)
      setFormData(prev => ({ ...prev, description: text }))
      setIsValid(!!text.trim())
    } finally {
      setIsExtracting(false)
    }
  }, [])

  // Fetch and extract from URL (basic implementation)
  const handleFetchUrl = async () => {
    if (!url.trim()) return
    setIsExtracting(true)
    try {
      const response = await fetch(url)
      const html = await response.text()
      // Simple extraction from HTML (e.g., meta tags, h1). For real jobs sites, use cheerio or API.
      const parser = new DOMParser()
      const doc = parser.parseFromString(html, 'text/html')
      const title = doc.querySelector('title')?.textContent || doc.querySelector('h1')?.textContent || ''
      const desc = doc.querySelector('[name="description"]')?.getAttribute('content') || Array.from(doc.querySelectorAll('p')).slice(0, 5).map(p => p.textContent).join('\n')
      
      setDescription(desc)
      await extractFromDescription(desc) // Trigger extraction
      setUrl('') // Clear after success
    } catch (error) {
      console.error('URL fetch failed:', error)
      alert('Failed to fetch job posting. Please check the URL.')
    } finally {
      setIsExtracting(false)
    }
  }

  // AI Extraction Placeholder (integrate Grok API)
  const extractWithAI = async (text: string) => {
    // TODO: Call xAI Grok API (see https://x.ai/api)
    // Example payload: { prompt: `Extract job title, department, location, skills from: ${text}` }
    // For now, fallback to regex
    console.log('Integrate Grok API here for better extraction')
    return extractFromDescription(text)
  }

  const handleSubmit = () => {
    if (isValid && formData.title && formData.description) {
      onAddJob(formData)
      onClose()
      setDescription('')
      setFormData({ title: '', department: '', location: '', description: '' })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-h-[90vh] max-w-md overflow-y-auto rounded-2xl border border-border/60 bg-white shadow-xl">
        <div className="border-b border-border/60 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Add New Job</h2>
            <button onClick={onClose} className="rounded p-1 transition hover:bg-muted">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-4 flex border-b border-border/60">
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === 'url'
                  ? 'border-black text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Globe size={16} className="inline mr-2" />
              Fetch from URL
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === 'manual'
                  ? 'border-black text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <UploadCloud size={16} className="inline mr-2" />
              Manual Entry
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'url' ? (
            <div className="space-y-4">
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste job posting URL (e.g., linkedin.com/job/123)"
                className="w-full rounded-lg border border-border/60 p-3 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button
                onClick={handleFetchUrl}
                disabled={!url.trim() || isExtracting}
                className="w-full rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-muted"
              >
                {isExtracting ? 'Extracting...' : 'Fetch & Extract'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value || '')} // Ensure string
                placeholder="Paste the complete job posting description. Other fields will auto-extract if possible."
                className="h-32 w-full resize-none rounded-lg border border-border/60 p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              {isExtracting && <p className="text-sm text-muted-foreground">Extracting fields...</p>}
              {/* Optional: Show extracted preview */}
              {formData.title && (
                <div className="rounded-lg border border-border/40 bg-muted/40 p-3 text-sm">
                  <p><strong>Extracted Title:</strong> {formData.title}</p>
                  <p><strong>Department:</strong> {formData.department}</p>
                  <p><strong>Location:</strong> {formData.location}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 border-t border-border/60 p-6">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-muted"
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  )
}