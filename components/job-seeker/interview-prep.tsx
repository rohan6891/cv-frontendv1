'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronDown, ChevronUp, Download } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import type { CandidateAnalysis } from '@/lib/job-seeker-data'
import {
  interviewQuestionLimit,
  interviewTypeLabels,
  type UploadedResumeMeta,
} from '@/lib/job-seeker-data'

function formatSize(bytes: number) {
  const kb = Math.max(1, Math.round(bytes / 1024))
  return `${kb} KB`
}

export type InterviewPrepProps = {
  analysis: CandidateAnalysis
  uploadedResume?: UploadedResumeMeta | null
  onUploadResume?: (file: File | null) => void
  showIntakeFields?: boolean
  onBackToAnalysis: () => void
  onGoToResume: () => void
  onGenerateQuestions?: (opts: { interviewType: string; count: number }) => Promise<Array<{ question: string; answer: string }>>
}

export function InterviewPrep({
  analysis,
  uploadedResume = null,
  onUploadResume,
  showIntakeFields = true,
  onBackToAnalysis,
  onGoToResume,
  onGenerateQuestions,
}: InterviewPrepProps) {
  const [stage, setStage] = useState<'intake' | 'ready' | 'results'>(showIntakeFields ? 'intake' : 'ready')
  const [jobLink, setJobLink] = useState('')
  const [jobTitle, setJobTitle] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [experienceLevel, setExperienceLevel] = useState('')
  const [competencies, setCompetencies] = useState('')
  const [interviewType, setInterviewType] = useState('mixed')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [numberOfQuestions, setNumberOfQuestions] = useState('6')
  const [openQuestionIds, setOpenQuestionIds] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [backendItems, setBackendItems] = useState<Array<{ question: string; answer: string }>>([])
  const uploadInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    setStage(showIntakeFields ? 'intake' : 'ready')
    setOpenQuestionIds([])
  }, [showIntakeFields])

  const questionBank = useMemo(() => {
    return backendItems.map((qa, index) => ({
      id: `gen-${index}`,
      topic: interviewTypeLabels[interviewType] ?? 'Interview',
      question: qa.question,
      answer: qa.answer,
    }))
  }, [backendItems, interviewType])

  const hasGeneratedQuestions = questionBank.length > 0
  const requestedCount = parseInt(numberOfQuestions, 10) || 1
  const maxQuestions = hasGeneratedQuestions ? Math.min(interviewQuestionLimit, questionBank.length) : interviewQuestionLimit
  const sanitizedCount = Math.max(1, Math.min(maxQuestions, requestedCount))
  const displayedQuestions = hasGeneratedQuestions ? questionBank.slice(0, sanitizedCount) : []
  const generatedCount = displayedQuestions.length

  const interviewTypeLabel = interviewTypeLabels[interviewType] ?? interviewTypeLabels.mixed

  const uploadSummary = (() => {
    const file = uploadedFile ?? uploadedResume
    if (!file) {
      return 'No resume uploaded yet. Upload to personalise the questions.'
    }
    return `${file.name} · ${formatSize(file.size)} · Ready for context blend`
  })()

  const handleTriggerUpload = () => uploadInputRef.current?.click()

  const handleUploadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null
    setUploadedFile(file)
    onUploadResume?.(file)
    event.target.value = ''
  }

  const handleGenerate = async () => {
    setOpenQuestionIds([])
    if (onGenerateQuestions) {
      try {
        setLoading(true)
        const items = await onGenerateQuestions({ interviewType, count: sanitizedCount })
        setBackendItems(items || [])
      } catch (e) {
        // ignore, fallback to local
        setBackendItems([])
      } finally {
        setLoading(false)
      }
    }
    setStage('results')
  }

  const handleResetStage = () => {
    setOpenQuestionIds([])
    setStage(showIntakeFields ? 'intake' : 'ready')
  }

  const toggleQuestion = (id: string) => {
    setOpenQuestionIds((previous) => (previous.includes(id) ? previous.filter((entry) => entry !== id) : [...previous, id]))
  }

  const handleDownload = (includeAnswers: boolean) => {
    const lines = displayedQuestions.map((item, index) => {
      const answerSection = includeAnswers ? `\nAnswer: ${item.answer}` : ''
      return `${index + 1}. ${item.question}${answerSection}`
    })
    const content = lines.join('\n\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = includeAnswers ? 'question-pack-with-answers.txt' : 'question-pack.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
        <CardHeader className="space-y-2">
          <Badge className="w-fit rounded-full bg-primary/10 text-primary">Interview prep</Badge>
          <CardTitle className="text-2xl">
            {stage === 'results'
              ? 'Generated prompts'
              : showIntakeFields
                ? 'Tailor your question pack'
                : 'Ready to generate questions'}
          </CardTitle>
          <CardDescription>
            {stage === 'results'
              ? generatedCount
                ? `Here’s a ${generatedCount}-question pack aligned to ${analysis.candidate.targetRole}.`
                : 'No questions were returned. Try adjusting inputs or regenerating.'
              : showIntakeFields
                ? 'Share the latest role context and supporting resume before generating prompts.'
                : `Using your ${analysis.candidate.targetRole} analysis for ${analysis.candidate.targetCompany}.`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {stage === 'results' ? (
            <>
              <div className="flex flex-col gap-4 rounded-3xl border border-dashed border-primary/30 bg-background/70 p-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-foreground">{interviewTypeLabel}</p>
                  <p className="text-xs text-muted-foreground">
                    {(jobTitle || analysis.candidate.targetRole).trim()} · {analysis.candidate.targetCompany}
                  </p>
                  {jobLink ? (
                    <a href={jobLink} target="_blank" rel="noreferrer" className="text-xs text-primary underline">
                      View job description
                    </a>
                  ) : null}
                  {jobDescription ? <p className="text-xs text-muted-foreground">{jobDescription}</p> : null}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button className="rounded-full" onClick={() => handleDownload(true)}>
                    <Download className="mr-2 h-4 w-4" /> Download with answers
                  </Button>
                  <Button variant="outline" className="rounded-full" onClick={() => handleDownload(false)}>
                    <Download className="mr-2 h-4 w-4" /> Download without answers
                  </Button>
                </div>
              </div>

              {displayedQuestions.length ? (
                <div className="grid gap-4">
                  {displayedQuestions.map((item, index) => {
                    const isOpen = openQuestionIds.includes(item.id)
                    return (
                      <Card key={item.id} className="rounded-3xl border border-border/60 bg-white/80 backdrop-blur transition">
                        <button
                          type="button"
                          onClick={() => toggleQuestion(item.id)}
                          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                        >
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-primary">Question {index + 1}</p>
                            <p className="mt-1 text-sm font-semibold text-foreground">{item.question}</p>
                          </div>
                          {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
                        </button>
                        {isOpen ? (
                          <div className="border-t border-border/50 bg-white/70 px-5 py-4">
                            <Badge variant="outline" className="rounded-full">
                              {item.topic}
                            </Badge>
                            <p className="mt-3 text-sm font-medium text-foreground">Suggested response</p>
                            <p className="mt-2 text-sm text-muted-foreground">{item.answer}</p>
                          </div>
                        ) : null}
                      </Card>
                    )
                  })}
                </div>
              ) : (
                <Card className="rounded-3xl border border-dashed border-primary/40 bg-white/60 p-6 text-sm text-muted-foreground">
                  <p>No interview questions are available yet. Regenerate the pack once the backend returns results.</p>
                </Card>
              )}
            </>
          ) : stage === 'intake' ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="interview-job-link" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Job description link
                  </label>
                  <Input id="interview-job-link" value={jobLink} onChange={(event) => setJobLink(event.target.value)} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-interview-type" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Interview type
                  </label>
                  <select
                    id="form-interview-type"
                    value={interviewType}
                    onChange={(event) => setInterviewType(event.target.value)}
                    className="w-full rounded-2xl border border-border/70 bg-white/90 p-3 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="system-design">System design</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-question-count" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Number of questions
                  </label>
                  <Input
                    id="form-question-count"
                    type="number"
                    min={1}
                    max={maxQuestions}
                    value={numberOfQuestions}
                    onChange={(event) => setNumberOfQuestions(event.target.value)}
                    placeholder="6"
                  />
                  <p className="text-xs text-muted-foreground">Up to {maxQuestions} curated prompts available.</p>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Upload resume</p>
                <input ref={uploadInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleUploadChange} />
                <div className="rounded-[28px] border border-dashed border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground">
                  <p className="text-sm font-medium text-foreground">{uploadSummary}</p>
                  <p className="mt-2 text-xs">Supported formats: PDF, DOC, DOCX · Max 5 MB</p>
                  <div className="mt-4">
                    <Button type="button" className="rounded-md bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/90" onClick={handleTriggerUpload}>
                      Upload resume
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="rounded-[28px] border border-dashed border-primary/30 bg-background/70 p-6 text-sm text-muted-foreground">
                <p className="text-sm font-medium text-foreground">
                  Your latest analysis inputs power this session. Update the role brief anytime from the Interview tab.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="form-question-count" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Number of questions
                  </label>
                  <Input
                    id="form-question-count"
                    type="number"
                    min={1}
                    max={maxQuestions}
                    value={numberOfQuestions}
                    onChange={(event) => setNumberOfQuestions(event.target.value)}
                    placeholder="6"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="form-interview-type" className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Interview type
                  </label>
                  <select
                    id="form-interview-type"
                    value={interviewType}
                    onChange={(event) => setInterviewType(event.target.value)}
                    className="w-full rounded-2xl border border-border/70 bg-white/90 p-3 text-sm shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <option value="technical">Technical</option>
                    <option value="behavioral">Behavioral</option>
                    <option value="system-design">System design</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap justify-end gap-3">
          {stage === 'results' ? (
            <>
              <Button variant="outline" className="rounded-full" onClick={handleResetStage}>
                Adjust inputs
              </Button>
              <Button type="button" className="rounded-full" onClick={handleGenerate}>
                Regenerate pack
              </Button>
            </>
          ) : (
            <Button type="button" className="rounded-full" onClick={handleGenerate} disabled={loading}>
              {loading ? 'Generating…' : 'Generate question pack'}
            </Button>
          )}
        </CardFooter>
      </Card>

      {stage === 'results' ? (
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <Button variant="outline" className="rounded-full md:mr-auto" onClick={onBackToAnalysis}>
            Back to analysis
          </Button>
          <Button className="rounded-full" onClick={onGoToResume}>
            Jump to resume enhancer
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Card className="rounded-[32px] border border-border/70 bg-white/85 backdrop-blur">
          <CardFooter className="flex flex-col gap-3 md:flex-row md:items-center">
            <Button variant="outline" className="rounded-full md:mr-auto" onClick={onBackToAnalysis}>
              Back to analysis
            </Button>
            <Button className="rounded-full" onClick={onGoToResume}>
              Jump to resume enhancer
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
