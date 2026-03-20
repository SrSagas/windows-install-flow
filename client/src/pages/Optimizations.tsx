import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingDown, Wrench, Code } from 'lucide-react';
import { optimizationData, summaryMetrics, OptimizationItem } from '@/data/optimizationData';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Optimizations() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedRows(newExpanded);
  };

  const getImpactoColor = (impacto: string) => {
    switch (impacto) {
      case 'alto':
        return 'bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700';
      case 'médio':
        return 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700';
      case 'baixo':
        return 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-800 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  const getComplexidadeColor = (complexidade: string) => {
    switch (complexidade) {
      case 'alta':
        return 'bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-200';
      case 'média':
        return 'bg-amber-50 dark:bg-amber-900/20 text-amber-900 dark:text-amber-200';
      case 'baixa':
        return 'bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-200';
      default:
        return 'bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header with Theme Toggle */}
      <div className="bg-slate-900 dark:bg-slate-950 border-b border-slate-700 dark:border-slate-800 px-4 py-3">
        <div className="max-w-[1600px] mx-auto flex justify-end px-6">
          <ThemeToggle />
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative h-96 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663242553445/YteDT4m6cvQfQt9jVqaReQ/hero-otimizacoes-mHoGseR8ioSuEbANrFrDVN.webp)',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70 dark:from-slate-950/95 dark:to-slate-950/85"></div>
        <div className="relative h-full flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tabela de Otimizações
          </h1>
          <p className="text-lg text-slate-200 max-w-2xl">
            Análise detalhada de otimizações para o processo de instalação de Windows
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-50 dark:bg-slate-900">
        <div className="max-w-[1600px] mx-auto px-6 py-8">
          {/* Navigation */}
          <div className="flex justify-center gap-4 mb-8 flex-wrap">
            <a href="/" className="px-6 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-medium">Fluxo do Processo</a>
            <a href="/optimizations" className="px-6 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors font-medium">Tabela de Otimizações</a>
          </div>

          {/* Content */}
          <div className="w-full space-y-6">
            {/* Resumo Executivo */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">Resumo de Otimizações</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-blue-200 dark:border-blue-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tempo Atual</p>
                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-300">{summaryMetrics.tempoTotalAtual}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-green-200 dark:border-green-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tempo Otimizado</p>
                  <p className="text-2xl font-bold text-green-900 dark:text-green-300">{summaryMetrics.tempoTotalOtimizado}</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-emerald-200 dark:border-emerald-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Redução Total</p>
                  <p className="text-2xl font-bold text-emerald-900 dark:text-emerald-300">{summaryMetrics.reducaoPercentualTotal}%</p>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Scripts Sugeridos</p>
                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-300">{summaryMetrics.scriptsSugeridosTotal}</p>
                </div>
              </div>
            </div>

            {/* Tabela de Otimizações */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 dark:bg-slate-700 border-b border-gray-200 dark:border-slate-600">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white w-[330px]">Etapa</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Ponto Atual</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">Otimização</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white w-20">Impacto</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white w-20">Redução</th>
                    <th className="px-4 py-3 text-center text-sm font-semibold text-gray-900 dark:text-white w-12"></th>
                  </tr>
                </thead>
                <tbody>
                  {optimizationData.map((item, index) => [
                    <tr 
                      key={item.id}
                      className={`border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${
                        index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50 dark:bg-slate-700/30'
                      }`}
                      onClick={() => toggleRow(item.id)}
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{item.etapa}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.pontoAtual}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm text-gray-700 dark:text-gray-300">{item.otimizacao}</p>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getImpactoColor(item.impacto)}`}>
                          {item.impacto.charAt(0).toUpperCase() + item.impacto.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingDown size={16} className="text-green-600 dark:text-green-400" />
                          <span className="text-sm font-bold text-green-700 dark:text-green-300">{item.reducaoPercentual}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRow(item.id);
                          }}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded transition-colors"
                        >
                          {expandedRows.has(item.id) ? (
                            <ChevronUp size={20} className="text-gray-600 dark:text-gray-400" />
                          ) : (
                            <ChevronDown size={20} className="text-gray-600 dark:text-gray-400" />
                          )}
                        </button>
                      </td>
                    </tr>,
                    expandedRows.has(item.id) && (
                      <tr key={`${item.id}-expanded`} className="bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-slate-700">
                        <td colSpan={6} className="px-4 py-6">
                          <div className="space-y-6">
                            {/* Como Otimizar */}
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                <Wrench size={16} className="text-blue-600 dark:text-blue-400" />
                                Como Otimizar
                              </h4>
                              <p className="text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 p-3 rounded border border-blue-200 dark:border-blue-700 whitespace-pre-line">
                                {item.comoOtimizar}
                              </p>
                            </div>

                            {/* Ferramentas Sugeridas */}
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">🔧 Ferramentas Sugeridas</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.ferramentasSugeridas.map((ferramenta, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs rounded-full border border-blue-300 dark:border-blue-700"
                                  >
                                    {ferramenta}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Scripts Sugeridos */}
                            <div>
                              <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                <Code size={16} className="text-purple-600 dark:text-purple-400" />
                                Scripts Sugeridos
                              </h4>
                              <div className="space-y-3">
                                {item.scriptsSugeridos.map((script, idx) => (
                                  <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded border border-purple-200 dark:border-purple-700">
                                    <h5 className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">{script.nome}</h5>
                                    <p className="text-xs text-gray-700 dark:text-gray-300 mb-3 whitespace-pre-line">{script.descricao}</p>

                                    <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded border border-gray-200 dark:border-slate-600">
                                      <p className="text-xs font-semibold text-gray-900 dark:text-white mb-2">Passo a Passo:</p>
                                      <ol className="space-y-1 list-decimal list-inside">
                                        {script.passoAPasso.map((passo, pIdx) => (
                                          <li key={pIdx} className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-line">
                                            {passo}
                                          </li>
                                        ))}
                                      </ol>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Métricas de Tempo */}
                            <div className="grid grid-cols-3 gap-3">
                              <div className="bg-white dark:bg-slate-800 p-3 rounded border border-gray-200 dark:border-slate-700">
                                <p className="text-xs text-gray-600 dark:text-gray-400">Tempo Atual</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{item.tempoAtual}</p>
                              </div>
                              <div className="bg-white dark:bg-slate-800 p-3 rounded border border-green-200 dark:border-green-700">
                                <p className="text-xs text-gray-600 dark:text-gray-400">Tempo Otimizado</p>
                                <p className="text-sm font-bold text-green-900 dark:text-green-300">{item.tempoOtimizado}</p>
                              </div>
                              <div className={`p-3 rounded border ${getComplexidadeColor(item.complexidade)}`}>
                                <p className="text-xs text-gray-600 dark:text-gray-400">Complexidade</p>
                                <p className="text-sm font-bold">{item.complexidade.charAt(0).toUpperCase() + item.complexidade.slice(1)}</p>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  ]).flat()}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}