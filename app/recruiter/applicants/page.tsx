// app/applicants/page.tsx
'use client'

import React, { useState } from 'react'
import { Search, Moon, Sun } from 'lucide-react'
import ApplicantsContent from '../../../components/applicants/ApplicantsContent'

export default function ApplicantsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 ${darkMode ? 'dark' : ''}`}>
      {/* Topbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search applicants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ml-8"
        >
          {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
        </button>
      </div>

      {/* Content */}
      <ApplicantsContent searchQuery={searchQuery} />
    </div>
  )
}