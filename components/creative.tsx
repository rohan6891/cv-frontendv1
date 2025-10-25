                    <CardTitle className="text-2xl">Skill coverage and narrative map</CardTitle>
                    <CardDescription>
                      See how your story stacks up, which achievements shine, and exactly where to reinforce credibility.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillCoverage.map((skill) => (
                      <div key={skill.skill} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium text-foreground">{skill.skill}</span>
                          <span className="text-muted-foreground">{skill.coverage}% • {skill.priority}</span>
                        </div>
                        <Progress value={skill.coverage} className="h-2 rounded-full" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="flex h-full flex-col justify-between rounded-[32px] border border-border/70 bg-white/90 backdrop-blur">
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-3 text-primary">
                        <BarChart3 className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle>Growth actions</CardTitle>
                        <CardDescription>AI-recommended edits to unlock the next interview.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {growthActions.map((action) => (
                      <div key={action.title} className="rounded-2xl border border-dashed border-border/70 px-4 py-4">
                        <h3 className="text-base font-semibold">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.detail}</p>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full rounded-full border-primary/40">
                      Save to action plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="rounded-[32px] border border-border/70 bg-white/85 p-8 backdrop-blur">
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <Badge className="rounded-full bg-primary/10 text-primary">Interview prep</Badge>
                    <h3 className="mt-2 text-2xl font-semibold">Role-targeted question bank</h3>
                    <p className="text-sm text-muted-foreground">
                      Practise with prompts generated from the job description, your resume, and the company context.
                    </p>
                  </div>
                  <Button asChild className="rounded-full">
                    <Link href="/interview-prep">
                      Launch practice mode <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {interviewPrepFocus.map((area) => (
                    <div key={area.category} className="rounded-3xl border border-border/60 bg-white/80 p-6">
                      <h4 className="text-base font-semibold">{area.category}</h4>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {area.prompts.map((prompt) => (
                          <li key={prompt} className="flex items-start gap-2">
                            <Sparkles className="mt-0.5 h-4 w-4 text-primary" />
                            <span>{prompt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[32px] border border-primary/40 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="space-y-3">
                    <Badge className="rounded-full bg-white/20 text-white">Take the next step</Badge>
                    <h3 className="text-2xl font-semibold">Elevate your application in one click</h3>
                    <p className="text-sm text-white/80">
                      Generate a tailored resume using recruiter-approved templates or prep with AI-driven interview drills that mirror the role.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 md:w-80">
                    <Button asChild className="rounded-full bg-white text-indigo-700 hover:bg-white/90">
                      <Link href="/enhance">Enhance resume for this role</Link>
                    </Button>
                    <Button asChild variant="outline" className="rounded-full border-white/60 text-white hover:bg-white/10">
                      <Link href="/interview-prep">Generate interview questions</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <footer className="border-t border-border/60 pt-8 text-sm text-muted-foreground">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-sm font-semibold text-white">
                PS8
              </span>
              <div>
                <p className="font-medium text-foreground">Smart Resume Analyzer</p>
                <p>Built for job seekers and recruiting teams who want clarity.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link href="#recruiter" className="transition-colors hover:text-primary">
                Recruiter workspace
              </Link>
              <Link href="#candidate" className="transition-colors hover:text-primary">
                Candidate workspace
              </Link>
              <Link href="/login" className="transition-colors hover:text-primary">
                Sign in
              </Link>
              <span className="text-xs text-muted-foreground">(c) {new Date().getFullYear()} PS8. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
