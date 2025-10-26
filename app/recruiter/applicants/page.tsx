// app/applicants/page.tsx
'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

import { Input } from '@/components/ui/input'
import ApplicantsContent from '../../../components/applicants/ApplicantsContent'

export default function ApplicantsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6">
      <div className="px-1 md:px-0">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="h-11 rounded-full pl-10"
          />
        </div>
      </div>
      <ApplicantsContent searchQuery={searchQuery} />
    </div>
  )
}