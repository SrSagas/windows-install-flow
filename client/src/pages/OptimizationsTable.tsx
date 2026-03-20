import { useState } from "react";
import { Link } from "wouter";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

/* =========================
   Types
========================= */

interface Optimization {
  id: number;
  etapa: string;
  pontoAtual: string;
  otimizacao: string;
  impacto: "Alto" | "Médio" | "Baixo";
  reducao: string;
}

/* =========================
   Data
========================= */

const optimizations: Optimization[] = [
  {
    id: 1,
    etapa: "Ativação BIOS (Manual)",
    pontoAtual:
      "Ativação manual de PXE em cada máquina - 5-10 min por equipamento",
    otimizacao:
      "Automatizar ativação de PXE via ferramentas de fabricante",
    impacto: "Alto",
    reducao: "85%",
  },
  {
    id: 2,
    etapa: "Captura Manual de Drivers",
    pontoAtual:
      "Quando driver não está no repositório, processo para e exige intervenção manual - 15-60 min",
    otimizacao:
      "Implementar busca automatizada em repositórios de drivers com fallback para Windows Update",
    impacto: "Alto",
    reducao: "85%",
  },
  {
    id: 3,
    etapa: "Entrada Manual de Dados (SKU, OP, NS)",
    pontoAtual:
      "Digitação manual de 3 campos - 3-5 min por máquina, propenso a erros",
    otimizacao:
      "Implementar leitura de código de barras ou integração com banco de dados",
    impacto: "Médio",
    reducao: "80%",
  },
  {
    id: 4,
    etapa: "Criação Manual de Relatório HWInfo",
    pontoAtual:
      "Processo manual com múltiplas etapas - 10-15 min por máquina",
    otimizacao:
      "Automatizar extração de dados e geração de relatório HTML padronizado",
    impacto: "Médio",
    reducao: "85%",
  },
  {
    id: 5,
    etapa: "Dependência de Velocidade de Rede",
    pontoAtual:
      "Transferência de imagem via DISM pode ser lenta - 30-60 min adicional em caso de congestionamento",
    otimizacao:
      "Implementar Multicast e compressão de imagem para reduzir tráfego de rede",
    impacto: "Médio",
    reducao: "70%",
  },
  {
    id: 6,
    etapa: "Falta de Logging Centralizado",
    pontoAtual:
      "Sem visibilidade de status - dificulta troubleshooting e auditoria",
    otimizacao:
      "Implementar logging centralizado com ELK Stack e dashboard em tempo real",
    impacto: "Médio",
    reducao: "90%",
  },
  {
    id: 7,
    etapa: "Testes Manuais de Validação",
    pontoAtual:
      "Validação visual manual de vídeo 4K, dispositivos, som - 5-10 min",
    otimizacao:
      "Automatizar testes com scripts de validação programática",
    impacto: "Baixo",
    reducao: "80%",
  },
  {
    id: 8,
    etapa: "Falta de Integração com Banco de Dados",
    pontoAtual:
      "Sem rastreamento centralizado de máquinas e histórico de instalações",
    otimizacao:
      "Criar banco de dados centralizado com histórico completo de instalações",
    impacto: "Médio",
    reducao: "100%",
  },
];

/* =========================
   Helpers
========================= */

const getImpactoColor = (
  impacto: Optimization["impacto"],
  isDark: boolean
) => {
  switch (impacto) {
    case "Alto":
      return isDark
        ? "bg-red-900/40 text-red-200"
        : "bg-red-100 text-red-900";
    case "Médio":
      return isDark
        ? "bg-amber-900/40 text-amber-200"
        : "bg-amber-100 text-amber-900";
    case "Baixo":
      return isDark
        ? "bg-yellow-900/40 text-yellow-200"
        : "bg-yellow-100 text-yellow-900";
    default:
      return isDark
        ? "bg-gray-700 text-gray-200"
        : "bg-gray-100 text-gray-900";
  }
};

/* =========================
   Component
========================= */

export default function OptimizationsTable() {
  const { theme, toggleTheme } = useTheme();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Tabela de Otimizações</h1>
            <p className="text-purple-100 mt-2">
              Análise detalhada de cada gargalo com sugestões práticas de
              otimização, ferramentas recomendadas e scripts sugeridos
              para implementação
            </p>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-purple-500 hover:bg-purple-700 transition-colors"
            title={
              theme === "dark"
                ? "Mudar para tema claro"
                : "Mudar para tema escuro"
            }
          >
            {theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 p-4">
        <div className="max-w-7xl mx-auto flex gap-4 justify-center items-center">
          <Link
            href="/"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Fluxo do Processo
          </Link>

          <Link
            href="/optimizations"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Tabela de Otimizações
          </Link>
        </div>
      </nav>

      {/* Summary */}
      <section className="bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Resumo de Otimizações
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <SummaryCard title="Tempo Atual" value="50-70 min" />
            <SummaryCard title="Tempo Otimizado" value="15-25 min" highlight="green" />
            <SummaryCard title="Redução Total" value="72%" highlight="blue" />
            <SummaryCard title="Scripts Sugeridos" value="18" highlight="purple" />
          </div>
        </div>
      </section>

      {/* Table */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-slate-800 border-b-2 border-gray-300 dark:border-slate-700">
                <th className="px-4 py-3 text-left text-sm font-semibold">#</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Etapa</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Ponto Atual</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Otimização</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Impacto</th>
                <th className="px-4 py-3 text-center text-sm font-semibold">Redução</th>
              </tr>
            </thead>

            <tbody>
              {optimizations.map((opt) => (
                <tr
                  key={opt.id}
                  className="border-b border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  onClick={() =>
                    setExpandedId(expandedId === opt.id ? null : opt.id)
                  }
                >
                  <td className="px-4 py-3 font-medium">{opt.id}</td>
                  <td className="px-4 py-3 font-medium">{opt.etapa}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {opt.pontoAtual}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {opt.otimizacao}
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getImpactoColor(
                        opt.impacto,
                        isDark
                      )}`}
                    >
                      {opt.impacto}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-center font-semibold text-green-600 dark:text-green-400">
                    {opt.reducao}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

/* =========================
   Subcomponents
========================= */

function SummaryCard({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: "green" | "blue" | "purple";
}) {
  const highlightColor = {
    green: "text-green-600 dark:text-green-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
  }[highlight ?? ""];

  return (
    <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${highlightColor ?? "text-gray-900 dark:text-white"}`}>
        {value}
      </p>
    </div>
  );
}