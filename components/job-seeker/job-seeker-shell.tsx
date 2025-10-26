'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'

import { Button } from '@/components/ui/button'
import { jobSeekerNavigationItems } from '@/lib/job-seeker-data'

export function JobSeekerShell({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/job-seeker/dashboard') {
      return pathname === href
    }
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden h-screen w-72 flex-col overflow-y-auto border-r border-border/60 bg-muted/20 p-6 md:flex">
        <div className="flex items-center gap-3 pb-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-lg font-semibold text-white">
            PS8
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Job seeker workspace</p>
            <p className="text-sm font-semibold text-foreground">Smart Resume Analyzer</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          {jobSeekerNavigationItems.map((item) => {
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active ? 'bg-primary text-primary-foreground shadow' : 'text-muted-foreground hover:bg-muted/60'
                }`}
              >
                <item.icon className={`h-4 w-4 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="shrink-0 border-b border-border/60 px-6 py-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold md:text-3xl">Candidate command center</h1>
              <p className="text-sm text-muted-foreground">
                Coordinate your analysis, interview prep, and resume upgrades without leaving this workspace.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <Link href="/job-seeker/analysis">View latest analysis</Link>
              </Button>
              <Button asChild className="rounded-full">
                <Link href="/job-seeker/resume">Enhance resume</Link>
              </Button>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 md:hidden">
            {jobSeekerNavigationItems.map((item) => (
              <Button
                key={item.href}
                asChild
                variant={isActive(item.href) ? 'default' : 'outline'}
                className="flex-1 rounded-full text-xs"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
