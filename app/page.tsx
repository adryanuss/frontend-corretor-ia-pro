'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Zap, ArrowRight, Play, CheckCircle, Star, Clock, Rocket, Camera, FileText, MessageSquare, TrendingUp, Eye, Target, ChevronDown } from 'lucide-react';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -right-48 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="relative z-50 border-b border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-xl blur opacity-75 animate-pulse"></div>
                <div className="relative w-12 h-12 bg-gradient-to-br from-purple-600 via-fuchsia-600 to-purple-700 rounded-xl flex items-center justify-center shadow-2xl">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-white via-purple-200 to-fuchsia-200 bg-clip-text text-transparent">
                Corretor IA Pro
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white font-semibold transition-colors">Funcionalidades</a>
              <a href="#pricing" className="text-gray-300 hover:text-white font-semibold transition-colors">Preços</a>
              <button className="group relative px-8 py-3 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-purple-600 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center space-x-2">
                  <span>Começar Grátis</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://corretoraipro.online/header.webp" 
            alt="Background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-purple-950/90 to-slate-950"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 px-5 py-2.5 rounded-full border border-purple-500/30 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-bold bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text text-transparent">
                  +2.847 corretores vendendo 3x mais
                </span>
              </div>

              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-none">
                Venda{' '}
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 blur-2xl opacity-50"></span>
                  <span className="relative bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
                    3x Mais
                  </span>
                </span>
                <br />
                com IA
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Transforme fotos em{' '}
                <span className="font-bold text-white">anúncios irresistíveis</span>{' '}
                em segundos. Economize 10h/semana.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-2xl font-black text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative flex items-center justify-center space-x-2">
                    <Rocket className="w-6 h-6" />
                    <span>Começar Grátis Agora</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
                
                <button className="group px-10 py-5 bg-white/5 backdrop-blur-xl rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2">
                  <Play className="w-6 h-6" />
                  <span>Ver Demo</span>
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>Sem cartão de crédito</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <span>7 dias grátis</span>
                </div>
              </div>
            </div>

            <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur-3xl opacity-30"></div>
                
                <div className="relative bg-gradient-to-br from-slate-900/90 to-purple-900/50 backdrop-blur-2xl rounded-3xl border border-purple-500/30 p-8 shadow-2xl">
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full shadow-2xl font-black flex items-center space-x-2 animate-pulse">
                    <Zap className="w-5 h-5" />
                    <span>IA Gerando...</span>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-slate-800/50 to-purple-900/30 p-6 rounded-2xl border border-purple-500/20">
                      <div className="flex items-center space-x-3 mb-4">
                        <Camera className="w-5 h-5 text-purple-400" />
                        <span className="text-sm text-gray-400 font-semibold">Entrada</span>
                      </div>
                      <div className="text-white font-bold text-lg">
                        🏢 Apartamento • 3 quartos • Vila Madalena, SP
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-purple-600/20 to-fuchsia-600/20 p-6 rounded-2xl border-2 border-purple-500/40">
                        <div className="flex items-center space-x-2 mb-3">
                          <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                          <span className="text-xs font-black text-purple-300 uppercase">Título Profissional</span>
                        </div>
                        <div className="text-white font-bold text-lg leading-tight">
                          "Apartamento Premium com Vista Deslumbrante - Pronto para Morar!"
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 p-6 rounded-2xl border-2 border-fuchsia-500/40">
                        <div className="flex items-center space-x-2 mb-3">
                          <FileText className="w-5 h-5 text-fuchsia-400 animate-pulse" />
                          <span className="text-xs font-black text-fuchsia-300 uppercase">Descrição Otimizada</span>
                        </div>
                        <div className="text-gray-300 text-sm leading-relaxed">
                          Descubra seu novo lar neste magnífico apartamento de 85m²...
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-purple-500/20 flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>Gerado em <span className="text-white font-bold">1.9s</span></span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-bold">99% precisão</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO PROBLEMAS */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black mb-4">
              Se o Imóvel é bom, <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">faça PARECER.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: <Camera className="w-12 h-12 text-cyan-400" />,
                title: 'Fotos que não valorizam',
                description: 'Escuro, ângulo ruim ou ambiente vazio.'
              },
              {
                icon: <FileText className="w-12 h-12 text-cyan-400" />,
                title: 'Textos genéricos',
                description: 'Descrevem quartos, mas não vendem desejo.'
              },
              {
                icon: <Clock className="w-12 h-12 text-cyan-400" />,
                title: 'Retrabalho',
                description: 'Você perde tempo no operacional e publica menos.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-white">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-xl text-gray-300">
              O cliente decide em segundos. <span className="font-bold text-white">Você precisa ganhar o olhar.</span>
            </p>
          </div>
        </div>
      </section>
{/* SEÇÃO ANTES/DEPOIS */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black">
              Veja a diferença{' '}
              <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                em segundos
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Transformações reais usando as técnicas do Corretor IA Pro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: 'Sala de estar',
                subtitle: 'De vazio para revista de decoração',
                antesImg: 'https://images.corretoraipro.online/antes1.jpg',
                depoisImg: 'https://images.corretoraipro.online/depois1.jpg',
                gradient: 'from-purple-600 to-fuchsia-600'
              },
              {
                title: 'Quarto',
                subtitle: 'De frio para acolhedor e premium',
                antesImg: 'https://images.corretoraipro.online/antes2.jpg',
                depoisImg: 'https://images.corretoraipro.online/depois2.jpg',
                gradient: 'from-fuchsia-600 to-pink-600'
              },
              {
                title: 'Iluminação',
                subtitle: 'De escuro para naturalmente iluminado',
                antesImg: 'https://images.corretoraipro.online/antes3.jpg',
                depoisImg: 'https://images.corretoraipro.online/depois3.jpg',
                gradient: 'from-purple-600 to-fuchsia-600'
              }
            ].map((item, i) => (
              <div key={i} className="group relative">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-3xl border border-white/10 p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                    <p className="text-sm text-gray-400">{item.subtitle}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <div className="relative aspect-[4/5] rounded-2xl border border-gray-700 overflow-hidden">
                        <div className="absolute top-3 left-3 bg-gray-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-300 border border-gray-700 z-10">
                          Antes
                        </div>
                        <img 
                          src={item.antesImg} 
                          alt="Antes"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      </div>
                    </div>

                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-2xl blur opacity-50`}></div>
                      <div className="relative aspect-[4/5] rounded-2xl border border-cyan-500/30 overflow-hidden transform group-hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-cyan-600 to-blue-600 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg z-10">
                          Depois
                        </div>
                        <img 
                          src={item.depoisImg} 
                          alt="Depois"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/30 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="group px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
              <span className="flex items-center space-x-2">
                <span>Ver Mais Exemplos</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>
      </section>

{/* DO ZERO AO ANÚNCIO PRONTO */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black">
              Do zero ao <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">anúncio pronto</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                num: '01',
                icon: <Camera className="w-10 h-10 text-white" />,
                title: 'Escolha a foto certa',
                description: 'Com um checklist simples.'
              },
              {
                num: '02',
                icon: <Sparkles className="w-10 h-10 text-white" />,
                title: 'Aplique staging virtual',
                description: 'Com prompts guiados.'
              },
              {
                num: '03',
                icon: <FileText className="w-10 h-10 text-white" />,
                title: 'Gere a descrição persuasiva',
                description: 'Usando um modelo pronto.'
              },
              {
                num: '04',
                icon: <Rocket className="w-10 h-10 text-white" />,
                title: 'Publique com consistência',
                description: 'Usando templates e exemplos.'
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all">
                  <div className="text-5xl font-black text-purple-400 mb-4">{item.num}</div>
                  <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
{/* O QUE VOCÊ RECEBE */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black">
              O que você <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">recebe</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Curso em vídeo */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Play className="w-8 h-8 text-purple-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Curso em vídeo</h3>
                  <p className="text-gray-400 text-sm">Tela gravada com exemplos práticos</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {[
                  'Módulo 1: Fundamentos + checklist de fotos',
                  'Módulo 2: Staging virtual (vazio → "revista")',
                  'Módulo 3: Luz e realismo (sem "cara de IA")',
                  'Módulo 4: Copy com IA (descrição + WhatsApp)',
                  'Módulo 5: Templates finais (prompts + headlines + textos)'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bônus inclusos */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <Sparkles className="w-8 h-8 text-fuchsia-400" />
                <div>
                  <h3 className="text-2xl font-bold text-white">Bônus inclusos</h3>
                  <p className="text-gray-400 text-sm">Materiais prontos para usar</p>
                </div>
              </div>
              
              <ul className="space-y-4">
                {[
                  'Biblioteca de prompts por ambiente',
                  'Templates de descrição (padrão e alto padrão)',
                  'Scripts WhatsApp para agendar visita'
                ].map((item, i) => (
                  <li key={i} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Para quem é / Não é */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Para quem é */}
            <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-3xl p-8 border border-purple-500/30">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-8 h-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Para quem é</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li>• Quer publicar melhor e mais rápido</li>
                <li>• Quer valorizar imóveis vazios ou mal fotografados</li>
                <li>• Quer anúncios que se destacam sem virar "designer"</li>
              </ul>
            </div>

            {/* Não é para quem */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                  <span className="text-red-400 text-xl">✕</span>
                </div>
                <h3 className="text-2xl font-bold text-white">Não é para quem</h3>
              </div>
              <ul className="space-y-3 text-gray-400">
                <li>• Procura curso de CRM ou automação</li>
                <li>• Quer apenas teoria, sem aplicação prática</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* PROMPTS PROFISSIONAIS */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black">
              Prompts Profissionais <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Prontos</span>
            </h2>
            <p className="text-xl text-gray-400 mt-4">
              Copie e cole esses comandos para obter resultados imediatos com a IA.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: 'Descrição de Imóvel de Alto Padrão',
                description: 'Gere uma descrição envolvente com foco em exclusividade e conforto.',
                prompt: 'Aja como um copywriter especializado em mercado imobiliário de luxo. Escreva uma descrição envolvente para um apartamento de [X]m² no bairro [Nome], com vista para [X]. O público-alvo são [Perfil do Cliente]. Use gatilhos de exclusividade e conforto. Evite clichês como "oportunidade única".',
                gradient: 'from-purple-600 to-fuchsia-600'
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: 'Script de Vendas para WhatsApp',
                description: 'Abordagem consultiva para transformar lead em visita.',
                prompt: 'Crie um script de abordagem para um lead que acabou de deixar o contato no site interessado no imóvel [Nome]. O tom deve ser amigável e não invasivo. O objetivo é agendar uma visita. Inclua 3 opções de quebra de gelo.',
                gradient: 'from-fuchsia-600 to-pink-600'
              },
              {
                icon: <Play className="w-8 h-8" />,
                title: 'Ideias de Conteúdo para Instagram',
                description: 'Ideias de Reels com gancho e CTA para educar e atrair compradores.',
                prompt: 'Gere 5 ideias de Reels para um corretor de imóveis focado em [Bairro/Cidade]. O objetivo é educar compradores de primeira viagem sobre o imóvel. Para cada ideia, sugira o gancho inicial (primeiros 3 segundos) e a chamada para ação (CTA).',
                gradient: 'from-pink-600 to-purple-600'
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all h-full flex flex-col">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-6">{item.description}</p>
                  
                  <div className="bg-slate-950/50 rounded-2xl p-6 mb-6 flex-grow">
                    <p className="text-sm text-gray-300 leading-relaxed font-mono">
                      {item.prompt}
                    </p>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Copiar Prompt</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* O QUE MUDA */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-950">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black">
              O que muda quando <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">você aplica</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[
              {
                icon: <TrendingUp className="w-10 h-10" />,
                title: 'Melhor percepção de valor do imóvel',
                gradient: 'from-purple-600 to-fuchsia-600'
              },
              {
                icon: <Eye className="w-10 h-10" />,
                title: 'Mais interesse e mais pedidos de visita',
                gradient: 'from-fuchsia-600 to-pink-600'
              },
              {
                icon: <Clock className="w-10 h-10" />,
                title: 'Menos retrabalho para criar anúncio',
                gradient: 'from-pink-600 to-purple-600'
              },
              {
                icon: <Target className="w-10 h-10" />,
                title: 'Rotina de publicação mais consistente',
                gradient: 'from-purple-600 to-blue-600'
              }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-purple-500/50 transition-all text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white leading-tight">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-400">* Resultados variam conforme imóvel, fotos e aplicação.</p>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-slate-900">
        <div className="container mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-black">
              Perguntas <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">frequentes</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: 'É curso em vídeo?',
                answer: 'Sim! São aulas gravadas em tela, mostrando passo a passo como aplicar cada técnica. Você pode assistir no seu ritmo e rever quantas vezes precisar.'
              },
              {
                question: 'Como eu recebo o acesso?',
                answer: 'Assim que o pagamento for confirmado, você recebe um email com login e senha para acessar a área de membros, onde estão todos os vídeos e materiais.'
              },
              {
                question: 'Preciso entender de IA?',
                answer: 'Não! O curso é feito para quem nunca usou IA antes. Mostramos exatamente o que fazer, onde clicar e o que escrever. Basta seguir os passos.'
              },
              {
                question: 'Funciona para qualquer tipo de imóvel?',
                answer: 'Sim. As técnicas funcionam para apartamentos, casas, comerciais, lançamentos... O método é o mesmo, só adapta os prompts para cada caso.'
              },
              {
                question: 'Tem garantia?',
                answer: 'Sim! 7 dias de garantia incondicional. Se não gostar, devolvemos 100% do valor. Sem perguntas, sem burocracia.'
              }
            ].map((item, i) => (
              <div key={i} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <button 
                  className="w-full text-left p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
                >
                  <span className="text-lg font-bold text-white pr-8">{item.question}</span>
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                </button>
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* SEÇÃO IMAGEM HERO */}
      <section className="relative py-0 px-0 overflow-hidden">
        <div className="relative h-[600px] md:h-[700px]">
          {/* Imagem de fundo */}
          <div className="absolute inset-0">
            <img 
              src="https://images.corretoraipro.online/header.webp" 
              alt="Corretor IA Pro"
              className="w-full h-full object-cover"
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          </div>

          {/* Conteúdo sobre a imagem */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 drop-shadow-2xl">
                Transforme Imóveis em{' '}
                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Oportunidades
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow-lg">
                Com IA, staging virtual e copy profissional
              </p>
              <button className="px-12 py-5 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all duration-300 shadow-2xl">
                Começar Agora
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Final */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-fuchsia-600 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-gradient-to-br from-purple-900/50 to-fuchsia-900/50 backdrop-blur-2xl rounded-3xl border border-purple-500/30 p-16 text-center space-y-8">
              <h2 className="text-5xl md:text-6xl font-black">
                Pronto Para Vender{' '}
                <span className="bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                  3x Mais?
                </span>
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Junte-se a mais de 2.800 corretores que já transformaram suas vendas com IA
              </p>
              <button className="group relative px-12 py-6 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-600 rounded-2xl font-black text-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                <span className="relative flex items-center space-x-3">
                  <Rocket className="w-6 h-6" />
                  <span>Começar Grátis Agora</span>
                </span>
              </button>
              <p className="text-sm text-gray-400">
                ✓ 7 dias grátis • Sem cartão • Cancele quando quiser
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
