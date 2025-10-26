'use client'

import React, { useState } from 'react'
import { Menu, X, Moon, Sun, Search, Briefcase, Users, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Inline types for nav items
interface NavItem {
  name: string
  icon: React.ComponentType<{ size?: number }>
  page: string
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const pathname = usePathname()

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: Briefcase, page: '/recruiter/dashboard' },
    { name: 'Jobs', icon: Briefcase, page: '/recruiter/jobs' },
    { name: 'Applicants', icon: Users, page: '/recruiter/applicants' },
    { name: 'Settings', icon: Settings, page: '/recruiter/settings' },
  ]

  const currentPage = pathname.split('/')[1] || 'dashboard'

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 flex flex-col fixed h-screen z-50`}>
        <div className="p-6 flex items-center justify-between">
          <h1 className={`font-bold text-xl text-blue-600 ${!sidebarOpen && 'hidden'}`}>RecrutAI</h1>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map(item => (
            <Link
              key={item.page}
              href={item.page}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.page.split('/')[1]
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <item.icon size={20} />
              <span className={`${!sidebarOpen && 'hidden'}`}>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Profile Menu */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">S</div>
            <div className={`flex-1 text-left ${!sidebarOpen && 'hidden'}`}>
              <p className="text-sm font-medium">Sarah</p>
              <p className="text-xs text-gray-500">Recruiter</p>
            </div>
          </button>
          {showProfileMenu && (
            <div className="absolute bottom-16 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings size={16} /> Settings
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col bg-white dark:bg-gray-950 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Topbar */}
        <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
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

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}