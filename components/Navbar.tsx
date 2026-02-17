'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, LayoutDashboard, Wand2, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => { logout(); router.push('/login'); };
  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/gerador', label: 'Gerador IA', icon: <Wand2 className="w-4 h-4" /> },
  ];
  return (
    <nav className="bg-black/30 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/dashboard" className="flex items-center space-x-2.5">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl blur opacity-60" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-purple-600 to-fuchsia-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="font-black text-lg bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent hidden sm:block">Corretor IA Pro</span>
          </Link>
          <div className="flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${pathname === link.href ? 'bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                {link.icon}<span className="hidden sm:block">{link.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {user && (<>
              <div className="hidden sm:flex items-center gap-2">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full border ${user.plan === 'PRO' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : 'bg-white/5 text-gray-400 border-white/10'}`}>
                  {user.plan === 'PRO' ? '⭐ PRO' : 'FREE'}
                </span>
                <span className="text-sm text-gray-300 font-medium">{user.name?.split(' ')[0]}</span>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 px-3 py-2 rounded-xl transition-colors">
                <LogOut className="w-4 h-4" /><span className="hidden sm:block">Sair</span>
              </button>
            </>)}
          </div>
        </div>
      </div>
    </nav>
  );
}