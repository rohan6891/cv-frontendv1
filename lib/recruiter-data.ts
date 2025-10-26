export type RecruiterJob = {
  id: number
  title: string
  department: string
  location: string
  status: 'active' | 'inactive' | 'paused'
  description: string
  applicants: number
  createdDate: string
}

export type RecruiterApplicant = {
  id: number
  name: string
  jobId: number
  score: number
  email: string
  skills: string[]
  experience: number
  location?: string
  certifications?: string[]
  nextOpportunity?: string
  resume?: {
    headline: string
    summary: string
    experience: {
      role: string
      company: string
      period: string
      achievements: string[]
    }[]
    education: {
      institution: string
      degree: string
      year: string
    }[]
    links?: { label: string; url: string }[]
  }
  analysis?: {
    overall_analysis: {
      overall_match_score: number
      skills_match: number
      experience_match: number
      education_match: number
      certifications_match: number
      missing_skills_count: number
      ats_score: number
    }
    charts?: {
      skill_match_distribution: {
        matched: number
        partially_matched: number
        missing: number
      }
      experience_comparison: {
        required_experience_years: number
        candidate_experience_years: number
      }
      word_cloud_keywords: { word: string; frequency: number }[]
      career_timeline: { year: string; role: string; organization: string }[]
      resume_effectiveness: { gauge_score: number }
    }
    profile_highlights?: {
      publications: string[]
      volunteer_work: string[]
    }
    improvement_suggestions?: {
      textual_feedback: string[]
      recommended_courses: { name: string; platform: string; url: string }[]
      skill_gap_closure_plan: { missing_skill: string; recommended_action: string; priority_level: string }[]
      resume_optimization_tips: string[]
    }
  }
}

const jobs: RecruiterJob[] = [
  { id: 1, title: 'Senior React Developer', department: 'Engineering', location: 'San Francisco', status: 'active', description: 'Build scalable UIs', applicants: 4, createdDate: '2024-01-15' },
  { id: 2, title: 'Product Manager', department: 'Product', location: 'New York', status: 'active', description: 'Lead product strategy', applicants: 1, createdDate: '2024-01-10' },
]

const applicants: RecruiterApplicant[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    jobId: 1,
    score: 92,
    email: 'sarah@example.com',
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: 5,
    location: 'San Francisco, CA',
    certifications: ['React Certification'],
    nextOpportunity: 'Tech Lead',
    resume: {
      headline: 'Senior Frontend Engineer & Design Systems Lead',
      summary:
        'Frontend engineer with 5+ years leading design systems for high-growth SaaS platforms. Scaled component libraries and accelerated product delivery with accessible, performant UI architecture.',
      experience: [
        {
          role: 'Senior Frontend Engineer',
          company: 'Atlas Analytics',
          period: '2021 — Present',
          achievements: [
            'Owned the v3 design system rollout that cut UI delivery time by 40% across 6 squads.',
            'Championed TypeScript adoption and instituted automated visual regression testing.',
            'Partnered with product design to align component tokens with brand refresh in 6 weeks.',
          ],
        },
        {
          role: 'Frontend Engineer',
          company: 'VentureLoop',
          period: '2019 — 2021',
          achievements: [
            'Built configurable onboarding flows that lifted activation by 18% quarter-over-quarter.',
            'Introduced performance budgets that reduced bundle size by 32% without feature regression.',
          ],
        },
      ],
      education: [
        { institution: 'UC Berkeley', degree: 'B.S. Computer Science', year: '2018' },
      ],
      links: [
        { label: 'Portfolio', url: 'https://sarah.design' },
        { label: 'LinkedIn', url: 'https://linkedin.com/in/sarah-johnson' },
      ],
    },
    analysis: {
      overall_analysis: {
        overall_match_score: 92,
        skills_match: 95,
        experience_match: 90,
        education_match: 85,
        certifications_match: 90,
        missing_skills_count: 1,
        ats_score: 94,
      },
      charts: {
        skill_match_distribution: {
          matched: 18,
          partially_matched: 4,
          missing: 1,
        },
        experience_comparison: {
          required_experience_years: 6,
          candidate_experience_years: 5,
        },
        word_cloud_keywords: [
          { word: 'React', frequency: 12 },
          { word: 'Design Systems', frequency: 9 },
          { word: 'TypeScript', frequency: 8 },
          { word: 'Accessibility', frequency: 7 },
          { word: 'Performance', frequency: 6 },
        ],
        career_timeline: [
          { year: '2024', role: 'Senior Frontend Engineer', organization: 'Atlas Analytics' },
          { year: '2021', role: 'Frontend Engineer', organization: 'VentureLoop' },
          { year: '2018', role: 'Associate Engineer', organization: 'Lumen Labs' },
        ],
        resume_effectiveness: { gauge_score: 88 },
      },
      profile_highlights: {
        publications: ['Co-author: Design Tokens in Enterprise Frontends (Smashing Magazine, 2023)'],
        volunteer_work: ['Open-source maintainer: Accessible React Patterns'],
      },
      improvement_suggestions: {
        textual_feedback: [
          'Clarify ownership of performance budgets with concrete before/after metrics.',
          'Expand on collaboration with design partners to highlight cross-functional leadership.',
        ],
        recommended_courses: [
          { name: 'Advanced React Patterns', platform: 'Frontend Masters', url: 'https://frontendmasters.com' },
          { name: 'Design Systems Ops', platform: 'DesignBetter', url: 'https://designbetter.co' },
        ],
        skill_gap_closure_plan: [
          {
            missing_skill: 'GraphQL Federation',
            recommended_action: 'Pair with platform team on the current migration rollout to own a subgraph.',
            priority_level: 'High',
          },
        ],
        resume_optimization_tips: [
          'Elevate the summary with quantified impact across onboarding flows and system adoption.',
          'Group accessibility outcomes under a unified “Inclusive UI” section for quick scanning.',
        ],
      },
    },
  },
  {
    id: 2,
    name: 'Mike Chen',
    jobId: 1,
    score: 85,
    email: 'mike@example.com',
    skills: ['React', 'Python', 'UI Design'],
    experience: 3,
    location: 'New York, NY',
    nextOpportunity: 'Senior Developer',
    resume: {
      headline: 'Full-stack Product Engineer obsessed with DX',
      summary:
        'Product-focused engineer delivering polished web experiences. Strength in cross-functional collaboration and shipping delightful user flows under tight deadlines.',
      experience: [
        {
          role: 'Frontend Engineer',
          company: 'Nimbus Labs',
          period: '2022 — Present',
          achievements: [
            'Shipped onboarding revamp that increased trial conversion by 11% in 2 quarters.',
            'Implemented component analytics instrumentation to guide design investments.',
          ],
        },
        {
          role: 'Software Engineer',
          company: 'BrightFin',
          period: '2020 — 2022',
          achievements: [
            'Built internal UI kit in React + Tailwind that replaced legacy jQuery stack in 4 months.',
            'Led accessibility audit with 0 critical issues outstanding.',
          ],
        },
      ],
      education: [
        { institution: 'NYU', degree: 'B.S. Computer Engineering', year: '2020' },
      ],
      links: [{ label: 'GitHub', url: 'https://github.com/mike-chen' }],
    },
    analysis: {
      overall_analysis: {
        overall_match_score: 85,
        skills_match: 80,
        experience_match: 75,
        education_match: 80,
        certifications_match: 70,
        missing_skills_count: 3,
        ats_score: 82,
      },
      charts: {
        skill_match_distribution: {
          matched: 14,
          partially_matched: 5,
          missing: 3,
        },
        experience_comparison: {
          required_experience_years: 5,
          candidate_experience_years: 3,
        },
        word_cloud_keywords: [
          { word: 'React', frequency: 8 },
          { word: 'UI Design', frequency: 7 },
          { word: 'Product', frequency: 6 },
          { word: 'Typescript', frequency: 5 },
          { word: 'Testing', frequency: 4 },
        ],
        career_timeline: [
          { year: '2023', role: 'Frontend Engineer', organization: 'Nimbus Labs' },
          { year: '2021', role: 'Software Engineer', organization: 'BrightFin' },
          { year: '2020', role: 'Engineering Intern', organization: 'Inova' },
        ],
        resume_effectiveness: { gauge_score: 80 },
      },
      profile_highlights: {
        publications: [],
        volunteer_work: ['Mentor, Code Nation Fellowship'],
      },
      improvement_suggestions: {
        textual_feedback: [
          'Add metrics around component analytics instrumentation impact.',
          'Call out collaboration with product design explicitly in accomplishments.',
        ],
        recommended_courses: [
          { name: 'System Design for Frontend Engineers', platform: 'Frontend Masters', url: 'https://frontendmasters.com' },
        ],
        skill_gap_closure_plan: [
          {
            missing_skill: 'Node.js APIs',
            recommended_action: 'Pair with backend team on upcoming billing experiments to widen scope.',
            priority_level: 'Medium',
          },
        ],
        resume_optimization_tips: [
          'Swap passive phrasing with active verbs and quantify experiment learnings.',
        ],
      },
    },
  },
  {
    id: 3,
    name: 'Emma Davis',
    jobId: 2,
    score: 78,
    email: 'emma@example.com',
    skills: ['Product Strategy', 'Data Analysis', 'UI Design'],
    experience: 1,
    location: 'New Delhi, India',
    certifications: ['Product Designer 2'],
    nextOpportunity: 'Senior Designer',
    resume: {
      headline: 'Product designer translating insights into strategic vision',
      summary:
        'Product designer partnering with PM and Research to discover growth opportunities and translate findings into pixel-perfect experiences.',
      experience: [
        {
          role: 'Product Designer',
          company: 'Pathway',
          period: '2022 — Present',
          achievements: [
            'Drove marketplace relaunch that improved buyer conversion by 15%.',
            'Set up design ops rituals shortening feedback loops from 5 days to 48 hours.',
          ],
        },
      ],
      education: [
        { institution: 'NID Ahmedabad', degree: 'B.Des Interaction Design', year: '2021' },
      ],
      links: [{ label: 'Dribbble', url: 'https://dribbble.com/emma-davis' }],
    },
    analysis: {
      overall_analysis: {
        overall_match_score: 78,
        skills_match: 85,
        experience_match: 60,
        education_match: 90,
        certifications_match: 80,
        missing_skills_count: 2,
        ats_score: 75,
      },
      charts: {
        skill_match_distribution: {
          matched: 15,
          partially_matched: 6,
          missing: 2,
        },
        experience_comparison: {
          required_experience_years: 4,
          candidate_experience_years: 2,
        },
        word_cloud_keywords: [
          { word: 'Product Strategy', frequency: 7 },
          { word: 'Data Analysis', frequency: 6 },
          { word: 'User Research', frequency: 5 },
          { word: 'UI Design', frequency: 6 },
        ],
        career_timeline: [
          { year: '2023', role: 'Product Designer', organization: 'Pathway' },
          { year: '2021', role: 'UX Designer', organization: 'Bright Labs' },
        ],
        resume_effectiveness: { gauge_score: 72 },
      },
      profile_highlights: {
        publications: ['Speaker: UX India 2023 - Data-led design sprints'],
        volunteer_work: ['Lead organizer, Local Design Systems Meetup'],
      },
      improvement_suggestions: {
        textual_feedback: [
          'Focus on business outcomes from the marketplace relaunch.',
          'Highlight cross-functional rituals and stakeholder management.',
        ],
        recommended_courses: [
          { name: 'Product Strategy for Designers', platform: 'Reforge', url: 'https://www.reforge.com' },
        ],
        skill_gap_closure_plan: [
          {
            missing_skill: 'Experimentation',
            recommended_action: 'Co-lead A/B test analysis with analytics partner next quarter.',
            priority_level: 'High',
          },
        ],
        resume_optimization_tips: [
          'Add a “Collaborated with” tag in each bullet to reinforce partner alignment.',
        ],
      },
    },
  },
  {
    id: 4,
    name: 'Alex Rodriguez',
    jobId: 1,
    score: 88,
    email: 'alex@example.com',
    skills: ['React', 'Vue', 'Angular'],
    experience: 6,
    location: 'Austin, TX',
    nextOpportunity: 'Engineering Manager',
    resume: {
      headline: 'Engineering lead scaling modern web platforms',
      summary:
        'Full-stack engineer with 6+ years guiding teams through frontend migrations and enabling rapid experiments. Known for pairing coaching with pragmatic delivery.',
      experience: [
        {
          role: 'Lead Frontend Engineer',
          company: 'Voyage',
          period: '2020 — Present',
          achievements: [
            'Migrated legacy Angular app to React within 6 months while maintaining release cadence.',
            'Bootstrapped platform squad, hiring 4 engineers and standing up weekly craft sessions.',
          ],
        },
        {
          role: 'Software Engineer',
          company: 'BrightLoop',
          period: '2017 — 2020',
          achievements: [
            'Implemented design system usage guidelines that reduced duplicated components by 45%.',
          ],
        },
      ],
      education: [
        { institution: 'UT Austin', degree: 'B.S. Software Engineering', year: '2017' },
      ],
      links: [{ label: 'LinkedIn', url: 'https://linkedin.com/in/alex-rodriguez' }],
    },
    analysis: {
      overall_analysis: {
        overall_match_score: 88,
        skills_match: 90,
        experience_match: 95,
        education_match: 70,
        certifications_match: 85,
        missing_skills_count: 1,
        ats_score: 89,
      },
      charts: {
        skill_match_distribution: {
          matched: 17,
          partially_matched: 5,
          missing: 1,
        },
        experience_comparison: {
          required_experience_years: 6,
          candidate_experience_years: 6,
        },
        word_cloud_keywords: [
          { word: 'Leadership', frequency: 8 },
          { word: 'React', frequency: 10 },
          { word: 'Vue', frequency: 6 },
          { word: 'Architecture', frequency: 5 },
        ],
        career_timeline: [
          { year: '2022', role: 'Lead Frontend Engineer', organization: 'Voyage' },
          { year: '2019', role: 'Senior Software Engineer', organization: 'Voyage' },
          { year: '2017', role: 'Software Engineer', organization: 'BrightLoop' },
        ],
        resume_effectiveness: { gauge_score: 86 },
      },
      profile_highlights: {
        publications: ['Podcast guest: Scaling Frontend Teams (2023)'],
        volunteer_work: ['Tech mentor, Latinas in Tech Austin'],
      },
      improvement_suggestions: {
        textual_feedback: [
          'Quantify impact of platform squad on release velocity.',
          'Mention experience partnering with product leadership on roadmap tradeoffs.',
        ],
        recommended_courses: [
          { name: 'Engineering Management for the Rest of Us', platform: 'StaffEng', url: 'https://www.staffeng.com' },
        ],
        skill_gap_closure_plan: [
          {
            missing_skill: 'Budget Ownership',
            recommended_action: 'Shadow director on upcoming staffing planning cycle.',
            priority_level: 'Medium',
          },
        ],
        resume_optimization_tips: [
          'Add a sidebar summary of team leadership stats (team size, release cadence).',
        ],
      },
    },
  },
]

export function getRecruiterJobs() {
  return jobs
}

export function getRecruiterApplicants() {
  return applicants
}

export function getRecruiterApplicantById(id: number) {
  return applicants.find((applicant) => applicant.id === id)
}

export function getRecruiterJobById(id: number) {
  return jobs.find((job) => job.id === id)
}
