export type Role = "candidate" | "recruiter";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function buildHeaders(extra?: Record<string, string>): HeadersInit {
  const headers: Record<string, string> = { ...(extra || {}) };
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function safeError(res: Response) {
  try {
    const j = await res.json();
    return j?.detail || j?.message || res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function generateAnalysis(input: { jobUrl: string; file: File }) {
  const form = new FormData();
  form.set("job_url", input.jobUrl);
  form.set("file", input.file);
  const res = await fetch(`${API_BASE}/job-seeker/analyze`, {
    method: "POST",
    headers: buildHeaders(),
    body: form,
  });
  if (!res.ok) {
    throw new Error(await safeError(res));
  }
  return (await res.json()) as {
    id: string;
    metadata: {
      id: string;
      role: string;
      company: string;
      summary: string;
      updatedAt: string;
      matchScore: number;
    };
    analysis: any;
    template: any;
  };
}

export async function getAnalysis(analysisId: string) {
  const res = await fetch(`${API_BASE}/job-seeker/analyses/${analysisId}`, {
    headers: buildHeaders({ "Content-Type": "application/json" }),
  });
  if (!res.ok) throw new Error(await safeError(res));
  return (await res.json()) as { analysis: any; template: any; metadata: any };
}

export async function getLatestAnalysis() {
  const res = await fetch(`${API_BASE}/job-seeker/analyses/latest`, {
    headers: buildHeaders({ "Content-Type": "application/json" }),
  });
  if (!res.ok) throw new Error(await safeError(res));
  return (await res.json()) as { analysis: any | null; template: any | null; metadata: any | null };
}

export async function listAnalyses() {
  const res = await fetch(`${API_BASE}/job-seeker/analyses`, {
    headers: buildHeaders({ "Content-Type": "application/json" }),
  });
  if (!res.ok) throw new Error(await safeError(res));
  return (await res.json()) as { items: Array<{ id: string; role: string; company: string; matchScore: number; updatedAt: string; summary: string; highlights: string[] }>; };
}

export async function listHistory() {
  const res = await fetch(`${API_BASE}/job-seeker/history`, {
    headers: buildHeaders({ "Content-Type": "application/json" }),
  });
  if (!res.ok) throw new Error(await safeError(res));
  return (await res.json()) as { items: any[] };
}

export async function enhanceResume(input: { analysisId: string; templateId: string }) {
  const form = new FormData();
  form.set("analysis_id", input.analysisId);
  form.set("template_id", input.templateId);
  const res = await fetch(`${API_BASE}/job-seeker/resume/enhance`, {
    method: "POST",
    headers: buildHeaders(),
    body: form,
  });
  if (!res.ok) throw new Error(await safeError(res));
  const data = (await res.json()) as {
    html: string;
    pdf_path?: string | null;
    pdf_url?: string | null;
    enhanced_id?: string | null;
  };
  if (data?.pdf_url) {
    try {
      data.pdf_url = new URL(data.pdf_url, API_BASE).toString();
    } catch (error) {
      // ignore malformed URLs and keep original value
    }
  }
  return data;
}

export async function listResumeTemplates() {
  const res = await fetch(`${API_BASE}/job-seeker/resume/templates`, {
    headers: buildHeaders({ "Content-Type": "application/json" }),
  });
  if (!res.ok) throw new Error(await safeError(res));
  return (await res.json()) as { items: Array<{ id: string; label: string }> };
}

export async function getResumeTemplatePreview(templateId: string) {
  const res = await fetch(`${API_BASE}/job-seeker/resume/templates/${templateId}`, {
    headers: buildHeaders({ "Content-Type": "application/json" }),
  });
  if (!res.ok) throw new Error(await safeError(res));
  return (await res.json()) as { id: string; label: string; html: string };
}

export async function generateInterviewPack(input: { analysisId: string; interviewType: string; count: number }) {
  const form = new FormData();
  form.set("analysis_id", input.analysisId);
  form.set("interview_type", input.interviewType);
  form.set("count", String(input.count));
  const res = await fetch(`${API_BASE}/job-seeker/interview/generate`, {
    method: "POST",
    headers: buildHeaders(),
    body: form,
  });
  if (!res.ok) throw new Error(await safeError(res));
  return (await res.json()) as { items: Array<{ question: string; answer: string }> };
}
