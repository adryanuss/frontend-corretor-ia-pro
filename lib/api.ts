// lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-corretor-ia-pro.onrender.com';

export interface User {
  id: number;
  name: string;
  email: string;
  plan: 'FREE' | 'PRO';
  generationsUsed: number;
  generationsLimit: number;
}
export interface AuthResponse { token: string; user: User; }
export interface Listing { id: number; title: string; content: string; propertyType: string; createdAt: string; }
export interface GenerateRequest {
  propertyType: string; bedrooms?: number; bathrooms?: number; area?: number;
  location: string; price?: number; highlights: string; tone?: 'formal' | 'casual' | 'luxury';
}
export interface UsageInfo { used: number; limit: number; plan: 'FREE' | 'PRO'; }

function getHeaders(requireAuth = false): HeadersInit {
  const headers: HeadersInit = { 'Content-Type': 'application/json' };
  if (requireAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}
async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || data.error || 'Erro desconhecido');
  return data as T;
}
export const authAPI = {
  async register(name: string, email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST', headers: getHeaders(), body: JSON.stringify({ name, email, password }),
    });
    return handleResponse<AuthResponse>(res);
  },
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST', headers: getHeaders(), body: JSON.stringify({ email, password }),
    });
    return handleResponse<AuthResponse>(res);
  },
};
export const listingsAPI = {
  async generate(data: GenerateRequest): Promise<{ listing: Listing; usage: UsageInfo }> {
    const res = await fetch(`${API_URL}/api/listings/generate`, {
      method: 'POST', headers: getHeaders(true), body: JSON.stringify(data),
    });
    return handleResponse(res);
  },
  async getAll(): Promise<Listing[]> {
    const res = await fetch(`${API_URL}/api/listings`, { headers: getHeaders(true) });
    return handleResponse<Listing[]>(res);
  },
  async getUsage(): Promise<UsageInfo> {
    const res = await fetch(`${API_URL}/api/listings/usage`, { headers: getHeaders(true) });
    return handleResponse<UsageInfo>(res);
  },
};
