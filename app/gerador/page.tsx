'use client';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { listingsAPI, GenerateRequest } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Sparkles, ClipboardCopy, Check, RotateCcw, Zap } from 'lucide-react';

const PROPERTY_TYPES = ['Apartamento','Casa','Terreno','Sala Comercial','Cobertura','Studio','Galpão','Chácara'];
const TONE_OPTIONS = [
  { value: 'formal', label: '👔 Formal', desc: 'Profissional' },
  { value: 'casual', label: '😊 Casual', desc: 'Descontraído' },
  { value: 'luxury', label: '💎 Luxo', desc: 'Sofisticado' },
];

function GeradorContent() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState<GenerateRequest>({ propertyType: 'Apartamento', location: '', highlights: '', tone: 'formal' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const isPro = user?.plan === 'PRO';
  const usageLeft = (user?.generationsLimit ?? 10) - (user?.generationsUsed ?? 0);
  const isAtLimit = !isPro && usageLeft <= 0;
  const set = (field: keyof GenerateRequest, value: string | number | undefined) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location.trim()) { setError('Localização é obrigatória'); return; }
    if (!form.highlights.trim()) { setError('Descreva os destaques'); return; }
    setError(''); setResult(''); setLoading(true);
    try {
      const { listing, usage } = await listingsAPI.generate(form);
      setResult(listing.content);
      if (user) updateUser({ ...user, generationsUsed: usage.used });
    } catch (err: unknown) { setError(err instanceof Error ? err.message : 'Erro ao gerar anúncio'); }
    finally { setLoading(false); }
  };

  const copyToClipboard = async () => { await navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>
      <Navbar />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black flex items-center gap-3"><Sparkles className="w-8 h-8 text-purple-400" />Gerador de Anúncios</h1>
          <p className="text-gray-400 mt-1">Preencha as informações e a IA cria um anúncio profissional.</p>
        </div>
        {!isPro && (
          <div className={`rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 border ${isAtLimit ? 'bg-red-500/10 border-red-500/30' : usageLeft <= 3 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-white/5 border-white/10'}`}>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${isAtLimit ? 'text-red-400' : usageLeft <= 3 ? 'text-yellow-400' : 'text-purple-400'}`} />
              <p className={`text-sm font-semibold ${isAtLimit ? 'text-red-400' : usageLeft <= 3 ? 'text-yellow-400' : 'text-gray-300'}`}>{isAtLimit ? 'Limite mensal atingido' : `${usageLeft} gerações restantes este mês`}</p>
            </div>
            {isAtLimit && <a href="https://hotmart.com/seu-produto" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-4 py-2 rounded-xl text-sm whitespace-nowrap">⭐ Upgrade PRO</a>}
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="relative rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
            <h2 className="font-black text-lg mb-5">📋 Dados do Imóvel</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Tipo de imóvel</label>
                <select value={form.propertyType} onChange={e => set('propertyType', e.target.value)} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                  {PROPERTY_TYPES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">Localização <span className="text-red-400">*</span></label>
                <input type="text" value={form.location} onChange={e => set('location', e.target.value)} placeholder="Ex: Moema, São Paulo - SP" required className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                {([['🛏 Quartos','bedrooms','3'],['🚿 Banheiros','bathrooms','2'],['📐 Área m²','area','90']] as [string, keyof GenerateRequest, string][]).map(([label, field, placeholder]) => (
                  <div key={String(field)}><label className="block text-xs font-semibold text-gray-400 mb-1.5">{label}</label><input type="number" min={0} value={form[field] ?? ''} onChange={e => set(field, e.target.value ? Number(e.target.value) : undefined)} placeholder={placeholder} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" /></div>
                ))}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">💰 Preço (R$)</label>
                <input type="number" min={0} value={form.price ?? ''} onChange={e => set('price', e.target.value ? Number(e.target.value) : undefined)} placeholder="Ex: 450000" className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Tom do anúncio</label>
                <div className="grid grid-cols-3 gap-2">
                  {TONE_OPTIONS.map(tone => (
                    <button key={tone.value} type="button" onClick={() => set('tone', tone.value)} className={`p-2.5 rounded-xl border text-center transition-all ${form.tone === tone.value ? 'bg-purple-600/30 border-purple-500 text-purple-300' : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'}`}>
                      <div className="text-sm font-bold">{tone.label}</div><div className="text-xs opacity-70 mt-0.5">{tone.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">✍️ Destaques e diferenciais <span className="text-red-400">*</span></label>
                <textarea value={form.highlights} onChange={e => set('highlights', e.target.value)} placeholder="Ex: Vista para o mar, varanda gourmet, 2 vagas de garagem..." rows={4} required className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 resize-none" />
              </div>
              {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">⚠️ {error}</div>}
              <button type="submit" disabled={loading || isAtLimit} className="group w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-2xl font-black text-base transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (<><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Gerando com IA...</>) : isAtLimit ? '🚫 Limite Atingido' : (<><Sparkles className="w-5 h-5" />Gerar Anúncio com IA</>)}
              </button>
            </form>
          </div>
          <div className="relative rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg">📝 Anúncio Gerado</h2>
              {result && (<div className="flex gap-2">
                <button onClick={copyToClipboard} className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border transition-all ${copied ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-gray-400 hover:text-white border-white/10'}`}>{copied ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}{copied ? 'Copiado!' : 'Copiar'}</button>
                <button onClick={() => { setResult(''); set('highlights', ''); set('location', ''); }} className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/10 transition-all"><RotateCcw className="w-4 h-4" />Novo</button>
              </div>)}
            </div>
            <div className="flex-1">
              {loading && (<div className="h-full flex flex-col items-center justify-center gap-5 py-20"><div className="relative"><div className="w-20 h-20 border-4 border-purple-500/30 rounded-full" /><div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute inset-0" /><Sparkles className="w-8 h-8 text-purple-400 absolute inset-0 m-auto" /></div><div className="text-center"><p className="text-white font-black text-lg">Gerando seu anúncio...</p><p className="text-gray-400 text-sm mt-1">A IA está trabalhando ✨</p></div></div>)}
              {!loading && !result && (<div className="h-full flex flex-col items-center justify-center py-20 text-center"><Sparkles className="w-16 h-16 text-purple-500/20 mb-4" /><p className="text-gray-500">Preencha o formulário e clique em</p><p className="text-gray-500 font-semibold">"Gerar Anúncio com IA"</p></div>)}
              {result && !loading && (<div className="relative"><div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 rounded-2xl blur" /><div className="relative bg-white/5 border border-purple-500/20 rounded-2xl p-5"><p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{result}</p></div></div>)}
            </div>
            {result && <div className="mt-4 pt-4 border-t border-white/10"><p className="text-xs text-gray-500 text-center">✅ Anúncio salvo no seu histórico automaticamente</p></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
export default function GeradorPage() { return <ProtectedRoute><GeradorContent /></ProtectedRoute>; }