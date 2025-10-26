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
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Job</h2>
            <button onClick={onClose} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
              <X size={20} />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex mt-4 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === 'url'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
              }`}
            >
              <Globe size={16} className="inline mr-2" />
              Fetch from URL
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`flex-1 py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === 'manual'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700'
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
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleFetchUrl}
                disabled={!url.trim() || isExtracting}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
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
                className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
              {isExtracting && <p className="text-sm text-blue-600">Extracting fields...</p>}
              {/* Optional: Show extracted preview */}
              {formData.title && (
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
                  <p><strong>Extracted Title:</strong> {formData.title}</p>
                  <p><strong>Department:</strong> {formData.department}</p>
                  <p><strong>Location:</strong> {formData.location}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add Job
          </button>
        </div>
      </div>
    </div>
  )
}