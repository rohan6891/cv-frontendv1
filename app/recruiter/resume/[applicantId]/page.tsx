import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Briefcase, CheckCircle2, ExternalLink, FileText, Mail, MapPin, Sparkles } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getRecruiterApplicantById, getRecruiterJobById } from '@/lib/recruiter-data'

export default function RecruiterResumePage({ params }: { params: { applicantId: string } }) {
  const applicantId = Number(params.applicantId)
  if (Number.isNaN(applicantId)) {
    notFound()
  }

  const applicant = getRecruiterApplicantById(applicantId)
  if (!applicant) {
    notFound()
  }

  const job = getRecruiterJobById(applicant.jobId)
  const resume = applicant.resume

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Link
          href="/recruiter/jobs"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft size={16} /> Back to job board
        </Link>
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/recruiter/analytics/${applicant.id}`}
            className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-black/90"
          >
            View analytics
            <FileText size={16} />
          </Link>
        </div>
      </div>

      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Applicant resume</Badge>
          <CardTitle className="text-3xl font-semibold text-foreground">{applicant.name}</CardTitle>
          <CardDescription>
            {job ? (
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Briefcase size={16} />
                Applying for {job.title} · {job.department}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Applied role unavailable</span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
          <div className="space-y-6">
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Profile headline</h2>
              <p className="text-sm text-muted-foreground">{resume?.headline ?? 'Resume headline not provided yet.'}</p>
            </section>
            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Summary</h2>
              <p className="rounded-3xl border border-border/60 bg-white/70 p-4 text-sm text-muted-foreground">
                {resume?.summary ?? 'The candidate has not uploaded a summary. Request an updated resume to review in detail.'}
              </p>
            </section>
            <section className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles size={16} /> Experience snapshot
              </div>
              <div className="space-y-4">
                {resume?.experience?.map((experience) => (
                  <div key={`${experience.company}-${experience.role}`} className="rounded-3xl border border-border/60 bg-white/70 p-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-semibold text-foreground">{experience.role}</p>
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">{experience.company}</p>
                      <p className="text-xs text-muted-foreground">{experience.period}</p>
                    </div>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {experience.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="mt-0.5 text-emerald-500" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )) ?? (
                  <p className="rounded-3xl border border-dashed border-border/60 p-4 text-sm text-muted-foreground">
                    No experience details available.
                  </p>
                )}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">Contact & logistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Mail size={14} />
                  <span>{applicant.email}</span>
                </div>
                {applicant.location ? (
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{applicant.location}</span>
                  </div>
                ) : null}
                <div className="flex items-center gap-2">
                  <Briefcase size={14} />
                  <span>{applicant.experience} years experience</span>
                </div>
                {applicant.nextOpportunity ? (
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} />
                    <span>Targeting: {applicant.nextOpportunity}</span>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-foreground">Core skills</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {applicant.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="rounded-full border-border/60">
                    {skill}
                  </Badge>
                ))}
              </CardContent>
            </Card>

            {applicant.certifications?.length ? (
              <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Certifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {applicant.certifications.map((certification) => (
                    <p key={certification}>• {certification}</p>
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {resume?.education?.length ? (
              <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm text-muted-foreground">
                  {resume.education.map((entry) => (
                    <div key={entry.institution}>
                      <p className="font-medium text-foreground">{entry.degree}</p>
                      <p>{entry.institution}</p>
                      <p className="text-xs uppercase tracking-wide">Class of {entry.year}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ) : null}

            {resume?.links?.length ? (
              <Card className="rounded-3xl border border-border/60 bg-white/70 shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold text-foreground">External links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-muted-foreground">
                  {resume.links.map((link) => (
                    <Link
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 text-primary hover:underline"
                    >
                      <ExternalLink size={14} />
                      <span>{link.label}</span>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 md:flex-row md:justify-end">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/recruiter/jobs">Back to applicants</Link>
        </Button>
        <Button asChild className="rounded-full">
          <Link href={`/recruiter/analytics/${applicant.id}`}>Open analytics report</Link>
        </Button>
      </div>
    </div>
  )
}
