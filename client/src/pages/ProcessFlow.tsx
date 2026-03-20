import { useState, ReactElement } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { Link } from "wouter";
import { processNodes, gargalos, pontosPositivos } from "@/data/processData";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface SelectedItem {
  type: 'node' | 'gargalo' | 'positivo';
  id: string;
}

export default function ProcessFlow() {
  const { theme, toggleTheme } = useTheme();
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      preparacao: 'bg-blue-200 dark:bg-blue-900/40',
      boot: 'bg-cyan-200 dark:bg-cyan-900/40',
      instalacao: 'bg-purple-200 dark:bg-purple-900/40',
      auditoria: 'bg-yellow-200 dark:bg-yellow-900/40',
      finalizacao: 'bg-green-200 dark:bg-green-900/40'
    };
    return colors[type] || 'bg-gray-200 dark:bg-gray-700';
  };

  const getTypeTextColor = (type: string) => {
    const colors: Record<string, string> = {
      preparacao: 'text-blue-900 dark:text-blue-300',
      boot: 'text-cyan-900 dark:text-cyan-300',
      instalacao: 'text-purple-900 dark:text-purple-300',
      auditoria: 'text-yellow-900 dark:text-yellow-300',
      finalizacao: 'text-green-900 dark:text-green-300'
    };
    return colors[type] || 'text-gray-900 dark:text-gray-300';
  };

  const renderNode = (node: typeof processNodes[0], depth = 0): ReactElement => {
    const children = processNodes.filter(n => n.parentId === node.id);
    const hasGargalo = gargalos.some(g => g.id === node.id);

    return (
      <div key={node.id} style={{ marginLeft: `${depth * 20}px` }} className="mb-2">
        <button
          onClick={() => setSelectedItem({ type: 'node', id: node.id })}
          className={`w-full text-left p-3 rounded-lg border-2 border-dashed border-red-500 ${getTypeColor(node.type)} hover:shadow-md transition-shadow cursor-pointer`}
        >
          <div className="flex items-start gap-3">
            {hasGargalo && (
              <div className="flex-shrink-0 mt-1">
                <div className="w-6 h-6 border-2 border-red-600 dark:border-red-500 bg-red-500 dark:bg-transparent"></div>
              </div>
            )}
            <div>
              <h3 className={`text-sm font-bold ${getTypeTextColor(node.type)}`}>{node.title}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{node.description}</p>
            </div>
          </div>
        </button>

        {children.length > 0 && (
          <div className="mt-2">
            {children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const renderSelectedDetails = () => {
    if (!selectedItem) {
      return (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Clique em um item do mapa mental para ver detalhes
        </p>
      );
    }

    if (selectedItem.type === 'node') {
      const node = processNodes.find(n => n.id === selectedItem.id);
      if (!node) return null;

      return (
        <div className="space-y-4">
          <div>
            <h3 className={`text-xl font-bold ${getTypeTextColor(node.type)}`}>{node.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{node.description}</p>
          </div>

          {node.details && (
            <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg border border-gray-200 dark:border-slate-600">
              <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Detalhes:</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{node.details}</p>
            </div>
          )}

          <div className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs font-medium">
            {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
          </div>
        </div>
      );
    }

    if (selectedItem.type === 'gargalo') {
      const gargalo = gargalos.find(g => g.id === selectedItem.id);
      if (!gargalo) return null;

      const impactoColor = {
        alto: 'bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-200',
        médio: 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200',
        baixo: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-200'
      }[gargalo.impacto];

      return (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-xl font-bold text-red-900 dark:text-red-300">{gargalo.titulo}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{gargalo.descricao}</p>
            </div>
          </div>

          <div className={`p-3 rounded-lg ${impactoColor}`}>
            <span className="font-semibold text-sm">
              Impacto: {gargalo.impacto.charAt(0).toUpperCase() + gargalo.impacto.slice(1)}
            </span>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2">Sugestões de Melhoria:</h4>
            <ul className="space-y-2">
              {gargalo.melhorias.map((melhoria, idx) => (
                <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">•</span>
                  {melhoria}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    }

    if (selectedItem.type === 'positivo') {
      const positivo = pontosPositivos.find(p => p.id === selectedItem.id);
      if (!positivo) return null;

      return (
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="text-green-600 dark:text-green-400 flex-shrink-0 mt-1" size={24} />
            <div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-300">{positivo.titulo}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{positivo.descricao}</p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-slate-700 p-4 rounded-lg border border-green-200 dark:border-green-900">
            <h4 className="font-semibold text-sm text-green-900 dark:text-green-300 mb-2">Impacto:</h4>
            <p className="text-sm text-green-800 dark:text-green-200">{positivo.impacto}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Fluxo do Processo de Instalação Windows</h1>
            <p className="text-blue-100 mt-2">Análise completa do fluxo de instalação de Windows via servidor, com identificação de gargalos</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-700 transition-colors"
            title={theme === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-200 dark:bg-blue-900/40 border-2 border-blue-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preparação</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-cyan-200 dark:bg-cyan-900/40 border-2 border-cyan-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Boot</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-200 dark:bg-purple-900/40 border-2 border-purple-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Instalação</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-200 dark:bg-yellow-900/40 border-2 border-yellow-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auditoria</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-200 dark:bg-green-900/40 border-2 border-green-500"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Finalização</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-red-600 dark:border-red-500 bg-red-500 dark:bg-transparent"></div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Gargalo</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex gap-4 justify-center">
          <Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
            Fluxo do Processo
          </Link>
          <Link href="/optimizations" className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
            Tabela de Otimizações
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Process Flow */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 overflow-y-auto max-h-[calc(100vh-300px)]">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fluxo do Processo</h2>
            <div className="space-y-2">
              {processNodes
                .filter(node => !node.parentId)
                .map(node => renderNode(node))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 overflow-y-auto max-h-[calc(100vh-300px)]">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detalhes</h2>
            {renderSelectedDetails()}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-50 dark:bg-slate-800 border-t border-gray-200 dark:border-slate-700 p-4 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Análise detalhada do processo de instalação de Windows via servidor</p>
          <p className="mt-2">Consulte o relatório detalhado para mais informações sobre cada gargalo e sugestão de melhoria</p>
        </div>
      </div>
    </div>
  );
}
