'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Briefcase, LogOut, Menu, Search, Users, X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type NavItem = {
  name: string
  icon: React.ComponentType<{ className?: string }>
  page: string
}

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false)
    }
  }, [])

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: BarChart3, page: '/recruiter/dashboard' },
    { name: 'Jobs', icon: Briefcase, page: '/recruiter/jobs' },
    { name: 'Applicants', icon: Users, page: '/recruiter/applicants' },
  ]

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r border-border/60 bg-muted/20 transition-all duration-300 md:static ${
          sidebarOpen ? 'translate-x-0 w-64 md:w-72' : '-translate-x-full w-64 md:w-20 md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className={`flex items-center gap-3 ${sidebarOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}> 
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Recruiter workspace</p>
              <p className="text-sm font-semibold text-foreground">RecrutAI Command</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>

  <nav className="flex flex-1 flex-col gap-2 px-3 pb-6">
          {navItems.map((item) => {
            const active = isActive(item.page)
            return (
              <Link
                key={item.page}
                href={item.page}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active ? 'bg-primary text-primary-foreground shadow-sm' : 'text-muted-foreground hover:bg-muted/60'
                }`}
                onClick={() => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    setSidebarOpen(false)
                  }
                }}
              >
                <item.icon className={`h-4 w-4 ${active ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                <span className={`${sidebarOpen ? 'opacity-100' : 'hidden'} transition-opacity duration-200`}>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

  {sidebarOpen ? <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} /> : null}

  <div className="flex flex-1 flex-col overflow-hidden transition-all duration-300">
        <header className="flex items-center justify-between border-b border-border/60 bg-white/90 px-6 py-5 backdrop-blur">
          <div className="flex items-center gap-3 md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full" onClick={() => setSidebarOpen((prev) => !prev)}>
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 text-white">
                <Briefcase className="h-4 w-4" />
              </div>
              <div>
                <Badge className="rounded-full bg-primary/10 text-primary">Recruiter</Badge>
                <p className="text-sm font-medium text-foreground">Talent command center</p>
              </div>
            </div>
          </div>

          <div className="hidden flex-col gap-2 md:flex">
            <Badge className="w-fit rounded-full bg-primary/10 text-primary">Recruiter workspace</Badge>
            <h1 className="text-xl font-semibold text-foreground">Talent command center</h1>
          </div>

          <div className="flex flex-1 items-center justify-end gap-4">
            <div className="hidden max-w-sm flex-1 md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search roles, applicants, insights..." className="h-11 rounded-full pl-10" />
              </div>
            </div>
            <Button
              className="hidden items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/90 md:flex"
              onClick={() => console.log('Logout clicked')}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <div className="border-b border-border/60 bg-muted/40 px-4 py-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search roles, applicants, insights..." className="h-11 rounded-full pl-10" />
          </div>
          <Button
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
            onClick={() => console.log('Logout clicked')}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <main className="flex-1 overflow-y-auto bg-background px-6 py-8">{children}</main>
      </div>
    </div>
  )
}