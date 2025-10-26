import type { ReactNode } from 'react'

import { JobSeekerShell } from '@/components/job-seeker/job-seeker-shell'

export default function JobSeekerLayout({ children }: { children: ReactNode }) {
  return <JobSeekerShell>{children}</JobSeekerShell>
}
