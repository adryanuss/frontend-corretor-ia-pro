'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/lib/api';

interface AuthContextType {
  user: User | null; token: string | null; isLoading: boolean;
  login: (token: string, user: User) => void; logout: () => void; updateUser: (user: User) => void;
}
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try { setToken(storedToken); setUser(JSON.parse(storedUser)); }
      catch { localStorage.removeItem('token'); localStorage.removeItem('user'); }
    }
    setIsLoading(false);
  }, []);
  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('token', newToken); localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken); setUser(newUser);
  };
  const logout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user');
    setToken(null); setUser(null);
  };
  const updateUser = (updatedUser: User) => {
    localStorage.setItem('user', JSON.stringify(updatedUser)); setUser(updatedUser);
  };
  return <AuthContext.Provider value={{ user, token, isLoading, login, logout, updateUser }}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}