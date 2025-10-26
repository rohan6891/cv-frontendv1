// components/resume/ResumeAnalyticsView.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { X, Download, Share2 } from 'lucide-react'

interface AnalysisCharts {
  skill_match_distribution: {
    matched: number;
    missing: number;
    partially_matched: number;
  };
  experience_comparison: {
    required_experience_years: number;
    candidate_experience_years: number;
  };
  word_cloud_keywords: Array<{ word: string; frequency: number }>;
  career_timeline: Array<{ year: string; role: string; organization: string }>;
  resume_effectiveness: { gauge_score: number };
}

interface AnalysisOverall {
  overall_match_score: number;
  skills_match: number;
  experience_match: number;
  education_match: number;
  certifications_match: number;
  missing_skills_count: number;
  ats_score: number;
}

interface AnalysisHighlights {
  publications: string[];
  volunteer_work: string[];
}

interface AnalysisSuggestions {
  textual_feedback: string[];
  recommended_courses: Array<{ name: string; platform: string; url: string }>;
  skill_gap_closure_plan: Array<{ missing_skill: string; recommended_action: string; priority_level: string }>;
  resume_optimization_tips: string[];
}

interface AnalysisTemplate {
  overall_analysis: AnalysisOverall;
  charts: AnalysisCharts;
  profile_highlights: AnalysisHighlights;
  improvement_suggestions: AnalysisSuggestions;
}

interface ResumeAnalyticsViewProps {
  applicant: {
    id: number;
    name: string;
    email: string;
    score: number;
    location?: string;
    experience?: number;
    skills?: string[];
    certifications?: string[];
    nextOpportunity?: string;
    analysis?: AnalysisTemplate;
  };
  onClose: () => void;
}

export default function ResumeAnalyticsView({ 
  applicant = { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    score: 85,
    location: 'San Francisco, CA',
    experience: 4,
    skills: ['React', 'TypeScript', 'Node.js', 'UI Design', 'JavaScript', 'CSS'],
    certifications: ['AWS Solutions Architect', 'Google Cloud Associate'],
    nextOpportunity: 'Senior Developer role with focus on product impact'
  }, 
  onClose = () => {} 
}: ResumeAnalyticsViewProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [showShareMenu, setShowShareMenu] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define defaults once (note: overall_match_score uses applicant.score for dynamism)
  const defaultOverall: AnalysisOverall = {
    overall_match_score: applicant.score || 85,
    skills_match: 90,
    experience_match: 80,
    education_match: 75,
    certifications_match: 85,
    missing_skills_count: 2,
    ats_score: 88,
  };

  const defaultCharts: AnalysisCharts = {
    skill_match_distribution: { matched: 8, missing: 2, partially_matched: 3 },
    experience_comparison: { 
      required_experience_years: 5, 
      candidate_experience_years: applicant?.experience || 4 
    },
    word_cloud_keywords: [
      { word: 'React', frequency: 12 },
      { word: 'JavaScript', frequency: 8 },
      { word: 'Node.js', frequency: 6 },
      { word: 'Team Leadership', frequency: 4 },
    ],
    career_timeline: [
      { year: '2023', role: 'Senior Developer', organization: 'TechCorp' },
      { year: '2021', role: 'Junior Developer', organization: 'StartUp Inc' },
      { year: '2019', role: 'Intern', organization: 'BigTech' },
    ],
    resume_effectiveness: { gauge_score: 82 },
  };

  const defaultHighlights: AnalysisHighlights = {
    publications: [],
    volunteer_work: [],
  };

  const defaultSuggestions: AnalysisSuggestions = {
    textual_feedback: [
      'Add quantifiable achievements to bullet points',
      'Tailor skills section to job description keywords',
      'Include more recent projects or GitHub links',
    ],
    recommended_courses: [
      { name: 'Advanced React Patterns', platform: 'Udemy', url: 'https://udemy.com/advanced-react' },
      { name: 'Node.js Mastery', platform: 'Coursera', url: 'https://coursera.org/node-js' },
    ],
    skill_gap_closure_plan: [
      { missing_skill: 'Docker', recommended_action: 'Complete Docker certification', priority_level: 'High' },
      { missing_skill: 'Kubernetes', recommended_action: 'Build a K8s project', priority_level: 'Medium' },
    ],
    resume_optimization_tips: [
      'Use action verbs like "Led", "Developed", "Optimized"',
      'Keep resume to one page for ATS compatibility',
      'Customize for each application',
    ],
  };

  const defaultAnalysis: AnalysisTemplate = {
    overall_analysis: defaultOverall,
    charts: defaultCharts,
    profile_highlights: defaultHighlights,
    improvement_suggestions: defaultSuggestions,
  };

  // Merge: Use provided data, but fill gaps with defaults
  const analysis: AnalysisTemplate = {
    overall_analysis: {
      ...defaultOverall,
      ...(applicant?.analysis?.overall_analysis || {}),
    },
    charts: {
      ...defaultCharts,
      ...(applicant?.analysis?.charts || {}),
      skill_match_distribution: {
        ...defaultCharts.skill_match_distribution,
        ...(applicant?.analysis?.charts?.skill_match_distribution || {}),
      },
      experience_comparison: {
        ...defaultCharts.experience_comparison,
        ...(applicant?.analysis?.charts?.experience_comparison || {}),
      },
      resume_effectiveness: {
        ...defaultCharts.resume_effectiveness,
        ...(applicant?.analysis?.charts?.resume_effectiveness || {}),
      },
      // For arrays: prefer provided, fallback to default
      word_cloud_keywords: applicant?.analysis?.charts?.word_cloud_keywords ?? defaultCharts.word_cloud_keywords,
      career_timeline: applicant?.analysis?.charts?.career_timeline ?? defaultCharts.career_timeline,
    },
    profile_highlights: {
      ...defaultHighlights,
      ...(applicant?.analysis?.profile_highlights || {}),
      publications: applicant?.analysis?.profile_highlights?.publications ?? defaultHighlights.publications,
      volunteer_work: applicant?.analysis?.profile_highlights?.volunteer_work ?? defaultHighlights.volunteer_work,
    },
    improvement_suggestions: {
      ...defaultSuggestions,
      ...(applicant?.analysis?.improvement_suggestions || {}),
      textual_feedback: applicant?.analysis?.improvement_suggestions?.textual_feedback ?? defaultSuggestions.textual_feedback,
      recommended_courses: applicant?.analysis?.improvement_suggestions?.recommended_courses ?? defaultSuggestions.recommended_courses,
      skill_gap_closure_plan: applicant?.analysis?.improvement_suggestions?.skill_gap_closure_plan ?? defaultSuggestions.skill_gap_closure_plan,
      resume_optimization_tips: applicant?.analysis?.improvement_suggestions?.resume_optimization_tips ?? defaultSuggestions.resume_optimization_tips,
    },
  };

  const handleDownload = () => {
    const resumeContent = `
RESUME & ANALYSIS - ${applicant.name}
${'='.repeat(60)}

CONTACT INFORMATION
Name: ${applicant.name}
Email: ${applicant.email}
Location: ${applicant.location || 'N/A'}

PROFESSIONAL SUMMARY
Excited about impactful product building with ownership and learning opportunities.

SKILLS
${(applicant.skills || []).join(' • ')}

EDUCATION
Bachelor of Computer Science Engineering
Indian Institute of Technology (IIT) | Jan 2021 - Jan 2025

EXPERIENCE
Product Designer II | XFlow Technologies | Jan 2025 - Present
- Leading frontend development team

Product Designer I | XFlow Technologies | May 2024 - Dec 2024
- Developed web applications using React and Node.js

CERTIFICATIONS
${(applicant.certifications || []).map(cert => `✓ ${cert}`).join('\n')}

ANALYSIS SUMMARY
Overall Match Score: ${analysis.overall_analysis.overall_match_score}%
Skills Match: ${analysis.overall_analysis.skills_match}%
Experience Match: ${analysis.overall_analysis.experience_match}%
Education Match: ${analysis.overall_analysis.education_match}%
ATS Score: ${analysis.overall_analysis.ats_score}%

SKILL DISTRIBUTION
Matched: ${analysis.charts.skill_match_distribution.matched}
Missing: ${analysis.charts.skill_match_distribution.missing}
Partially Matched: ${analysis.charts.skill_match_distribution.partially_matched}

EXPERIENCE COMPARISON
Required: ${analysis.charts.experience_comparison.required_experience_years} years
Candidate: ${analysis.charts.experience_comparison.candidate_experience_years} years

CAREER TIMELINE
${analysis.charts.career_timeline.map(entry => `${entry.year}: ${entry.role} @ ${entry.organization}`).join('\n')}

HIGHLIGHTS
Publications: ${analysis.profile_highlights.publications.join('; ')}
Volunteer: ${analysis.profile_highlights.volunteer_work.join('; ')}

IMPROVEMENT SUGGESTIONS
${analysis.improvement_suggestions.textual_feedback.join('\n')}
Skill Gaps:
${analysis.improvement_suggestions.skill_gap_closure_plan.map(gap => `- ${gap.missing_skill}: ${gap.recommended_action} (${gap.priority_level})`).join('\n')}
Recommended Courses:
${analysis.improvement_suggestions.recommended_courses.map(course => `- ${course.name} (${course.platform})`).join('\n')}
Optimization Tips: ${analysis.improvement_suggestions.resume_optimization_tips.join('; ')}
    `.trim();

    const element = document.createElement('a');
    const file = new Blob([resumeContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${applicant.name.replace(/\s+/g, '_')}_Resume_Analysis.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    URL.revokeObjectURL(element.href);
  };

  const handleShareClick = () => {
    setShowShareMenu(!showShareMenu);
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: '💬',
      color: '#25D366',
      link: (text: string) => `https://wa.me/?text=${encodeURIComponent(text)}`
    },
    {
      name: 'Email',
      icon: '📧',
      color: '#EA4335',
      link: (text: string) => `mailto:?subject=Resume Analysis: ${applicant.name}&body=${encodeURIComponent(text)}`
    },
    {
      name: 'LinkedIn',
      icon: '💼',
      color: '#0A66C2',
      link: (text: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
    },
    {
      name: 'Twitter',
      icon: '𝕏',
      color: '#000000',
      link: (text: string) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`
    },
    {
      name: 'Facebook',
      icon: 'f',
      color: '#1877F2',
      link: (text: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`
    },
    {
      name: 'Telegram',
      icon: '✈️',
      color: '#0088cc',
      link: (text: string) => `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(text)}`
    }
  ];

  const shareText = `Resume Analysis for ${applicant.name}: Overall Score ${analysis.overall_analysis.overall_match_score}% | Skills: ${analysis.overall_analysis.skills_match}% | ${applicant.email}`;

  const handleSharePlatform = (shareLink: string) => {
    window.open(shareLink, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  const BarChart = ({ value, max = 100, label, color = '#2563eb' }: { value: number; max?: number; label: string; color?: string }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{label}</span>
        <span style={{ fontSize: '13px', fontWeight: 'bold', color: color }}>{value}%</span>
      </div>
      <div style={{ height: '10px', backgroundColor: '#e5e7eb', borderRadius: '6px', overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}>
        <div style={{ height: '100%', width: `${(value / max) * 100}%`, backgroundColor: color, transition: 'width 0.5s ease-out', borderRadius: '6px' }} />
      </div>
    </div>
  );

  const DonutChart = ({ matched, missing, partial }: { matched: number; missing: number; partial: number }) => {
    const total = matched + missing + partial;
    const matchedPercent = (matched / total) * 100;
    const missingPercent = (missing / total) * 100;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <svg viewBox="0 0 120 120" style={{ width: '140px', height: '140px' }}>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="14" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray={`${(matchedPercent / 100) * 314} 314`} transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray={`${(missingPercent / 100) * 314} 314`} strokeDashoffset={`${-((matchedPercent / 100) * 314)}`} transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="50" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray={`${((100 - matchedPercent - missingPercent) / 100) * 314} 314`} strokeDashoffset={`${-(((matchedPercent + missingPercent) / 100) * 314)}`} transform="rotate(-90 60 60)" />
          <circle cx="60" cy="60" r="32" fill="white" />
          <text x="60" y="65" textAnchor="middle" style={{ fontSize: '24px', fontWeight: 'bold', fill: '#1f2937' }}>{total}</text>
        </svg>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', width: '100%', fontSize: '12px' }}>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#dcfce7', borderRadius: '6px' }}>
            <div style={{ fontWeight: 'bold', color: '#166534' }}>{matched}</div>
            <div style={{ fontSize: '11px', color: '#15803d' }}>Matched</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#fee2e2', borderRadius: '6px' }}>
            <div style={{ fontWeight: 'bold', color: '#991b1b' }}>{missing}</div>
            <div style={{ fontSize: '11px', color: '#dc2626' }}>Missing</div>
          </div>
          <div style={{ textAlign: 'center', padding: '8px', backgroundColor: '#fef3c7', borderRadius: '6px' }}>
            <div style={{ fontWeight: 'bold', color: '#92400e' }}>{partial}</div>
            <div style={{ fontSize: '11px', color: '#d97706' }}>Partial</div>
          </div>
        </div>
      </div>
    );
  };

  const BarComparisonChart = ({ required, candidate }: { required: number; candidate: number }) => {
    const max = Math.max(required, candidate) * 1.2;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: '140px', gap: '20px', padding: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '50px', height: `${(required / max) * 80}px`, backgroundColor: '#ef4444', borderRadius: '6px 6px 0 0', boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>{required}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Required Yrs</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '50px', height: `${(candidate / max) * 80}px`, backgroundColor: '#10b981', borderRadius: '6px 6px 0 0', boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)' }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>{candidate}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Your Experience</div>
          </div>
        </div>
      </div>
    );
  };

  const GaugeChart = ({ score }: { score: number }) => {
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (score / 100) * circumference;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <svg viewBox="0 0 120 80" style={{ width: '160px', height: '100px' }}>
          <path d="M 20 80 A 45 45 0 0 1 100 80" fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round" />
          <path d="M 20 80 A 45 45 0 0 1 100 80" fill="none" stroke={score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444'} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: 'stroke-dashoffset 0.8s ease-out' }} />
          <text x="60" y="55" textAnchor="middle" style={{ fontSize: '32px', fontWeight: 'bold', fill: '#1f2937' }}>{score}%</text>
        </svg>
        <div style={{ fontSize: '12px', color: '#6b7280' }}>Effectiveness Score</div>
      </div>
    );
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'auto'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        width: '95%',
        maxWidth: '1400px',
        height: '90vh',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        boxShadow: '0 20px 25px rgba(0,0,0,0.15)'
      }}>
        {/* LEFT SIDE - Applicant Info & Resume */}
        <div style={{
          backgroundColor: '#1f2937',
          color: 'white',
          overflowY: 'auto',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              alignSelf: 'flex-end',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '28px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            ✕
          </button>

          {/* Profile Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
              margin: '0 0 20px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold'
            }}>
              {applicant.name.charAt(0)}
            </div>
            <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{applicant.name}</h1>
            <p style={{ fontSize: '14px', color: '#d1d5db', margin: '0 0 4px 0' }}>{applicant.email}</p>
            <p style={{ fontSize: '14px', color: '#d1d5db', margin: 0 }}>{applicant.location}</p>
          </div>

          {/* About Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>About me</h2>
            <p style={{ fontSize: '14px', color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>
              I'm excited about building products that have a big impact. Also, I'm looking for opportunities that can move faster and have more ownership on the product. Lastly I value opportunity of learning new tech. So I'm looking for opportunity of learning and coworker who I can learn from.
            </p>
          </div>

          {/* Skills Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {(applicant.skills || ['React', 'TypeScript', 'Node.js', 'UI Design']).map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Education Section */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Education</h2>
            <div>
              <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Bachelor of Computer Science Engineering</p>
              <p style={{ fontSize: '12px', color: '#d1d5db', margin: '0 0 8px 0' }}>Indian Institute of Technology (IIT) | Jan 2021 - Jan 2025</p>
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px' }}>Experience</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Product Designer II</p>
                <p style={{ fontSize: '12px', color: '#d1d5db', margin: '0 0 4px 0' }}>XFlow Technologies | Jan 2025 - Present</p>
                <p style={{ fontSize: '12px', color: '#d1d5db', margin: 0 }}>Leading frontend development team</p>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', margin: '0 0 4px 0' }}>Product Designer I</p>
                <p style={{ fontSize: '12px', color: '#d1d5db', margin: '0 0 4px 0' }}>XFlow Technologies | May 2024 - Dec 2024</p>
                <p style={{ fontSize: '12px', color: '#d1d5db', margin: 0 }}>Developed web applications using React and Node.js</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Analytics */}
        <div style={{
          backgroundColor: '#ffffff',
          overflowY: 'auto',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Header */}
          <div style={{ marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>Resume Analysis</h1>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={handleDownload}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                <Download size={16} /> Download
              </button>
              <button 
                onClick={handleShareClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: '#f3f4f6',
                  color: '#6b7280',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                  position: 'relative'
                }}>
                <Share2 size={16} /> Share
              </button>
              
              {/* Share Menu */}
              {showShareMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px rgba(0,0,0,0.2)',
                  zIndex: 10000,
                  minWidth: '280px'
                }}>
                  <div style={{ padding: '12px', borderBottom: '1px solid #e5e7eb', fontSize: '12px', fontWeight: '600', color: '#1f2937' }}>
                    Share Resume Analysis
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0' }}>
                    {shareOptions.map(option => (
                      <button
                        key={option.name}
                        onClick={() => {
                          handleSharePlatform(option.link(shareText));
                        }}
                        style={{
                          padding: '12px',
                          border: 'none',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                          borderBottom: '1px solid #f3f4f6',
                          fontSize: '11px',
                          color: '#6b7280',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.backgroundColor = '#f9fafb';
                        }}
                        onMouseLeave={(e) => {
                          const target = e.currentTarget as HTMLElement;
                          target.style.backgroundColor = 'white';
                        }}
                      >
                        <span style={{ fontSize: '24px' }}>{option.icon}</span>
                        {option.name}
                      </button>
                    ))}
                  </div>
                  <div style={{ padding: '8px', textAlign: 'center', fontSize: '11px', color: '#9ca3af', borderTop: '1px solid #f3f4f6' }}>
                    Click to share
                  </div>
                </div>
              )}
              
              {/* Close menu overlay */}
              {showShareMenu && (
                <div
                  onClick={() => setShowShareMenu(false)}
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 9999
                  }}
                />
              )}
            </div>
          </div>

          {/* Overall Score */}
          <div style={{
            backgroundColor: '#eff6ff',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'white',
              border: '4px solid #2563eb',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#2563eb' }}>
                {analysis.overall_analysis.overall_match_score}%
              </span>
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: '0 0 8px 0' }}>Overall Match Score</h2>
            <p style={{ color: '#6b7280', margin: 0 }}>Strong candidate match for the position</p>
          </div>

          {/* Score Breakdown */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <BarChart label="Skills Match" value={analysis.overall_analysis.skills_match} color="#3b82f6" />
            <BarChart label="Experience Match" value={analysis.overall_analysis.experience_match} color="#10b981" />
            <BarChart label="Education Match" value={analysis.overall_analysis.education_match} color="#f59e0b" />
            <BarChart label="ATS Score" value={analysis.overall_analysis.ats_score} color="#8b5cf6" />
          </div>

          {/* Skill Match Distribution */}
          <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Skill Match Distribution</p>
            <DonutChart matched={analysis.charts.skill_match_distribution.matched} missing={analysis.charts.skill_match_distribution.missing} partial={analysis.charts.skill_match_distribution.partially_matched} />
          </div>

          {/* Experience Comparison */}
          <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Experience Comparison</p>
            <BarComparisonChart required={analysis.charts.experience_comparison.required_experience_years} candidate={analysis.charts.experience_comparison.candidate_experience_years} />
          </div>

          {/* Top Skills Keywords */}
          <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Top Skills Keywords</p>
            <ul style={{ fontSize: '13px', color: '#6b7280', paddingLeft: '24px', margin: 0 }}>
              {analysis.charts.word_cloud_keywords.map((kw, idx) => (
                <li key={idx} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '16px', color: '#3b82f6', fontWeight: 'bold' }}>•</span>
                  <span>{kw.word}</span>
                  <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '500' }}>({kw.frequency})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Career Timeline */}
          <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Career Timeline</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {analysis.charts.career_timeline.map((entry, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#3b82f6', border: '2px solid white', boxShadow: '0 0 0 2px #3b82f6' }} />
                    {idx < analysis.charts.career_timeline.length - 1 && (
                      <div style={{ width: '2px', height: '40px', backgroundColor: '#e5e7eb' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, paddingTop: '2px' }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: '#1f2937', margin: '0 0 4px 0' }}>{entry.role}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 2px 0' }}>{entry.organization}</p>
                    <p style={{ fontSize: '11px', color: '#9ca3af' }}>{entry.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Resume Effectiveness */}
          <div style={{ marginBottom: '24px', padding: '20px', backgroundColor: '#f9fafb', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px', color: '#1f2937' }}>Resume Effectiveness</p>
            <GaugeChart score={analysis.charts.resume_effectiveness.gauge_score} />
          </div>

          {/* Profile Highlights */}
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>Profile Highlights</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>Publications</p>
                <ul style={{ fontSize: '13px', color: '#6b7280', paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                  {analysis.profile_highlights.publications && analysis.profile_highlights.publications.length > 0 ? (
                    analysis.profile_highlights.publications.map((pub, idx) => (
                      <li key={idx} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#9ca3af', marginTop: '2px' }}>-</span>
                        <span>{pub}</span>
                      </li>
                    ))
                  ) : (
                    <li style={{ color: '#9ca3af', fontSize: '12px' }}>No publications yet</li>
                  )}
                </ul>
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1f2937' }}>Volunteer Work</p>
                <ul style={{ fontSize: '13px', color: '#6b7280', paddingLeft: '0', margin: 0, listStyle: 'none' }}>
                  {analysis.profile_highlights.volunteer_work && analysis.profile_highlights.volunteer_work.length > 0 ? (
                    analysis.profile_highlights.volunteer_work.map((vol, idx) => (
                      <li key={idx} style={{ marginBottom: '8px', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: '#9ca3af', marginTop: '2px' }}>-</span>
                        <span>{vol}</span>
                      </li>
                    ))
                  ) : (
                    <li style={{ color: '#9ca3af', fontSize: '12px' }}>No volunteer work yet</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications & Next Opportunity (kept from original) */}
          {(applicant.certifications?.length || 0) > 0 && (
            <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Certifications</h4>
              <ul style={{ fontSize: '12px', color: '#0c4a6e' }}>
                {applicant.certifications?.map((cert, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ color: '#0d9488' }}>✓</span> {cert}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {applicant.nextOpportunity && (
            <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#f0fdf4', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Ideal Next Opportunity</h4>
              <p style={{ fontSize: '12px', color: '#166534' }}>{applicant.nextOpportunity}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}