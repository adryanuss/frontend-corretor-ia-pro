'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { listingsAPI, Listing, UsageInfo } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Wand2, Zap, Star, ClipboardCopy, Check, TrendingUp } from 'lucide-react';

function DashboardContent() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [usage, setUsage] = useState<UsageInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [listData, usageData] = await Promise.all([listingsAPI.getAll(), listingsAPI.getUsage()]);
        setListings(listData); setUsage(usageData);
      } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Erro ao carregar dados'); }
      finally { setLoading(false); }
    })();
  }, []);

  const copyToClipboard = async (text: string, id: number) => {
    await navigator.clipboard.writeText(text); setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const isPro = user?.plan === 'PRO';
  const usagePercent = usage ? Math.round((usage.used / (usage.limit || 10)) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>
      <Navbar />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-black">Olá, {user?.name?.split(' ')[0]}! 👋</h1>
          <p className="text-gray-400 mt-1">Gerencie seus anúncios e acompanhe seu uso.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          <div className={`relative rounded-3xl p-6 border overflow-hidden ${isPro ? 'border-yellow-500/30 bg-yellow-500/5' : 'border-white/10 bg-white/5'}`}>
            <div className="relative">
              <div className="flex items-center justify-between mb-3"><span className="text-gray-400 text-sm">Seu Plano</span><Star className={`w-5 h-5 ${isPro ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} /></div>
              <div className={`text-3xl font-black ${isPro ? 'text-yellow-400' : 'text-white'}`}>{isPro ? 'PRO' : 'FREE'}</div>
              {!isPro && <a href="https://hotmart.com/seu-produto" target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-xs font-semibold text-purple-400 hover:text-purple-300">Fazer upgrade →</a>}
            </div>
          </div>
          <div className="relative rounded-3xl p-6 border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3"><span className="text-gray-400 text-sm">Gerações este mês</span><Zap className="w-5 h-5 text-purple-400" /></div>
            <div className="text-3xl font-black text-white">{usage?.used ?? 0}{!isPro && <span className="text-gray-500 text-lg font-normal"> / {usage?.limit ?? 10}</span>}</div>
            {!isPro && usage && (<div className="mt-3"><div className="w-full bg-white/10 rounded-full h-1.5"><div className={`h-1.5 rounded-full transition-all ${usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 60 ? 'bg-yellow-500' : 'bg-gradient-to-r from-purple-500 to-fuchsia-500'}`} style={{ width: `${Math.min(usagePercent, 100)}%` }} /></div><p className="text-xs text-gray-500 mt-1">{usagePercent}% utilizado</p></div>)}
            {isPro && <p className="text-xs text-yellow-400 mt-1">✨ Ilimitado</p>}
          </div>
          <div className="relative rounded-3xl p-6 border border-white/10 bg-white/5">
            <div className="flex items-center justify-between mb-3"><span className="text-gray-400 text-sm">Total de Anúncios</span><TrendingUp className="w-5 h-5 text-fuchsia-400" /></div>
            <div className="text-3xl font-black text-white">{listings.length}</div>
            <Link href="/gerador" className="mt-2 inline-block text-xs font-semibold text-purple-400 hover:text-purple-300">+ Criar novo →</Link>
          </div>
        </div>
        {!isPro && usagePercent >= 80 && (
          <div className="relative rounded-3xl p-6 mb-10 border border-yellow-500/30 bg-yellow-500/5 flex items-center justify-between gap-4">
            <div><p className="text-yellow-300 font-bold">⚠️ Você está quase no limite!</p><p className="text-gray-400 text-sm mt-0.5">Faça upgrade para o PRO e gere anúncios ilimitados.</p></div>
            <a href="https://hotmart.com/seu-produto" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-5 py-2.5 rounded-xl text-sm whitespace-nowrap shadow-lg">⭐ Upgrade PRO</a>
          </div>
        )}
        {!loading && listings.length === 0 && (
          <div className="relative rounded-3xl p-12 text-center border border-dashed border-white/20 bg-white/5">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-2xl font-black mb-2">Crie seu primeiro anúncio!</h2>
            <p className="text-gray-400 mb-6 max-w-sm mx-auto">Use IA para criar anúncios imobiliários profissionais em segundos.</p>
            <Link href="/gerador" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-2xl font-black transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/40"><Wand2 className="w-5 h-5" />Gerar Anúncio com IA</Link>
          </div>
        )}
        {!loading && listings.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-black">Seus Anúncios</h2>
              <Link href="/gerador" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl text-sm font-bold transition-all hover:scale-105"><Wand2 className="w-4 h-4" />Novo Anúncio</Link>
            </div>
            <div className="space-y-4">
              {listings.map(listing => (
                <div key={listing.id} className="relative rounded-2xl p-5 border border-white/10 bg-white/5 hover:border-purple-500/40 transition-all">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold bg-purple-500/20 text-purple-300 px-2.5 py-1 rounded-full border border-purple-500/20">{listing.propertyType}</span>
                        <span className="text-xs text-gray-500">{new Date(listing.createdAt).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">{listing.content}</p>
                    </div>
                    <button onClick={() => copyToClipboard(listing.content, listing.id)} className={`shrink-0 flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border transition-all ${copied === listing.id ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-gray-400 hover:text-white border-white/10'}`}>
                      {copied === listing.id ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                      <span className="hidden sm:block">{copied === listing.id ? 'Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {loading && <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" /></div>}
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-2xl p-4 text-sm">⚠️ {error}</div>}
      </div>
    </div>
  );
}
export default function DashboardPage() { return <ProtectedRoute><DashboardContent /></ProtectedRoute>; }