export type Role = "candidate" | "recruiter";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function register(data: {
  email: string;
  password: string;
  full_name?: string;
  role: Role;
}) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || "Registration failed");
  }
  return (await res.json()) as {
    id: string;
    email: string;
    full_name?: string;
    role: Role;
    is_active: boolean;
  };
}

export async function login(data: { email: string; password: string }) {
  const body = new URLSearchParams();
  body.set("username", data.email);
  body.set("password", data.password);
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || "Login failed");
  }
  return (await res.json()) as { access_token: string; token_type: string };
}

export async function me(token: string) {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const msg = await safeError(res);
    throw new Error(msg || "Auth check failed");
  }
  return (await res.json()) as {
    id: string;
    email: string;
    full_name?: string;
    role: Role;
    is_active: boolean;
  };
}

async function safeError(res: Response) {
  try {
    const j = await res.json();
    return j?.detail || j?.message || res.statusText;
  } catch {
    return res.statusText;
  }
}
