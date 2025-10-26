'use client'

import React from 'react'

// No mock data or complex types needed here, but inline interface for props (empty for now)
interface SettingsContentProps {
  // Placeholder for future props
}

export default function SettingsContent({}: SettingsContentProps) {
  // Form state (basic, can expand with useState if needed for real form handling)
  const [name, setName] = React.useState('Sarah Johnson')
  const [email, setEmail] = React.useState('sarah@recruiter.com')
  const [emailNotifications, setEmailNotifications] = React.useState(true)
  const [weeklySummary, setWeeklySummary] = React.useState(true)

  const handleSave = () => {
    console.log('Saved settings:', { name, email, emailNotifications, weeklySummary })
    // In real app, call API here
  }

  return (
    <div className="p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Settings</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6">
          {/* Account Settings Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="w-4 h-4 rounded" 
                />
                <span className="text-gray-700 dark:text-gray-300">Email notifications for new applicants</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={weeklySummary}
                  onChange={(e) => setWeeklySummary(e.target.checked)}
                  className="w-4 h-4 rounded" 
                />
                <span className="text-gray-700 dark:text-gray-300">Weekly recruitment summary</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <button 
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}