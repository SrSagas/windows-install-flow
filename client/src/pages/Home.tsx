import { useState } from 'react';
import MindMap from '@/components/MindMap';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header with Theme Toggle */}
      <div className="bg-slate-900 dark:bg-slate-950 border-b border-slate-700 dark:border-slate-800 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-end">
          <ThemeToggle />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663242553445/YteDT4m6cvQfQt9jVqaReQ/hero-instalacao-mHoGseR8ioSuEbANrFrDVN.webp)',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70 dark:from-slate-950/95 dark:to-slate-950/85"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fluxo do Processo de Instalação Windows
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            Análise completa do fluxo de instalação de Windows via servidor, com identificação de gargalos
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-200 rounded border border-blue-400" style={{backgroundColor: '#9fa2fe'}}></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Preparação</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-200 rounded border border-cyan-400"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Boot</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-200 rounded border border-purple-400"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Instalação</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-200 rounded border border-amber-400"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Auditoria</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 rounded border border-green-400"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Finalização</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-white dark:bg-transparent rounded border-2 border-red-500"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Gargalo</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <a href="/" className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-medium">Fluxo do Processo</a>
            <a href="/optimizations" className="px-6 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors font-medium">Tabela de Otimizações</a>
          </div>

          {/* Mind Map Component */}
          <MindMap />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            Análise detalhada do processo de instalação de Windows via servidor
          </p>
          <p className="text-xs text-slate-500 mt-2">
            Consulte o relatório detalhado para mais informações sobre cada gargalo e sugestão de melhoria
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <a href="/" className="text-sm text-blue-400 hover:text-blue-300 underline">Fluxo do Processo</a>
            <span className="text-slate-600">•</span>
            <a href="/optimizations" className="text-sm text-blue-400 hover:text-blue-300 underline">Tabela de Otimizações</a>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Made with Manus
          </div>
        </div>
      </footer>
    </div>
  );
}
