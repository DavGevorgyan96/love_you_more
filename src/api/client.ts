const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || res.statusText);
  }
  return res.json();
}

export const api = {
  health: () => request<{ status: string }>('/health'),
  sendMail: (body: { to?: string; subject: string; text: string; html?: string }) =>
    request<{ messageId: string; accepted: string[] }>('/mail/send', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
