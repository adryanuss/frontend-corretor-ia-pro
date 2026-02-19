'use client';
// app/gerador/page.tsx - VERSÃO MELHORADA
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { listingsAPI, GenerateRequest } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Sparkles, ClipboardCopy, Check, RotateCcw, Zap, ChevronDown, ChevronUp } from 'lucide-react';

const PROPERTY_TYPES = ['Apartamento','Casa','Terreno','Sala Comercial','Cobertura','Studio','Galpão','Chácara'];
const TONE_OPTIONS = [
  { value: 'formal', label: '👔 Formal', desc: 'Profissional' },
  { value: 'casual', label: '😊 Casual', desc: 'Descontraído' },
  { value: 'luxury', label: '💎 Luxo', desc: 'Sofisticado' },
];

interface ExtendedForm extends GenerateRequest {
  // Imóvel
  suites?: number;
  parkingSpaces?: number;
  furnished?: string;
  // Condomínio/Prédio
  buildingAmenities?: string[];
  condoFee?: number;
  // Outros
  iptu?: number;
  yearBuilt?: number;
  floor?: number;
  totalFloors?: number;
}

function GeradorContent() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState<ExtendedForm>({
    propertyType: 'Apartamento',
    location: '',
    highlights: '',
    tone: 'formal',
    buildingAmenities: [],
  });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [sectionsOpen, setSectionsOpen] = useState({ building: false, additional: false });

  const isPro = user?.plan === 'PRO';
  const usageLeft = (user?.generationsLimit ?? 10) - (user?.generationsUsed ?? 0);
  const isAtLimit = !isPro && usageLeft <= 0;

  const set = (field: keyof ExtendedForm, value: any) => setForm(prev => ({ ...prev, [field]: value }));

  const toggleAmenity = (amenity: string) => {
    const current = form.buildingAmenities || [];
    const updated = current.includes(amenity) 
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    set('buildingAmenities', updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location.trim()) { setError('Localização é obrigatória'); return; }
    if (!form.highlights.trim()) { setError('Descreva os destaques do imóvel'); return; }
    
    setError(''); setResult(''); setLoading(true);
    try {
      // Montar highlights completo
      let fullHighlights = form.highlights;
      
      if (form.buildingAmenities && form.buildingAmenities.length > 0) {
        fullHighlights += `\n\nComodidades do condomínio: ${form.buildingAmenities.join(', ')}`;
      }
      if (form.suites) fullHighlights += `\n${form.suites} suíte(s)`;
      if (form.parkingSpaces) fullHighlights += `\n${form.parkingSpaces} vaga(s) de garagem`;
      if (form.furnished) fullHighlights += `\n${form.furnished}`;
      if (form.floor) fullHighlights += `\nAndar: ${form.floor}`;
      if (form.yearBuilt) fullHighlights += `\nAno de construção: ${form.yearBuilt}`;
      
      const response = await listingsAPI.generate({
        ...form,
        highlights: fullHighlights,
      });
      
      setResult(response.listing.content);
      if (user && response.usage) {
        updateUser({ ...user, generationsUsed: response.usage.used });
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar anúncio');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const BUILDING_AMENITIES = [
    'Piscina', 'Academia', 'Salão de festas', 'Churrasqueira', 'Playground',
    'Quadra esportiva', 'Sauna', 'Espaço gourmet', 'Salão de jogos', 'Portaria 24h',
    'Elevador', 'Gerador', 'Segurança', 'Câmeras', 'Bicicletário'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
      </div>
      <Navbar />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />Gerador de Anúncios
          </h1>
          <p className="text-gray-400 mt-1">Preencha as informações REAIS do imóvel</p>
        </div>

        {!isPro && (
          <div className={`rounded-2xl p-4 mb-6 flex items-center justify-between gap-4 border ${
            isAtLimit ? 'bg-red-500/10 border-red-500/30' : 
            usageLeft <= 3 ? 'bg-yellow-500/10 border-yellow-500/30' : 
            'bg-white/5 border-white/10'
          }`}>
            <div className="flex items-center gap-2">
              <Zap className={`w-4 h-4 ${
                isAtLimit ? 'text-red-400' : 
                usageLeft <= 3 ? 'text-yellow-400' : 
                'text-purple-400'
              }`} />
              <p className={`text-sm font-semibold ${
                isAtLimit ? 'text-red-400' : 
                usageLeft <= 3 ? 'text-yellow-400' : 
                'text-gray-300'
              }`}>
                {isAtLimit ? 'Limite mensal atingido' : `${usageLeft} gerações restantes este mês`}
              </p>
            </div>
            {isAtLimit && (
              <a href="https://hotmart.com/seu-produto" target="_blank" rel="noopener noreferrer" 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black font-black px-4 py-2 rounded-xl text-sm whitespace-nowrap">
                ⭐ Upgrade PRO
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* FORMULÁRIO */}
          <div className="relative rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm">
            <h2 className="font-black text-lg mb-5">📋 Dados do Imóvel</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* SEÇÃO 1: BÁSICO */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-purple-300">Informações Básicas</h3>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">Tipo de imóvel</label>
                  <select value={form.propertyType} onChange={e => set('propertyType', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                    {PROPERTY_TYPES.map(t => <option key={t} value={t} className="bg-slate-900">{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                    Localização <span className="text-red-400">*</span>
                  </label>
                  <input type="text" value={form.location} onChange={e => set('location', e.target.value)}
                    placeholder="Ex: Bairro, Cidade - Estado" required
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">🛏 Quartos</label>
                    <input type="number" min={0} value={form.bedrooms ?? ''} 
                      onChange={e => set('bedrooms', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="3"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">🛁 Suítes</label>
                    <input type="number" min={0} value={form.suites ?? ''} 
                      onChange={e => set('suites', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="1"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">🚿 Banheiros</label>
                    <input type="number" min={0} value={form.bathrooms ?? ''} 
                      onChange={e => set('bathrooms', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="2"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">📐 Área (m²)</label>
                    <input type="number" min={0} value={form.area ?? ''} 
                      onChange={e => set('area', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="90"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-1.5">🚗 Vagas</label>
                    <input type="number" min={0} value={form.parkingSpaces ?? ''} 
                      onChange={e => set('parkingSpaces', e.target.value ? Number(e.target.value) : undefined)}
                      placeholder="2"
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-1.5">💰 Preço (R$)</label>
                  <input type="number" min={0} value={form.price ?? ''} 
                    onChange={e => set('price', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="450000"
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                </div>
              </div>

              {/* SEÇÃO 2: COMODIDADES DO PRÉDIO/CONDOMÍNIO */}
              <div className="border-t border-white/10 pt-5">
                <button type="button" onClick={() => setSectionsOpen(prev => ({ ...prev, building: !prev.building }))}
                  className="w-full flex items-center justify-between text-left mb-4">
                  <h3 className="text-sm font-bold text-purple-300">🏢 Comodidades do Condomínio</h3>
                  {sectionsOpen.building ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {sectionsOpen.building && (
                  <div className="grid grid-cols-2 gap-2">
                    {BUILDING_AMENITIES.map(amenity => (
                      <button key={amenity} type="button"
                        onClick={() => toggleAmenity(amenity)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          form.buildingAmenities?.includes(amenity)
                            ? 'bg-purple-600/30 border-2 border-purple-500 text-purple-200'
                            : 'bg-white/5 border border-white/10 text-gray-400 hover:border-purple-500/30'
                        }`}>
                        {amenity}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* SEÇÃO 3: INFORMAÇÕES ADICIONAIS */}
              <div className="border-t border-white/10 pt-5">
                <button type="button" onClick={() => setSectionsOpen(prev => ({ ...prev, additional: !prev.additional }))}
                  className="w-full flex items-center justify-between text-left mb-4">
                  <h3 className="text-sm font-bold text-purple-300">📊 Informações Adicionais</h3>
                  {sectionsOpen.additional ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </button>
                
                {sectionsOpen.additional && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Andar</label>
                        <input type="number" min={0} value={form.floor ?? ''} 
                          onChange={e => set('floor', e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="5"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Ano construção</label>
                        <input type="number" min={1900} max={2030} value={form.yearBuilt ?? ''} 
                          onChange={e => set('yearBuilt', e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="2020"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">Condomínio (R$)</label>
                        <input type="number" min={0} value={form.condoFee ?? ''} 
                          onChange={e => set('condoFee', e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="500"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1.5">IPTU (R$)</label>
                        <input type="number" min={0} value={form.iptu ?? ''} 
                          onChange={e => set('iptu', e.target.value ? Number(e.target.value) : undefined)}
                          placeholder="200"
                          className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-1.5">Mobília</label>
                      <select value={form.furnished ?? ''} onChange={e => set('furnished', e.target.value || undefined)}
                        className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="" className="bg-slate-900">Não especificado</option>
                        <option value="Mobiliado" className="bg-slate-900">Mobiliado</option>
                        <option value="Semimobiliado" className="bg-slate-900">Semimobiliado</option>
                        <option value="Sem móveis" className="bg-slate-900">Sem móveis</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>

              {/* TOM */}
              <div className="border-t border-white/10 pt-5">
                <label className="block text-sm font-semibold text-gray-300 mb-2">Tom do anúncio</label>
                <div className="grid grid-cols-3 gap-2">
                  {TONE_OPTIONS.map(tone => (
                    <button key={tone.value} type="button" onClick={() => set('tone', tone.value)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        form.tone === tone.value
                          ? 'bg-purple-600/30 border-purple-500 text-purple-300'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}>
                      <div className="text-sm font-bold">{tone.label}</div>
                      <div className="text-xs opacity-70 mt-0.5">{tone.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* DESTAQUES */}
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-1.5">
                  ✍️ Destaques e diferenciais DO IMÓVEL <span className="text-red-400">*</span>
                </label>
                <textarea value={form.highlights} onChange={e => set('highlights', e.target.value)}
                  placeholder="Ex: Vista panorâmica, janelas amplas, acabamento premium, closet, varanda com churrasqueira..."
                  rows={4} required
                  className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 resize-none" />
                <p className="text-xs text-gray-500 mt-1">Descreva apenas características REAIS do imóvel</p>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                  ⚠️ {error}
                </div>
              )}

              <button type="submit" disabled={loading || isAtLimit}
                className="group w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-2xl font-black text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Gerando com IA...
                  </>
                ) : isAtLimit ? (
                  '🚫 Limite Atingido'
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />Gerar Anúncio com IA
                  </>
                )}
              </button>
            </form>
          </div>

          {/* PREVIEW DO ANÚNCIO */}
          <div className="relative rounded-3xl p-6 border border-white/10 bg-white/5 backdrop-blur-sm flex flex-col">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-black text-lg">📝 Anúncio Gerado</h2>
              {result && (
                <div className="flex gap-2">
                  <button onClick={copyToClipboard}
                    className={`flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border transition-all ${
                      copied ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-gray-400 hover:text-white border-white/10'
                    }`}>
                    {copied ? <Check className="w-4 h-4" /> : <ClipboardCopy className="w-4 h-4" />}
                    {copied ? 'Copiado!' : 'Copiar'}
                  </button>
                  <button onClick={() => { setResult(''); setForm({ ...form, highlights: '' }); }}
                    className="flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl bg-white/5 text-gray-400 hover:text-white border border-white/10 transition-all">
                    <RotateCcw className="w-4 h-4" />Novo
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1">
              {loading && (
                <div className="h-full flex flex-col items-center justify-center gap-5 py-20">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-purple-500/30 rounded-full" />
                    <div className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin absolute inset-0" />
                    <Sparkles className="w-8 h-8 text-purple-400 absolute inset-0 m-auto" />
                  </div>
                  <div className="text-center">
                    <p className="text-white font-black text-lg">Gerando seu anúncio...</p>
                    <p className="text-gray-400 text-sm mt-1">A IA está trabalhando ✨</p>
                  </div>
                </div>
              )}

              {!loading && !result && (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                  <Sparkles className="w-16 h-16 text-purple-500/20 mb-4" />
                  <p className="text-gray-500">Preencha o formulário e clique em</p>
                  <p className="text-gray-500 font-semibold">"Gerar Anúncio com IA"</p>
                </div>
              )}

              {result && !loading && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-fuchsia-600/10 rounded-2xl blur" />
                  <div className="relative bg-white/5 border border-purple-500/20 rounded-2xl p-5">
                    <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">{result}</p>
                  </div>
                </div>
              )}
            </div>

            {result && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-xs text-gray-500 text-center">✅ Anúncio salvo no seu histórico automaticamente</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GeradorPage() {
  return <ProtectedRoute><GeradorContent /></ProtectedRoute>;
}
