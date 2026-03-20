import { useState } from 'react';
import { ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { processNodes, gargalos, pontosPositivos, ProcessNode } from '@/data/processData';

interface SelectedItem {
  type: 'node' | 'gargalo' | 'positivo';
  id: string;
}

export default function MindMap() {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['inicio', 'identificacao', 'instalar-cmd', 'script-cmd', 'auditoria-inicio', 'oa3-manual', 'relatorio-cmd', 'sysprep-final']));

  const toggleNode = (nodeId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const getNodeChildren = (nodeId: string) => {
    const node = processNodes.find((n: ProcessNode) => n.id === nodeId);
    return node?.children || [];
  };

  const getNodeColor = (type: ProcessNode['type'], title: string = '') => {
    const colors: Record<ProcessNode['type'], string> = {
      preparacao: 'bg-blue-50 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-900/50',
      boot: 'bg-cyan-50 dark:bg-cyan-900/30 border-cyan-300 dark:border-cyan-700 hover:bg-cyan-100 dark:hover:bg-cyan-900/50',
      instalacao: 'bg-purple-50 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 hover:bg-purple-100 dark:hover:bg-purple-900/50',
      auditoria: 'bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 hover:bg-amber-100 dark:hover:bg-amber-900/50',
      finalizacao: 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 hover:bg-green-100 dark:hover:bg-green-900/50',
      gargalo: 'bg-red-50 dark:bg-transparent border-red-400 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900/20',
      positivo: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
    };
    
    if (type === 'gargalo' || title.includes('MANUAL')) {
      const baseColor = colors[type];
      if (type === 'gargalo') {
        return 'bg-red-50 dark:bg-transparent border-red-500 dark:border-red-600 hover:bg-red-100 dark:hover:bg-red-900/20';
      }
      return baseColor.replace(/border-\w+-\d+/g, 'border-red-500 dark:border-red-600');
    }
    
    return colors[type];
  };

  const getTypeTextColor = (type: ProcessNode['type']) => {
    const colors: Record<ProcessNode['type'], string> = {
      preparacao: 'text-blue-900 dark:text-blue-300',
      boot: 'text-cyan-900 dark:text-cyan-300',
      instalacao: 'text-purple-900 dark:text-purple-300',
      auditoria: 'text-amber-900 dark:text-amber-300',
      finalizacao: 'text-green-900 dark:text-green-300',
      gargalo: 'text-red-900 dark:text-red-300',
      positivo: 'text-emerald-900 dark:text-emerald-300'
    };
    return colors[type];
  };

  const renderNode = (node: ProcessNode, level: number = 0) => {
    const hasChildren = getNodeChildren(node.id).length > 0;
    const isExpanded = expandedNodes.has(node.id);
    
    // Nós que devem ter borda vermelha
    const redBorderNodes = ['relatorio-cmd', 'hwinfo', 'html-edit'];
    const shouldHaveRedBorder = redBorderNodes.includes(node.id);

    return (
      <div key={node.id} className="mb-2">
        <div
          className={`
            border rounded-lg p-3 cursor-pointer transition-all
            ${getNodeColor(node.type, node.title)}
            ${selectedItem?.type === 'node' && selectedItem?.id === node.id ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-800' : ''}
          `}
          style={{
            marginLeft: `${level * 20}px`,
            ...(shouldHaveRedBorder && { borderColor: '#ff0000' })
          }}
          onClick={() => setSelectedItem({ type: 'node', id: node.id })}
        >
          <div className="flex items-center gap-2">
            {hasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                className="p-0 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                />
              </button>
            )}
            {!hasChildren && <div className="w-6" />}
            <div className="flex-1">
              <h4 className={`font-semibold text-sm ${getTypeTextColor(node.type)}`}>
                {node.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{node.description}</p>
            </div>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div className="ml-4 border-l-2 border-gray-300 dark:border-gray-600 mt-2 pl-2">
            {getNodeChildren(node.id).map((childId: string) => {
              const childNode = processNodes.find((n: ProcessNode) => n.id === childId);
              return childNode ? renderNode(childNode, level + 1) : null;
            })}
          </div>
        )}
      </div>
    );
  };

  const renderSelectedDetails = () => {
    if (!selectedItem) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Clique em um item do mapa mental para ver detalhes</p>
        </div>
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
      const gargalo = gargalos.find((g: any) => g.id === selectedItem.id);
      if (!gargalo) return null;

      const impactoColorMap: Record<string, string> = {
        alto: 'bg-red-100 dark:bg-red-900/40 text-red-900 dark:text-red-200',
        médio: 'bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-200',
        baixo: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-900 dark:text-yellow-200'
      };
      const impactoColor = impactoColorMap[gargalo.impacto] || '';

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
              {gargalo.melhorias.map((melhoria: string, idx: number) => (
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
      const positivo = pontosPositivos.find((p: any) => p.id === selectedItem.id);
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Mapa Mental */}
      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Fluxo do Processo</h2>
        <div className="space-y-2">
          {processNodes
            .filter((node: ProcessNode) => !node.parentId)
            .map((node: ProcessNode) => renderNode(node))}
        </div>
      </div>

      {/* Painel de Detalhes */}
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Detalhes</h2>
        {renderSelectedDetails()}
      </div>
    </div>
  );
}
