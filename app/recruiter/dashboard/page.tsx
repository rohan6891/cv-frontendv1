// app/recruiter/dashboard/page.tsx (Fixed: Added prop interface, ensured import path)
'use client'

import { useEffect, useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import DashboardContent from '../../../components/dashboard/DashboardContent'
import { me } from '@/lib/api'

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [userName, setUserName] = useState<string | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    let cancelled = false
    const loadUser = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (!token) return
        const user = await me(token)
        if (!cancelled) {
          const name = user.full_name || user.email?.split('@')[0] || null
          setUserName(name)
        }
      } catch (error) {
        // swallow – dashboard can still render with dummy data
      } finally {
        if (!cancelled) setLoadingUser(false)
      }
    }
    loadUser()
    return () => {
      cancelled = true
    }
  }, [])

  const greetingName = userName ?? 'Recruiter'

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border/70 bg-white/85 p-6 backdrop-blur">
        <p className="text-lg font-semibold text-foreground">
          {loadingUser ? 'Welcome back!' : `Welcome back, ${greetingName}!`}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s the latest snapshot across your roles and applicants.</p>
      </div>
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search applicants..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          className="h-11 rounded-full pl-10"
        />
      </div>
      <DashboardContent searchQuery={searchQuery} />
    </div>
  )
}