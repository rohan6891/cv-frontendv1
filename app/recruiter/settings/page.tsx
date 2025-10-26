'use client'

import React, { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import SettingsContent from '../../../components/settings/SettingsContent'

// Inline interface for props (if needed; SettingsContent has no props here)
interface SettingsContentProps {
  // No props needed, but placeholder for future
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 ${darkMode ? 'dark' : ''}`}>
      {/* Topbar */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex-1" /> {/* Empty left side for settings */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {darkMode ? <Sun size={20} className="text-yellow-500" /> : <Moon size={20} />}
        </button>
      </div>

      {/* Content */}
      <SettingsContent />
    </div>
  )
}