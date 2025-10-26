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
    <div className="p-4 md:p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        
        <div className="space-y-6 rounded-2xl border border-border/60 bg-white p-6 shadow-sm">
          {/* Account Settings Section */}
          <div>
            <h2 className="mb-4 text-lg font-semibold text-foreground">Account Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-muted-foreground">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-border/60 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black" 
                />
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border-t border-border/60 pt-6">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Preferences</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                  className="h-4 w-4 rounded border-border/60 text-black focus:ring-black" 
                />
                <span className="text-sm text-muted-foreground">Email notifications for new applicants</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={weeklySummary}
                  onChange={(e) => setWeeklySummary(e.target.checked)}
                  className="h-4 w-4 rounded border-border/60 text-black focus:ring-black" 
                />
                <span className="text-sm text-muted-foreground">Weekly recruitment summary</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="border-t border-border/60 pt-6">
            <button 
              onClick={handleSave}
              className="rounded-lg bg-black px-6 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}