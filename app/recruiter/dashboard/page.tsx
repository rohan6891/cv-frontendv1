// app/recruiter/dashboard/page.tsx (Fixed: Added prop interface, ensured import path)
'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import DashboardContent from '../../../components/dashboard/DashboardContent'

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
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